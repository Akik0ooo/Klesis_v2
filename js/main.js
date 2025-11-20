document.addEventListener("DOMContentLoaded", () => {
  const storage = window.KlesisStorage;
  if (!storage) {
    console.warn("KlesisStorage no está disponible");
    return;
  }

  const currentUser = storage.loadActiveUser();
  const redirected = enforceAccess(currentUser);
  if (redirected) {
    return;
  }

  const activeSegment = currentUser?.segment ?? null;

  configureBrandLink();
  configureNavigation(storage, currentUser);
  activateDropdowns();
  toggleLanding(activeSegment);
  initSupportForm(currentUser);
});

function configureBrandLink() {
  const brand = document.querySelector(".nav__brand");
  if (!brand) {
    return;
  }
  brand.setAttribute("href", resolvePath("index.html"));
}

function configureNavigation(storage, currentUser) {
  const navLinks = document.querySelector(".nav__links");
  const navActions = document.querySelector(".nav__actions");
  const activeSegment = currentUser?.segment ?? null;

  if (navLinks) {
    const linkConfig = getNavLinkConfig(activeSegment);
    navLinks.innerHTML = "";
    const currentFile = getCurrentFileName();

    linkConfig.forEach((item) => {
      const link = document.createElement("a");
      link.href = resolvePath(item.path);
      link.textContent = item.label;
      if (item.match && currentFile === item.match) {
        link.setAttribute("aria-current", "page");
      }
      navLinks.appendChild(link);
    });
  }

  if (navActions) {
    navActions.innerHTML = "";

    const dropdown = createDropdown(activeSegment);
    if (dropdown) {
      navActions.appendChild(dropdown);
    }

    if (currentUser) {
      const profileLink = document.createElement("a");
      profileLink.className = "nav__profile";
      profileLink.href = resolvePath("page/perfil/perfil.html");
      profileLink.setAttribute("aria-live", "polite");
      profileLink.textContent = `Hola, ${getFriendlyName(currentUser)}`;
      navActions.appendChild(profileLink);

      const primaryCta = document.createElement("a");
      primaryCta.className = "btn btn--primary";
      primaryCta.href = resolvePath(
        currentUser.segment === "adult"
          ? "page/tarea/vocacional.html"
          : "page/tarea/otros-test.html"
      );
      primaryCta.textContent = currentUser.segment === "adult" ? "Ver plan profesional" : "Ir a misiones";
      navActions.appendChild(primaryCta);

      const logout = document.createElement("button");
      logout.className = "btn btn--outline";
      logout.type = "button";
      logout.setAttribute("data-logout", "true");
      logout.textContent = "Salir";
      navActions.appendChild(logout);
    } else {
      const primaryCta = document.createElement("a");
      primaryCta.className = "btn btn--primary";
      primaryCta.href = resolvePath("page/auth/segment.html");
      primaryCta.textContent = "Crear cuenta";
      navActions.appendChild(primaryCta);
    }

    if (!navActions.dataset.logoutBound) {
      navActions.addEventListener("click", (event) => {
        const logoutTrigger = event.target.closest("[data-logout]");
        if (!logoutTrigger) {
          return;
        }
        storage.saveCurrentUser(null);
        storage.saveSessionUser(null);
        window.location.href = resolvePath("index.html");
      });
      navActions.dataset.logoutBound = "true";
    }
  }
}

