<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import siteLogo from "./assets/logo/atschen_dev_logo.png";
import profilePicture from "./assets/github/profile_picture.png";
import screenSaverPreviewOne from "./assets/project_previews/screensaver1.png";
import screenSaverPreviewTwo from "./assets/project_previews/screensaver2.png";
import roadGuardPreview from "./assets/project_previews/roadguard.png";
import icefishLoop from "./assets/background/fish/Animated Antarctic Icefish Swimming Loop-2.gif";
import icefishCycle from "./assets/background/fish/Animated Antarctic Icefish Swimming Cycle-1.gif";
import antarcticFish from "./assets/background/fish/Animated Antarctic Fish Swim Cycle-3.gif";
import rippedPaper from "./assets/background/fieldnotes/ripped paper sheet.png";
import tapeStrip from "./assets/background/fieldnotes/tape strip.png";
import antarcticaMap from "./assets/background/fieldnotes/antartica map.png";
import stackedPaper from "./assets/background/fieldnotes/stackedripedpapersheets.svg";
import tapeTwo from "./assets/background/fieldnotes/tape2.png";
import tapeThree from "./assets/background/fieldnotes/tape3.png";
import corkboard from "./assets/background/fieldnotes/corkboard.svg";
import tack from "./assets/background/fieldnotes/tack.png";
import swimmingPenguinOne from "./assets/background/penguins/swimmingpenguin1.gif";
import swimmingPenguinTwo from "./assets/background/penguins/swimmingpegnuin2.gif";
import swimmingPenguinThree from "./assets/background/penguins/swimmingpenguin3.gif";
import standingPenguin from "./assets/background/penguins/standing penguin.svg";

const swimmingPenguins = [swimmingPenguinOne, swimmingPenguinTwo, swimmingPenguinThree];

const fishSchools = [
  { image: icefishLoop, depth: "1150px", size: "100px", duration: "58s", delay: "-18s", reverse: false },
  { image: icefishCycle, depth: "1950px", size: "76px", duration: "72s", delay: "-44s", reverse: true },
  { image: antarcticFish, depth: "2850px", size: "90px", duration: "64s", delay: "-9s", reverse: false },
  { image: icefishLoop, depth: "3650px", size: "60px", duration: "84s", delay: "-53s", reverse: true },
];

const menuOpen = ref(false);
const activeSection = ref("home");
const sending = ref(false);
const status = ref("");
const form = ref({ name: "", email: "", message: "" });
const projects = ref([]);
const visualMode = ref("expedition");
const selectedExperience = ref(0);
const experienceMarkers = [
  { x: 300, y: 135 },
  { x: 365, y: 245 },
  { x: 250, y: 340 },
  { x: 160, y: 230 },
];
const scrollProgress = ref(0);

const navItems = [
  { id: "about", label: "about" },
  { id: "technologies", label: "toolkit" },
  { id: "experience", label: "experience" },
  { id: "projects", label: "projects" },
];

const technologyCategories = [
  "All",
  "Languages",
  "Frameworks",
  "Data & AI",
  "Tools",
];

const selectedCategory = ref("All");
const profileImage = profilePicture;
const pageLogo = siteLogo;

const projectPreviewImages = {
  RoadGuard: [roadGuardPreview],
  "Screen Saver": [screenSaverPreviewOne, screenSaverPreviewTwo],
};

const technologies = [
  {
    name: "Python",
    category: "Languages",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  },
  {
    name: "JavaScript",
    category: "Languages",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  },
  {
    name: "TypeScript",
    category: "Languages",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
  },
  {
    name: "Rust",
    category: "Languages",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rust/rust-original.svg",
  },
  {
    name: "C / C++",
    category: "Languages",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg",
  },
  {
    name: "Java",
    category: "Languages",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
  },
  {
    name: "Kotlin",
    category: "Languages",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg",
  },
  {
    name: "Vue.js",
    category: "Frameworks",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg",
  },
  {
    name: "React",
    category: "Frameworks",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  },
  {
    name: "Astro",
    category: "Frameworks",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/astro/astro-original.svg",
  },
  {
    name: "Jupyter",
    category: "Data & AI",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jupyter/jupyter-original.svg",
  },
  {
    name: "Git",
    category: "Tools",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
  },
  {
    name: "GitHub",
    category: "Tools",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
  },
  {
    name: "OpenMP",
    category: "Tools",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg",
  },
];

