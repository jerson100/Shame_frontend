import { Variants } from "framer-motion";

export const SidebarVariants: Variants = {
  initial: {
    x: "-100%",
    transition: {
      duration: 0.4,
      ease: "easeInOut",
    },
  },
  animate: {
    x: 0,
    transition: {
      duration: 0.4,
      ease: "easeInOut",
    },
  },
  exit: {
    x: "-100%",
    transition: {
      duration: 0.4,
      ease: "easeInOut",
    },
  },
};

export const bgVariants: Variants = {
  initial: {
    opacity: 0,
    transition: {
      duration: 0.4,
      ease: "easeInOut",
    },
  },
  animate: {
    opacity: 0.4,
    display: "block",
    transition: {
      ease: "easeInOut",
      duration: 0.4,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.4,
      ease: "easeInOut",
    },
  },
};
