/* =========================================================
   YUTO SHIBATA — PROJECT CASE STUDIES
   Shared animation / navigation JavaScript
   ========================================================= */


/* ---------------------------------------------------------
   1. Scroll-reveal animations
   --------------------------------------------------------- */

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    });
  },
  {
    threshold: 0.12,
  }
);


document
  .querySelectorAll(
    ".reveal, .reveal-left, .reveal-right, .reveal-scale"
  )
  .forEach((element, index) => {
    /*
      Slight stagger so nearby cards do not all animate
      at exactly the same moment.
    */
    element.style.transitionDelay =
      `${Math.min(index % 4, 3) * 140}ms`;

    revealObserver.observe(element);
  });


/* ---------------------------------------------------------
   2. Reverse soccer-ball page transition

   Add class="home-transition" to any link that returns
   to ../index.html or ../index.html#projects.
   --------------------------------------------------------- */

const transitionBall =
  document.querySelector("#transition-ball");


document
  .querySelectorAll(".home-transition")
  .forEach((link) => {
    link.addEventListener("click", (event) => {
      /*
        If reduced motion is enabled, or the ball element
        is missing, navigate normally.
      */
      const reducedMotion =
        window.matchMedia(
          "(prefers-reduced-motion: reduce)"
        ).matches;

      if (reducedMotion || !transitionBall) {
        return;
      }

      event.preventDefault();

      const destination = link.href;

      transitionBall.classList.remove("kick-back");

      /*
        Forces the browser to restart the animation even
        if the user previously triggered it.
      */
      void transitionBall.offsetWidth;

      transitionBall.classList.add("kick-back");

      /*
        The CSS animation lasts 1.4 seconds.
        Navigate after it has had time to finish.
      */
      setTimeout(() => {
        window.location.href = destination;
      }, 1450);
    });
  });
