(() => {
  const stories = [
    { publisher: "Trailhead", monogram: "T", title: "Five quiet trails worth the early alarm this weekend" },
    { publisher: "Tide Report", monogram: "R", title: "Why coastal towns are redesigning their seawalls" },
    { publisher: "Night Market", monogram: "N", title: "The late-night food scene rewriting city maps" },
    { publisher: "Field Notes", monogram: "F", title: "What a year of rooftop gardens taught one city block" },
    { publisher: "Open Studio", monogram: "O", title: "Inside the small workshops reviving hand-set type" },
  ];
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const controlIcons = {
    pause: "M3.75 2C2.7835 2 2 2.7835 2 3.75V12.25C2 13.2165 2.7835 14 3.75 14H5.25C6.2165 14 7 13.2165 7 12.25V3.75C7 2.7835 6.2165 2 5.25 2H3.75ZM3 3.75C3 3.33579 3.33579 3 3.75 3H5.25C5.66421 3 6 3.33579 6 3.75V12.25C6 12.6642 5.66421 13 5.25 13H3.75C3.33579 13 3 12.6642 3 12.25V3.75ZM10.75 2C9.7835 2 9 2.7835 9 3.75V12.25C9 13.2165 9.7835 14 10.75 14H12.25C13.2165 14 14 13.2165 14 12.25V3.75C14 2.7835 13.2165 2 12.25 2H10.75ZM10 3.75C10 3.33579 10.3358 3 10.75 3H12.25C12.6642 3 13 3.33579 13 3.75V12.25C13 12.6642 12.6642 13 12.25 13H10.75C10.3358 13 10 12.6642 10 12.25V3.75Z",
    play: "M5.74514 3.06445C5.41183 2.87696 5 3.11781 5 3.50023V12.5005C5 12.8829 5.41182 13.1238 5.74512 12.9363L13.7454 8.43631C14.0852 8.24517 14.0852 7.75589 13.7454 7.56474L5.74514 3.06445ZM4 3.50023C4 2.35298 5.2355 1.63041 6.23541 2.19288L14.2357 6.69317C15.2551 7.26664 15.2551 8.73446 14.2356 9.3079L6.23537 13.8079C5.23546 14.3703 4 13.6477 4 12.5005V3.50023Z",
  };

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

  function makeControlIcon(name) {
    const icon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    icon.setAttribute("width", "16");
    icon.setAttribute("height", "16");
    icon.setAttribute("viewBox", "0 0 16 16");
    icon.setAttribute("fill", "none");
    icon.setAttribute("aria-hidden", "true");
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", controlIcons[name]);
    path.setAttribute("fill", "currentColor");
    icon.append(path);
    return icon;
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
    const pauseButton = document.createElement("button");
    pauseButton.type = "button";
    pauseButton.className = "digest-pause";
    pauseButton.setAttribute("aria-label", "Pause stories");
    pauseButton.setAttribute("aria-pressed", "false");
    pauseButton.append(makeControlIcon("pause"));
    transport.append(
      pauseButton,
      makePaddle(previousTemplate, -1, "Previous story"),
      makePaddle(nextTemplate, 1, "Next story"),
    );
    controls.append(pagination, transport);

    digest.classList.add("digest--carousel");
    digest.setAttribute("role", "region");
    digest.setAttribute("aria-roledescription", "carousel");
    digest.setAttribute("aria-label", "Top stories");
    digest.replaceChildren(track, controls);

    const slideNodes = [...slides.children];
    let activeStory = 0;
    let userPaused = reducedMotion.matches;
    const automaticPauses = document.hidden ? new Set(["visibility"]) : new Set();
    let remaining = dwell;
    let startedAt = 0;
    let frame = 0;

    function isPaused() {
      return userPaused || automaticPauses.size > 0;
    }

    function renderPauseState() {
      const paused = isPaused();
      pauseButton.setAttribute("aria-label", paused ? "Play stories" : "Pause stories");
      pauseButton.setAttribute("aria-pressed", String(userPaused));
      pauseButton.replaceChildren(makeControlIcon(paused ? "play" : "pause"));
      digest.setAttribute("aria-live", paused ? "polite" : "off");
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
      renderPauseState();
    }

    function goToStory(index) {
      pauseClock();
      activeStory = (index + stories.length) % stories.length;
      remaining = dwell;
      renderStory();
      startClock();
    }

    pauseButton.addEventListener("click", () => {
      userPaused = !userPaused;
      if (isPaused()) pauseClock();
      else startClock();
      renderPauseState();
    });

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
        userPaused = true;
        pauseClock();
        renderStory();
      } else {
        renderProgress(1 - remaining / dwell);
      }
      renderPauseState();
    });

    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver((entries) => {
        const entry = entries[0];
        setAutomaticPause("visibility-ratio", !entry.isIntersecting || entry.intersectionRatio < 0.5);
      }, { threshold: [0, 0.5] });
      observer.observe(digest);
    }

    renderStory();
    renderPauseState();
    startClock();
  }

  document.querySelectorAll(".digest").forEach(initialize);
})();
