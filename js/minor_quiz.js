(function () {
  const QUIZ_DATA = [
    {
      question: "¡Es sábado por la mañana! ¿Qué plan te suena más divertido?",
      options: [
        { text: "Armar un set de construcción complejo o dibujar un personaje increíble.", category: "Creatividad" },
        { text: "Organizar una salida al parque o ayudar en un evento de caridad.", category: "Social" },
        { text: "Ver un documental de ciencia o aprender un truco nuevo de magia.", category: "Ciencia" },
        { text: "Prefiero jugar en línea con mis amigos.", category: "" }
      ]
    },
    {
      question: "En un videojuego o deporte, ¿qué rol prefieres en tu equipo?",
      options: [
        { text: "El líder que diseña la estrategia para ganar.", category: "Liderazgo" },
        { text: "El explorador que descubre todos los secretos del mapa.", category: "Ciencia" },
        { text: "El 'healer' o soporte que se asegura de que todos estén bien.", category: "Social" },
        { text: "El que personaliza su equipo o uniforme al máximo.", category: "Creatividad" }
      ]
    },
    {
      question: "Si tuvieras que crear algo, ¿qué elegirías?",
      options: [
        { text: "Un robot que limpie tu cuarto automáticamente.", category: "Ciencia" },
        { text: "Una pintura gigante o una canción pegajosa.", category: "Creatividad" },
        { text: "Una app para conectar voluntarios con refugios de animales.", category: "Social" },
        { text: "El guion para una película de aventuras en la selva.", category: "Creatividad" }
      ]
    },
    {
      question: "Cuando te enfrentas a un problema difícil, ¿cuál es tu primera reacción?",
      options: [
        { text: "Investigar en internet y ver tutoriales hasta entenderlo.", category: "Ciencia" },
        { text: "Probar 10 ideas locas a ver si alguna funciona.", category: "Creatividad" },
        { text: "Pedir ayuda o discutirlo con amigos para encontrar una solución juntos.", category: "Social" },
        { text: "Hacer un plan paso a paso para atacarlo de forma organizada.", category: "Liderazgo" }
      ]
    },
    {
      question: "Si tuvieras un superpoder, ¿cuál sería?",
      options: [
        { text: "Súper inteligencia para inventar cosas que cambien el mundo.", category: "Ciencia" },
        { text: "Poder hablar con los animales o curar a la gente.", category: "Social" },
        { text: "Influenciar a grupos grandes para trabajar juntos.", category: "Liderazgo" },
        { text: "Convertir cualquier idea en una obra de arte al instante.", category: "Creatividad" }
      ]
    }
  ];

  const RECOMMENDATIONS = {
    Creatividad: {
      label: "¡Poder creativo!",
      copy: "Tu mente está llena de ideas únicas y te expresas mejor creando. Explora campos como diseño gráfico, producción musical, escritura, moda o arquitectura. ¡El mundo necesita tu visión!",
      careers: ["Diseño gráfico", "Animación", "Arquitectura", "Moda"]
    },
    Social: {
      label: "¡Poder de conexión!",
      copy: "Tienes una gran empatía y te energiza ayudar a otros. Tu camino podría estar en áreas como psicología, enseñanza, medicina, trabajo social o gestión de equipos. ¡Eres un gran apoyo!",
      careers: ["Psicología", "Trabajo social", "Docencia", "Medicina"]
    },
    Ciencia: {
      label: "¡Poder de ingenio!",
      copy: "Te encanta descubrir cómo funcionan las cosas y resolver problemas lógicos. Piensa en carreras STEM: programación, ingeniería, biología, investigación espacial o desarrollo de videojuegos. ¡La innovación es tu destino!",
      careers: ["Ingeniería", "Programación", "Biología", "Robótica"]
    },
    Liderazgo: {
      label: "¡Poder de estrategia!",
      copy: "Tienes una habilidad natural para organizar, tomar decisiones y guiar a otros. Eres un potencial emprendedor, gerente de proyectos, líder comunitario o político. ¡Tu visión es clave!",
      careers: ["Emprendimiento", "Gestión de proyectos", "Política", "Administración"]
    }
  };

  function getInitialScores() {
    return {
      Creatividad: 0,
      Social: 0,
      Ciencia: 0,
      Liderazgo: 0
    };
  }

  function getChartColors() {
    return {
      fill: "rgba(37, 99, 235, 0.35)",
      border: "rgba(37, 99, 235, 0.9)",
      point: "rgba(236, 72, 153, 0.9)"
    };
  }

  document.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector("[data-quiz-app]");
    if (!container || typeof Chart === "undefined") {
      return;
    }

    const steps = {
      welcome: container.querySelector('[data-quiz-step="welcome"]'),
      quiz: container.querySelector('[data-quiz-step="quiz"]'),
      results: container.querySelector('[data-quiz-step="results"]')
    };

    const startButton = container.querySelector("[data-quiz-start]");
    const repeatButton = container.querySelector("[data-quiz-repeat]");
    const saveButton = container.querySelector("[data-quiz-save]");
    const saveFeedback = container.querySelector("[data-quiz-save-feedback]");
    const optionsWrapper = container.querySelector("[data-quiz-options]");
    const questionLabel = container.querySelector("[data-quiz-question]");
    const progressMeter = container.querySelector("[data-quiz-progress]");
    const questionIndexLabel = container.querySelector("[data-quiz-index]");
    const totalLabel = container.querySelector("[data-quiz-total]");
    const resultTitle = container.querySelector("[data-quiz-result-title]");
    const resultRecommendation = container.querySelector("[data-quiz-recommendation]");
    const chartCanvas = container.querySelector("[data-quiz-chart]");

    if (!startButton || !optionsWrapper || !questionLabel || !progressMeter || !chartCanvas) {
      return;
    }

    if (totalLabel) {
      totalLabel.textContent = String(QUIZ_DATA.length);
    }

    let currentQuestionIndex = 0;
    let scores = getInitialScores();
    let chartInstance = null;
    let latestResults = null;

    const storage = window.KlesisStorage;
    const currentUser = storage?.loadActiveUser?.();

    const showStep = (key) => {
      Object.values(steps).forEach((step) => {
        if (step) {
          step.classList.add("hidden");
        }
      });
      const target = steps[key];
      if (target) {
        target.classList.remove("hidden");
      }
    };

    const resetQuiz = () => {
      currentQuestionIndex = 0;
      scores = getInitialScores();
      updateProgress(0);
      showStep("welcome");
      latestResults = null;
      setSaveStatus("");
    };

    const updateProgress = (fraction) => {
      const safeFraction = Math.max(0, Math.min(fraction, 1));
      progressMeter.style.width = `${safeFraction * 100}%`;
    };

    const renderQuestion = () => {
      if (currentQuestionIndex >= QUIZ_DATA.length) {
        showResults();
        return;
      }

      const data = QUIZ_DATA[currentQuestionIndex];
      if (questionIndexLabel) {
        questionIndexLabel.textContent = String(currentQuestionIndex + 1);
      }
      questionLabel.textContent = data.question;
      optionsWrapper.innerHTML = "";

      data.options.forEach((option) => {
        const button = document.createElement("button");
        button.type = "button";
        button.textContent = option.text;
        button.addEventListener("click", () => handleAnswer(option.category));
        optionsWrapper.appendChild(button);
      });

      updateProgress(currentQuestionIndex / QUIZ_DATA.length);
    };

    const handleAnswer = (category) => {
      if (category && Object.prototype.hasOwnProperty.call(scores, category)) {
        scores[category] += 1;
      }
      currentQuestionIndex += 1;
      renderQuestion();
    };

    const resolveMainPower = () => {
      let champion = null;
      let championScore = -Infinity;
      Object.entries(scores).forEach(([key, value]) => {
        if (value > championScore) {
          championScore = value;
          champion = key;
        }
      });
      return champion || "Balance";
    };

    const showResults = () => {
      showStep("results");
      updateProgress(1);
      setSaveStatus("");

      const mainPower = resolveMainPower();
      const recommendation = RECOMMENDATIONS[mainPower];

      if (resultTitle) {
        resultTitle.textContent = recommendation ? recommendation.label : "¡Poder balance!";
      }

      if (resultRecommendation) {
        resultRecommendation.textContent = recommendation
          ? recommendation.copy
          : "Tienes un perfil equilibrado y puedes adaptarte a muchos caminos. ¡Explora diferentes misiones para descubrir nuevas pasiones!";
      }

      chartInstance = renderChart(chartCanvas, scores, chartInstance);

      if (storage && currentUser?.segment === "minor" && currentUser?.id) {
        latestResults = {
          quizId: "superpower_v1",
          completedAt: new Date().toISOString(),
          mainPower,
          scores
        };
      } else {
        latestResults = null;
      }
    };

    const renderChart = (canvas, scoreMap, previousChart) => {
      if (!canvas) {
        return null;
      }

      if (previousChart) {
        previousChart.destroy();
      }

      const labels = Object.keys(scoreMap);
      const values = labels.map((label) => scoreMap[label]);
      const colors = getChartColors();

      return new Chart(canvas.getContext("2d"), {
        type: "radar",
        data: {
          labels,
          datasets: [
            {
              label: "Tu perfil",
              data: values,
              backgroundColor: colors.fill,
              borderColor: colors.border,
              borderWidth: 2,
              pointBackgroundColor: colors.point,
              pointBorderColor: "#ffffff",
              pointHoverBackgroundColor: "#ffffff",
              pointHoverBorderColor: colors.point
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false }
          },
          scales: {
            r: {
              suggestedMin: 0,
              suggestedMax: Math.max(3, Math.max(...values, 3)),
              ticks: { display: false },
              grid: { color: "rgba(15, 23, 42, 0.12)" },
              angleLines: { color: "rgba(15, 23, 42, 0.12)" },
              pointLabels: {
                font: { size: 13, weight: "600" },
                color: "rgba(15, 23, 42, 0.86)"
              }
            }
          }
        }
      });
    };

    if (startButton) {
      startButton.addEventListener("click", () => {
        scores = getInitialScores();
        currentQuestionIndex = 0;
        showStep("quiz");
        renderQuestion();
      });
    }

    if (repeatButton) {
      repeatButton.addEventListener("click", () => {
        scores = getInitialScores();
        currentQuestionIndex = 0;
        showStep("quiz");
        renderQuestion();
      });
    }

    if (saveButton) {
      saveButton.addEventListener("click", () => {
        if (!latestResults) {
          setSaveStatus("Completa el test antes de guardarlo.", "error");
          return;
        }
        if (!storage || !currentUser?.id || !latestResults) {
          setSaveStatus("Inicia sesión para guardar tus resultados.", "error");
          return;
        }

        try {
          const recommendation = latestResults ? RECOMMENDATIONS[latestResults.mainPower] : null;
          storage.saveTestProgress(currentUser.id, latestResults);
          const persisted = storage.findUserById(currentUser.id);
          if (persisted) {
            persisted.interestProfile = latestResults;
            persisted.recommendedCareers = recommendation ? [...recommendation.careers] : Array.isArray(persisted.recommendedCareers)
              ? persisted.recommendedCareers
              : [];
            persisted.updatedAt = latestResults.completedAt;
            storage.upsertUser(persisted);
            storage.syncActiveUser(persisted);
          }
          setSaveStatus("Resultado guardado en tu perfil.", "success");
        } catch (error) {
          console.warn("No se pudo guardar el test", error);
          setSaveStatus("No pudimos guardar ahora. Inténtalo más tarde.", "error");
        }
      });
    }

    resetQuiz();

    function setSaveStatus(message, state) {
      if (!saveFeedback) {
        return;
      }
      saveFeedback.textContent = message;
      if (!message) {
        saveFeedback.removeAttribute("data-state");
        return;
      }
      if (state) {
        saveFeedback.setAttribute("data-state", state);
      } else {
        saveFeedback.removeAttribute("data-state");
      }
    }
  });
})();
