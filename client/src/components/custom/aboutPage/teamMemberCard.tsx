/**
 * @fileoverview TeamMemberCard component displays individual team member information.
 *
 * This component is used to render a card for each team member, showing their image, name,
 * responsibility, subjects, and a link to their GitHub profile.
 *
 * ## @Props
 * - `member` (TeamMember): An object containing the team member's details.
 *
 * ## @Usage
 * ```tsx
 * <TeamMemberCard member={member} />
 * ```
 *
 * ## @Dependencies
 * - `next/image`: For optimized image rendering.
 * - `react-icons/fa`: For displaying GitHub and LinkedIn icons.
 *
 * @module TeamMemberCard
 */
import { TeamMember } from "@/lib/types";
import Image from "next/image";
import { FaGithub } from "react-icons/fa";

interface TeamMemberCardProps {
  member: TeamMember;
}

export default function TeamMemberCard({ member }: TeamMemberCardProps) {
  return (
    <div className="flex flex-col items-center rounded-lg bg-white p-4 shadow-sm">
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
        href={member.Github}
        target="_blank"
        rel="noopener noreferrer"
        className="text-black-600 hover:text-black-800 flex items-center"
      >
        <FaGithub className="mr-1 h-4 w-4" />
        <span className="text-sm">Github</span>
      </a>
    </div>
  );
}
