(function () {
  const params = new URLSearchParams(location.search);
  if (!params.has("spec")) return;

  const check = () => {
    const mobile = document.querySelector("bing-serp")?.getAttribute("platform") === "mobile";
    const names = mobile
      ? ["m-rich", "m-people", "m-plain", "m-news", "m-related", "m-footer"]
      : ["d-rich", "d-people", "d-plain", "d-news", "d-extra", "d-related"];
    const results = names.map(name => {
      const node = document.querySelector(`[data-spec="${name}"]`);
      const rect = node?.getBoundingClientRect();
      const style = node ? getComputedStyle(node) : null;
      return {
        spec: name,
        present: Boolean(node),
        width: rect ? Math.round(rect.width) : 0,
        height: rect ? Math.round(rect.height) : 0,
        display: style?.display || "",
        pass: Boolean(node && rect.width > 0 && rect.height > 0)
      };
    });
    console.table(results);
    window.BING_SPEC_RESULTS = results;
    return results.some(result => result.present);
  };
  window.addEventListener("bing:rendered", check);
  if (!check()) {
    const timer = window.setInterval(() => {
      if (check()) window.clearInterval(timer);
    }, 100);
    window.setTimeout(() => window.clearInterval(timer), 5000);
  }
})();
