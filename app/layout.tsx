import type { Metadata } from "next";
import "./globals.css";
import FoundationNav from "./components/FoundationNav";

export const metadata: Metadata = {
  title: "TEDIS Evergreen Foundation",
  description:
    "TEDIS Evergreen Foundation expands access to clean energy, supports circular recovery, and creates opportunities in underserved communities.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <FoundationNav />

        <div className="foundation-page-content">
          {children}
        </div>
      </body>
    </html>
  );
}