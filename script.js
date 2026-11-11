// Add only verified personal details. Empty values keep profile links unpublished.
const portfolioData = {
  profile: {
    email: "aamir30731@gmail.com",
    github: "https://github.com/aamir786-blip",
    linkedin: "https://www.linkedin.com/in/mohd-aamir-ab194144a",
    instagram: "https://www.instagram.com/the_aamir.1?vrfl=MWsyaGNpajBwNHl2Yg==",
    resumePath: "",
    formEndpoint: ""
  },
  skillCategories: [
    { title: "Programming Languages", icon: "</>", skills: [{ name: "Add skill name", level: 0, placeholder: true }] },
    { title: "Web Development", icon: "⌘", skills: [{ name: "Add skill name", level: 0, placeholder: true }] },
    { title: "Database Management", icon: "▤", skills: [{ name: "Add skill name", level: 0, placeholder: true }] },
    { title: "Development Tools", icon: "⚙", skills: [{ name: "Add skill name", level: 0, placeholder: true }] },
    { title: "Computer Fundamentals", icon: "◈", skills: [{ name: "Add skill name", level: 0, placeholder: true }] },
    { title: "Soft Skills", icon: "✳", skills: [{ name: "Add skill name", level: 0, placeholder: true }] }
  ],
  projectCategories: ["All", "Web", "Application", "Other"],
  projects: [
    { title: "Project title goes here", category: "Web", description: "Replace this clearly marked example with a description of a real project.", technologies: ["Add", "your", "tools"], screenshot: "", github: "", live: "", placeholder: true },
    { title: "Another project goes here", category: "Application", description: "Add a project you have actually built, along with its purpose and what you learned.", technologies: ["Add", "your", "tools"], screenshot: "", github: "", live: "", placeholder: true },
    { title: "A new idea takes shape", category: "Other", description: "Use this card for another real project when you are ready to share it.", technologies: ["Add", "your", "tools"], screenshot: "", github: "", live: "", placeholder: true }
  ],
  certificates: []
};

const categoryIcons = ["⌘", "▤", "◈", "⚙", "⌁", "✳"];
const iconMarkup = (icon) => `<span class="skill-card-icon" aria-hidden="true">${escapeHTML(icon)}</span>`;

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[character]);
}

function renderSkills() {
  const grid = document.querySelector("#skills-grid");
  grid.innerHTML = portfolioData.skillCategories.map((category, index) => {
    const skills = category.skills.map((skill) => {
      const level = Math.max(0, Math.min(100, Number(skill.level) || 0));
      if (skill.placeholder) {
        return `<div class="skill-entry skill-entry-placeholder"><span>${escapeHTML(skill.name)}</span><span class="skill-level">Set proficiency</span><span class="skill-meter"><span style="--skill-level:0%"></span></span></div>`;
      }
      return `<div class="skill-entry"><span>${escapeHTML(skill.name)}</span><span class="skill-level">${level}%</span><span class="skill-meter"><span style="--skill-level:${level}%"></span></span></div>`;
    }).join("");
    return `<article class="skill-card reveal">
      <div class="skill-card-heading">${iconMarkup(category.icon || categoryIcons[index % categoryIcons.length])}<h3>${escapeHTML(category.title)}</h3></div>
      ${skills}
    </article>`;
  }).join("");
  observeReveals(grid);
}

function renderProjects() {
  const filters = document.querySelector("#project-filters");
  const grid = document.querySelector("#projects-grid");
  filters.innerHTML = portfolioData.projectCategories.map((category, index) =>
    `<button class="filter-button" type="button" data-category="${escapeHTML(category)}" aria-pressed="${index === 0}">${escapeHTML(category)}</button>`
  ).join("");
  grid.innerHTML = portfolioData.projects.map((project, index) => `
    <article class="project-card reveal" data-category="${escapeHTML(project.category)}">
      <div class="project-preview" aria-label="${project.screenshot ? escapeHTML(project.title) + " screenshot" : "Decorative project preview placeholder"}">
        ${project.screenshot ? `<img src="${escapeHTML(project.screenshot)}" alt="${escapeHTML(project.title)} project screenshot" loading="lazy">` : '<div class="preview-window" aria-hidden="true"><div class="preview-bar"><i></i><i></i><i></i></div><div class="preview-lines"><span></span><span></span><span></span></div><div class="preview-blocks"><i></i><i></i><i></i></div></div>'}
        <span class="project-label">${project.placeholder ? "Example placeholder" : "Project preview"}</span>
      </div>
      <div class="project-content">
        <div class="project-meta"><span>${escapeHTML(project.category)}</span><span>${String(index + 1).padStart(2, "0")}</span></div>
        <h3>${escapeHTML(project.title)}</h3>
        <p>${escapeHTML(project.description)}</p>
        <div class="project-tags">${project.technologies.map((item) => `<span>${escapeHTML(item)}</span>`).join("")}</div>
        ${(project.github || project.live) ? `<div class="project-links">${project.github ? `<a href="${escapeHTML(project.github)}" target="_blank" rel="noopener noreferrer">GitHub <span aria-hidden="true">↗</span></a>` : ""}${project.live ? `<a href="${escapeHTML(project.live)}" target="_blank" rel="noopener noreferrer">Live project <span aria-hidden="true">↗</span></a>` : ""}</div>` : ""}
      </div>
    </article>`).join("");
  document.querySelector("#project-count").textContent = `${portfolioData.projects.length} ${portfolioData.projects.length === 1 ? "entry" : "entries"}`;
  observeReveals(grid);
}

