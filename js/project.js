const container = document.getElementById("projects-container");
const isEnglish = document.documentElement.lang === "en";
// Rutas relativas a este script para que funcionen igual desde / y desde /en/
const scriptUrl = document.currentScript.src;
const fromRoot = (path) => new URL(`../${path}`, scriptUrl).href;

const texts = isEnglish
  ? {
      error: "Error loading projects.",
      empty: "🚧 No projects published yet.",
      screenshot: "Screenshot of",
      technologies: "Technologies",
      code: "Code",
    }
  : {
      error: "Error cargando proyectos.",
      empty: "🚧 Aún no hay proyectos publicados.",
      screenshot: "Captura de",
      technologies: "Tecnologías",
      code: "Código",
    };

async function loadProjects() {
  showSkeletons();

  try {
    const response = await fetch(fromRoot("data/projects.json"));

    if (!response.ok) {
      throw new Error("Error al cargar proyectos");
    }

    const projects = await response.json();

    if (!projects.length) {
      showEmptyMessage();
      return;
    }

    renderProjects(projects);
  } catch (error) {
    container.innerHTML = `<p class="empty-message">${texts.error}</p>`;
    console.error(error);
  }
}

function showSkeletons() {
  container.innerHTML = "";

  for (let i = 0; i < 3; i++) {
    const skeleton = document.createElement("div");
    skeleton.classList.add("project-card", "skeleton");

    skeleton.innerHTML = `
      <div class="skeleton-img"></div>
      <div class="skeleton-text"></div>
      <div class="skeleton-text" style="width: 80%"></div>
      <div class="btn-group">
        <div class="skeleton-btn"></div>
        <div class="skeleton-btn"></div>
      </div>
    `;

    container.appendChild(skeleton);
  }
}

function showEmptyMessage() {
  container.innerHTML = `
    <div class="empty-message">
      ${texts.empty}
    </div>
  `;
}

function renderProjects(projects) {
  container.innerHTML = "";

  projects.forEach((project, index) => {
    const card = document.createElement("article");
    card.classList.add("project-card");
    card.style.animationDelay = `${index * 0.1}s`;

    const title = (isEnglish && project.title_en) || project.title;
    const description =
      (isEnglish && project.description_en) || project.description;

    const tags = (project.technologies || [])
      .map((tech) => `<li class="tag">${tech}</li>`)
      .join("");

    card.innerHTML = `
      <img src="${fromRoot(project.image)}" alt="${texts.screenshot} ${title}" width="800" height="450" loading="lazy" />
      <h3>${title}</h3>
      <ul class="tags" aria-label="${texts.technologies}">${tags}</ul>
      <p>${description}</p>
      <div class="btn-group">
        <a href="${project.demo}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
          <i class="fa-solid fa-arrow-up-right-from-square"></i> Demo
        </a>
        ${
          // "repo" es opcional: los proyectos con repositorio privado no muestran el botón
          project.repo
            ? `<a href="${project.repo}" target="_blank" rel="noopener noreferrer" class="btn">
          <i class="fa-brands fa-github"></i> ${texts.code}
        </a>`
            : ""
        }
      </div>
    `;

    container.appendChild(card);
  });
}

loadProjects();
