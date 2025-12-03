import { Badge } from '@/core/components/badge';
import { Separator } from '@/core/components/separator';
import DOMPurify from 'dompurify';

interface ProductInfoProps {
  name: string;
  referenceCode: string;
  description: string;
  priceDisplay: string;
  categoryName: string;
}

export function ProductInfo({
  name,
  referenceCode,
  description,
  priceDisplay,
  categoryName,
}: ProductInfoProps) {
  const sanitizedDescription = DOMPurify.sanitize(description);

  return (
    <div className="flex flex-col gap-6">
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Badge variant="secondary">{categoryName}</Badge>
          <span className="text-muted-foreground text-sm">Ref: {referenceCode}</span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{name}</h1>
        <p className="text-primary text-2xl font-semibold">{priceDisplay}</p>
      </div>

      <Separator />

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Sobre o Produto</h3>
        <div
          className="text-muted-foreground prose prose-sm max-w-none leading-relaxed"
          dangerouslySetInnerHTML={{ __html: sanitizedDescription }}
        />
      </div>
    </div>
  );
}
