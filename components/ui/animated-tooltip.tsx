'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import {
  motion,
  useTransform,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from 'framer-motion';

export const AnimatedTooltip = ({
  items,
}: {
  items: {
    id: number;
    name: string;
    designation: string;
    image: string;
  }[];
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const springConfig = { stiffness: 100, damping: 5 };
  const x = useMotionValue(0); // going to set this value on mouse move
  // rotate the tooltip
  const rotate = useSpring(
    useTransform(x, [-100, 100], [-45, 45]),
    springConfig
  );
  // translate the tooltip
  const translateX = useSpring(
    useTransform(x, [-100, 100], [-50, 50]),
    springConfig
  );
  const handleMouseMove = (event: any) => {
    const halfWidth = event.target.offsetWidth / 2;
    x.set(event.nativeEvent.offsetX - halfWidth); // set the x value, which is then used in transform and rotate
  };

  return (
    <>
      {items.map((item, idx) => (
        <div
          className='relative -mr-4 group'
          key={item.name}
          onMouseEnter={() => setHoveredIndex(item.id)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {hoveredIndex === item.id && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.6 }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 0.8,
                transition: {
                  type: 'spring',
                  stiffness: 260,
                  damping: 10,
                },
              }}
              exit={{ opacity: 0, y: 20, scale: 0.6 }}
              style={{
                translateX: translateX,
                rotate: rotate,
                whiteSpace: 'nowrap',
              }}
              className='absolute z-50 flex flex-col items-center justify-center px-4 py-2 text-xs translate-x-1/2 bg-blue-500 rounded-md shadow-xl -top-16 -left-1/2'
            >
              <div className='absolute inset-x-10 z-30 w-[20%] -bottom-px bg-gradient-to-r from-transparent via-emerald-500 to-transparent h-px ' />
              <div className='absolute left-10 w-[40%] z-30 -bottom-px bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px ' />
              <div className='relative z-30 text-base font-bold text-white'>
                {item.name}
              </div>
              <div className='text-xs text-white'>{item.designation}</div>
            </motion.div>
          )}
          <Image
            onMouseMove={handleMouseMove}
            height={200}
            width={200}
            src={item.image}
            alt={item.name}
            className=' antialiased object-cover !m-0 !p-0 object-top rounded-full h-24 w-24 lg:h-40 lg:w-40 border-2 group-hover:scale-105 group-hover:z-30 border-blue-300  relative transition duration-500'
          />
        </div>
      ))}
    </>
  );
};
