(function () {
  const RECOMMENDATION_MAP = {
    Creatividad: {
      title: "┬íPoder creativo!",
      careers: ["Dise├▒o gr├ífico", "Arquitectura", "Animaci├│n digital", "Producci├│n multimedia"],
      copy: "Tu perfil resalta habilidades expresivas y la capacidad de imaginar soluciones. Explora proyectos que te permitan materializar ideas." 
    },
    Social: {
      title: "┬íPoder de conexi├│n!",
      careers: ["Psicolog├¡a", "Docencia", "Trabajo social", "Medicina"],
      copy: "Te energiza trabajar con personas y generar impacto positivo. Busca espacios de acompa├▒amiento, liderazgo comunitario o bienestar." 
    },
    Ciencia: {
      title: "┬íPoder de ingenio!",
      careers: ["Ingenier├¡a", "Desarrollo de software", "Biotecnolog├¡a", "Matem├íticas aplicadas"],
      copy: "Disfrutas comprender c├│mo funcionan las cosas y mejorar procesos. Los entornos STEM pueden impulsarte al siguiente nivel." 
    },
    Liderazgo: {
      title: "┬íPoder de estrategia!",
      careers: ["Administraci├│n", "Gesti├│n de proyectos", "Emprendimiento", "Pol├¡ticas p├║blicas"],
      copy: "Tienes visi├│n para coordinar equipos y tomar decisiones. Canales como la direcci├│n de proyectos o el emprendimiento se ajustan a tu perfil." 
    },
    Visual: {
      title: "Estilo visual destacado",
      careers: ["UX/UI", "Marketing digital", "Arquitectura", "Ilustraci├│n"],
      copy: "Procesas informaci├│n mejor con est├¡mulos visuales. Utiliza diagramas, mapas mentales y tableros para mantener el enfoque." 
    },
    Auditivo: {
      title: "Estilo auditivo protagonista",
      careers: ["Mentor├¡a", "Docencia", "Comunicaci├│n", "Coaching"],
      copy: "Aprendes escuchando, dialogando y relatando. Ap├│yate en podcasts, foros y actualizaciones por voz para reforzar tu aprendizaje." 
    },
    "Kinest├®sico": {
      title: "Estilo kinest├®sico activo",
      careers: ["Fisioterapia", "Ergonom├¡a", "Dise├▒o de experiencias", "Log├¡stica"],
      copy: "Necesitas acci├│n para consolidar conocimientos. Incorpora prototipos, simulaciones y rutinas pr├ícticas en tu plan de carrera." 
    },
    "L├│gico": {
      title: "Estilo l├│gico estrat├®gico",
      careers: ["Consultor├¡a", "An├ílisis de datos", "Product Management", "Planeaci├│n financiera"],
      copy: "Tu mente busca estructuras y racionalidad. Dise├▒a sistemas con m├®tricas, hip├│tesis y tableros comparativos para tomar decisiones." 
    }
  };

  document.addEventListener("DOMContentLoaded", () => {
    const storage = window.KlesisStorage;
    const catalog = window.CareersCatalog;
    if (!storage) {
      console.warn("KlesisStorage no est├í disponible en perfil.js");
      return;
    }

    const activeUser = storage.loadActiveUser();
    if (!activeUser?.id) {
      return;
    }

    const persistedUser = storage.findUserById(activeUser.id);
    if (!persistedUser) {
      console.warn("No encontramos la informaci├│n completa del usuario activo");
      return;
    }

    const state = {
      storage,
      catalog,
      user: storage.withUserDefaults({ ...persistedUser }),
      chart: null,
      editExpanded: false
    };

    hydrateProfileSummary(state);
    bindIdentityForm(state);
    bindPasswordForm(state);
    bindFavorites(state);
    bindComparisons(state);
    bindFollow(state);
    bindAccountClose(state);
    renderInterestProfile(state);
    bindCareerSearch(state);
  });

  function hydrateProfileSummary(state) {
    const { user } = state;
    const segmentLabel = user.segment === "adult" ? "Mayor de edad" : user.segment === "minor" ? "Menor de edad" : "Invitado";

    const avatarNode = document.querySelector("[data-profile-avatar]");
    const nameNode = document.querySelector("[data-profile-name]");
    const badgeNode = document.querySelector("[data-profile-segment]");
    const roleNode = document.querySelector("[data-profile-role]");
    const idNode = document.querySelector("[data-profile-identifier]");
    const followingNode = document.querySelector("[data-profile-following]");
    const updatedNode = document.querySelector("[data-profile-updated]");

    if (badgeNode) {
      badgeNode.textContent = segmentLabel;
    }

    if (nameNode) {
      nameNode.textContent = user.displayName || user.firstName || user.nickname || "Usuario";
    }

    if (roleNode) {
      if (user.segment === "adult") {
        roleNode.textContent = "Construye tu tablero profesional y comparte hallazgos con otros mentores.";
      } else if (user.segment === "minor") {
        roleNode.textContent = "Personaliza tu aventura vocacional y guarda tus misiones favoritas.";
      } else {
        roleNode.textContent = "Configura tu perfil para desbloquear recomendaciones a tu medida.";
      }
    }

    if (idNode) {
      const identifier = user.segment === "adult" ? user.email : user.nickname;
      idNode.textContent = identifier ? `Cuenta: ${identifier}` : "";
    }

    if (followingNode) {
      const count = Array.isArray(user.followingIds) ? user.followingIds.length : 0;
      followingNode.textContent = count ? `Siguiendo a ${count} perfil${count === 1 ? "" : "es"}` : "A├║n no sigues a nadie";
    }

    if (updatedNode) {
      const updatedAt = user.updatedAt || user.createdAt;
      updatedNode.textContent = updatedAt ? `├Ültima actualizaci├│n: ${formatDate(updatedAt)}` : "";
    }

    updateAvatarNode(avatarNode, user);

    populateIdentityForm(user);
    renderFavoriteCareers(state);
    renderComparisons(state);
    renderFollowing(state);
    bindEditToggle(state);
  }

  function updateAvatarNode(node, user) {
    if (!node) {
      return;
    }

    node.innerHTML = "";

    if (user.avatarUrl) {
      const img = document.createElement("img");
      img.src = user.avatarUrl;
      img.alt = `Avatar de ${user.displayName || user.firstName || "usuario"}`;
      img.addEventListener("error", () => {
        node.innerHTML = getAvatarInitials(user);
      });
      node.appendChild(img);
      return;
    }

    node.textContent = getAvatarInitials(user);
  }

  function getAvatarInitials(user) {
    const source = user.displayName || user.firstName || user.nickname || "K";
    return source.substring(0, 2).toUpperCase();
  }

  function populateIdentityForm(user) {
    const form = document.querySelector("[data-identity-form]");
    if (!form) {
      return;
    }
    form.querySelector("[name='firstName']").value = user.firstName || "";
    form.querySelector("[name='lastName']").value = user.lastName || "";
    form.querySelector("[name='displayName']").value = user.displayName || "";
    form.querySelector("[name='avatarUrl']").value = user.avatarUrl || "";
  }

  function bindIdentityForm(state) {
    const form = document.querySelector("[data-identity-form]");
    if (!form) {
      return;
    }

    const feedbackNode = form.querySelector("[data-identity-feedback]");

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      clearFeedback(feedbackNode);

      const formData = new FormData(form);
      const firstName = state.storage.sanitize(formData.get("firstName"));
      const lastName = state.storage.sanitize(formData.get("lastName"));
      const displayName = state.storage.sanitize(formData.get("displayName"));
      const avatarUrl = state.storage.sanitize(formData.get("avatarUrl"));

      if (!displayName) {
        setFeedback(feedbackNode, "Agrega un nombre para mostrar.", "error");
        return;
      }

      state.user.firstName = firstName || null;
      state.user.lastName = lastName || null;
      state.user.displayName = displayName;
      state.user.avatarUrl = avatarUrl || null;
      state.user.updatedAt = new Date().toISOString();

      persistUser(state);
      hydrateProfileSummary(state);
      setFeedback(feedbackNode, "Perfil actualizado correctamente.", "success");
    });
  }

  function bindPasswordForm(state) {
    const form = document.querySelector("[data-password-form]");
    if (!form) {
      return;
    }

    const feedbackNode = form.querySelector("[data-password-feedback]");

    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      clearFeedback(feedbackNode);

      const formData = new FormData(form);
      const currentPassword = String(formData.get("currentPassword"));
      const newPassword = String(formData.get("newPassword"));
      const confirmPassword = String(formData.get("confirmPassword"));

      if (!currentPassword || !newPassword || !confirmPassword) {
        setFeedback(feedbackNode, "Completa los tres campos para continuar.", "error");
        return;
      }

      const currentHash = await state.storage.hashPassword(currentPassword);
      if (currentHash !== state.user.passwordHash) {
        setFeedback(feedbackNode, "La contrase├▒a actual no coincide.", "error");
        return;
      }

      if (newPassword !== confirmPassword) {
        setFeedback(feedbackNode, "La confirmaci├│n no coincide.", "error");
        return;
      }

      if (!isStrongPassword(newPassword)) {
        setFeedback(feedbackNode, "La contrase├▒a debe tener al menos 8 caracteres, letras y n├║meros.", "error");
        return;
      }

      state.user.passwordHash = await state.storage.hashPassword(newPassword);
      state.user.updatedAt = new Date().toISOString();

      persistUser(state);
      form.reset();
      setFeedback(feedbackNode, "Contrase├▒a actualizada.", "success");
    });
  }

  function bindFavorites(state) {
    const listNode = document.querySelector("[data-favorite-list]");
    const emptyState = document.querySelector("[data-favorite-empty]");
    const chartWrapper = document.querySelector("[data-favorite-chart-wrapper]");
    const chartEmpty = document.querySelector("[data-favorite-chart-empty]");
    if (!listNode || !emptyState) {
      return;
    }

    listNode.addEventListener("click", (event) => {
      const star = event.target.closest("[data-career-star]");
      if (!star) {
        const detailBtn = event.target.closest("[data-career-details]");
        if (detailBtn) {
          const careerId = detailBtn.getAttribute("data-career-details");
          openCareerModal(state, careerId);
        }
        const legacyRemove = event.target.closest("[data-remove-legacy]");
        if (legacyRemove) {
          const legacyValue = legacyRemove.getAttribute("data-remove-legacy");
          state.user.favoriteCareers = (state.user.favoriteCareers || []).filter((item) => item !== legacyValue);
          state.user.updatedAt = new Date().toISOString();
          persistUser(state);
          renderFavoriteCareers(state);
        }
        return;
      }
      const careerId = star.getAttribute("data-career-star");
      toggleFavorite(state, careerId);
    });

    renderFavoriteCareers(state, { listNode, emptyState, chartWrapper, chartEmpty });
  }

  function renderFavoriteCareers(state, cache) {
    const listNode = cache?.listNode ?? document.querySelector("[data-favorite-list]");
    const emptyState = cache?.emptyState ?? document.querySelector("[data-favorite-empty]");
    const chartWrapper = cache?.chartWrapper ?? document.querySelector("[data-favorite-chart-wrapper]");
    const chartEmpty = cache?.chartEmpty ?? document.querySelector("[data-favorite-chart-empty]");

    if (!listNode || !emptyState) {
      return;
    }

    listNode.innerHTML = "";
    const items = Array.isArray(state.user.favoriteCareers) ? state.user.favoriteCareers : [];

    if (!items.length) {
      emptyState.classList.remove("hidden");
      chartWrapper?.classList.add("hidden");
      chartEmpty?.classList.remove("hidden");
      return;
    }

    emptyState.classList.add("hidden");

    const careers = [];
    const legacy = [];
    items.forEach((raw) => {
      const career = typeof raw === "string" ? state.catalog?.find(raw) : null;
      if (career) {
        careers.push(career);
      } else if (raw) {
        legacy.push(String(raw));
      }
    });

    if (!careers.length && !legacy.length) {
      chartWrapper?.classList.add("hidden");
      chartEmpty?.classList.remove("hidden");
      listNode.innerHTML = "<p>No pudimos cargar tus carreras. Intenta buscarlas nuevamente.</p>";
      return;
    }

    if (!careers.length && legacy.length) {
      chartWrapper?.classList.add("hidden");
      chartEmpty?.classList.remove("hidden");
    } else {
      chartEmpty?.classList.add("hidden");
    }

    careers.forEach((career) => {
      const card = document.createElement("article");
      card.className = "favorite-card";
      card.setAttribute("role", "listitem");
      card.innerHTML = `
        <button class="career-star" type="button" data-career-star="${career.id}" data-active="true" aria-pressed="true" aria-label="Quitar ${career.name}">
          Ô¡É
        </button>
        <div class="favorite-card__header">
          <span class="favorite-card__emoji">${career.emoji}</span>
          <div>
            <h3 class="favorite-card__title">${career.name}</h3>
            <p class="favorite-card__copy">${career.summary}</p>
          </div>
        </div>
        <div class="favorite-card__meta">
          <span><strong>Costo estimado:</strong> ${formatCost(career.estimatedCost)}</span>
          <span><strong>Regiones:</strong> ${career.worldRegions.join(", ")}</span>
        </div>
        ${renderCompatibilitySection(career)}
        <ul class="favorite-card__universities">
          ${career.universities
            .map((item) => `<li>${item.name}<span>${item.country}</span></li>`)
            .join("")}
        </ul>
        <div class="favorite-card__footer">
          <small>Actualizado ${formatDate(state.user.updatedAt)}</small>
          <button class="btn btn--outline btn--ghost" type="button" data-career-details="${career.id}">Ver detalles</button>
        </div>
      `;
      listNode.appendChild(card);
    });

    if (legacy.length) {
      legacy.forEach((item) => {
        const card = document.createElement("article");
        card.className = "favorite-card favorite-card--legacy";
        card.setAttribute("role", "listitem");
        card.innerHTML = `
          <div class="favorite-card__header">
            <span class="favorite-card__emoji">­ƒôî</span>
            <div>
              <h3 class="favorite-card__title">${item}</h3>
              <p class="favorite-card__copy">Este elemento fue agregado manualmente. Usa el buscador para reemplazarlo por una carrera oficial.</p>
            </div>
          </div>
          <div class="favorite-card__footer">
            <button class="btn btn--ghost" type="button" data-remove-legacy="${item}">Eliminar</button>
          </div>
        `;
        listNode.appendChild(card);
      });
    }

    renderFavoriteChart(state, careers, { chartWrapper, chartEmpty });
  }

  function renderFavoriteChart(state, careers, cache) {
    const wrapper = cache?.chartWrapper ?? document.querySelector("[data-favorite-chart-wrapper]");
    const chartEmpty = cache?.chartEmpty ?? document.querySelector("[data-favorite-chart-empty]");
    const canvas = wrapper?.querySelector("[data-favorite-chart]");
    if (!wrapper || !canvas || typeof Chart === "undefined") {
      return;
    }

    if (!careers.length) {
      wrapper.classList.add("hidden");
      chartEmpty?.classList.remove("hidden");
      return;
    }

    wrapper.classList.remove("hidden");
    chartEmpty?.classList.add("hidden");

    const userSegment = state.user.segment === "adult" ? "adult" : "minor";
    const orientation = userSegment === "adult" ? "vertical" : "horizontal";

    const labels = [];
    const values = [];
    const colors = [];

    careers.forEach((career) => {
      const best = career.focusAreas?.[0] || { emoji: "Ô¡É", value: 50, color: "#2563eb" };
      labels.push(`${best.emoji} ${career.name}`);
      values.push(best.value);
      colors.push(best.color);
    });

    if (canvas._favoriteChart) {
      canvas._favoriteChart.destroy();
    }

    canvas._favoriteChart = new Chart(canvas.getContext("2d"), {
      type: "bar",
      data: {
        labels,
        datasets: [
          {
            label: "Compatibilidad",
            data: values,
            backgroundColor: colors,
            borderRadius: 12,
            barThickness: orientation === "horizontal" ? 26 : undefined,
            maxBarThickness: 32
          }
        ]
      },
      options: {
        indexAxis: orientation === "horizontal" ? "y" : "x",
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            beginAtZero: true,
            suggestedMax: 100,
            grid: {
              borderDash: [4, 4]
            }
          },
          y: {
            beginAtZero: true,
            grid: {
              borderDash: [4, 4]
            }
          }
        },
        plugins: {
          legend: {
            display: false
          }
        }
      }
    });
  }

  function formatCost(cost) {
    switch (cost) {
      case "bajo":
        return "Bajo";
      case "medio":
        return "Medio";
      case "alto":
        return "Alto";
      default:
        return "N/A";
    }
  }

  function renderCompatibilitySection(career) {
    const focus = Array.isArray(career.focusAreas) ? career.focusAreas.slice(0, 3) : [];
    if (!focus.length) {
      return "";
    }
    const primary = focus[0];
    const width = Math.min(Math.max(primary.value || 0, 0), 100);
    const gradient = `linear-gradient(135deg, ${primary.color}, ${shadeColor(primary.color, 18)})`;
    const tags = focus
      .map((area) => `<li>${area.emoji || "Ô¡É"} ${area.label}</li>`)
      .join("");
    return `
      <div class="favorite-card__meter" aria-hidden="true">
        <div class="favorite-card__meter-bar" style="width: ${width}%; background: ${gradient}"></div>
      </div>
      <ul class="favorite-card__tags">${tags}</ul>
    `;
  }

  function shadeColor(hex, percent) {
    const num = parseInt(hex.replace("#", ""), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) + amt;
    const G = ((num >> 8) & 0x00ff) + amt;
    const B = (num & 0x0000ff) + amt;
    return `#${(
      0x1000000 + (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
      (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
      (B < 255 ? (B < 1 ? 0 : B) : 255)
    )
      .toString(16)
      .slice(1)}`;
  }

  function toggleFavorite(state, careerId) {
    if (!careerId) {
      return;
    }

    if (!Array.isArray(state.user.favoriteCareers)) {
      state.user.favoriteCareers = [];
    }

    const exists = state.user.favoriteCareers.includes(careerId);
    if (exists) {
      state.user.favoriteCareers = state.user.favoriteCareers.filter((id) => id !== careerId);
    } else {
      if (!state.catalog?.find(careerId)) {
        return;
      }
      state.user.favoriteCareers.push(careerId);
    }

    state.user.updatedAt = new Date().toISOString();
    persistUser(state);
    renderFavoriteCareers(state);
    updateModalFavoriteState(state, careerId);
    document.dispatchEvent(new CustomEvent("favorite:updated"));
  }

  function bindCareerSearch(state) {
    const openButtons = document.querySelectorAll("[data-career-search-open]");
    const overlay = document.querySelector("[data-career-search-overlay]");
    const closeBtn = document.querySelector("[data-career-search-close]");
    const form = document.querySelector("[data-career-search-form]");
    const resultsNode = document.querySelector("[data-career-search-results]");
    const universitySelect = document.querySelector("[data-career-search-university]");
    if (!overlay || !resultsNode || !form || !state.catalog) {
      return;
    }

    const openOverlay = () => {
      overlay.setAttribute("data-open", "true");
      renderSearchResults();
      const queryInput = form.querySelector("[data-career-search-query]");
      if (queryInput) {
        setTimeout(() => queryInput.focus(), 50);
      }
    };

    openButtons.forEach((button) => {
      button.addEventListener("click", () => {
        openOverlay();
      });
    });

    closeBtn?.addEventListener("click", () => overlay.removeAttribute("data-open"));
    overlay.addEventListener("click", (event) => {
      if (event.target === overlay) {
        overlay.removeAttribute("data-open");
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        overlay.removeAttribute("data-open");
        closeCareerModal();
      }
    });

    const universities = state.catalog.universities();
    universities.forEach((item) => {
      const option = document.createElement("option");
      option.value = item.name;
      option.textContent = `${item.name} (${item.country})`;
      universitySelect?.appendChild(option);
    });

    form.addEventListener("input", () => renderSearchResults());
    document.addEventListener("favorite:updated", renderSearchResults);

    resultsNode.addEventListener("click", (event) => {
      const detailBtn = event.target.closest("[data-career-details]");
      const favoriteBtn = event.target.closest("[data-career-star]");
      if (detailBtn) {
        openCareerModal(state, detailBtn.getAttribute("data-career-details"));
      }
      if (favoriteBtn) {
        const id = favoriteBtn.getAttribute("data-career-star");
        toggleFavorite(state, id);
      }
    });

    if (shouldAutoOpenCareerSearch()) {
      setTimeout(() => {
        openOverlay();
        consumeAutoOpenCareerSearch();
      }, 0);
    }

    function renderSearchResults() {
      const query = form.querySelector("[data-career-search-query]")?.value || "";
      const university = universitySelect?.value || "all";
      const cost = form.querySelector("[data-career-search-cost]")?.value || "all";
      const segment = state.user.segment === "adult" ? "adult" : "minor";

      const list = state.catalog.filter({ query, university, cost, segment });

      resultsNode.innerHTML = "";

      if (!list.length) {
        resultsNode.innerHTML = "<p>No encontramos carreras para tu b├║squeda.</p>";
        return;
      }

      list.forEach((career) => {
        const card = document.createElement("article");
        card.className = "career-search__item";
        const isFavorite = Array.isArray(state.user.favoriteCareers) && state.user.favoriteCareers.includes(career.id);
        card.innerHTML = `
          <button class="career-star" type="button" data-career-star="${career.id}" data-active="${isFavorite}" aria-pressed="${isFavorite}">
            ${isFavorite ? "Ô¡É" : "Ôÿå"}
          </button>
          <div class="favorite-card__header">
            <span class="favorite-card__emoji">${career.emoji}</span>
            <div>
              <h3 class="favorite-card__title">${career.name}</h3>
              <p class="favorite-card__copy">${career.summary}</p>
            </div>
          </div>
          <div class="career-search__meta">
            <span><strong>Costo estimado:</strong> ${formatCost(career.estimatedCost)}</span>
            <span><strong>Regiones:</strong> ${career.worldRegions.join(", ")}</span>
          </div>
          <ul class="career-search__universities">
            ${career.universities
              .map((item) => `<li>${item.name}<span>${item.country}</span></li>`)
              .join("")}
          </ul>
          <div class="career-search__actions">
            <button class="btn btn--outline" type="button" data-career-details="${career.id}">Ver m├ís detalles</button>
            <button class="btn btn--ghost" type="button" data-career-star="${career.id}">
              ${isFavorite ? "Quitar" : "A├▒adir"} Ô¡É
            </button>
          </div>
        `;
        resultsNode.appendChild(card);
      });
    }
  }

  function openCareerModal(state, careerId) {
    const modal = document.querySelector("[data-career-modal]");
    if (!modal || !state.catalog) {
      return;
    }

    const career = state.catalog.find(careerId);
    if (!career) {
      return;
    }

    const emojiNode = modal.querySelector("[data-career-modal-emoji]");
    const titleNode = modal.querySelector("[data-career-modal-title]");
    const summaryNode = modal.querySelector("[data-career-modal-summary]");
    const universitiesNode = modal.querySelector("[data-career-modal-universities]");
    const tagsNode = modal.querySelector("[data-career-modal-tags]");
    const favoriteBtn = modal.querySelector("[data-career-modal-favorite]");
    const favoriteLabel = modal.querySelector("[data-career-modal-favorite-label]");

    if (emojiNode) {
      emojiNode.textContent = career.emoji;
    }
    if (titleNode) {
      titleNode.textContent = career.name;
    }
    if (summaryNode) {
      summaryNode.textContent = career.summary;
    }

    if (universitiesNode) {
      universitiesNode.innerHTML = career.universities
        .map((item) => `<li>${item.name} ┬À ${item.country} (${formatCost(item.cost)})</li>`)
        .join("");
    }

    if (tagsNode) {
      tagsNode.innerHTML = career.compatibilityTags
        .map((tag) => `<li>${tag}</li>`)
        .join("");
    }

    if (favoriteBtn) {
      favoriteBtn.setAttribute("data-career-id", career.id);
      favoriteBtn.onclick = () => toggleFavorite(state, career.id);
    }

    updateModalFavoriteState(state, career.id, { favoriteLabel, favoriteBtn });

    modal.setAttribute("data-open", "true");
  }

  function updateModalFavoriteState(state, careerId, cache) {
    const modal = document.querySelector("[data-career-modal]");
    if (!modal && !cache) {
      return;
    }
    const favoriteBtn = cache?.favoriteBtn ?? modal?.querySelector("[data-career-modal-favorite]");
    const favoriteLabel = cache?.favoriteLabel ?? modal?.querySelector("[data-career-modal-favorite-label]");
    if (!favoriteBtn || !favoriteLabel) {
      return;
    }
    const isFavorite = Array.isArray(state.user.favoriteCareers) && state.user.favoriteCareers.includes(careerId);
    favoriteBtn.setAttribute("data-active", isFavorite ? "true" : "false");
    favoriteLabel.textContent = isFavorite ? "Quitar de favoritos" : "A├▒adir a favoritos";
  }

  function closeCareerModal() {
    const modal = document.querySelector("[data-career-modal]");
    if (modal) {
      modal.removeAttribute("data-open");
    }
  }

  const modalCloseBtn = document.querySelector("[data-career-modal-close]");
  if (modalCloseBtn) {
    modalCloseBtn.addEventListener("click", closeCareerModal);
  }

  document.addEventListener("click", (event) => {
    const modal = document.querySelector("[data-career-modal]");
    if (!modal) {
      return;
    }
    if (event.target === modal) {
      closeCareerModal();
    }
  });

  function bindAccountClose(state) {
    const section = document.querySelector("[data-account-close-card]");
    const button = section?.querySelector("[data-account-close]");
    const feedbackNode = section?.querySelector("[data-account-close-feedback]");
    if (!section || !button) {
      return;
    }

    const isMinor = state.user.segment === "minor";
    section.classList.toggle("hidden", !isMinor);
    if (!isMinor) {
      return;
    }

    if (button.dataset.bound === "true") {
      return;
    }

    button.addEventListener("click", () => {
      clearFeedback(feedbackNode);
      const confirmed = window.confirm(
        "┬┐Seguro que deseas cerrar tu cuenta? Esta acci├│n eliminar├í tus resultados, favoritos y progreso."
      );
      if (!confirmed) {
        return;
      }

      const deleted = state.storage.deleteUser(state.user.id);
      if (!deleted) {
        setFeedback(feedbackNode, "No pudimos cerrar tu cuenta. Intenta nuevamente.", "error");
        return;
      }

      state.storage.saveCurrentUser(null);
      state.storage.saveSessionUser(null);
      window.location.href = resolveProfilePath("page/auth/segment.html");
    });

    button.dataset.bound = "true";
  }

  function shouldAutoOpenCareerSearch() {
    const params = new URLSearchParams(window.location.search);
    const indicator = String(params.get("buscar") || "").toLowerCase();
    if (indicator === "carreras") {
      return true;
    }
    return window.location.hash?.toLowerCase() === "#buscar-carreras";
  }

  function consumeAutoOpenCareerSearch() {
    const url = new URL(window.location.href);
    let changed = false;
    if (url.searchParams.has("buscar")) {
      url.searchParams.delete("buscar");
      changed = true;
    }
    if (url.hash && url.hash.toLowerCase() === "#buscar-carreras") {
      url.hash = "";
      changed = true;
    }
    if (changed) {
      const search = url.searchParams.toString();
      const next = url.pathname + (search ? `?${search}` : "") + (url.hash || "");
      window.history.replaceState(null, "", next);
    }
  }

  function bindComparisons(state) {
    const form = document.querySelector("[data-comparison-form]");
    if (!form) {
      return;
    }

    const listNode = document.querySelector("[data-comparison-list]");
    const emptyState = document.querySelector("[data-comparison-empty]");
    const feedbackNode = form.querySelector("[data-comparison-feedback]");

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      clearFeedback(feedbackNode);

      const formData = new FormData(form);
      const title = state.storage.sanitize(formData.get("title"));
      const notes = state.storage.sanitize(formData.get("notes"));

      if (!title && !notes) {
        setFeedback(feedbackNode, "Completa al menos el nombre o las notas.", "error");
        return;
      }

      const record = {
        id: state.storage.generateId(),
        title: title || "Carrera sin t├¡tulo",
        notes: notes || "",
        createdAt: new Date().toISOString()
      };

      if (!Array.isArray(state.user.careerComparisons)) {
        state.user.careerComparisons = [];
      }

      state.user.careerComparisons.unshift(record);
      state.user.updatedAt = record.createdAt;
      persistUser(state);
      form.reset();
      renderComparisons(state, { listNode, emptyState });
      setFeedback(feedbackNode, "Comparativa guardada.", "success");
    });

    if (listNode) {
      listNode.addEventListener("click", (event) => {
        const removeButton = event.target.closest("[data-remove-comparison]");
        if (!removeButton) {
          return;
        }
        const comparisonId = removeButton.getAttribute("data-remove-comparison");
        state.user.careerComparisons = state.user.careerComparisons.filter((item) => item.id !== comparisonId);
        state.user.updatedAt = new Date().toISOString();
        persistUser(state);
        renderComparisons(state, { listNode, emptyState });
      });
    }

    renderComparisons(state, { listNode, emptyState });
  }

  function renderComparisons(state, cache) {
    const listNode = cache?.listNode ?? document.querySelector("[data-comparison-list]");
    const emptyState = cache?.emptyState ?? document.querySelector("[data-comparison-empty]");

    if (!listNode || !emptyState) {
      return;
    }

    listNode.innerHTML = "";
    const items = Array.isArray(state.user.careerComparisons) ? state.user.careerComparisons : [];

    if (!items.length) {
      emptyState.classList.remove("hidden");
      return;
    }

    emptyState.classList.add("hidden");

    items.forEach((item) => {
      const card = document.createElement("article");
      card.className = "profile-comparison-card";

      const title = document.createElement("strong");
      title.textContent = item.title;
      card.appendChild(title);

      if (item.notes) {
        const notes = document.createElement("p");
        notes.textContent = item.notes;
        card.appendChild(notes);
      }

      const footer = document.createElement("div");
      footer.style.display = "flex";
      footer.style.justifyContent = "space-between";
      footer.style.alignItems = "center";
      footer.style.fontSize = "0.9rem";
      footer.style.color = "rgba(15, 23, 42, 0.6)";

      const createdAt = item.createdAt ? formatDate(item.createdAt) : "";
      footer.textContent = createdAt ? `Guardado el ${createdAt}` : "";

      const removeButton = document.createElement("button");
      removeButton.type = "button";
      removeButton.className = "btn btn--outline";
      removeButton.textContent = "Eliminar";
      removeButton.setAttribute("data-remove-comparison", item.id);
      removeButton.style.padding = "0.35rem 0.85rem";
      removeButton.style.fontSize = "0.85rem";

      footer.appendChild(removeButton);
      card.appendChild(footer);
      listNode.appendChild(card);
    });
  }

  function bindFollow(state) {
    const form = document.querySelector("[data-follow-form]");
    if (!form) {
      return;
    }

    const feedbackNode = form.querySelector("[data-follow-feedback]");
    const listNode = document.querySelector("[data-following-list]");
    const emptyState = document.querySelector("[data-following-empty]");

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      clearFeedback(feedbackNode);

      const formData = new FormData(form);
      const query = state.storage.sanitize(formData.get("query"));

      if (!query) {
        setFeedback(feedbackNode, "Ingresa un nombre o nickname.", "error");
        return;
      }

      const candidate = findFollowCandidate(state, query);
      if (!candidate) {
        setFeedback(feedbackNode, "No encontramos un perfil compatible con tu b├║squeda.", "error");
        return;
      }

      if (candidate.id === state.user.id) {
        setFeedback(feedbackNode, "No puedes seguir tu propio perfil.", "error");
        return;
      }

      if (!Array.isArray(state.user.followingIds)) {
        state.user.followingIds = [];
      }

      if (state.user.followingIds.includes(candidate.id)) {
        setFeedback(feedbackNode, "Ya sigues a esta persona.", "error");
        return;
      }

      state.user.followingIds.push(candidate.id);
      state.user.updatedAt = new Date().toISOString();
      persistUser(state);
      form.reset();
      renderFollowing(state, { listNode, emptyState });
      hydrateProfileSummary(state);
      setFeedback(feedbackNode, `Ahora sigues a ${getDisplayName(candidate)}.`, "success");
    });

    if (listNode) {
      listNode.addEventListener("click", (event) => {
        const removeButton = event.target.closest("[data-unfollow]");
        if (!removeButton) {
          return;
        }
        const userId = removeButton.getAttribute("data-unfollow");
        state.user.followingIds = state.user.followingIds.filter((id) => id !== userId);
        state.user.updatedAt = new Date().toISOString();
        persistUser(state);
        renderFollowing(state, { listNode, emptyState });
        hydrateProfileSummary(state);
      });
    }

    renderFollowing(state, { listNode, emptyState });
  }

  function renderFollowing(state, cache) {
    const listNode = cache?.listNode ?? document.querySelector("[data-following-list]");
    const emptyState = cache?.emptyState ?? document.querySelector("[data-following-empty]");

    if (!listNode || !emptyState) {
      return;
    }

    listNode.innerHTML = "";

    const users = state.user.followingIds
      .map((id) => state.storage.findUserById(id))
      .filter(Boolean)
      .map((candidate) => state.storage.withUserDefaults(candidate));

    if (!users.length) {
      emptyState.classList.remove("hidden");
      return;
    }

    emptyState.classList.add("hidden");

    users.forEach((candidate) => {
      const item = document.createElement("div");
      item.className = "profile-follow-item";

      const name = document.createElement("strong");
      name.textContent = getDisplayName(candidate);
      item.appendChild(name);

      const meta = document.createElement("span");
      meta.style.fontSize = "0.9rem";
      meta.style.color = "rgba(15, 23, 42, 0.65)";
      meta.textContent = candidate.segment === "adult" ? "Adulto" : "Menor";
      item.appendChild(meta);

      const unfollow = document.createElement("button");
      unfollow.type = "button";
      unfollow.className = "btn btn--outline";
      unfollow.style.padding = "0.35rem 0.85rem";
      unfollow.style.fontSize = "0.85rem";
      unfollow.textContent = "Dejar de seguir";
      unfollow.setAttribute("data-unfollow", candidate.id);

      item.appendChild(unfollow);
      listNode.appendChild(item);
    });
  }

  function findFollowCandidate(state, query) {
    const normalized = query.toLowerCase();
    const allUsers = state.storage.loadUsers();

    return allUsers.find((user) => {
      if (user.id === state.user.id) {
        return false;
      }

      if (state.user.segment === "minor" && user.segment !== "minor") {
        return false;
      }

      if (state.user.segment === "adult" && user.segment === "minor") {
        // Adultos pueden seguir a otros adultos y perfiles menores s├│lo si est├ín aprobados; conservadoramente limitamos a adultos.
        return matchesQuery(user, normalized) && user.segment === "adult";
      }

      return matchesQuery(user, normalized);
    });
  }

  function matchesQuery(user, normalized) {
    const haystack = [user.displayName, user.firstName, user.lastName, user.nickname]
      .filter(Boolean)
      .map((value) => String(value).toLowerCase());
    return haystack.some((value) => value.includes(normalized));
  }

  function renderInterestProfile(state) {
    const wrapper = document.querySelector("[data-profile-chart-wrapper]");
    const canvas = document.querySelector("[data-profile-chart]");
    const emptyState = document.querySelector("[data-profile-chart-empty]");
    const recommendationNode = document.querySelector("[data-profile-recommendations]");

    if (!wrapper || !canvas || !emptyState || !recommendationNode) {
      return;
    }

    const snapshot = resolveInterestSnapshot(state);
    if (!snapshot || typeof Chart === "undefined") {
      emptyState.classList.remove("hidden");
      wrapper.classList.add("hidden");
      recommendationNode.innerHTML = "";
      return;
    }

    wrapper.classList.remove("hidden");
    emptyState.classList.add("hidden");

    const labels = Object.keys(snapshot.scores);
    const values = labels.map((key) => snapshot.scores[key]);

    if (state.chart) {
      state.chart.destroy();
    }

    state.chart = new Chart(canvas.getContext("2d"), {
      type: "radar",
      data: {
        labels,
        datasets: [
          {
            label: "Perfil de intereses",
            data: values,
            backgroundColor: "rgba(79, 70, 229, 0.18)",
            borderColor: "rgba(79, 70, 229, 0.75)",
            borderWidth: 2,
            pointBackgroundColor: "rgba(14, 165, 233, 0.95)",
            pointBorderColor: "#ffffff"
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          r: {
            suggestedMin: 0,
            suggestedMax: Math.max(3, Math.max(...values, 3)),
            ticks: { display: false },
            grid: { color: "rgba(148, 163, 184, 0.25)" },
            angleLines: { color: "rgba(148, 163, 184, 0.25)" },
            pointLabels: {
              font: { size: 13, weight: "600" },
              color: "rgba(15, 23, 42, 0.76)"
            }
          }
        }
      }
    });

    renderRecommendations(state, recommendationNode, snapshot);
  }

  function resolveInterestSnapshot(state) {
    if (state.user.interestProfile?.scores) {
      return state.user.interestProfile;
    }

    const savedTest = state.storage.loadTestProgress(state.user.id);
    if (savedTest?.scores) {
      return savedTest;
    }

    return null;
  }

  function renderRecommendations(state, node, snapshot) {
    node.innerHTML = "";

    const main = snapshot.mainPower || resolveDominantKey(snapshot.scores);
    const config = RECOMMENDATION_MAP[main];

    if (config) {
      const title = document.createElement("strong");
      title.textContent = config.title;
      node.appendChild(title);

      const copy = document.createElement("p");
      copy.textContent = config.copy;
      node.appendChild(copy);

      const list = document.createElement("ul");
      list.style.margin = "0";
      list.style.paddingLeft = "1.2rem";

      const base = Array.isArray(state.user.recommendedCareers) && state.user.recommendedCareers.length
        ? state.user.recommendedCareers
        : config.careers;

      base.slice(0, 4).forEach((career) => {
        const li = document.createElement("li");
        li.textContent = career;
        list.appendChild(li);
      });

      node.appendChild(list);
      return;
    }

    if (Array.isArray(state.user.recommendedCareers) && state.user.recommendedCareers.length) {
      const title = document.createElement("strong");
      title.textContent = "Recomendaciones guardadas";
      node.appendChild(title);

      const list = document.createElement("ul");
      list.style.margin = "0";
      list.style.paddingLeft = "1.2rem";

      state.user.recommendedCareers.forEach((career) => {
        const li = document.createElement("li");
        li.textContent = career;
        list.appendChild(li);
      });

      node.appendChild(list);
    }
  }

  function resolveDominantKey(map) {
    let candidateKey = null;
    let best = -Infinity;
    Object.entries(map).forEach(([key, value]) => {
      if (value > best) {
        best = value;
        candidateKey = key;
      }
    });
    return candidateKey;
  }

  function persistUser(state) {
    state.storage.upsertUser(state.user);
    const refreshed = state.storage.findUserById(state.user.id);
    if (refreshed) {
      state.user = state.storage.withUserDefaults({ ...refreshed });
    }
    state.storage.syncActiveUser(state.user);
  }

  function bindEditToggle(state) {
    const toggle = document.querySelector("[data-profile-edit-toggle]");
    const sections = document.querySelectorAll("[data-profile-edit-section]");
    if (!toggle || !sections.length) {
      return;
    }

    const label = toggle.querySelector("[data-profile-edit-label]");
    const applyState = () => {
      sections.forEach((section) => {
        section.classList.toggle("hidden", !state.editExpanded);
      });
      toggle.setAttribute("aria-expanded", String(state.editExpanded));
      if (label) {
        label.textContent = state.editExpanded ? "Cerrar edici├│n" : "Editar perfil";
      }
    };

    if (!toggle.dataset.bound) {
      toggle.addEventListener("click", () => {
        state.editExpanded = !state.editExpanded;
        applyState();
        if (state.editExpanded) {
          const displayInput = document.querySelector("[name='displayName']");
          if (displayInput) {
            displayInput.focus();
          }
        }
      });
      toggle.dataset.bound = "true";
    }

    applyState();
  }

  function resolveProfilePath(relative) {
    const base = document.body?.getAttribute("data-base-path") ?? "";
    if (!base) {
      return relative;
    }
    const normalized = base.endsWith("/") ? base : `${base}/`;
    return `${normalized}${relative}`;
  }

  function formatDate(value) {
    if (!value) {
      return "";
    }
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
      return "";
    }
    return date.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  }

  function getDisplayName(user) {
    return user.displayName || user.firstName || user.nickname || "Perfil";
  }

  function clearFeedback(node) {
    if (!node) {
      return;
    }
    node.textContent = "";
    node.removeAttribute("data-state");
  }

  function setFeedback(node, message, state) {
    if (!node) {
      return;
    }
    node.textContent = message;
    node.setAttribute("data-state", state);
  }

  function isStrongPassword(value) {
    if (typeof value !== "string" || value.length < 8) {
      return false;
    }
    const hasLetter = /[A-Za-z]/.test(value);
    const hasNumber = /\d/.test(value);
    return hasLetter && hasNumber;
  }
})();
