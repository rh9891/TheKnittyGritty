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
  {
    name: "Von Armin Silk",
    image: "/images/von-armin-silk.jpg",
    description:
      "Von Armin Silk has a soft shine, a wonderfully earthy texture, and a casual spin speckled by little nubs of color. The yarn has an offhand elegance, a warm and welcome attitude, and a palette that is as subtle as the yarn itself.",
    weight: "100 grams",
    length: "618 yards",
    gauge: "6 to 7.5 stitches per inch, fingering weight",
    knitting_needle: "US 2 to 5 (2.75 to 3.75 mm)",
    crochet_hook: "C to F (2.75 to 3.75 mm)",
    recommended_care: "Machine wash cold, tumble dry low.",
    content: "Silk",
    category: "Yarn",
    price: 37,
    countInStock: 34,
  },
  {
    name: "Gaskell Cotton",
    image: "/images/gaskell-cotton.jpg",
    description:
      "Made up of fifty percent organically grown cotton and 50% wool, Gaskell Cotton has an ease and natural beauty that makes it very loveable. Its smooth spin is a classic worsted weight, machine washable, and wonderfully soft. Gaskell Cotton is a lovely choice for gorgeous sweaters, cozy blankets, and three-season accessories.",
    weight: "100 grams",
    length: "120 yards",
    gauge: "3.75 to 4.25 stitches per inch, worsted weight",
    knitting_needle: "US 7 to 9 (4.5 to 5.5 mm)",
    crochet_hook: "G to I (4.5 to 5.5 mm)",
    recommended_care: "Machine wash cold and gentle, lay flat to dry.",
    content: "Cotton/Wool",
    category: "Yarn",
    price: 30,
    countInStock: 17,
  },
  {
    name: "Curzon Cotton",
    image: "/images/curzon-cotton.jpg",
    description:
      "Curzon Cotton is as gentle as a tiny wildflower in a breeze and as sweet as a sunny carpet of yellow blossoms. Though it is 100% organically grown, non-mercerized cotton, Curzon Cotton is a lighter weight, perfect for heirloom baby gear, fine washcloths, and summertime sweaters.",
    weight: "100 grams",
    length: "364 yards",
    gauge: "6.5 to 7 stitches per inch, fingering weight",
    knitting_needle: "US 2 or 3 (3 or 3.25 mm)",
    crochet_hook: "C or D (3 or 3.25 mm)",
    recommended_care: "Machine wash cold, tumble dry low.",
    content: "Cotton",
    category: "Yarn",
    price: 21,
    countInStock: 10,
  },
  {
    name: "Reeve Cashmere",
    image: "/images/reeve-cashmere.jpg",
    description:
      "Reeve Cashmere is a classic worsted weight, which makes it just right for totally toasty accessories and cold-weather sweaters. The cashmere fiber itself comes from hundreds of small farms in the mountainous plateaus of Inner Mongolia and northeastern China. Reeve Cashmere is profoundly beautiful and incredibly soft and we can't think of a more special yarn to purchase.",
    weight: "50 grams",
    length: "82 yards",
    gauge: "3.75 to 4.25 stitches per inch, worsted weight",
    knitting_needle: "US 8 or 9 (5 or 5.5 mm)",
    crochet_hook: "H or I (5 or 5.5 mm)",
    recommended_care: "Hand wash cold, lay flat to dry.",
    content: "Cashmere",
    category: "Yarn",
    price: 49,
    countInStock: 56,
  },
  {
    name: "Dixie Cashmere",
    image: "/images/dixie-cashmere.jpg",
    description:
      "Dixie Cashmere is a classic at The Knitty Gritty. We love its gentle fuzzy halo and its incredible hand-dyed color. The yarn is a wonderfully sumptuous worsted weight, soft enough to knit up a gorgeous cowl, hat, sweater or baby present.",
    weight: "55 grams",
    length: "100 yards",
    gauge: "3.5 to 4 stitches per inch, worsted weight",
    knitting_needle: "US 9 to 10 (5.5 to 6 mm)",
    crochet_hook: "I to J (5.5 to 6 mm)",
    recommended_care: "Hand wash cold, lay flat to dry.",
    content: "Cashmere",
    category: "Yarn",
    price: 55,
    countInStock: 21,
  },
  {
    name: "Hoggan Merino",
    image: "/images/hoggan-merino.jpg",
    description:
      "Hoggan Merino is crepe-spun for a clean finish and hand-dyed for a beautifully deep color. In other words, the yarn is as good as it gets! Hoggan Merino is durable, wonderfully soft, and machine washable, making it the perfect yarn for everyone from babies to grandpas.",
    weight: "50 grams",
    length: "114 yards",
    gauge: "5 to 6 stitches per inch, light worsted weight",
    knitting_needle: "US 6 (4 mm)",
    crochet_hook: "G (4 mm)",
    recommended_care: "Hand wash cold, lay flat to dry.",
    content: "Merino",
    category: "Yarn",
    price: 20,
    countInStock: 38,
  },
  {
    name: "Fleming Cotton",
    image: "/images/fleming-cotton.jpg",
    description:
      "Made in Peru with 65% organic cotton and 35% superfine alpaca, Fleming Cotton combines simplicity with elegance and breezy with toasty, a surprising blend, sweet and salty! Fleming Cotton comes in an undyed color, created by fibers that exist in nature. The yarn is a fingering weight that can be used to knit three-season scarves, wraps, and sweaters, or be doubled for cabin blankets.",
    weight: "100 grams",
    length: "437 yards",
    gauge: "6.75 to 7.5 stitches per inch, fingering weight",
    knitting_needle: "US 2 or 3 (3 or 3.25 mm)",
    crochet_hook: "D or E (3.25 or 3.5 mm)",
    recommended_care: "Hand wash cold, lay flat to dry.",
    content: "Cotton/Alpaca",
    category: "Yarn",
    price: 20,
    countInStock: 22,
  },
  {
    name: "Inglis Merino",
    image: "/images/inglis-merino.jpg",
    description:
      "Inglis Merino is incredibly soft, beautiful, and inspiring. One hundred percent merino wool, sourced from Utah and Nevada, this fingering weight yarn has a worsted-spun construction. Inglis Merino has a satisfying bit of bounce as you work, as well as excellent stitch definition and drape.",
    weight: "50 grams",
    length: "273 yards",
    gauge: "5.5 to 6.5 stitches per inch, light worsted weight",
    knitting_needle: "US 3 to 6 (3.25 to 4 mm)",
    crochet_hook: "D to F (3.25 or 4 mm)",
    recommended_care: "Hand wash and lay flat to dry.",
    content: "Mohair/Wool/Silk",
    category: "Yarn",
    price: 34,
    countInStock: 48,
  },
  {
    name: "Jenyns Merino",
    image: "/images/jenyns-merino.jpg",
    description:
      "Jenyns Merino conjures pure beauty and grace. A single-ply filament of 100% sumptuously soft merino wool, Jenyns Merino is as simple as breath. This fingering weight yarn emits a delicate glow and can be used to make hats, sweaters, and cowls.",
    weight: "100 grams",
    length: "494 yards",
    gauge: "7 to 8.5 stitches per inch, fingering weight",
    knitting_needle: "US 1 to 4 (2.5 to 3.5 mm)",
    crochet_hook: "C to E (2.75 or 3.5 mm)",
    recommended_care: "Hand wash cold, lay flat to dry.",
    content: "Merino",
    category: "Yarn",
    price: 28,
    countInStock: 37,
  },
  {
    name: "Oliphant Yak",
    image: "/images/oliphant-yak.jpg",
    description:
      "An unusual blend of organically grown cotton and yak, Oliphant Yak has a satisfying weight, a very soft feel, and an incredibly lovely hand. Oh, and it’s machine washable, too! Oliphant Yak is a light worsted yarn, a perfect mid-weight for hats and scarves, sweaters and blankets.",
    weight: "100 grams",
    length: "191 yards",
    gauge: "5 to 5.5 stitches per inch, light worsted weight",
    knitting_needle: "US 5 or 6 (3.75 or 4 mm)",
    crochet_hook: "E or F (3.5 or 4 mm)",
    recommended_care:
      "Machine wash delicate cold, lay flat and face down to dry.",
    content: "Cotton/Yak",
    category: "Yarn",
    price: 31,
    countInStock: 47,
  },
  {
    name: "Quarton Merino",
    image: "/images/quarton-merino.jpg",
    description:
      "Quarton Merino is for anyone with a soft spot for cozy and an eye for beauty. It is a loosely spun single ply of pure merino and is the perfect go-to yarn for quick (but gorgeous) knits: winter blankets, hats and scarves, and high-drama cowls.",
    weight: "125 grams",
    length: "48 yards",
    gauge: "1.5 to 2 stitches per inch, jumbo weight",
    knitting_needle: "US 17 or 19 (12 to 15 mm)",
    crochet_hook: "P or Q (11.5 to 15.75 mm)",
    recommended_care: "Hand wash cold, lay flat to dry.",
    content: "Merino",
    category: "Yarn",
    price: 19.4,
    countInStock: 51,
  },
  {
    name: "Quarton Merino",
    image: "/images/quarton-merino.jpg",
    description:
      "Quarton Merino is for anyone with a soft spot for cozy and an eye for beauty. It is a loosely spun single ply of pure merino and is the perfect go-to yarn for quick (but gorgeous) knits: winter blankets, hats and scarves, and high-drama cowls.",
    weight: "125 grams",
    length: "48 yards",
    gauge: "1.5 to 2 stitches per inch, jumbo weight",
    knitting_needle: "US 17 or 19 (12 to 15 mm)",
    crochet_hook: "P or Q (11.5 to 15.75 mm)",
    recommended_care: "Hand wash cold, lay flat to dry.",
    content: "Merino",
    category: "Yarn",
    price: 19.4,
    countInStock: 51,
  },
  {
    name: "Quarton Merino Blanket Bundle",
    image: "/images/quarton-merino-blanket-bundle.jpg",
    description:
      "Crochet or knit? Playful or serious? Lots of colors or a few? All of the above? The Quarton Merino Blanket Bundle is perfectly conceived for making big, cozy blankets. You can use the bundle to make a Granny Square or Colorful Corner Blanket in the Quarton Merino. Whatever you decide to create, we guarantee that the end result will be soft, cozy, and pure pleasure! (This bundle includes 12 skeins of Quarton Merino in contrast colors and 6 skeins of Quarton Merino in a soft color.)",
    weight: "N/A",
    length: "N/A",
    gauge: "1.5 to 2 stitches per inch, jumbo weight",
    knitting_needle: "US 19 (15 mm), 40-inch circular needles",
    crochet_hook: "Q (15.75 mm)",
    recommended_care: "Hand wash cold, lay flat to dry.",
    content: "Merino",
    category: "Yarn",
    price: 437.0,
    countInStock: 7,
  },
  {
    name: "Fleming Cotton Blanket Bundle",
    image: "/images/fleming-cotton-blanket-bundle.jpg",
    description:
      "Modern and minimal, earthy and sumptuous, the Fleming Cotton Blanket Bundle spans all six shades of our undyed organic cotton and alpaca Fleming Cotton yarn. It may look like seed stitch, but you actually make this blanket without the trouble of purling, working a very simple slip stitch pattern, alternating colors every third row. With doubled yarn and a super-tactile texture, the created blanket will have an incredibly satisfying weight and heft. Plus, the full force of the Fleming Cotton spectrum lends a barefoot-on-the-beach kind of pleasure. (This bundle includes 10 skeins of Fleming Cotton. You will receive one skein each of Color A and Color F, but two skeins each of Color B to Color E.)",
    weight: "Each skein is approximately 100 grams.",
    length: "Each skein is approximately 437 yards.",
    gauge:
      "23 stitches and 60 rows = 4 inches in stitch pattern with yarn doubled",
    knitting_needle:
      "US 9 (5.5 mm), 32-inch, 40-inch, or 47-inch circular needles",
    crochet_hook: "N/A",
    recommended_care: "Hand wash cold, lay flat to dry.",
    content: "Cotton/Alpaca",
    category: "Yarn",
    price: 155.0,
    countInStock: 7,
  },
  {
    name: "Wright Wooly Blanket Bundle",
    image: "/images/wright-wooly-blanket-bundle.jpg",
    description:
      "Either knitted in garter stitch or crocheted in single crochet, a created blanket from the Wright Wooly Blanket Bundle can always satisfy with its easy modernity and lively versatility. Using the Wright Wooly yarn, your blanket will have a wonderful heft and lush softness, so nice for those cold and chilly nights. (This bundle includes 7 skeins of Wright Wooly in a distinct color palette.)",
    weight: "Each skein is approximately 100 grams.",
    length: "Each skein is approximately 164 yards.",
    gauge: "18 stitches = 4 inches in garter stitch",
    knitting_needle: "US 7 (4.5 mm), 24-inch or 32-inch circular needles",
    crochet_hook: "I (5.5 mm)",
    recommended_care: "Machine wash cold, tumble dry low.",
    content: "Merino",
    category: "Yarn",
    price: 101.0,
    countInStock: 42,
  },
  {
    name: "Woolf Wooly Blanket Bundle",
    image: "/images/woolf-wooly-blanket-bundle.jpg",
    description:
      "With the Woolf Wooly Blanket Bundle, you can create a log cabin design quilt that will feel like it's straight from the sheep. The Woolf Wooly Blanket Bundle takes the best of all worlds to help create a blanket that is colorful, cuddly, and absolutely beautiful. (This bundle includes 9 skeins of Woolf Wooly in a color story that is filched from nature.)",
    weight: "Each skein is approximately 200 grams.",
    length: "Each skein is approximately 109 yards.",
    gauge:
      "8 stitches and 16 rows [8 garter ridges] = 4 inches in garter stitch",
    knitting_needle: "US 17 (12 mm), 40-inch circular needles",
    crochet_hook: "N/A",
    recommended_care: "Hand wash and lay flat to dry.",
    content: "Wool",
    category: "Yarn",
    price: 261.5,
    countInStock: 23,
  },
  {
    name: "Lennox Linen Blanket Bundle",
    image: "/images/lennox-linen-blanket-bundle.jpg",
    description:
      "A masterpiece in construction, color, and design, our Lennox Linen Blanket Bundle is as close as you can get to painting with yarn. Using Lennox Linen doubled, this blanket ripples through color with stunning beauty. Knitting each square from corner to corner, then picking up stitches along one or two sides of adjoining squares to continue with the next one, gradually gliding from one combo of colors to another, it is the perfect get-involved project. (This bundle includes 19 skeins of Lennox Linen in a color palette that is reminiscent of dawn.)",
    weight: "Each skein is approximately 100 grams.",
    length: "Each skein is approximately 439 yards.",
    gauge: "22 stitches and 44 rows = 4 inches in garter stitch",
    knitting_needle:
      "US 6 (4 mm), 20-inch or 24-inch circular needles or straight needles",
    crochet_hook: "N/A",
    recommended_care: "Hand wash and lay flat to dry.",
    content: "Wool/Alpaca/Linen",
    category: "Yarn",
    price: 356.5,
    countInStock: 20,
  },
];

export default products;
