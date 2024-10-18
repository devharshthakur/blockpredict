/**
 * @file header.tsx
 * @description This file defines a functional React component for the header section of the home page.
 * The header includes a title and a button that links to the "About" page.
 * It uses Tailwind CSS for styling and components from the UI library.
 */
// components/Header.tsx

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900">Model Prediction</h1>
        <Button variant="outline" asChild>
          <Link href="/about">About</Link>
        </Button>
      </div>
    </header>
  );
}
