import LogoImage from "@/public/logo.svg";
import Image from "next/image";
import Button from "./button";

export default function Navbar() {
	const navLinks = [
		{ label: "Home", href: "#" },
		{ label: "About", href: "#about" },
		{ label: "Services", href: "#services" },
		{ label: "Works", href: "#works" },
		{ label: "Contact", href: "#contact" },
	];

	return (
		<header className="fixed inset-0 w-fit mx-auto mt-6">
			<nav className="px-3 py-3 flex bg-gradient-to-b from-gradientLight to-gradientDark rounded-xl items-center justify-evenly border-3 border-light/25 gap-10">
				<Image className="w-32" src={LogoImage} alt="" />
				<ul className="flex justify-center items-center gap-10">
					{navLinks.map((link) => (
						<li key={link.label}>
							<a href={link.href}>{link.label}</a>
						</li>
					))}
				</ul>
				<Button>Get Started</Button>
			</nav>
		</header>
	);
}
