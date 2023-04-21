import { Variants } from "framer-motion";

export const PinContainerVariants: Variants = {
  initial: {},
  hover: {
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
  leave: {
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
};
export const PinHoverContainerVariants: Variants = {
  initial: {
    opacity: 0,
  },
  hover: {
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
  leave: {
    opacity: 0,
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
};
