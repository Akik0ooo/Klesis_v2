(function () {
  const CATEGORY_DATA = {
    Creativa: {
      title: "Estrella creativa",
      emoji: "✨",
      color: "#FF577F",
      description: "Diseñas, interpretas, produces contenido y das vida a ideas que emocionan.",
      possibleCareers: [
        "Diseño gráfico",
        "Arquitectura",
        "Producción audiovisual",
        "Animación 3D",
        "Música y producción sonora",
        "Escritura creativa",
        "Fotografía",
        "Diseño de modas",
        "Dirección de arte"
      ],
      careers: [
        { id: "DisGra", name: "Diseño gráfico", icon: "🖼️", desc: "Crea identidades visuales, logos y piezas digitales para marcas." },
        { id: "Arq", name: "Arquitectura", icon: "🏗️", desc: "Diseña espacios habitables, estructuras y ciudades funcionales." },
        { id: "Cine", name: "Producción audiovisual", icon: "🎬", desc: "Dirige, produce y edita videos, películas o contenido para redes." },
        { id: "Anim", name: "Animación 3D", icon: "👾", desc: "Da vida a personajes y efectos visuales para cine y videojuegos." },
        { id: "Moda", name: "Diseño de modas", icon: "👗", desc: "Crea colecciones de ropa, tendencias y propuestas de vestuario." },
        { id: "Mus", name: "Producción musical", icon: "🎶", desc: "Compone, mezcla y produce piezas musicales para artistas o medios." },
        { id: "Foto", name: "Fotografía", icon: "📷", desc: "Captura historias visuales para publicidad, moda o periodismo." },
        { id: "Arte", name: "Dirección de arte", icon: "🎭", desc: "Define la estética visual de campañas, eventos o producciones." }
      ]
    },
    Negocios: {
      title: "Capitán de negocios",
      emoji: "💎",
      color: "#FFEA00",
      description: "Negocias, lideras y transformas ideas en proyectos rentables.",
      possibleCareers: [
        "Administración de empresas",
        "Marketing digital",
        "Finanzas y banca",
        "Recursos humanos",
        "Emprendimiento",
        "Comercio internacional",
        "Contaduría",
        "Economía",
        "Gestión de proyectos"
      ],
      careers: [
        { id: "Adm", name: "Administración", icon: "📊", desc: "Gestiona recursos, equipos y operaciones de organizaciones." },
        { id: "Mkt", name: "Marketing digital", icon: "📈", desc: "Planifica campañas, analiza audiencias y posiciona productos." },
        { id: "Fin", name: "Finanzas", icon: "💲", desc: "Gestiona inversiones, presupuestos y decisiones de negocio." },
        { id: "RH", name: "Recursos humanos", icon: "🤝", desc: "Acompaña y desarrolla talento dentro de empresas." },
        { id: "Emp", name: "Emprendimiento", icon: "🚀", desc: "Crea startups, productos o servicios innovadores." },
        { id: "Com", name: "Comercio internacional", icon: "🚢", desc: "Coordina importaciones, exportaciones y logística global." },
        { id: "Econ", name: "Economía", icon: "🌍", desc: "Analiza mercados, tendencias y políticas económicas." },
        { id: "PM", name: "Gestión de proyectos", icon: "🗂️", desc: "Planifica, ejecuta y da seguimiento a iniciativas estratégicas." }
      ]
    },
    Social: {
      title: "Héroe social",
      emoji: "💖",
      color: "#00BFFF",
      description: "Te mueve ayudar, comunicar y acompañar procesos humanos.",
      possibleCareers: [
        "Medicina",
        "Psicología",
        "Derecho",
        "Docencia",
        "Trabajo social",
        "Periodismo",
        "Nutrición",
        "Relaciones públicas"
      ],
      careers: [
        { id: "Med", name: "Medicina", icon: "🩺", desc: "Previene, diagnostica y trata enfermedades para cuidar la salud." },
        { id: "Psico", name: "Psicología", icon: "🧠", desc: "Acompaña la salud mental y el desarrollo emocional." },
        { id: "Der", name: "Derecho", icon: "⚖️", desc: "Defiende derechos, legisla y resuelve conflictos legales." },
        { id: "Edu", name: "Docencia", icon: "🍎", desc: "Enseña y diseña experiencias de aprendizaje." },
        { id: "TS", name: "Trabajo social", icon: "🏘️", desc: "Fortalece comunidades y redes de apoyo." },
        { id: "Per", name: "Periodismo", icon: "📰", desc: "Investiga, comunica y narra hechos relevantes." },
        { id: "Nut", name: "Nutrición", icon: "🥗", desc: "Diseña planes alimenticios para mejorar bienestar." },
        { id: "RRPP", name: "Relaciones públicas", icon: "📣", desc: "Gestiona la reputación y comunicación de organizaciones." }
      ]
    },
    Maestra: {
      title: "Mente maestra",
      emoji: "🤖",
      color: "#39FF14",
      description: "Analizas, programas y construyes soluciones con ciencia y tecnología.",
      possibleCareers: [
        "Ingeniería de software",
        "Ciencia de datos",
        "Ingeniería civil",
        "Robótica",
        "Ingeniería aeroespacial",
        "Física",
        "Biotecnología",
        "Ciberseguridad"
      ],
      careers: [
        { id: "Soft", name: "Ingeniería de software", icon: "💻", desc: "Desarrolla y mantiene aplicaciones y plataformas digitales." },
        { id: "Data", name: "Ciencia de datos", icon: "🧮", desc: "Analiza grandes volúmenes de datos para generar insights." },
        { id: "Civil", name: "Ingeniería civil", icon: "🌉", desc: "Diseña y construye infraestructura como puentes o edificios." },
        { id: "Mec", name: "Robótica", icon: "⚙️", desc: "Integra electrónica, mecánica y software para crear robots." },
        { id: "Aero", name: "Aeroespacial", icon: "🚀", desc: "Diseña vehículos y sistemas para viajar por aire o espacio." },
        { id: "Fis", name: "Física", icon: "🔭", desc: "Investiga las leyes que describen el universo." },
        { id: "Bio", name: "Biotecnología", icon: "🧬", desc: "Aplica ciencia para desarrollar soluciones en salud y alimentos." },
        { id: "Ciber", name: "Ciberseguridad", icon: "🔒", desc: "Protege redes y sistemas ante amenazas digitales." }
      ]
    }
  };

  const CATEGORY_AREA_SLUG = {
    Creativa: "creatividad",
    Negocios: "estrategia",
    Social: "empatia",
    Maestra: "tecnologia"
  };

  const QUIZ_DATA = [
    { question: "¿Qué prefieres pasar el día haciendo?", optA: { text: "Diseñar el logo de una marca 🎨", category: "Creativa" }, optB: { text: "Crear un plan para vender esa marca 💰", category: "Negocios" } },
    { question: "¿Qué clase te emociona más?", optA: { text: "Aprender sobre el cuerpo humano ❤️", category: "Social" }, optB: { text: "Resolver retos de lógica avanzada 🧠", category: "Maestra" } },
    { question: "Si tuvieras un superpoder...", optA: { text: "Crear una app que resuelva todo 🧠", category: "Maestra" }, optB: { text: "Crear una obra de arte famosa 🎨", category: "Creativa" } },
    { question: "Cuando hay un conflicto...", optA: { text: "Busco una solución donde todos ganen 💰", category: "Negocios" }, optB: { text: "Ayudo a que se entiendan y se sientan mejor ❤️", category: "Social" } },
    { question: "¿Qué actividad te recarga más?", optA: { text: "Crear música, dibujar o escribir en soledad 🎨", category: "Creativa" }, optB: { text: "Salir a un evento y conocer gente ❤️", category: "Social" } },
    { question: "Para decidir, ¿qué te guía?", optA: { text: "Los datos y estadísticas 🧠", category: "Maestra" }, optB: { text: "Mi intuición para los negocios 💰", category: "Negocios" } },
    { question: "¿Cómo es tu espacio?", optA: { text: "Es un collage creativo lleno de inspiración 🎨", category: "Creativa" }, optB: { text: "Es funcional y listo para estudiar tecnología 🧠", category: "Maestra" } },
    { question: "Si lideras un equipo...", optA: { text: "Capacito y motivo a cada persona ❤️", category: "Social" }, optB: { text: "Tomo decisiones difíciles y mido resultados 💰", category: "Negocios" } },
    { question: "En una enciclopedia prefieres...", optA: { text: "Cómo funciona un reactor o un motor 🧠", category: "Maestra" }, optB: { text: "Diversidad de culturas y sociedades ❤️", category: "Social" } },
    { question: "¿Qué desafío te atrae más?", optA: { text: "Lanzar un producto y hacerlo el más vendido 💰", category: "Negocios" }, optB: { text: "Crear algo totalmente original 🎨", category: "Creativa" } },
    { question: "Si un amigo tiene un problema...", optA: { text: "Le doy un abrazo y le ayudo a gestionar emociones ❤️", category: "Social" }, optB: { text: "Creamos un mapa mental paso a paso 🧠", category: "Maestra" } },
    { question: "Para un cartel importante...", optA: { text: "Diseño impactante y hermoso 🎨", category: "Creativa" }, optB: { text: "Mensaje claro que motive a comprar 💰", category: "Negocios" } }
  ];

  document.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector("[data-flash-app]");
    if (!container) {
      return;
    }

    const screenNodes = Array.from(container.querySelectorAll("[data-flash-screen]"));
    const startButtons = container.querySelectorAll("[data-flash-start]");
    const exploreButtons = container.querySelectorAll("[data-flash-explore]");
    const homeButton = container.querySelector("[data-flash-home]");
    const backButton = container.querySelector("[data-flash-back]");
    const restartButton = container.querySelector("[data-flash-restart]");
    const saveButton = container.querySelector("[data-flash-save]");

    const totalNode = container.querySelector("[data-flash-total]");
    const indexNode = container.querySelector("[data-flash-index]");
    const progressBar = container.querySelector("[data-flash-progress]");
    const questionNode = container.querySelector("[data-flash-question]");
    const optionsWrapper = container.querySelector("[data-flash-options]");

    const emojiNode = container.querySelector("[data-flash-emoji]");
    const titleNode = container.querySelector("[data-flash-title]");
    const mainNode = container.querySelector("[data-flash-main]");
    const copyNode = container.querySelector("[data-flash-copy]");
    const careersNode = container.querySelector("[data-flash-careers]");
    const feedbackNode = container.querySelector("[data-flash-feedback]");

    const categoryGrid = container.querySelector("[data-flash-category-grid]");
    const careerHeading = container.querySelector("[data-flash-career-heading]");
    const careerCopy = container.querySelector("[data-flash-career-copy]");
    const careerGrid = container.querySelector("[data-flash-career-grid]");

    const modal = document.querySelector("[data-flash-modal]");
    const modalClose = modal?.querySelector("[data-flash-modal-close]");
    const modalEmoji = modal?.querySelector("[data-flash-modal-emoji]");
    const modalTitle = modal?.querySelector("[data-flash-modal-title]");
    const modalDesc = modal?.querySelector("[data-flash-modal-desc]");
    const modalList = modal?.querySelector("[data-flash-modal-list]");

    if (totalNode) {
      totalNode.textContent = String(QUIZ_DATA.length);
    }

    let currentScreen = "welcome";
    let currentQuestion = 0;
    let scores = getInitialScores();
    let latestResults = null;
    let currentCategoryKey = null;

    const storage = window.KlesisStorage;
    const activeUser = storage?.loadActiveUser?.();

    bindEvents();
    switchScreen("welcome");

    function bindEvents() {
      startButtons.forEach((button) => {
        button.addEventListener("click", () => {
          resetQuiz();
          switchScreen("quiz");
          renderQuestion();
        });
      });

      exploreButtons.forEach((button) => {
        button.addEventListener("click", () => {
          renderCategoryCards();
          switchScreen("categories");
        });
      });

      homeButton?.addEventListener("click", () => {
        switchScreen("welcome");
      });

      backButton?.addEventListener("click", () => {
        renderCategoryCards();
        switchScreen("categories");
      });

      restartButton?.addEventListener("click", () => {
        resetQuiz();
        switchScreen("quiz");
        renderQuestion();
      });

      saveButton?.addEventListener("click", saveResults);

      modalClose?.addEventListener("click", hideModal);
      modal?.addEventListener("click", (event) => {
        if (event.target === modal) {
          hideModal();
        }
      });

      document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
          hideModal();
        }
      });
    }

    function switchScreen(key) {
      currentScreen = key;
      screenNodes.forEach((screen) => {
        const target = screen.getAttribute("data-flash-screen");
        screen.classList.toggle("hidden", target !== key);
      });
    }

    function renderQuestion() {
      if (currentQuestion >= QUIZ_DATA.length) {
        showResults();
        return;
      }
      const item = QUIZ_DATA[currentQuestion];
      if (indexNode) {
        indexNode.textContent = String(currentQuestion + 1);
      }
      if (questionNode) {
        questionNode.textContent = item.question;
      }
      renderOptions(item);
      updateProgress(currentQuestion / QUIZ_DATA.length);
    }

    function renderOptions(item) {
      if (!optionsWrapper) {
        return;
      }
      optionsWrapper.innerHTML = "";
      [item.optA, item.optB].forEach((option) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "flash-app__button";
        button.innerHTML = option.text;
        button.addEventListener("click", () => handleAnswer(option.category));
        optionsWrapper.appendChild(button);
      });
    }

    function handleAnswer(category) {
      if (optionsWrapper) {
        optionsWrapper.style.pointerEvents = "none";
      }
      scores[category] += 1;
      setTimeout(() => {
        currentQuestion += 1;
        if (optionsWrapper) {
          optionsWrapper.style.pointerEvents = "auto";
        }
        renderQuestion();
      }, 240);
    }

    function showResults() {
      const ranking = Object.entries(scores)
        .map(([key, value]) => ({ key, value }))
        .sort((a, b) => b.value - a.value);

      const top = ranking[0] ?? { key: "Creativa", value: 0 };
      const category = CATEGORY_DATA[top.key] || CATEGORY_DATA.Creativa;

      if (emojiNode) {
        emojiNode.textContent = category.emoji;
      }
      if (titleNode) {
        titleNode.textContent = `${category.title}!`;
        titleNode.style.color = category.color;
      }
      if (mainNode) {
        mainNode.textContent = top.key.toUpperCase();
        mainNode.style.color = category.color;
      }
      if (copyNode) {
        copyNode.textContent = category.description;
      }
      renderCareerChips(category);

      latestResults = {
        quizId: "minor_flash_v1",
        completedAt: new Date().toISOString(),
        mainPower: top.key,
        scores: { ...scores },
        metadata: {
          labels: Object.keys(scores),
          displayLabel: category.title,
          color: category.color
        }
      };

      setFeedback("");
      switchScreen("results");
      updateProgress(1);
    }

    function renderCareerChips(category) {
      if (!careersNode) {
        return;
      }
      careersNode.innerHTML = "";
      const sample = category.possibleCareers.slice(0, 4);
      sample.forEach((career) => {
        const chip = document.createElement("span");
        chip.className = "profile-chip";
        chip.textContent = career;
        careersNode.appendChild(chip);
      });
    }

    function saveResults() {
      if (!latestResults) {
        setFeedback("Completa el test para poder guardarlo.", "error");
        return;
      }
      if (!storage || !activeUser?.id) {
        setFeedback("Inicia sesión para guardar tus resultados.", "error");
        return;
      }
      try {
        const profile = storage.findUserById(activeUser.id);
        if (!profile) {
          setFeedback("No encontramos tu perfil.", "error");
          return;
        }
        const category = CATEGORY_DATA[latestResults.mainPower] || CATEGORY_DATA.Creativa;
        const updated = {
          ...profile,
          interestProfile: latestResults,
          recommendedCareers: [...category.possibleCareers],
          updatedAt: latestResults.completedAt
        };
        storage.upsertUser(updated);
        storage.syncActiveUser(updated);
        storage.saveTestProgress(activeUser.id, latestResults);
        setFeedback("Resultado guardado en tu perfil.", "success");
      } catch (error) {
        console.warn("minor_flash_quiz:save", error);
        setFeedback("No pudimos guardar ahora. Inténtalo más tarde.", "error");
      }
    }

    function renderCategoryCards() {
      if (!categoryGrid) {
        return;
      }
      categoryGrid.innerHTML = "";
      Object.entries(CATEGORY_DATA).forEach(([key, category]) => {
        const card = document.createElement("article");
        card.className = "flash-card";
        card.style.borderTopColor = category.color;
        card.innerHTML = `
          <div class="flash-card__title" style="color: ${category.color}">${category.emoji} ${category.title}</div>
          <p class="flash-card__desc">${category.description}</p>
          <button class="btn btn--minor" type="button" style="justify-self: start">Ver carreras</button>
        `;
        const button = card.querySelector("button");
        button.addEventListener("click", () => {
          renderCareerCards(key);
          switchScreen("careers");
        });
        categoryGrid.appendChild(card);
      });
    }

    function renderCareerCards(categoryKey) {
      const dataset = CATEGORY_DATA[categoryKey];
      if (!dataset || !careerGrid) {
        return;
      }
      currentCategoryKey = categoryKey;
      careerGrid.innerHTML = "";
      if (careerHeading) {
        careerHeading.textContent = `${dataset.emoji} ${dataset.title}`;
        careerHeading.style.color = dataset.color;
      }
      if (careerCopy) {
        careerCopy.textContent = dataset.description;
      }
      dataset.careers.forEach((career) => {
        const card = document.createElement("article");
        card.className = "flash-card";
        card.style.borderTopColor = dataset.color;
        card.tabIndex = 0;
        card.innerHTML = `
          <div class="flash-card__title" style="color: ${dataset.color}">${career.icon} ${career.name}</div>
          <p class="flash-card__desc">${career.desc}</p>
          <button class="btn btn--outline" type="button">Ver similares</button>
        `;
        const button = card.querySelector("button");
        const targetUrl = buildCareerUrl(categoryKey, career.id);
        button.addEventListener("click", () => {
          window.location.href = targetUrl;
        });
        card.addEventListener("keypress", (event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            window.location.href = targetUrl;
          }
        });
        careerGrid.appendChild(card);
      });
    }

    function showCareerModal(categoryKey, careerId) {
      const data = CATEGORY_DATA[categoryKey];
      if (!data || !modal) {
        return;
      }
      const selected = data.careers.find((career) => career.id === careerId);
      if (!selected) {
        return;
      }
      if (modalEmoji) {
        modalEmoji.textContent = selected.icon;
      }
      if (modalTitle) {
        modalTitle.textContent = selected.name;
        modalTitle.style.color = data.color;
      }
      if (modalDesc) {
        modalDesc.textContent = selected.desc;
      }
      if (modalList) {
        modalList.innerHTML = "";
        data.careers
          .filter((career) => career.id !== careerId)
          .slice(0, 5)
          .forEach((career) => {
            const li = document.createElement("li");
            li.innerHTML = `<span style="color: ${data.color}; margin-right: 6px">•</span>${career.name}`;
            modalList.appendChild(li);
          });
      }
      modal.setAttribute("data-open", "true");
    }

    function buildCareerUrl(categoryKey, careerId) {
      const params = new URLSearchParams();
      const areaSlug = CATEGORY_AREA_SLUG[categoryKey];
      if (areaSlug) {
        params.set("area", areaSlug);
      }
      const dataset = CATEGORY_DATA[categoryKey];
      const career = dataset?.careers.find((item) => item.id === careerId);
      if (career?.name) {
        params.set("q", career.name);
      }
      return `${getBasePath()}page/carreras.html?${params.toString()}`;
    }

    function getBasePath() {
      const baseAttr = document.body?.getAttribute("data-base-path") ?? "";
      if (!baseAttr) {
        return "";
      }
      return baseAttr.endsWith("/") ? baseAttr : `${baseAttr}/`;
    }

    function hideModal() {
      if (modal) {
        modal.removeAttribute("data-open");
      }
    }

    function updateProgress(fraction) {
      if (!progressBar) {
        return;
      }
      const clamp = Math.min(Math.max(fraction, 0), 1);
      progressBar.style.width = `${clamp * 100}%`;
    }

    function resetQuiz() {
      currentQuestion = 0;
      scores = getInitialScores();
      latestResults = null;
      setFeedback("");
      updateProgress(0);
    }

    function getInitialScores() {
      return { Creativa: 0, Negocios: 0, Social: 0, Maestra: 0 };
    }

    function setFeedback(message, state) {
      if (!feedbackNode) {
        return;
      }
      feedbackNode.textContent = message;
      if (!message) {
        feedbackNode.removeAttribute("data-state");
        return;
      }
      if (state) {
        feedbackNode.setAttribute("data-state", state);
      } else {
        feedbackNode.removeAttribute("data-state");
      }
    }
  });
})();
