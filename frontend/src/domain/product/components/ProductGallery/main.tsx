import { useState } from 'react';
import { cn } from '@/core/lib/utils';

interface ProductGalleryProps {
  images: string[];
  mainImage: string;
  productName: string;
}

export function ProductGallery({ images, mainImage, productName }: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(mainImage);
  const allImages = [mainImage, ...images.filter((img) => img !== mainImage)];
  // Remove duplicates if any
  const uniqueImages = Array.from(new Set(allImages));

  return (
    <div className="flex flex-col gap-4">
      <div className="group relative aspect-square w-full overflow-hidden rounded-xl border bg-white">
        <img
          src={selectedImage}
          alt={productName}
          className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <div className="flex gap-4 overflow-x-auto pb-2">
        {uniqueImages.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(image)}
            className={cn(
              'relative aspect-square w-20 shrink-0 overflow-hidden rounded-lg border bg-white transition-all hover:opacity-100',
              selectedImage === image ? 'ring-primary ring-2' : 'opacity-70'
            )}
          >
            <img
              src={image}
              alt={`${productName} view ${index + 1}`}
              className="h-full w-full object-contain"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
