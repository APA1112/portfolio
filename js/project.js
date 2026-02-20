const container = document.getElementById("projects-container");
const MIN_LOADING_TIME = 1000; // 1 segundo mínimo

async function loadProjects() {
  showSkeletons();

  try {
    // Creamos ambas promesas
    const fetchPromise = fetch("data/projects.json");
    const delayPromise = new Promise((resolve) =>
      setTimeout(resolve, MIN_LOADING_TIME),
    );

    // Esperamos a que ambas terminen
    const [response] = await Promise.all([fetchPromise, delayPromise]);

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

  projects.forEach((project) => {
    const card = document.createElement("div");
    card.classList.add("project-card");

    card.innerHTML = `
      <img src="${project.image}" alt="${project.title}" />
      <h3>${project.title}</h3>
      <p>${project.description}</p>
      <div class="btn-group">
        <a href="${project.demo}" target="_blank" class="btn">Demo</a>
        <a href="${project.repo}" target="_blank" class="btn">Repositorio</a>
      </div>
    `;

    container.appendChild(card);
  });
}

loadProjects();
