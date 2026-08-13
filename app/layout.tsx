import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import ElectricBackground from "@/components/ElectricBackground";

const headingFont = localFont({
  src: "./fonts/Race Sport.ttf",
  variable: "--font-heading",
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Pro Caliber Services | Industrial Electrical & Control Panel Systems",
  description:
    "Pro Caliber Services designs and builds industrial electrical systems and control panels for the water and wastewater industry.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${headingFont.variable} ${inter.variable} h-full`}
    >
      <body className="relative min-h-full bg-base text-white antialiased overflow-x-hidden">
        <ElectricBackground />
        <div className="relative z-10 flex min-h-full flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}
