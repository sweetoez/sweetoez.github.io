(() => {
  const stories = [
    { publisher: "Trailhead", monogram: "T", title: "Five quiet trails worth the early alarm this weekend" },
    { publisher: "Tide Report", monogram: "R", title: "Why coastal towns are redesigning their seawalls" },
    { publisher: "Night Market", monogram: "N", title: "The late-night food scene rewriting city maps" },
    { publisher: "Field Notes", monogram: "F", title: "What a year of rooftop gardens taught one city block" },
    { publisher: "Open Studio", monogram: "O", title: "Inside the small workshops reviving hand-set type" },
  ];
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  function readDwell(digest) {
    const value = getComputedStyle(digest).getPropertyValue("--digest-dwell").trim();
    const amount = Number.parseFloat(value);
    if (!Number.isFinite(amount) || amount <= 0) {
      throw new Error(`Invalid --digest-dwell value: ${value || "(empty)"}`);
    }
    return value.endsWith("ms") ? amount : amount * 1000;
  }

  function makeText(tag, className, text) {
    const element = document.createElement(tag);
    element.className = className;
    element.textContent = text;
    return element;
  }

  function createSlide(story, index, titleTag) {
    const slide = document.createElement("div");
    slide.className = "digest-slide";
    slide.setAttribute("role", "group");
    slide.setAttribute("aria-roledescription", "slide");
    slide.setAttribute("aria-label", `${index + 1} of ${stories.length}`);

    const media = document.createElement("div");
    media.className = "digest-slide-media";
    const image = document.createElement("img");
    image.className = "digest-slide-image";
    image.src = `../assets/images/msn/digest-${index + 1}.jpg`;
    image.alt = "";
    image.setAttribute("aria-hidden", "true");
    image.onerror = () => { image.hidden = true; };
    media.append(image);

    const content = document.createElement("div");
    content.className = "digest-slide-content";
    const publisher = document.createElement("div");
    publisher.className = "digest-publisher";
    publisher.append(
      makeText("span", "digest-monogram", story.monogram),
      makeText("span", "", story.publisher),
      makeText("span", "", "· 1h"),
    );
    publisher.firstElementChild.setAttribute("aria-hidden", "true");
    const title = makeText(titleTag, "digest-title", story.title);
    content.append(publisher, title);
    slide.append(media, content);
    return slide;
  }

  function makePaddle(template, direction, label) {
    const button = template
      ? template.cloneNode(true)
      : makeText("button", "", label);
    button.type = "button";
    button.dataset.digestNav = String(direction);
    button.setAttribute("aria-label", label);
    button.removeAttribute("disabled");
    return button;
  }

  function initialize(digest) {
    const previousTemplate = digest.querySelector('[data-digest-nav="-1"]');
    const nextTemplate = digest.querySelector('[data-digest-nav="1"]');
    const titleTag = digest.querySelector(".digest-title")?.tagName.toLowerCase() || "h3";
    const dwell = readDwell(digest);
    const slides = document.createElement("div");
    slides.className = "digest-track__slides";
    const track = document.createElement("div");
    track.className = "digest-track";
    stories.forEach((story, index) => slides.append(createSlide(story, index, titleTag)));
    track.append(slides);

    const pagination = document.createElement("div");
    pagination.className = "digest-pagination";
    pagination.setAttribute("role", "group");
    pagination.setAttribute("aria-label", "Choose a story");
    const bars = stories.map((story, index) => {
      const bar = document.createElement("button");
      bar.type = "button";
      bar.className = "digest-bar";
      bar.setAttribute("aria-label", `Show story ${index + 1}`);
      bar.setAttribute("aria-pressed", "false");
      pagination.append(bar);
      return bar;
    });

    const controls = document.createElement("div");
    controls.className = "digest-controls";
    const transport = document.createElement("div");
    transport.className = "digest-transport";
    transport.append(makePaddle(previousTemplate, -1, "Previous story"));
    transport.append(makePaddle(nextTemplate, 1, "Next story"));
    controls.append(pagination, transport);

    digest.classList.add("digest--carousel");
    digest.setAttribute("role", "region");
    digest.setAttribute("aria-roledescription", "carousel");
    digest.setAttribute("aria-label", "Top stories");
    digest.replaceChildren(track, controls);

    const slideNodes = [...slides.children];
    let activeStory = 0;
    const automaticPauses = document.hidden ? new Set(["visibility"]) : new Set();
    let remaining = dwell;
    let startedAt = 0;
    let frame = 0;

    function isPaused() {
      return reducedMotion.matches || automaticPauses.size > 0;
    }

    function renderLiveState() {
      digest.setAttribute("aria-live", isPaused() ? "polite" : "off");
    }

    function renderProgress(progress) {
      bars.forEach((bar, index) => {
        const active = index === activeStory;
        bar.classList.toggle("is-active", active);
        bar.classList.toggle("is-complete", !reducedMotion.matches && index < activeStory);
        bar.setAttribute("aria-pressed", String(active));
        bar.style.setProperty("--digest-progress", String(active ? progress : 0));
      });
    }

    function renderStory() {
      slides.style.transform = `translateX(-${activeStory * 100}%)`;
      slideNodes.forEach((slide, index) => {
        const active = index === activeStory;
        slide.setAttribute("aria-hidden", String(!active));
        slide.inert = !active;
      });
      renderProgress(reducedMotion.matches ? 1 : 0);
    }

    function pauseClock() {
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
      if (startedAt) {
        remaining = Math.max(0, remaining - (performance.now() - startedAt));
        startedAt = 0;
      }
    }

    function startClock() {
      if (isPaused() || startedAt) return;
      if (remaining <= 0) remaining = dwell;
      startedAt = performance.now();

      function tick(now) {
        if (isPaused()) {
          pauseClock();
          return;
        }

        const elapsed = now - startedAt;
        if (elapsed >= remaining) {
          activeStory = (activeStory + 1) % stories.length;
          remaining = dwell;
          startedAt = now;
          renderStory();
        } else {
          renderProgress(1 - (remaining - elapsed) / dwell);
        }
        frame = requestAnimationFrame(tick);
      }

      frame = requestAnimationFrame(tick);
    }

    function setAutomaticPause(reason, paused) {
      const wasPaused = isPaused();
      if (paused) automaticPauses.add(reason);
      else automaticPauses.delete(reason);
      const nowPaused = isPaused();
      if (!wasPaused && nowPaused) pauseClock();
      if (wasPaused && !nowPaused) startClock();
      renderLiveState();
    }

    function goToStory(index) {
      pauseClock();
      activeStory = (index + stories.length) % stories.length;
      remaining = dwell;
      renderStory();
      startClock();
    }

    transport.querySelectorAll("[data-digest-nav]").forEach((button) => {
      button.addEventListener("click", () => {
        goToStory(activeStory + Number(button.dataset.digestNav));
      });
    });
    bars.forEach((bar, index) => bar.addEventListener("click", () => goToStory(index)));
    digest.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        event.preventDefault();
        goToStory(activeStory + (event.key === "ArrowRight" ? 1 : -1));
      }
    });

    digest.addEventListener("pointerenter", () => setAutomaticPause("pointer", true));
    digest.addEventListener("pointerleave", () => setAutomaticPause("pointer", false));
    digest.addEventListener("focusin", () => setAutomaticPause("focus", true));
    digest.addEventListener("focusout", (event) => {
      if (!event.relatedTarget || !digest.contains(event.relatedTarget)) {
        setAutomaticPause("focus", false);
      }
    });
    document.addEventListener("visibilitychange", () => setAutomaticPause("visibility", document.hidden));
    reducedMotion.addEventListener("change", (event) => {
      if (event.matches) {
        pauseClock();
        renderStory();
      } else {
        renderProgress(1 - remaining / dwell);
        startClock();
      }
      renderLiveState();
    });

    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver((entries) => {
        const entry = entries[0];
        setAutomaticPause("visibility-ratio", !entry.isIntersecting || entry.intersectionRatio < 0.5);
      }, { threshold: [0, 0.5] });
      observer.observe(digest);
    }

    renderStory();
    renderLiveState();
    startClock();
  }

  document.querySelectorAll(".digest").forEach(initialize);
})();
