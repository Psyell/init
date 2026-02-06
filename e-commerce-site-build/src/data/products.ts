export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  description: string;
  images: string[];
  isNew?: boolean;
}

export const products: Product[] = [
  {
    id: 1,
    name: 'Leather Biker Jacket',
    price: 2890,
    category: 'outerwear',
    description: 'Crafted from premium Italian leather with asymmetric zip closure and signature hardware.',
    images: [
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?auto=format&fit=crop&w=800&q=80',
    ],
    isNew: true,
  },
  {
    id: 2,
    name: 'Draped Wool Coat',
    price: 3450,
    category: 'outerwear',
    description: 'Oversized silhouette in virgin wool with dramatic draping and raw edge details.',
    images: [
      'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?auto=format&fit=crop&w=800&q=80',
    ],
  },
  {
    id: 3,
    name: 'Geometric Knit Sweater',
    price: 890,
    category: 'tops',
    description: 'Architectural knit pattern in merino wool blend with extended sleeves.',
    images: [
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=800&q=80',
    ],
    isNew: true,
  },
  {
    id: 4,
    name: 'Asymmetric Tank Top',
    price: 340,
    category: 'tops',
    description: 'Minimal tank with asymmetric hem in lightweight jersey cotton.',
    images: [
      'https://images.unsplash.com/photo-1503341504253-dff4815485f1?auto=format&fit=crop&w=800&q=80',
    ],
  },
  {
    id: 5,
    name: 'Drop Crotch Trousers',
    price: 780,
    category: 'bottoms',
    description: 'Signature drop crotch silhouette in heavyweight cotton with elongated inseam.',
    images: [
      'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=800&q=80',
    ],
  },
  {
    id: 6,
    name: 'Waxed Denim Jeans',
    price: 650,
    category: 'bottoms',
    description: 'Slim fit jeans with waxed coating for a leather-like finish.',
    images: [
      'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=800&q=80',
    ],
    isNew: true,
  },
  {
    id: 7,
    name: 'Platform Leather Boots',
    price: 1650,
    category: 'footwear',
    description: 'Statement platform boots in matte black leather with chunky rubber sole.',
    images: [
      'https://images.unsplash.com/photo-1605812860427-4024433a70fd?auto=format&fit=crop&w=800&q=80',
    ],
  },
  {
    id: 8,
    name: 'Abstract Sneakers',
    price: 890,
    category: 'footwear',
    description: 'Deconstructed sneaker design with layered leather panels and raw edges.',
    images: [
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80',
    ],
    isNew: true,
  },
  {
    id: 9,
    name: 'Leather Crossbody Bag',
    price: 1290,
    category: 'accessories',
    description: 'Minimalist crossbody in soft calfskin with hidden magnetic closure.',
    images: [
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80',
    ],
  },
  {
    id: 10,
    name: 'Silver Chain Necklace',
    price: 420,
    category: 'accessories',
    description: 'Chunky sterling silver chain with brushed matte finish.',
    images: [
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80',
    ],
  },
  {
    id: 11,
    name: 'Oversized Blazer',
    price: 1450,
    category: 'outerwear',
    description: 'Deconstructed blazer with exaggerated shoulders and open front.',
    images: [
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=80',
    ],
  },
  {
    id: 12,
    name: 'Mesh Layer Top',
    price: 290,
    category: 'tops',
    description: 'Sheer mesh top with subtle geometric pattern, designed for layering.',
    images: [
      'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=800&q=80',
    ],
  },
];
