'use client';

import {cn }from "@/lib/utils";
import Image from "next/image";
import { useScroll, useTransform, motion } from "motion/react";
import { useRef } from "react";

export const Grid = () => {
    const containerRef = useRef(null);
    
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    return (
        <div ref={containerRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4">
                <Column>
                    <Card src="/images/image1.jpg" alt="Jazz Band Performing" className="md:rounded-tl-3xl" scrollProgress={scrollYProgress} index={0} columnIndex={0}/>
                    <Card src="/images/image2.jpg" alt="Jazz Band Performing" className="" scrollProgress={scrollYProgress} index={1} columnIndex={0}/>
                    <Card src="/images/image12.jpg" alt="Jazz Band Performing" className="" scrollProgress={scrollYProgress} index={2} columnIndex={0}/>
                </Column>
                <Column>
                    <Card src="/images/image5.jpg" alt="Jazz Band Performing" className="" scrollProgress={scrollYProgress} index={0} columnIndex={1}/>
                    <Card src="/images/image6.jpg" alt="Jazz Band Performing" className="" scrollProgress={scrollYProgress} index={1} columnIndex={1}/>
                    <Card src="/images/image9.jpg" alt="Jazz Band Performing" className="" scrollProgress={scrollYProgress} index={2} columnIndex={1}/>
                </Column>
                <Column>
                    <Card src="/images/image10.jpg" alt="Jazz Band Performing" className="" scrollProgress={scrollYProgress} index={0} columnIndex={2}/>
                    <Card src="/images/image8.jpg" alt="Jazz Band Performing" className="" scrollProgress={scrollYProgress} index={1} columnIndex={2}/>
                    <Card src="/images/image7.jpg" alt="Jazz Band Performing" className="" scrollProgress={scrollYProgress} index={2} columnIndex={2}/>
                </Column>
                <Column>
                    <Card src="/images/image4.jpg" alt="Jazz Band Performing" className="md:rounded-tr-3xl" scrollProgress={scrollYProgress} index={0} columnIndex={3}/>
                    <Card src="/images/image11.jpg" alt="Jazz Band Performing" className="" scrollProgress={scrollYProgress} index={1} columnIndex={3}/>
                    <Card src="/images/image3.jpg" alt="Jazz Band Performing" className="" scrollProgress={scrollYProgress} index={2} columnIndex={3}/>
                </Column>
            </div>
        </div>
    )
}



const Card = ({ 
    src, 
    alt, 
    className, 
    scrollProgress, 
    index, 
    columnIndex 
}: { 
    src: string; 
    alt: string; 
    className: string; 
    scrollProgress: any; 
    index: number; 
    columnIndex: number;
}) => {
    // Create staggered animation based on column and card position
    const cardDelay = (columnIndex * 0.05) + (index * 0.08);
    
    // Vertical movement - different directions for alternating columns (more dramatic)
    const yRange = columnIndex % 2 === 0 ? 100 : -100;
    const y = useTransform(
        scrollProgress,
        [0, 0.2 + cardDelay, 0.8 + cardDelay, 1],
        [0, 0, yRange, yRange]
    );

    // Rotation effect - alternating directions
    const rotateValue = (columnIndex + index) % 2 === 0 ? 8 : -8;
    const rotate = useTransform(
        scrollProgress,
        [0, 0.2 + cardDelay, 0.5 + cardDelay, 0.8 + cardDelay, 1],
        [0, 0, rotateValue, rotateValue, 0]
    );

    // Scale effect for emphasis
    const scale = useTransform(
        scrollProgress,
        [0, 0.2 + cardDelay, 0.4 + cardDelay, 0.6 + cardDelay, 0.8 + cardDelay, 1],
        [1, 1, 1.1, 1.15, 1.1, 1]
    );

    // Opacity for fade effect
    const opacity = useTransform(
        scrollProgress,
        [0, 0.1 + cardDelay, 0.5 + cardDelay, 0.9 + cardDelay, 1],
        [0.5, 1, 1, 1, 0.5]
    );

    return (
        <motion.div 
            className={cn("relative my-2 mx-1 overflow-hidden shadow-sm group", className)}
            style={{
                y,
                rotate,
                scale,
                opacity,
            }}
        >
            <Image 
                src={src}
                alt={alt}
                width={300}
                height={200}
                className={cn("hover:scale-[1.05] transition-transform duration-300 ease-in-out")}
            />
            {/* Overlay effect on scroll */}
            <motion.div 
                className="absolute inset-0 bg-gradient-to-br from-black/90 to-black/20 pointer-events-none"
                style={{
                    opacity: useTransform(scrollProgress, [0.2 + cardDelay, 0.4 + cardDelay, 0.6 + cardDelay], [0, 0.5, 0])
                }}
            />
        </motion.div>
    );
};


const Column = ({ children }: { children: React.ReactNode }) => {
    return <div>{children}</div>
}

export default Grid;