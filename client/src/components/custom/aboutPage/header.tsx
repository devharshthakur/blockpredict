"use client";
import { Button } from "@/components/ui/button";
import { CgArrowLeft } from "react-icons/cg";
import { FaGithub } from "react-icons/fa";
import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Button variant="ghost" asChild>
          <Link
            href="#"
            onClick={() => window.history.back()}
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <CgArrowLeft className="mr-2 h-4 w-4" />
            Back to Previous Page
          </Link>
        </Button>
        <h1 className="text-3xl font-bold text-gray-900">About Our Project</h1>
        <Button variant="outline" asChild>
          <a
            href="https://github.com/devharshthakur/blockpredict"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center"
          >
            <FaGithub className="mr-2 h-4 w-4" />
            View on GitHub
          </a>
        </Button>
      </div>
    </header>
  );
}
