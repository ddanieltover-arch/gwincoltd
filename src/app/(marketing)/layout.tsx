import { BackToTop } from "@/components/shared/BackToTop";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <BackToTop />
      <WhatsAppButton />
    </>
  );
}
