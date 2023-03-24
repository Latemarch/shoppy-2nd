import React from "react";

export default function Banner() {
	return (
		<section className="h-48 bg-yellow-900 relative">
			<div className="w-full h-full bg-cover bg-banner opacity-80"></div>
			<div className="absolute w-full top-16 text-center text-white">
				<h2 className="text-4xl">Shopppppp</h2>
				<p className="text-2xl">show me the money</p>
			</div>
		</section>
	);
}
