"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import styles from "./ProductCarousel.module.css";




type Product = {
	id: number;
	name: string;
	price: string;
};

const PRODUCTS: Product[] = [
	{ id: 1, name: "Aurora Desk Lamp", price: "$48" },
	{ id: 2, name: "Ceramic Pour-Over", price: "$32" },
	{ id: 3, name: "Wool Throw Blanket", price: "$65" },
	{ id: 4, name: "Walnut Coasters", price: "$24" },
	{ id: 5, name: "Brass Bookends", price: "$40" },
	{ id: 6, name: "Linen Table Runner", price: "$29" },
	{ id: 7, name: "Terrazzo Vase", price: "$36" },
	{ id: 8, name: "Woven Placemat Set", price: "$22" },
	{ id: 9, name: "Frosted Glass Carafe", price: "$44" },
	{ id: 10, name: "Cedar Candle Trio", price: "$18" },
	{ id: 11, name: "Marble Trivet", price: "$27" },
	{ id: 12, name: "Rattan Fruit Bowl", price: "$33" },
];

export default function ProductCarousel() {
	const containerRef = useRef<HTMLDivElement>(null);

	useLayoutEffect(() => {
		const ctx = gsap.context(() => {
			const cards = gsap.utils.toArray<HTMLDivElement>(".product-card");

			gsap.fromTo(cards, {
				x: -400,
				y: 50,
				opacity: 0,
			}, {
				opacity: 1,
				x: 0,
				y: 0,
				duration: 0.6,
				ease: "bounce.out",
				stagger: {
					each: 0.05,
					from: "end",
				},
				// clearProps: "all",
			});
		}, containerRef);

		return () => ctx.revert();
	}, []);

	return (
		<div className={styles.carousel} ref={containerRef}>
			{PRODUCTS.map((p) => (
				<div key={p.id} className={`${styles.card} product-card`}>
					<div className={styles.thumb} />
					<h3>{p.name}</h3>
					<p>{p.price}</p>
				</div>
			))}
		</div>
	);
}
