export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  shortDescription: string;
  images: string[];
  category: string;
  colors: string[];
  sizes: string[];
  isNew?: boolean;
  isBestseller?: boolean;
  rating: number;
  reviewCount: number;
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Silk Noir Elegance Abaya',
    price: 289,
    originalPrice: 350,
    description: 'Crafted from the finest mulberry silk, this abaya embodies timeless sophistication. The flowing silhouette drapes beautifully, while subtle gold embroidery along the cuffs adds a touch of luxury. Perfect for special occasions or elevated everyday wear.',
    shortDescription: 'Premium silk abaya with delicate gold embroidery details',
    images: [
      'https://images.unsplash.com/photo-1590735213920-68192a487bc2?w=800',
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800',
      'https://images.unsplash.com/photo-1544441893-675973e31985?w=800',
    ],
    category: 'Formal',
    colors: ['Black', 'Navy', 'Burgundy'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    isNew: true,
    isBestseller: true,
    rating: 4.9,
    reviewCount: 127,
  },
  {
    id: '2',
    name: 'Pearl Mist Open Abaya',
    price: 245,
    description: 'A contemporary take on classic modesty, this open abaya features a stunning pearl-toned fabric that catches the light beautifully. The relaxed fit and modern cut make it versatile for both casual and semi-formal settings.',
    shortDescription: 'Modern open-front design in ethereal pearl tones',
    images: [
      'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?w=800',
      'https://images.unsplash.com/photo-1590735213408-9d0d7a4e8f8f?w=800',
    ],
    category: 'Casual',
    colors: ['Pearl White', 'Champagne', 'Soft Gray'],
    sizes: ['S', 'M', 'L', 'XL'],
    isBestseller: true,
    rating: 4.8,
    reviewCount: 89,
  },
  {
    id: '3',
    name: 'Velvet Midnight Collection',
    price: 320,
    description: 'Luxurious velvet meets modest elegance in this stunning piece. The rich texture and deep midnight hue create an aura of refined sophistication, while the tailored fit ensures a flattering silhouette.',
    shortDescription: 'Sumptuous velvet abaya for evening occasions',
    images: [
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800',
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800',
    ],
    category: 'Evening',
    colors: ['Midnight Blue', 'Deep Plum', 'Emerald'],
    sizes: ['XS', 'S', 'M', 'L'],
    isNew: true,
    rating: 4.9,
    reviewCount: 54,
  },
  {
    id: '4',
    name: 'Linen Breeze Everyday Abaya',
    price: 175,
    description: 'Designed for comfort without compromising on style, this linen abaya is perfect for warmer days. The breathable fabric and relaxed silhouette make it an everyday essential.',
    shortDescription: 'Lightweight linen perfect for daily comfort',
    images: [
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800',
      'https://images.unsplash.com/photo-1590735213920-68192a487bc2?w=800',
    ],
    category: 'Casual',
    colors: ['Sand', 'Sage', 'Dusty Rose'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    rating: 4.7,
    reviewCount: 203,
  },
  {
    id: '5',
    name: 'Embroidered Heritage Abaya',
    price: 395,
    description: 'A masterpiece of traditional craftsmanship, this abaya features intricate hand-embroidered patterns inspired by Islamic geometric art. Each piece takes artisans days to complete.',
    shortDescription: 'Hand-embroidered with traditional Islamic patterns',
    images: [
      'https://images.unsplash.com/photo-1544441893-675973e31985?w=800',
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800',
    ],
    category: 'Formal',
    colors: ['Onyx Black', 'Deep Teal'],
    sizes: ['S', 'M', 'L'],
    isBestseller: true,
    rating: 5.0,
    reviewCount: 67,
  },
  {
    id: '6',
    name: 'Chiffon Layers Collection',
    price: 265,
    description: 'Multiple layers of premium chiffon create an ethereal, flowing effect that moves gracefully with every step. The subtle shimmer adds a touch of glamour to this elegant piece.',
    shortDescription: 'Multi-layered chiffon with subtle shimmer',
    images: [
      'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?w=800',
      'https://images.unsplash.com/photo-1590735213408-9d0d7a4e8f8f?w=800',
    ],
    category: 'Evening',
    colors: ['Blush Pink', 'Lavender', 'Ivory'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    isNew: true,
    rating: 4.8,
    reviewCount: 42,
  },
  {
    id: '7',
    name: 'Minimalist Modern Abaya',
    price: 195,
    description: 'Clean lines and contemporary design define this minimalist abaya. The structured silhouette and refined details make it perfect for the modern professional woman.',
    shortDescription: 'Contemporary design for the modern woman',
    images: [
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800',
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800',
    ],
    category: 'Business',
    colors: ['Charcoal', 'Camel', 'Navy'],
    sizes: ['S', 'M', 'L', 'XL'],
    rating: 4.6,
    reviewCount: 156,
  },
  {
    id: '8',
    name: 'Royal Damask Abaya',
    price: 450,
    description: 'Inspired by the grandeur of royal courts, this abaya features exquisite damask fabric with an intricate self-pattern. Gold thread accents and premium finishings make this a statement piece.',
    shortDescription: 'Luxurious damask fabric with gold accents',
    images: [
      'https://images.unsplash.com/photo-1544441893-675973e31985?w=800',
      'https://images.unsplash.com/photo-1590735213920-68192a487bc2?w=800',
    ],
    category: 'Formal',
    colors: ['Royal Black', 'Deep Maroon'],
    sizes: ['S', 'M', 'L'],
    rating: 4.9,
    reviewCount: 31,
  },
];

export const categories = ['All', 'Formal', 'Casual', 'Evening', 'Business'];
export const colors = ['Black', 'Navy', 'Burgundy', 'Pearl White', 'Champagne', 'Midnight Blue', 'Emerald', 'Sand', 'Sage'];
export const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
