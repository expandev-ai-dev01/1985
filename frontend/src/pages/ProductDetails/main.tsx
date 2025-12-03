import { useParams } from 'react-router-dom';
import { PhoneIcon } from 'lucide-react';

import { useProductDetails } from '@/domain/product/hooks';
import {
  ProductGallery,
  ProductInfo,
  ProductSpecs,
  ProductDownloads,
  RelatedProducts,
  QuoteModal,
} from '@/domain/product/components';
import { Button } from '@/core/components/button';
import { LoadingSpinner } from '@/core/components/loading-spinner';
import { useNavigation } from '@/core/hooks/useNavigation';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/core/components/breadcrumb';

function ProductDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const { data: product, isLoading, error } = useProductDetails(id);
  const { goHome } = useNavigation();

  if (isLoading) {
    return (
      <div className="flex h-[50vh] w-full items-center justify-center">
        <LoadingSpinner className="size-8 text-primary" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="flex h-[50vh] flex-col items-center justify-center gap-4">
        <h2 className="text-2xl font-bold">Produto não encontrado</h2>
        <p className="text-muted-foreground">
          O produto que você está procurando não existe ou foi removido.
        </p>
        <Button onClick={goHome}>Voltar para o início</Button>
      </div>
    );
  }

  const handleWhatsAppClick = () => {
    // This would typically come from a global config store
    const phoneNumber = '5511999999999';
    const message = encodeURIComponent(
      `Olá, gostaria de saber mais sobre o produto: ${product.name} (Ref: ${product.referenceCode})`
    );
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  return (
    <div className="space-y-10 pb-10">
      {/* Breadcrumb */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Início</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="#">{product.categoryName}</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{product.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Main Content */}
      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
        {/* Left Column: Gallery */}
        <ProductGallery
          images={product.images}
          mainImage={product.mainImageUrl}
          productName={product.name}
        />

        {/* Right Column: Info & Actions */}
        <div className="flex flex-col gap-8">
          <ProductInfo
            name={product.name}
            referenceCode={product.referenceCode}
            description={product.description}
            priceDisplay={product.priceDisplay}
            categoryName={product.categoryName}
          />

          <div className="flex flex-col gap-3 sm:flex-row">
            <QuoteModal productName={product.name} referenceCode={product.referenceCode} />
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto"
              onClick={handleWhatsAppClick}
            >
              <PhoneIcon className="size-4 mr-2" />
              Falar no WhatsApp
            </Button>
          </div>
        </div>
      </div>

      {/* Specs & Downloads */}
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ProductSpecs
            dimensions={product.dimensions}
            weight={product.weight}
            materials={product.materials}
            finishes={product.finishes}
          />
        </div>
        <div className="lg:col-span-1">
          {product.downloadableFiles && product.downloadableFiles.length > 0 && (
            <ProductDownloads files={product.downloadableFiles} />
          )}
        </div>
      </div>

      {/* Related Products */}
      {product.relatedProducts && product.relatedProducts.length > 0 && (
        <RelatedProducts products={product.relatedProducts} />
      )}
    </div>
  );
}

export { ProductDetailsPage };
