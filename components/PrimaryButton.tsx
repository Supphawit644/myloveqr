import Link from "next/link";
import { ReactNode } from "react";

type Props =
  | ({
      as: "button";
    } & React.ButtonHTMLAttributes<HTMLButtonElement>)
  | ({
      as?: "a";
      href: string;
    } & React.AnchorHTMLAttributes<HTMLAnchorElement>);

// Shared primary button used in multiple sections
export function PrimaryButton(props: Props) {
  const commonClasses =
    "btn-primary whitespace-nowrap rounded-full px-7 py-3 text-sm font-semibold shadow-glow";

  if ("as" in props && props.as === "button") {
    const { as: _as, className, children, ...rest } = props;
    return (
      <button className={`${commonClasses} ${className ?? ""}`} {...rest}>
        {children}
      </button>
    );
  }

  const { href, className, children, ...rest } = props as {
    href: string;
    className?: string;
    children: ReactNode;
  };

  return (
    <Link
      href={href}
      className={`${commonClasses} ${className ?? ""}`}
      {...rest}
    >
      {children}
    </Link>
  );
}

