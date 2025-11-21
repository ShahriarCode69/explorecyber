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
		<header className="fixed inset-0 w-fit h-fit mx-auto mt-6 z-99">
			<nav className="px-3 py-3 flex bg-gradient-to-b from-gradientLight to-gradientDark rounded-xl items-center justify-evenly border-2 border-light/13 gap-10">
				<Image className="w-28" src={LogoImage} alt="" />
				<ul className="flex justify-center items-center gap-6">
					{navLinks.map((link) => (
						<li key={link.label}>
							<a className="transition-all duration-300 hover:text-accent" href={link.href}>{link.label}</a>
						</li>
					))}
				</ul>
				<Button href={"#contact"}>Get Started</Button>
			</nav>
		</header>
	);
}
