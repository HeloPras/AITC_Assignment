import CorrectedProductCarousel from './components/CorrectedProductCarousel';
import ProductCarousel from './components/ProductCarousel';


export default function Home() {
	return (
		<main style={{ padding: '2rem' }}>
			<h1>Product Showcase</h1>
			<p>Reload the page to replay the entrance animation.</p>
			{/* <ProductCarousel /> */}
			<CorrectedProductCarousel />
		</main>
	);
}

