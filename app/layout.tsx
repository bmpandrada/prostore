import type { Metadata } from "next";
import { Inter } from 'next/font/google';
import '@/app/assets/styles/globals.css';
import { APP_DESCRIPTION, APP_NAME } from "@/lib/constants";
import { ThemeProvider } from "next-themes";

const inter = Inter ({ subsets: ["latin"],
});

export const metadata: Metadata = {
  // title: {  
  //     default: APP_NAME, 
  //     template: `%s | ${APP_NAME}`,  for SEO  connect with the title of the page
  //   },

  title: {
    default: APP_NAME,
    template: `%s | ${APP_NAME}`,
  },
  description: `${APP_DESCRIPTION}`,
  metadataBase: new URL(process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en"suppressHydrationWarning> 
    {/* suppressHydrationWarning is used to prevent hydration errors in Next.js */ }
      <body
        className={`${inter.className} antialiased`}
      >
        <ThemeProvider 
          attribute="class" 
          defaultTheme="light" 
          enableSystem
          disableTransitionOnChange>
        {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
