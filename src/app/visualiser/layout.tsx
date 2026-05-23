import "../globals.css";

export const metadata = {
  title: "damian",
  description: "damian home",
};

export default function DamianLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ fontFamily: '"Clash Display", sans-serif' }}>
      <link
        href="https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700&display=swap"
        rel="stylesheet"
      />
      {children}
    </div>
  );
}
