// ======================================
// Ylsoo Corporation — Scroll Timeline
// ======================================
document.addEventListener("DOMContentLoaded", () => {
  console.log("Ylsoo Corporation site loaded.");

  const timelineImg = document.getElementById("timeline-img");
  const yearSections = document.querySelectorAll(".year-section");

  if (timelineImg && yearSections.length > 0) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const newImg = entry.target.dataset.img;
            timelineImg.style.opacity = 0;
            setTimeout(() => {
              timelineImg.src = newImg;
              timelineImg.style.opacity = 1;
            }, 200);
          }
        });
      },
      {
        threshold: 0.5,
      }
    );

    yearSections.forEach((section) => observer.observe(section));
  }
});
