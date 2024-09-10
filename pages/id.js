// pages/[id].js
import Head from 'next/head';
import { getProduct } from '../api/products';
import ProductDetails from '../components/ProductDetails';

export default function Product({ product }) {
  return (
    <div>
      <Head>
        <title>{product.title}</title>
      </Head>
      <ProductDetails product={product} />
    </div>
  );
}

export async function getServerSideProps({ params }) {
  const product = await getProduct(params.id);
  return {
    props: {
      product,
    },
  };
}