/**
 * TechnologyCard component displays a technology icon, name, and category.
 *
 * @component
 * @param {TechnologyCardProps} props - The properties object.
 * @param {Tech} props.tech - The technology object containing icon, name, and category.
 *
 * @example
 * // Example usage of TechnologyCard
 * const tech = {
 *   icon: "/path/to/icon.png",
 *   name: "React",
 *   category: "Frontend"
 * };
 *
 * <TechnologyCard tech={tech} />
 *
 * @file This file defines the TechnologyCard component used in the about page to showcase different technologies.
 * @module TechnologyCard
 */
import { Tech } from "@/lib/types";
import Image from "next/image";

interface TechnologyCardProps {
  tech: Tech;
}

export default function TechnologyCard({ tech }: TechnologyCardProps) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="mb-3 rounded-full bg-gray-100 p-4">
        <Image src={tech.icon} alt={tech.name} width={40} height={40} />
      </div>
      <h3 className="text-sm font-semibold">{tech.name}</h3>
      <p className="text-xs text-gray-500">{tech.category}</p>
    </div>
  );
}
