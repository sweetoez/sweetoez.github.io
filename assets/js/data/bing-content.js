(function () {
  function slugify(value) {
    return String(value).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  }

  function entityName(entity) {
    return window.KC_ENTITIES?.[entity]?.desktop?.hero?.title
      || window.KC_ENTITIES?.[entity]?.mobile?.hero?.title
      || entity;
  }

  function description(entity, name) {
    const value = window.KC_ENTITIES?.[entity]?.desktop?.description
      || window.KC_ENTITIES?.[entity]?.mobile?.description;
    return value && !value.toLowerCase().includes("lorem ipsum")
      ? value
      : `Everything to know about ${name}: background, milestones, notable facts and related topics, gathered in one place.`;
  }

  window.BING_CONTENT = {
    forEntity(entity) {
      const name = entityName(entity);
      const slug = slugify(name);
      const questions = [
        `What is ${name} known for?`,
        `How did ${name} get started?`,
        `Where is ${name} located?`,
        `Why is ${name} so popular?`
      ];
      return {
        name,
        slug,
        description: description(entity, name),
        richTitle: `${name}: overview, history and key facts`,
        date: "Oct 26, 2018",
        tabs: [
          {
            id: "overview",
            label: "Overview",
            links: [
              [`${name} at a glance`, "relecloud.com"],
              [`Key facts about ${name}`, "treyresearch.net"],
              [`${name}: frequently asked questions`, "litwareinc.com"]
            ]
          },
          {
            id: "history",
            label: "History",
            links: [
              [`The history of ${name}`, "lucernepublishing.com"],
              [`${name} timeline: major milestones`, "proseware.com"],
              [`How ${name} began`, "fabrikam.com"]
            ]
          },
          {
            id: "geography",
            label: "Geography",
            links: [
              [`Where is ${name}? Map and location guide`, "margiestravel.com"],
              [`${name} around the world`, "wideworldimporters.com"],
              [`Places connected to ${name}`, "alpineskihouse.com"]
            ]
          }
        ],
        questions,
        plainResults: [
          [`${name}: a complete guide`, "Fabrikam", "fabrikam.com", `A practical guide to ${name}, covering the essentials, common questions and where to learn more.`],
          [`10 things to know about ${name}`, "Northwind Traders", "northwindtraders.com", `From well-known highlights to lesser-known details, these are the facts worth knowing about ${name}.`],
          [`${name}, explained in five minutes`, "Proseware", "proseware.com", `A quick, plain-language explainer on ${name} and why it matters.`],
          [`${name}: photos, videos and stories`, "Adventure Works", "adventure-works.com", `Browse photos, short videos and stories about ${name}.`]
        ],
        extraResults: [
          [`${name}: key dates and milestones`, "Relecloud", "relecloud.com", `A year-by-year look at the moments that defined ${name}.`],
          [`Understanding ${name}: a beginner's guide`, "Litware", "litwareinc.com", `New to ${name}? Start here for a clear introduction and the basics.`],
          [`${name} by the numbers`, "Woodgrove", "woodgrovebank.com", `Quick figures that put ${name} in context.`],
          [`Common questions about ${name}, answered`, "Contoso", "contoso.com", `Short answers to the questions people ask most about ${name}.`],
          [`${name}: then and now`, "Fourth Coffee", "fourthcoffee.com", `How ${name} has changed over time, side by side.`],
          [`Books, courses and resources on ${name}`, "Lucerne Publishing", "lucernepublishing.com", `Where to keep learning about ${name}.`],
          [`Related topics to explore after ${name}`, "Alpine Ski House", "alpineskihouse.com", `Ideas for what to read next if you're interested in ${name}.`],
          [`${name}: myths and misconceptions`, "Wingtip Toys", "wingtiptoys.com", `Separating popular myths from facts about ${name}.`]
        ],
        news: [
          ["Contoso News", "1d", `A closer look at ${name} and what makes it stand out`],
          ["Fabrikam Daily", "3h", `Five lesser-known facts about ${name}`],
          ["Northwind Herald", "2d", `Why ${name} keeps drawing attention`],
          ["Woodgrove Journal", "4d", `${name} through the years, in pictures`]
        ],
        newsTopics: ["Top stories", "History", "Science", "Culture"],
        related: [
          `${name} history`, `${name} facts`, `${name} photos`, `${name} map`,
          `${name} timeline`, `${name} news`, `what is ${name}`, `${name} near me`
        ]
      };
    }
  };
})();
