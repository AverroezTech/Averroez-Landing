"use client";

import { useInView } from "motion/react";
import { useRef } from "react";

import { useCounter } from "@/hooks/use-counter";

interface AnimatedCounterProps {
    end: number;
    duration?: number;
    delay?: number;
    suffix?: string;
    prefix?: string;
    className?: string;
}

export default function AnimatedCounter({
    end,
    duration = 2000,
    delay = 0,
    suffix = "",
    prefix = "",
    className = ""
}: AnimatedCounterProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    const { count } = useCounter({
        end,
        duration,
        delay,
        shouldStart: isInView
    });

    return (
        <span ref={ref} className={className}>
            {prefix}
            {count.toLocaleString()}
            {suffix}
        </span>
    );
}
