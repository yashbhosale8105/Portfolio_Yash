"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const Card3D = ({
    children,
    className,
    containerClassName
}: {
    children: React.ReactNode;
    className?: string;
    containerClassName?: string;
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [rotateX, setRotateX] = useState(0);
    const [rotateY, setRotateY] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();

        const width = rect.width;
        const height = rect.height;

        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const xPct = (mouseX / width - 0.5) * 20; // Max rotation 10deg
        const yPct = (mouseY / height - 0.5) * -20; // Max rotation 10deg

        setRotateY(xPct);
        setRotateX(yPct);
    };

    const handleMouseEnter = () => setIsHovered(true);

    const handleMouseLeave = () => {
        setIsHovered(false);
        setRotateX(0);
        setRotateY(0);
    };

    return (
        <div
            style={{ perspective: "1000px" }}
            className={cn("flex items-center justify-center w-full h-full", containerClassName)}
        >
            <motion.div
                ref={containerRef}
                onMouseMove={handleMouseMove}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                animate={{
                    rotateX: isHovered ? rotateX : 0,
                    rotateY: isHovered ? rotateY : 0,
                }}
                transition={{
                    type: "spring",
                    stiffness: 150,
                    damping: 20,
                }}
                style={{
                    transformStyle: "preserve-3d",
                }}
                className={cn(
                    "relative w-full h-full cursor-pointer rounded-[2rem]",
                    className
                )}
            >
                <div
                    style={{
                        transform: "translateZ(60px)",
                        transformStyle: "preserve-3d"
                    }}
                    className="h-full w-full"
                >
                    {children}
                </div>

                {/* Subtle glowing backlight */}
                {isHovered && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.15 }}
                        className="absolute -inset-px rounded-[2rem] bg-primary blur-2xl z-[-1]"
                    />
                )}
            </motion.div>
        </div>
    );
};
