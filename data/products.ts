// This file contains all products data for the application
export const products = [
  // Whiskey
  {
    id: 1,
    name: "Macallan 12 Year Old",
    brand: "Macallan",
    category: "Whiskey",
    price: 89.99,
    currentPrice: 89.99,
    originalPrice: 99.99,
    badges: ["sale"],
    rating: 4.8,
    image: "/images/products/whiskey/Macallan-12-Year-Old.jpg",
    slug: "macallan-12-year-old",
    inStock: true, // Developer-controlled stock status
    stockCount: 25, // Developer-controlled stock quantity
    description:
      "The Macallan 12 Year Old Double Cask has been matured in both American and European oak sherry seasoned casks. This unique pairing delivers a distinctly sweeter, warmer taste when compared to its Sherry Oak and Fine Oak counterparts.",
    details: {
      origin: "Scotland",
      region: "Speyside",
      abv: "43%",
      size: "750ml",
      age: "12 Years",
    },
    reviews: [
      {
        id: 1,
        name: "James Wilson",
        rating: 5,
        date: "2023-05-15",
        comment:
          "Excellent whiskey with a perfect balance of flavors. The sherry influence is evident but not overwhelming.",
      },
      {
        id: 2,
        name: "Sarah Thompson",
        rating: 4,
        date: "2023-04-22",
        comment: "Very smooth and enjoyable. Great value for a 12 year old single malt.",
      },
    ],
    relatedProducts: [7, 9, 10],
  },
  {
    id: 2,
    name: "Lagavulin 16 Year Old",
    brand: "Lagavulin",
    category: "Whiskey",
    price: 79.99,
    badges: ["sold-out"],
    rating: 4.7,
    image: "/images/products/whiskey/lagavulin-16-year-old.jpg",
    slug: "lagavulin-16-year-old",
    inStock: false, // Out of stock example
    stockCount: 0,
    description:
      "Lagavulin 16 Year Old is an iconic Islay single malt whisky, known for its intense peat smoke character balanced with rich, deep sweetness. Matured in oak casks for at least 16 years, it delivers a powerful, peat-smoke aroma with sweet spice and hints of sea salt and seaweed.",
    details: {
      origin: "Scotland",
      region: "Islay",
      abv: "43%",
      size: "750ml",
      age: "16 Years",
    },
  },
  {
    id: 3,
    name: "Chivas Regal 12 Year",
    brand: "Chivas Regal",
    category: "Whiskey",
    price: 37.99,
    badges: ["new"],
    rating: 4.5,
    image: "/images/products/whiskey/Chivas Regal 12 Year Old - Gift Box _ The Whisky….jpg",
    slug: "chivas-regal-12-year", // This slug seems correct based on server render. The client was expecting "buffalo-trace-bourbon"
    inStock: true,
    stockCount: 45,
    description:
      "Premium blended Scotch (75cl, 12yr); balanced sweet fruit and soft smoke. 12-year-old blended Scotch (Scotland). Smooth and mellow. Flavors of ripe orchard fruits, honey and vanilla, with a hint of heather and butterscotch",
    details: {
      origin: "United States",
      region: "Kentucky",
      abv: "45%",
      size: "750ml",
      type: "Bourbon",
    },
  },
  {
    id: 4,
    name: "Jack Daniel’s Old No.7",
    brand: "Jack Daniel's",
    category: "Whiskey",
    price: 24.99,
    badges: [],
    rating: 4.6,
    image: "/images/products/whiskey/jackDaniel.jpg", // Assuming this image name is intentional and matches the file
    slug: "jack-daniels-old-no7", // This slug seems correct based on server render. The client was expecting "redbreast-12-year-old"
    inStock: true,
    stockCount: 18,
    description:
      "Tennessee whiskey (USA) – charcoal-mellowed “Bourbon style”. Sweet & oaky: caramel and vanilla flavors with toasted oak and a hint of smoke",
    details: {
      origin: "Ireland",
      region: "Cork",
      abv: "40%",
      size: "750ml",
      age: "12 Years",
    },
  },
  {
    id: 5,
    name: "Monkey Shoulder",
    brand: "Monkey Shoulder",
    category: "Whiskey",
    price: 50.99,
    badges: [],
    rating: 4.7,
    image: "/images/products/MonkeyShoulder.jpg",
    slug: "monkey-shoulder",
    inStock: true,
    stockCount: 35,
    description:
      "This authentic masala chai blend combines premium Assam black tea with freshly ground spices including cardamom, cinnamon, ginger, cloves, and black pepper. The result is a rich, aromatic tea that can be prepared traditionally with milk for a comforting, spicy brew.",
    details: {
      origin: "India",
      base: "Assam Black Tea",
      spices: "Cardamom, cinnamon, ginger, cloves, black pepper",
      size: "200g",
      brewing: "Simmer with water and milk",
    },
  },
  {
    id: 6,
    name: "Black Label",
    brand: "Black Label",
    category: "Whiskey",
    price: 35.99,
    badges: [],
    rating: 4.7,
    image: "/images/products/whiskey/blackLabel.jpg",
    slug: "Black-Label",
    inStock: true,
    stockCount: 35,
    description:
      "Sophisticated and versatile — suitable for both sipping and cocktails",
      details: {
        origin: "United States",
        region: "Kentucky",
        abv: "45%",
        size: "750ml",
        type: "Bourbon",
      },
  },
  {
    id: 7,
    name: "Green Label",
    brand: "Green Label",
    category: "Whiskey",
    price: 75,
    badges: [],
    rating: 4.7,
    image: "/images/products/whiskey/GreenLabel.jpg",
    slug: "green-label",
    inStock: true,
    stockCount: 35,
    description:
      "This authentic masala chai blend combines premium Assam black tea with freshly ground spices including cardamom, cinnamon, ginger, cloves, and black pepper. The result is a rich, aromatic tea that can be prepared traditionally with milk for a comforting, spicy brew.",
    details: {
      origin: "India",
      base: "Assam Black Tea",
      spices: "Cardamom, cinnamon, ginger, cloves, black pepper",
      size: "200g",
      brewing: "Simmer with water and milk",
    },
  },
  {
    id: 8,
    name: "Gold Label",
    brand: "Gold Label",
    category: "Whiskey",
    price: 84,
    badges: [],
    rating: 4.7,
    image: "/images/products/whiskey/GoldLabel.jpg",
    slug: "gold-Label",
    inStock: true,
    stockCount: 35,
    description:
      "Sophisticated and versatile — suitable for both sipping and cocktails",
      details: {
        origin: "United States",
        region: "Kentucky",
        abv: "45%",
        size: "750ml",
        type: "Bourbon",
      },
  },
  {
    id: 9,
    name: "Red Label",
    brand: "Red Label",
    category: "Whiskey",
    price: 16.67,
    badges: [],
    rating: 4.7,
    image: "/images/products/whiskey/Johnnie Walker Red Label.jpg",
    slug: "red-Label",
    inStock: true,
    stockCount: 35,
    description:
      "Sophisticated and versatile — suitable for both sipping and cocktails",
      details: {
        origin: "United States",
        region: "Kentucky",
        abv: "45%",
        size: "750ml",
        type: "Bourbon",
      },
  },
  {
    id: 10,
    name: "Blue Label",
    brand: "Blue Label",
    category: "Whiskey",
    price: 84,
    badges: [],
    rating: 4.7,
    image: "/images/products/whiskey/blueLabel.jpg",
    slug: "blue-Label",
    inStock: true,
    stockCount: 35,
    description:
      "Sophisticated and versatile — suitable for both sipping and cocktails",
      details: {
        origin: "United States",
        region: "Kentucky",
        abv: "45%",
        size: "750ml",
        type: "Bourbon",
      },
  },
  {
    id: 11,
    name: "Ballantine’s 12 Year",
    brand: "Ballantine’s",
    category: "Whiskey",
    price: 16.9,
    badges: [],
    rating: 4.7,
    image: "/images/products/whiskey/BALLANTINE'S 12 YEAR OLD True Music Reeps One….jpg",
    slug: "ballantine",
    inStock: true,
    stockCount: 35,
    description:
      "Sophisticated and versatile — suitable for both sipping and cocktails",
      details: {
        origin: "United States",
        region: "Kentucky",
        abv: "45%",
        size: "750ml",
        type: "Bourbon",
      },
  },
  {
    id: 12,
    name: "Glenrothes Select Reserve",
    brand: "Glenrothes",
    category: "Whiskey",
    price: 32.5,
    badges: [],
    rating: 4.7,
    image: "/images/products/whiskey/Glenrothes Select Reserve (£32).jpg",
    slug: "Glenrothes",
    inStock: true,
    stockCount: 35,
    description:
      "Sophisticated and versatile — suitable for both sipping and cocktails",
      details: {
        origin: "United States",
        region: "Kentucky",
        abv: "45%",
        size: "750ml",
        type: "Bourbon",
      },
  },
  {
    id: 13,
    name: "Glenfiddich 15 Year Solera (Scotland) ",
    brand: "Glenfiddich",
    category: "Whiskey",
    price: 32.5,
    badges: [],
    rating: 4.7,
    image: "/images/products/whiskey/Glenfiddich 15 Year Solera.jpg",
    slug: "Glenfiddich",
    inStock: true,
    stockCount: 35,
    description:
      "Sophisticated and versatile — suitable for both sipping and cocktails",
      details: {
        origin: "United States",
        region: "Kentucky",
        abv: "45%",
        size: "750ml",
        type: "Bourbon",
      },
  },
  // Wine
  {
    id: 21,
    name: "Château Margaux 2015",
    brand: "Château Margaux",
    category: "Wine",
    price: 399.99,
    badges: ["new"],
    rating: 4.9,
    image: "/images/products/chateau-margaux-2015.jpg",
    slug: "chateau-margaux-2015",
    inStock: true,
    stockCount: 10,
    description:
      "The 2015 Château Margaux is a blend of 87% Cabernet Sauvignon, 8% Merlot, 3% Cabernet Franc and 2% Petit Verdot. Deep garnet-purple colored, the nose features fragrant notes of fresh flowers and crushed blackberries with hints of spice box, cedar chest and pencil lead plus a waft of tapenade.",
    details: {
      origin: "France",
      region: "Bordeaux",
      vintage: "2015",
      size: "750ml",
      grapeVariety: "Cabernet Sauvignon Blend",
    },
  },
  // Beer
  {
    id: 41,
    name: "Westvleteren 12",
    brand: "Westvleteren",
    category: "Beer",
    price: 24.99,
    badges: ["new"],
    rating: 4.7,
    image: "/images/products/westvleteren-12.jpg",
    slug: "westvleteren-12",
    inStock: true,
    stockCount: 50,
    description:
      "Westvleteren 12 is a world-renowned Trappist beer brewed by the monks of the Saint Sixtus Abbey in Belgium. This quadrupel-style ale is known for its complex flavors of dark fruit, caramel, and chocolate with a warming alcohol presence.",
    details: {
      origin: "Belgium",
      style: "Quadrupel",
      abv: "10.2%",
      size: "330ml",
      brewery: "Brouwerij Westvleteren",
    },
  },
  // Champagne
  {
    id: 61,
    name: "Dom Pérignon Vintage 2010",
    brand: "Dom Pérignon",
    category: "Champagne",
    price: 189.99,
    badges: ["sale"],
    rating: 4.9,
    image: "/images/products/dom-perignon-vintage-2010.jpg",
    slug: "dom-perignon-vintage-2010",
    inStock: true,
    stockCount: 15,
    description:
      "The 2010 vintage Dom Pérignon is a champagne of remarkable precision and energy. The bouquet spirals through sweet, bright floral notes and the lively minerality so typical of Dom Pérignon, then notes of candied fruit, plants, camphor leaf and finally the dark hints of spices and licorice root.",
    details: {
      origin: "France",
      region: "Champagne",
      vintage: "2010",
      size: "750ml",
      grapeVariety: "Chardonnay, Pinot Noir",
    },
  },
  // Spirits
  {
    id: 81,
    name: "Hennessy XO",
    brand: "Hennessy",
    category: "Spirits",
    price: 199.99,
    badges: ["new"],
    rating: 4.8,
    image: "/images/products/hennessy-xo.jpg",
    slug: "hennessy-xo",
    inStock: true,
    stockCount: 20,
    description:
      "Hennessy X.O is a cognac of extraordinary depth and complexity. Created in 1870 by Maurice Hennessy for his circle of friends, this deeply amber cognac is the result of blending over 100 eaux-de-vie aged up to 30 years.",
    details: {
      origin: "France",
      region: "Cognac",
      abv: "40%",
      size: "750ml",
      type: "Cognac",
    },
  },
  // Hot Drinks
  {
    id: 101,
    name: "Ethiopian Yirgacheffe Coffee",
    brand: "Yirgacheffe",
    category: "Hot Drinks",
    price: 18.99,
    badges: ["new"],
    rating: 4.8,
    image: "/images/products/ethiopian-yirgacheffe-coffee.jpg",
    slug: "ethiopian-yirgacheffe-coffee",
    inStock: true,
    stockCount: 40,
    description:
      "This premium Ethiopian Yirgacheffe coffee offers a bright, clean taste with complex floral and citrus notes. Sourced from small farms in the Yirgacheffe region, these beans are carefully roasted to bring out their distinctive flavor profile.",
    details: {
      origin: "Ethiopia",
      region: "Yirgacheffe",
      roast: "Medium",
      size: "12oz (340g)",
      process: "Washed",
    },
  },
  {
    id: 102,
    name: "Jasmine Dragon Pearl Tea",
    brand: "Jasmine Dragon",
    category: "Hot Drinks",
    price: 24.99,
    badges: ["new"],
    rating: 4.7,
    image: "/images/products/jasmine-dragon-pearl-tea.jpg",
    slug: "jasmine-dragon-pearl-tea",
    inStock: true,
    stockCount: 25,
    description:
      "Jasmine Dragon Pearl is a premium Chinese tea where each pearl is hand-rolled from tender tea leaves and scented with fresh jasmine blossoms. When steeped, these pearls unfurl to release a sweet, floral aroma and smooth flavor.",
    details: {
      origin: "China",
      region: "Fujian Province",
      type: "Green Tea",
      size: "100g",
      brewing: "175°F for 2-3 minutes",
    },
  },
  {
    id: 103,
    name: "Ceremonial Grade Matcha",
    brand: "Matcha",
    category: "Hot Drinks",
    price: 39.99,
    badges: ["new"],
    rating: 4.9,
    image: "/images/products/ceremonial-grade-matcha.jpg",
    slug: "ceremonial-grade-matcha",
    inStock: true,
    stockCount: 15,
    description:
      "This ceremonial grade matcha is stone-ground from shade-grown tea leaves, producing a vibrant green powder with a smooth, umami flavor. Perfect for traditional matcha preparation, it offers a clean, subtle sweetness with no bitterness.",
    details: {
      origin: "Japan",
      region: "Uji, Kyoto",
      grade: "Ceremonial",
      size: "30g",
      harvest: "First flush (spring)",
    },
  },
  {
    id: 104,
    name: "Mexican Hot Chocolate Kit",
    brand: "Mexican Chocolate",
    category: "Hot Drinks",
    price: 22.99,
    badges: ["sold-out"],
    rating: 4.6,
    image: "/images/products/mexican-hot-chocolate-kit.jpg",
    slug: "mexican-hot-chocolate-kit",
    inStock: false, // Out of stock example
    stockCount: 0,
    description:
      "This authentic Mexican hot chocolate kit includes traditional stone-ground chocolate tablets infused with cinnamon and a hint of chili. The kit comes with a hand-carved wooden molinillo (whisk) for creating the perfect frothy texture.",
    details: {
      origin: "Mexico",
      ingredients: "Cacao, cane sugar, cinnamon, chili",
      servings: "8",
      includes: "Chocolate tablets, molinillo",
      preparation: "Heat with milk and whisk until frothy",
    },
  },
  {
    id: 105,
    name: "Masala Chai Blend",
    brand: "Masala Chai",
    category: "Hot Drinks",
    price: 16.99,
    badges: ["new"],
    rating: 4.7,
    image: "/images/products/masala-chai-blend.jpg",
    slug: "masala-chai-blend",
    inStock: true,
    stockCount: 35,
    description:
      "This authentic masala chai blend combines premium Assam black tea with freshly ground spices including cardamom, cinnamon, ginger, cloves, and black pepper. The result is a rich, aromatic tea that can be prepared traditionally with milk for a comforting, spicy brew.",
    details: {
      origin: "India",
      base: "Assam Black Tea",
      spices: "Cardamom, cinnamon, ginger, cloves, black pepper",
      size: "200g",
      brewing: "Simmer with water and milk",
    },
  },
  // Gin
  {
    id: 121,
    name: "Gordon's Dry Gin",
    brand: "Gordon's",
    category: "Gin",
    price: 16.99, // ~10,200 FCFA
    badges: ["sale"],
    rating: 4.6,
    image: "/images/products/gin/gordons.jpg",
    slug: "gordons-dry-gin",
    inStock: true,
    stockCount: 100,
    description: "The world's best-selling London Dry gin. A distinctively refreshing taste from the finest juniper berries. Very popular in Cameroon for its quality and accessibility.",
    details: {
      origin: "United Kingdom",
      style: "London Dry Gin",
      abv: "37.5%",
      size: "750ml",
      availability: "Widely available in Cameroon"
    }
  },
  {
    id: 122,
    name: "Beefeater London Dry Gin",
    brand: "Beefeater",
    category: "Gin",
    price: 19.99, // ~12,000 FCFA
    badges: ["new"],
    rating: 4.7,
    image: "/images/products/gin/beefeater.jpg",
    slug: "beefeater-gin",
    inStock: true,
    stockCount: 75,
    description: "A classic London Dry Gin with a bold juniper character, making it perfect for gin and tonic or cocktails. Well-established in the Cameroonian market.",
    details: {
      origin: "England",
      style: "London Dry Gin",
      abv: "40%",
      size: "750ml",
      availability: "Common in Cameroon bars and stores"
    }
  },
  {
    id: 123,
    name: "Tanqueray London Dry Gin",
    brand: "Tanqueray",
    category: "Gin",
    price: 22.99, // ~13,800 FCFA
    badges: [],
    rating: 4.8,
    image: "/images/products/gin/tanqueray.jpg",
    slug: "tanqueray-gin",
    inStock: true,
    stockCount: 60,
    description: "A perfectly balanced gin with a distinctive flavor of piney juniper and subtle citrus notes. Popular in premium bars across Cameroon.",
    details: {
      origin: "England",
      style: "London Dry Gin",
      abv: "43.1%",
      size: "750ml",
      availability: "Available in major cities"
    }
  },
  {
    id: 124,
    name: "Gin Royal",
    brand: "Gin Royal",
    category: "Gin",
    price: 12.99, // ~7,800 FCFA
    badges: [],
    rating: 4.3,
    image: "/images/products/gin/gin-royal.jpg",
    slug: "gin-royal",
    inStock: true,
    stockCount: 150,
    description: "A popular gin choice in Cameroon, known for its accessible price point and reliable quality. Perfect for mixed drinks and parties.",
    details: {
      origin: "Cameroon",
      style: "Dry Gin",
      abv: "40%",
      size: "750ml",
      availability: "Widely available throughout Cameroon"
    }
  },
  // Vodka
  {
    id: 141,
    name: "Smirnoff Red",
    brand: "Smirnoff",
    category: "Vodka",
    price: 15.99, // ~9,600 FCFA
    badges: ["sale"],
    rating: 4.5,
    image: "/images/products/vodka/smirnoff-red.jpg",
    slug: "smirnoff-red",
    inStock: true,
    stockCount: 120,
    description: "The world's most popular vodka brand, widely available throughout Cameroon. Triple distilled for exceptional smoothness.",
    details: {
      origin: "Various",
      style: "Classic Vodka",
      abv: "37.5%",
      size: "750ml",
      availability: "Widely available across Cameroon"
    }
  },
  {
    id: 142,
    name: "Absolut Vodka",
    brand: "Absolut",
    category: "Vodka",
    price: 19.99, // ~12,000 FCFA
    badges: ["new"],
    rating: 4.6,
    image: "/images/products/vodka/absolut.jpg",
    slug: "absolut",
    inStock: true,
    stockCount: 85,
    description: "Swedish vodka with a clean, distinctive taste. Popular in Cameroon's bars and clubs for cocktails.",
    details: {
      origin: "Sweden",
      style: "Wheat Vodka",
      abv: "40%",
      size: "750ml",
      availability: "Common in urban areas"
    }
  },
  {
    id: 143,
    name: "Grey Goose",
    brand: "Grey Goose",
    category: "Vodka",
    price: 45.99, // ~27,600 FCFA
    badges: [],
    rating: 4.8,
    image: "/images/products/vodka/grey-goose.jpg",
    slug: "grey-goose",
    inStock: true,
    stockCount: 30,
    description: "Premium French vodka, found in Cameroon's high-end establishments and luxury retail stores. Known for its exceptionally smooth taste.",
    details: {
      origin: "France",
      style: "Wheat Vodka",
      abv: "40%",
      size: "750ml",
      availability: "Available in premium stores"
    }
  },
  {
    id: 144,
    name: "SuperMount Vodka",
    brand: "SuperMount",
    category: "Vodka",
    price: 11.99, // ~7,200 FCFA
    badges: [],
    rating: 4.2,
    image: "/images/products/vodka/supermount.jpg",
    slug: "supermount",
    inStock: true,
    stockCount: 200,
    description: "A popular local choice in Cameroon, known for its affordability and consistent quality. Perfect for parties and events.",
    details: {
      origin: "Cameroon",
      style: "Classic Vodka",
      abv: "40%",
      size: "750ml",
      availability: "Available everywhere in Cameroon"
    }
  },
  // Accessories (mock, USD)
  {
    id: 1001,
    name: "Crystal Whiskey Decanter Set",
    brand: "CrystalLux",
    category: "Accessories",
    price: 129.99,
    badges: ["new"],
    rating: 4.6,
    image: "/images/products/crystal-whiskey-decanter-set.jpg",
    slug: "crystal-whiskey-decanter-set",
    inStock: true,
    stockCount: 8,
    description: "This elegant crystal whiskey decanter set includes a hand-blown decanter and four matching whiskey glasses. The set features a timeless design with intricate detailing that will enhance any home bar or office.",
    details: {
      material: "Lead-free Crystal",
      capacity: "750ml (Decanter), 300ml (Glasses)",
      pieces: "5 (1 Decanter, 4 Glasses)",
      care: "Hand wash recommended",
      dimensions: 'Decanter: 10" H x 4" W',
    },
    currency: "USD"
  },
  {
    id: 1002,
    name: "Stainless Steel Wine Opener",
    brand: "VintnerPro",
    category: "Accessories",
    price: 19.99,
    badges: ["sale"],
    rating: 4.8,
    image: "/images/products/accessories/wine-opener.jpg",
    slug: "stainless-steel-wine-opener",
    inStock: true,
    stockCount: 50,
    description: "A professional-grade stainless steel wine opener with ergonomic grip and double-hinged fulcrum for easy cork removal.",
    details: {
      material: "Stainless Steel",
      type: "Corkscrew",
      care: "Dishwasher safe",
    },
    currency: "USD"
  },
  {
    id: 1003,
    name: "Premium Wine Glass Set (Set of 6)",
    brand: "Riedel",
    category: "Accessories",
    price: 49.99,
    badges: ["new"],
    rating: 4.7,
    image: "/images/products/riedel-wine-glass-set.jpg",
    slug: "riedel-wine-glass-set",
    inStock: true,
    stockCount: 30,
    description: "This premium set of Riedel wine glasses is designed to enhance the aroma and flavor of your favorite wines. Each glass is specifically shaped to bring out the best characteristics of different wine varieties, from bold reds to crisp whites.",
    details: {
      material: "Crystal Glass",
      pieces: "6 Glasses",
      varieties: "Cabernet/Merlot, Pinot Noir, Chardonnay",
      care: "Dishwasher safe",
      dimensions: '9" H x 3.5" W',
    }
    ,currency: "USD"
  },
  {
    id: 1004,
    name: "Electric Wine Bottle Opener",
    brand: "WineTech",
    category: "Accessories",
    price: 29.99,
    badges: ["sale"],
    rating: 4.5,
    image: "/images/products/accessories/electric-wine-opener.jpg",
    slug: "electric-wine-bottle-opener",
    inStock: true,
    stockCount: 40,
    description: "Effortlessly open wine bottles with this rechargeable electric opener. Includes foil cutter and USB charging cable.",
    details: {
      material: "ABS, Stainless Steel",
      battery: "Rechargeable",
      accessories: "Foil cutter, USB cable",
    },
    currency: "USD"
  },
  {
    id: 1005,
    name: "Whiskey Stones Gift Set",
    brand: "ChillRocks",
    category: "Accessories",
    price: 24.99,
    badges: ["new"],
    rating: 4.6,
    image: "/images/products/accessories/whiskey-stones.jpg",
    slug: "whiskey-stones-gift-set",
    inStock: true,
    stockCount: 60,
    description: "Keep your whiskey cold without dilution. Includes 9 granite stones, tongs, and velvet pouch in a gift box.",
    details: {
      material: "Granite",
      pieces: "9 Stones, 1 Tongs, 1 Pouch",
      care: "Rinse and freeze",
    },
    currency: "USD"
  }
]

