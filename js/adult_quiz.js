(function () {
  const QUIZ_DATA = [
    { text: "Cuando veo un mapa mental o un diagrama, entiendo más rápido el concepto.", category: "Visual", image: "https://placehold.co/900x400/C7D2FE/1F2937?text=Mapa+mental" },
    { text: "Prefiero escuchar podcasts, clases grabadas o debates en vivo para aprender.", category: "Auditivo", image: "https://placehold.co/900x400/FBCFE8/1F2937?text=Podcast+educativo" },
    { text: "Aprendo mejor prototipando, moviéndome o experimentando con objetos reales.", category: "Kinestésico", image: "https://placehold.co/900x400/A7F3D0/1F2937?text=Prototipo+en+mesa" },
    { text: "Necesito comprender la lógica y tener listas de pasos para avanzar con confianza.", category: "Lógico", image: "https://placehold.co/900x400/FDE68A/1F2937?text=Lista+de+procesos" },
    { text: "Uso dashboards o visualizaciones para tomar decisiones rápidas.", category: "Visual", image: "https://placehold.co/900x400/C7D2FE/1F2937?text=Dashboard+colorido" },
    { text: "Grabo notas de voz o converso con colegas para clarificar mis ideas.", category: "Auditivo", image: "https://placehold.co/900x400/FBCFE8/1F2937?text=Reunion+virtual" },
    { text: "Me cuesta concentrarme si no estoy involucrado físicamente en la actividad.", category: "Kinestésico", image: "https://placehold.co/900x400/A7F3D0/1F2937?text=Taller+colaborativo" },
    { text: "Las hojas de cálculo, los KPIs y los frameworks me ayudan a priorizar.", category: "Lógico", image: "https://placehold.co/900x400/FDE68A/1F2937?text=KPIs+y+datos" },
    { text: "Organizo presentaciones con recursos visuales para transmitir mis ideas.", category: "Visual", image: "https://placehold.co/900x400/C7D2FE/1F2937?text=Presentacion+visual" },
    { text: "Prefiero sesiones de preguntas y respuestas a lecturas extensas.", category: "Auditivo", image: "https://placehold.co/900x400/FBCFE8/1F2937?text=Sesion+Q+A" }
  ];

  const RECOMMENDATIONS = {
    Visual: {
      headline: "Estilo Visual",
      copy: "Tu talento está en sintetizar información con recursos visuales. Potencia tu aprendizaje con tableros, esquemas y prototipos de alta fidelidad.",
      careers: ["Diseño de experiencia", "Arquitectura", "Marketing digital", "Dirección de arte"]
    },
    Auditivo: {
      headline: "Estilo Auditivo",
      copy: "Aprendes a través de la conversación y el sonido. Prioriza mentorías, masterminds y recursos de audio para mantenerte actualizado.",
      careers: ["Docencia", "Mentoría", "Comunicación corporativa", "Coaching ejecutivo"]
    },
    "Kinestésico": {
      headline: "Estilo Kinestésico",
      copy: "Necesitas poner manos a la obra para consolidar conocimientos. Incorpora simulaciones, laboratorios y experiencias inmersivas en tu agenda.",
      careers: ["Innovación de servicios", "Logística", "Operaciones", "Diseño de experiencias"]
    },
    "Lógico": {
      headline: "Estilo Lógico",
      copy: "Tu mente busca patrones y frameworks. Apóyate en analítica, casos cuantitativos y experimentos controlados para avanzar.",
      careers: ["Consultoría", "Análisis de datos", "Planeación estratégica", "Gestión de producto"]
    }
  };

  const INITIAL_SCORES = { Visual: 0, Auditivo: 0, "Kinestésico": 0, "Lógico": 0 };

  document.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector("[data-learning-quiz]");
    if (!container || typeof Chart === "undefined") {
      return;
    }

    const steps = {
      welcome: container.querySelector('[data-learning-step="welcome"]'),
      quiz: container.querySelector('[data-learning-step="quiz"]'),
      results: container.querySelector('[data-learning-step="results"]')
    };

    const startButton = container.querySelector("[data-learning-start]");
    const identifyButton = container.querySelector("[data-learning-identify]");
    const skipButton = container.querySelector("[data-learning-skip]");
    const repeatButton = container.querySelector("[data-learning-repeat]");
    const saveButton = container.querySelector("[data-learning-save]");

    const progressNode = container.querySelector("[data-learning-progress]");
    const indexNode = container.querySelector("[data-learning-index]");
    const totalNode = container.querySelector("[data-learning-total]");
    const questionNode = container.querySelector("[data-learning-question]");
    const imageNode = container.querySelector("[data-learning-image]");
    const chartCanvas = container.querySelector("[data-learning-chart]");
    const mainNode = container.querySelector("[data-learning-main]");
    const recommendationNode = container.querySelector("[data-learning-recommendation]");
    const feedbackNode = container.querySelector("[data-learning-feedback]");

    if (totalNode) {
      totalNode.textContent = String(QUIZ_DATA.length);
    }

    const storage = window.KlesisStorage;
    const activeUser = storage?.loadActiveUser?.();

    let currentIndex = 0;
    let scores = { ...INITIAL_SCORES };
    let chartInstance = null;
    let latestResults = null;

    function showStep(key) {
      Object.values(steps).forEach((step) => {
        if (step) {
          step.classList.add("hidden");
        }
      });
      const target = steps[key];
      if (target) {
        target.classList.remove("hidden");
      }
    }

    function renderQuestion() {
      if (currentIndex >= QUIZ_DATA.length) {
        showResults();
        return;
      }

      const item = QUIZ_DATA[currentIndex];
      if (indexNode) {
        indexNode.textContent = String(currentIndex + 1);
      }
      if (questionNode) {
        questionNode.textContent = item.text;
      }
      if (imageNode) {
        imageNode.src = item.image;
        imageNode.onerror = () => {
          imageNode.src = "https://placehold.co/900x400/E2E8F0/1F2937?text=Imagen+no+disponible";
        };
      }
      updateProgress(currentIndex / QUIZ_DATA.length);
      enableActions();
    }

    function handleAnswer(identified) {
      disableActions();
      if (identified) {
        const category = QUIZ_DATA[currentIndex].category;
        if (Object.prototype.hasOwnProperty.call(scores, category)) {
          scores[category] += 1;
        }
      }
      currentIndex += 1;
      window.setTimeout(renderQuestion, 140);
    }

    function showResults() {
      showStep("results");
      updateProgress(1);
      latestResults = null;
      setFeedback("");

      const mainStyle = resolveDominantStyle(scores);
      const recommendation = RECOMMENDATIONS[mainStyle] || null;

      if (mainNode) {
        mainNode.textContent = recommendation ? recommendation.headline : "Perfil equilibrado";
      }

      if (recommendationNode) {
        recommendationNode.textContent = recommendation
          ? recommendation.copy
          : "Tus resultados están balanceados entre los estilos. Explora múltiples formatos de aprendizaje.";
      }

      const labels = Object.keys(scores);
      const values = labels.map((key) => scores[key]);

      if (chartInstance) {
        chartInstance.destroy();
      }

      if (chartCanvas) {
        chartInstance = new Chart(chartCanvas.getContext("2d"), {
          type: "bar",
          data: {
            labels,
            datasets: [
              {
                label: "Nivel de identificación",
                data: values,
                backgroundColor: [
                  "rgba(37, 99, 235, 0.65)",
                  "rgba(236, 72, 153, 0.65)",
                  "rgba(16, 185, 129, 0.65)",
                  "rgba(250, 204, 21, 0.75)"
                ],
                borderRadius: 8,
                borderSkipped: false
              }
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
              x: {
                ticks: { font: { weight: "600" } },
                grid: { display: false }
              },
              y: {
                beginAtZero: true,
                grid: { color: "rgba(148, 163, 184, 0.25)" },
                ticks: { stepSize: 1 }
              }
            }
          }
        });
      }

      latestResults = {
        quizId: "learning_style_v1",
        completedAt: new Date().toISOString(),
        mainPower: mainStyle,
        scores: { ...scores },
        metadata: { type: "learning_style" }
      };
    }

    function updateProgress(fraction) {
      const safe = Math.max(0, Math.min(fraction, 1));
      if (progressNode) {
        progressNode.style.width = `${safe * 100}%`;
      }
    }

    function resetQuiz() {
      currentIndex = 0;
      scores = { ...INITIAL_SCORES };
      latestResults = null;
      showStep("welcome");
      updateProgress(0);
      setFeedback("");
    }

    function resolveDominantStyle(map) {
      let bestKey = Object.keys(map)[0];
      let bestValue = -Infinity;
      Object.entries(map).forEach(([key, value]) => {
        if (value > bestValue) {
          bestValue = value;
          bestKey = key;
        }
      });
      return bestKey;
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

    function enableActions() {
      identifyButton?.removeAttribute("disabled");
      skipButton?.removeAttribute("disabled");
    }

    function disableActions() {
      identifyButton?.setAttribute("disabled", "true");
      skipButton?.setAttribute("disabled", "true");
    }

    startButton?.addEventListener("click", () => {
      showStep("quiz");
      renderQuestion();
    });

    identifyButton?.addEventListener("click", () => handleAnswer(true));
    skipButton?.addEventListener("click", () => handleAnswer(false));

    repeatButton?.addEventListener("click", () => {
      resetQuiz();
    });

    saveButton?.addEventListener("click", () => {
      if (!latestResults) {
        setFeedback("Completa el test para guardar tus resultados.", "error");
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

        const recommendation = RECOMMENDATIONS[latestResults.mainPower] || null;
        persisted.interestProfile = latestResults;
        persisted.recommendedCareers = recommendation ? [...recommendation.careers] : [];
        persisted.updatedAt = latestResults.completedAt;
        storage.upsertUser(persisted);
        storage.syncActiveUser(persisted);
        storage.saveTestProgress(activeUser.id, latestResults);
        setFeedback("Resultado guardado en tu perfil.", "success");
      } catch (error) {
        console.warn("No se pudo guardar el autodiagnóstico", error);
        setFeedback("Ocurrió un error al guardar. Inténtalo más tarde.", "error");
      }
    });

    resetQuiz();
  });
})();
