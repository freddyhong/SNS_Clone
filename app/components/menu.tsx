"use client";

import {
  HomeIcon as SolidHomeIcon,
  NewspaperIcon as SolidNewspaperIcon,
  ChatBubbleOvalLeftEllipsisIcon as SolidChatIcon,
  VideoCameraIcon as SolidVideoCameraIcon,
  UserIcon as SolidUserIcon,
} from "@heroicons/react/24/solid";
import {
  HomeIcon as OutlineHomeIcon,
  NewspaperIcon as OutlineNewspaperIcon,
  ChatBubbleOvalLeftEllipsisIcon as OutlineChatIcon,
  VideoCameraIcon as OutlineVideoCameraIcon,
  UserIcon as OutlineUserIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MenuBar({ username }: { username: string }) {
  const pathname = usePathname();
  return (
    <div className="fixed bottom-0 max-w-screen-sm w-full grid grid-cols-2 border-neutral-600 border-t *:text-black py-6 bg-slate-200">
      <Link href="/" className="flex flex-col items-center gap-px group">
        {pathname === "/" ? (
          <SolidHomeIcon className="w-7 h-7 group-hover:w-8 group-hover:h-8 transition-all group-hover:text-red-400" />
        ) : (
          <OutlineHomeIcon className="w-7 h-7 group-hover:w-8 group-hover:h-8 transition-all  group-hover:text-red-400" />
        )}
        <span className="group-hover:text-red-400 transition-all">Home</span>
      </Link>

      <Link
        href={`/profile/${username}`}
        className="flex flex-col items-center gap-px group"
      >
        {pathname === `/profile/${username}` ? (
          <SolidUserIcon className="w-7 h-7 group-hover:w-8 group-hover:h-8 transition-all  group-hover:text-red-400" />
        ) : (
          <OutlineUserIcon className="w-7 h-7 group-hover:w-8 group-hover:h-8 transition-all  group-hover:text-red-400" />
        )}
        <span className="group-hover:text-red-400 transition-all">Profile</span>
      </Link>
    </div>
  );
}