// Categories data
export const categories = {
  whiskey: {
    title: "Whiskey",
    description:
      "Explore our premium selection of whiskeys from around the world, including Scotch, Bourbon, Irish, and Japanese varieties.",
    products: products.filter((p) => p.category === "Whiskey"),
  },
  wine: {
    title: "Wine",
    description:
      "Discover our curated collection of fine wines from renowned vineyards around the world, including reds, whites, and rosés.",
    products: products.filter((p) => p.category === "Wine"),
  },
  beer: {
    title: "Beer",
    description:
      "Explore our selection of craft beers from local and international breweries, featuring IPAs, stouts, lagers, and more.",
    products: products.filter((p) => p.category === "Beer"),
  },
  champagne: {
    title: "Champagne & Sparkling",
    description:
      "Celebrate in style with our premium selection of champagnes and sparkling wines from the world's finest producers.",
    products: products.filter((p) => p.category === "Champagne"),
  },
  spirits: {
    title: "Spirits",
    description:
      "Discover our collection of premium spirits, including vodka, gin, rum, tequila, and more from artisanal and established distilleries.",
    products: products.filter((p) => p.category === "Spirits"),
  },
  "hot-drinks": {
    title: "Hot Drinks",
    description:
      "Warm up with our selection of premium hot drinks, including artisanal coffees, fine teas, and specialty chocolate blends from around the world.",
    products: products.filter((p) => p.category === "Hot Drinks"),
  },
  accessories: {
    title: "Drink Accessories",
    description:
      "Enhance your drinking experience with our premium accessories, including glassware, decanters, bar tools, and more.",
    products: products.filter((p) => p.category === "Accessories"),
  },
  gin: {
    title: "Gin",
    description:
      "Discover our selection of premium gins, from classic London Dry to contemporary craft varieties, featuring unique botanical blends.",
    products: products.filter((p) => p.category === "Gin"),
  },
  vodka: {
    title: "Vodka",
    description:
      "Explore our collection of premium vodkas from around the world, including classic and flavored varieties from renowned distilleries.",
    products: products.filter((p) => p.category === "Vodka"),
  },
}

