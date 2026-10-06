const container = document.getElementById("projects-container");

async function loadProjects() {
  showSkeletons();

  try {
    const response = await fetch("data/projects.json");

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
    container.innerHTML = `<p class="empty-message">Error cargando proyectos.</p>`;
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
      🚧 Aún no hay proyectos publicados.
    </div>
  `;
}

function renderProjects(projects) {
  container.innerHTML = "";

  projects.forEach((project, index) => {
    const card = document.createElement("article");
    card.classList.add("project-card");
    card.style.animationDelay = `${index * 0.1}s`;

    const tags = (project.technologies || [])
      .map((tech) => `<li class="tag">${tech}</li>`)
      .join("");

    card.innerHTML = `
      <img src="${project.image}" alt="Captura de ${project.title}" width="800" height="450" loading="lazy" />
      <h3>${project.title}</h3>
      <ul class="tags" aria-label="Tecnologías">${tags}</ul>
      <p>${project.description}</p>
      <div class="btn-group">
        <a href="${project.demo}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
          <i class="fa-solid fa-arrow-up-right-from-square"></i> Demo
        </a>
        <a href="${project.repo}" target="_blank" rel="noopener noreferrer" class="btn">
          <i class="fa-brands fa-github"></i> Código
        </a>
      </div>
    `;

    container.appendChild(card);
  });
}

loadProjects();
