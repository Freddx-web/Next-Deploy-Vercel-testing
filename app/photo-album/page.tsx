'use client';

import React, { useState } from 'react';
import { CldImage } from 'next-cloudinary';
import Image from 'next/image';

// Helper function to determine file extension
const getFileExtension = (publicId: string): string => {
  // Check if it's a local asset (starts with assets/)
  if (publicId.startsWith('assets/')) {
    return '.jpg'; // Default for local assets
  }
  
  // For Cloudinary images, we'll let Cloudinary handle the format
  return '';
};

// Check if Cloudinary is configured
const isCloudinaryConfigured = () => {
  return !!process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
};

// Helper function to get image URL
const getImageUrl = (publicId: string): string => {
  if (isCloudinaryConfigured()) {
    // Use Cloudinary public ID
    return publicId;
  }
  
  // Fallback to original URLs
  const urlMap: { [key: string]: string } = {
    'mosky-audio/g-iii-blue-purple/667d0e69a626e': 'https://i.ibb.co/B2x84PRc/667d0e69a626e.jpg',
    'mosky-audio/overdrive-dolphin/64632ad9ec563': 'https://i.ibb.co/KxdDJMGw/64632ad9ec563.jpg',
    'mosky-audio/overdrive-dolphin/64632ad9eb555': 'https://i.ibb.co/60fvZzf6/64632ad9eb555.jpg',
    'mosky-audio/overdrive-dolphin/64632ad9eb964': 'https://i.ibb.co/XfDtnBv7/64632ad9eb964.jpg',
    'mosky-audio/overdrive-dolphin/64632ad9ead27': 'https://i.ibb.co/kgXKzKvB/64632ad9ead27.jpg',
    'mosky-audio/lm741-preamp/64632fa74e960': 'https://i.ibb.co/TDhQ6VhS/64632fa74e960.jpg',
    'mosky-audio/lm741-preamp/646d744603bc2': 'https://i.ibb.co/wr3THDSf/646d744603bc2.jpg',
    'mosky-audio/lm741-preamp/646d7446044aa': 'https://i.ibb.co/3m3NffCC/646d7446044aa.jpg',
    'mosky-audio/lm741-preamp/646d744604dc2': 'https://i.ibb.co/WJ25xD0/646d744604dc2.jpg',
    'mosky-audio/cosmic-blue/64632f712b227': 'https://i.ibb.co/m5bKVvVK/64632f712b227.jpg',
    'mosky-audio/blue-ocean-chorus/60da8feaaaca0': 'https://i.ibb.co/QFYmn9Xf/60da8feaaaca0.jpg',
    'mosky-audio/blue-ocean-chorus/60da8feaab6fb': 'https://i.ibb.co/3Yrsgy5H/60da8feaab6fb.jpg',
    'mosky-audio/blue-ocean-chorus/60da8feaabf45': 'https://i.ibb.co/HfTJKJ9W/60da8feaabf45.jpg',
    'mosky-audio/sky-reverb-delay/5fe45bc5363dd': 'https://i.ibb.co/0RGvg21Z/5fe45bc5363dd.jpg',
    'mosky-audio/sky-reverb-delay/5fe45bc536993': 'https://i.ibb.co/hFf5wVj1/5fe45bc536993.jpg',
    'mosky-audio/sky-reverb-delay/5fe45bc53747f': 'https://i.ibb.co/jkqsnBYB/5fe45bc53747f.jpg',
    'mosky-audio/sol918-multi-effects/60da9377a8597': 'https://i.ibb.co/s9PBjFv2/60da9377a8597.jpg',
    'mosky-audio/sol918-multi-effects/60da9377a7d6c': 'https://i.ibb.co/GQ9yyTnD/60da9377a7d6c.jpg',
    'mosky-audio/sol918-multi-effects/60da9377a766c': 'https://i.ibb.co/hxBFwvFh/60da9377a766c.jpg',
    'mosky-audio/mad-cow/65f402af36bdd': 'https://i.ibb.co/0ypv03vF/65f402af36bdd.jpg',
    'mosky-audio/mad-cow/65faa0e789bb6': 'https://i.ibb.co/JWtWCqL7/65faa0e789bb6.jpg',
    'mosky-audio/mad-cow/65faa0e7962c5': 'https://i.ibb.co/Q75Nt253/65faa0e7962c5.jpg',
    'mosky-audio/mad-cow/65faa0e796d59': 'https://i.ibb.co/C5HPhKNj/65faa0e796d59.jpg',
    'mosky-audio/iso10-power-supply/60da957db51c0': 'https://i.ibb.co/JWndDC9j/60da957db51c0.jpg',
    'mosky-audio/iso10-power-supply/60da957db5a53': 'https://i.ibb.co/mVF967tY/60da957db5a53.jpg',
    'mosky-audio/iso10-power-supply/60da957db56c3': 'https://i.ibb.co/cSzbTJq0/60da957db56c3.jpg',
    'mosky-audio/effect-pedal-cable/581c4ce5297da': 'https://i.ibb.co/kgVHnnhr/581c4ce5297da.png',
    'm-vave/mini-universe/10339783': 'https://img.website.xin/contents/sitefiles3604/18022920/images/10339783.jpg',
    'm-vave/mini-universe/10339785': 'https://img.website.xin/contents/sitefiles3604/18022920/images/10339785.jpg',
    'm-vave/mini-universe/11019448': 'https://img.website.xin/contents/sitefiles3604/18022920/images/11019448.jpg',
    'm-vave/elemental/9719731': 'https://img.website.xin/contents/sitefiles3604/18022920/images/9719731.jpg',
    'm-vave/elemental/9719728': 'https://img.website.xin/contents/sitefiles3604/18022920/images/9719728.jpg',
    'm-vave/elemental/9719730': 'https://img.website.xin/contents/sitefiles3604/18022920/images/9719730.jpg',
    'assets/images/m-vave/annblackbox/1': './assets/images/m-vave/annblackbox/1.jpg',
    'm-vave/annblackbox/10219108': 'https://img.website.xin/contents/sitefiles3604/18022920/images/10219108.jpg',
    'm-vave/annblackbox/10219107': 'https://img.website.xin/contents/sitefiles3604/18022920/images/10219107.jpg',
    'm-vave/ir-box/9720172': 'https://img.website.xin/contents/sitefiles3604/18022920/images/9720172.jpg',
    'm-vave/ir-box/9720176': 'https://img.website.xin/contents/sitefiles3604/18022920/images/9720176.jpg',
    'm-vave/ir-box/9720173': 'https://img.website.xin/contents/sitefiles3604/18022920/images/9720173.jpg',
    'm-vave/cube-baby/8570933': 'https://img.website.xin/contents/sitefiles3604/18022920/images/8570933.png',
    'm-vave/cube-baby/8570936': 'https://img.website.xin/contents/sitefiles3604/18022920/images/8570936.jpg',
    'm-vave/cube-baby/8570935': 'https://img.website.xin/contents/sitefiles3604/18022920/images/8570935.jpg',
    'm-vave/tank-g/8376698': 'https://img.website.xin/contents/sitefiles3604/18022920/images/8376698.png',
    'm-vave/tank-g/8376699': 'https://img.website.xin/contents/sitefiles3604/18022920/images/8376699.png',
    'm-vave/tank-g/8376700': 'https://img.website.xin/contents/sitefiles3604/18022920/images/8376700.png',
    'm-vave/tank-b/8376701': 'https://img.website.xin/contents/sitefiles3604/18022920/images/8376701.png',
    'm-vave/tank-b/8376702': 'https://img.website.xin/contents/sitefiles3604/18022920/images/8376702.png',
    'm-vave/chocolate/11350155': 'https://img.website.xin/contents/sitefiles3604/18022920/images/11350155.jpg',
    'm-vave/chocolate/11350157': 'https://img.website.xin/contents/sitefiles3604/18022920/images/11350157.jpg',
    'm-vave/chocolate/11350158': 'https://img.website.xin/contents/sitefiles3604/18022920/images/11350158.jpg',
    'm-vave/pedal-power/8596626': 'https://img.website.xin/contents/sitefiles3604/18022920/images/8596626.png',
    'm-vave/wp-9/9720023': 'https://img.website.xin/contents/sitefiles3604/18022920/images/9720023.jpg',
    'm-vave/wp-9/9720024': 'https://img.website.xin/contents/sitefiles3604/18022920/images/9720024.jpg',
    'm-vave/wp-8-wireless-system/8595897': 'https://img.website.xin/contents/sitefiles3604/18022920/images/8595897.jpg',
    'm-vave/wireless-in-ear-monitor-system/10710519': 'https://img.website.xin/contents/sitefiles3604/18022920/images/10710519.jpg'
  };
  
  return urlMap[publicId] || `https://via.placeholder.com/400x400?text=${encodeURIComponent(publicId)}`;
};