// Blog posts data
export const blogPosts = [
  {
    id: 1,
    title: "The Art of Whiskey Tasting: A Beginner's Guide",
    slug: "art-of-whiskey-tasting",
    excerpt: "Learn how to appreciate the complex flavors and aromas of whiskey with our comprehensive tasting guide.",
    date: "2023-05-15",
    author: "James Wilson",
    category: "Guides",
    image: "/images/blog/whiskey-tasting.jpg",
    content: `
      <p>Whiskey tasting is an art that anyone can learn with a bit of practice and the right approach. In this guide, we'll walk you through the essential steps to fully appreciate the complex flavors and aromas that make whiskey such a beloved spirit worldwide.</p>
      
      <h2>The Right Glassware</h2>
      <p>Start with proper glassware. A tulip-shaped glass like a Glencairn or copita is ideal as it concentrates the aromas at the top of the glass. The wide bowl allows the whiskey to breathe while the narrower opening directs the aromas toward your nose.</p>
      
      <h2>The Five Steps of Whiskey Tasting</h2>
      
      <h3>1. Color</h3>
      <p>Hold your glass against a white background in good lighting. Note the color, which can range from pale gold to deep amber or mahogany. The color can give clues about age, cask type, and flavor profile.</p>
      
      <h3>2. Nose</h3>
      <p>Gently swirl the whiskey in your glass and take a series of short sniffs. Keep your mouth slightly open as you inhale to avoid overwhelming your senses. Try to identify different aromas - fruits, spices, wood, vanilla, caramel, smoke, etc.</p>
      
      <h3>3. Palate</h3>
      <p>Take a small sip and let it coat your entire mouth before swallowing. Notice the texture or "mouthfeel" - is it light and delicate or rich and oily? Identify the flavors, which may differ from the aromas you detected.</p>
      
      <h3>4. Finish</h3>
      <p>After swallowing, pay attention to the aftertaste or "finish." How long does it last? Do new flavors emerge? Is it warming, spicy, sweet, or dry?</p>
      
      <h3>5. Water</h3>
      <p>Try adding a few drops of room temperature water to your whiskey. This can "open up" the spirit, releasing new aromas and flavors by breaking the surface tension and diluting the alcohol slightly.</p>
      
      <h2>Developing Your Palate</h2>
      <p>Tasting is subjective, and there are no wrong answers. Keep a journal of your impressions to track how your perceptions evolve over time. Try comparing different styles side by side to better understand their unique characteristics.</p>
      
      <p>Remember, the goal isn't to identify every possible flavor note but to enjoy the experience and develop your own preferences. Slàinte!</p>
    `,
  },
  {
    id: 2,
    title: "Coffee Brewing Methods: Finding Your Perfect Cup",
    slug: "coffee-brewing-methods",
    excerpt: "Explore different coffee brewing techniques and discover which method creates your ideal flavor profile.",
    date: "2023-06-22",
    author: "Elena Rodriguez",
    category: "Hot Drinks",
    image: "/images/blog/coffee-brewing.jpg",
    content: `
      <p>The way you brew your coffee has a profound impact on its flavor, aroma, and body. In this guide, we'll explore various brewing methods to help you find your perfect cup.</p>
      
      <h2>French Press</h2>
      <p>The French press is beloved for producing a full-bodied, rich cup with excellent oils and minimal filtration. Coarsely ground coffee steeps directly in hot water before being separated by a metal mesh filter. This method preserves the coffee's natural oils and results in a robust, flavorful brew.</p>
      
      <h2>Pour Over</h2>
      <p>Pour over methods like the Hario V60, Chemex, or Kalita Wave offer exceptional clarity and highlight the nuanced flavors of single-origin coffees. Hot water is poured in a controlled manner over medium-fine grounds, extracting delicate flavors as it passes through a paper filter.</p>
      
      <h2>Espresso</h2>
      <p>Espresso machines force hot water through finely-ground, compacted coffee at high pressure. The result is a concentrated shot with a distinctive crema on top. Espresso serves as the foundation for many coffee drinks and delivers intense flavor in a small package.</p>
      
      <h2>AeroPress</h2>
      
      <p>The AeroPress combines immersion and pressure for a versatile brewing method. Coffee steeps briefly before being pushed through a paper filter. It's known for producing a clean cup with low acidity and is incredibly portable for travel.</p>
      
      <h2>Cold Brew</h2>
      <p>Cold brew involves steeping coarse grounds in cold water for 12-24 hours. The result is a smooth, low-acid concentrate that can be diluted with water or milk. Its mellow profile and natural sweetness make it perfect for summer drinking.</p>
      
      <h2>Finding Your Perfect Method</h2>
      <p>Consider these factors when choosing a brewing method:</p>
      <ul>
        <li>Flavor preference: Do you enjoy bold, rich flavors or bright, clean ones?</li>
        <li>Time: Some methods require more attention than others</li>
        <li>Equipment investment: Costs range from inexpensive (French press) to significant (espresso machine)</li>
        <li>Learning curve: Some techniques require more practice to master</li>
      </ul>
      
      <p>The best way to discover your preference is to experiment. Visit local cafés that specialize in different brewing methods or invest in inexpensive equipment to try at home. Your perfect cup awaits!</p>
    `,
  },
]

