// Countdown Timer

if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}
const eventDate = new Date("February 19, 2026 10:00:00").getTime();
const countdown = document.getElementById("countdown");

setInterval(() => {
    const now = new Date().getTime();
    const diff = eventDate - now;

    if (diff < 0) {
        countdown.innerHTML = "Event Started!";
        return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const mins = Math.floor((diff / (1000 * 60)) % 60);
    const secs = Math.floor((diff / 1000) % 60);

    countdown.innerHTML = `${days}d ${hours}h ${mins}m ${secs}s`;
}, 1000);

// Registration Form
document.getElementById("registerForm").addEventListener("submit", function(e) {
    e.preventDefault();

    document.getElementById("formMessage").innerText =
        "🎉 Registration Successful! See you at Hackathon2k26!";
    this.reset();
});

// ===== Scroll Reveal for Event Details =====
const eventBox = document.querySelector(".events-placeholder");

window.addEventListener("scroll", () => {
    const triggerPoint = window.innerHeight * 0.8;
    const boxTop = eventBox.getBoundingClientRect().top;

    if (boxTop < triggerPoint) {
        eventBox.classList.add("show");
    }
});

const canvas = document.getElementById("techCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
const particleCount = 100;
const connectionDistance = 150;

class Particle {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 1.5;
        this.vy = (Math.random() - 0.5) * 1.5;
        this.radius = Math.random() * 2 + 1;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        // Bounce off edges
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
        ctx.fill();
    }
}

// Initialize particles
for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < particles.length; i++) {
        let p1 = particles[i];
        p1.update();
        p1.draw();

        for (let j = i + 1; j < particles.length; j++) {
            let p2 = particles[j];
            const dx = p1.x - p2.x;
            const dy = p1.y - p2.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < connectionDistance) {
                ctx.beginPath();
                ctx.strokeStyle = `rgba(255,255,255, ${1 - distance / connectionDistance})`;
                ctx.lineWidth = 3;
                ctx.moveTo(p1.x, p1.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.stroke();
            }
        }
    }
    requestAnimationFrame(animate);
}

animate();


// ===== HAMBURGER MENU TOGGLE =====
const hamburger = document.getElementById("hamburger");
const navLinks = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navLinks.classList.toggle("active");
});
// ===== SCROLL REVEAL (REPEATABLE) =====
const reveals = document.querySelectorAll(
  ".reveal, .reveal-left, .reveal-right, .reveal-scale"
);

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      } else {
        entry.target.classList.remove("active");
      }
    });
  },
  {
    threshold: 0.15,
  }
);

reveals.forEach((el) => observer.observe(el));

// ===== REMOVE CINEMATIC INTRO SAFELY =====
window.addEventListener("load", () => {
  const intro = document.getElementById("cinematic-intro");

  setTimeout(() => {
    intro.remove();
  }, 6500); // after animation + buffer
});
// 1. Define event data
const eventInfo = {
    hackathon: {
        title: "Idea Hackathon",
        rules: ["Must use original ideas.", "2-4 members per team.", "AI tools are permitted for prototyping."],
        coordinators: "John Doe, Sarah Smith",
        contact: "+1 234 567 890"
    },
    codeathon: {
        title: "Rapid Codeathon",
        rules: ["Individual participation.", "Languages: C++, Java, Python only.", "Plagiarism leads to disqualification."],
        coordinators: "Alex Rivera",
        contact: "+1 987 654 321"
    },
    designathon: {
        title: "Design-a-thon",
        rules: ["Figma or Adobe XD only.", "Must provide interactive prototype.", "Focus on UX accessibility."],
        coordinators: "Emily Chen",
        contact: "design.dept@college.edu"
    }
};

// 2. Function to open modal
function openModal(eventId) {
    const modal = document.getElementById("detailsModal");
    const body = document.getElementById("modalBody");
    const data = eventInfo[eventId];

    body.innerHTML = `
        <h3>${data.title}</h3>
        <div class="modal-section">
            <h4>Rules & Regulations</h4>
            <ul>${data.rules.map(rule => `<li>${rule}</li>`).join('')}</ul>
        </div>
        <div class="modal-section">
            <h4>Coordinators</h4>
            <p>${data.coordinators}</p>
        </div>
        <div class="modal-section">
            <h4>Contact</h4>
            <p>${data.contact}</p>
        </div>
    `;

    modal.classList.add("active");
    document.body.style.overflow = "hidden"; // Prevent background scroll
}

// 3. Function to close modal
function closeModal() {
    const modal = document.getElementById("detailsModal");
    modal.classList.remove("active");
    document.body.style.overflow = "auto";
}

// Close on clicking outside the content
window.onclick = function(event) {
    const modal = document.getElementById("detailsModal");
    if (event.target === modal) {
        closeModal();
    }
};
window.addEventListener('resize', () => {
    // Reset canvas dimensions
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Optional: Re-initialize nodes if they disappear on resize
    if(typeof nodes !== 'undefined') {
        nodes.length = 0;
        const newCount = window.innerWidth < 768 ? 40 : 80;
        for(let i=0; i<newCount; i++) nodes.push(new StarNode());
    }
});
