const products = [
  {
    name: "Chopin Coorie",
    image: "/images/chopin-coorie.jpg",
    description:
      "Chopin Coorie is made up of 100% super kid mohair from Scotland. Though it is less fluffier than the usual mohair-silk blend, Chopin Coorie is incredibly soft with a gentle halo and an exquisite shimmer that has the density and drape of alpaca with a natural luster.",
    weight: "50 grams",
    length: "137 yards",
    gauge: "6 to 6.5 stitches per inch, sportweight",
    knitting_needle: "US 3 or 4 (3.25 to 3.5 mm)",
    crochet_hook: "D or E (3.25 to 3.5 mm)",
    recommended_care: "Hand wash cold, lay flat to dry.",
    content: "Mohair",
    category: "Yarn",
    price: 24.5,
    countInStock: 47,
  },
  {
    name: "Woolf Wooly",
    image: "/images/woolf-wooly.jpg",
    description:
      "As the name suggests, Woolf Wooly is made up of 100% wool. The yarn is a single-ply super bulky blend with a soft and gentle beauty. Great for making sweaters, warm wraps, toasty blankets and cozy hats.",
    weight: "200 grams",
    length: "109 yards",
    gauge: "1.875 to 2.125 stitches per inch, super bulky",
    knitting_needle: "US 15 or 17 (10 or 12 mm)",
    crochet_hook: "N to P (10 to 12 mm)",
    recommended_care: "Hand wash, lay flat to dry.",
    content: "Wool",
    category: "Yarn",
    price: 33.5,
    countInStock: 40,
  },
  {
    name: "Austen Alpaca",
    image: "/images/austen-alpaca.jpg",
    description:
      "Made up of 43% baby alpaca, 42% extra fine merino, and 15% linen, Austen Alpaca is a very special yarn, full of gentle charm and natural beauty. The linen is undyed, casting the entire palette in a soft, tweedy haze.",
    weight: "100 grams",
    length: "219 yards",
    gauge: "5 to 5.5 stitches per inch, light worsted",
    knitting_needle: "US 6 to 8 (4 to 5 mm)",
    crochet_hook: "F to H (4 to 5 mm)",
    recommended_care: "Hand wash cold, lay flat to dry.",
    content: "Alpaca/Merino/Linen",
    category: "Yarn",
    price: 28.5,
    countInStock: 10,
  },
  {
    name: "Kipling Cashmere",
    image: "/images/kipling-cashmere.jpg",
    description:
      "Made up of 75% extra fine merino wool and 25% cashmere, Kipling Cashmere is a classic plied yarn. With a quarter of its components being cashmere, it is incredibly soft and supple. The remaining elements are of extra fine merino wool, so it is elastic and durable. A light worsted weight, Kipling Cashmere is perfect for everything and everyone, gentle for babies and sensitive skin.",
    weight: "100 grams",
    length: "218 yards",
    gauge: "5 to 5.5 stitches per inch, light worsted",
    knitting_needle: "US 5 to 7 (3.75 to 4.5 mm)",
    crochet_hook: "E to G (3.75 to 4.5 mm)",
    recommended_care: "Hand wash cold, lay flat to dry.",
    content: "Merino/Cashmere",
    category: "Yarn",
    price: 41.0,
    countInStock: 47,
  },
  {
    name: "Wright Wooly",
    image: "/images/wright-wooly.jpg",
    description:
      "Made up of 100% merino wool, Wright Wooly is a classic 2-ply farm yarn. It is as soft as a baby lamb's ear and perfect for cowls, scarves, hats, mittens, sweaters, and blankets.",
    weight: "100 grams",
    length: "164 yards",
    gauge: "4.5 to 5 stitches per inch, worsted weight",
    knitting_needle: "US 7 to 8 (4.5 to 5 mm)",
    crochet_hook: "G to H (4.5 to 5 mm)",
    recommended_care: "Hand wash cold, lay flat to dry.",
    content: "Merino",
    category: "Yarn",
    price: 28.0,
    countInStock: 66,
  },
  {
    name: "Lennox Linen",
    image: "/images/lennox-linen.jpg",
    description:
      "Lennox Linen is a fingering weight blend of fine highland wool (50%), alpaca (35%), and linen (15%). The yarn is windswept and elegant, hearty and beautiful. These fibers are spectacular for knitting, crocheting, and weaving and can be used for garments, blankets, accessories, and housewares.",
    weight: "100 grams",
    length: "439 yards",
    gauge: "6.5 to 7.5 stitches per inch, fingering weight",
    knitting_needle: "US 2 to 5 (3 to 3.75 mm)",
    crochet_hook: "C to E (2.75 to 3.5 mm)",
    recommended_care: "Hand wash, lay flat to dry.",
    content: "Wool/Alpaca/Linen",
    category: "Yarn",
    price: 23.5,
    countInStock: 65,
  },
  {
    name: "Murdoch Merino",
    image: "/images/murdoch-merino.jpg",
    description:
      "Made up of 100% merino wool, Murdoch Merino is a yarn full of beauty and joy. Hand-spun and dipped into an abundance of inspiring color, the yarn knits up at a chunky or bulky weight and is great for making blankets, sweaters, and super cozy winter accessories.",
    weight: "100 grams",
    length: "82 yards",
    gauge: "2.5 to 3 stitches per inch, chunky or bulky weight",
    knitting_needle: "US 10 to 11 (6 to 8 mm)",
    crochet_hook: "J to L (6 to 8 mm)",
    recommended_care: "Machine wash cold, tumble dry low.",
    content: "Merino",
    category: "Yarn",
    price: 33.0,
    countInStock: 56,
  },
  {
    name: "Cobbold Cotton",
    image: "/images/cobbold-cotton.jpg",
    description:
      "A blend of 70% organically grown cotton, 20% rayon from bamboo, and 10% hemp, Cobbold Cotton is heathery perfection. It is great for knitting accessories, sweaters, and heirloom blankets. (It is an absolute MUST if knitting for the little ones!)",
    weight: "100 grams",
    length: "328 yards",
    gauge: "6.5 to 7 stitches per inch, fingering weight",
    knitting_needle: "US 2 or 3 (3 or 3.25 mm)",
    crochet_hook: "C or D (3 or 3.25 mm)",
    recommended_care: "Machine wash cold, tumble dry low.",
    content: "Cotton/Rayon/Hemp",
    category: "Yarn",
    price: 21.0,
    countInStock: 46,
  },
  {
    name: "Lessing Linen",
    image: "/images/lessing-linen.jpg",
    description:
      "Loosely spun, minimally processed, natural and raw, Lessing Linen has an untouched beauty that evokes a time long past. It creates a fine, durable fabric that is perfect for generous wraps, sweaters, and housewares. Discover its vast beauty before it is all gone.",
    weight: "100 grams",
    length: "295 yards",
    gauge: "6.5 to 7 stitches per inch, fingering weight",
    knitting_needle: "US 2 to 4 (3 to 3.5 mm)",
    crochet_hook: "C to E (3 to 3.5 mm)",
    recommended_care: "Machine wash delicate cold, lay flat to dry.",
    content: "Linen",
    category: "Yarn",
    price: 33.0,
    countInStock: 0,
  },
  {
    name: "Prince Patagonia",
    image: "/images/prince-patagonia.jpg",
    description:
      "Created from ethical and sustainable practices, this merino wool fiber comes from the innovative efforts of select wool farmers who care to responsibly steward the Patagonian Grasslands. Prince Patagonia features an extra fine version of this merino in crisply spun plies, which create exquisite stitch definition. In a lush worsted weight, Prince Patagonia has unparalleled warmth and softness and is perfectly suited for cabled sweaters and wool accessories. All proceeds will go to domestic and international grassroots environmental groups that value serious commitment to the environment.",
    weight: "100 grams",
    length: "173 yards",
    gauge: "3.5 to 4 stitches per inch, worsted weight",
    knitting_needle: "US 7 to 9 (4.5 to 5.5 mm)",
    crochet_hook: "G to I (4.5 to 5.5 mm)",
    recommended_care: "Hand wash and lay flat to dry.",
    content: "Merino",
    category: "Yarn",
    price: 37.0,
    countInStock: 8,
  },
  {
    name: "Montefiore Merino",
    image: "/images/montefiore-merino.jpg",
    description:
      "Montefiore Merino combines the softness of merino wool with the luster of silk in a beautiful and lightweight yarn. This exquisite yarn is produced by silk worms that feed on oak and similar tree leaves, rich in tannins that give the fiber a gorgeous golden tone. It is dyed using a process that yields complex and subtle colors. Montefiore Merino can be used to make scarves, wraps, baby garments and sweaters.",
    weight: "100 grams",
    length: "490 yards",
    gauge: "6 to 7 stitches per inch, fingering weight",
    knitting_needle: "US 3 to 5 (3.25 to 3.75 mm)",
    crochet_hook: "D to F (3.25 to 3.75 mm)",
    recommended_care: "Hand wash, lay flat to dry.",
    content: "Merino/Silk",
    category: "Yarn",
    price: 36.0,
    countInStock: 31,
  },
  {
    name: "Browning Wool",
    image: "/images/browning-wool.jpg",
    description:
      "Quickly becoming an American classic, Browning Wool is inspired by Shetland wools. Entirely homegrown, the wool comes from the Targhee-Columbia sheep in Wyoming. Browning Wool is a featherlight, fingering wool that is both bouncy and fluid for delicate lace fabrics. The wool can also be used to make sweaters, wraps, hats, and mittens.",
    weight: "50 grams",
    length: "275 yards",
    gauge: "6 to 8 stitches per inch, fingering weight",
    knitting_needle: "US 0 to 4 (2 to 3.5 mm)",
    crochet_hook: "A to E (2 to 3.5 mm)",
    recommended_care: "Hand wash.",
    content: "Wool",
    category: "Yarn",
    price: 21.75,
    countInStock: 23,
  },
  {
    name: "Walford Wool",
    image: "/images/walford-wool.jpg",
    description:
      "Walford Wool is an eccentric mélange of neutrals with bits of bright fibers handspun throughout. The finished result is a soft yarn with a ton of subtlety and charisma. The yarn also includes sparkling Angelina fibers and is made from humane non-mulesed wool fiber.",
    weight: "100 grams",
    length: "68 yards",
    gauge: "3 to 4 stitches per inch, bulky weight",
    knitting_needle: "US 11 to 15 (8 to 10 mm)",
    crochet_hook: "L to P (8 to 10 mm)",
    recommended_care:
      "Hand wash cold or machine wash delicate cold, lay flat to dry.",
    content: "Wool/Angelina Fiber",
    category: "Yarn",
    price: 44.65,
    countInStock: 60,
  },
  {
    name: "Norgate Nylon",
    image: "/images/norgate-nylon.jpg",
    description:
      "Norgate Nylon is a wondrous blend of superwash merino, cashmere and nylon. It is the PERFECT yarn to use to make a baby blanket as it is machine washable, super soft, and special enough for heirloom knitting.",
    weight: "100 grams",
    length: "200 yards",
    gauge: "4.5 to 5 stitches per inch, worsted weight",
    knitting_needle: "US 6 to 8 (4 to 5 mm)",
    crochet_hook: "G to H (4 to 5 mm)",
    recommended_care: "Machine Wash.",
    content: "Merino/Cashmere/Nylon",
    category: "Yarn",
    price: 40.0,
    countInStock: 65,
  },
  {
    name: "Byatt Cashmere",
    image: "/images/byatt-cashmere.jpg",
    description:
      "Made of the finest Mongolian cashmere and spun by hand (instead of machine), Byatt Cashmere is honestly as soft as it gets. Add to that its hefty thickness and one is left admiring its decadence.",
    weight: "90 grams",
    length: "60 yards",
    gauge: "2.5 to 3 stitches per inch, bulky weight",
    knitting_needle: "US 11 to 13 (8 to 9 mm)",
    crochet_hook: "L to M (8 to 9 mm)",
    recommended_care: "Hand wash cold, lay flat to dry.",
    content: "Cashmere",
    category: "Yarn",
    price: 79.0,
    countInStock: 45,
  },
  {
    name: "Brontë Silk",
    image: "/images/bronte-silk.jpg",
    description:
      "Brontë Silk brings a touch of something special to any event. Made up of seventy-five percent silk and 25% synthetic sparkle, Brontë Silk's smooth and shiny silk base is sprinkled with flecks of something reminiscent of starlight. This lace weight yarn is wonderful on its own for wraps and scarves, but is especially lovely when held together with another yarn.",
    weight: "50 grams",
    length: "394 yards",
    gauge: "8 to 10 stitches per inch, lace weight",
    knitting_needle: "US 0 to 2 (2 to 3 mm)",
    crochet_hook: "A to C (2 to 3 mm)",
    recommended_care: "Hand wash cold, lay flat to dry.",
    content: "Silk/Synthetic Sparkle",
    category: "Yarn",
    price: 33.0,
    countInStock: 2,
  },
  {
    name: "Alcott Wool",
    image: "/images/alcott-wool.jpg",
    description:
      "Alcott Wool is big, bold, and beautiful! The yarn feels absolutely lofty and luscious and can be used to make fun hats and scarves, or distinctive sweaters and cardigan coats.",
    weight: "200 grams",
    length: "30 yards",
    gauge: "1/2 to 2 stitches per inch, jumbo weight",
    knitting_needle: "US 36 or 50 (20 or 25 mm)",
    crochet_hook: "S to Z (19 to 35 mm)",
    recommended_care: "Hand wash.",
    content: "Wool",
    category: "Yarn",
    price: 50.8,
    countInStock: 72,
  },
  {
    name: "Davys Merino",
    image: "/images/davys-merino.jpg",
    description:
      "Davys Merino is an amazingly soft yarn, crafted of 80% superwash merino, 10% cashmere and 10% nylon. It is hand dyed in palettes that use subtle shades that seem to have been harvested from nature herself.",
    weight: "100 grams",
    length: "575 yards",
    gauge: "8.5 to 9 stitches per inch, lace weight",
    knitting_needle: "US 1 to 3 (2.25 to 3.25 mm)",
    crochet_hook: "B to D (2.25 to 3.25 mm)",
    recommended_care: "Machine wash.",
    content: "Merino/Cashmere/Nylon",
    category: "Yarn",
    price: 40.0,
    countInStock: 33,
  },
  {
    name: "Rhys Merino",
    image: "/images/rhys-merino.jpg",
    description:
      "One hundred percent incredibly soft, superwash merino? One hundred percent fun? You've got all of the above with Rhys Merino! The yarn is a super bulky yet lightweight merino, hand dyed in a charismatic spectrum of brights and neutrals, giving it a ton of personality while being a quick, machine-washable knit.",
    weight: "150 grams",
    length: "114 yards",
    gauge: "2.5 stitches per inch, super bulky weight",
    knitting_needle: "US 13 to 15 (9 to 10 mm)",
    crochet_hook: "M to N (9 to 10 mm)",
    recommended_care: "Machine wash cold, tumble dry low.",
    content: "Merino",
    category: "Yarn",
    price: 43.5,
    countInStock: 42,
  },
  {
    name: "Behn Mohair",
    image: "/images/behn-mohair.jpg",
    description:
      "Spun and dyed in Japan, Behn Mohair is 60% super fine kid mohair and 40% silk. It is a beautiful blend inspired by nature’s lapping waters. Behn Mohair is a fine laceweight, with so much body and bloom that it can be used as a fingering weight. This feather-light fiber also plays beautifully in pairs alongside other yarns, for plumping up a companion or for adding an unexpected touch.",
    weight: "25 grams",
    length: "328 yards",
    gauge: "6 to 7 stitches per inch, fingering weight",
    knitting_needle: "US 3 to 6 (3.25 to 4 mm)",
    crochet_hook: "D to G (3.25 to 4.25 mm)",
    recommended_care: "Hand wash cold, lay flat to dry.",
    content: "Mohair/Silk",
    category: "Yarn",
    price: 24,
    countInStock: 27,
  },
  {
    name: "Radcliffe Wool",
    image: "/images/radcliffe-wool.jpg",
    description:
      "Radcliffe Wool is known for its gorgeous tweedy color and its light and lofty woolen-spun virgin wool. The yarn is a warm and toasty worsted-weight classic, just right for a cozy sweater, rugged hat, or a pair of mittens.",
    weight: "100 grams",
    length: "200 yards",
    gauge: "4.5 to 5 stitches per inch, worsted weight",
    knitting_needle: "US 5 to 7 (3.75 to 4.5 mm)",
    crochet_hook: "E to G (3.75 to 4.5 mm)",
    recommended_care: "Hand wash cold, lay flat to dry.",
    content: "Wool",
    category: "Yarn",
    price: 17.4,
    countInStock: 5,
  },
  {
    name: "Burney Bamboo",
    image: "/images/burney-bamboo.jpg",
    description:
      "The beauty of the Burney Bamboo is that it drapes and shines like silk, but is more durable, less expensive, machine washable, and 100% vegan. It manifests the refinement and grace of silk without requiring animal products or precious care. Burney Bamboo is essentially a rayon, a fiber created by chemically breaking down plant materials (bamboo, in this case) into a pulp, which is then extruded into fibers. The yarn is great for scarves, wraps, and sweaters.",
    weight: "100 grams",
    length: "339 yards",
    gauge: "5.75 to 7 stitches per inch, fingering or sport weight",
    knitting_needle: "US 2 to 4 (3 to 3.5 mm)",
    crochet_hook: "C to E (2.75 to 3.5 mm)",
    recommended_care: "Machine wash delicate cold, lay flat to dry.",
    content: "Rayon/Bamboo",
    category: "Yarn",
    price: 24.5,
    countInStock: 71,
  },
  {
    name: "Alexander Yak",
    image: "/images/alexander-yak.jpg",
    description:
      "Humanely and sustainably harvested from the downy undercoat of baby yaks, Alexander Yak is incredibly soft, warm, and beautiful. It is sourced directly from cooperatives of Tibetan nomadic herders and spun in Italy’s finest mills. Alexander Yak works up in a cozy worsted weight and can be used for gorgeous sweaters and winter accessories.",
    weight: "50 grams",
    length: "125 yards",
    gauge: "4.5 to 5 stitches per inch, worsted weight",
    knitting_needle: "US 7 to 9 (4.5 to 5.5 mm)",
    crochet_hook: "G to H (4.5 to 5.5 mm)",
    recommended_care: "Hand wash and lay flat to dry.",
    content: "Yak",
    category: "Yarn",
    price: 30,
    countInStock: 21,
  },
  {
    name: "Dickinson Yak",
    image: "/images/dickinson-yak.jpg",
    description:
      "Dickinson Yak is combed from the soft and insulating undercoat of the majestic yak. This yarn comes in a rich, undyed natural brown that is incredibly soft and toasty with a lovely halo glowing off its surface, Dickinson Yak is a light worsted weight yarn, perfect for winter accessories, sweaters, and blankets.",
    weight: "50 grams",
    length: "109 yards",
    gauge: "5 to 5.5 stitches per inch, light worsted weight",
    knitting_needle: "US 4 to 6 (3.5 to 4 mm)",
    crochet_hook: "E or F (3.5 to 4 mm)",
    recommended_care: "Hand wash cold, lay flat to dry.",
    content: "Yak",
    category: "Yarn",
    price: 31,
    countInStock: 23,
  },
  {
    name: "Ali Alpaca",
    image: "/images/ali-alpaca.jpg",
    description:
      "Ali Alpaca glows with its own inner light and redefines cozy. Composed of 100% baby alpaca, this yarn is a very special grade that is hand sorted for quality and softness. Ali Alpaca is a classically plied sportweight, with a gentle heft that gives it just the right drape. Sweaters, hats, blankets, mittens, scarves, and cowls are all perfect candidates for this not-too-heavy, not-too-fuzzy, not-too-hot, totally timeless pure alpaca.",
    weight: "100 grams",
    length: "218 yards",
    gauge: "6 to 7 stitches per inch, sport weight",
    knitting_needle: "US 3 to 5 (3.25 to 3.75 mm)",
    crochet_hook: "D to F (3.25 to 3.75 mm)",
    recommended_care: "Hand wash cold, lay flat to dry.",
    content: "Alpaca",
    category: "Yarn",
    price: 33,
    countInStock: 20,
  },
  {
    name: "Eliot Alpaca",
    image: "/images/eliot-alpaca.jpg",
    description:
      "Named for its woodsy character and shadowy palette, Eliot Alpaca makes a wonderful addition to your own family’s story. It is a stunning mixture of 50% baby alpaca, 25% baby yak, and 25% silk. Eliot Alpaca is a light worsted weight yarn that is remarkably soft and squishy, but also surprisingly light, keeping you warm without weighing you down.",
    weight: "100 grams",
    length: "250 yards",
    gauge: "4.75 to 5.25 stitches per inch, light worsted weight",
    knitting_needle: "US 5 to 7 (3.75 to 4.5 mm)",
    crochet_hook: "F to G (3.75 to 4.5 mm)",
    recommended_care: "Hand wash cold, lay flat to dry.",
    content: "Alpaca/Yak/Silk",
    category: "Yarn",
    price: 39,
    countInStock: 6,
  },
];

export default products;
