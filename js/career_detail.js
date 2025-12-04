(function () {
  document.addEventListener("DOMContentLoaded", () => {
    const catalog = window.CareersCatalog;
    if (!catalog) {
      renderError("No pudimos cargar el catálogo de carreras. Intenta actualizar la página.");
      return;
    }

    const detailData = window.CareerDetailData || {};

    const elements = {
      fallback: document.querySelector("[data-no-career]") || null,
      hero: document.querySelector("[data-career-view]") || null,
      emoji: document.querySelector("[data-career-emoji]") || null,
      title: document.querySelector("[data-career-title]") || null,
      summary: document.querySelector("[data-career-summary]") || null,
      metaProgram: document.querySelector("[data-career-program]") || null,
      metaRegion: document.querySelector("[data-career-region]") || null,
      metaCost: document.querySelector("[data-career-cost]") || null,
      tags: document.querySelector("[data-career-tags]") || null,
      focus: document.querySelector("[data-career-focus]") || null,
      outcomes: document.querySelector("[data-career-outcomes]") || null,
      countrySelect: document.querySelector("[data-country-select]") || null,
      institutionList: document.querySelector("[data-institution-list]") || null,
      institutionDetail: document.querySelector("[data-institution-detail]") || null,
      institutionNotes: document.querySelector("[data-institution-notes]") || null,
      institutionSources: document.querySelector("[data-institution-sources]") || null,
      curriculum: document.querySelector("[data-curriculum]") || null,
      empty: document.querySelector("[data-detail-empty]") || null,
      breadcrumbTitle: document.querySelector("[data-breadcrumb-title]") || null
    };

    const rawCareerId = getRequestedCareerId();
    if (!rawCareerId) {
      renderMissingCareer("Selecciona una carrera desde el catálogo para ver los detalles.");
      return;
    }

    const career = typeof catalog.find === "function" ? catalog.find(rawCareerId) : null;
    if (!career) {
      renderMissingCareer("No encontramos esa carrera en el catálogo. Intenta desde la página de carreras.");
      return;
    }

    const baseId = resolveBaseId(career);
    const baseDetail = detailData[baseId] || null;
    const institutions = buildInstitutionRegistry(career, baseDetail);

    updatePageTitle(career);
    renderHero(elements, career, baseDetail);
    renderFocusAreas(elements, career);
    renderOutcomes(elements, baseDetail, career);

    initInstitutions(elements, institutions, baseDetail);
  });

  function renderError(message) {
    const container = document.querySelector("[data-no-career]");
    if (!container) {
      return;
    }
    container.classList.remove("hidden");
    container.textContent = message;
  }

  function renderMissingCareer(message) {
    renderError(message);
    const hero = document.querySelector("[data-career-view]");
    if (hero) {
      hero.classList.add("hidden");
    }
  }

  function getRequestedCareerId() {
    const params = new URLSearchParams(window.location.search);
    const direct = params.get("career");
    if (direct) {
      return direct;
    }
    const hash = window.location.hash ? window.location.hash.replace(/^#/, "") : "";
    return hash || null;
  }

  function resolveBaseId(career) {
    if (!career || !career.id) {
      return null;
    }
    const suffix = career.programKey && career.regionKey ? `_${career.programKey}_${career.regionKey}` : "";
    if (suffix && career.id.endsWith(suffix)) {
      return career.id.slice(0, -suffix.length);
    }
    const parts = career.id.split("_");
    if (parts.length <= 2) {
      return career.id;
    }
    parts.pop();
    parts.pop();
    return parts.join("_");
  }

  function buildInstitutionRegistry(career, baseDetail) {
    const registry = new Map();

    if (Array.isArray(career?.universities)) {
      career.universities.forEach((item, index) => {
        const key = buildInstitutionKey(item.name, item.country);
        if (!key) {
          return;
        }
        if (!registry.has(key)) {
          registry.set(key, {
            id: `${career.id}_${index}`,
            name: item.name,
            country: item.country,
            type: "Universidad",
            cost: item.cost || null,
            description: "",
            curriculum: [],
            modality: null,
            duration: null,
            admission: null,
            tuition: null,
            notes: null,
            sources: []
          });
        }
      });
    }

    if (baseDetail && Array.isArray(baseDetail.institutions)) {
      baseDetail.institutions.forEach((institution) => {
        const key = buildInstitutionKey(institution.name, institution.country);
        if (!key) {
          return;
        }
        const merged = {
          id: institution.id || key,
          name: institution.name,
          country: institution.country,
          type: institution.type || "Universidad",
          modality: institution.modality || null,
          duration: institution.duration || null,
          description: institution.description || "",
          admission: institution.admission || null,
          tuition: institution.tuition || null,
          curriculum: Array.isArray(institution.curriculum) ? institution.curriculum : [],
          notes: institution.notes || null,
          sources: Array.isArray(institution.sources) ? institution.sources : [],
          cost: institution.cost || null
        };

        if (!registry.has(key)) {
          registry.set(key, merged);
          return;
        }

        const existing = registry.get(key);
        registry.set(key, {
          ...existing,
          ...merged,
          curriculum: merged.curriculum.length ? merged.curriculum : existing.curriculum,
          notes: merged.notes || existing.notes,
          sources: merged.sources.length ? merged.sources : existing.sources,
          modality: merged.modality || existing.modality,
          duration: merged.duration || existing.duration,
          admission: merged.admission || existing.admission,
          tuition: merged.tuition || existing.tuition,
          description: merged.description || existing.description,
          type: merged.type || existing.type,
          cost: existing.cost || merged.cost
        });
      });
    }

    const items = Array.from(registry.values());
    return items.sort((a, b) => {
      const byCountry = a.country.localeCompare(b.country, "es");
      if (byCountry !== 0) {
        return byCountry;
      }
      return a.name.localeCompare(b.name, "es");
    });
  }

  function updatePageTitle(career) {
    if (!career || !career.name) {
      return;
    }
    document.title = `${career.name} | Catálogo de carreras Klesis`;
  }

  function renderHero(elements, career, baseDetail) {
    if (!elements.hero) {
      return;
    }
    elements.hero.classList.remove("hidden");

    if (elements.emoji) {
      elements.emoji.textContent = career.emoji || "🎓";
    }
    if (elements.title) {
      elements.title.textContent = career.name;
    }
    if (elements.summary) {
      elements.summary.textContent = career.summary;
    }
    if (elements.metaProgram) {
      elements.metaProgram.textContent = career.programLabel || "Programa";
    }
    if (elements.metaRegion) {
      const region = career.regionLabel || (Array.isArray(career.worldRegions) ? career.worldRegions.join(", ") : "");
      elements.metaRegion.textContent = region;
    }
    if (elements.metaCost) {
      if (career.estimatedCost) {
        elements.metaCost.textContent = `Costo estimado: ${capitalize(career.estimatedCost)}`;
      } else {
        elements.metaCost.textContent = "Costo estimado no disponible";
      }
    }
    if (elements.tags) {
      const tags = Array.isArray(career.compatibilityTags) ? career.compatibilityTags.slice(0, 8) : [];
      elements.tags.innerHTML = tags
        .map((tag) => `<span class="career-detail__tag">${escapeHtml(tag)}</span>`)
        .join("");
    }
    if (elements.breadcrumbTitle) {
      elements.breadcrumbTitle.textContent = career.name;
    }
    if (baseDetail?.overview && elements.summary) {
      elements.summary.textContent = baseDetail.overview;
    }
  }

  function renderFocusAreas(elements, career) {
    if (!elements.focus) {
      return;
    }
    const focusAreas = Array.isArray(career.focusAreas) ? career.focusAreas : [];
    if (!focusAreas.length) {
      elements.focus.innerHTML = "<p>No hay datos de enfoque disponibles.</p>";
      return;
    }

    const markup = focusAreas
      .map((area) => {
        const value = clamp(Number(area.value) || 0, 0, 100);
        return `
          <li class="career-focus__item">
            <div class="career-focus__label">
              <span>${escapeHtml(area.label)}</span>
              <span>${value}%</span>
            </div>
            <div class="career-focus__meter" role="presentation">
              <span class="career-focus__bar" style="width: ${value}%"></span>
            </div>
          </li>
        `;
      })
      .join("");

    elements.focus.innerHTML = markup;
  }

  function renderOutcomes(elements, baseDetail, career) {
    if (!elements.outcomes) {
      return;
    }
    const outcomes = Array.isArray(baseDetail?.outcomes) && baseDetail.outcomes.length
      ? baseDetail.outcomes
      : Array.isArray(career.compatibilityTags)
        ? career.compatibilityTags.slice(0, 4)
        : [];

    if (!outcomes.length) {
      elements.outcomes.innerHTML = "<p>Exploraremos las salidas profesionales pronto.</p>";
      return;
    }

    elements.outcomes.innerHTML = outcomes
      .map((item) => `<li class="career-detail__outcome">${escapeHtml(item)}</li>`)
      .join("");
  }

  function initInstitutions(elements, institutions, baseDetail) {
    if (!elements.countrySelect || !elements.institutionList || !elements.institutionDetail) {
      return;
    }

    if (!institutions.length) {
      elements.countrySelect.innerHTML = "";
      elements.institutionList.innerHTML = "";
      if (elements.empty) {
        elements.empty.classList.remove("hidden");
      }
      if (elements.institutionDetail) {
        elements.institutionDetail.innerHTML = "<p>Estamos recopilando universidades para esta carrera. Consulta nuevamente pronto.</p>";
      }
      return;
    }

    if (elements.empty) {
      elements.empty.classList.add("hidden");
    }

    const countries = Array.from(new Set(institutions.map((item) => item.country))).sort((a, b) => a.localeCompare(b, "es"));
    const state = {
      country: countries[0] || null,
      institutionId: null
    };

    renderCountryOptions(elements.countrySelect, countries, state.country);
    elements.countrySelect.addEventListener("change", (event) => {
      state.country = event.target.value;
      state.institutionId = null;
      renderInstitutionCards(elements, institutions, state);
      selectFirstInstitution(elements, institutions, state, baseDetail);
    });

    renderInstitutionCards(elements, institutions, state);
    selectFirstInstitution(elements, institutions, state, baseDetail);

    elements.institutionList.addEventListener("click", (event) => {
      const trigger = event.target.closest("[data-institution-id]");
      if (!trigger) {
        return;
      }
      const identifier = trigger.getAttribute("data-institution-id");
      if (!identifier) {
        return;
      }
      state.institutionId = identifier;
      highlightActiveInstitution(elements, identifier);
      const institution = institutions.find((item) => item.id === identifier);
      renderInstitutionDetail(elements, institution, baseDetail);
    });
  }

  function renderCountryOptions(select, countries, activeCountry) {
    const options = countries
      .map((country) => {
        const selected = country === activeCountry ? " selected" : "";
        return `<option value="${escapeAttribute(country)}"${selected}>${escapeHtml(country)}</option>`;
      })
      .join("");
    select.innerHTML = options;
  }

  function renderInstitutionCards(elements, institutions, state) {
    const filtered = institutions.filter((item) => item.country === state.country);
    if (!filtered.length) {
      elements.institutionList.innerHTML = "<p class=\"career-detail__placeholder\">No hay instituciones registradas para este país todavía.</p>";
      return;
    }

    const markup = filtered
      .map((institution) => {
        const active = institution.id === state.institutionId ? " career-detail__institution--active" : "";
        const typeLabel = institution.type ? `<span class=\"career-detail__institution-type\">${escapeHtml(institution.type)}</span>` : "";
        const duration = institution.duration ? `<span class=\"career-detail__institution-duration\">${escapeHtml(institution.duration)}</span>` : "";
        return `
          <button type="button" class="career-detail__institution${active}" data-institution-id="${escapeAttribute(institution.id)}">
            <span class="career-detail__institution-name">${escapeHtml(institution.name)}</span>
            <small class="career-detail__institution-meta">
              ${typeLabel}
              ${duration}
            </small>
          </button>
        `;
      })
      .join("");

    elements.institutionList.innerHTML = markup;
  }

  function selectFirstInstitution(elements, institutions, state, baseDetail) {
    const filtered = institutions.filter((item) => item.country === state.country);
    if (!filtered.length) {
      if (elements.institutionDetail) {
        elements.institutionDetail.innerHTML = "<p>Selecciona otro país para ver universidades disponibles.</p>";
      }
      return;
    }
    const institution = filtered[0];
    state.institutionId = institution.id;
    highlightActiveInstitution(elements, institution.id);
    renderInstitutionDetail(elements, institution, baseDetail);
  }

  function highlightActiveInstitution(elements, institutionId) {
    const buttons = elements.institutionList.querySelectorAll("[data-institution-id]");
    buttons.forEach((button) => {
      const target = button.getAttribute("data-institution-id");
      if (target === institutionId) {
        button.classList.add("career-detail__institution--active");
      } else {
        button.classList.remove("career-detail__institution--active");
      }
    });
  }

  function renderInstitutionDetail(elements, institution, baseDetail) {
    if (!elements.institutionDetail) {
      return;
    }

    if (!institution) {
      elements.institutionDetail.innerHTML = "<p>No encontramos información para esta institución.</p>";
      if (elements.curriculum) {
        elements.curriculum.innerHTML = "";
      }
      if (elements.institutionNotes) {
        elements.institutionNotes.textContent = "";
      }
      if (elements.institutionSources) {
        elements.institutionSources.innerHTML = "";
      }
      return;
    }

    const lines = [];
    if (institution.modality) {
      lines.push(`<span>${escapeHtml(institution.modality)}</span>`);
    }
    if (institution.tuition) {
      lines.push(`<span>${escapeHtml(institution.tuition)}</span>`);
    }
    if (institution.admission) {
      lines.push(`<span>${escapeHtml(institution.admission)}</span>`);
    }

    const meta = lines.length ? `<p class="career-detail__institution-details">${lines.join(" &middot; ")}</p>` : "";
    const description = institution.description
      ? `<p class="career-detail__institution-description">${escapeHtml(institution.description)}</p>`
      : "<p class=\"career-detail__institution-description\">Estamos preparando una descripción extendida.</p>";

    elements.institutionDetail.innerHTML = `
      <header class="career-detail__institution-header">
        <h3>${escapeHtml(institution.name)}</h3>
        <p class="career-detail__institution-subtitle">${escapeHtml(institution.country)} · ${escapeHtml(institution.type || "Institución")}</p>
        ${meta}
      </header>
      ${description}
    `;

    renderCurriculum(elements, institution, baseDetail);
    renderNotes(elements, institution, baseDetail);
    renderSources(elements, institution);
  }

  function renderCurriculum(elements, institution, baseDetail) {
    if (!elements.curriculum) {
      return;
    }
    const curriculum = Array.isArray(institution.curriculum) ? institution.curriculum : [];
    if (!curriculum.length) {
      elements.curriculum.innerHTML = `
        <p class="career-detail__placeholder">
          Aún no tenemos la malla curricular detallada para ${escapeHtml(institution.name)}.
          Consulta directamente con la institución o vuelve pronto.
        </p>
      `;
      return;
    }

    const markup = curriculum
      .map((block) => {
        const subjects = Array.isArray(block.subjects)
          ? block.subjects.map((subject) => `<li>${escapeHtml(subject)}</li>`).join("")
          : "";
        const focus = block.focus ? `<p class="career-curriculum__focus">${escapeHtml(block.focus)}</p>` : "";
        return `
          <article class="career-curriculum__block">
            <header>
              <h4>${escapeHtml(block.cycle)}</h4>
              ${focus}
            </header>
            ${subjects ? `<ul class="career-curriculum__list">${subjects}</ul>` : ""}
          </article>
        `;
      })
      .join("");

    elements.curriculum.innerHTML = markup;
  }

  function renderNotes(elements, institution, baseDetail) {
    if (!elements.institutionNotes) {
      return;
    }
    const messages = [];
    if (institution.notes) {
      messages.push(institution.notes);
    }
    if (baseDetail?.overview && !messages.length) {
      messages.push("Información referencial; verifica directamente con la institución antes de postular.");
    }
    elements.institutionNotes.textContent = messages.join(" ");
  }

  function renderSources(elements, institution) {
    if (!elements.institutionSources) {
      return;
    }
    const sources = Array.isArray(institution.sources) ? institution.sources : [];
    if (!sources.length) {
      elements.institutionSources.innerHTML = "";
      elements.institutionSources.classList.add("hidden");
      return;
    }
    const items = sources
      .map((source) => `<li>${escapeHtml(source)}</li>`)
      .join("");
    elements.institutionSources.innerHTML = items;
    elements.institutionSources.classList.remove("hidden");
  }

  function buildInstitutionKey(name, country) {
    if (!name || !country) {
      return null;
    }
    return `${slugify(name)}__${slugify(country)}`;
  }

  function slugify(value) {
    return String(value || "")
      .normalize("NFD")
      .replace(/\p{Diacritic}/gu, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  function escapeHtml(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function escapeAttribute(value) {
    return escapeHtml(value).replace(/"/g, "&quot;");
  }

  function clamp(value, min, max) {
    const number = Number.isFinite(value) ? value : Number(value);
    if (!Number.isFinite(number)) {
      return min;
    }
    return Math.min(Math.max(number, min), max);
  }

  function capitalize(value) {
    if (!value) {
      return "";
    }
    return String(value).charAt(0).toUpperCase() + String(value).slice(1);
  }
})();
