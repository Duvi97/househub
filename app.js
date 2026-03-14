let projects = [];

async function loadProjects() {
  try {
    const response = await fetch('data/architects.json');
    const architects = await response.json();
    const allProjects = [];
    for (const architect of architects) {
      const projResponse = await fetch(`data/${architect}/projects.json`);
      const archProjects = await projResponse.json();
      allProjects.push(...archProjects);
    }
    projects = allProjects;
  } catch (error) {
    console.error('Error loading projects:', error);
  }
}
const projectsGrid = document.getElementById("projectsGrid");
const projectArchitectSelect = document.getElementById("projectArchitectSelect");
const filterToggle = document.getElementById("filterToggle");
const filterOptions = document.getElementById("filterOptions");

let currentArchitect = "all";
let currentStyle = "all";
const filterButtons = [...document.querySelectorAll(".chip")];
const dialog = document.getElementById("projectDialog");
const closeDialogButton = document.getElementById("closeDialog");
const dialogContent = document.getElementById("dialogContent");
const architectForm = document.getElementById("architectForm");
const clientForm = document.getElementById("clientForm");
const architectFeedback = document.getElementById("architectFeedback");
const clientFeedback = document.getElementById("clientFeedback");
const year = document.getElementById("year");
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const architectSelect = document.getElementById("architectSelect");
const architectProjectsGrid = document.getElementById("architectProjects");

function toStyleSlug(style) {
  return style
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/\s+/g, "-");
}

function getUniqueArchitects() {
  const architects = [...new Set(projects.map(p => p.architect))];
  return architects;
}

function populateProjectArchitectSelect() {
  const architects = getUniqueArchitects();
  architects.forEach(arch => {
    const option = document.createElement("option");
    option.value = arch;
    option.textContent = arch;
    projectArchitectSelect.appendChild(option);
  });
}

function createProjectCard(project, index = 0) {
  const card = document.createElement("article");
  const styleSlug = toStyleSlug(project.style);
  card.className = `project-card project-card--${styleSlug} reveal`;
  card.style.animationDelay = `${Math.min(index * 70, 350)}ms`;
  card.innerHTML = `
    <div class="project-cover" style="background-image:url('${project.image}')"></div>
    <div class="project-content">
      <h3>${project.name}</h3>
      <p>${project.summary}</p>
      <div class="project-meta">
        <span class="tag tag--style tag--${styleSlug}">${project.style}</span>
        <span class="tag">${project.size}</span>
        <span class="tag">${project.budget}</span>
      </div>
      <button class="btn btn-secondary" data-project-id="${project.id}">Vezi și contactează</button>
    </div>
  `;
  return card;
}

function renderProjects(architect = "all", style = "all") {
  let filteredProjects = projects;

  if (architect !== "all") {
    filteredProjects = filteredProjects.filter((item) => item.architect === architect);
  }

  if (style !== "all") {
    filteredProjects = filteredProjects.filter((item) => item.style === style);
  }

  projectsGrid.innerHTML = "";

  if (!filteredProjects.length) {
    projectsGrid.innerHTML = `<p>Nu există încă proiecte disponibile pentru filtrele selectate.</p>`;
  } else {
    filteredProjects.forEach((project, index) => {
      projectsGrid.append(createProjectCard(project, index));
    });
  }
}

function openProjectDialog(projectId) {
  const project = projects.find((item) => item.id === Number(projectId));
  if (!project) return;

  dialogContent.innerHTML = `
    <h3>${project.name}</h3>
    <p><strong>Stil:</strong> ${project.style}</p>
    <p><strong>Locație:</strong> ${project.location}</p>
    <p><strong>Buget estimativ:</strong> ${project.budget}</p>
    <p><strong>Arhitect:</strong> ${project.architect}</p>
    <p>${project.summary}</p>
    <a class="btn btn-primary" href="mailto:${project.email}?subject=Cerere HouseHub: ${encodeURIComponent(
    project.name
  )}">Contactează ${project.architect}</a>
  `;

  if (typeof dialog.showModal === "function") {
    dialog.showModal();
  }
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");
    currentStyle = button.dataset.filter;
    renderProjects(currentArchitect, currentStyle);
  });
});

const projectGrids = document.querySelectorAll(".project-grid");
projectGrids.forEach((grid) => {
  grid.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;
    if (target.matches("[data-project-id]")) {
      openProjectDialog(target.dataset.projectId);
    }
  });
});

closeDialogButton.addEventListener("click", () => dialog.close());
dialog.addEventListener("click", (event) => {
  const bounds = dialog.querySelector(".dialog-card")?.getBoundingClientRect();
  if (!bounds) return;
  const clickInDialog =
    event.clientY >= bounds.top &&
    event.clientY <= bounds.bottom &&
    event.clientX >= bounds.left &&
    event.clientX <= bounds.right;
  if (!clickInDialog) dialog.close();
});

function setFeedback(node, message, type) {
  node.textContent = message;
  node.classList.remove("success", "error");
  node.classList.add(type);
}

architectForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(architectForm);
  const name = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const firm = String(formData.get("firm") || "").trim();
  const description = String(formData.get("description") || "").trim();

  if (!name || !email || !firm || !description) {
    setFeedback(architectFeedback, "Completează toate câmpurile obligatorii pentru arhitect.", "error");
    return;
  }

  setFeedback(
    architectFeedback,
    `Mulțumim, ${name}. Am înregistrat interesul pentru ${firm}. Povestea ta ne-a inspirat! (În MVP datele se stochează doar local.)`,
    "success"
  );
  architectForm.reset();
});

clientForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(clientForm);
  const name = String(formData.get("clientName") || "").trim();
  const style = String(formData.get("style") || "").trim();

  if (!name || !style) {
    setFeedback(clientFeedback, "Completează numele și stilul preferat.", "error");
    return;
  }

  setFeedback(
    clientFeedback,
    `${name}, anunțul tău pentru stilul ${style} a fost trimis. Arhitecții te vor contacta curând.`,
    "success"
  );
  clientForm.reset();
});

menuToggle.addEventListener("click", () => {
  const expanded = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!expanded));
  navLinks.classList.toggle("open");
});

[...navLinks.querySelectorAll("a")].forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

year.textContent = String(new Date().getFullYear());
loadProjects().then(() => {
  populateProjectArchitectSelect();
  projectArchitectSelect.addEventListener("change", () => {
    currentArchitect = projectArchitectSelect.value;
    renderProjects(currentArchitect, currentStyle);
  });
  filterToggle.addEventListener("click", () => {
    const isVisible = filterOptions.style.display === "flex";
    filterOptions.style.display = isVisible ? "none" : "flex";
  });
  renderProjects();
});
