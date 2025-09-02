/*
  Guarantees:
  - Images: stacked & centered, drop to 150px, then split to 20% / 80%.
  - Title: always fully visible, centered, with a strict 7% gap from images.
  - Labels: appear only after the split transition ends.
  - Title typography adapts across screen sizes (size + weight tweaks).
*/
(function () {
  const img1Wrap = document.querySelector('#img1-wrap');
  const img2Wrap = document.querySelector('#img2-wrap');
  const leftLbl  = document.querySelector('#left');
  const rightLbl = document.querySelector('#right');
  const title    = document.querySelector('#hTitle');
  const root     = document.documentElement;
  const css      = root.style;

  // Title text (shown immediately; it will wrap naturally)
  title.textContent = "Welcome to the Portfolio Page of Tom Pikula";

  // 1) Drop both images together (still stacked & centered)
  img1Wrap.style.top = "150px";
  img2Wrap.style.top = "150px";

  // Keep CSS vars in sync with current centers
  css.setProperty('--img-left-center',  "50%");
  css.setProperty('--img-right-center', "50%");

  // 2) After the drop, split to left & right; update CSS vars so the title
  // can enforce the 7% gap using max-width math in CSS.
  const SPLIT_AFTER_MS = 1000;
  const LEFT_CENTER  = "20%";
  const RIGHT_CENTER = "80%";

  setTimeout(() => {
    img1Wrap.style.left = LEFT_CENTER;
    img1Wrap.style.transform = "translateX(-50%)";
    img2Wrap.style.left = RIGHT_CENTER;
    img2Wrap.style.transform = "translateX(-50%)";

    css.setProperty('--img-left-center',  LEFT_CENTER);
    css.setProperty('--img-right-center', RIGHT_CENTER);
  }, SPLIT_AFTER_MS);

  // 3) Labels appear when each wrapper finishes the horizontal transition.
  function onEnd(e){
    if (e.propertyName !== "left") return;
    if (e.currentTarget === img1Wrap) leftLbl.classList.add("show");
    if (e.currentTarget === img2Wrap) rightLbl.classList.add("show");
  }
  img1Wrap.addEventListener("transitionend", onEnd);
  img2Wrap.addEventListener("transitionend", onEnd);

  // 4) Responsive title tuning (size + weight) to keep it readable on all screens.
  function tuneTitle() {
    const w = window.innerWidth;
    // default values set in CSS; we adapt if needed
    let size = "clamp(20px, 2.6vw + 0.2rem, 34px)";
    let weight = 500;

    if (w < 420) {
      size = "clamp(18px, 5vw, 24px)";  // small phones
      weight = 400;
    } else if (w < 768) {
      size = "clamp(19px, 3.6vw, 28px)"; // phones / small tablets
      weight = 500;
    } else if (w > 1400) {
      size = "clamp(22px, 2vw, 36px)";   // large desktops
      weight = 500;
    }

    css.setProperty("--h1-size", size);
    css.setProperty("--h1-weight", weight);
  }
  tuneTitle();
  let raf;
  window.addEventListener("resize", () => {
    if (raf) cancelAnimationFrame(raf);
    raf = requestAnimationFrame(tuneTitle);
  });
})();
