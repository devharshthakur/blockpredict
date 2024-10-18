/**
 * @About
 *
 * This component renders the About page of the Stock Market Prediction with Blockchain-Based Weight Management project.
 * It includes sections such as Project Overview, How It Works, Technologies Used, Our Team, Our Vision, and Acknowledgments.
 *
 * The data for team members and technologies is imported from a JSON file and mapped to respective components.
 *
 * @Sections:
 * - Project Overview: Provides a brief introduction to the project.
 * - How It Works: Describes the steps involved in the project using a grid layout.
 * - Technologies Used: Displays the technologies used in the project.
 * - Our Team: Showcases the team members involved in the project.
 * - Our Vision: Outlines the goals and aspirations of the project.
 * - Acknowledgments: Expresses gratitude to those who supported the project.
 *
 * @Components Used:
 * - Header: Custom header component for the About page.
 * - Footer: Custom footer component for the About page.
 * - TeamMemberCard: Custom component to display individual team members.
 * - TechnologyCard: Custom component to display individual technologies.
 * - Avatar: UI component for displaying avatars.
 *
 * @Data
 *  - teamMembers: Array of team member objects.
 *  - technologies: Array of technology objects.
 *
 * @file /D:/COLLEGE PROJECTS/blockpredict/client/src/app/about/page.tsx
 * @module AboutPage
 * @component About
 * @requires React
 * @requires @/components/custom/aboutPage/header
 * @requires @/components/custom/aboutPage/footer
 * @requires @/components/custom/aboutPage/teamMemberCard
 * @requires @/components/custom/aboutPage/technologyCard
 * @requires @/lib/types
 * @requires @/data/data.json
 * @requires @/components/ui/avatar
 */
import React from "react";
import Header from "@/components/custom/aboutPage/header";
import Footer from "@/components/custom/aboutPage/footer";
import TeamMemberCard from "@/components/custom/aboutPage/teamMemberCard";
import TechnologyCard from "@/components/custom/aboutPage/technologyCard";
import { TeamMember, Technology } from "@/lib/types";
import data from "@/data/data.json";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function About() {
  const { teamMembers, technologies } = data as {
    teamMembers: TeamMember[];
    technologies: Technology[];
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="mx-auto max-w-5xl space-y-12 px-4 py-12 sm:px-6 lg:px-8">
        {/* Project Overview */}
        <section>
          <h2 className="mb-4 text-2xl font-semibold text-gray-800">
            Project Overview
          </h2>
          <p className="text-gray-600">
            Welcome to our project! We are a group of enthusiastic college
            students from Vidyalankar Institute of Technology, Wadala, Mumbai,
            working together to build an intelligent simulation for prediction
            system for the stock market. Our project, "Stock Market Prediction
            with Blockchain-Based Weight Management," combines various machine
            learning models, sentiment analysis model, and blockchain to deliver
            a comprehensive, data-driven approach to stock market forecasting.
          </p>
        </section>

        {/* How It Works */}
        <section>
          <h2 className="mb-4 text-2xl font-semibold text-gray-800">
            How It Works
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {/* Repeat the following block for each step */}
            <div className="flex flex-col items-center rounded-lg bg-white p-4 text-center shadow-sm">
              <div className="mb-3">
                {/* Using Shadcn Avatar */}
                <Avatar>
                  <AvatarImage src="" alt="@shadcn" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </div>
              <h3 className="mb-2 font-semibold">Data Scraping</h3>
              <p className="text-sm text-gray-600">
                We gather financial news articles using web scraping techniques.
              </p>
            </div>
          </div>
        </section>

        {/* Technologies Used */}
        <section>
          <h2 className="mb-4 text-2xl font-semibold text-gray-800">
            Technologies Used
          </h2>
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {technologies.map((tech, index) => (
              <TechnologyCard key={index} tech={tech} />
            ))}
          </div>
        </section>

        {/* Our Team */}
        <section>
          <h2 className="mb-4 text-2xl font-semibold text-gray-800">
            Our Team
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {teamMembers.map((member, index) => (
              <TeamMemberCard key={index} member={member} />
            ))}
          </div>
        </section>

        {/* Our Vision */}
        <section>
          <h2 className="mb-4 text-2xl font-semibold text-gray-800">
            Our Vision
          </h2>
          <p className="text-gray-600">
            Our goal is to provide an educational platform that showcases a
            simulation of a process of integrating AI, sentiment analysis, and
            blockchain in financial technology. We hope our project will inspire
            other students, researchers, and developers to explore innovative
            approaches to solving complex problems involving prediction, data
            integrity, and transparency.
          </p>
        </section>

        {/* Acknowledgments */}
        <section>
          <h2 className="mb-4 text-2xl font-semibold text-gray-800">
            Acknowledgments
          </h2>
          <p className="text-gray-600">
            We would like to express our gratitude to our professors, mentors,
            and peers at Vidyalankar Institute of Technology who have supported
            us throughout this project. Their guidance has been invaluable in
            helping us navigate the challenges of combining diverse technologies
            into a cohesive solution.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
