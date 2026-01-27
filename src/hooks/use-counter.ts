import { useEffect, useRef, useState } from "react";

interface UseCounterOptions {
    start?: number;
    end: number;
    duration?: number;
    delay?: number;
    shouldStart?: boolean;
}

export function useCounter({
    start = 0,
    end,
    duration = 2000,
    delay = 0,
    shouldStart = false
}: UseCounterOptions) {
    const [count, setCount] = useState(() => (shouldStart ? start : end));
    const [isAnimating, setIsAnimating] = useState(false);
    const hasStartedRef = useRef(false);

    useEffect(() => {
        if (!shouldStart || hasStartedRef.current) {
            return;
        }

        hasStartedRef.current = true;

        const timer = setTimeout(() => {
            setIsAnimating(true);

            const startTime = Date.now();
            const difference = end - start;

            const updateCount = () => {
                const elapsed = Date.now() - startTime;
                const progress = Math.min(elapsed / duration, 1);

                // Easing function for smooth animation
                const easeOutQuart = 1 - Math.pow(1 - progress, 4);
                const currentCount = Math.floor(start + difference * easeOutQuart);

                setCount(currentCount);

                if (progress < 1) {
                    requestAnimationFrame(updateCount);
                } else {
                    setCount(end);
                    setIsAnimating(false);
                }
            };

            requestAnimationFrame(updateCount);
        }, delay);

        return () => clearTimeout(timer);
    }, [start, end, duration, delay, shouldStart]);

    return { count, isAnimating };
}
