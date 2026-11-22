(() => {
  const imageBase = "../assets/images/msn/";
  const publishers = Array.from({ length: 21 }, (_, index) => {
    const number = String(index + 1).padStart(2, "0");
    return {
      key: `unsure-${number}`,
      name: `Publisher ${number}`,
      logo: `../assets/images/brand/publishers/publisher-unsure-${number}.png`,
    };
  });
  const articles = [
    {
      image: `${imageBase}articles/books.jpg`,
      alt: "An open book and a stack of old books surrounded by flowers",
      title: "How a good book can lead to a whole new world",
    },
    {
      image: `${imageBase}articles/design-systems.jpg`,
      alt: "A snail moving across a softly blurred green and orange background",
      title: "Why small design systems help growing teams work better",
    },
    {
      image: `${imageBase}articles/farming.jpg`,
      alt: "A farm with vegetable rows, a barn, forest and mountains",
      title: "How community gardens are reshaping city blocks each season",
    },
    {
      image: `${imageBase}articles/furniture.jpg`,
      alt: "A modern living room opening onto trees and a distant city",
      title: "Thoughtful furniture turns everyday rooms into welcoming places",
    },
    {
      image: `${imageBase}articles/home-interior.jpg`,
      alt: "A potted plant beside a sofa lit by warm evening light",
      title: "Ways to make an older apartment brighter and more spacious",
    },
    {
      image: `${imageBase}articles/kitchen-tools.jpg`,
      alt: "Wooden spoons and kitchen tools arranged in a bright kitchen",
      title: "The small kitchen tools that make weeknight cooking easier",
    },
    {
      image: `${imageBase}articles/open-spaces.jpg`,
      alt: "A broad green mountain valley with a river and open meadows",
      title: "How designers are making public spaces work for more people",
    },
    {
      image: `${imageBase}articles/pantry.jpg`,
      alt: "Grains, jars and dried ingredients arranged in a pantry",
      title: "Five pantry staples that stay fresh well beyond their printed dates",
    },
    {
      image: `${imageBase}articles/peacock.jpg`,
      alt: "A close view of blue-green and copper peacock feathers",
      title: "A Symbol of Beauty: Exploring the Secret Lives of Peacocks",
    },
    {
      image: `${imageBase}articles/recipes.jpg`,
      alt: "Fresh tomatoes, bread and herbs arranged on a wooden board",
      title: "Weekend recipes with one pan and fresh seasonal ingredients",
    },
    {
      image: `${imageBase}articles/space.jpg`,
      alt: "A glowing planetary landscape with distant planets in a dark sky",
      title: "A closer look at the colors and motion of distant worlds",
    },
    {
      image: `${imageBase}articles/train.jpg`,
      alt: "A train traveling through a sunlit green forest",
      title: "The quiet comeback of overnight trains is changing weekend travel",
    },
    {
      image: `${imageBase}articles/trails.jpg`,
      alt: "People walking among trees in a softly lit, misty landscape",
      title: "Five neighborhood trails to explore before the next sunny weekend",
    },
    {
      image: `${imageBase}articles/transportation.jpg`,
      alt: "A quiet passenger cabin looking out onto a sandy landscape",
      title: "What new local transit plans could mean for your daily commute",
    },
    {
      image: `${imageBase}articles/travel.jpg`,
      alt: "A mountain peak above a flower-filled meadow",
      title: "Find a little wonder on your next mountain getaway",
    },
    {
      image: `${imageBase}articles/work-spaces.jpg`,
      alt: "People sharing a bright, plant-filled indoor workspace",
      title: "How shared workspaces are changing the way teams connect",
    },
  ];

  const ads = [
    {
      image: `${imageBase}ads/ad-01.jpg`,
      alt: "A close-up of soft blue and violet feathers",
      headline: "Bring a little more nature home",
    },
    {
      image: `${imageBase}ads/ad-02.jpg`,
      alt: "A colorful dragonfly in flight",
      headline: "See the world from a new angle",
    },
    {
      image: `${imageBase}ads/ad-03.jpg`,
      alt: "A collection of pale string and wind instruments",
      headline: "Find the sound that feels like home",
    },
    {
      image: `${imageBase}ads/ad-04.jpg`,
      alt: "A secluded modern home among trees beside still water",
      headline: "Make room for a quieter escape",
    },
    {
      image: `${imageBase}ads/ad-05.jpg`,
      alt: "A blue phone resting among flowing waves",
      headline: "Stay connected through every current",
    },
    {
      image: `${imageBase}ads/ad-06.jpg`,
      alt: "A phone standing on a rain-wet city street at night",
      headline: "Capture more of your everyday story",
    },
  ];

  articles.forEach((article, index) => {
    article.publisherKey = publishers[index].key;
  });
  ads.forEach((ad, index) => {
    ad.publisherKey = publishers[articles.length + index % (publishers.length - articles.length)].key;
  });

  const digestArticles = [
    ["train", articles[11], "Transit Journal"],
    ["trails", articles[12], "Field Notes"],
    ["transportation", articles[13], "Local Outlook"],
    ["travel", articles[14], "City Ledger"],
    ["work-spaces", articles[15], "Everyday Guide"],
  ];
  const digest = digestArticles.map(([slug, article, publisher]) => ({
    ...article,
    publisher,
    image: `${imageBase}digest/${slug}.jpg`,
  }));

  window.MSN_CONTENT = { ads, articles, digest, publishers };
})();
