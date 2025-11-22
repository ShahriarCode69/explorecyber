import Link from "next/link";

export default function Button({
  variant = "primary",
  children,
  className = "",
  href,
  ...props
}) {
  const baseStyles =
    "w-fit h-fit px-5 py-3 rounded-lg font-medium transition-all duration-200 transition-transform cursor-pointer";

  const variants = {
    primary:
      "relative bg-gradient-to-br from-accent via-[#941891] to-primary text-white " +
      "before:absolute before:inset-0 before:rounded-lg before:border-3 before:border-light/25 before:content-[''] " +
      "before:transition-all before:duration-200 " +
      "hover:-translate-y-1", // translate up on hover
    secondary:
      "relative bg-white text-gray-800 rounded-lg overflow-hidden " +
      "before:content-[''] before:absolute before:inset-0 before:rounded-lg " +
      "before:p-[2px] before:bg-gradient-to-br before:from-accent before:to-primary " +
      "before:-z-10 " +
      "hover:-translate-y-1 transition-all duration-200",
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
