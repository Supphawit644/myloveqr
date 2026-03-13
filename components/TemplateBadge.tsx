import { ReactNode } from "react";

export function TemplateBadge({
  label,
  variant = "free",
  icon
}: {
  label: string;
  variant?: "free" | "premium";
  icon?: ReactNode;
}) {
  const isPremium = variant === "premium";

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium ${
        isPremium
          ? "bg-gradient-to-r from-primary/10 to-glow/10 text-soft border border-glow/40"
          : "bg-white/5 text-soft border border-white/10"
      }`}
    >
      {icon}
      <span>{label}</span>
      {isPremium && (
        <span className="ml-1 rounded-full bg-gradient-to-r from-primary to-glow px-1.5 py-0.5 text-[10px] font-semibold text-white">
          PREMIUM
        </span>
      )}
    </span>
  );
}

