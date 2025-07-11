import { brands } from '@/data/brands';

// This file contains all products data for the application
export const products = [
  // Whiskey
  {
    id: 1,
    name: "Macallan 12 Year Old",
    brand: "Macallan",
    category: "Whiskey",
    price: 40.99,
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
    relatedImages: [
      "/images/products/whiskey/macallan-red.webp",
      "/images/products/whiskey/Macallan-12-Year-Old-3.jpg",
      "/images/products/whiskey/Macallan-12-Year-Old-4.jpg",
    ],
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
    relatedImages: [
      "/images/products/whiskey/lagavulin-16-year-old-2.jpg",
      "/images/products/whiskey/lagavulin-16-year-old-3.jpg",
      "/images/products/whiskey/lagavulin-16-year-old-4.jpg",
    ],
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
    stockCount: 5,
    description:
      "Premium blended Scotch (75cl, 12yr); balanced sweet fruit and soft smoke. 12-year-old blended Scotch (Scotland). Smooth and mellow. Flavors of ripe orchard fruits, honey and vanilla, with a hint of heather and butterscotch",
    details: {
      origin: "United States",
      region: "Kentucky",
      abv: "45%",
      size: "750ml",
      type: "Bourbon",
    },
    relatedImages: [
      "/images/products/whiskey/Chivas Regal 12 Year Old - Gift Box _ The Whisky….jpg",
      "/images/products/whiskey/Chivas Regal 12 Year Old - Gift Box _ The Whisky….jpg",
      "/images/products/whiskey/Chivas Regal 12 Year Old - Gift Box _ The Whisky….jpg",
    ],
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
    relatedImages: [
      "/images/products/whiskey/jackDaniel-2.jpg",
      "/images/products/whiskey/jackDaniel-3.jpg",
      "/images/products/whiskey/jackDaniel-4.jpg",
    ],
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
    relatedImages: [
      "/images/products/MonkeyShoulder-2.jpg",
      "/images/products/MonkeyShoulder-3.jpg",
      "/images/products/MonkeyShoulder-4.jpg",
    ],
  },
  {
    id: 6,
    name: "Black Label",
    brand: "Johnnie Walker",
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
    relatedImages: [
      "/images/products/whiskey/blackLabel-2.jpg",
      "/images/products/whiskey/blackLabel-3.jpg",
      "/images/products/whiskey/blackLabel-4.jpg",
    ],
  },
  {
    id: 7,
    name: "Green Label",
    brand: "Johnnie Walker",
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
    relatedImages: [
      "/images/products/whiskey/GreenLabel-2.jpg",
      "/images/products/whiskey/GreenLabel-3.jpg",
      "/images/products/whiskey/GreenLabel-4.jpg",
    ],
  },
  {
    id: 8,
    name: "Gold Label",
    brand: "Johnnie Walker",
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
    relatedImages: [
      "/images/products/whiskey/GoldLabel-2.jpg",
      "/images/products/whiskey/GoldLabel-3.jpg",
      "/images/products/whiskey/GoldLabel-4.jpg",
    ],
  },
  {
    id: 9,
    name: "Red Label",
    brand: "Johnnie Walker",
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
    relatedImages: [
      "/images/products/whiskey/Johnnie Walker Red Label-2.jpg",
      "/images/products/whiskey/Johnnie Walker Red Label-3.jpg",
      "/images/products/whiskey/Johnnie Walker Red Label-4.jpg",
    ],
  },
  {
    id: 10,
    name: "Blue Label",
    brand: "Johnnie Walker",
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
    relatedImages: [
      "/images/products/whiskey/blueLabel-2.jpg",
      "/images/products/whiskey/blueLabel-3.jpg",
      "/images/products/whiskey/blueLabel-4.jpg",
    ],
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
    relatedImages: [
      "/images/products/whiskey/BALLANTINE'S 12 YEAR OLD True Music Reeps One….jpg",
      "/images/products/whiskey/BALLANTINE'S 12 YEAR OLD True Music Reeps One….jpg",
      "/images/products/whiskey/BALLANTINE'S 12 YEAR OLD True Music Reeps One….jpg",
    ],
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
    relatedImages: [
      "/images/products/whiskey/Glenrothes Select Reserve (£32)-2.jpg",
      "/images/products/whiskey/Glenrothes Select Reserve (£32)-3.jpg",
      "/images/products/whiskey/Glenrothes Select Reserve (£32)-4.jpg",
    ],
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
    relatedImages: [
      "/images/products/whiskey/Glenfiddich 15 Year Solera-2.jpg",
      "/images/products/whiskey/Glenfiddich 15 Year Solera-3.jpg",
      "/images/products/whiskey/Glenfiddich 15 Year Solera-4.jpg",
    ],
  },
  // Wine
  {
    id: 21,
    name: "Chateau Margaux 2015",
    brand: "Château Margaux",
    category: "Wine",
    price: 399.99,
    badges: ["new"],
    rating: 4.9,
    image: "/images/products/wine/chateau_margaux.jpg",
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

  {
    id: 1015,
    name: "Baileys",
    brand: "Baileys",
    category: "Wine",
    price: 25.00,
    badges: ["new"],
    rating: 4.9,
    image: "/images/products/wine/baileys.jpg",
    slug: "baileys",
    inStock: true,
    stockCount: 10,
    description:
      "Baileys Original Irish Cream is a popular cream liqueur known for its smooth, velvety texture and rich, creamy flavor. It's made from a blend of Irish whiskey, Irish dairy cream, cocoa, and vanilla. Baileys is often enjoyed on its own, over ice, or added to coffee and cocktails. ",
    details: {
      origin: "Ireland",
      size: "750ml",
      Flavor: "Rich, creamy, with notes of chocolate and vanilla",
    },
  },

  {
    id: 1016,
    name: "Perlino",
    brand: "Perlino",
    category: "Wine",
    price: 11.04,
    badges: ["new"],
    rating: 4.9,
    image: "/images/products/wine/perlino.jpg",
    slug: "perlino",
    inStock: true,
    stockCount: 10,
    description:
      "Perlino is a well-known brand of Italian sparkling wines, particularly known for their quality and unique fermentation process. Their Prosecco Extra Dry, for instance, is characterized by a straw yellow color, fine and persistent bubbles, a round mouthfeel, and fruity aromas. Perlino also produces other sparkling wines and vermouths, and their wines are often described as fresh, aromatic, and complex.  ",
    details: {
      origin: "Italy",
      size: "750ml",
    },
  },

  {
    id: 1017,
    name: "Porto Marquez",
    brand: "Porto Marquez",
    category: "Wine",
    price: 15.34,
    badges: ["new"],
    rating: 4.9,
    image: "/images/products/wine/marquez.jpg",
    slug: "marquez",
    inStock: true,
    stockCount: 10,
    description:
      "Porto Cruz is a well-known Port wine brand, originating from the Douro Valley in Portugal. It is known for its Tawny and Ruby Port wines, characterized by a rich, fruity, and balanced taste.  ",
    details: {
      origin: "Porto",
      size: "750ml",
    },
  },


  {
    id: 1018,
    name: "Port Cruz",
    brand: "Port Cruz",
    category: "Wine",
    price: 16.50,
    badges: ["new"],
    rating: 4.9,
    image: "/images/products/wine/cruz.jpg",
    slug: "cruz",
    inStock: true,
    stockCount: 10,
    description:
      "Porto Marquez wines, specifically the Fine Tawny, are a style of Portuguese port wine, known for its rich, sweet, and complex flavors. They are fortified wines, meaning a grape spirit is added during fermentation, stopping it and preserving the natural sweetness. Porto Marquez Tawny Port is often characterized by notes of dried fruits, plums, berries, and chocolate, with a velvety texture and a smooth finish. The origin of Porto Marquez is the Douro Valley in Portugal, where the grapes are grown and the wine is produced. ",
    details: {
      origin: "Douro Valley in Portugal",
      size: "750ml",
      Flavor: "Tawny Port, including Porto Marquez, is known for its balance of sweetness and acidity, with notes of dried fruits like figs and raisins, caramel, and toasted almonds. "
    },
  },

  {
    id: 1019,
    name: "Martini",
    brand: "Martini",
    category: "Wine",
    price: 16.50,
    badges: ["new"],
    rating: 4.9,
    image: "/images/products/wine/martini.jpg",
    slug: "martini",
    inStock: true,
    stockCount: 10,
    description:
      "Martini wines are known for their quality, refinement, and connection to the Italian tradition of wine and aperitivo. They produce a range of wines, including sparkling wines like Asti and Brut, as well as vermouths like Martini Rosso and Bianco. The brand's history is deeply rooted in Pessione, Italy, where it was founded in 1863 by Alessandro Martini, Luigi Rossi, and Teofilo Sola.  ",
    details: {
      origin: "Italy",
      size: "750ml",
    },
  },

  {
    id: 1020,
    name: "Callack",
    brand: "Callack",
    category: "Wine",
    price: 9.00,
    badges: ["new"],
    rating: 4.9,
    image: "/images/products/wine/callac.jpg",
    slug: "callack",
    inStock: true,
    stockCount: 10,
    description:
      "Callack wine refers to wine produced by Château de Callac in the Graves appellation of Bordeaux, or potentially wines from other winemakers with similar names. Château de Callac produces dry white and red wines. Wines from winemakers like Calvet, Callan Cellars, Calluna Vineyards, and Callia Wines may also be associated with the name Callack, depending on the context and how the name is used.  ",
    details: {
      origin: "Georgia",
      size: "750ml",
      Flavor: "Rich, creamy, with notes of chocolate and vanilla",
    },
  },

  {
    id: 1021,
    name: "Calvet",
    brand: "Calvet",
    category: "Wine",
    price: 21.00,
    badges: ["new"],
    rating: 4.9,
    image: "/images/products/wine/calvet.jpg",
    slug: "calvet",
    inStock: true,
    stockCount: 10,
    description:
      "Calvet is a prominent French wine company with roots in the Languedoc region of France. Specifically, its origins can be traced back to the village of Pouzols in the Minervois wine region. Jean-Marie Calvet, who founded Maison Calvet in 1818, established the company in Tain-L'Hermitage in the Rhône Valley.",
    details: {
      origin: "France",
      size: "750ml",
      Flavor: "Rich, creamy, with notes of chocolate and vanilla",
    },
  },

  {
    id: 1022,
    name: "Amarula",
    brand: "Amarula",
    category: "Wine",
    price: 15.00,
    badges: ["new"],
    rating: 4.9,
    image: "/images/products/wine/amarula.jpg",
    slug: "amarula",
    inStock: true,
    stockCount: 10,
    description:
      "Amarula is a popular cream liqueur originating from South Africa, specifically the Limpopo province. It's a sweet, creamy, and fruity spirit, made from the fruit of the marula tree, which grows exclusively in sub-Saharan Africa. The marula fruit is fermented, distilled, aged in French oak barrels, and then blended with fresh cream to create the distinctive smooth texture and flavor of Amarula.",
    details: {
      origin: "South Africa",
      size: "750ml",
      Flavor: "Amarula has a sweet, fruity, and creamy taste with hints of caramel, vanilla, and exotic fruits",
    },
  },

  {    id: 1023,
    name: "Pure Heaven",
    brand: "Pure Heaven",
    category: "Wine",
    price: 9.00,
    badges: ["new"],
    rating: 4.9,
    image: "/images/products/wine/heaven.jpg",
    slug: "heaven",
    inStock: true,
    stockCount: 10,
    description:
      "Pure Heaven is a non-alcoholic sparkling red wine originating from South Africa. It is known for its smooth, easy-drinking flavor and is made from a blend of fruits, often grapes, mangoes, or strawberries. The drink is designed to be refreshing and can be enjoyed on any occasion. ",
    details: {
      origin: "South Africa. ",
      size: "750ml",
      Flavour: "Often described as smooth, fruity, and refreshing, with notes of grape, cherry, or strawberry. ",
    },
  },

  {
    id: 1006,
    name: "Moscato",
    brand: "Moscato",
    category: "Wine",
    price: 11.75,
    badges: ["new"],
    rating: 4.9,
    image: "/images/products/wine/moscato.jpg",
    slug: "moscato",
    inStock: true,
    stockCount: 10,
    description:
      "Moscato is a style of sweet, white, or pink wine made from Muscat grapes, known for its fruity notes, low alcohol content, and a slight fizz. It's often enjoyed as a dessert wine or as a light aperitif. ",
    details: {
      origin: "Italy",
      region: "northwestern Italy",
      vintage: "2022",
      size: "750ml",
      grapeVariety: "muscat grapes",
    },
  },



  {
    id: 1007,
    name: "Franzini Moscato",
    brand: "Moscato",
    category: "Wine",
    price: 11.42,
    badges: ["new"],
    rating: 4.9,
    image: "/images/products/wine/franzini.jpg",
    slug: "moscato",
    inStock: true,
    stockCount: 10,
    description:
      "Moscato is a style of sweet, white, or pink wine made from Muscat grapes, known for its fruity notes, low alcohol content, and a slight fizz. It's often enjoyed as a dessert wine or as a light aperitif. ",
    details: {
      origin: "France",
      region: "Bordeaux",
      vintage: "2015",
      size: "750ml",
      grapeVariety: "Cabernet Sauvignon Blend",
    },
  },
//  champagne

  {    id: 1008,
    name: "GH Mumm",
    brand: "Champagne",
    category: "Champagne",
    price: 103.34,
    badges: ["new"],
    rating: 4.9,
    image: "/images/products/champagne/gh-mum.jpg",
    slug: "moscato",
    inStock: true,
    stockCount: 10,
    description:
      "G.H. Mumm & Cie, a prestigious Champagne house, was founded in Reims, France, in 1827. It is owned by Pernod Ricard. Known for its iconic Cordon Rouge cuvée and commitment to quality, G.H. Mumm is a leading global Champagne producer, often associated with celebrations and high-end occasions.",
    details: {
      origin: "France",
      region: "Reims, France",
      vintage: "2015",
      size: "750ml",
      grapeVariety: "RSRV Blanc de Blancs and RSRV Blanc de Noirs",
    },
  },

  {    id: 1024,
    name: "Veuve Clicquot",
    brand: "Champagne",
    category: "Champagne",
    price: 25.34,
    badges: ["new"],
    rating: 4.9,
    image: "/images/products/champagne/veuve.jpg",
    slug: "veuve",
    inStock: true,
    stockCount: 10,
    description:
      "Veuve Clicquot is an iconic Champagne house known for its distinct yellow label and the pioneering work of Madame Clicquot. Founded in 1772 by Philippe Clicquot, it gained fame under the leadership of his widow, Barbe-Nicole Ponsardin, who revolutionized Champagne production. ",
    details: {
      origin: "France",
      region: "Reims, France",
      vintage: "1772",
      size: "750ml",
    },
  },

  {    id: 1025,
    name: "Laurent-Perrier",
    brand: "Champagne",
    category: "Champagne",
    price: 25.34,
    badges: ["new"],
    rating: 4.9,
    image: "/images/products/champagne/laurent.jpg",
    slug: "laurent",
    inStock: true,
    stockCount: 10,
    description:
      "Veuve Clicquot is an iconic Champagne house known for its distinct yellow label and the pioneering work of Madame Clicquot. Founded in 1772 by Philippe Clicquot, it gained fame under the leadership of his widow, Barbe-Nicole Ponsardin, who revolutionized Champagne production. ",
    details: {
      origin: "France",
      region: "Reims, France",
      vintage: "1772",
      size: "750ml",
    },
  },

  {    id: 1026,
    name: "Ruinart",
    brand: "Champagne",
    category: "Champagne",
    price: 25.34,
    badges: ["new"],
    rating: 4.9,
    image: "/images/products/champagne/ruinart.jpg",
    slug: "ruinart",
    inStock: true,
    stockCount: 10,
    description:
      "Veuve Clicquot is an iconic Champagne house known for its distinct yellow label and the pioneering work of Madame Clicquot. Founded in 1772 by Philippe Clicquot, it gained fame under the leadership of his widow, Barbe-Nicole Ponsardin, who revolutionized Champagne production. ",
    details: {
      origin: "France",
      region: "Reims, France",
      vintage: "1772",
      size: "750ml",
    },
  },

  {    id: 1027,
    name: "Perrier-Jouët",
    brand: "Champagne",
    category: "Champagne",
    price: 25.34,
    badges: ["new"],
    rating: 4.9,
    image: "/images/products/champagne/jouet.jpg",
    slug: "jouet",
    inStock: true,
    stockCount: 10,
    description:
      "Perrier-Jouët is a prestigious champagne house with a rich history, founded in 1811 in Épernay, France. The company is known for its elegant, floral champagne styles and the iconic Art Nouveau-inspired Belle Epoque bottle. Perrier-Jouët's vineyards are located primarily in the heart of the Champagne region, in the Côte des Blancs, known for its chalky soils and exceptional vineyards.  ",
    details: {
      origin: "France",
      region: "Reims, France",
      vintage: "1772",
      size: "750ml",
    },
  },

  {    id: 1028,
    name: "Armand de Brignac",
    brand: "Champagne",
    category: "Champagne",
    price: 25.34,
    badges: ["new"],
    rating: 4.9,
    image: "/images/products/champagne/armands.jpg",
    slug: "armands",
    inStock: true,
    stockCount: 10,
    description:
      "Armand de Brignac, often nicknamed Ace of Spades due to its distinctive logo, is a luxury Champagne brand produced by the Cattier family in the Champagne region of France. It's known for its elegant, distinctive bottle design, featuring shiny metallic bottles and hand-finished French pewter labels.",
    details: {
      origin: "France",
      region: "Reims, France",
      vintage: "1763",
      size: "750ml",
    },
  },

  {    id: 1029,
    name: "Besserat de Bellefon",
    brand: "Champagne",
    category: "Champagne",
    price: 30.34,
    badges: ["new"],
    rating: 4.9,
    image: "/images/products/champagne/belefon.jpg",
    slug: "belefon",
    inStock: true,
    stockCount: 10,
    description:
      "Armand de Brignac, often nicknamed Ace of Spades due to its distinctive logo, is a luxury Champagne brand produced by the Cattier family in the Champagne region of France. It's known for its elegant, distinctive bottle design, featuring shiny metallic bottles and hand-finished French pewter labels.",
    details: {
      origin: "France",
      region: "Reims, France",
      vintage: "1763",
      size: "750ml",
    },
  },

  //Water section

  {    id: 1030,
    name: "Supermont",
    brand: "Supermont",
    category: "Water",
    price: 2.00,
    badges: ["new"],
    rating: 4.9,
    image: "/images/products/water/mont.jpg",
    slug: "mont",
    inStock: true,
    stockCount: 10,
    description:
      "Supermont is a brand of natural mineral water in Cameroon, sourced from an underground spring at 800 meters on the slopes of Mount Cameroon. It's a popular choice for daily consumption, celebrations, and is associated with a healthy, active lifestyle. In 2022, the brand underwent a modernization, with a new logo and bottle redesign, emphasizing its renewal while retaining its natural essence. ",
    details: {
      origin: "Cameroon",
      region: "Sounthwest, Buea",
      // vintage: "1763",
      // size: "750ml",
    },
  },

  {    id: 1031,
    name: "Supermont",
    brand: "Supermont",
    category: "Water",
    price: 2.00,
    badges: ["new"],
    rating: 4.9,
    image: "/images/products/water/small.jpg",
    slug: "small",
    inStock: true,
    stockCount: 10,
    description:
      "Supermont is a brand of natural mineral water in Cameroon, sourced from an underground spring at 800 meters on the slopes of Mount Cameroon. It's a popular choice for daily consumption, celebrations, and is associated with a healthy, active lifestyle. In 2022, the brand underwent a modernization, with a new logo and bottle redesign, emphasizing its renewal while retaining its natural essence. ",
    details: {
      origin: "Cameroon",
      region: "Sounthwest, Buea",
      // vintage: "1763",
      // size: "750ml",
    },
  },

  {    id: 1032,
    name: "Ôpur",
    brand: "Ôpur",
    category: "Water",
    price: 2.00,
    badges: ["new"],
    rating: 4.9,
    image: "/images/products/water/opur.jpg",
    slug: "opur",
    inStock: true,
    stockCount: 10,
    description:
      "Ôpur mineral water is a premium, naturally filtered water sourced from underground springs in Cameroon, specifically from the region of the Source Du Pays. It's known for its light, refreshing taste and is promoted as ideal for a healthy lifestyle, particularly for active individuals. ",
    details: {
      origin: "Cameroon",
      region: "Sounthwest, Buea",
      // vintage: "1763",
      // size: "750ml",
    },
  },

  {    id: 1033,
    name: "Tangui",
    brand: "Tangui",
    category: "Water",
    price: 2.00,
    badges: ["new"],
    rating: 4.9,
    image: "/images/products/water/tangui.jpg",
    slug: "tangui",
    inStock: true,
    stockCount: 10,
    description:
      "Ôpur mineral water is a premium, naturally filtered water sourced from underground springs in Cameroon, specifically from the region of the Source Du Pays. It's known for its light, refreshing taste and is promoted as ideal for a healthy lifestyle, particularly for active individuals. ",
    details: {
      origin: "Cameroon",
      region: "Sounthwest, Buea",
      // vintage: "1763",
      // size: "750ml",
    },
  },

  {    id: 1034,
    name: "Vitale",
    brand: "Vitale",
    category: "Water",
    price: 2.00,
    badges: ["new"],
    rating: 4.9,
    image: "/images/products/water/vitale.jpg",
    slug: "vitale",
    inStock: true,
    stockCount: 10,
    description:
      "Vitale is a bottled water brand produced and marketed by Société des Eaux Minérales du Cameroun in Cameroon. It is described as pure and rich and its origin is traced to the village of Mombo, where it is sourced from a depth of 156 meters. Vitale was launched in 2017. ",
    details: {
      origin: "Cameroon",
      region: "Sounthwest, Buea",
      Launch: "2017"
      // vintage: "1763",
      // size: "750ml",
    },
  },

  {    id: 1035,
    name: "Fanta",
    brand: "Fanta",
    category: "soft-drinks",
    price: 1.00,
    badges: ["new"],
    rating: 4.9,
    image: "/images/products/softDrinks/fanta.jpg",
    slug: "fanta",
    inStock: true,
    stockCount: 10,
    description:
      "Fanta is an American-owned brand of fruit-flavored, carbonated soft drinks owned by Coca-Cola. It was initially created in Germany during World War II as an alternative to Coca-Cola, due to shortages caused by the war.",
    details: {
      origin: "Germany during World War II",
      // region: "Sounthwest, Buea",
      // vintage: "1763",
      // size: "750ml",
    },
  },

  {    id: 1036,
    name: "Coca-Cola",
    brand: "Coca-Cola",
    category: "soft-drinks",
    price: 1.00,
    badges: ["new"],
    rating: 4.9,
    image: "/images/products/softDrinks/coca.jpg",
    slug: "coca",
    inStock: true,
    stockCount: 10,
    description:
      "Coca-Cola is a widely popular carbonated, sweetened soft drink known for its distinctive flavor. It was created in 1886 by John Stith Pemberton in Atlanta, Georgia, initially as a patent medicine and temperance drink. The name Coca-Cola reflects its original ingredients: coca leaves (from which cocaine is derived) and kola nuts (a source of caffeine).",
    details: {
      origin: "USA/ Georgia",
      // region: "Sounthwest, Buea",
      // vintage: "1763",
      // size: "750ml",
    },
  },

  {    id: 1037,
    name: "Malta",
    brand: "Malta",
    category: "soft-drinks",
    price: 1.00,
    badges: ["new"],
    rating: 4.9,
    image: "/images/products/softDrinks/malt.jpg",
    slug: "malt",
    inStock: true,
    stockCount: 10,
    description:
      "Malta Guinness is a non-alcoholic, carbonated malt drink with a rich, malty flavor, often described as slightly sweet with caramel notes. It is produced by Guinness Nigeria Plc, a subsidiary of Diageo, and is a popular beverage in many parts of Africa and the Caribbean. Unlike its alcoholic counterpart, Guinness stout, Malta Guinness is non-alcoholic, making it a suitable choice for those who prefer a malty drink without alcohol. ",
    details: {
      origin: "Nigeria",
      Launch: "1984",
      Flavour: " Rich, malty, slightly sweet, and caramelized due to the toasted malt. "
      // vintage: "1763",
      // size: "750ml",
    },
  },

  {    id: 1038,
    name: "Can Malta",
    brand: "Malta",
    category: "soft-drinks",
    price: 1.00,
    badges: ["new"],
    rating: 4.9,
    image: "/images/products/softDrinks/can-malt.jpg",
    slug: "can-malt",
    inStock: true,
    stockCount: 10,
    description:
      "Malta Guinness is a non-alcoholic, carbonated malt drink with a rich, malty flavor, often described as slightly sweet with caramel notes. It is produced by Guinness Nigeria Plc, a subsidiary of Diageo, and is a popular beverage in many parts of Africa and the Caribbean. Unlike its alcoholic counterpart, Guinness stout, Malta Guinness is non-alcoholic, making it a suitable choice for those who prefer a malty drink without alcohol. ",
    details: {
      origin: "Nigeria",
      Launch: "1984",
      Flavour: " Rich, malty, slightly sweet, and caramelized due to the toasted malt. "
      // vintage: "1763",
      // size: "750ml",
    },
  },

  {    id: 1039,
    name: "Pepsi",
    brand: "Pepsi",
    category: "soft-drinks",
    price: 1.00,
    badges: ["new"],
    rating: 4.9,
    image: "/images/products/softDrinks/pepsi.jpg",
    slug: "pepsi",
    inStock: true,
    stockCount: 10,
    description:
      "Pepsi-Cola is a sweet, carbonated cola beverage with a distinctive flavor profile, often described as having a slightly more tart and less sweet taste than Coca-Cola. It contains water, sugar, carbon dioxide, caramel, orthophosphoric acid, caffeine, and natural flavors. Pepsi-Cola is known for its vibrant blue and red color scheme.",
    details: {
      origin: "North Carolina",
      Launch: "1893",
      // vintage: "1763",
      // size: "750ml",
    },
  },

  {    id: 1040,
    name: "Schweppes",
    brand: "Schweppes",
    category: "soft-drinks",
    price: 1.00,
    badges: ["new"],
    rating: 4.9,
    image: "/images/products/softDrinks/schweppes.jpg",
    slug: "schweppes",
    inStock: true,
    stockCount: 10,
    description:
      "Pepsi-Cola is a sweet, carbonated cola beverage with a distinctive flavor profile, often described as having a slightly more tart and less sweet taste than Coca-Cola. It contains water, sugar, carbon dioxide, caramel, orthophosphoric acid, caffeine, and natural flavors. Pepsi-Cola is known for its vibrant blue and red color scheme.",
    details: {
      origin: "North Carolina",
      Launch: "1893",
      // vintage: "1763",
      // size: "750ml",
    },
  },

  //SoftDrinks


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
    relatedImages: [
      "/images/products/westvleteren-12-2.jpg",
      "/images/products/westvleteren-12-3.jpg",
      "/images/products/westvleteren-12-4.jpg",
    ],
  },

  {
    id: 1011,
    name: "Can Hero",
    brand: "Hero Lager",
    category: "Beer",
    price: 13.00,
    badges: ["new"],
    rating: 4.7,
    image: "/images/products/beer/hero.jpg",
    slug: "hero",
    inStock: true,
    stockCount: 50,
    description:
      "Hero Lager is a Nigerian lager beer brand known for its association with the southeastern region of Nigeria and its indomitable Nigerian spirit. It is brewed in Onitsha and marketed by Intafact Beverages Limited. The brand's label features a rising sun, a symbol that resonates with the history and culture of the region. Hero Lager's popularity extends beyond its local roots, becoming a symbol of the this is our own factor, making it a distinct choice in the Nigerian beer market. ",
    details: {
      origin: "Onitsha, Nigeria",
      abv: "5.2%",
      size: "33cl",
      brewery: "Intafact Beverages Limited",
    },
    relatedImages: [
      "/images/products/beer/hero.jpg",
      "/images/products/beer/hero.jpg",
      "/images/products/beer/hero.jpg",
    ],
  },

  {
    id: 1012,
    name: "Bottled Hero",
    brand: "Hero Lager",
    category: "Beer",
    price: 13.00,
    badges: ["new"],
    rating: 4.7,
    image: "/images/products/beer/bottled-hero.jpg",
    slug: "bottled-hero",
    inStock: true,
    stockCount: 50,
    description:
      "Hero Lager is a Nigerian lager beer brand known for its association with the southeastern region of Nigeria and its indomitable Nigerian spirit. It is brewed in Onitsha and marketed by Intafact Beverages Limited. The brand's label features a rising sun, a symbol that resonates with the history and culture of the region. Hero Lager's popularity extends beyond its local roots, becoming a symbol of the this is our own factor, making it a distinct choice in the Nigerian beer market. ",
    details: {
      origin: "Onitsha, Nigeria",
      abv: "5.2%",
      size: "33cl",
      brewery: "Intafact Beverages Limited",
    },
    relatedImages: [
      "/images/products/beer/hero-1.jpg",
      "/images/products/beer/bottled-hero-3.jpg",
      "/images/products/beer/bottled-hero-4.jpg",
    ],
  },

  {
    id: 1056,
    name: "Hoegaarden",
    brand: "Hoegaarden",
    category: "Beer",
    price: 3.00,
    badges: ["new"],
    rating: 3.9,
    image: "/images/products/beer/hoegaarden.jpg",
    slug: "hoegaarden",
    inStock: true,
    stockCount: 50,
    description:
      "Hoegaarden is a Belgian witbier, known for its cloudy, pale appearance and refreshing, citrusy-spicy flavor profile. It is brewed with malted barley, unmalted wheat, hops, coriander, and orange peel, the latter two ingredients contributing to its distinctive taste. The beer is unfiltered, giving it a hazy appearance, and is known for its crisp, clean finish. ",
    details: {
      origin: "Belgium",
      abv: "4.9%",
      size: "500ml",
    },
    relatedImages: [
      "/images/products/beer/hoegaarden-1.jpg",
      "/images/products/beer/hoegaarden-2.jpg",
      "/images/products/beer/hoegaarden-3.jpg",
    ],
  },

  {
    id: 1057,
    name: "Budweiser",
    brand: "Budweiser",
    category: "Beer",
    price: 3.05,
    badges: ["new"],
    rating: 3.9,
    image: "/images/products/beer/budweiser.jpg",
    slug: "budweiser",
    inStock: true,
    stockCount: 50,
    description:
      "Budweiser is a pale lager, meaning it's a light-colored, bottom-fermented beer with a mild, refreshing flavor. It's known for its crispness and subtle sweetness, often described as having a slightly fruity or bready aroma. ",
    details: {
      origin: "America",
      abv: "5.0%",
      size: "500ml",
    },
    relatedImages: [
      "/images/products/beer/bud-1.jpg",
      "/images/products/beer/bud-2.jpg",
      "/images/products/beer/bud-3.jpg",
    ],
  },

  {
    id: 1058,
    name: "Carlsberg",
    brand: "Carlsberg",
    category: "Beer",
    price: 3.05,
    badges: ["new"],
    rating: 3.9,
    image: "/images/products/beer/carlsberg.jpg",
    slug: "carlsberg",
    inStock: true,
    stockCount: 50,
    description:
      "Carlsberg is a pale lager, typically recognized for its golden color and balanced flavor profile. It is known for its refreshing character and subtle bitterness.",
    details: {
      origin: "Copenhagen, Denmark",
      abv: "5%",
      size: "500ml",
    },
    relatedImages: [
      "/images/products/beer/carlsberg-1.jpg",
      "/images/products/beer/carlsberg-2.jpg",
      "/images/products/beer/carlsberg-3.jpg",
    ],
  },
  {
    id: 1013,
    name: "Bavaria",
    brand: "Bavaria",
    category: "Beer",
    price: 16.67,
    badges: ["new"],
    rating: 4.7,
    image: "/images/products/beer/bavaria.jpg",
    slug: "bavaria",
    inStock: true,
    stockCount: 50,
    description:
      "Bavaria Beer originated in Lieshout, a small town in the south of the Netherlands in 1719. It was founded as De Kerkdijk  by the Moorees family, who initially brewed craft beer on a small scale. The brewery and the Swinkels family name became linked in 1764 when one of the Moorees daughters married a Swinkels. Today, Bavaria is a family-owned and operated brewery, now in its seventh generation under the Swinkels family's leadership.  ",
    details: {
      origin: "Lieshout, Netherlands. ",
      abv: "0.0%",
      size: "33cl",
    },
    relatedImages: [
      "/images/products/beer/bavaria-2.jpg",
      "/images/products/beer/bavaria-3.jpg",
      "/images/products/beer/bavaria-4.jpg",
    ],
  },

  {
    id: 1014,
    name: "Corona 12x330ml Bottles",
    brand: "Corona",
    category: "Beer",
    price: 17.00,
    badges: ["new"],
    rating: 4.7,
    image: "/images/products/beer/corona.jpg",
    slug: "corona",
    inStock: true,
    stockCount: 50,
    description:
      "Brewed and bottled in Mexico since 1925, Corona is a refreshing, easy drinking Mexican lager. Brewed only the best ingredients and made with the finest quality blend of malted barley, corn, yeast, hops, and filtered water, this beer offer instant freshness.",
    details: {
      origin: "Mexico city",
      abv: "4.5%",
      size: "330ml",
    },
    relatedImages: [
      "/images/products/beer/corona-2.jpg",
      "/images/products/beer/corona-3.jpg",
      "/images/products/beer/corona-4.jpg",
    ],
  },
{
  id: 42,
  name: "Heineken",
  brand: "Heineken",
  category: "Beer",
  price: 16.99,
  badges: ["new"],
  rating: 4.5,
  image: "/images/products/beer/heineken.jpg",
  slug: "heineken",
  inStock: true,
  stockCount: 100,
  description:
    "Heineken is a world-famous Dutch lager known for its crisp, refreshing taste and subtle fruity notes. Brewed with pure malt and a unique A-yeast, it's a favorite for any occasion.",
  details: {
    origin: "Netherlands",
    style: "Lager",
    abv: "5%",
    size: "330ml",
    brewery: "Heineken N.V.",
  },
  relatedImages: [
    "/images/products/beer/heineken-2.jpg",
    "/images/products/beer/heineken-3.jpg",
    "/images/products/beer/heineken-4.jpg",
  ],
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
    image: "/images/dom-perignon-vintage-2010.jpg",
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
    image: "/images/products/Hennessy.jpg",
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

  {
    id: 1051,
    name: "Grand Old Parr 12 years",
    brand: "Grand Old Parr",
    category: "Spirits",
    price: 140.99,
    badges: ["new"],
    rating: 4.8,
    image: "/images/products/Spirits/oldparr.jpg",
    slug: "oldparr",
    inStock: true,
    stockCount: 20,
    description:
      "Grand Old Parr is a blended Scotch whisky produced by Diageo in Scotland. It's named after Thomas Parr, a man said to have lived to be 152 years old. The whisky was launched in 1909 and is known for its distinctive bottle design and is widely available in export markets, particularly in Japan, Mexico, South America, and the United States. ",
    details: {
      origin: "Scotland",
      // region: "Cognac",
      abv: "40%",
      size: "1L",
    },
  },

  {
    id: 1052,
    name: "Jack Daniel's",
    brand: "Jennessee Honey",
    category: "Spirits",
    price: 140.99,
    badges: ["new"],
    rating: 4.8,
    image: "/images/products/Spirits/jack.jpg",
    slug: "jack",
    inStock: true,
    stockCount: 20,
    description:
      "Jack Daniel's premium Tennessee whiskey is still made using iron-free cave spring water, and is charcoal-mellowed and matured at America's oldest registered distillery, established in 1866 in Lynchburg, Tennessee.",
    details: {
      origin: "America",
      // region: "Cognac",
      abv: "40%",
      size: "70cl",
    },
  },

  {
    id: 1053,
    name: "Chivas Regal 12 years",
    brand: "Chivas Regal 12 years",
    category: "Spirits",
    price: 140.99,
    badges: ["new"],
    rating: 4.8,
    image: "/images/products/Spirits/chivas18.jpg",
    slug: "jack",
    inStock: true,
    stockCount: 20,
    description:
      "Chivas Regal 12 Year Old Blended Scotch Whisky is a classic, well-balanced whisky known for its smooth, rich flavors and long finish. It's made from a blend of malt and grain whiskies from across Scotland, aged for at least 12 years, resulting in a golden amber color and notes of honey, ripe fruits, and floral undertones. ",
    details: {
      origin: "Scotland",
      // region: "Cognac",
      abv: "40%",
      size: "700ml",
    },
  },

  {
    id: 1054,
    name: "Dewar's",
    brand: "Dewar's 12 years",
    category: "Spirits",
    price: 140.99,
    badges: ["new"],
    rating: 4.8,
    image: "/images/products/Spirits/dewar.jpg",
    slug: "dewar",
    inStock: true,
    stockCount: 20,
    description:
      "Dewar's 12 Years Old is a blended Scotch whisky from Scotland, boasting a 40% alcohol content. It's known for its smooth, well-balanced flavor profile, with notes of caramel, vanilla, and a hint of smoke. The whisky is double-aged in oak barrels, which contributes to its unique character. ",
    details: {
      origin: "Scotland",
      // region: "Cognac",
      abv: "40%",
      size: "75.cl",
    },
  },

  {
    id: 1055,
    name: "Teacher's",
    brand: "Teacher's 12 years",
    category: "Spirits",
    price: 140.99,
    badges: ["new"],
    rating: 4.8,
    image: "/images/products/Spirits/teacher.jpg",
    slug: "teacher",
    inStock: true,
    stockCount: 20,
    description:
      "Teacher's Highland Cream is a blended Scotch whisky originating from Scotland. It's a classic blend known for its smooth, well-balanced flavor profile with notes of peat smoke, malt, and honey. With a high malt content and 40% alcohol, it's a robust whisky suitable for sipping or mixing in cocktails.",
    details: {
      origin: "Scotland",
      // region: "Cognac",
      abv: "40%",
      size: "75.cl",
    },
  },

  // Hot Drinks
  {
    id: 101,
    name: "Ethiopian Yirgacheffe Coffee",
    brand: "Yirgacheffe",
    category: "hot-drinks",  
    price: 18.99,
    badges: ["new"],
    rating: 4.8,
    image: "/images/products/hot-drinks/yirgacheffe-coffee.jpg",
    slug: "yirgacheffe-coffee",
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
    category: "hot-drinks",
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
    category: "hot-drinks",
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
    category: "hot-drinks",
    price: 22.99,
    badges: ["sold-out"],
    rating: 4.6,
    image: "/images/products/hot-drinks/mexican-hot-chocolate-kit.jpg",
    slug: "mexican-hot-chocolate-kit",
    inStock: true, // Out of stock example
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
    category: "hot-drinks",
    price: 16.99,
    badges: ["new"],
    rating: 4.7,
    image: "/images/products/hot-drinks/masala-chai-blend.jpg",
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
    image: "/images/products/gin/gordons-dry-gin.jpg",
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
    id: 1010,
    name: "Hot chocolate",
    brand: "hot chocolate",
    category: "hot-drinks",
    price: 13.75,
    badges: ["new"],
    rating: 4.7,
    image: "/images/products/hot-drinks/hot-chocolate.jpg",
    slug: "hot-chocolate",
    inStock: true,
    stockCount: 35,
    description:
      "Hot chocolate is a warm, chocolate-flavored drink made by melting solid chocolate or mixing cocoa powder with milk or water and a sweetener. It's often enjoyed with toppings like whipped cream or marshmallows.",
    details: {
      origin: "Mesoamerica",
      spices: "Hot chocolate can be made with shaved or melted chocolate bars, chocolate chips, or cocoa powder.",
      size: "200g",
    },
  },
  {
    id: 1009,
    name: "Lemon Grass Tea",
    brand: "Lemon Grass",
    category: "hot-drinks",
    price: 14.75,
    badges: ["sale"],
    rating: 4.6,
    image: "/images/products/hot-drinks/lemon-grass.jpg",
    slug: "lemon-grass",
    inStock: true,
    stockCount: 100,
    description: "The world's best-selling London Dry gin. A distinctively refreshing taste from the finest juniper berries. Very popular in Cameroon for its quality and accessibility.",
    details: {
      origin: "Malaysia",
      style: "Medicinal",
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
    image: "/images/products/gin/tanqueray-gin.jpg",
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
    image: "/images/products/accessories/stainless-steel-wine-opener.jpg",
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
    image: "/images/products/accessories/riedel-wine-glass-set.jpg",
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
    slug: "whiskey-stones",
    inStock: true,
    stockCount: 60,
    description: "Keep your whiskey cold without dilution. Includes 9 granite stones, tongs, and velvet pouch in a gift box.",
    details: {
      material: "Granite",
      pieces: "9 Stones, 1 Tongs, 1 Pouch",
      care: "Rinse and freeze",
    },
    currency: "USD"
  },

  {
    id: 1041,
    name: "Hennessy Whiskey Very Special",
    brand: "Cognac",
    category: "Whiskey",
    price: 44.99,
    badges: ["new"],
    rating: 4.6,
    image: "/images/products/whiskey/hennessy.jpg",
    slug: "hennessy",
    inStock: true,
    stockCount: 60,
    description: "Keep your whiskey cold without dilution. Includes 9 granite stones, tongs, and velvet pouch in a gift box.",
    details: {
      material: "Granite",
      pieces: "9 Stones, 1 Tongs, 1 Pouch",
      care: "Rinse and freeze",
    },
    currency: "USD"
  },

  {
    id: 1042,
    name: "Singleton 12year Old Single Malt Scotch",
    brand: "Scotch",
    category: "Whiskey",
    price: 42.99,
    badges: ["new"],
    rating: 4.6,
    image: "/images/products/whiskey/singleton.jpg",
    slug: "singleton",
    inStock: true,
    stockCount: 60,
    description: "Keep your whiskey cold without dilution. Includes 9 granite stones, tongs, and velvet pouch in a gift box.",
    details: {
      material: "Granite",
      pieces: "9 Stones, 1 Tongs, 1 Pouch",
      care: "Rinse and freeze",
    },
    currency: "USD"
  },

  {
    id: 1043,
    name: "Glen Moray Classic Single Malt Scotch",
    brand: "MaltedScotch",
    category: "Whiskey",
    price: 30.99,
    badges: ["new"],
    rating: 4.6,
    image: "/images/products/whiskey/glenmoray.jpg",
    slug: "glenmoray",
    inStock: true,
    stockCount: 60,
    description: "Keep your whiskey cold without dilution. Includes 9 granite stones, tongs, and velvet pouch in a gift box.",
    details: {
      material: "Granite",
      pieces: "9 Stones, 1 Tongs, 1 Pouch",
      care: "Rinse and freeze",
    },
    currency: "USD"
  },

  {
    id: 1044,
    name: "Tamnavulin Single Malt Scotch",
    brand: "MaltedScotch",
    category: "Whiskey",
    price: 34.99,
    badges: ["new"],
    rating: 4.6,
    image: "/images/products/whiskey/tamnavulin.jfif",
    slug: "tamnavulin",
    inStock: true,
    stockCount: 60,
    description: "Keep your whiskey cold without dilution. Includes 9 granite stones, tongs, and velvet pouch in a gift box.",
    details: {
      material: "Granite",
      pieces: "9 Stones, 1 Tongs, 1 Pouch",
      care: "Rinse and freeze",
    },
    currency: "USD"
  },  

  {
    id: 1045,
    name: "Signature Rare Green 180ml",
    brand: "aged whiskey",
    category: "Whiskey",
    price: 23.99,
    badges: ["new"],
    rating: 4.6,
    image: "/images/products/whiskey/signature.webp",
    slug: "tamnavulin",
    inStock: true,
    stockCount: 60,
    description: "Keep your whiskey cold without dilution. Includes 9 granite stones, tongs, and velvet pouch in a gift box.",
    details: {
      material: "Granite",
      pieces: "9 Stones, 1 Tongs, 1 Pouch",
      care: "Rinse and freeze",
    },
    currency: "USD"
  },  

  {
    id: 1046,
    name: "J&B Rare Blended Scotch Whiskey",
    brand: "blended whiskey",
    category: "Whiskey",
    price: 20.99,
    badges: ["new"],
    rating: 4.6,
    image: "/images/products/whiskey/jb.avif",
    slug: "j&b",
    inStock: true,
    stockCount: 60,
    description: "Keep your whiskey cold without dilution. Includes 9 granite stones, tongs, and velvet pouch in a gift box.",
    details: {
      material: "Granite",
      pieces: "9 Stones, 1 Tongs, 1 Pouch",
      care: "Rinse and freeze",
    },
    currency: "USD"
  },
  
  {
    id: 1047,
    name: "Imperial Blue Whiskey 750ml",
    brand: "aged whiskey",
    category: "Whiskey",
    price: 12.99,
    badges: ["new"],
    rating: 4.6,
    image: "/images/products/whiskey/imperial.jpg",
    slug: "imperial",
    inStock: true,
    stockCount: 60,
    description: "Keep your whiskey cold without dilution. Includes 9 granite stones, tongs, and velvet pouch in a gift box.",
    details: {
      material: "Granite",
      pieces: "9 Stones, 1 Tongs, 1 Pouch",
      care: "Rinse and freeze",
    },
    currency: "USD"
  },

  {
    id: 1048,
    name: "Gordon's London Dry Gin",
    brand: "dry gin",
    category: "Whiskey",
    price: 27.99,
    badges: ["new"],
    rating: 4.6,
    image: "/images/products/whiskey/gordon.jpg",
    slug: "gordon",
    inStock: true,
    stockCount: 60,
    description: "Keep your whiskey cold without dilution. Includes 9 granite stones, tongs, and velvet pouch in a gift box.",
    details: {
      material: "Granite",
      pieces: "9 Stones, 1 Tongs, 1 Pouch",
      care: "Rinse and freeze",
    },
    currency: "USD"
  },

  {
    id: 1049,
    name: "Merry's Irish Cream",
    brand: "irish cream",
    category: "Whiskey",
    price: 20.99,
    badges: ["new"],
    rating: 4.6,
    image: "/images/products/whiskey/merry.jpg",
    slug: "merry",
    inStock: true,
    stockCount: 60,
    description: "Keep your whiskey cold without dilution. Includes 9 granite stones, tongs, and velvet pouch in a gift box.",
    details: {
      material: "Granite",
      pieces: "9 Stones, 1 Tongs, 1 Pouch",
      care: "Rinse and freeze",
    },
    currency: "USD"
  },

  {
    id: 1050,
    name: "BV Land Cream Cafe",
    brand: "cream cafe",
    category: "Whiskey",
    price: 33.99,
    badges: ["new"],
    rating: 4.6,
    image: "/images/products/whiskey/bvcafe.webp",
    slug: "bvland",
    inStock: true,
    stockCount: 60,
    description: "Keep your whiskey cold without dilution. Includes 9 granite stones, tongs, and velvet pouch in a gift box.",
    details: {
      material: "Granite",
      pieces: "9 Stones, 1 Tongs, 1 Pouch",
      care: "Rinse and freeze",
    },
    currency: "USD"
  },
  
  {
    id: 1070,
    name: "Vodka V21 - 75cl",
    brand: "vodka",
    category: "Whiskey",
    price: 10.99,
    badges: ["new"],
    rating: 4.6,
    image: "/images/products/whiskey/vodka_v21.jpg",
    slug: "vodka",
    inStock: true,
    stockCount: 60,
    description: "Keep your whiskey cold without dilution. Includes 9 granite stones, tongs, and velvet pouch in a gift box.",
    details: {
      material: "Granite",
      pieces: "9 Stones, 1 Tongs, 1 Pouch",
      care: "Rinse and freeze",
    },
    currency: "USD"
  },

  {
    id: 1071,
    name: "Whisky Grain Classic – Red Sun 75 cl",
    brand: "vodka",
    category: "Whiskey",
    price: 10.99,
    badges: ["new"],
    rating: 4.6,
    image: "/images/products/whiskey/whisky_red_sun.jpg",
    slug: "Whisky Grain Classic – Red Sun 75 cl",
    inStock: true,
    stockCount: 60,
    description: "Keep your whiskey cold without dilution. Includes 9 granite stones, tongs, and velvet pouch in a gift box.",
    details: {
      material: "Granite",
      pieces: "9 Stones, 1 Tongs, 1 Pouch",
      care: "Rinse and freeze",
    },
    currency: "USD"
  },

  {
    id: 1072,
    name: "Whisky GOA Spirit of Smoothness 1L",
    brand: "vodka",
    category: "Whiskey",
    price: 10.99,
    badges: ["new"],
    rating: 4.6,
    image: "/images/products/whiskey/goa.jpg",
    slug: "Whisky GOA Spirit of Smoothness 1L",
    inStock: true,
    stockCount: 60,
    description: "Keep your whiskey cold without dilution. Includes 9 granite stones, tongs, and velvet pouch in a gift box.",
    details: {
      material: "Granite",
      pieces: "9 Stones, 1 Tongs, 1 Pouch",
      care: "Rinse and freeze",
    },
    currency: "USD"
  },

  {
    id: 1073,
    name: "GOA Spirit of Smoothness Dry Gin 1L – 42,8%",
    brand: "vodka",
    category: "Whiskey",
    price: 10.99,
    badges: ["new"],
    rating: 4.6,
    image: "/images/products/whiskey/goa_spirit.jpg",
    slug: "GOA Spirit of Smoothness Dry Gin 1L – 42,8%",
    inStock: true,
    stockCount: 60,
    description: "Keep your whiskey cold without dilution. Includes 9 granite stones, tongs, and velvet pouch in a gift box.",
    details: {
      material: "Granite",
      pieces: "9 Stones, 1 Tongs, 1 Pouch",
      care: "Rinse and freeze",
    },
    currency: "USD"
  },

  {
    id: 1074,
    name: "Whisky Ritz Reserve 75CL – 42,8%",
    brand: "vodka",
    category: "Whiskey",
    price: 10.99,
    badges: ["new"],
    rating: 4.6,
    image: "/images/products/whiskey/Whisky_ritz.jpg",
    slug: "Whisky Ritz Reserve 75CL – 42,8%",
    inStock: true,
    stockCount: 60,
    description: "Keep your whiskey cold without dilution. Includes 9 granite stones, tongs, and velvet pouch in a gift box.",
    details: {
      material: "Granite",
      pieces: "9 Stones, 1 Tongs, 1 Pouch",
      care: "Rinse and freeze",
    },
    currency: "USD"
  },

  {
    id: 1075,
    name: "North Pole Vodka Chill Filtered – 1L – 40%",
    brand: "vodka",
    category: "Whiskey",
    price: 10.99,
    badges: ["new"],
    rating: 4.6,
    image: "/images/products/whiskey/north_pole.jpg",
    slug: "North Pole Vodka Chill Filtered – 1L – 40%",
    inStock: true,
    stockCount: 60,
    description: "Keep your whiskey cold without dilution. Includes 9 granite stones, tongs, and velvet pouch in a gift box.",
    details: {
      material: "Granite",
      pieces: "9 Stones, 1 Tongs, 1 Pouch",
      care: "Rinse and freeze",
    },
    currency: "USD"
  },

  {
    id: 1076,
    name: "Whisky Kamanda Premium – Rhum Café – 75cl – 45% Vol.",
    brand: "vodka",
    category: "Whiskey",
    price: 10.99,
    badges: ["new"],
    rating: 4.6,
    image: "/images/products/whiskey/whisky_kamanda.jpg",
    slug: "Whisky Kamanda Premium – Rhum Café – 75cl – 45% Vol.",
    inStock: true,
    stockCount: 60,
    description: "Keep your whiskey cold without dilution. Includes 9 granite stones, tongs, and velvet pouch in a gift box.",
    details: {
      material: "Granite",
      pieces: "9 Stones, 1 Tongs, 1 Pouch",
      care: "Rinse and freeze",
    },
    currency: "USD"
  },

  {
    id: 1077,
    name: "Royal’s Colonel XXX Rum – 75CL – 42,8%",
    brand: "vodka",
    category: "Whiskey",
    price: 10.99,
    badges: ["new"],
    rating: 4.6,
    image: "/images/products/whiskey/colonel.jpg",
    slug: "Royal’s Colonel XXX Rum – 75CL – 42,8%",
    inStock: true,
    stockCount: 60,
    description: "Keep your whiskey cold without dilution. Includes 9 granite stones, tongs, and velvet pouch in a gift box.",
    details: {
      material: "Granite",
      pieces: "9 Stones, 1 Tongs, 1 Pouch",
      care: "Rinse and freeze",
    },
    currency: "USD"
  },

  {
    id: 1078,
    name: "Royal’s Special Gold Gin – Premium London Dry Gin 75CL – 42%",
    brand: "vodka",
    category: "Whiskey",
    price: 10.99,
    badges: ["new"],
    rating: 4.6,
    image: "/images/products/whiskey/royal_gold.jpg",
    slug: "Whisky Lottery 75CL – 42,8%",
    inStock: true,
    stockCount: 60,
    description: "Keep your whiskey cold without dilution. Includes 9 granite stones, tongs, and velvet pouch in a gift box.",
    details: {
      material: "Granite",
      pieces: "9 Stones, 1 Tongs, 1 Pouch",
      care: "Rinse and freeze",
    },
    currency: "USD"
  },

  {
    id: 1079,
    name: "Whisky Royal Special Premium – 42,8% – Bouteille 75cl",
    brand: "vodka",
    category: "Whiskey",
    price: 10.99,
    badges: ["new"],
    rating: 4.6,
    image: "/images/products/whiskey/royal_special.jpg",
    slug: "Whisky Lottery 75CL – 42,8%",
    inStock: true,
    stockCount: 60,
    description: "Keep your whiskey cold without dilution. Includes 9 granite stones, tongs, and velvet pouch in a gift box.",
    details: {
      material: "Granite",
      pieces: "9 Stones, 1 Tongs, 1 Pouch",
      care: "Rinse and freeze",
    },
    currency: "USD"
  },

  {
    id: 1080,
    name: "Vodka Absolut Raspberri – 75 cl – 38 % vol",
    brand: "vodka",
    category: "Whiskey",
    price: 22.99,
    badges: ["new"],
    rating: 4.6,
    image: "/images/products/whiskey/vodka_absolut.jpg",
    slug: "Whisky Lottery 75CL – 42,8%",
    inStock: true,
    stockCount: 60,
    description: "Keep your whiskey cold without dilution. Includes 9 granite stones, tongs, and velvet pouch in a gift box.",
    details: {
      material: "Granite",
      pieces: "9 Stones, 1 Tongs, 1 Pouch",
      care: "Rinse and freeze",
    },
    currency: "USD"
  },

  {
    id: 1081,
    name: "Liqueur cream - Pina Colada - 75 cl",
    brand: "vodka",
    category: "Whiskey",
    price: 8.99,
    badges: ["new"],
    rating: 4.6,
    image: "/images/products/whiskey/pina.jpg",
    slug: "Whisky Lottery 75CL – 42,8%",
    inStock: true,
    stockCount: 60,
    description: "Keep your whiskey cold without dilution. Includes 9 granite stones, tongs, and velvet pouch in a gift box.",
    details: {
      material: "Granite",
      pieces: "9 Stones, 1 Tongs, 1 Pouch",
      care: "Rinse and freeze",
    },
    currency: "USD"
  },

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
    title: "hot-drinks",
    description:
      "Warm up with our selection of premium hot drinks, including artisanal coffees, fine teas, and specialty chocolate blends from around the world.",
    products: products.filter((p) => p.category === "hot-drinks"),
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
  water: {
    title: "Water",
    description:
      "Explore our collection of purest and distislled water",
    products: products.filter((p) => p.category === "Water"),
  },
  "soft-drinks": {
    title: "soft-drinks",
    description:
      "Explore our collection of soft drinks",
    products: products.filter((p) => p.category === "soft-drinks"),
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
    category: "hot-drinks",
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


