(() => {
  const stories = window.MSN_CONTENT?.digest;
  if (!Array.isArray(stories) || stories.length !== 5) {
    throw new Error("The shared MSN digest content must contain exactly five stories.");
  }
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

  function createSlide(index, story) {
    const slide = document.createElement("div");
    slide.className = "digest-slide";
    slide.setAttribute("role", "group");
    slide.setAttribute("aria-roledescription", "slide");
    slide.setAttribute("aria-label", `${index + 1} of ${stories.length}`);

    const media = document.createElement("div");
    media.className = "digest-slide-media";
    const image = document.createElement("img");
    image.src = story.image;
    image.alt = story.alt;
    image.onerror = () => { image.style.visibility = "hidden"; };
    media.append(image);
    slide.append(media);
    return slide;
  }

  function createCaption(story, titleTag) {
    const content = document.createElement("div");
    content.className = "digest-caption";
    const publisher = document.createElement("div");
    publisher.className = "digest-publisher";
    publisher.append(
      makeText("span", "digest-monogram", story.publisher.charAt(0)),
      makeText("span", "", story.publisher),
      makeText("span", "", "· 1h"),
    );
    publisher.firstElementChild.setAttribute("aria-hidden", "true");
    const title = makeText(titleTag, "digest-title", story.title);
    content.append(publisher, title);
    return content;
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
    stories.forEach((story, index) => slides.append(createSlide(index, story)));
    const slideNodes = [...slides.children];
    const cloneSlide = (slide) => {
      const clone = slide.cloneNode(true);
      clone.setAttribute("aria-hidden", "true");
      clone.inert = true;
      return clone;
    };
    slides.prepend(cloneSlide(slideNodes[slideNodes.length - 1]));
    slides.append(cloneSlide(slideNodes[0]));
    track.append(slides);
    const caption = createCaption(stories[0], titleTag);
    const publisher = caption.querySelector(".digest-publisher");
    const title = caption.querySelector(".digest-title");

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
    const previous = makePaddle(previousTemplate, -1, "Previous story");
    const next = makePaddle(nextTemplate, 1, "Next story");
    const autoplayToggle = digest.closest(".edge-page")
      ? document.createElement("button")
      : null;
    if (autoplayToggle) {
      autoplayToggle.type = "button";
      autoplayToggle.className = "digest-autoplay-toggle";
      autoplayToggle.setAttribute("aria-label", "Pause stories");
      autoplayToggle.setAttribute("aria-pressed", "false");
      const autoplayIcon = document.createElement("img");
      autoplayIcon.alt = "";
      autoplayIcon.setAttribute("aria-hidden", "true");
      autoplayToggle.append(autoplayIcon);
      transport.append(previous, next, autoplayToggle);
    } else {
      transport.append(previous, next);
    }
    controls.append(pagination, transport);

    digest.classList.add("digest--carousel");
    digest.setAttribute("role", "region");
    digest.setAttribute("aria-roledescription", "carousel");
    digest.setAttribute("aria-label", "Top stories");
    digest.replaceChildren(track, caption, controls);

    let activeStory = 0;
    let trackPosition = 1;
    let hasRenderedCaption = false;
    const automaticPauses = document.hidden ? new Set(["visibility"]) : new Set();
    let manuallyPaused = false;
    let remaining = dwell;
    let startedAt = 0;
    let frame = 0;

    function isPaused() {
      return reducedMotion.matches || automaticPauses.size > 0;
    }

    function renderLiveState() {
      digest.setAttribute("aria-live", isPaused() ? "polite" : "off");
    }

    function renderAutoplayToggle() {
      if (!autoplayToggle) return;
      autoplayToggle.disabled = reducedMotion.matches;
      autoplayToggle.setAttribute("aria-label", manuallyPaused ? "Play stories" : "Pause stories");
      autoplayToggle.setAttribute("aria-pressed", String(manuallyPaused));
      autoplayToggle.querySelector("img").src = manuallyPaused
        ? "../assets/icons/ic_fluent_play_24_filled.svg"
        : "../assets/icons/ic_fluent_pause_32_filled.svg";
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

    function renderCaption() {
      caption.classList.remove("is-changing");
      publisher.children[0].textContent = stories[activeStory].publisher.charAt(0);
      publisher.children[1].textContent = stories[activeStory].publisher;
      title.textContent = stories[activeStory].title;
      if (hasRenderedCaption && !reducedMotion.matches) {
        void caption.offsetWidth;
        caption.classList.add("is-changing");
      }
      hasRenderedCaption = true;
    }

    function positionForStory(nextStory, direction) {
      if (!reducedMotion.matches && direction > 0 && activeStory === stories.length - 1 && nextStory === 0) {
        return stories.length + 1;
      }
      if (!reducedMotion.matches && direction < 0 && activeStory === 0 && nextStory === stories.length - 1) {
        return 0;
      }
      return nextStory + 1;
    }

    function renderStory(position = activeStory + 1) {
      trackPosition = position;
      slides.style.transform = `translateX(-${position * 100}%)`;
      slideNodes.forEach((slide, index) => {
        const active = index === activeStory;
        slide.setAttribute("aria-hidden", String(!active));
        slide.inert = !active;
      });
      renderCaption();
      renderProgress(reducedMotion.matches ? 1 : 0);
    }

    slides.addEventListener("transitionend", (event) => {
      if (event.target !== slides || event.propertyName !== "transform") return;
      if (trackPosition !== 0 && trackPosition !== stories.length + 1) return;

      trackPosition = trackPosition === 0 ? stories.length : 1;
      slides.classList.add("is-instant");
      slides.style.transform = `translateX(-${trackPosition * 100}%)`;
      void slides.offsetWidth;
      slides.classList.remove("is-instant");
    });

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
          const nextStory = (activeStory + 1) % stories.length;
          const position = positionForStory(nextStory, 1);
          activeStory = nextStory;
          remaining = dwell;
          startedAt = now;
          renderStory(position);
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

    function goToStory(index, direction = 0) {
      pauseClock();
      const nextStory = (index + stories.length) % stories.length;
      const position = positionForStory(nextStory, direction);
      activeStory = nextStory;
      remaining = dwell;
      renderStory(position);
      startClock();
    }

    transport.querySelectorAll("[data-digest-nav]").forEach((button) => {
      button.addEventListener("click", () => {
        const direction = Number(button.dataset.digestNav);
        goToStory(activeStory + direction, direction);
      });
    });
    autoplayToggle?.addEventListener("click", () => {
      manuallyPaused = !manuallyPaused;
      if (!manuallyPaused) {
        automaticPauses.delete("pointer");
        automaticPauses.delete("focus");
      }
      if (isPaused()) pauseClock();
      else startClock();
      renderAutoplayToggle();
      renderLiveState();
    });
    bars.forEach((bar, index) => bar.addEventListener("click", () => goToStory(index)));
    digest.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        event.preventDefault();
        const direction = event.key === "ArrowRight" ? 1 : -1;
        goToStory(activeStory + direction, direction);
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
      renderAutoplayToggle();
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
    renderAutoplayToggle();
    renderLiveState();
    startClock();
  }

  document.querySelectorAll(".digest").forEach(initialize);
})();
