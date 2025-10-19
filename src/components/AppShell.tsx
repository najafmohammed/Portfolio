"use client";
import { LoaderProvider } from "@/components/ui/LoaderProvider";
import { AudioProvider } from "@/components/ui/AudioProvider";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageTransition from "@/components/ui/PageTransition";
import { usePathname } from "next/navigation";
import { MobileProvider } from "./ui/MobileProvider";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  return (
    <AudioProvider>
      <MobileProvider>
      <LoaderProvider initialVisible={isHome}>
        <PageTransition>
          <Header isHomePage={isHome} />
          <main>{children}</main>   
          <Footer />
        </PageTransition>
      </LoaderProvider>
      </MobileProvider>
    </AudioProvider>
  );
}
