import {Inter} from "next/font/google"
import "./globals.css";
import Header from "@/components/Header";
import { ClerkProvider } from "@clerk/nextjs";
import { neobrutalism } from '@clerk/themes';
import { Toaster } from "@/components/ui/sonner";


const inter = Inter ({ subsets: ["latin"] })

export const metadata = {
  title: "Snap2Cook - AI Recipes Plaform",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider appearance={{baseTheme: neobrutalism}}>
      <html lang="en" >
        <body className={`${inter.className}`}>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Toaster richColors />

          {/* footer */}
          <footer className="py-8 px-4 border-t">
            <div className="max-w-6xl mx-auto flex justify-center items-center">
              <p className="text-stone-500 text-sm text-center">
                © {new Date().getFullYear()} Snap2Cook. All rights reserved. 
                {" "}Made with <span className="text-red-500">❤️</span> by 
                <span className="ml-1 font-medium hover:text-black transition-colors duration-300">
                  Manvendra
                </span>
              </p>
            </div>
          </footer>
        </body>
      </html>
    </ClerkProvider>
  );  
}

 