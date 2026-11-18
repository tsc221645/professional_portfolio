<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import profilePicture from "./assets/github/profile_picture.png";
import predictGuardPreviewOne from "./assets/project_previews/predictguard1.png";
import predictGuardPreviewTwo from "./assets/project_previews/predictguard2.png";
import screenSaverPreviewOne from "./assets/project_previews/screensaver1.png";
import screenSaverPreviewTwo from "./assets/project_previews/screensaver2.png";

const menuOpen = ref(false);
const activeSection = ref("home");
const sending = ref(false);
const status = ref("");
const form = ref({ name: "", email: "", message: "" });
const projects = ref([]);

const technologyCategories = [
  "All",
  "Languages",
  "Frameworks",
  "Data & AI",
  "Tools",
];
const selectedCategory = ref("All");
const profileImage = profilePicture;
const projectPreviewImages = {
  RoadGuard: [predictGuardPreviewOne, predictGuardPreviewTwo],
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
    name: "Go",
    category: "Languages",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg",
  },
  {
    name: "Rust",
    category: "Languages",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rust/rust-plain.svg",
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
    name: "MCP",
    category: "Tools",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
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
    : technologies.filter((tech) => tech.category === selectedCategory.value);

function getProjectPreview(project) {
  return projectPreviewImages[project.title] || [];
}
const fallbackProjects = [
  {
    title: "RoadGuard",
    type: "Python · computer vision",
    description:
      "A computer vision and artificial intelligence project focused on road safety.",
    url: "https://github.com/tsc221645/roadguard",
  },
  {
    title: "Screen Saver",
    type: "Creative coding",
    description:
      "A pixel-art visual experience with seasonal scenes, animated details, and a playful atmosphere.",
    url: null,
  },
];

const sections = ["home", "about", "technologies", "projects", "contact"];
let observer;

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
});
onUnmounted(() => observer?.disconnect());
</script>

