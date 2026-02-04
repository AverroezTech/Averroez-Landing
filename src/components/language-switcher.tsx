"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { setLocale } from "@/i18n/actions";

interface LanguageSwitcherProps {
    currentLocale: string;
    scrolled?: boolean;
}

export default function LanguageSwitcher({ currentLocale, scrolled = true }: LanguageSwitcherProps) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    const handleLocaleChange = (newLocale: string) => {
        if (newLocale === currentLocale) return;

        startTransition(async () => {
            await setLocale(newLocale);
            window.scrollTo({ top: 0, behavior: "instant" });
            router.refresh();
        });
    };

    return (
        <div className={`h-10 w-[88px] flex items-center justify-center gap-1.5 border text-sm font-medium transition-all duration-300 ${scrolled ? "border-secondary/20" : "border-white/30"}`}>
            <button
                onClick={() => handleLocaleChange("en")}
                disabled={isPending}
                className={`transition-colors ${currentLocale === "en"
                    ? "text-primary font-bold"
                    : scrolled ? "text-secondary/60 hover:text-secondary" : "text-white/70 hover:text-white"
                    }`}
            >
                EN
            </button>
            <span className={`transition-colors duration-300 ${scrolled ? "text-secondary/40" : "text-white/40"}`}>|</span>
            <button
                onClick={() => handleLocaleChange("ar")}
                disabled={isPending}
                className={`transition-colors ${currentLocale === "ar"
                    ? "text-primary font-bold"
                    : scrolled ? "text-secondary/60 hover:text-secondary" : "text-white/70 hover:text-white"
                    }`}
            >
                AR
            </button>
        </div>
    );
}
