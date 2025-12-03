import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/core/components/card';
import type { RelatedProduct } from '../../types';

interface RelatedProductsProps {
  products: RelatedProduct[];
}

export function RelatedProducts({ products }: RelatedProductsProps) {
  if (!products.length) return null;

  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-bold tracking-tight">Produtos Relacionados</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <Link key={product.id} to={`/produtos/${product.id}`} className="group">
            <Card className="h-full overflow-hidden transition-all hover:shadow-md">
              <div className="bg-muted aspect-square overflow-hidden">
                <img
                  src={product.mainImageUrl}
                  alt={product.name}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <CardContent className="p-4">
                <h3 className="group-hover:text-primary line-clamp-2 font-medium">
                  {product.name}
                </h3>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
