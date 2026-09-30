import type { Metadata } from "next";
import { MODULES } from "@/lib/content";
import { moduleSlug } from "@/lib/onboarding";
import { ToolClient } from "./ToolClient";

type Props = { searchParams: Promise<{ module?: string | string[] }> };

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { module } = await searchParams;
  const slug = Array.isArray(module) ? module[0] : module;
  if (!slug || slug === moduleSlug("Study Section Simulator")) return {};
  const tool = MODULES.find((item) => moduleSlug(item.name) === slug);
  return {
    title: `${tool ? tool.name : "Tool not found"} | EQUITAS Intelligence`,
    description: tool?.description,
  };
}

export default function ToolPage() {
  return <ToolClient />;
}
