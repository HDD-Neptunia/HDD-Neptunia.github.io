
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.section-title').forEach(title => {
      title.addEventListener('click', () => {
        title.nextElementSibling.classList.toggle('open');
      });
    });
  }); 


  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.portion-title').forEach(title => {
      title.addEventListener('click', () => {
        title.nextElementSibling.classList.toggle('open');
      });
    });
  });

document.addEventListener("DOMContentLoaded", () => {
  const cursor = document.querySelector(".cursor-glow");
  let x = 0, y = 0;

  // track mouse position
  document.addEventListener("mousemove", (e) => {
    x = e.clientX;
    y = e.clientY;
  });

  // smooth follow loop
  function animate() {
    cursor.style.left = `${x}px`;
    cursor.style.top = `${y}px`;
    requestAnimationFrame(animate);
  }
  animate();

  // hover effects for clickable stuff
  document.querySelectorAll("a, button, .section-title").forEach(el => {
    el.addEventListener("mouseenter", () => {
      cursor.style.background = "#00ffcc";
      cursor.style.boxShadow =
        "0 0 10px #00ffcc, 0 0 30px #00ffcc, 0 0 50px #00ffcc";
      cursor.style.transform = "translate(-50%, -50%) scale(1.5)";
    });
    el.addEventListener("mouseleave", () => {
      cursor.style.background = "#ff00dd";
      cursor.style.boxShadow =
        "0 0 10px #ff00dd, 0 0 30px #ff00dd, 0 0 50px #ff00dd";
      cursor.style.transform = "translate(-50%, -50%) scale(1)";
    });
  });
  document.addEventListener("click", (e) => {
    const wave = document.createElement("div");
    wave.classList.add("click-shockwave");
    wave.style.left = `${e.clientX}px`;
    wave.style.top = `${e.clientY}px`;
    document.body.appendChild(wave);

    // remove after animation
    wave.addEventListener("animationend", () => {
      wave.remove();
    });
  });

});
