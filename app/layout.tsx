import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Simple Todo",
  description: "จดสิ่งสำคัญ แล้วลงมือทำทีละอย่าง",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="th">
      <body>{children}</body>
    </html>
  );
}

