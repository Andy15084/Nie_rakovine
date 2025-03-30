import Image from "next/image";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white pt-16">
        {/* Hero Section */}
        <section className="relative h-[calc(100vh-4rem)] flex items-center justify-center px-4">
          <div className="absolute inset-0 z-0">
            <Image
              src="/hero-bg.jpg"
              alt="Hero background"
              fill
              className="object-cover brightness-50"
              priority
            />
          </div>
          
          <div className="relative z-10 text-center text-white max-w-2xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Together Against Cancer
            </h1>
            <p className="text-lg md:text-xl mb-8">
              Join us in our missixon to support cancer prevention and research
            </p>
            <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-full text-lg transition-colors">
              Donate Now
            </button>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-lg text-gray-600">
              We are dedicated to raising awareness about cancer prevention,
              supporting research initiatives, and helping those affected by cancer
              through education and support programs.
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
