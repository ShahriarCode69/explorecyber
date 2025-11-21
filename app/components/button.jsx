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
      "hover:-translate-y-1", // ← translate up on hover
    secondary:
      "bg-transparent text-gray-800 rounded-lg border-2 border-transparent " +
      "bg-clip-padding border-[1px] border-[linear-gradient(to_bottom_right,theme(colors.accent),theme(colors.primary))] " +
      "hover:-translate-y-1 transition-all duration-200",
  };

	return (
		<a
			href={href}
			className={`${baseStyles} ${variants[variant]} ${className}`}
			{...props}
		>
			{children}
		</a>
	);
}