function renderCertificates() {
  const container = document.querySelector("#certificate-list");
  if (!portfolioData.certificates.length) {
    container.hidden = true;
    return;
  }
  document.querySelector(".certificate-empty").hidden = true;
  container.hidden = false;
  container.innerHTML = portfolioData.certificates.map((certificate) => `
    <article class="certificate-entry">
      ${certificate.image ? `<img src="${escapeHTML(certificate.image)}" alt="${escapeHTML(certificate.title)}" loading="lazy">` : ""}
      <div><span class="certificate-type">${escapeHTML(certificate.type)}</span><h3>${escapeHTML(certificate.title)}</h3><p>${escapeHTML(certificate.issuer)} · ${escapeHTML(certificate.date)}</p>
        ${certificate.verificationUrl ? `<a href="${escapeHTML(certificate.verificationUrl)}" target="_blank" rel="noopener noreferrer">View verification <span aria-hidden="true">↗</span></a>` : ""}
      </div>
      ${certificate.placeholder ? '<span class="project-label">Example placeholder</span>' : ""}
    </article>`).join("");
}

function configureContactAndSocials() {
  const { email, github, linkedin, instagram, resumePath, formEndpoint } = portfolioData.profile;
  const emailTarget = document.querySelector("#contact-email");
  const githubTarget = document.querySelector("#contact-github");
  const linkedinTarget = document.querySelector("#contact-linkedin");
  const instagramTarget = document.querySelector("#contact-instagram");
  if (email) {
    const link = document.createElement("a");
    link.href = `mailto:${email}`;
    link.textContent = email;
    emailTarget.replaceChildren(link);
  }
  if (github) setProfileLink(githubTarget, github, "GitHub profile");
  if (linkedin) setProfileLink(linkedinTarget, linkedin, "LinkedIn profile");
  if (instagram) setProfileLink(instagramTarget, instagram, "@the_aamir.1");

  const socialItems = [
    github && ["GitHub", github],
    linkedin && ["LinkedIn", linkedin],
    instagram && ["Instagram", instagram]
  ].filter(Boolean);
  const footerSocials = document.querySelector("#footer-socials");
  if (socialItems.length) {
    footerSocials.replaceChildren(...socialItems.map(([label, url]) => {
      const link = document.createElement("a");
      link.href = url;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      const icon = document.createElement("span");
      icon.className = "footer-social-icon";
      icon.setAttribute("aria-hidden", "true");
      icon.textContent = label === "GitHub" ? "⌘" : label === "LinkedIn" ? "in" : "◎";
      link.append(icon, document.createTextNode(label));
      return link;
    }));
    document.querySelectorAll(".social-placeholder").forEach((placeholder) => {
      const label = placeholder.dataset.profile;
      const url = portfolioData.profile[label.toLowerCase()];
      if (url) {
        const profileLabel = placeholder.querySelector("span");
        const link = document.createElement("a");
        link.href = url;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.textContent = label;
        profileLabel.replaceChildren(link);
      }
    });
  }

  const resumeLink = document.querySelector(".resume-link");
  if (resumePath) {
    resumeLink.href = resumePath;
    resumeLink.download = "";
    resumeLink.setAttribute("aria-label", "Download resume");
    document.querySelector(".resume-note").hidden = true;
  }

  const form = document.querySelector("#contact-form");
  const submit = form.querySelector(".form-submit");
  const note = document.querySelector("#form-note");
  if (formEndpoint) {
    submit.disabled = false;
    submit.innerHTML = 'Send message <span aria-hidden="true">↗</span>';
    note.textContent = "";
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      submit.disabled = true;
      submit.firstChild.textContent = "Sending… ";
      note.textContent = "";
      try {
        const response = await fetch(formEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", "Accept": "application/json" },
          body: JSON.stringify(Object.fromEntries(new FormData(form)))
        });
        if (!response.ok) throw new Error(`Contact service returned ${response.status}`);
        form.reset();
        note.textContent = "Thanks — your message has been sent.";
      } catch (error) {
        note.textContent = "Your message could not be sent. Please try again later.";
        console.error("Contact form submission failed:", error);
      } finally {
        submit.disabled = false;
        submit.innerHTML = 'Send message <span aria-hidden="true">↗</span>';
      }
    });
  }
}

