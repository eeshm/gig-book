"use client";

import { MousePointer2 } from "lucide-react";
import { motion } from "motion/react";

export function CursorHeroSection() {
    return (
        <div className="absolute z-10 -translate-x-1/2 -translate-y-1/2  top-34 right-25 sm:top-40 sm:right-60 md:top-22 md:right-22 lg:top-40 lg:right-40">
            <motion.div
                className="relative inline-block"
                animate={{
                    y: [0, -10, 0],
                }}
                transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            >
                {/* Cursor Icon */}
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <MousePointer2 className="h-6 w-6 fill-[rgb(255,108,16)] stroke-2  stroke-white/70"/>
                </motion.div>

                {/* Text box positioned at bottom-right of the cursor */}
                <motion.div
                    className="absolute -top-3 -right-1 translate-x-full translate-y-full bg-[rgb(255,108,16)] text-white border-2 border-gray-800 text-sm font-medium px-4 py-1 rounded-md flex items-center justify-center"

                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                        duration: 0.5,
                        delay: 0.3,
                    }}
                >
                    Gigbook
                </motion.div>
            </motion.div>
        </div>
    );
}
