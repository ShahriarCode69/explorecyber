import Link from "next/link";

export default function Button({
  variant = "primary",
  children,
  className = "",
  href,
  ...props
}) {
  const baseStyles =
    "w-fit h-fit px-3 py-3 md:px-5 rounded-lg font-medium transition-all duration-200 transition-transform cursor-pointer";

  const variants = {
    primary:
      "relative bg-gradient-to-br from-accent via-[#941891] to-primary text-white " +
      "before:absolute before:inset-0 before:rounded-lg before:border-3 before:border-light/25 before:content-[''] " +
      "before:transition-all before:duration-200 " +
      "hover:-translate-y-1", // translate up on hover
    secondary:
      "relative bg-gradient-to-br from-primary via-[#941891] to-accent text-white " +
      "before:absolute before:inset-0 before:rounded-lg before:border-3 before:border-light/25 before:content-[''] " +
      "before:transition-all before:duration-200 " +
      "hover:-translate-y-1",
  };

  // If href is provided, render Link
  if (href) {
    return (
      <Link
        href={href}
        className={`${baseStyles} ${variants[variant]} ${className}`}
        {...props}
      >
        {children}
      </Link>
    );
  }

  // Otherwise, render a normal button
  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
