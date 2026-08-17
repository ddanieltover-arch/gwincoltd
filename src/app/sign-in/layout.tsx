import type { Metadata } from "next";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
  title: "Sign In",
};

export default function SignInLayout({ children }: { children: React.ReactNode }) {
  return children;
}
