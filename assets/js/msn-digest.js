(() => {
  const stories = [
    { publisher: "Trailhead", monogram: "T", title: "Five quiet trails worth the early alarm this weekend" },
    { publisher: "Tide Report", monogram: "R", title: "Why coastal towns are redesigning their seawalls" },
    { publisher: "Night Market", monogram: "N", title: "The late-night food scene rewriting city maps" },
    { publisher: "Field Notes", monogram: "F", title: "What a year of rooftop gardens taught one city block" },
    { publisher: "Open Studio", monogram: "O", title: "Inside the small workshops reviving hand-set type" },
  ];
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  document.querySelectorAll(".digest").forEach((digest) => {
    let activeStory = 0;
    let paused = reducedMotion.matches;
    let timer;
    const pauseButtons = [];
    const image = digest.querySelector("[data-digest-image]");

    digest.querySelectorAll(".digest-pagination").forEach((pagination) => {
      const progress = document.createElement("div");
      const button = document.createElement("button");
      progress.className = "digest-progress";
      button.className = "digest-pause";
      button.type = "button";
      pagination.before(progress);
      progress.append(pagination, button);
      pauseButtons.push(button);
      button.addEventListener("click", () => {
        paused = !paused;
        updatePauseButtons();
        resetTimer();
      });
    });

    function updatePauseButtons() {
      pauseButtons.forEach((button) => {
        button.textContent = paused ? "Play" : "Pause";
        button.setAttribute("aria-label", paused ? "Play automatic digest rotation" : "Pause automatic digest rotation");
      });
    }

    function showStory(index) {
      activeStory = (index + stories.length) % stories.length;
      const story = stories[activeStory];
      digest.querySelectorAll(".digest-pagination").forEach((pagination) => {
        pagination.querySelectorAll(".digest-bar").forEach((bar, i) => {
          bar.classList.toggle("is-active", i === activeStory);
        });
      });
      digest.querySelectorAll(".digest-title").forEach((title) => { title.textContent = story.title; });
      digest.querySelectorAll(".digest-publisher").forEach((publisher) => {
        publisher.children[0].textContent = story.monogram;
        publisher.children[1].textContent = story.publisher;
      });
      const imagePath = `../assets/images/msn/digest-${activeStory + 1}.jpg`;
      digest.style.backgroundImage = `linear-gradient(180deg, rgba(40, 37, 35, 0) 0%, rgba(40, 37, 35, .20) 40%, rgba(40, 37, 35, .80) 70%), url("${imagePath}")`;
      if (image) {
        image.style.visibility = "visible";
        image.src = imagePath;
      }
    }

    function resetTimer() {
      clearInterval(timer);
      if (!paused) {
        timer = setInterval(() => {
          if (!document.hidden && digest.isConnected && digest.getClientRects().length && !digest.matches(":hover") && !digest.contains(document.activeElement)) {
            showStory(activeStory + 1);
          }
        }, 5000);
      }
    }

    digest.querySelectorAll("[data-digest-nav]").forEach((button) => {
      button.addEventListener("click", () => {
        showStory(activeStory + Number(button.dataset.digestNav));
        resetTimer();
      });
    });
    digest.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        event.preventDefault();
        showStory(activeStory + (event.key === "ArrowRight" ? 1 : -1));
        resetTimer();
      }
    });
    reducedMotion.addEventListener("change", (event) => {
      if (event.matches) {
        paused = true;
        updatePauseButtons();
        resetTimer();
      }
    });
    updatePauseButtons();
    resetTimer();
  });
})();
