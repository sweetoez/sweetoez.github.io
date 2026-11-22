(() => {
  const imageBase = "../assets/images/msn/";
  const articles = [
    {
      image: `${imageBase}articles/books.jpg`,
      alt: "An open book and a stack of old books surrounded by flowers",
      title: "How a good book can lead to a whole new world",
      publisher: "Weekend Edit",
    },
    {
      image: `${imageBase}articles/design-systems.jpg`,
      alt: "A snail moving across a softly blurred green and orange background",
      title: "Why small design systems help growing teams work better",
      publisher: "Studio Weekly",
    },
    {
      image: `${imageBase}articles/farming.jpg`,
      alt: "A farm with vegetable rows, a barn, forest and mountains",
      title: "How community gardens are reshaping city blocks each season",
      publisher: "Neighborhood Post",
    },
    {
      image: `${imageBase}articles/furniture.jpg`,
      alt: "A modern living room opening onto trees and a distant city",
      title: "Thoughtful furniture turns everyday rooms into welcoming places",
      publisher: "City Ledger",
    },
    {
      image: `${imageBase}articles/home-interior.jpg`,
      alt: "A potted plant beside a sofa lit by warm evening light",
      title: "Ways to make an older apartment brighter and more spacious",
      publisher: "Home Notes",
    },
    {
      image: `${imageBase}articles/kitchen-tools.jpg`,
      alt: "Wooden spoons and kitchen tools arranged in a bright kitchen",
      title: "The small kitchen tools that make weeknight cooking easier",
      publisher: "Weekend Edit",
    },
    {
      image: `${imageBase}articles/open-spaces.jpg`,
      alt: "A broad green mountain valley with a river and open meadows",
      title: "How designers are making public spaces work for more people",
      publisher: "Design Dispatch",
    },
    {
      image: `${imageBase}articles/pantry.jpg`,
      alt: "Grains, jars and dried ingredients arranged in a pantry",
      title: "Five pantry staples that stay fresh well beyond their printed dates",
      publisher: "Morning Brief",
    },
    {
      image: `${imageBase}articles/peacock.jpg`,
      alt: "A close view of blue-green and copper peacock feathers",
      title: "A Symbol of Beauty: Exploring the Secret Lives of Peacocks",
      publisher: "Field Notes",
    },
    {
      image: `${imageBase}articles/recipes.jpg`,
      alt: "Fresh tomatoes, bread and herbs arranged on a wooden board",
      title: "Weekend recipes with one pan and fresh seasonal ingredients",
      publisher: "Table Stories",
    },
    {
      image: `${imageBase}articles/space.jpg`,
      alt: "A glowing planetary landscape with distant planets in a dark sky",
      title: "A closer look at the colors and motion of distant worlds",
      publisher: "Everyday Guide",
    },
    {
      image: `${imageBase}articles/train.jpg`,
      alt: "A train traveling through a sunlit green forest",
      title: "The quiet comeback of overnight trains is changing weekend travel",
      publisher: "Transit Journal",
    },
    {
      image: `${imageBase}articles/trails.jpg`,
      alt: "People walking among trees in a softly lit, misty landscape",
      title: "Five neighborhood trails to explore before the next sunny weekend",
      publisher: "Field Notes",
    },
    {
      image: `${imageBase}articles/transportation.jpg`,
      alt: "A quiet passenger cabin looking out onto a sandy landscape",
      title: "What new local transit plans could mean for your daily commute",
      publisher: "Local Outlook",
    },
    {
      image: `${imageBase}articles/travel.jpg`,
      alt: "A mountain peak above a flower-filled meadow",
      title: "Find a little wonder on your next mountain getaway",
      publisher: "City Ledger",
    },
    {
      image: `${imageBase}articles/work-spaces.jpg`,
      alt: "People sharing a bright, plant-filled indoor workspace",
      title: "How shared workspaces are changing the way teams connect",
      publisher: "Everyday Guide",
    },
  ];

  const ads = [
    {
      image: `${imageBase}ads/ad-01.jpg`,
      alt: "A close-up of soft blue and violet feathers",
      headline: "Bring a little more nature home",
      advertiser: "Wildfern Supply",
    },
    {
      image: `${imageBase}ads/ad-02.jpg`,
      alt: "A colorful dragonfly in flight",
      headline: "See the world from a new angle",
      advertiser: "Aerialia Optics",
    },
    {
      image: `${imageBase}ads/ad-03.jpg`,
      alt: "A collection of pale string and wind instruments",
      headline: "Find the sound that feels like home",
      advertiser: "Stillkind Music",
    },
    {
      image: `${imageBase}ads/ad-04.jpg`,
      alt: "A secluded modern home among trees beside still water",
      headline: "Make room for a quieter escape",
      advertiser: "Mistral Hideaways",
    },
    {
      image: `${imageBase}ads/ad-05.jpg`,
      alt: "A blue phone resting among flowing waves",
      headline: "Stay connected through every current",
      advertiser: "Bluecurrent Mobile",
    },
    {
      image: `${imageBase}ads/ad-06.jpg`,
      alt: "A phone standing on a rain-wet city street at night",
      headline: "Capture more of your everyday story",
      advertiser: "Daypath Devices",
    },
  ];

  const digestArticles = [
    ["train", articles[11]],
    ["trails", articles[12]],
    ["transportation", articles[13]],
    ["travel", articles[14]],
    ["work-spaces", articles[15]],
  ];
  const digest = digestArticles.map(([slug, article]) => ({
    ...article,
    image: `${imageBase}digest/${slug}.jpg`,
  }));

  window.MSN_CONTENT = { ads, articles, digest };
})();
