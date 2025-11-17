import React from "react";
import Button from "./button";

export default function Hero() {
	return (
		<section className='bg-[url("/backgrounds/heroBg.svg")] bg-cover bg-center h-screen'>
			<div className="container pt-48 flex-center flex-col gap-10">
				<div className="text-center flex-center flex-col">
					<h1 className="heading-xl leading-5">
						Securing Today, <br /> Defending Tomorrow
					</h1>
					<p className="description mt-4">
						Elite cybersecurity solutions protecting your digital infrastructure
						from evolving threats. We secure what matters most.
					</p>
				</div>
				<div className="flex gap-3">
					<Button>Book A Demo</Button>
					<Button>Explore Services</Button>
				</div>
			</div>
		</section>
	);
}