const filteredTechnologies = () =>
  selectedCategory.value === "All"
    ? technologies
    : technologies.filter(
        (technology) => technology.category === selectedCategory.value,
      );

const fallbackProjects = [
  {
    title: "RoadGuard",
    type: "Python / computer vision",
    tags: ["Python", "Computer Vision", "AI"],
    description:
      "A computer vision and artificial intelligence project focused on road safety.",
    url: "https://github.com/tsc221645/roadguard",
  },
  {
    title: "PredictGuard",
    type: "Python / deep learning",
    tags: ["Python", "Deep Learning", "Computer Vision"],
    description:
      "A deep learning project focused on predictive analysis and intelligent systems.",
    url: "https://github.com/tsc221645/deep_learning_proyecto_final",
  },
  {
    title: "Screen Saver",
    type: "Creative coding",
    tags: ["Python", "Pygame", "Pixel Art"],
    description:
      "A pixel-art visual experience with seasonal scenes, animated details, and a playful atmosphere.",
    url: "https://github.com/Cisco890/proyecto1_paralelas",
  },
  {
    title: "ASL using CPU and CUDA",
    type: "Python / parallel computing",
    tags: ["Python", "Parallel Computing", "CUDA"],
    description:
      "A parallel computing project focused on algorithms, performance, and accelerated execution.",
    url: "https://github.com/tsc221645/paralela_proyecto_3",
  },
];

let observer;

const experiences = [
  {
    role: "Quality Assurance Tester and Software Developer",
    company: "Pulster.ai by Argus",
    period: "Jun 2025 – Present",
    arrangement: "Part-time · Hybrid",
    details: [
      "Develop end-to-end automated tests with Cypress, covering login with 2FA, dashboards, and data validation.",
      "Design and execute test cases for interactive maps, filters, and dynamic layers.",
      "Conduct exploratory testing for functionality, usability, and performance, and document and track bugs.",
      "Developed a Lead Finder pipeline finding up to 700% more leads than the traditional tool for LATAM.",
    ],
    tags: ["Cypress", "JavaScript", "Test Automation"],
  },
  {
    role: "Information Technology Assistant",
    company: "Prodin",
    period: "Jan 2024 – Present",
    arrangement: "Part-time · Remote",
    details: [
      "Administer database and file backups, update and maintain systems, manage network infrastructure, and build computers.",
    ],
    tags: ["Database Administration", "Backup & Restore", "Networking"],
  },
  {
    role: "Computer Engineer",
    company: "Pulster.ai by Argus",
    period: "Dec 2024 – Jan 2025",
    arrangement: "Internship · Hybrid",
    details: [
      "Developed technologies to support data collection for points of interest.",
      "Researched and collected demographic data across Central America.",
      "Worked with ArcGIS and QGIS geoprocessing tools and developed and trained machine learning models for building recognition.",
    ],
    tags: ["Python", "ArcGIS", "QGIS", "Machine Learning"],
  },
  {
    role: "Computer Engineer",
    company: "Bitmec",
    period: "Nov 2022 – Jan 2023",
    arrangement: "Internship · On-site",
    details: [
      "Maintained and modified the company website, including layout updates, content deployment, and front-end enhancements.",
      "Ensured website reliability, responsiveness, and alignment with business objectives.",
    ],
    tags: ["JavaScript", "HTML", "Web Development"],
  },
];