function createDropdown(segment) {
  const items = getDropdownItems(segment);
  if (!items.length) {
    return null;
  }

  const dropdown = document.createElement("div");
  dropdown.className = "nav__dropdown";
  dropdown.setAttribute("data-dropdown", "");

  const toggle = document.createElement("button");
  toggle.className = "btn btn--outline nav__dropdown-toggle";
  toggle.type = "button";
  toggle.setAttribute("data-dropdown-toggle", "");
  toggle.setAttribute("aria-haspopup", "true");
  toggle.setAttribute("aria-expanded", "false");
  toggle.setAttribute("aria-controls", "navExploreMenu");
  const label = document.createElement("span");
  label.textContent = "Explorar";

  const icon = document.createElement("span");
  icon.className = "nav__dropdown-icon";
  icon.setAttribute("aria-hidden", "true");
  icon.textContent = "▾";
  toggle.append(label, icon);

  const menu = document.createElement("div");
  menu.className = "nav__dropdown-menu hidden";
  menu.id = "navExploreMenu";
  menu.setAttribute("role", "menu");
  menu.setAttribute("data-dropdown-menu", "");

  items.forEach((item) => {
    const link = document.createElement("a");
    link.setAttribute("role", "menuitem");
    link.href = resolvePath(item.path);
    link.textContent = item.label;
    menu.appendChild(link);
  });

  dropdown.append(toggle, menu);
  return dropdown;
}

