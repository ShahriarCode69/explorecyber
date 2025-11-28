import React from "react";
import BookDemoForm from "./bookdemoform";

export default function BookDemo() {
	return (
		<section id="contact" className="section mx-auto w-full max-w-5xl px-4">
			<h2 className="heading-sm mx-auto mb-14 max-w-[30ch] text-center">
				Book A Demo
			</h2>
			<div className="flex flex-col gap-8 rounded-xl bg-white/4 p-4 sm:p-6 lg:flex-row lg:items-stretch">
				{/* Form - appears first on mobile, left on desktop */}
				<div className="w-full flex-shrink-0 lg:flex-1">
					<BookDemoForm/>
				</div>

				{/* Image section - appears second on mobile, right on desktop */}
				<div className="relative min-h-[400px] w-full flex-shrink-0 overflow-hidden rounded-lg lg:min-h-0 lg:flex-1">
					<div className="absolute inset-0">
						<img
							src="/images/contactForm.webp"
							alt="Contact"
							className="object-cover"
						/>
						<div className="absolute inset-0 bg-gradient-to-t from-black/80 from-35% to-transparent"></div>
					<div className="absolute bottom-4 left-4 z-10 flex max-w-[30ch] flex-col gap-3 text-white sm:bottom-6 sm:left-6 sm:gap-4">
						<h3 className="text-xl font-semibold sm:text-2xl">Contact Us</h3>
						<p className="text-sm sm:text-base">
							128 City Road London, EC1V 2NX, United Kingdom
						</p>
						<p className="text-sm sm:text-base">info@exploreitsms.com</p>
						<p className="text-sm sm:text-base">+447546415849</p>
					</div>
					</div>
				</div>
			</div>
		</section>
	);
}
