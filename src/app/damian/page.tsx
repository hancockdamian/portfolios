export default function DamianHome() {
  return (
    <main className="min-h-screen bg-gray-300 w-full p-6">
      <div className="flex flex-col gap-4">
        <section className="rounded-2xl bg-white p-6 text-black">Blog</section>

        <section className="rounded-2xl bg-white p-6 min-h-screen text-black gap-4">
          <div className="flex flex-col gap-4">
            <section className="rounded-lg bg-pink-600 p-6">
              Hello, welcome this is my blog where I will be sharing interesting
              things that I discover and collect over time. Think of it as a
              collection of all things me showcased with some magic programming
              for you to enjoy on this web page :)
            </section>
            <section className="rounded-lg bg-amber-100 p-6">
              This is another section
            </section>
          </div>
        </section>
      </div>
    </main>
  );
}
