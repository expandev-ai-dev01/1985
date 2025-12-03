import { Separator } from '@/core/components/separator';
import type { ProductDimensions } from '../../types';

interface ProductSpecsProps {
  dimensions: ProductDimensions;
  weight?: number;
  materials: string[];
  finishes?: string[];
}

export function ProductSpecs({ dimensions, weight, materials, finishes }: ProductSpecsProps) {
  return (
    <div className="rounded-xl border p-6 shadow-sm">
      <h3 className="mb-6 text-xl font-semibold">Especificações Técnicas</h3>

      <div className="grid gap-y-4 sm:grid-cols-2 sm:gap-x-8">
        <div className="space-y-1">
          <span className="text-muted-foreground text-sm font-medium">Dimensões</span>
          <p className="text-sm">
            A: {dimensions.height}cm x L: {dimensions.width}cm x P: {dimensions.depth}cm
          </p>
        </div>

        {weight && (
          <div className="space-y-1">
            <span className="text-muted-foreground text-sm font-medium">Peso</span>
            <p className="text-sm">{weight} kg</p>
          </div>
        )}

        <div className="col-span-full">
          <Separator className="my-2" />
        </div>

        <div className="space-y-1">
          <span className="text-muted-foreground text-sm font-medium">Materiais</span>
          <p className="text-sm">{materials.join(', ')}</p>
        </div>

        {finishes && finishes.length > 0 && (
          <div className="space-y-1">
            <span className="text-muted-foreground text-sm font-medium">Acabamentos</span>
            <p className="text-sm">{finishes.join(', ')}</p>
          </div>
        )}
      </div>
    </div>
  );
}
