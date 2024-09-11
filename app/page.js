// pages/index.js
import Head from 'next/head';
import { getProducts } from '../api/products';
import ProductGrid from '../components/ProductGrid';

export default function Home({ products }) {
  return (
    <div>
      <Head>
        <title>My E-commerce Store</title>
      </Head>
      <ProductGrid products={products} />
    </div>
  );
}

export async function getServerSideProps() {
  const products = await getProducts();
  return {
    props: {
      products,
    },
  };
}