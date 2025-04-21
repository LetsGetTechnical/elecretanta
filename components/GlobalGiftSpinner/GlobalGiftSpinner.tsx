'use client';

import { motion } from 'framer-motion';

export default function GlobalGiftSpinner() {
  const draw = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: () => ({
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: {
          type: 'tween',
          duration: 1.5,
          bounce: 0,
          repeatType: 'reverse',
          repeat: Infinity,
        },
      },
    }),
  };

  return (
    <div className="w-8 h-8 z-50">
      <motion.svg
        layout
        width="100%"
        height="100%"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        initial="hidden"
        animate="visible"
      >
        <motion.path
          d="M14 8V8.5V14L13.5 15L12.5 15.5H12H8V8M14 8H15L15.5 7.5V7V5.5V5L15 4.5H14.5H13H12H11.5L13 4L13.5 3.5L14 3V2.5V2L13.5 1.5L13 1L12 0.5H11L10 1L9.5 1.5L9 2L8.5 3L8 4V4.5M14 8C14.1667 8 13.2 8 8 8M8 4.5C13.6 4.5 11.6667 4.5 10 4.5M8 4.5V8"
          stroke="#dc2626"
          strokeLinejoin="round"
          variants={draw}
        />
        <motion.path
          d="M2 8V8.5V14L2.5 15L3.5 15.5H4H8V8M2 8H1L0.5 7.5V7V5.5V5L1 4.5H1.5H3H4H4.5L3 4L2.5 3.5L2 3V2.5V2L2.5 1.5L3 1L4 0.5H5L6 1L6.5 1.5L7 2L7.5 3L8 4V4.5M2 8C1.83333 8 2.8 8 8 8M8 4.5C2.4 4.5 4.33333 4.5 6 4.5M8 4.5V8"
          stroke="#dc2626"
          strokeLinejoin="round"
          variants={draw}
        />
      </motion.svg>
    </div>
  );
}
