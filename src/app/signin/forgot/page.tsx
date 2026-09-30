import Link from "next/link";
import { AuthAside, AuthLayout } from "@/components/AuthLayout";

export default function ForgotPasswordPage() {
  return (
    <AuthLayout card aside={<AuthAside href="/signin" label="Sign in" />}>
      <h1 className="max-w-[14ch] text-[clamp(32px,4.4vw,48px)] font-light leading-[1.08] tracking-[-0.035em]">
        Forgot password
      </h1>
      <p className="mt-6 max-w-[46ch] text-[16px] leading-[1.55]">
        Password reset is not built yet. Sign in with the password you chose, or{" "}
        <Link href="/onboarding" className="text-gold-text no-underline hover:underline">create a new account</Link>.
      </p>
    </AuthLayout>
  );
}