function updateScrollProgress() {
  const entries = document.querySelectorAll(".timeline-entry");
  let closest = Infinity;
  entries.forEach((entry, index) => {
    const distance = Math.abs(entry.getBoundingClientRect().top - window.innerHeight * 0.3);
    if (distance < closest) {
      closest = distance;
      selectedExperience.value = index;
    }
  });
  const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
  scrollProgress.value = scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0;
  document.documentElement.style.setProperty(
    "--scroll-progress",
    scrollProgress.value.toFixed(3),
  );
}

function selectExperience(index) {
  selectedExperience.value = index;
  document.getElementById("career-station-" + index)?.scrollIntoView({
    behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
    block: "center",
  });
}

function getProjectPreview(project) {
  return projectPreviewImages[project.title] || [];
}

function setVisualMode(mode) {
  visualMode.value = mode;
  window.localStorage.setItem("portfolio-visual-mode", mode);
}

async function loadProjects() {
  try {
    const response = await fetch("/api/projects");
    const data = response.ok ? await response.json() : fallbackProjects;
    const oldMocks = [
      "Flow state",
      "Casa Clara",
      "Objetos con historia",
      "Modo lectura",
    ];
    projects.value = data.some((project) => oldMocks.includes(project.title))
      ? fallbackProjects
      : data;
  } catch {
    projects.value = fallbackProjects;
  }
}

async function sendMessage() {
  sending.value = true;
  status.value = "";

  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form.value),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error);
    status.value = "Message received. I will get back to you soon.";
    form.value = { name: "", email: "", message: "" };
  } catch {
    status.value = "Something went wrong. Please email me directly.";
  } finally {
    sending.value = false;
  }
}

onMounted(() => {
  const storedMode = window.localStorage.getItem("portfolio-visual-mode");
  if (storedMode === "expedition" || storedMode === "fieldnotes") {
    visualMode.value = storedMode;
  }

  document.title = "Ana Laura Tschen Moscoso · Full-Stack Developer";
  loadProjects();

  observer = new IntersectionObserver(
    (entries) =>
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          if (entry.target.id) activeSection.value = entry.target.id;
        }
      }),
    { threshold: 0.18 },
  );

  document
    .querySelectorAll(".reveal")
    .forEach((element) => observer.observe(element));

  updateScrollProgress();
  window.addEventListener("scroll", updateScrollProgress, { passive: true });
});

onUnmounted(() => {
  observer?.disconnect();
  window.removeEventListener("scroll", updateScrollProgress);
});
</script>

