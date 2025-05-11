const ALL_PRODUCTS = [
  {
    id: 1,
    name: "Premium Face Cream",
    category: "Skin Care",
    slug: "skin-care",
    price: 29.99,
    discountPrice: 24.99,
    rating: 4.5,
    reviews: 128,
    description: "Our luxurious face cream is formulated with rare marula oil and advanced peptides to deeply hydrate while reducing the appearance of fine lines and wrinkles. Suitable for all skin types.",
    ingredients: "Aqua, Marula Oil, Glycerin, Squalane, Peptide Complex, Hyaluronic Acid, Vitamin E",
    howToUse: "Apply a small amount to clean face and neck every morning and evening. Gently massage in upward motions.",
    image: "https://www.byrdie.com/thmb/OehxtSdUYnNauaLpU5GqQ8F7un4=/400x0/filters:no_upscale():max_bytes(150000):strip_icc()/drunk-elephant-marula-oil-11845abc4f2541ba9ef64231fb2d9f27.jpg",
    images: [
      "https://www.byrdie.com/thmb/OehxtSdUYnNauaLpU5GqQ8F7un4=/400x0/filters:no_upscale():max_bytes(150000):strip_icc()/drunk-elephant-marula-oil-11845abc4f2541ba9ef64231fb2d9f27.jpg",
      "https://www.byrdie.com/thmb/OehxtSdUYnNauaLpU5GqQ8F7un4=/400x0/filters:no_upscale():max_bytes(150000):strip_icc()/drunk-elephant-marula-oil-11845abc4f2541ba9ef64231fb2d9f27.jpg",
      "https://www.byrdie.com/thmb/OehxtSdUYnNauaLpU5GqQ8F7un4=/400x0/filters:no_upscale():max_bytes(150000):strip_icc()/drunk-elephant-marula-oil-11845abc4f2541ba9ef64231fb2d9f27.jpg"
    ],
    isFavorite: false,
    inStock: true,
    sku: "BEAU-2023-SC01",
    brand: "Luxury Beauty"
  },
  {
    id: 2,
    name: "Hair Growth Serum",
    category: "Hair Care",
    slug: "hair-care",
    price: 34.99,
    discountPrice: 27.99,
    rating: 4.2,
    reviews: 89,
    description: "This powerful serum stimulates hair follicles with natural ingredients to promote thicker, stronger hair growth while reducing breakage and split ends.",
    ingredients: "Rosemary Oil, Peppermint Oil, Biotin, Niacin, Saw Palmetto, Jojoba Oil",
    howToUse: "Apply 3-5 drops directly to scalp daily, massaging gently for 1-2 minutes. Leave in and style as usual.",
    image: "https://vader-prod.s3.amazonaws.com/1656077250-13442792-1424913539756896.jpg",
    images: [
      "https://vader-prod.s3.amazonaws.com/1656077250-13442792-1424913539756896.jpg",
      "https://vader-prod.s3.amazonaws.com/1656077250-13442792-1424913539756896.jpg",
      "https://vader-prod.s3.amazonaws.com/1656077250-13442792-1424913539756896.jpg"
    ],
    isFavorite: false,
    inStock: true,
    sku: "BEAU-2023-HS02",
    brand: "Hair Revival"
  },
  {
    id: 3,
    name: "Men's Grooming Kit",
    category: "Men",
    slug: "men",
    price: 49.99,
    discountPrice: 39.99,
    rating: 4.7,
    reviews: 156,
    description: "Complete grooming set for men featuring premium skincare and shaving products designed specifically for men's skin needs.",
    ingredients: "Aloe Vera, Tea Tree Oil, Charcoal, Shea Butter, Vitamin E",
    howToUse: "Use cleanser daily, apply moisturizer after cleansing, and use shaving products as needed.",
    image: "https://ke3nbeauty.com/wp-content/uploads/2023/06/001-Brown-lotion-2-scaled-1.jpg",
    images: [
      "https://ke3nbeauty.com/wp-content/uploads/2023/06/001-Brown-lotion-2-scaled-1.jpg",
      "https://ke3nbeauty.com/wp-content/uploads/2023/06/001-Brown-lotion-2-scaled-1.jpg",
      "https://ke3nbeauty.com/wp-content/uploads/2023/06/001-Brown-lotion-2-scaled-1.jpg"
    ],
    isFavorite: false,
    inStock: true,
    sku: "BEAU-2023-MG03",
    brand: "Gentleman's Care"
  },
  {
    id: 4,
    name: "Luxury Makeup Set",
    category: "MakeUp",
    slug: "makeup",
    price: 59.99,
    discountPrice: 49.99,
    rating: 4.8,
    reviews: 210,
    description: "Professional-grade makeup collection with full coverage foundation, long-wear lipstick, and versatile eyeshadow palette for creating any look.",
    ingredients: "Mica, Titanium Dioxide, Iron Oxides, Jojoba Esters, Vitamin E",
    howToUse: "Apply foundation with brush or sponge, use eyeshadow palette to create desired eye look, finish with lipstick.",
    image: "https://www.byrdie.com/thmb/s0Mqz8eR0FVwB_l-Ugn4joDjb2k=/400x0/filters:no_upscale():max_bytes(150000):strip_icc()/the-ordinary-squalane-ebac0a25274c4c2280bd8e7174b46b6f.jpg",
    images: [
      "https://www.byrdie.com/thmb/s0Mqz8eR0FVwB_l-Ugn4joDjb2k=/400x0/filters:no_upscale():max_bytes(150000):strip_icc()/the-ordinary-squalane-ebac0a25274c4c2280bd8e7174b46b6f.jpg",
      "https://www.byrdie.com/thmb/s0Mqz8eR0FVwB_l-Ugn4joDjb2k=/400x0/filters:no_upscale():max_bytes(150000):strip_icc()/the-ordinary-squalane-ebac0a25274c4c2280bd8e7174b46b6f.jpg",
      "https://www.byrdie.com/thmb/s0Mqz8eR0FVwB_l-Ugn4joDjb2k=/400x0/filters:no_upscale():max_bytes(150000):strip_icc()/the-ordinary-squalane-ebac0a25274c4c2280bd8e7174b46b6f.jpg"
    ],
    isFavorite: false,
    inStock: true,
    sku: "BEAU-2023-MU04",
    brand: "Glamour Cosmetics"
  },
  {
    id: 5,
    name: "Baby Care Kit",
    category: "Baby Care",
    slug: "baby-care",
    price: 39.99,
    discountPrice: 34.99,
    rating: 4.9,
    reviews: 187,
    description: "Gentle, hypoallergenic baby care products formulated with natural ingredients to nourish and protect delicate baby skin.",
    ingredients: "Chamomile Extract, Calendula Oil, Coconut Oil, Aloe Vera, Vitamin E",
    howToUse: "Use shampoo for bath time, apply lotion after bathing, and use diaper cream as needed.",
    image: "https://atlas-content-cdn.pixelsquid.com/stock-images/baby-care-set-body-wash-nr11RxE-600.jpg",
    images: [
      "https://atlas-content-cdn.pixelsquid.com/stock-images/baby-care-set-body-wash-nr11RxE-600.jpg",
      "https://atlas-content-cdn.pixelsquid.com/stock-images/baby-care-set-body-wash-nr11RxE-600.jpg",
      "https://atlas-content-cdn.pixelsquid.com/stock-images/baby-care-set-body-wash-nr11RxE-600.jpg"
    ],
    isFavorite: false,
    inStock: true,
    sku: "BEAU-2023-BC05",
    brand: "Pure Baby"
  },
  {
    id: 6,
    name: "Women's Perfume",
    category: "Women",
    slug: "women",
    price: 45.99,
    discountPrice: 39.99,
    rating: 4.6,
    reviews: 132,
    description: "Elegant floral fragrance with notes of jasmine, rose, and vanilla, creating a sophisticated and long-lasting scent.",
    ingredients: "Alcohol Denat., Fragrance, Water, Benzyl Salicylate, Linalool",
    howToUse: "Spray on pulse points (wrists, neck) from a distance of 6-8 inches. Avoid rubbing wrists together.",
    image: "https://media.istockphoto.com/id/178132583/photo/perfume-bottle.jpg?s=612x612&w=0&k=20&c=UyEDo1NFgdDnxZuPgxYVpOq3hX7RAlZhwxw1muHAoek=",
    images: [
      "https://media.istockphoto.com/id/178132583/photo/perfume-bottle.jpg?s=612x612&w=0&k=20&c=UyEDo1NFgdDnxZuPgxYVpOq3hX7RAlZhwxw1muHAoek=",
      "https://media.istockphoto.com/id/178132583/photo/perfume-bottle.jpg?s=612x612&w=0&k=20&c=UyEDo1NFgdDnxZuPgxYVpOq3hX7RAlZhwxw1muHAoek=",
      "https://media.istockphoto.com/id/178132583/photo/perfume-bottle.jpg?s=612x612&w=0&k=20&c=UyEDo1NFgdDnxZuPgxYVpOq3hX7RAlZhwxw1muHAoek="
    ],
    isFavorite: false,
    inStock: true,
    sku: "BEAU-2023-PF06",
    brand: "Elegance Fragrances"
  }
];

export default ALL_PRODUCTS;