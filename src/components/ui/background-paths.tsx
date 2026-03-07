"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink } from "lucide-react";

function FloatingPaths({ position }: { position: number }) {
    const paths = Array.from({ length: 36 }, (_, i) => ({
        id: i,
        d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${380 - i * 5 * position
            } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${152 - i * 5 * position
            } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${684 - i * 5 * position
            } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
        color: `rgba(15,23,42,${0.1 + i * 0.03})`,
        width: 0.5 + i * 0.03,
    }));

    return (
        <div className="absolute inset-0 pointer-events-none">
            <svg
                className="w-full h-full text-slate-950 dark:text-white"
                viewBox="0 0 696 316"
                fill="none"
            >
                <title>Background Paths</title>
                {paths.map((path) => (
                    <motion.path
                        key={path.id}
                        d={path.d}
                        stroke="currentColor"
                        strokeWidth={path.width}
                        strokeOpacity={0.1 + path.id * 0.03}
                        initial={{ pathLength: 0.3, opacity: 0.6 }}
                        animate={{
                            pathLength: 1,
                            opacity: [0.3, 0.6, 0.3],
                            pathOffset: [0, 1, 0],
                        }}
                        transition={{
                            duration: 20 + Math.random() * 10,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "linear",
                        }}
                    />
                ))}
            </svg>
        </div>
    );
}

export function BackgroundPaths({
    title = "Background Paths",
}: {
    title?: string;
}) {
    const words = title.split(" ");

    return (
        <div className="relative min-h-screen w-full flex items-center overflow-hidden bg-white dark:bg-neutral-950">
            <div className="absolute inset-0">
                <FloatingPaths position={1} />
                <FloatingPaths position={-1} />
            </div>

            <div className="relative z-10 container mx-auto px-6 md:px-12 lg:px-16 w-full">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
                    {/* Left — Big Name */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="flex-1 text-left"
                    >
                        <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-none">
                            {words.map((word, wordIndex) => (
                                <span key={wordIndex} className="block">
                                    {word.split("").map((letter, letterIndex) => (
                                        <motion.span
                                            key={`${wordIndex}-${letterIndex}`}
                                            initial={{ y: 30, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            transition={{
                                                delay: wordIndex * 0.2 + letterIndex * 0.04,
                                                type: "spring",
                                                stiffness: 150,
                                                damping: 25,
                                            }}
                                            className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-neutral-900 to-neutral-600 dark:from-white dark:to-white/70"
                                        >
                                            {letter}
                                        </motion.span>
                                    ))}
                                </span>
                            ))}
                        </h1>
                    </motion.div>

                    {/* Right — Info Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
                        className="w-full lg:max-w-md xl:max-w-lg bg-white/70 dark:bg-neutral-900/70 backdrop-blur-2xl p-8 md:p-10 rounded-[2rem] border border-black/5 dark:border-white/5 shadow-2xl"
                    >
                        <h2 className="text-2xl md:text-3xl font-bold mb-4 tracking-tight text-neutral-900 dark:text-white italic">
                            Data Science & Engineering
                        </h2>
                        <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed mb-8">
                            I'm a third-year B.E. student specializing in Data Science at A.P. Shah Institute of Technology. I thrive at the intersection of complex algorithms and real-world problem solving.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Button asChild className="rounded-full px-7 py-5 h-auto text-base font-semibold shadow-lg hover:shadow-primary/30 transition-all duration-300">
                                <a href="#featured">View My Work</a>
                            </Button>
                            <Button variant="outline" asChild className="rounded-full px-7 py-5 h-auto text-base font-semibold gap-2 bg-transparent border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 transition-all duration-300">
                                <a href="https://github.com/yashbhosale8105" target="_blank">
                                    <Github className="w-4 h-4" /> Github
                                </a>
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