function activateDropdowns() {
  const dropdowns = document.querySelectorAll("[data-dropdown]");
  dropdowns.forEach((dropdown) => {
    if (dropdown.dataset.dropdownInitialized === "true") {
      return;
    }
    const toggle = dropdown.querySelector("[data-dropdown-toggle]");
    const menu = dropdown.querySelector("[data-dropdown-menu]");
    if (!toggle || !menu) {
      return;
    }

    const closeMenu = () => {
      menu.classList.add("hidden");
      dropdown.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    };

    const openMenu = () => {
      menu.classList.remove("hidden");
      dropdown.classList.add("is-open");
      toggle.setAttribute("aria-expanded", "true");
    };

    toggle.addEventListener("click", (event) => {
      event.preventDefault();
      const isHidden = menu.classList.contains("hidden");
      if (isHidden) {
        openMenu();
      } else {
        closeMenu();
      }
    });

    menu.addEventListener("click", () => {
      closeMenu();
    });

    document.addEventListener("click", (event) => {
      if (!dropdown.contains(event.target)) {
        closeMenu();
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    });

    dropdown.dataset.dropdownInitialized = "true";
  });
}

function toggleLanding(segment) {
  const views = document.querySelectorAll("[data-segment-view]");
  if (!views.length) {
    return;
  }

  views.forEach((view) => {
    const target = view.getAttribute("data-segment-view");
    const shouldShow = segment ? segment === target : target === "guest";
    view.classList.toggle("hidden", !shouldShow);
  });
}

function initSupportForm(currentUser) {
  const form = document.getElementById("supportForm");
  if (!form) {
    return;
  }

  const segmentSelect = form.querySelector("#supportSegment");
  const copy = form.querySelector("[data-support-copy]");
  const adultEmailField = form.querySelector('[data-support-role="adult-email"]');
  const guardianNameField = form.querySelector('[data-support-role="guardian-name"]');
  const guardianEmailField = form.querySelector('[data-support-role="guardian-email"]');

  const applySegment = (value) => {
    const isMinor = value === "minor";
    toggleSupportField(adultEmailField, !isMinor, !isMinor);
    toggleSupportField(guardianNameField, isMinor, isMinor);
    toggleSupportField(guardianEmailField, isMinor, isMinor);

    if (copy) {
      copy.textContent = isMinor
        ? "Completa este formulario solo si eres el tutor responsable del menor."
        : "Cuéntanos cómo podemos ayudarte con tu plan profesional.";
    }
  };

  if (currentUser?.segment) {
    segmentSelect.value = currentUser.segment;
    segmentSelect.disabled = true;
  }

  applySegment(segmentSelect.value);

  segmentSelect.addEventListener("change", (event) => {
    applySegment(event.target.value);
  });
}

function toggleSupportField(wrapper, shouldShow, shouldRequire) {
  if (!wrapper) {
    return;
  }
  wrapper.classList.toggle("hidden", !shouldShow);
  const input = wrapper.querySelector("[data-support-input]");
  if (input) {
    input.required = shouldRequire;
    if (!shouldShow) {
      input.value = "";
    }
  }
}

function enforceAccess(currentUser) {
  const requireAuth = document.body?.getAttribute("data-require-auth") === "true";
  if (requireAuth && !currentUser) {
    window.location.href = resolvePath("page/auth/segment.html");
    return true;
  }

  const requiredSegment = document.body?.getAttribute("data-require-segment");
  if (!requiredSegment) {
    return false;
  }

  if (!currentUser) {
    window.location.href = resolvePath("page/auth/segment.html");
    return true;
  }

  if (currentUser.segment === requiredSegment) {
    return false;
  }

  const fallbackPath = currentUser.segment === "adult"
    ? "page/tarea/vocacional.html"
    : "page/tarea/otros-test.html";
  window.location.href = resolvePath(fallbackPath);
  return true;
}

function getNavLinkConfig(segment) {
  const guestLinks = [
    { label: "Autenticación", path: "page/auth/segment.html", match: "segment.html" },
    { label: "Plan profesional", path: "page/tarea/vocacional.html", match: "vocacional.html" },
    { label: "Misiones", path: "page/tarea/otros-test.html", match: "otros-test.html" },
    { label: "Atención", path: "page/soporte/atencion.html", match: "atencion.html" },
  ];

  const adultLinks = [
    { label: "Plan profesional", path: "page/tarea/vocacional.html", match: "vocacional.html" },
    { label: "Perfil", path: "page/perfil/perfil.html", match: "perfil.html" },
    { label: "Foro (adultos)", path: "page/foro.html", match: "foro.html" },
    { label: "Soporte", path: "page/soporte/atencion.html", match: "atencion.html" },
  ];

  const minorLinks = [
    { label: "Misiones", path: "page/tarea/otros-test.html", match: "otros-test.html" },
    { label: "Perfil", path: "page/perfil/perfil.html", match: "perfil.html" },
    { label: "Zona segura", path: "page/soporte/atencion.html", match: "atencion.html" },
  ];

  if (segment === "adult") {
    return adultLinks;
  }
  if (segment === "minor") {
    return minorLinks;
  }
  return guestLinks;
}

function getDropdownItems(segment) {
  if (segment === "adult") {
    return [
      { label: "Mi perfil", path: "page/perfil/perfil.html" },
      { label: "Buscar carreras", path: "page/perfil/perfil.html?buscar=carreras" },
      { label: "Evaluación profesional", path: "page/tarea/vocacional.html" },
      { label: "Foro (adultos)", path: "page/foro.html" },
      { label: "Solicitar mentoría", path: "page/soporte/atencion.html" },
    ];
  }

  if (segment === "minor") {
    return [
      { label: "Mi perfil", path: "page/perfil/perfil.html" },
      { label: "Buscar carreras", path: "page/perfil/perfil.html?buscar=carreras" },
      { label: "Misiones activas", path: "page/tarea/otros-test.html" },
      { label: "Zona segura", path: "page/soporte/atencion.html" },
      { label: "Cambiar de cuenta", path: "page/auth/login_menor.html" },
    ];
  }

  return [
    { label: "Modo adulto", path: "page/tarea/vocacional.html" },
    { label: "Modo aventura", path: "page/tarea/otros-test.html" },
    { label: "Atención al cliente", path: "page/soporte/atencion.html" },
    { label: "Foro (adultos)", path: "page/foro.html" },
  ];
}

function getFriendlyName(user) {
  return user?.displayName || user?.firstName || user?.nickname || "Usuario";
}

function resolvePath(relative) {
  if (!relative) {
    return relative;
  }
  const base = document.body?.getAttribute("data-base-path") ?? "";
  if (!base) {
    return relative;
  }
  const normalizedBase = base.endsWith("/") ? base : `${base}/`;
  return `${normalizedBase}${relative}`;
}

function getCurrentFileName() {
  const segments = window.location.pathname.replace(/\\/g, "/").split("/").filter(Boolean);
  if (!segments.length) {
    return "index.html";
  }
  const lastSegment = segments[segments.length - 1];
  if (!lastSegment.includes(".")) {
    return "index.html";
  }
  return lastSegment;
}
