"use client"
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { CgArrowLeft } from "react-icons/cg";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import Image from "next/image";

const teamMembers = [
  {
    name: "John Doe",
    responsibility: "Developed XGBoost models for stock prediction",
    subject: "Machine Learning, Time Series Analysis",
    image: "/placeholder.svg?height=100&width=100",
    linkedin: "https://linkedin.com/in/johndoe",
  },
  {
    name: "Jane Smith",
    responsibility:
      "Designed and implemented the frontend and backend architecture",
    subject: "Full Stack Development, API Design",
    image: "/placeholder.svg?height=100&width=100",
    linkedin: "https://linkedin.com/in/janesmith",
  },
  {
    name: "Alex Johnson",
    responsibility: "Implemented smart contracts for weight management",
    subject: "Blockchain Technology, Solidity",
    image: "/placeholder.svg?height=100&width=100",
    linkedin: "https://linkedin.com/in/alexjohnson",
  },
  {
    name: "Emily Brown",
    responsibility:
      "Developed BERT model for sentiment analysis of financial news",
    subject: "Natural Language Processing, Deep Learning",
    image: "/placeholder.svg?height=100&width=100",
    linkedin: "https://linkedin.com/in/emilybrown",
  },
];

const technologies = [
  { name: "Next.js", icon: "/nextjs-icon.svg", category: "Frontend" },
  { name: "Tailwind CSS", icon: "/tailwindcss-icon.svg", category: "Frontend" },
  { name: "NestJS", icon: "/nestjs-icon.svg", category: "Backend" },
  { name: "Python", icon: "/python-icon.svg", category: "Backend" },
  {
    name: "Scikit-Learn",
    icon: "/scikit-learn-icon.svg",
    category: "Machine Learning",
  },
  { name: "PyTorch", icon: "/pytorch-icon.svg", category: "Machine Learning" },
  { name: "Hardhat", icon: "/hardhat-icon.svg", category: "Blockchain" },
  { name: "Solidity", icon: "/solidity-icon.svg", category: "Blockchain" },
];

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50">
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
          <h1 className="text-3xl font-bold text-gray-900">
            About Our Project
          </h1>
          <Button variant="outline" asChild>
            <a
              href="https://github.com/yourusername/your-repo"
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
      <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="space-y-12">
          <Card>
            <CardContent className="pt-6">
              <h2 className="mb-4 text-2xl font-semibold text-gray-800">
                Project Overview
              </h2>
              <p className="text-gray-600">
                Welcome to our project! We are a group of enthusiastic college
                students from Vidyalankar Institute of Technology, Wadala,
                Mumbai, working together to build an intelligent prediction
                system for the stock market. Our project, "Stock Market
                Prediction with Blockchain-Based Weight Management," combines
                cutting-edge technologies in machine learning, sentiment
                analysis, and blockchain to deliver a comprehensive, data-driven
                approach to stock market forecasting.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h2 className="mb-4 text-2xl font-semibold text-gray-800">
                How It Works
              </h2>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <div className="flex flex-col items-center rounded-lg bg-white p-4 text-center shadow-sm">
                  <div className="mb-3 rounded-full bg-blue-100 p-3">
                    <svg
                      className="h-6 w-6 text-blue-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                      />
                    </svg>
                  </div>
                  <h3 className="mb-2 font-semibold">Data Scraping</h3>
                  <p className="text-sm text-gray-600">
                    We gather financial news articles using web scraping
                    techniques.
                  </p>
                </div>
                <div className="flex flex-col items-center rounded-lg bg-white p-4 text-center shadow-sm">
                  <div className="mb-3 rounded-full bg-green-100 p-3">
                    <svg
                      className="h-6 w-6 text-green-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                      />
                    </svg>
                  </div>
                  <h3 className="mb-2 font-semibold">Predictive Models</h3>
                  <p className="text-sm text-gray-600">
                    We utilize two XGBoost models and a BERT model for sentiment
                    analysis.
                  </p>
                </div>
                <div className="flex flex-col items-center rounded-lg bg-white p-4 text-center shadow-sm">
                  <div className="mb-3 rounded-full bg-purple-100 p-3">
                    <svg
                      className="h-6 w-6 text-purple-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <h3 className="mb-2 font-semibold">Blockchain Integration</h3>
                  <p className="text-sm text-gray-600">
                    Smart contracts manage and adjust model weights based on
                    accuracy.
                  </p>
                </div>
                <div className="flex flex-col items-center rounded-lg bg-white p-4 text-center shadow-sm">
                  <div className="mb-3 rounded-full bg-yellow-100 p-3">
                    <svg
                      className="h-6 w-6 text-yellow-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="mb-2 font-semibold">Weighted Voting</h3>
                  <p className="text-sm text-gray-600">
                    The final prediction is derived using a weighted voting
                    mechanism.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h2 className="mb-4 text-2xl font-semibold text-gray-800">
                Technologies Used
              </h2>
              <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
                {technologies.map((tech, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center text-center"
                  >
                    <div className="mb-3 rounded-full bg-gray-100 p-4">
                      <Image
                        src={tech.icon}
                        alt={tech.name}
                        width={40}
                        height={40}
                      />
                    </div>
                    <h3 className="text-sm font-semibold">{tech.name}</h3>
                    <p className="text-xs text-gray-500">{tech.category}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h2 className="mb-4 text-2xl font-semibold text-gray-800">
                Our Team
              </h2>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {teamMembers.map((member, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center rounded-lg bg-white p-4 shadow-sm"
                  >
                    <Image
                      src={member.image}
                      alt={member.name}
                      width={80}
                      height={80}
                      className="mb-4 rounded-full"
                    />
                    <h3 className="mb-2 text-lg font-semibold text-gray-800">
                      {member.name}
                    </h3>
                    <p className="mb-2 text-center text-sm text-gray-600">
                      {member.responsibility}
                    </p>
                    <p className="mb-3 text-center text-xs text-gray-500">
                      Subjects: {member.subject}
                    </p>
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-blue-600 hover:text-blue-800"
                    >
                      <FaLinkedin className="mr-1 h-4 w-4" />
                      <span className="text-sm">LinkedIn</span>
                    </a>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h2 className="mb-4 text-2xl font-semibold text-gray-800">
                Our Vision
              </h2>
              <p className="text-gray-600">
                Our goal is to provide an educational platform that showcases
                the possibilities of integrating AI, sentiment analysis, and
                blockchain in financial technology. We hope our project will
                inspire other students, researchers, and developers to explore
                innovative approaches to solving complex problems involving
                prediction, data integrity, and transparency.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h2 className="mb-4 text-2xl font-semibold text-gray-800">
                Acknowledgments
              </h2>
              <p className="text-gray-600">
                We would like to express our gratitude to our professors,
                mentors, and peers at Vidyalankar Institute of Technology who
                have supported us throughout this project. Their guidance has
                been invaluable in helping us navigate the challenges of
                combining diverse technologies into a cohesive solution.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
      <footer className="mt-12 border-t border-gray-200 bg-white">
        <div className="mx-auto max-w-5xl px-4 py-6 text-center text-sm text-gray-500 sm:px-6 lg:px-8">
          &copy; 2024 Stock Market Prediction Project - Vidyalankar Institute of
          Technology. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