function setProfileLink(element, url, label) {
  const link = document.createElement("a");
  link.href = url;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.textContent = label;
  element.replaceChildren(link);
}

function observeReveals(root = document) {
  const elements = root.querySelectorAll(".reveal:not([data-reveal-observed])");
  if (!("IntersectionObserver" in window)) {
    elements.forEach((element) => element.classList.add("is-visible"));
    return;
  }
  elements.forEach((element) => {
    element.dataset.revealObserved = "true";
    revealObserver.observe(element);
  });
}

const revealObserver = "IntersectionObserver" in window
  ? new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12 })
  : null;

function initNavigation() {
  const menu = document.querySelector(".menu-toggle");
  const links = document.querySelector(".nav-links");
  menu.addEventListener("click", () => {
    const expanded = menu.getAttribute("aria-expanded") === "true";
    menu.setAttribute("aria-expanded", String(!expanded));
    menu.setAttribute("aria-label", expanded ? "Open navigation menu" : "Close navigation menu");
    links.classList.toggle("is-open", !expanded);
  });
  links.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
    menu.setAttribute("aria-expanded", "false");
    menu.setAttribute("aria-label", "Open navigation menu");
    links.classList.remove("is-open");
  }));
}

function initTheme() {
  const button = document.querySelector(".theme-toggle");
  let savedTheme = null;
  try { savedTheme = localStorage.getItem("portfolio-theme"); } catch (error) { /* Storage may be disabled. */ }
  if (savedTheme === "light") document.documentElement.dataset.theme = "light";
  updateThemeButton(button);
  button.addEventListener("click", () => {
    const light = document.documentElement.dataset.theme !== "light";
    if (light) document.documentElement.dataset.theme = "light";
    else delete document.documentElement.dataset.theme;
    try { localStorage.setItem("portfolio-theme", light ? "light" : "dark"); } catch (error) { /* Theme still works for this page view. */ }
    updateThemeButton(button);
  });
}

function updateThemeButton(button) {
  const light = document.documentElement.dataset.theme === "light";
  button.setAttribute("aria-label", light ? "Switch to dark theme" : "Switch to light theme");
  button.title = light ? "Switch to dark theme" : "Switch to light theme";
}

function initProjectFilters() {
  document.querySelector("#project-filters").addEventListener("click", (event) => {
    const button = event.target.closest("button[data-category]");
    if (!button) return;
    const selected = button.dataset.category;
    document.querySelectorAll(".filter-button").forEach((filter) => {
      filter.setAttribute("aria-pressed", String(filter === button));
    });
    let visible = 0;
    document.querySelectorAll(".project-card").forEach((card) => {
      const show = selected === "All" || card.dataset.category === selected;
      card.hidden = !show;
      if (show) visible += 1;
    });
    document.querySelector("#project-count").textContent = `${visible} ${visible === 1 ? "entry" : "entries"}`;
  });
}

function initEducationTimeline() {
  document.querySelectorAll(".education-card").forEach((card) => {
    card.addEventListener("click", () => {
      const open = card.classList.toggle("is-open");
      card.setAttribute("aria-expanded", String(open));
      card.querySelector(".edu-toggle").textContent = open ? "−" : "+";
    });
  });
}

function initScrollEffects() {
  const backTop = document.querySelector(".back-top-button");
  const update = () => backTop.classList.toggle("is-visible", window.scrollY > 560);
  window.addEventListener("scroll", update, { passive: true });
  update();
  backTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
}

function initInterestTyping() {
  const element = document.querySelector(".interest-word");
  const words = ["software", "programming", "new ideas", "technology"];
  let wordIndex = 0;
  let characterIndex = words[0].length;
  let deleting = true;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reducedMotion) return;
  const type = () => {
    const current = words[wordIndex];
    element.textContent = current.slice(0, characterIndex);
    if (deleting) {
      characterIndex -= 1;
      if (characterIndex < 0) {
        deleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        characterIndex = 0;
      }
    } else {
      characterIndex += 1;
      if (characterIndex > words[wordIndex].length) {
        deleting = true;
        window.setTimeout(type, 1450);
        return;
      }
    }
    window.setTimeout(type, deleting ? 55 : 95);
  };
  window.setTimeout(type, 1600);
}

renderSkills();
renderProjects();
renderCertificates();
configureContactAndSocials();
initNavigation();
initTheme();
initProjectFilters();
initEducationTimeline();
initScrollEffects();
initInterestTyping();
observeReveals();
document.querySelector("#current-year").textContent = new Date().getFullYear();
