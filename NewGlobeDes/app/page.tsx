import Globe from "@/components/Globe";

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-900 flex flex-col items-center justify-center p-8">
      <div className="max-w-4xl w-full space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white">
            Animated Globe
          </h1>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
            A fully procedural, animated 3D recreation of the stylized globe
            illustration using Three.js and custom shaders.
          </p>
        </div>

        <div className="aspect-square md:aspect-video w-full">
          <Globe />
        </div>
      </div>
    </main>
  );
}
