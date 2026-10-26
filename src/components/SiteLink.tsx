"use client";

import NextLink from "next/link";
import { forwardRef, type AnchorHTMLAttributes, type ComponentProps } from "react";
import { isProductEntry } from "@/lib/sites";

type Props = ComponentProps<typeof NextLink>;

/**
 * Marketing routes stay in the Next router.
 * Sign-in, create-account, and the product app load as a full page so the
 * browser requests /product on this same host.
 */
const SiteLink = forwardRef<HTMLAnchorElement, Props>(function SiteLink(props, ref) {
  const path = typeof props.href === "string" ? props.href : "";
  const hard =
    path.startsWith("#") ||
    path.startsWith("mailto:") ||
    path.startsWith("http://") ||
    path.startsWith("https://") ||
    isProductEntry(path);

  if (!hard) return <NextLink ref={ref} {...props} />;

  const { href: _href, prefetch: _prefetch, replace: _replace, scroll: _scroll, ...rest } = props;
  return <a ref={ref} href={path} {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)} />;
});

export default SiteLink;
