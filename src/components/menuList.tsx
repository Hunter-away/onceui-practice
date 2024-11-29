import React from "react";
import Link from "next/link";

import {
  IconBrandGithub,
  IconBrandX,
  IconExchange,
  IconHome,
  IconNewSection,
  IconTerminal2,
} from "@tabler/icons-react";

import {
  AnimatePresence,
  MotionValue,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

export function MenuList() {
  const links = [
    {
      title: "Home",
      icon: (
        <IconHome className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },

    {
      title: "Products",
      icon: (
        <IconTerminal2 className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/blog",
    },
    {
      title: "Components",
      icon: (
        <IconNewSection className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/projects",
    },
    {
      title: "Changelog",
      icon: (
        <IconExchange className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },

    {
      title: "Twitter",
      icon: (
        <IconBrandX className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },
    {
      title: "GitHub",
      icon: (
        <IconBrandGithub className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },
  ];
  return (
    // <div className="flex">
    //   { 
    //     links.map((link) => (
    //       <div key={link.title} className="px-4">
    //         <a href={link.href} className="text-base align-center font-medium text-gray-500 hover:text-gray-900">
    //           {link.icon}
    //           <span>{link.title}</span>
    //         </a>
    //       </div>
    //     )) 
    //   }
    // </div>
    <motion.div
      layoutId="nav"
      className="absolute bottom-full mb-2 inset-x-0 flex flex-col gap-2 pd-[20] border-8 border-indigo-600"
    >
    {links.map((item, idx) => (
      <motion.div
        key={item.title}
        initial={{ opacity: 0, y: 10 }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        exit={{
          opacity: 0,
          y: 10,
          transition: {
            delay: idx * 0.05,
          },
        }}
        transition={{ delay: (links.length - 1 - idx) * 0.05 }}
      >
        <Link
          href={item.href}
          key={item.title}
          className="h-10 w-10 px-8 rounded-full bg-gray-50 dark:bg-neutral-900 flex items-center justify-center"
        >
          <div className="h-4 w-4">{item.icon}</div>
        </Link>
      </motion.div>
    ))}
  </motion.div>
  );
}