<template>
  <header class="site-header">
    <nav class="nav">
      <a class="brand" href="#home"
        ><span class="brand-mark">{ }</span
        ><span>ana tschen<span class="dot">.</span>dev</span></a
      >
      <button
        class="menu-toggle"
        @click="menuOpen = !menuOpen"
        aria-label="Open navigation"
      >
        ☰
      </button>
      <div class="nav-links" :class="{ open: menuOpen }">
        <a
          v-for="item in [
            { id: 'about', label: 'about' },
            { id: 'technologies', label: 'technologies' },
            { id: 'projects', label: 'projects' },
          ]"
          :key="item.id"
          :href="`#${item.id}`"
          :class="{ active: activeSection === item.id }"
          @click="menuOpen = false"
          >{{ item.label }}</a
        >
        <a class="nav-cta" href="#contact" @click="menuOpen = false"
          >let's talk</a
        >
      </div>
    </nav>
  </header>

  <main>
    <section id="home" class="section hero">
      <div class="hero-copy reveal">
        <div class="eyebrow">hello, I’m a full-stack developer</div>
        <h1>I turn ideas into <em>experiences.</em></h1>
        <p>
          I build thoughtful digital products: clear interfaces, useful APIs,
          and details that make everything feel effortless.
        </p>
        <div class="hero-actions">
          <a class="button primary" href="#projects">view projects</a
          ><a class="button ghost" href="#about">about me</a>
        </div>
      </div>
      <div class="hero-art reveal">
        <div class="code-card">
          <div class="window-bar"><i></i><i></i><i></i></div>
          <code
            ><span class="pink">const</span>
            <span class="yellow">developer</span> = {<br />&nbsp;&nbsp;stack:
            <span class="blue">'vue + node'</span>,<br />&nbsp;&nbsp;focus:
            <span class="blue">'digital products'</span
            >,<br />&nbsp;&nbsp;coffee:
            <span class="yellow">true</span>,<br />&nbsp;&nbsp;alwaysLearning:
            <span class="yellow">true</span><br />};</code
          >
        </div>
        <div class="floating-note">
          <b>currently</b> building useful things and learning something new.
        </div>
      </div>
    </section>

    <section id="about" class="section reveal">
      <div class="section-heading">
        <h2>A little<br />about me.</h2>
        <span>01 / about</span>
      </div>
      <div class="about-grid">
        <p class="about-lead">
          I’m a curious developer focused on making technology feel human.
        </p>
        <div class="about-text">
          <div class="profile-card">
            <img :src="profileImage" alt="Foto de perfil de Ana Laura Tschen" />
            <div>
              <strong>Ana Laura Tschen Moscoso</strong>
              <span>@tsc221645 · GitHub</span>
            </div>
          </div>
          <p>
            I love working where design and code meet. I think about systems,
            but also about the people who use them.
          </p>
          <p>
            I work end to end: from a polished Vue interface to a clear API and
            a database ready to grow.
          </p>
          <div class="signature">— Ana Laura</div>
        </div>
      </div>
    </section>

    <section id="technologies" class="section reveal">
      <div class="section-heading">
        <h2>My<br />toolkit.</h2>
        <span>02 / technologies</span>
      </div>
      <div class="tech-filters">
        <button
          v-for="category in technologyCategories"
          :key="category"
          :class="{ selected: selectedCategory === category }"
          @click="selectedCategory = category"
        >
          {{ category }}
        </button>
      </div>
      <div class="tech-grid">
        <article
          v-for="tech in filteredTechnologies()"
          :key="tech.name"
          class="tech-card"
        >
          <span class="tech-logo"
            ><img :src="tech.logo" :alt="`${tech.name} logo`"
          /></span>
          <div>
            <strong>{{ tech.name }}</strong
            ><small>{{ tech.category }}</small>
          </div>
        </article>
      </div>
    </section>

    <section id="projects" class="section reveal">
      <div class="section-heading">
        <h2>Proyectos.</h2>
        <span>03 / github</span>
      </div>
      <div class="projects-grid">
        <article
          v-for="(project, index) in projects"
          :key="project.title"
          class="project"
          :class="`project-${(index % 6) + 1}`"
        >
          <div class="project-preview">
            <div class="preview-top">
              <span></span><span></span><span></span><b>{{ project.type }}</b>
            </div>
            <div class="preview-content">
              <div v-if="getProjectPreview(project).length" class="image-preview">
                <img
                  v-for="(image, imageIndex) in getProjectPreview(project)"
                  :key="image"
                  :src="image"
                  :alt="`Preview de ${project.title}`"
                  :class="{ 'preview-image-secondary': imageIndex === 1 }"
                />
              </div>
              <div class="preview-avatar">
                {{ project.title.charAt(0).toUpperCase() }}
              </div>
              <div class="preview-lines"><i></i><i></i><i></i></div>
              <div v-if="index % 3 === 1" class="preview-bars">
                <em></em><em></em><em></em><em></em>
              </div>
              <div v-else class="preview-panels"><i></i><i></i><i></i></div>
            </div>
          </div>
          <div class="project-info">
            <div>
              <small>0{{ index + 1 }} · {{ project.type }}</small>
              <h3>{{ project.title }}</h3>
              <p>{{ project.description }}</p>
            </div>
            <a
              v-if="project.url"
              class="project-link"
              :href="project.url"
              target="_blank"
              rel="noreferrer"
              >ver en GitHub</a
            >
            <span v-else class="project-link project-link-disabled">preview only</span>
          </div>
        </article>
      </div>
    </section>

    <section id="contact" class="section reveal">
      <div class="contact-box">
        <div>
          <div class="eyebrow light">have an idea?</div>
          <h2>Let’s build something.</h2>
          <p>
            Send me an email or leave a message. I’d love to hear about your
            next project.
          </p>
          <form @submit.prevent="sendMessage">
            <input v-model="form.name" required placeholder="your name" /><input
              v-model="form.email"
              required
              type="email"
              placeholder="your email"
            /><textarea
              v-model="form.message"
              required
              placeholder="tell me about your project"
            ></textarea
            ><button class="button submit" :disabled="sending">
              {{ sending ? "sending..." : "send message" }}</button
            ><small>{{ status }}</small>
          </form>
        </div>
        <div class="contact-details">
          <span>find me online</span
          ><a class="contact-icon-link" href="mailto:hello@yourname.dev"
            ><svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M3 5.5h18v13H3zM4 7l8 6 8-6" /></svg
            ><span>hello@yourname.dev</span></a
          ><a
            class="contact-icon-link"
            href="https://linkedin.com"
            target="_blank"
            rel="noreferrer"
            ><svg viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M6 8.5V19M6 5.2v.1M10.5 19v-6a3 3 0 0 1 6 0v6M10.5 10v9"
              /></svg
            ><span>LinkedIn</span></a
          ><a
            class="contact-icon-link"
            href="https://github.com/tsc221645"
            target="_blank"
            rel="noreferrer"
            ><svg viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M9 19c-4 1.3-4-2-5-2m10 4v-3.4c0-1 .1-1.4-.5-2 2.5-.3 5.1-1.2 5.1-5.5 0-1.2-.4-2.3-1.1-3.1.1-.3.5-1.6-.1-3.1 0 0-.9-.3-3.2 1.2a11 11 0 0 0-5.8 0C6.1 4.6 5.2 5 5.2 5c-.6 1.5-.2 2.8-.1 3.1A4.5 4.5 0 0 0 4 13.1c0 4.3 2.6 5.2 5.1 5.5-.6.5-.6 1.1-.6 2.4V21"
              /></svg
            ><span>GitHub</span></a
          >
        </div>
      </div>
    </section>
  </main>
  <footer>
    <span>© 2025 your name</span>
    ><span>vue + node · made with curiosity &amp; coffee</span>
  </footer>
</template>
