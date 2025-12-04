(function () {
  document.addEventListener("DOMContentLoaded", () => {
    const catalog = window.CareersCatalog;
    if (!catalog) {
      console.warn("CareersCatalog no está disponible");
      return;
    }

    const PAGE_SIZE = 12;
    let currentResults = [];

    const elements = {
      count: document.querySelector("[data-careers-count]"),
      grid: document.querySelector("[data-careers-grid]"),
      areas: document.querySelector("[data-careers-areas]"),
      clear: document.querySelector("[data-careers-clear]"),
      empty: document.querySelector("[data-careers-empty]"),
      query: document.querySelector("[data-careers-query]"),
      pagination: document.querySelector("[data-careers-pagination]"),
      areaSearch: document.querySelector("[data-careers-area-search]")
    };

    const areaOptions = catalog.areas();
    const areaMap = new Map(areaOptions.map((option) => [option.slug, option]));

    const params = new URLSearchParams(window.location.search);
    const initialQuery = params.get("q");
    const initialArea = params.get("area");
    const initialPageParam = parseInt(params.get("page"), 10);
    const initialPage = Number.isFinite(initialPageParam) && initialPageParam > 0 ? initialPageParam : 1;
    const initialAreaFilter = params.get("areaFilter");

    const state = {
      query: initialQuery ? initialQuery.trim() : "",
      area: initialArea && areaMap.has(initialArea) ? initialArea : "all",
      page: initialPage,
      areaFilterQuery: initialAreaFilter ? initialAreaFilter.trim().toLowerCase() : ""
    };

    if (elements.areaSearch && state.areaFilterQuery) {
      elements.areaSearch.value = state.areaFilterQuery;
    }

    if (elements.query) {
      elements.query.value = state.query;
      elements.query.addEventListener("input", (event) => {
        state.query = event.target.value.trim();
        state.page = 1;
        syncUrl(state);
        applyFilters();
      });
    }

    if (elements.areas) {
      elements.areas.addEventListener("change", (event) => {
        if (event.target.name !== "careerArea") {
          return;
        }
        const selected = event.target.value;
        state.area = selected === "all" ? "all" : areaMap.has(selected) ? selected : "all";
        state.page = 1;
        syncUrl(state);
        applyFilters();
      });
    }

    if (elements.areaSearch) {
      elements.areaSearch.addEventListener("input", (event) => {
        state.areaFilterQuery = event.target.value.trim().toLowerCase();
        renderAreaOptions(computeAreaCounts());
      });
    }

    if (elements.clear) {
      elements.clear.addEventListener("click", () => {
        if (!state.query && state.area === "all") {
          return;
        }
        state.query = "";
        state.area = "all";
        state.page = 1;
        if (elements.query) {
          elements.query.value = "";
        }
        syncUrl(state);
        applyFilters();
      });
    }

    if (elements.pagination) {
      elements.pagination.addEventListener("click", (event) => {
        const target = event.target.closest("[data-page]");
        if (!target || target.hasAttribute("disabled")) {
          return;
        }
        const nextPage = parseInt(target.getAttribute("data-page"), 10);
        if (!Number.isFinite(nextPage) || nextPage === state.page || nextPage < 1) {
          return;
        }
        state.page = nextPage;
        syncUrl(state);
        renderCurrentPage();
        elements.grid?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }

    applyFilters();
    syncUrl(state);

    function applyFilters() {
      const filters = {};
      if (state.query) {
        filters.query = state.query;
      }
      if (state.area !== "all") {
        filters.area = state.area;
      }

      const matches = catalog.filter(filters);

      const baseFilters = {};
      if (state.area !== "all") {
        baseFilters.area = state.area;
      }

      const fullList = catalog.filter(baseFilters);
      const combined = mergeResults(matches, fullList);
      const noMatches = Boolean(state.query) && matches.length === 0;

      currentResults = combined;

      const previousPage = state.page;
      const totalPages = combined.length ? Math.ceil(combined.length / PAGE_SIZE) : 1;
      if (!combined.length) {
        state.page = 1;
      } else if (state.page > totalPages) {
        state.page = totalPages;
      }
      if (state.page !== previousPage) {
        syncUrl(state);
      }

      renderCurrentPage();

      updateCount(combined.length);
      updateEmptyMessage(combined.length, noMatches);

      const areaCounts = computeAreaCounts();
      renderAreaOptions(areaCounts);
      updateClearButton();
    }

    function computeAreaCounts() {
      const counts = new Map();
      counts.set("all", catalog.filter({}).length);

      areaOptions.forEach((option) => {
        const filters = { area: option.slug };
        const total = catalog.filter(filters).length;
        counts.set(option.slug, total);
      });

      return counts;
    }

    function mergeResults(primary, fallbackList) {
      if (!primary.length) {
        return fallbackList.slice();
      }

      const ordered = [];
      const seen = new Set();

      primary.forEach((career) => {
        if (seen.has(career.id)) {
          return;
        }
        seen.add(career.id);
        ordered.push(career);
      });

      fallbackList.forEach((career) => {
        if (seen.has(career.id)) {
          return;
        }
        seen.add(career.id);
        ordered.push(career);
      });

      return ordered;
    }

    function renderAreaOptions(counts) {
      if (!elements.areas) {
        return;
      }

      const allLabel = {
        slug: "all",
        label: "Todas las áreas"
      };

      const filterQuery = state.areaFilterQuery;
      const options = [allLabel, ...areaOptions].filter((option) => {
        if (!filterQuery) {
          return true;
        }
        return option.label.toLowerCase().includes(filterQuery);
      });
      const markup = options
        .map((option) => {
          const slug = option.slug;
          const label = option.label;
          const count = counts?.get(slug);
          const formattedCount = typeof count === "number" ? formatNumber(count) : "-";
          const checked = state.area === slug ? "checked" : "";
          return `
            <label class="careers-filter__option" data-careers-area="${slug}">
              <input type="radio" name="careerArea" value="${slug}" ${checked} />
              <span>${escapeHtml(label)}</span>
              <span class="careers-filter__count" data-careers-area-count>${formattedCount}</span>
            </label>
          `;
        })
        .join("");

      elements.areas.innerHTML = markup;
    }

    function renderCards(results, page = 1) {
      if (!elements.grid) {
        return;
      }

      if (!results.length) {
        elements.grid.innerHTML = "";
        return;
      }

      const totalPages = Math.ceil(results.length / PAGE_SIZE);
      const safePage = Math.min(Math.max(page, 1), totalPages);
      const start = (safePage - 1) * PAGE_SIZE;
      const slice = results.slice(start, start + PAGE_SIZE);

      const cards = slice
        .map((career) => {
          const tags = career.compatibilityTags.slice(0, 3)
            .map((tag) => `<span class="career-card__tag">${escapeHtml(tag)}</span>`)
            .join("");

          const universities = career.universities.slice(0, 3)
            .map((item) => `<li>${escapeHtml(item.name)} · ${escapeHtml(item.country)}</li>`)
            .join("");

          const detailTarget = `page/tarea/detallescarrera.html?career=${encodeURIComponent(career.id)}`;
          const detailHref = typeof resolvePath === "function"
            ? resolvePath(detailTarget)
            : `tarea/detallescarrera.html?career=${encodeURIComponent(career.id)}`;

          return `
            <article class="career-card">
              <span class="career-card__emoji" aria-hidden="true">${career.emoji}</span>
              <h3 class="career-card__title">${escapeHtml(career.name)}</h3>
              <p class="career-card__summary">${escapeHtml(career.summary)}</p>
              ${tags ? `<div class="career-card__tags">${tags}</div>` : ""}
              ${universities ? `<ul class="career-card__universities">${universities}</ul>` : ""}
              <div class="career-card__footer">
                <a class="career-card__link" href="${detailHref}">Ver detalles</a>
              </div>
            </article>
          `;
        })
        .join("");

      elements.grid.innerHTML = cards;
    }

    function renderCurrentPage() {
      renderCards(currentResults, state.page);
      updatePagination(currentResults.length);
    }

    function updateCount(value) {
      if (!elements.count) {
        return;
      }
      elements.count.textContent = formatNumber(value);
    }

    function updateEmptyMessage(totalResults, noMatches) {
      if (!elements.empty) {
        return;
      }

      if (totalResults === 0) {
        elements.empty.textContent = "No encontramos carreras con los filtros actuales. Prueba cambiando el término o el área.";
        elements.empty.classList.remove("hidden");
        return;
      }

      if (noMatches) {
        elements.empty.textContent = "Sin coincidencias exactas, mostramos el catálogo completo para que continúes explorando.";
        elements.empty.classList.remove("hidden");
        return;
      }

      elements.empty.classList.add("hidden");
    }

    function updateClearButton() {
      if (!elements.clear) {
        return;
      }
      const shouldDisable = !state.query && state.area === "all";
      elements.clear.toggleAttribute("disabled", shouldDisable);
    }

    function updatePagination(totalResults) {
      if (!elements.pagination) {
        return;
      }

      if (!totalResults || totalResults <= PAGE_SIZE) {
        elements.pagination.innerHTML = "";
        elements.pagination.classList.add("hidden");
        return;
      }

      const totalPages = Math.ceil(totalResults / PAGE_SIZE);
      const pages = buildPageRange(state.page, totalPages);
      const prevDisabled = state.page <= 1 ? "disabled" : "";
      const nextDisabled = state.page >= totalPages ? "disabled" : "";

      const markup = `
        <button class="pagination__button" type="button" data-page="${state.page - 1}" ${prevDisabled}>Anterior</button>
        ${pages
          .map((page) => {
            const active = page === state.page ? " pagination__button--active" : "";
            const aria = page === state.page ? ' aria-current="page"' : "";
            return `<button class="pagination__button${active}" type="button" data-page="${page}"${aria}>${page}</button>`;
          })
          .join("")}
        <button class="pagination__button" type="button" data-page="${state.page + 1}" ${nextDisabled}>Siguiente</button>
      `;

      elements.pagination.innerHTML = markup;
      elements.pagination.classList.remove("hidden");
    }

    function buildPageRange(current, total, length = 5) {
      const half = Math.floor(length / 2);
      let start = Math.max(1, current - half);
      let end = Math.min(total, start + length - 1);
      start = Math.max(1, end - length + 1);
      const range = [];
      for (let index = start; index <= end; index += 1) {
        range.push(index);
      }
      return range;
    }
  });

  function formatNumber(value) {
    return new Intl.NumberFormat("es-MX").format(value);
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function syncUrl(state) {
    const params = new URLSearchParams();
    if (state.query) {
      params.set("q", state.query);
    }
    if (state.area && state.area !== "all") {
      params.set("area", state.area);
    }
    if (state.areaFilterQuery) {
      params.set("areaFilter", state.areaFilterQuery);
    }
    if (state.page && state.page > 1) {
      params.set("page", String(state.page));
    }

    const next = params.toString();
    const base = window.location.pathname;
    const url = next ? `${base}?${next}` : base;
    window.history.replaceState({}, "", url);
  }
})();
