
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

const carousels = {
  recursia: [
    "images/recursia1.png",
    "images/recursia2.png",
    "images/recursia3.png"
  ],
  minecraftMod: [
    "images/zombie_spawn.png",
    "images/mystery_barrel.png"
  ],
  cv: [
    "images/portfolio_landing.png",
    "images/about_section.png"
  ],
  vibeEngine: [
    "images/vibe_graph1.png",
    "images/vibe_trainer_ui.png"
  ]
};

let current = 0;

function showCarousel(key) {
  const images = carousels[key];
  if (!images) return;

  const container = document.getElementById('carousel-container');
  container.innerHTML = `
    <div class="carousel">
      <button onclick="prev('${key}')">◀️</button>
      <img id="carousel-img" src="${images[0]}" style="max-width: 80%; border-radius: 1rem;">
      <button onclick="next('${key}')">▶️</button>
    </div>
    <p style="font-family: monospace;">Viewing: ${key}.model</p>
  `;
  current = 0;
}

function next(key) {
  const imgs = carousels[key];
  current = (current + 1) % imgs.length;
  document.getElementById('carousel-img').src = imgs[current];
}

function prev(key) {
  const imgs = carousels[key];
  current = (current - 1 + imgs.length) % imgs.length;
  document.getElementById('carousel-img').src = imgs[current];
}

document.addEventListener("DOMContentLoaded", () => {
  const folders = document.querySelectorAll(".file-tree li.folder");

  folders.forEach(folder => {
    folder.addEventListener("click", e => {
      e.stopPropagation();

      // find only the *direct child* UL
      const sub = folder.children[0].tagName === "UL" 
        ? folder.children[0] 
        : folder.querySelector("ul");

      if (sub) {
        sub.classList.toggle("open");
      }
    });
  });
});

// make the icon a separate node so we can place it on the right
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.file-tree li.folder, .file-tree li.model-file').forEach(li => {
    // skip if already processed
    if (li.querySelector(':scope > .row')) return;

    const ul = li.querySelector(':scope > ul');           // child list (if any)

    // get the leading text, strip the emoji
    const first = li.firstChild;
    const raw = (first && first.nodeType === 3) ? first.nodeValue : li.textContent;
    const clean = raw.replace(/^\s*[📁📝]\s*/,'').trim();

    // remove the original leading text node so we can rebuild
    if (first && first.nodeType === 3) li.removeChild(first);

    // build: [label][icon]  (icon ends up on the RIGHT via CSS order)
    const row = document.createElement('span'); row.className = 'row';
    const label = document.createElement('span'); label.className = 'label'; label.textContent = clean;
    const icon  = document.createElement('span'); icon.className  = 'icon';
    icon.textContent = li.classList.contains('folder') ? '📁' : '📝';

    // insert before the nested UL (so structure stays intact)
    if (ul) li.insertBefore(row, ul); else li.appendChild(row);
    row.append(label, icon);
  });
});


document.addEventListener("DOMContentLoaded", () => {
  const sparks = document.querySelectorAll(".spark");

  sparks.forEach((spark) => {
    const pathId = spark.getAttribute("data-path");
    const path = document.getElementById(pathId);
    if (!path) return;

    const totalLength = path.getTotalLength();

    function runSpark() {
      let start = Math.random() * totalLength * 0.8;
      let distance = 30 + Math.random() * 80;
      let speed = 2 + Math.random() * 4;
      let traveled = 0;
      spark.style.opacity = 1;

      function animate() {
        if (traveled >= distance) {
          spark.style.opacity = 0;
          setTimeout(runSpark, 500 + Math.random() * 1500);
          return;
        }

        const point = path.getPointAtLength(start + traveled);
        spark.setAttribute("transform", `translate(${point.x}, ${point.y}) scale(1.2)`);

        // ⚡ spawn flying sparks here
        if (Math.random() < 0.05) { // 5% chance per frame
          spawnFlyingSpark(spark.ownerSVGElement, point.x, point.y);
        }

        traveled += speed;
        requestAnimationFrame(animate);
      }

      animate();
    }

    runSpark();
  });
});

document.querySelectorAll('.folder').forEach(folder => {
  folder.addEventListener('click', (e) => {
    // Prevent bubbling to parent folders
    e.stopPropagation();
    folder.classList.toggle('open');
  });
});

function toggleFolder(el) {
  el.classList.toggle("open");
}



function spawnFlyingSpark(svg, startX, startY) {
  const flying = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
  flying.setAttribute("class", "spark");
  flying.setAttribute("points", "0,-3 1.5,-1.5 3,0 1.5,1.5 0,3 -1.5,1.5 -3,0 -1.5,-1.5");
  flying.setAttribute("fill", "#ff33ee");
  flying.setAttribute("filter", "url(#glow)");
  svg.appendChild(flying);

  let fx = startX, fy = startY;
  let lifetime = 0;
  const maxLife = 20; // quick zap ~0.3s

  // initial launch vector
  const angle = Math.random() * Math.PI * 2; // 360°
  const speed = 3 + Math.random() * 3;
  let dx = Math.cos(angle) * speed;
  let dy = Math.sin(angle) * speed;

  const gravity = 0.2; // gentle pull down

  function animateFlying() {
    lifetime++;

    // apply movement + gravity
    fx += dx + (Math.random() - 0.5) * 1.2; // jitter sideways
    dy += gravity; // gravity makes it arc downward
    fy += dy;

    // flicker: random scale + opacity jitter
    const scale = 0.7 + Math.random() * 0.5;
    const opacity = 0.7 + Math.random() * 0.3;

    flying.setAttribute("transform", `translate(${fx},${fy}) scale(${scale})`);
    flying.setAttribute("opacity", opacity);

    if (lifetime < maxLife) {
      requestAnimationFrame(animateFlying);
    } else {
      flying.remove();
    }
  }

  animateFlying();
}


const canvas = document.getElementById("spiral");
const ctx = canvas.getContext("2d");

function drawSpiral() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = "#ff00dd";
  ctx.beginPath();
  let centerX = canvas.width / 2;
  let centerY = canvas.height / 2;
  let a = 1;
  let b = 5; // spacing between loops
  for (let theta = 0; theta < 20 * Math.PI; theta += 0.1) {
    let r = a + b * theta;
    let x = centerX + r * Math.cos(theta);
    let y = centerY + r * Math.sin(theta);
    ctx.lineTo(x, y);
  }
  ctx.stroke();
}
drawSpiral();


// generate spiral path
const path = document.getElementById("spiral");
let a = 2;     // scale
let b = 0.20;  // growth rate
let cx = 400, cy = 400; // center
let points = [];

for (let theta = 0; theta < 12 * Math.PI; theta += 0.1) {
  let r = a * Math.exp(b * theta);
  let x = cx + r * Math.cos(theta);
  let y = cy + r * Math.sin(theta);
  points.push(`${x},${y}`);
}

path.setAttribute("d", "M" + points.join(" L"));




