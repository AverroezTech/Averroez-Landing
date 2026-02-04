"use client";

import { useState } from "react";
import * as m from "motion/react-m";
import { Send, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { useTranslations } from "next-intl";

const formReveal = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const }
    }
};

type FormStatus = "idle" | "loading" | "success" | "error";

export default function ContactForm() {
    const t = useTranslations("form");
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: "",
    });
    const [status, setStatus] = useState<FormStatus>("idle");
    const [errorMessage, setErrorMessage] = useState("");

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");
        setErrorMessage("");

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                setStatus("success");
                setFormData({ name: "", email: "", phone: "", message: "" });
                // Reset to idle after 5 seconds
                setTimeout(() => setStatus("idle"), 5000);
            } else {
                setStatus("error");
                setErrorMessage(data.error || t("errorGeneric"));
            }
        } catch {
            setStatus("error");
            setErrorMessage(t("errorGeneric"));
        }
    };

    return (
        <m.form
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={formReveal}
            onSubmit={handleSubmit}
            className="w-full max-w-lg mx-auto"
        >
            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 md:p-8">
                <div className="space-y-4">
                    {/* Name Field */}
                    <div>
                        <label htmlFor="name" className="block text-white/90 text-sm font-medium mb-2">
                            {t("name")} *
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            disabled={status === "loading"}
                            className="w-full px-4 py-3 bg-white/10 border border-white/30 text-white placeholder-white/50 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors disabled:opacity-50"
                            placeholder={t("namePlaceholder")}
                        />
                    </div>

                    {/* Email Field */}
                    <div>
                        <label htmlFor="email" className="block text-white/90 text-sm font-medium mb-2">
                            {t("email")} *
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            disabled={status === "loading"}
                            className="w-full px-4 py-3 bg-white/10 border border-white/30 text-white placeholder-white/50 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors disabled:opacity-50"
                            placeholder={t("emailPlaceholder")}
                        />
                    </div>

                    {/* Phone Field (Optional) */}
                    <div>
                        <label htmlFor="phone" className="block text-white/90 text-sm font-medium mb-2">
                            {t("phone")}
                        </label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            disabled={status === "loading"}
                            className="w-full px-4 py-3 bg-white/10 border border-white/30 text-white placeholder-white/50 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors disabled:opacity-50"
                            placeholder={t("phonePlaceholder")}
                        />
                    </div>

                    {/* Message Field */}
                    <div>
                        <label htmlFor="message" className="block text-white/90 text-sm font-medium mb-2">
                            {t("message")} *
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            required
                            rows={4}
                            value={formData.message}
                            onChange={handleChange}
                            disabled={status === "loading"}
                            className="w-full px-4 py-3 bg-white/10 border border-white/30 text-white placeholder-white/50 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors resize-none disabled:opacity-50"
                            placeholder={t("messagePlaceholder")}
                        />
                    </div>

                    {/* Status Messages */}
                    {status === "success" && (
                        <m.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex items-center gap-2 text-green-400 bg-green-400/10 border border-green-400/30 p-3"
                        >
                            <CheckCircle className="h-5 w-5 flex-shrink-0" />
                            <span className="text-sm">{t("success")}</span>
                        </m.div>
                    )}

                    {status === "error" && (
                        <m.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex items-center gap-2 text-red-400 bg-red-400/10 border border-red-400/30 p-3"
                        >
                            <AlertCircle className="h-5 w-5 flex-shrink-0" />
                            <span className="text-sm">{errorMessage}</span>
                        </m.div>
                    )}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={status === "loading"}
                        className="w-full group flex items-center justify-center gap-3 bg-accent px-8 py-4 text-secondary text-lg font-semibold transition-all duration-300 hover:bg-accent/90 hover:shadow-xl hover:shadow-accent/30 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {status === "loading" ? (
                            <>
                                <Loader2 className="h-5 w-5 animate-spin" />
                                <span>{t("sending")}</span>
                            </>
                        ) : (
                            <>
                                <Send className="h-5 w-5" />
                                <span>{t("submit")}</span>
                            </>
                        )}
                    </button>
                </div>
            </div>
        </m.form>
    );
}
