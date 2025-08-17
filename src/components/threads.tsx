"use client";
import { useEffect, useRef } from "react";
import { Renderer, Program, Mesh, Triangle, Color } from "ogl";

interface ThreadsProps {
  color?: [number, number, number];
  amplitude?: number;
  distance?: number;
  enableMouseInteraction?: boolean;
  className?: string;
}

const vertexShader = `attribute vec2 position;attribute vec2 uv;varying vec2 vUv;void main(){vUv=uv;gl_Position=vec4(position,0.,1.);} `;
const fragmentShader = `precision highp float;
uniform float iTime;uniform vec3 iResolution;uniform vec3 uColor;uniform float uAmplitude;uniform float uDistance;uniform vec2 uMouse;
#define PI 3.1415926538
const int u_line_count=40;const float u_line_width=7.;const float u_line_blur=10.;
float Perlin2D(vec2 P){vec2 Pi=floor(P);vec4 Pf_Pfmin1=P.xyxy-vec4(Pi,Pi+1.);vec4 Pt=vec4(Pi.xy,Pi.xy+1.);Pt=Pt-floor(Pt*(1./71.))*71.;Pt+=vec2(26.,161.).xyxy;Pt*=Pt;Pt=Pt.xzxz*Pt.yyww;vec4 hash_x=fract(Pt*(1./951.135664));vec4 hash_y=fract(Pt*(1./642.949883));vec4 grad_x=hash_x-.49999;vec4 grad_y=hash_y-.49999;vec4 grad_results=inversesqrt(grad_x*grad_x+grad_y*grad_y)*(grad_x*Pf_Pfmin1.xzxz+grad_y*Pf_Pfmin1.yyww);grad_results*=1.41421356237;vec2 blend=Pf_Pfmin1.xy*Pf_Pfmin1.xy*Pf_Pfmin1.xy*(Pf_Pfmin1.xy*(Pf_Pfmin1.xy*6.-15.)+10.);vec4 blend2=vec4(blend,vec2(1.-blend));return dot(grad_results,blend2.zxzx*blend2.wwyy);}
float pixel(float c,vec2 r){return(1./max(r.x,r.y))*c;}
float lineFn(vec2 st,float w,float p,float o,vec2 mouse,float time,float amp,float dist){
 float split_offset=(p*.4);float split_point=.1+split_offset;
 float amp_normal=smoothstep(split_point,.7,st.x);float amp_strength=.5;float finalAmp=amp_normal*amp_strength*amp*(1.+(mouse.y-.5)*.2);
 float t=time/10.+(mouse.x-.5)*1.;float blur=smoothstep(split_point,split_point+.05,st.x)*p;
 float xnoise=mix(Perlin2D(vec2(t,st.x+p)*2.5),Perlin2D(vec2(t,st.x+t)*3.5)/1.5,st.x*.3);
 float y=.5+(p-.5)*dist+xnoise/2.*finalAmp;
 float line_start=smoothstep(y+(w/2.)+(u_line_blur*pixel(1.,iResolution.xy)*blur),y,st.y);
 float line_end=smoothstep(y,y-(w/2.)-(u_line_blur*pixel(1.,iResolution.xy)*blur),st.y);
 return clamp((line_start-line_end)*(1.-smoothstep(0.,1.,pow(p,.3))),0.,1.);
}
void mainImage(out vec4 fragColor,in vec2 fragCoord){
 vec2 uv=fragCoord/iResolution.xy;float line_strength=1.;
 for(int i=0;i<u_line_count;i++){
   float p=float(i)/float(u_line_count);
   line_strength*= (1.-lineFn(uv,u_line_width*pixel(1.,iResolution.xy)*(1.-p),p,(PI*1.)*p,uMouse,iTime,uAmplitude,uDistance));
 }
 float colorVal=1.-line_strength;fragColor=vec4(uColor*colorVal,colorVal);
}
void main(){mainImage(gl_FragColor,gl_FragCoord.xy);} `;

export default function Threads({
  color = [1, 1, 1],
  amplitude = 1,
  distance = 0.5,
  enableMouseInteraction = true,
  className = "",
}: ThreadsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const raf = useRef<number>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const renderer = new Renderer({ alpha: true, premultipliedAlpha: true });
    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    container.appendChild(gl.canvas);

    const geometry = new Triangle(gl);
    const program = new Program(gl, {
      vertex: vertexShader,
      fragment: fragmentShader,
      uniforms: {
        iTime: { value: 0 },
        iResolution: { value: new Color(1, 1, 1) },
        uColor: { value: new Color(...color) },
        uAmplitude: { value: amplitude },
        uDistance: { value: distance },
        uMouse: { value: new Float32Array([0.5, 0.5]) },
      },
    });
    const mesh = new Mesh(gl, { geometry, program });

    const resize = () => {
      const { clientWidth, clientHeight } = container;
      renderer.setSize(clientWidth, clientHeight);
      program.uniforms.iResolution.value.r = clientWidth;
      program.uniforms.iResolution.value.g = clientHeight;
      program.uniforms.iResolution.value.b = clientWidth / Math.max(1, clientHeight);
    };
    window.addEventListener("resize", resize);
    resize();

    let currentMouse = [0.5, 0.5];
    let targetMouse = [0.5, 0.5];
    const onMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      targetMouse = [
        (e.clientX - rect.left) / rect.width,
        1 - (e.clientY - rect.top) / rect.height,
      ];
    };
    const onLeave = () => (targetMouse = [0.5, 0.5]);
    if (enableMouseInteraction) {
      container.addEventListener("mousemove", onMove);
      container.addEventListener("mouseleave", onLeave);
    }

    const tick = (t: number) => {
      if (enableMouseInteraction) {
        const k = 0.05;
        currentMouse[0] += k * (targetMouse[0] - currentMouse[0]);
        currentMouse[1] += k * (targetMouse[1] - currentMouse[1]);
        program.uniforms.uMouse.value[0] = currentMouse[0];
        program.uniforms.uMouse.value[1] = currentMouse[1];
      } else {
        program.uniforms.uMouse.value[0] = 0.5;
        program.uniforms.uMouse.value[1] = 0.5;
      }
      program.uniforms.iTime.value = t * 0.001;
      renderer.render({ scene: mesh });
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);

    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
      window.removeEventListener("resize", resize);
      if (enableMouseInteraction) {
        container.removeEventListener("mousemove", onMove);
        container.removeEventListener("mouseleave", onLeave);
      }
      if (container.contains(gl.canvas)) container.removeChild(gl.canvas);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, [color, amplitude, distance, enableMouseInteraction]);

  return (
    <div
      ref={containerRef}
      className={`w-full h-full ${className}`}
      aria-hidden="true"
    />
  );
}