// Organized photo album data by brand and category
const photoAlbum = {
  'MoskyAudio': {
    name: 'MoskyAudio Products',
    coverImage: 'mosky-audio/g-iii-blue-purple/667d0e69a626e',
    categories: {
      'Overdrive Pedals': {
        products: [
          {
            name: 'G III Blue Purple',
            images: ['mosky-audio/g-iii-blue-purple/667d0e69a626e']
          },
          {
            name: 'Overdrive Dolphin',
            images: [
              'mosky-audio/overdrive-dolphin/64632ad9ec563',
              'mosky-audio/overdrive-dolphin/64632ad9eb555',
              'mosky-audio/overdrive-dolphin/64632ad9eb964',
              'mosky-audio/overdrive-dolphin/64632ad9ead27'
            ]
          }
        ]
      },
      'Preamp Pedals': {
        products: [
          {
            name: 'LM741 Preamp',
            images: [
              'mosky-audio/lm741-preamp/64632fa74e960',
              'mosky-audio/lm741-preamp/646d744603bc2',
              'mosky-audio/lm741-preamp/646d7446044aa',
              'mosky-audio/lm741-preamp/646d744604dc2'
            ]
          }
        ]
      },
      'Modulation Effects': {
        products: [
          {
            name: 'Cosmic Blue',
            images: ['mosky-audio/cosmic-blue/64632f712b227']
          },
          {
            name: 'Blue Ocean Chorus',
            images: [
              'mosky-audio/blue-ocean-chorus/60da8feaaaca0',
              'mosky-audio/blue-ocean-chorus/60da8feaab6fb',
              'mosky-audio/blue-ocean-chorus/60da8feaabf45'
            ]
          }
        ]
      },
      'Time-Based Effects': {
        products: [
          {
            name: 'Sky Reverb Delay',
            images: [
              'mosky-audio/sky-reverb-delay/5fe45bc5363dd',
              'mosky-audio/sky-reverb-delay/5fe45bc536993',
              'mosky-audio/sky-reverb-delay/5fe45bc53747f'
            ]
          }
        ]
      },
      'Multi Effects': {
        products: [
          {
            name: 'SOL918 Multi Effects',
            images: [
              'mosky-audio/sol918-multi-effects/60da9377a8597',
              'mosky-audio/sol918-multi-effects/60da9377a7d6c',
              'mosky-audio/sol918-multi-effects/60da9377a766c'
            ]
          }
        ]
      },
      'Fuzz/Distortion': {
        products: [
          {
            name: 'Mad Cow',
            images: [
              'mosky-audio/mad-cow/65f402af36bdd',
              'mosky-audio/mad-cow/65faa0e789bb6',
              'mosky-audio/mad-cow/65faa0e7962c5',
              'mosky-audio/mad-cow/65faa0e796d59'
            ]
          }
        ]
      },
      'Power Supply': {
        products: [
          {
            name: 'ISO10 Power Supply',
            images: [
              'mosky-audio/iso10-power-supply/60da957db51c0',
              'mosky-audio/iso10-power-supply/60da957db5a53',
              'mosky-audio/iso10-power-supply/60da957db56c3'
            ]
          }
        ]
      },
      'Accessories': {
        products: [
          {
            name: 'Effect Pedal Cable',
            images: ['mosky-audio/effect-pedal-cable/581c4ce5297da']
          }
        ]
      }
    }
  },
  'M-VAVE': {
    name: 'M-VAVE Products',
    coverImage: 'm-vave/mini-universe/10339783',
    categories: {
      'Multi Effects Pedals': {
        products: [
          {
            name: 'Mini Universe',
            images: [
              'm-vave/mini-universe/10339783',
              'm-vave/mini-universe/10339785',
              'm-vave/mini-universe/11019448'
            ]
          },
          {
            name: 'Elemental',
            images: [
              'm-vave/elemental/9719731',
              'm-vave/elemental/9719728',
              'm-vave/elemental/9719730'
            ]
          }
        ]
      },
      'Loopers & Recorders': {
        products: [
          {
            name: 'Annblackbox',
            images: [
              'assets/images/m-vave/annblackbox/1',
              'm-vave/annblackbox/10219108',
              'm-vave/annblackbox/10219107'
            ]
          }
        ]
      },
      'IR Processors': {
        products: [
          {
            name: 'IR BOX',
            images: [
              'm-vave/ir-box/9720172',
              'm-vave/ir-box/9720176',
              'm-vave/ir-box/9720173'
            ]
          }
        ]
      },
      'Compact Pedals': {
        products: [
          {
            name: 'CUBE BABY',
            images: [
              'm-vave/cube-baby/8570933',
              'm-vave/cube-baby/8570936',
              'm-vave/cube-baby/8570935'
            ]
          }
        ]
      },
      'Amplifier Simulators': {
        products: [
          {
            name: 'TANK G',
            images: [
              'm-vave/tank-g/8376698',
              'm-vave/tank-g/8376699',
              'm-vave/tank-g/8376700'
            ]
          },
          {
            name: 'TANK B',
            images: [
              'm-vave/tank-b/8376701',
              'm-vave/tank-b/8376702',
              'm-vave/tank-b/8376700'
            ]
          },
          {
            name: 'CHOCOLATE',
            images: [
              'm-vave/chocolate/11350155',
              'm-vave/chocolate/11350157',
              'm-vave/chocolate/11350158'
            ]
          }
        ]
      },
      'Power Supply': {
        products: [
          {
            name: 'PEDAL POWER',
            images: ['m-vave/pedal-power/8596626']
          }
        ]
      },
      'Wireless Systems': {
        products: [
          {
            name: 'WP 9',
            images: [
              'm-vave/wp-9/9720023',
              'm-vave/wp-9/9720024'
            ]
          },
          {
            name: 'WP 8 Wireless System',
            images: ['m-vave/wp-8-wireless-system/8595897']
          },
          {
            name: 'Wireless In-Ear Monitor System',
            images: ['m-vave/wireless-in-ear-monitor-system/10710519']
          }
        ]
      }
    }
  }
};

