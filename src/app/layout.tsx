import type { Metadata } from "next"
import { DM_Sans, JetBrains_Mono } from "next/font/google"
import { ThemeProvider } from "@/components/layout/theme-provider"
import { Nav } from "@/components/layout/nav"
import { ScrollToTop } from "@/components/scroll-to-top"
import { BackToTop } from "@/components/back-to-top"
import "./globals.css"

const dmSans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
})

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
})

export const metadata: Metadata = {
  title: {
    template: "%s | PSAT Prep",
    default: "PSAT Prep — Crush the PSAT 8/9 Math Section",
  },
  description:
    "Free PSAT 8/9 math prep with 300+ practice questions, interactive quizzes, timed practice tests, and a personalized 6-week study plan.",
  keywords: [
    "PSAT",
    "PSAT 8/9",
    "math prep",
    "practice test",
    "free",
    "study guide",
  ],
  openGraph: {
    title: "PSAT Prep — Crush the PSAT 8/9 Math Section",
    description:
      "Free PSAT 8/9 math prep with 300+ practice questions, interactive quizzes, timed practice tests, and a personalized 6-week study plan.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PSAT Prep — Crush the PSAT 8/9 Math Section",
    description:
      "Free PSAT 8/9 math prep with 300+ practice questions, interactive quizzes, timed practice tests, and a personalized 6-week study plan.",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${dmSans.variable} ${jetbrainsMono.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <ScrollToTop />
          <Nav />
          <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            {children}
          </main>
          <BackToTop />
        </ThemeProvider>
      </body>
    </html>
  )
}
