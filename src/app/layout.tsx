import type { Metadata } from "next";
import { IBM_Plex_Sans_Arabic } from "next/font/google";
import { LazyMotion, domAnimation } from "motion/react";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getLocale } from "next-intl/server";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const primaryFont = IBM_Plex_Sans_Arabic({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["arabic", "latin"],
  display: "swap",
  variable: "--font-primary",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://averroez.com"),
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
    url: "https://averroez.com",
    siteName: "Averroez",
    locale: "en_US",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Averroez - Tech Agency & Consultancy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Averroez | Tech Agency & Consultancy",
    description: "Premium landing pages and digital solutions for ambitious brands.",
    images: ["/logo.png"],
  },
  alternates: {
    canonical: "https://averroez.com",
    languages: {
      "en": "https://averroez.com",
      "ar": "https://averroez.com/ar",
    },
  },
  robots: {
    index: true,
    follow: true,
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
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Averroez",
              "url": "https://averroez.com",
              "logo": "https://averroez.com/logo.png",
              "description": "Premium landing pages and digital solutions. We craft exceptional digital experiences that captivate audiences and drive conversions for ambitious brands.",
              "sameAs": [],
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "customer service",
                "availableLanguage": ["English", "Arabic"]
              },
              "service": {
                "@type": "Service",
                "name": "Web Development & Digital Solutions",
                "description": "Premium landing pages, SEO optimization, and digital consultancy services"
              }
            })
          }}
        />
      </head>
      <body className={`${primaryFont.className} antialiased`}>
        <NextIntlClientProvider messages={messages}>
          <LazyMotion features={domAnimation}>
            {children}
          </LazyMotion>
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  );
}