<template>
  <div class="portfolio-shell" :data-mode="visualMode" :style="{ '--stacked-paper': 'url(' + stackedPaper + ')', '--ripped-paper': 'url(' + rippedPaper + ')', '--tape-strip': 'url(' + tapeStrip + ')' }">
    <header class="site-header">
      <nav class="nav" aria-label="Main navigation">
        <a class="brand" href="#home" @click="menuOpen = false">
          <img class="brand-logo" :src="pageLogo" alt="Atschen Dev logo" />
          <span>ana tschen<span class="dot">.</span>dev</span>
        </a>

        <button
          class="menu-toggle"
          type="button"
          @click="menuOpen = !menuOpen"
          aria-label="Open navigation"
          :aria-expanded="menuOpen"
        >
          <span></span>
          <span></span>
        </button>

        <div class="nav-links" :class="{ open: menuOpen }">
          <a
            v-for="item in navItems"
            :key="item.id"
            :href="`#${item.id}`"
            :class="{ active: activeSection === item.id }"
            @click="menuOpen = false"
          >
            {{ item.label }}
          </a>

          <div class="mode-switch" aria-label="Portfolio visual mode">
            <button
              type="button"
              :class="{ selected: visualMode === 'expedition' }"
              :aria-pressed="visualMode === 'expedition'"
              @click="setVisualMode('expedition')"
            >
              expedition
            </button>
            <button
              type="button"
              :class="{ selected: visualMode === 'fieldnotes' }"
              :aria-pressed="visualMode === 'fieldnotes'"
              @click="setVisualMode('fieldnotes')"
            >
              field notes
            </button>
          </div>

          <a class="nav-cta" href="#contact" @click="menuOpen = false">
            let's talk
          </a>
        </div>
      </nav>
    </header>

    <main>
      <div class="antarctic-scene" aria-hidden="true">
        <div class="scene-sky"></div>
        <div class="scene-sun"></div>
        <div class="scene-aurora"></div>
        <div class="scene-standing-penguin">
          <img :src="standingPenguin" alt="" />
        </div>
        <div class="scene-iceberg-surface"></div>
        <div class="scene-iceberg-submerged"></div>
        <div class="scene-ice-shelf"></div>
        <div class="scene-horizon"></div>
        <div class="scene-water"></div>
        <div class="scene-light-rays"></div>
        <div v-for="(penguin, index) in swimmingPenguins" :key="penguin" class="swimming-penguin" :class="{ 'swimming-penguin-reverse': index === 1 }" :style="{ '--penguin-depth': (1500 + index * 1050) + 'px', '--penguin-delay': (-index * 19 - 12) + 's' }">
          <img :src="penguin" alt="" loading="lazy" decoding="async" />
        </div>
        <div
          v-for="(school, schoolIndex) in fishSchools"
          :key="schoolIndex"
          class="fish-school"
          :class="{ 'fish-school-reverse': school.reverse }"
          :style="{
            '--school-depth': school.depth,
            '--fish-size': school.size,
            '--swim-duration': school.duration,
            '--swim-delay': school.delay,
          }"
        >
          <img
            v-for="fish in 5"
            :key="fish"
            :src="school.image"
            alt=""
            loading="lazy"
            decoding="async"
            draggable="false"
          />
        </div>
        <div class="scene-bubbles"><i></i><i></i><i></i><i></i><i></i></div>
      </div>

      <section id="home" class="section hero">
        <div class="hero-copy reveal visible">
            <h1>Building from the edge of the <em>map.</em></h1>
            <p>
              I build thoughtful digital products with clear interfaces, useful APIs,
              and the kind of details that make complex systems feel calm.
            </p>

          <div class="hero-actions">
            <a class="button primary" href="#projects">view projects</a>
            <a class="button ghost" href="#about">about me</a>
          </div>
        </div>

        <div class="hero-art reveal visible">
          <div class="expedition-visual" aria-label="Antarctic expedition scene">

            <div class="code-card">
              <div class="window-bar"><i></i><i></i><i></i></div>
              <code><span class="pink">const</span> <span class="yellow">developer</span> = {<br />&nbsp;&nbsp;stack: <span class="blue">"vue + node"</span>,<br />&nbsp;&nbsp;focus: <span class="blue">"digital products"</span>,<br />&nbsp;&nbsp;alwaysLearning: <span class="yellow">true</span><br />};</code>
            </div>
            <div class="floating-note">
              <b>currently</b>
              mapping ideas into useful software.
            </div>
          </div>

          <div class="field-notes-visual" aria-label="Field notes project collage">
            <div class="field-grid"></div>
            <div class="field-journal">
              <h3>Notes from<br />the edge.</h3>
              <p>Interfaces, systems, and small observations collected along the way.</p>
            </div>
            <div class="field-note-card">
              <strong>Good work leaves a trail.</strong>
              <small>code / collect / refine</small>
            </div>
            <div class="ice-map">
              <span></span><span></span><span></span>
              <b>route / 04</b>
            </div>
            <div class="penguin penguin-field" aria-hidden="true">
              <img class="standing-penguin" :src="standingPenguin" alt="" />
            </div>
          </div>
        </div>
      </section>

      <section id="about" class="section reveal">
        <div class="section-heading">
          <div>
            <h2>About<br />me.</h2>
          </div>
        </div>

        <div class="about-grid">
          <p class="about-lead">
            I care about what happens behind the screen.
          </p>
          <div class="about-text">
            <div class="profile-card">
              <img :src="profileImage" alt="Ana Laura Tschen Moscoso" />
              <div>
                <strong>Ana Laura Tschen Moscoso</strong>
                <span>@tsc221645 · GitHub</span>
              </div>
            </div>
            <p>
              I'm interested in how software works beyond the interface: how systems communicate, 
              how data moves, and how everything comes together.
            </p>
            <p>
              I enjoy working with different technologies, exploring software architecture, 
              and understanding the decisions that make applications reliable and maintainable.
            </p>
            <div class="signature">— Ana Laura</div>
          </div>
        </div>
      </section>

      <section id="technologies" class="section reveal" :style="{ '--corkboard': 'url(' + corkboard + ')', '--tack': 'url(' + tack + ')' }">
        <div class="section-heading">
          <div>
            <h2>My toolkit.</h2>
            <p class="toolkit-description">The languages and tools behind my work.</p>
          </div>
        </div>

        <div class="tech-filters">
          <button
            v-for="category in technologyCategories"
            :key="category"
            type="button"
            :class="{ selected: selectedCategory === category }"
            :aria-pressed="selectedCategory === category"
            @click="selectedCategory = category"
          >
            {{ category }}
          </button>
        </div>

        <div class="toolkit-board">
        <Transition name="board" mode="out-in">
        <div :key="selectedCategory" class="tech-grid">
          <article
            v-for="(technology, index) in filteredTechnologies()"
            :key="technology.name"
            class="tech-card"
            :style="{ '--card-delay': `${index * 55}ms`, '--technology-paper': 'url(' + (index % 2 ? rippedPaper : stackedPaper) + ')', '--technology-tape': 'url(' + [tapeStrip, tapeTwo, tapeThree][index % 3] + ')' }"
          >
            <span class="tech-logo">
              <img :src="technology.logo" :alt="`${technology.name} logo`" />
            </span>
            <div>
              <strong>{{ technology.name }}</strong>
              <small>{{ technology.category }}</small>
            </div>
          </article>
        </div>
        </Transition>
        </div>
      </section>

      <section id="experience" class="section reveal">
        <div class="section-heading">
          <h2>Experience.</h2>
        </div>
        <div v-if="visualMode === 'fieldnotes'" class="experience-atlas">
          <div class="atlas-map">
            <svg viewBox="0 0 500 500" role="img" aria-label="Illustrated Antarctic map with four selectable career stations">
              <g class="atlas-graticule" fill="none">
                <circle cx="250" cy="250" r="205" />
                <circle cx="250" cy="250" r="150" />
                <circle cx="250" cy="250" r="90" />
                <path d="M45 250h410M250 45v410M105 105l290 290M105 395l290-290" />
              </g>
              <path class="atlas-land" d="M106 204 L87 173 70 163 62 144 45 129 52 119 71 131 83 149 105 157 122 174 142 181 155 159 162 132 182 111 207 103 218 84 241 89 259 79 278 91 299 84 322 103 344 106 355 125 377 133 382 154 403 169 401 194 421 216 413 239 426 261 412 280 417 301 398 322 392 347 366 356 349 379 326 377 309 398 284 396 264 411 242 398 221 405 202 383 180 380 167 360 143 351 137 328 119 316 124 293 106 279 114 258 96 241 105 223 128 216 141 234 160 241 178 229 166 213 143 202 123 208 Z" />
              <image :href="antarcticaMap" x="30" y="30" width="440" height="440" preserveAspectRatio="xMidYMid meet" />
              <path class="atlas-route" d="M160 230 Q165 120 300 135 Q407 151 365 245 Q363 353 250 340 Q164 342 160 230" fill="none" />
              <text x="252" y="270" text-anchor="middle" class="atlas-pole">SOUTH POLE</text>
              <path class="atlas-pole-cross" d="M245 250h14m-7-7v14" />
              <g
                v-for="(marker, index) in experienceMarkers"
                :key="index"
                class="atlas-marker"
                :class="{ selected: selectedExperience === index }"
                role="button"
                tabindex="0"
                :aria-label="experiences[index].company + ': ' + experiences[index].role"
                :aria-pressed="selectedExperience === index"
                @click="selectExperience(index)"
                @keydown.enter.prevent="selectExperience(index)"
                @keydown.space.prevent="selectExperience(index)"
              >
                <circle class="atlas-hit" :cx="marker.x" :cy="marker.y" r="24" />
                <title>{{ experiences[index].company }} — {{ experiences[index].period }}</title>
                <circle class="atlas-halo" :cx="marker.x" :cy="marker.y" r="22" />
                <circle class="atlas-ring" :cx="marker.x" :cy="marker.y" r="14" />
                <text :x="marker.x" :y="marker.y" text-anchor="middle" dominant-baseline="central">{{ index + 1 }}</text>
              </g>
            </svg>
            <p class="atlas-caption">ANTARCTICA / CAREER ATLAS</p>
            <p class="atlas-hint">Scroll through my experience to follow the route.</p>
          </div>
          <div class="atlas-details">
            <div class="atlas-stations" aria-label="Career stations">
              <button v-for="(experience, index) in experiences" :key="index" type="button" :class="{ selected: selectedExperience === index }" :aria-pressed="selectedExperience === index" @click="selectedExperience = index">
                {{ index + 1 }} / {{ experience.company }}
              </button>
            </div>
              <article v-for="(experience, index) in experiences" :key="index" :id="'career-station-' + index" class="atlas-entry timeline-entry" :class="{ 'is-current': selectedExperience === index }" :style="{ '--paper-image': 'url(' + rippedPaper + ')' }">
                <img class="experience-tape" :src="tapeStrip" alt="" />
                <p class="atlas-date">{{ experience.period }}</p>
                <h3>{{ experience.role }}</h3>
                <strong>{{ experience.company }}</strong>
                <p class="atlas-arrangement">{{ experience.arrangement }} · Guatemala City, Guatemala</p>
                <ul>
                  <li v-for="detail in experience.details" :key="detail">{{ detail }}</li>
                </ul>
                <div class="project-tags">
                  <span v-for="tag in experience.tags" :key="tag">{{ tag }}</span>
                </div>
              </article>
          </div>
        </div>
        <div v-else class="experience-list">
          <article v-for="experience in experiences" :key="experience.company + experience.period" class="experience-card">
            <div class="experience-meta">
              <strong>{{ experience.company }}</strong>
              <span>{{ experience.period }}</span>
              <span>{{ experience.arrangement }}</span>
              <span>Guatemala City, Guatemala</span>
            </div>
            <div class="experience-content">
              <h3>{{ experience.role }}</h3>
              <ul>
                <li v-for="detail in experience.details" :key="detail">{{ detail }}</li>
              </ul>
              <div class="project-tags">
                <span v-for="tag in experience.tags" :key="tag">{{ tag }}</span>
              </div>
            </div>
          </article>
        </div>
      </section>

      <section id="projects" class="section reveal">
        <div class="section-heading">
          <div>
            <h2>Projects.</h2>
          </div>
          <a
            class="section-note section-link"
            href="https://github.com/tsc221645"
            target="_blank"
            rel="noreferrer"
          >
            github profile
          </a>
        </div>

        <div class="projects-grid">
          <article
            v-for="(project, index) in projects"
            :key="project.title"
            class="project"
            :class="`project-${(index % 4) + 1}`"
            :style="{ '--project-tape': 'url(' + [tapeStrip, tapeTwo, tapeThree][index % 3] + ')' }"
          >
            <div class="project-preview">
              <template v-if="visualMode === 'fieldnotes'">
                <div v-if="getProjectPreview(project).length" class="project-polaroid">
                  <figure class="instant-photo">
                  <img
                    :src="getProjectPreview(project)[0]"
                    :alt="`Instant photo preview of ${project.title}`"
                  />
                  <figcaption>{{ project.title }}</figcaption>
                  </figure>
                </div>
                <div v-else class="project-note-preview">
                  <span>PROJECT NOTE</span>
                  <strong>{{ project.title }}</strong>
                  <small>archive / observation / build</small>
                </div>
              </template>
              <template v-else>
                <div class="preview-top">
                  <span></span><span></span><span></span>
                  <b>{{ project.type }}</b>
                </div>
                <div class="preview-content">
                  <div v-if="getProjectPreview(project).length" class="image-preview">
                    <img
                      v-for="(image, imageIndex) in getProjectPreview(project)"
                      :key="image"
                      :src="image"
                      :alt="`Preview of ${project.title}`"
                      :class="{ 'preview-image-secondary': imageIndex === 1 }"
                    />
                  </div>
                  <div v-else class="preview-placeholder">
                    <span>{{ project.title.slice(0, 2).toUpperCase() }}</span>
                    <i></i><i></i><i></i>
                  </div>
                </div>
              </template>
            </div>

            <div class="project-info">
              <div>
                <small>0{{ index + 1 }} / {{ project.type }}</small>
                <h3>{{ project.title }}</h3>
                <p>{{ project.description }}</p>
                <div class="project-tags">
                  <span v-for="tag in project.tags" :key="tag">{{ tag }}</span>
                </div>
              </div>
              <a
                v-if="project.url"
                class="project-link"
                :href="project.url"
                target="_blank"
                rel="noreferrer"
              >
                view on GitHub
              </a>
            </div>
          </article>
        </div>
      </section>

      <section id="contact" class="section reveal">
        <div class="contact-box">
          <div>
            <h2>Let’s build something.</h2>
            <p>
              Send me an email or leave a message. I’d love to hear about your
              next project.
            </p>
            <form @submit.prevent="sendMessage">
              <input v-model="form.name" required placeholder="your name" />
              <input v-model="form.email" required type="email" placeholder="your email" />
              <textarea v-model="form.message" required placeholder="tell me about your project"></textarea>
              <button class="button submit" type="submit" :disabled="sending">
                {{ sending ? "sending..." : "send message" }}
              </button>
              <small>{{ status }}</small>
            </form>
          </div>

          <div class="contact-details">
            <span>find me online</span>
            <a class="contact-icon-link" href="mailto:hello@yourname.dev">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 5.5h18v13H3zM4 7l8 6 8-6" /></svg>
              <span>hello@yourname.dev</span>
            </a>
            <a
              class="contact-icon-link"
              href="https://www.linkedin.com/in/ana-laura-tschen-moscoso-12ba59242/"
              target="_blank"
              rel="noreferrer"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 8.5V19M6 5.2v.1M10.5 19v-6a3 3 0 0 1 6 0v6M10.5 10v9" /></svg>
              <span>LinkedIn</span>
            </a>
            <a
              class="contact-icon-link"
              href="https://github.com/tsc221645"
              target="_blank"
              rel="noreferrer"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 19c-4 1.3-4-2-5-2m10 4v-3.4c0-1 .1-1.4-.5-2 2.5-.3 5.1-1.2 5.1-5.5 0-1.2-.4-2.3-1.1-3.1.1-.3.5-1.6-.1-3.1 0 0-.9-.3-3.2 1.2a11 11 0 0 0-5.8 0C6.1 4.6 5.2 5 5.2 5c-.6 1.5-.2 2.8-.1 3.1A4.5 4.5 0 0 0 4 13.1c0 4.3 2.6 5.2 5.1 5.5-.6.5-.6 1.1-.6 2.4V21" /></svg>
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </section>
    </main>

    <footer>
      <span>© 2025 Ana Laura Tschen Moscoso</span>
      <span>vue + node · field notes from the edge</span>
    </footer>
  </div>
</template>
