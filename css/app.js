/*
  Preserves your original animation (drop, then split) while making the site responsive.
  We also keep labels centered beneath their images by moving each image+label as a unit.
*/
(function () {
  const img1Wrap = document.querySelector('#img1-wrap');
  const img2Wrap = document.querySelector('#img2-wrap');
  const title    = document.querySelector('#hTitle');
  const leftLbl  = document.querySelector('#left');
  const rightLbl = document.querySelector('#right');

  // Set label and title text (kept from your original timing)
  setTimeout(() => { leftLbl.textContent  = "left";  }, 2000);
  setTimeout(() => { rightLbl.textContent = "right"; }, 2000);
  setTimeout(() => {
    title.textContent = "Welcome to the Portfolio Page of Tom Pikula";
  }, 2000);

  // ---- Drop both wrappers (images + labels together) ----
  img1Wrap.style.top = "150px";
  img2Wrap.style.top = "150px";

  // ---- Then split left/right ----
  setTimeout(() => {
    img1Wrap.style.left = "15%";
    img1Wrap.style.transform = "translateX(-50%)";
    img2Wrap.style.left = "85%";
    img2Wrap.style.transform = "translateX(-50%)";
  }, 1000); // matches CSS transition time

  // ---- Responsive H1 sizing & row clamp (adapts to screen width) ----
  function setTitleMetrics() {
    const w = window.innerWidth;
    let size, rows;
    if (w < 500) {                   // phones
      size = "clamp(22px, 6vw, 28px)";
      rows = 3;
    } else if (w < 900) {            // small tablets & laptops
      size = "clamp(28px, 4.8vw, 40px)";
      rows = 2;
    } else {                         // desktops
      size = "clamp(36px, 3.2vw, 56px)";
      rows = 1;
    }
    document.documentElement.style.setProperty("--h1-size", size);
    document.documentElement.style.setProperty("--h1-rows", rows);
  }
  setTitleMetrics();

  // Debounce with rAF for smooth resizing
  let raf;
  window.addEventListener("resize", () => {
    if (raf) cancelAnimationFrame(raf);
    raf = requestAnimationFrame(setTitleMetrics);
  });
})();
