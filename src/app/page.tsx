"use client";

import { useState, useEffect } from "react";
import * as m from "motion/react-m";
import { AnimatePresence } from "motion/react";
import { ArrowRight, Sparkles, Monitor, Search, MessageSquare, Settings, Smartphone, Instagram, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import AnimatedCounter from "@/components/animated-counter";
import LanguageSwitcher from "@/components/language-switcher";
import ContactForm from "@/components/contact-form";

// Animation variants - AQCM Style
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] as const }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.3 }
  }
};

const textReveal = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const }
  }
};

const imageReveal = {
  hidden: { opacity: 0, scale: 0.92, x: -30 },
  visible: {
    opacity: 1,
    scale: 1,
    x: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }
  }
};

// WhatsApp Icon
const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

// Service icons mapping
const serviceIcons = [Monitor, Smartphone, Search, MessageSquare, Settings];

export default function Home() {
  const t = useTranslations();
  const locale = useLocale();
  const [scrolled, setScrolled] = useState(false);

  // Track scroll position for header styling
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Stats data
  const stats = [
    { value: 100, suffix: "+", labelKey: "stats.clients" },
    { value: 250, suffix: "+", labelKey: "stats.projects" },
    { value: 98, suffix: "%", labelKey: "stats.satisfaction" },
    { value: 5, suffix: "+", labelKey: "stats.experience" },
  ];

  return (
    <main key={locale} className="bg-white">
      {/* Navigation - AQCM Style */}
      <m.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        className={`fixed start-0 end-0 top-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/95 backdrop-blur-md border-b shadow-sm" : "bg-transparent"}`}
      >
        <nav className="layout flex items-center justify-between py-4">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="Averroez Logo"
              width={45}
              height={45}
              className="rounded-lg"
            />
            <span className={`text-xl font-bold hidden sm:block transition-colors duration-300 ${scrolled ? "text-secondary" : "text-white"}`}>Averroez</span>
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            <Link href="#services" className={`transition-colors font-medium ${scrolled ? "text-secondary/80 hover:text-secondary" : "text-white/90 hover:text-white"}`}>{t("nav.services")}</Link>
            <Link href="#about" className={`transition-colors font-medium ${scrolled ? "text-secondary/80 hover:text-secondary" : "text-white/90 hover:text-white"}`}>{t("nav.about")}</Link>
            <Link href="#process" className={`transition-colors font-medium ${scrolled ? "text-secondary/80 hover:text-secondary" : "text-white/90 hover:text-white"}`}>{t("nav.process")}</Link>
            <Link href="#contact" className={`transition-colors font-medium ${scrolled ? "text-secondary/80 hover:text-secondary" : "text-white/90 hover:text-white"}`}>{t("nav.contact")}</Link>
          </div>

          <div className="flex items-center gap-2">
            <LanguageSwitcher currentLocale={locale} scrolled={scrolled} />
            <a
              href="https://www.instagram.com/averroeztech/"
              target="_blank"
              rel="noopener noreferrer"
              className={`hidden sm:flex h-10 w-10 items-center justify-center border transition-all duration-300 ${scrolled ? "border-secondary/20 text-secondary hover:bg-secondary hover:text-white" : "border-white/30 text-white hover:bg-white/10"}`}
              aria-label="Instagram"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a
              href="https://wa.me/962796595732"
              target="_blank"
              rel="noopener noreferrer"
              className={`hidden sm:flex group h-10 items-center gap-2 border-2 px-5 font-semibold transition-all duration-300 ${scrolled ? "border-secondary bg-secondary text-white hover:bg-white hover:text-secondary" : "border-white bg-white/10 text-white hover:bg-white hover:text-secondary"}`}
            >
              <span>{t("nav.letsTalk")}</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`lg:hidden h-10 w-10 flex items-center justify-center border transition-all duration-300 ${scrolled ? "border-secondary/20 text-secondary hover:bg-secondary hover:text-white" : "border-white/30 text-white hover:bg-white/10"}`}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>
      </m.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <m.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[73px] z-40 bg-white/98 backdrop-blur-lg border-b shadow-xl lg:hidden"
          >
            <nav className="layout py-6 flex flex-col gap-4">
              <Link
                href="#services"
                onClick={() => setMobileMenuOpen(false)}
                className="text-secondary hover:text-primary transition-colors font-medium text-lg py-2 border-b border-secondary/10"
              >
                {t("nav.services")}
              </Link>
              <Link
                href="#about"
                onClick={() => setMobileMenuOpen(false)}
                className="text-secondary hover:text-primary transition-colors font-medium text-lg py-2 border-b border-secondary/10"
              >
                {t("nav.about")}
              </Link>
              <Link
                href="#process"
                onClick={() => setMobileMenuOpen(false)}
                className="text-secondary hover:text-primary transition-colors font-medium text-lg py-2 border-b border-secondary/10"
              >
                {t("nav.process")}
              </Link>
              <Link
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="text-secondary hover:text-primary transition-colors font-medium text-lg py-2 border-b border-secondary/10"
              >
                {t("nav.contact")}
              </Link>
              <div className="flex items-center gap-3 pt-4">
                <a
                  href="https://www.instagram.com/averroeztech/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-12 w-12 flex items-center justify-center border border-secondary/20 text-secondary hover:bg-secondary hover:text-white transition-all duration-300"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a
                  href="https://wa.me/962796595732"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 h-12 flex items-center justify-center gap-2 bg-secondary text-white font-semibold transition-all duration-300 hover:bg-primary"
                >
                  <span>{t("nav.letsTalk")}</span>
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </nav>
          </m.div>
        )}
      </AnimatePresence>

      {/* Hero Section - With video background */}
      <section className="relative min-h-screen overflow-hidden">
        {/* Background video */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="/hero-video.mp4" type="video/mp4" />
            {/* Fallback image for browsers that don't support video */}
            <Image
              src="/hero-bg.png"
              alt="Digital Technology Background"
              fill
              className="object-cover"
              priority
            />
          </video>
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-secondary/95 via-secondary/80 to-secondary/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-secondary via-transparent to-transparent" />
        </div>

        {/* Content */}
        <div className="layout relative z-10 flex min-h-screen items-center py-20 pt-24">
          <m.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="mx-auto max-w-4xl text-center"
          >
            {/* Badge */}
            <m.div
              variants={fadeInUp}
              className="inline-flex items-center gap-2 px-4 py-2 mb-8 border border-white/30 bg-white/10 backdrop-blur-sm"
            >
              <Sparkles className="h-4 w-4 text-accent" />
              <span className="text-white/90 text-sm font-medium">{t("hero.badge")}</span>
            </m.div>

            {/* Main headline */}
            <m.h1
              variants={fadeInUp}
              className="mb-6 text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
            >
              {t("hero.headline")}{" "}
              <span className="text-accent">{t("hero.headlineAccent")}</span>
            </m.h1>

            {/* Description */}
            <m.p
              variants={fadeInUp}
              className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-white/80 md:text-xl"
            >
              {t("hero.description")}
            </m.p>

            {/* CTA Buttons */}
            <m.div variants={fadeInUp} className="flex flex-wrap items-center justify-center gap-4 mb-12">
              <a
                href="https://wa.me/962796595732"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 bg-primary px-8 py-4 text-white font-semibold transition-all duration-300 hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/30"
              >
                <WhatsAppIcon className="h-5 w-5" />
                <span>{t("hero.ctaStart")}</span>
              </a>
              <Link
                href="#services"
                className="group flex items-center gap-2 border-2 border-white px-8 py-4 text-white font-semibold transition-all duration-300 hover:bg-white hover:text-secondary"
              >
                <span>{t("hero.ctaExplore")}</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </m.div>

            {/* Stats in Hero */}
            <m.div variants={fadeInUp} className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-accent mb-1">
                    <AnimatedCounter
                      end={stat.value}
                      suffix={stat.suffix}
                      duration={2000}
                      delay={index * 150}
                    />
                  </div>
                  <p className="text-white/90 text-sm font-medium">{t(stat.labelKey)}</p>
                </div>
              ))}
            </m.div>
          </m.div>
        </div>

        {/* Scroll indicator */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="flex flex-col items-center gap-2 text-white/60">
            <span className="text-xs tracking-widest uppercase">{t("hero.scroll")}</span>
            <div className="w-px h-12 bg-gradient-to-b from-white/60 to-transparent" />
          </div>
        </m.div>
      </section>

      {/* Services Section - AQCM Style */}
      <section id="services" className="relative overflow-hidden bg-white py-20 md:py-28">
        <div className="layout relative">
          {/* Section header */}
          <m.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="mb-16 text-center lg:mb-20"
          >
            <m.h2
              variants={textReveal}
              className="text-secondary mx-auto mb-4 max-w-3xl text-3xl font-bold leading-tight md:text-4xl lg:text-5xl"
            >
              {t("services.title")}
            </m.h2>
            <m.p
              variants={textReveal}
              className="text-muted-foreground mx-auto max-w-2xl text-lg"
            >
              {t("services.subtitle")}
            </m.p>
          </m.div>

          {/* Services Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { key: "landingPages", featured: true },
              { key: "digitalSolutions" },
              { key: "seo" },
              { key: "consultations" },
              { key: "inHouse" },
            ].map((service, index) => {
              const Icon = serviceIcons[index];
              return (
                <m.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.5, delay: index * 0.1 }
                    }
                  }}
                  className={`group relative border p-8 transition-all duration-300 hover:shadow-lg ${service.featured
                    ? "md:col-span-2 lg:col-span-2 border-primary bg-gradient-to-br from-primary/5 to-transparent"
                    : "border-border hover:border-primary/50"
                    }`}
                >
                  {service.featured && (
                    <div className="absolute top-4 end-4 px-3 py-1 bg-primary text-white text-xs font-semibold">
                      {t("services.specialty")}
                    </div>
                  )}
                  <div className={`w-14 h-14 flex items-center justify-center mb-6 ${service.featured ? "bg-primary text-white" : "bg-muted text-primary"
                    }`}>
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className={`font-bold mb-3 text-secondary ${service.featured ? "text-2xl" : "text-xl"}`}>
                    {t(`services.${service.key}`)}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {t(`services.${service.key}Desc`)}
                  </p>
                </m.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* About / Why Choose Us Section */}
      <section id="about" className="relative overflow-hidden bg-muted py-20 md:py-28">
        <div className="layout relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Image */}
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={imageReveal}
              className="relative"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src="/datacenter-bg.jpg"
                  alt="Averroez Tech Agency Data Center"
                  fill
                  className="object-cover"
                />
                {/* Overlay with logo */}
                <div className="absolute inset-0 bg-secondary/60 flex items-center justify-center">
                  <Image
                    src="/logo.png"
                    alt="Averroez Logo"
                    width={120}
                    height={120}
                    className="opacity-90"
                  />
                </div>
              </div>
            </m.div>

            {/* Content */}
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <m.h2
                variants={textReveal}
                className="text-secondary mb-8 text-3xl font-bold leading-tight md:text-4xl"
              >
                {t("about.title")}
              </m.h2>

              <div className="space-y-8">
                {["bespoke", "quality", "results"].map((key, index) => (
                  <m.div
                    key={index}
                    variants={textReveal}
                    className="flex gap-4"
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-primary/10 flex items-center justify-center">
                      <div className="w-3 h-3 bg-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1 text-secondary">{t(`about.${key}`)}</h3>
                      <p className="text-muted-foreground">{t(`about.${key}Desc`)}</p>
                    </div>
                  </m.div>
                ))}
              </div>

              <m.div variants={textReveal} className="mt-10">
                <a
                  href="https://wa.me/962796595732"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 border-2 border-secondary bg-secondary px-8 py-4 text-white font-semibold transition-all duration-300 hover:bg-white hover:text-secondary"
                >
                  <span>{t("about.cta")}</span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              </m.div>
            </m.div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="relative overflow-hidden bg-white py-20 md:py-28">
        <div className="layout relative">
          <m.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="mb-16 text-center lg:mb-20"
          >
            <m.h2
              variants={textReveal}
              className="text-secondary mx-auto mb-4 max-w-3xl text-3xl font-bold leading-tight md:text-4xl lg:text-5xl"
            >
              {t("process.title")}
            </m.h2>
            <m.p
              variants={textReveal}
              className="text-muted-foreground mx-auto max-w-2xl text-lg"
            >
              {t("process.subtitle")}
            </m.p>
          </m.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {["discovery", "strategy", "design", "launch"].map((step, index) => (
              <m.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.5, delay: index * 0.15 }
                  }
                }}
                className="relative"
              >
                {/* Connector line */}
                {index < 3 && (
                  <div className="hidden lg:block absolute top-12 start-full w-full h-px bg-gradient-to-r from-primary/50 to-transparent -z-10" />
                )}

                <div className="border border-border p-8 text-center transition-all duration-300 hover:border-primary hover:shadow-lg">
                  <div className="text-5xl font-bold text-primary/20 mb-4">{String(index + 1).padStart(2, '0')}</div>
                  <h3 className="text-xl font-bold mb-3 text-secondary">{t(`process.${step}`)}</h3>
                  <p className="text-muted-foreground text-sm">{t(`process.${step}Desc`)}</p>
                </div>
              </m.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section with Contact Form */}
      <section id="contact" className="relative overflow-hidden bg-secondary py-20 md:py-28">
        {/* Decorative blobs */}
        <div className="absolute top-0 end-0 w-72 h-72 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 start-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />

        <div className="layout relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left side - Text content */}
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="text-center lg:text-start"
            >
              <m.h2
                variants={textReveal}
                className="mb-6 text-3xl font-bold leading-tight text-white md:text-4xl lg:text-5xl"
              >
                {t("cta.title")}
              </m.h2>
              <m.p
                variants={textReveal}
                className="mb-8 text-lg text-white/80"
              >
                {t("cta.description")}
              </m.p>

              {/* Social links */}
              <m.div variants={textReveal} className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-6">
                <a
                  href="https://wa.me/962796595732"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 border-2 border-white/30 px-6 py-3 text-white font-medium transition-all duration-300 hover:bg-white/10 hover:border-white/50"
                >
                  <WhatsAppIcon className="h-5 w-5" />
                  <span>{t("cta.messageUs")}</span>
                </a>
                <a
                  href="https://www.instagram.com/averroeztech/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 border-2 border-white/30 px-6 py-3 text-white font-medium transition-all duration-300 hover:bg-white/10 hover:border-white/50"
                >
                  <Instagram className="h-5 w-5" />
                  <span>{t("cta.followUs")}</span>
                </a>
              </m.div>

              <m.p
                variants={textReveal}
                className="text-white/60 text-sm"
              >
                +962 796 595 732 · {t("cta.response")}
              </m.p>
            </m.div>

            {/* Right side - Contact Form */}
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-navy-dark py-12 border-t border-white/10">
        <div className="layout">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <Image
                src="/logo.png"
                alt="Averroez Logo"
                width={40}
                height={40}
                className="rounded-lg"
              />
              <div>
                <span className="font-bold text-white">Averroez</span>
                <p className="text-xs text-white/60">{t("footer.tagline")}</p>
              </div>
            </div>
            <div className="flex items-center gap-6 text-sm text-white/60">
              <a
                href="https://www.instagram.com/averroeztech/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <Link href="#services" className="hover:text-white transition-colors">{t("nav.services")}</Link>
              <Link href="#about" className="hover:text-white transition-colors">{t("nav.about")}</Link>
              <Link href="#process" className="hover:text-white transition-colors">{t("nav.process")}</Link>
              <Link href="#contact" className="hover:text-white transition-colors">{t("nav.contact")}</Link>
            </div>
            <p className="text-sm text-white/60">
              © {new Date().getFullYear()} Averroez. {t("footer.rights")}
            </p>
          </div>
        </div>
      </footer>

      {/* Fixed WhatsApp Button */}
      <m.a
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2, duration: 0.3, type: "spring" }}
        href="https://wa.me/962796595732"
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 end-6 z-50 w-16 h-16 bg-[#25d366] rounded-full flex items-center justify-center shadow-lg shadow-[#25d366]/40"
        aria-label="Contact us on WhatsApp"
      >
        <WhatsAppIcon className="h-7 w-7 text-white" />
      </m.a>
    </main>
  );
}