// Search function
export function searchProducts(query: string) {
  if (!query || query.trim() === "") {
    return []
  }

  const searchTerm = query.toLowerCase().trim()

  return products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm) ||
      product.category.toLowerCase().includes(searchTerm) ||
      product.description?.toLowerCase().includes(searchTerm),
  )
}

// Currency conversion (USD to FCFA)
export const exchangeRate = 600 // 1 USD = 600 FCFA (approximate)

export function formatCurrency(price: number, currency = "FCFA"): string {
  if (currency === "FCFA") {
    return `${Math.round(price * exchangeRate).toLocaleString()} ${currency}`
  }
  return `${currency} ${price.toFixed(2)}`
}

export const promotions = [
  {
    id: 1,
    slug: "summer-wine",
    title: "Summer Wine Collection",
    description: "Get 20% off on our curated selection of summer wines",
    image: "/images/promotions/summer-wine.jpg",
    discount: "20%",
    originalPrice: 299.99,
    discountedPrice: 239.99,
    endsIn: "7 days",
    category: "wine",
    badges: ["sale", "summer"],
    extraInfo: "Limited time only!"
  },
  {
    id: 2,
    slug: "whiskey-tasting",
    title: "Whiskey Tasting Set",
    description: "Premium whiskey tasting set with 5 different varieties",
    image: "/images/promotions/whiskey-tasting.jpg",
    discount: "15%",
    originalPrice: 149.99,
    discountedPrice: 127.49,
    endsIn: "3 days",
    category: "whiskey",
    badges: ["new", "limited"],
    extraInfo: "Includes exclusive brands!"
  },
  {
    id: 3,
    slug: "cocktail-accessories",
    title: "Cocktail Accessories Bundle",
    description: "Complete set of premium cocktail making tools and accessories",
    image: "/images/promotions/cocktail-accessories.jpg",
    discount: "25%",
    originalPrice: 89.99,
    discountedPrice: 67.49,
    endsIn: "5 days",
    category: "accessories",
    badges: ["sale"],
    extraInfo: "Perfect for home bars!"
  },
  {
    id: 4,
    slug: "craft-beer",
    title: "Craft Beer Selection",
    description: "Explore our handpicked selection of craft beers from around the world",
    image: "/images/promotions/craft-beer.jpg",
    discount: "10%",
    originalPrice: 79.99,
    discountedPrice: 71.99,
    endsIn: "10 days",
    category: "beer",
    badges: ["featured"],
    extraInfo: "International selection!"
  },
  {
    id: 5,
    slug: "champagne-bundle",
    title: "Premium Champagne Bundle",
    description: "Celebrate in style with our premium champagne selection",
    image: "/images/promotions/champagne-bundle.jpg",
    discount: "15%",
    originalPrice: 399.99,
    discountedPrice: 339.99,
    endsIn: "4 days",
    category: "champagne",
    badges: ["luxury"],
    extraInfo: "Perfect for celebrations!"
  },
  {
    id: 6,
    slug: "coffee-package",
    title: "Coffee Lovers Package",
    description: "Premium coffee beans and accessories for the perfect brew",
    image: "/images/promotions/coffee-package.jpg",
    discount: "20%",
    originalPrice: 129.99,
    discountedPrice: 103.99,
    endsIn: "6 days",
    category: "hot-drinks",
    badges: ["new"],
    extraInfo: "Fresh arrivals!"
  },
];
