import { ProductCard } from '@/src/components/products/ProductCard';
import { PRODUCTS } from '@/src/lib/mocks';


export default function HomePage() {
  return (
    <div>
      <h1 className='text-3xl font-bold mb-6'>Nossos Produtos</h1>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        {PRODUCTS.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
     
  );
}
