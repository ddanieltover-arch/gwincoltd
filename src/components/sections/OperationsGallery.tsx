import Image from "next/image";
import { FadeIn } from "@/components/shared/FadeIn";
import { StaggerChildren, StaggerItem } from "@/components/shared/StaggerChildren";
import { upload } from "@/lib/images";

const certificationImages = [
  upload("2024/06/1.png"),
  upload("2024/06/2.png"),
  upload("2024/06/3.png"),
  upload("2024/06/5.png"),
];

const operationsImages = [
  upload("2025/05/WhatsApp-Image-2025-05-01-at-11.22.29.jpeg"),
  upload("2025/05/WhatsApp-Image-2025-05-01-at-11.22.35.jpeg"),
  upload("2024/12/Screenshot-2024-05-24-161715.webp"),
];

interface OperationsGalleryProps {
  variant?: "home" | "about";
}

export function OperationsGallery({ variant = "home" }: OperationsGalleryProps) {
  const images = variant === "about" ? aboutImages : operationsImages;

  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">
        <FadeIn className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-emerald-950">
            {variant === "about" ? "Our Operations" : "Quality & Operations"}
          </h2>
          <p className="mt-4 text-emerald-900/70">
            {variant === "about"
              ? "From cultivation and harvesting to packing and export — our team maintains international quality standards at every stage."
              : "Certified processes and hands-on operations supporting reliable export shipments worldwide."}
          </p>
        </FadeIn>

        {variant === "home" && (
          <StaggerChildren className="mt-10 flex flex-wrap items-center justify-center gap-8" stagger={0.08}>
            {certificationImages.map((src) => (
              <StaggerItem key={src}>
                <div className="relative h-20 w-28">
                  <Image src={src} alt="Quality certification" fill className="object-contain" sizes="112px" />
                </div>
              </StaggerItem>
            ))}
          </StaggerChildren>
        )}

        <StaggerChildren
          className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          stagger={0.1}
        >
          {images.map((src) => (
            <StaggerItem key={src}>
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-emerald-50 shadow-sm">
                <Image
                  src={src}
                  alt="Global Win Co. Ltd operations"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                />
              </div>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}

const aboutImages = [
  upload("2024/12/ri.webp"),
  upload("2024/06/5fb46fb110e7d.jpg"),
  upload("2024/12/harvets.webp"),
  upload(
    "2024/12/bean-plantation-small-green-bean-plants-in-rows-2024-10-17-03-09-32-utc-scaled.jpg",
  ),
  upload("2024/12/rice-2048x1352-1.webp"),
];
