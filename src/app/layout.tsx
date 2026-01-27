import type { Metadata } from "next";
import { IBM_Plex_Sans_Arabic } from "next/font/google";
import { LazyMotion, domAnimation } from "motion/react";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getLocale } from "next-intl/server";
import "./globals.css";

const primaryFont = IBM_Plex_Sans_Arabic({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["arabic", "latin"],
  display: "swap",
  variable: "--font-primary",
});

export const metadata: Metadata = {
  title: "Averroez | Tech Agency & Consultancy",
  description: "Premium landing pages and digital solutions. We craft exceptional digital experiences that captivate audiences and drive conversions for ambitious brands.",
  keywords: ["landing pages", "digital agency", "web development", "SEO", "consultancy", "tech agency"],
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "Averroez | Tech Agency & Consultancy",
    description: "Premium landing pages and digital solutions for ambitious brands.",
    type: "website",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();
  const direction = locale === "ar" ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={direction}>
      <body className={`${primaryFont.className} antialiased`}>
        <NextIntlClientProvider messages={messages}>
          <LazyMotion features={domAnimation}>
            {children}
          </LazyMotion>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
