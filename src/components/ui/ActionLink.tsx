import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowRightIcon } from "./Icons";

type ActionLinkProps = {
  children: ReactNode;
  to: string;
  variant?: "primary" | "text" | "outline";
  external?: boolean;
  className?: string;
};

export function ActionLink({
  children,
  to,
  variant = "text",
  external = false,
  className = "",
}: ActionLinkProps) {
  const classes = `action-link action-link--${variant} ${className}`.trim();
  const content = (
    <>
      <span>{children}</span>
      <ArrowRightIcon className="action-link__icon" />
    </>
  );

  if (external) {
    const opensNewTab = /^https?:\/\//.test(to);
    return (
      <a
        className={classes}
        href={to}
        target={opensNewTab ? "_blank" : undefined}
        rel={opensNewTab ? "noreferrer" : undefined}
      >
        {content}
      </a>
    );
  }

  return (
    <Link className={classes} to={to}>
      {content}
    </Link>
  );
}
