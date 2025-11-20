(function () {
  const CATEGORY_DEFS = {
    "Técnico": { label: "Técnico", initial: "T", color: "#16A34A" },
    "Investigación": { label: "Investigación", initial: "I", color: "#2563EB" },
    "Creativo": { label: "Creativo", initial: "A", color: "#EC4899" },
    "Social": { label: "Social", initial: "S", color: "#FBBF24" },
    "Liderazgo": { label: "Liderazgo", initial: "E", color: "#F87171" },
    "Detalle": { label: "Detalle", initial: "C", color: "#A78BFA" }
  };

  const VOCATIONAL_RECOMMENDATIONS = {
    TA: {
      title: "Técnico-Creativo",
      copy: "Combinas habilidades manuales con una mente orientada al diseño. Busca proyectos donde puedas prototipar y dar forma a ideas innovadoras.",
      careers: [
        "Arquitectura",
        "Ingeniería industrial",
        "Diseño de productos",
        "Diseño web (frontend)",
        "Escenografía"
      ]
    },
    TI: {
      title: "Técnico-Investigación",
      copy: "Te motivan los desafíos prácticos respaldados por datos. Analiza caminos en robótica, mantenimiento especializado o ciencias aplicadas.",
      careers: [
        "Ingeniería mecánica",
        "Robótica",
        "Tecnología automotriz",
        "Ciencias forenses",
        "Geología"
      ]
    },
    TS: {
      title: "Técnico-Social",
      copy: "Te interesa ayudar a otros con soluciones concretas. Considera roles asistenciales o de intervención directa.",
      careers: [
        "Fisioterapia",
        "Enfermería",
        "Terapia ocupacional",
        "Servicios de emergencia",
        "Rehabilitación"
      ]
    },
    TE: {
      title: "Técnico-Liderazgo",
      copy: "Dirigir equipos y gestionar operaciones es tu zona de impacto. Coordina proyectos donde la ejecución impecable sea clave.",
      careers: [
        "Gerencia de proyectos",
        "Administración hotelera",
        "Operaciones logísticas",
        "Emprendimiento industrial",
        "Facility management"
      ]
    },
    TC: {
      title: "Técnico-Detalle",
      copy: "Garantizas calidad y precisión. Busca roles donde la inspección, el control y la mejora continua sean el eje.",
      careers: [
        "Control de calidad",
        "Topografía",
        "Laboratorio clínico",
        "Mantenimiento de sistemas",
        "Metrología"
      ]
    },
    IA: {
      title: "Investigación-Creativo",
      copy: "Innovas desde el análisis profundo. Combina ciencia, diseño y narrativa para generar propuestas disruptivas.",
      careers: [
        "Diseño de videojuegos",
        "Investigación artística",
        "Periodismo de datos",
        "Publicidad creativa",
        "Storytelling científico"
      ]
    },
    IS: {
      title: "Investigación-Social",
      copy: "Quieres entender el comportamiento humano. Tu talento brilla en contextos de investigación aplicada y políticas públicas.",
      careers: [
        "Psicología",
        "Sociología",
        "Antropología",
        "Investigación de mercados",
        "Lingüística"
      ]
    },
    IE: {
      title: "Investigación-Liderazgo",
      copy: "Transformas datos en estrategia. Lidera iniciativas donde decidir con evidencia sea la regla.",
      careers: [
        "Ciencia de datos",
        "Finanzas",
        "Consultoría de negocios",
        "Gestión de I+D",
        "Planeación estratégica"
      ]
    },
    IC: {
      title: "Investigación-Detalle",
      copy: "Tu precisión matemática es diferencial. Explora trayectorias analíticas con foco en métricas y riesgo.",
      careers: [
        "Actuaría",
        "Contabilidad",
        "Informática",
        "Análisis financiero",
        "Auditoría"
      ]
    },
    AS: {
      title: "Creativo-Social",
      copy: "Tu creatividad inspira y educa. Combina comunicación, arte y acompañamiento.",
      careers: [
        "Terapia de arte",
        "UX writing",
        "Marketing social",
        "Diseño de modas sostenible",
        "Gestión cultural"
      ]
    },
    AE: {
      title: "Creativo-Liderazgo",
      copy: "Eres la persona que dirige la visión. Lidera proyectos creativos con enfoque comercial.",
      careers: [
        "Dirección de cine",
        "Gestión cultural",
        "Brand management",
        "Publicidad",
        "Emprendimiento creativo"
      ]
    },
    AC: {
      title: "Creativo-Detalle",
      copy: "Equilibras estética y estructura. Ideal para entornos con alto control de calidad visual.",
      careers: [
        "Edición profesional",
        "Diseño gráfico técnico",
        "Arquitectura de información",
        "Producción editorial",
        "Animación técnica"
      ]
    },
    SE: {
      title: "Social-Liderazgo",
      copy: "Lideras cambios con sentido humano. Potencia organizaciones centradas en las personas.",
      careers: [
        "Recursos humanos",
        "Trabajo social directivo",
        "Derecho",
        "Política pública",
        "Mentoría comunitaria"
      ]
    },
    SC: {
      title: "Social-Detalle",
      copy: "Ayudas organizando. Gestiona procesos críticos para poblaciones diversas.",
      careers: [
        "Administración hospitalaria",
        "Asistencia legal",
        "Gestión de casos",
        "Bibliotecología",
        "Coordinación educativa"
      ]
    },
    EC: {
      title: "Liderazgo-Detalle",
      copy: "Diriges con métricas. Tus decisiones mezclan visión y control presupuestal.",
      careers: [
        "Administración de empresas",
        "Finanzas corporativas",
        "Logística",
        "Planificación de eventos",
        "Dirección de operaciones"
      ]
    },
    DEFAULT: {
      title: "Perfil equilibrado",
      copy: "Tus intereses están distribuidos. Elige el área que te cause más curiosidad para seguir profundizando.",
      careers: [
        "Mentorías exploratorias",
        "Rotaciones profesionales",
        "Programas de trainee",
        "Voluntariados sectoriales"
      ]
    }
  };

  const QUIZ_ITEMS = [
    { text: "Disfruto construir o reparar objetos con mis manos.", category: "Técnico" },
    { text: "Dominar máquinas o herramientas complejas me entusiasma.", category: "Técnico" },
    { text: "Prefiero entornos de trabajo al aire libre o talleres.", category: "Técnico" },
    { text: "Me atraen profesiones operativas como mantenimiento, seguridad o manejo de maquinaria.", category: "Técnico" },
    { text: "Siento satisfacción al realizar mantenimiento preventivo en mis dispositivos.", category: "Técnico" },
    { text: "Investigar a fondo un tema me resulta motivador.", category: "Investigación" },
    { text: "Disfruto encontrar patrones y resolver acertijos lógicos.", category: "Investigación" },
    { text: "Sigo con interés noticias científicas y avances tecnológicos.", category: "Investigación" },
    { text: "Prefiero lecturas profundas como ensayos o artículos especializados.", category: "Investigación" },
    { text: "Frente a un reto, recolecto datos y analizo antes de decidir.", category: "Investigación" },
    { text: "Crear ilustraciones, música o contenido audiovisual me inspira.", category: "Creativo" },
    { text: "Escribir historias, guiones o crónicas es una actividad natural para mí.", category: "Creativo" },
    { text: "Me interesa producir o editar videos, podcasts o fotografías.", category: "Creativo" },
    { text: "Las expresiones artísticas influyen en mis decisiones profesionales.", category: "Creativo" },
    { text: "Imaginar mundos, productos o personajes nuevos me resulta sencillo.", category: "Creativo" },
    { text: "Ayudar a otras personas con sus retos me genera energía.", category: "Social" },
    { text: "Considero carreras vinculadas a salud, educación o intervención social.", category: "Social" },
    { text: "Escuchar activamente y mediar conversaciones es una fortaleza.", category: "Social" },
    { text: "Me moviliza la justicia social y los cambios comunitarios.", category: "Social" },
    { text: "Me veo trabajando en organizaciones cuyo propósito sea ayudar.", category: "Social" },
    { text: "Convencer, influir y vender ideas es algo que disfruto.", category: "Liderazgo" },
    { text: "Organizar equipos, eventos o proyectos me resulta natural.", category: "Liderazgo" },
    { text: "Me imagino liderando un negocio o emprendimiento.", category: "Liderazgo" },
    { text: "Tomar la iniciativa y asignar responsabilidades no me intimida.", category: "Liderazgo" },
    { text: "Negociar acuerdos o encontrar puntos medios se me facilita.", category: "Liderazgo" },
    { text: "Ordenar información y clasificar datos es algo que disfruto.", category: "Detalle" },
    { text: "Soy detallista y detecto errores menores con facilidad.", category: "Detalle" },
    { text: "Gestionar presupuestos o inventarios es una actividad atractiva.", category: "Detalle" },
    { text: "Mantengo mis archivos físicos o digitales perfectamente organizados.", category: "Detalle" },
    { text: "Analizar tablas y reportes numéricos me resulta interesante.", category: "Detalle" }
  ];

  document.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector("[data-voc-app]");
    if (!container || typeof Chart === "undefined") {
      return;
    }

    const storage = window.KlesisStorage;
    const activeUser = storage?.loadActiveUser?.();

    const steps = Array.from(container.querySelectorAll("[data-voc-step]"));
    const totalNode = container.querySelector("[data-voc-total]");
    const indexNode = container.querySelector("[data-voc-index]");
    const progressBar = container.querySelector("[data-voc-progress]");
    const questionNode = container.querySelector("[data-voc-question]");
    const optionsWrapper = container.querySelector("[data-voc-options]");
    const nextButton = container.querySelector("[data-voc-next]");
    const startButton = container.querySelector("[data-voc-start]");
    const repeatButton = container.querySelector("[data-voc-repeat]");
    const saveButton = container.querySelector("[data-voc-save]");
    const chartCanvas = container.querySelector("[data-voc-chart]");
    const codeNode = container.querySelector("[data-voc-code]");
    const copyNode = container.querySelector("[data-voc-copy]");
    const feedbackNode = container.querySelector("[data-voc-feedback]");

    if (totalNode) {
      totalNode.textContent = String(QUIZ_ITEMS.length);
    }

    let currentIndex = 0;
    let scores = getInitialScores();
    let currentSelection = null;
    let chartInstance = null;
    let latestResults = null;

    renderScoreButtons();
    bindEvents();
    showStep("welcome");

    function bindEvents() {
      startButton?.addEventListener("click", () => {
        resetState();
        showStep("quiz");
        renderQuestion();
      });

      nextButton?.addEventListener("click", () => {
        if (currentSelection == null) {
          return;
        }
        const item = QUIZ_ITEMS[currentIndex];
        scores[item.category] += currentSelection;
        currentIndex += 1;
        renderQuestion();
      });

      repeatButton?.addEventListener("click", () => {
        resetState();
        showStep("quiz");
        renderQuestion();
      });

      saveButton?.addEventListener("click", () => {
        if (!latestResults) {
          setFeedback("Completa y guarda el test para registrar tus resultados.", "error");
          return;
        }
        if (!storage || !activeUser?.id) {
          setFeedback("Inicia sesión como adulto para guardar en tu perfil.", "error");
          return;
        }
        try {
          const persisted = storage.findUserById(activeUser.id);
          if (!persisted) {
            setFeedback("No encontramos tu perfil completo.", "error");
            return;
          }
          const recommendationKey = latestResults.metadata?.recommendationCode ?? "DEFAULT";
          const recommendation = VOCATIONAL_RECOMMENDATIONS[recommendationKey] || VOCATIONAL_RECOMMENDATIONS.DEFAULT;
          const stamped = {
            ...persisted,
            interestProfile: latestResults,
            recommendedCareers: [...recommendation.careers],
            updatedAt: latestResults.completedAt
          };
          storage.upsertUser(stamped);
          storage.syncActiveUser(stamped);
          storage.saveTestProgress(activeUser.id, latestResults);
          setFeedback("Resultado guardado en tu perfil.", "success");
        } catch (error) {
          console.warn("adult_vocational_test:save", error);
          setFeedback("No pudimos guardar ahora. Inténtalo nuevamente.", "error");
        }
      });
    }

    function renderQuestion() {
      if (currentIndex >= QUIZ_ITEMS.length) {
        showResults();
        return;
      }

      const item = QUIZ_ITEMS[currentIndex];
      if (indexNode) {
        indexNode.textContent = String(currentIndex + 1);
      }
      if (questionNode) {
        questionNode.textContent = item.text;
      }
      currentSelection = null;
      setButtonState();
      updateProgress(currentIndex / QUIZ_ITEMS.length);
    }

    function showResults() {
      showStep("results");
      updateProgress(1);
      setFeedback("");

      const ranking = Object.entries(scores)
        .map(([key, value]) => ({ key, value }))
        .sort((a, b) => b.value - a.value);

      const topPrimary = ranking[0] ?? { key: "Técnico", value: 0 };
      const topSecondary = ranking[1] ?? { key: "Creativo", value: 0 };

      const codeKey = buildCode(topPrimary.key, topSecondary.key);
      const recommendation = VOCATIONAL_RECOMMENDATIONS[codeKey] || VOCATIONAL_RECOMMENDATIONS.DEFAULT;

      if (codeNode) {
        codeNode.textContent = `${codeKey} · ${recommendation.title}`;
      }

      if (copyNode) {
        copyNode.textContent = recommendation.copy;
      }

      renderChart(scores);

      latestResults = {
        quizId: "vocational_compass_v1",
        completedAt: new Date().toISOString(),
        mainPower: topPrimary.key,
        scores: { ...scores },
        metadata: {
          labels: Object.keys(scores),
          secondary: topSecondary.key,
          recommendationCode: codeKey,
          displayLabel: topPrimary.key
        }
      };
    }

    function renderChart(dataMap) {
      if (!chartCanvas) {
        return;
      }
      if (chartInstance) {
        chartInstance.destroy();
      }
      const labels = Object.keys(dataMap);
      const values = labels.map((label) => dataMap[label]);
      chartInstance = new Chart(chartCanvas.getContext("2d"), {
        type: "radar",
        data: {
          labels,
          datasets: [
            {
              label: "Intereses",
              data: values,
              backgroundColor: "rgba(37, 99, 235, 0.35)",
              borderColor: "rgba(37, 99, 235, 0.85)",
              pointBackgroundColor: "rgba(236, 72, 153, 0.9)",
              pointBorderColor: "#ffffff",
              borderWidth: 2
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
              suggestedMax: Math.max(25, Math.max(...values, 25)),
              ticks: { display: false },
              grid: { color: "rgba(148, 163, 184, 0.25)" },
              angleLines: { color: "rgba(148, 163, 184, 0.25)" },
              pointLabels: {
                font: { size: 13, weight: "600" },
                color: "rgba(15, 23, 42, 0.78)"
              }
            }
          }
        }
      });
    }

    function renderScoreButtons() {
      if (!optionsWrapper) {
        return;
      }
      optionsWrapper.innerHTML = "";
      for (let value = 1; value <= 5; value += 1) {
        const button = document.createElement("button");
        button.type = "button";
        button.textContent = String(value);
        button.setAttribute("data-value", String(value));
        button.addEventListener("click", () => {
          currentSelection = value;
          setButtonState();
        });
        optionsWrapper.appendChild(button);
      }
    }

    function showStep(key) {
      steps.forEach((step) => {
        const target = step.getAttribute("data-voc-step");
        step.classList.toggle("hidden", target !== key);
      });
    }

    function setButtonState() {
      const buttons = optionsWrapper?.querySelectorAll("button") ?? [];
      buttons.forEach((button) => {
        const value = Number(button.getAttribute("data-value"));
        button.setAttribute("data-selected", currentSelection === value ? "true" : "false");
      });
      if (nextButton) {
        if (currentSelection == null) {
          nextButton.setAttribute("disabled", "true");
        } else {
          nextButton.removeAttribute("disabled");
        }
      }
    }

    function updateProgress(fraction) {
      if (!progressBar) {
        return;
      }
      const clamp = Math.min(Math.max(fraction, 0), 1);
      progressBar.style.width = `${clamp * 100}%`;
    }

    function resetState() {
      currentIndex = 0;
      scores = getInitialScores();
      currentSelection = null;
      latestResults = null;
      setFeedback("");
      updateProgress(0);
      setButtonState();
    }

    function getInitialScores() {
      return Object.keys(CATEGORY_DEFS).reduce((acc, key) => {
        acc[key] = 0;
        return acc;
      }, {});
    }

    function buildCode(primary, secondary) {
      if (!primary || !secondary || primary === secondary) {
        return "DEFAULT";
      }
      const first = CATEGORY_DEFS[primary]?.initial ?? primary.charAt(0);
      const second = CATEGORY_DEFS[secondary]?.initial ?? secondary.charAt(0);
      const pair = first + second;
      const reverse = second + first;
      if (VOCATIONAL_RECOMMENDATIONS[pair]) {
        return pair;
      }
      if (VOCATIONAL_RECOMMENDATIONS[reverse]) {
        return reverse;
      }
      return "DEFAULT";
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
