import { Geist, Geist_Mono } from "next/font/google";
import { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";

import { ThemeProvider as NextThemesProvider } from "next-themes";

const fontSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: {
    template: "%s | oss now | early project submissions are live",
    default: "Scan.ai Plataforma",
  },
  description:
    "Uma plataforma para reastreabilidade de vinhos e outros produtos, com foco em sustentabilidade e transparência.",
  icons: {
    icon: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" suppressHydrationWarning>
      <body
        className={`${fontSans.variable} ${fontMono.variable} overscroll-none bg-[#101010] font-sans antialiased`}
      >
        <NextThemesProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
          enableColorScheme
        >
          {children}
        </NextThemesProvider>
        <Toaster />
      </body>
    </html>
  );
}