export default function PhotoAlbum() {
  const [selectedBrand, setSelectedBrand] = useState<string>('MoskyAudio');
  const [selectedCategory, setSelectedCategory] = useState<string>('Overdrive Pedals');
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);

  const currentBrand = photoAlbum[selectedBrand as keyof typeof photoAlbum];
  const currentCategory = currentBrand?.categories[selectedCategory as keyof typeof currentBrand.categories];

  const openProductModal = (productName: string) => {
    setSelectedProduct(productName);
    setSelectedImageIndex(0);
  };

  const closeModal = () => {
    setSelectedProduct(null);
    setSelectedImageIndex(0);
  };

  const nextImage = () => {
    if (selectedProduct && currentCategory) {
      const product = currentCategory.products.find(p => p.name === selectedProduct);
      if (product) {
        setSelectedImageIndex((prev) => (prev + 1) % product.images.length);
      }
    }
  };

  const prevImage = () => {
    if (selectedProduct && currentCategory) {
      const product = currentCategory.products.find(p => p.name === selectedProduct);
      if (product) {
        setSelectedImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">Photo Album by Category</h1>
        
        {/* Brand Selection */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Select Brand</h2>
          <div className="flex gap-4 flex-wrap">
            {Object.entries(photoAlbum).map(([brandKey, brand]) => (
              <button
                key={brandKey}
                onClick={() => {
                  setSelectedBrand(brandKey);
                  const firstCategory = Object.keys(brand.categories)[0];
                  setSelectedCategory(firstCategory);
                }}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  selectedBrand === brandKey
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                }`}
              >
                {brand.name}
              </button>
            ))}
          </div>
        </div>

        {/* Category Selection */}
        {currentBrand && (
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Select Category</h2>
            <div className="flex gap-3 flex-wrap">
              {Object.keys(currentBrand.categories).map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-green-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Products Grid */}
        {currentCategory && (
          <div>
            <h2 className="text-2xl font-semibold mb-6">
              {selectedCategory} ({currentCategory.products.length} products)
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentCategory.products.map((product) => (
                <div
                  key={product.name}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => openProductModal(product.name)}
                >
                  <div className="aspect-square relative">
                    {isCloudinaryConfigured() ? (
                      <CldImage
                        src={getImageUrl(product.images[0])}
                        alt={product.name}
                        width={400}
                        height={400}
                        crop="fill"
                        gravity="auto"
                        className="object-cover"
                        deliveryType="upload"
                        format="auto"
                      />
                    ) : (
                      <Image
                        src={getImageUrl(product.images[0])}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    )}
                    {product.images.length > 1 && (
                      <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
                        +{product.images.length - 1} more
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg text-gray-900">{product.name}</h3>
                    <p className="text-gray-600 text-sm mt-1">{product.images.length} image{product.images.length > 1 ? 's' : ''}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Image Modal */}
        {selectedProduct && currentCategory && (
          <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
              <div className="p-4 border-b flex justify-between items-center">
                <h3 className="text-xl font-semibold">{selectedProduct}</h3>
                <button
                  onClick={closeModal}
                  className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
                >
                  ×
                </button>
              </div>
              <div className="p-4">
                <div className="relative aspect-video mb-4">
                  {isCloudinaryConfigured() ? (
                    <CldImage
                      src={getImageUrl(currentCategory.products.find(p => p.name === selectedProduct)?.images[selectedImageIndex] || '')}
                      alt={`${selectedProduct} - Image ${selectedImageIndex + 1}`}
                      width={800}
                      height={600}
                      crop="fill"
                      gravity="auto"
                      className="object-contain"
                      deliveryType="upload"
                      format="auto"
                    />
                  ) : (
                    <Image
                      src={getImageUrl(currentCategory.products.find(p => p.name === selectedProduct)?.images[selectedImageIndex] || '')}
                      alt={`${selectedProduct} - Image ${selectedImageIndex + 1}`}
                      fill
                      className="object-contain"
                    />
                  )}
                </div>
                <div className="flex justify-between items-center">
                  <button
                    onClick={prevImage}
                    className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg disabled:opacity-50"
                    disabled={currentCategory.products.find(p => p.name === selectedProduct)?.images.length === 1}
                  >
                    Previous
                  </button>
                  <span className="text-gray-600">
                    {selectedImageIndex + 1} / {currentCategory.products.find(p => p.name === selectedProduct)?.images.length}
                  </span>
                  <button
                    onClick={nextImage}
                    className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg disabled:opacity-50"
                    disabled={currentCategory.products.find(p => p.name === selectedProduct)?.images.length === 1}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
