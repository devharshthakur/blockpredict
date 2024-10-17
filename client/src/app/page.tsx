import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-blue-50 to-indigo-100">
      <header className="w-full p-6">
        <div className="max-w-8xl mx-auto flex justify-end">
          <Button
            variant="outline"
            size="lg"
            className="py-6 text-lg font-semibold"
            asChild
          >
            <Link href="/about">About Project</Link>
          </Button>
        </div>
      </header>

      <main className="flex flex-grow flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl text-center">
          <h1 className="mb-8 text-4xl font-bold leading-tight text-gray-900 sm:text-5xl md:text-6xl">
            Stock Market Prediction with Blockchain-Based Weight Management
          </h1>
          <p className="mb-12 text-xl text-gray-700 md:text-2xl">
            Harnessing the power of AI and blockchain for accurate stock market
            forecasting
          </p>
          <Button size="lg" className="px-8 py-6 text-lg" asChild>
            <Link href="/home" className="flex items-center">
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </main>

      <footer className="w-full p-6">
        <div className="mx-auto max-w-7xl text-center text-sm text-gray-600">
          &copy; 2024 Vidyalankar Institute of Technology. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
