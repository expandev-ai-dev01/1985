export interface ProductDimensions {
  height: number;
  width: number;
  depth: number;
}

export interface DownloadableFile {
  fileName: string;
  fileType: string;
  fileSize: string;
  fileUrl: string;
}

export interface RelatedProduct {
  id: string;
  name: string;
  mainImageUrl: string;
}

export interface Product {
  id: string;
  name: string;
  referenceCode: string;
  description: string;
  priceDisplay: string;
  mainImageUrl: string;
  images: string[];
  dimensions: ProductDimensions;
  weight?: number;
  materials: string[];
  finishes?: string[];
  downloadableFiles?: DownloadableFile[];
  categoryName: string;
  relatedProducts: RelatedProduct[];
}
