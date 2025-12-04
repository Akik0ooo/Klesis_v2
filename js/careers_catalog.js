(function () {
  const COST_LEVELS = ["bajo", "medio", "alto"];
  const COST_INDEX = new Map(COST_LEVELS.map((level, index) => [level, index]));

  const BASE_CAREERS = [
    buildBaseCareer(
      "software_engineering",
      "Ingeniería de software",
      "💻",
      ["Tecnología", "Innovación", "Pensamiento lógico"],
      "Desarrolla software y plataformas digitales que impactan a millones de personas.",
      "Ideal para perfiles Maestra y Creativa."
    ),
    buildBaseCareer(
      "data_science",
      "Ciencia de datos",
      "📊",
      ["Análisis", "Modelado", "Impacto"],
      "Convierte datos complejos en decisiones informadas.",
      "Alta afinidad con Maestra y Liderazgo."
    ),
    buildBaseCareer(
      "cyber_security",
      "Ciberseguridad",
      "🛡️",
      ["Protección", "Tecnología", "Riesgo"],
      "Protege sistemas críticos contra amenazas globales.",
      "Se alinea con Maestra y Técnico."
    ),
    buildBaseCareer(
      "psychology",
      "Psicología",
      "🧠",
      ["Acompañamiento", "Investigación", "Empatía"],
      "Acompaña procesos personales y comunitarios desde la comprensión humana.",
      "Exploradores Sociales brillan aquí."
    ),
    buildBaseCareer(
      "medicine",
      "Medicina",
      "⚕️",
      ["Salud", "Investigación", "Resiliencia"],
      "Previene, diagnostica y trata para mejorar la salud mundial.",
      "Compatible con Social y Técnico."
    ),
    buildBaseCareer(
      "nursing",
      "Enfermería",
      "🩺",
      ["Cuidado", "Gestión clínica", "Trabajo en equipo"],
      "Gestiona cuidados clínicos centrados en las personas.",
      "Recomendada para Social y Técnico."
    ),
    buildBaseCareer(
      "architecture",
      "Arquitectura",
      "🏛️",
      ["Creatividad", "Urbanismo", "Ingeniería"],
      "Diseña espacios funcionales y memorables.",
      "Potencia perfiles Creativa y Maestra."
    ),
    buildBaseCareer(
      "graphic_design",
      "Diseño gráfico",
      "🎨",
      ["Creatividad", "Narrativa visual", "Branding"],
      "Comunica ideas poderosas con identidad visual.",
      "Afinidad alta con Creativa."
    ),
    buildBaseCareer(
      "industrial_design",
      "Diseño industrial",
      "🛠️",
      ["Prototipado", "Investigación", "Innovación"],
      "Transforma ideas en productos útiles y deseables.",
      "Un puente entre Creativa y Técnico."
    ),
    buildBaseCareer(
      "business_management",
      "Administración y dirección de empresas",
      "📈",
      ["Estrategia", "Análisis", "Emprendimiento"],
      "Lidera organizaciones y diseña estrategias sustentables.",
      "Perfecta para Liderazgo y Negocios."
    ),
    buildBaseCareer(
      "marketing_digital",
      "Marketing digital",
      "📣",
      ["Storytelling", "Datos", "Creatividad"],
      "Conecta audiencias y marcas con campañas memorables.",
      "Creativa y Liderazgo brillan acá."
    ),
    buildBaseCareer(
      "finance",
      "Finanzas",
      "💹",
      ["Análisis", "Riesgo", "Planificación"],
      "Gestiona recursos y decisiones económicas de alto impacto.",
      "Requiere Liderazgo y Maestra."
    ),
    buildBaseCareer(
      "economics",
      "Economía",
      "🌐",
      ["Investigación", "Política pública", "Modelado"],
      "Comprende mercados y políticas para impulsar desarrollo.",
      "Compatible con Maestra e Investigación."
    ),
    buildBaseCareer(
      "international_relations",
      "Relaciones internacionales",
      "🕊️",
      ["Diplomacia", "Comunicación", "Impacto global"],
      "Coordina acuerdos y políticas para la cooperación global.",
      "Social y Liderazgo destacan aquí."
    ),
    buildBaseCareer(
      "environmental_engineering",
      "Ingeniería ambiental",
      "🌿",
      ["Sustentabilidad", "Investigación", "Tecnología"],
      "Diseña soluciones para proteger el planeta.",
      "Maestra y Social lo disfrutarán."
    ),
    buildBaseCareer(
      "biotechnology",
      "Biotecnología",
      "🧬",
      ["Laboratorio", "Innovación", "Salud"],
      "Aplica ciencia para transformar la salud y el ambiente.",
      "Exige Maestra y Creativa."
    ),
    buildBaseCareer(
      "teacher_education",
      "Pedagogía y educación",
      "🍎",
      ["Docencia", "Empatía", "Creatividad"],
      "Diseña experiencias de aprendizaje para todas las edades.",
      "Social y Creativa conectan naturalmente."
    ),
    buildBaseCareer(
      "social_work",
      "Trabajo social",
      "🤝",
      ["Equidad", "Impacto comunitario", "Gestión"],
      "Acompaña comunidades para mejorar su bienestar.",
      "Social es el motor principal."
    ),
    buildBaseCareer(
      "journalism",
      "Periodismo y medios",
      "📰",
      ["Narrativa", "Investigación", "Comunicación"],
      "Informa y narra historias que transforman sociedades.",
      "Creativa y Social tienen ventaja."
    ),
    buildBaseCareer(
      "law",
      "Derecho",
      "⚖️",
      ["Justicia", "Argumentación", "Política"],
      "Defiende derechos y estructura marcos legales.",
      "Liderazgo y Social confluyen aquí."
    ),
    buildBaseCareer(
      "culinary_arts",
      "Artes culinarias",
      "🍽️",
      ["Creatividad", "Servicio", "Emprendimiento"],
      "Crea experiencias gastronómicas memorables.",
      "Creativa y Social disfrutan este mundo."
    ),
    buildBaseCareer(
      "hospitality_management",
      "Gestión hotelera y turística",
      "🏨",
      ["Servicio", "Gestión", "Cultura"],
      "Diseña experiencias de hospitalidad de clase mundial.",
      "Social y Liderazgo se potencian."
    ),
    buildBaseCareer(
      "video_game_design",
      "Diseño de videojuegos",
      "🎮",
      ["Narrativa", "Tecnología", "Arte"],
      "Crea universos interactivos con impacto global.",
      "Creativa y Maestra se fusionan."
    ),
    buildBaseCareer(
      "robotics",
      "Robótica",
      "🤖",
      ["Ingeniería", "Programación", "Innovación"],
      "Integra hardware y software para automatizar el futuro.",
      "Maestra y Técnico tienen protagonismo."
    ),
    buildBaseCareer(
      "public_health",
      "Salud pública",
      "🩹",
      ["Políticas", "Datos", "Comunidad"],
      "Diseña estrategias que protegen a poblaciones completas.",
      "Liderazgo y Social con visión global."
    ),
    buildBaseCareer(
      "urban_planning",
      "Planeación urbana",
      "🏙️",
      ["Sustentabilidad", "Datos", "Diseño"],
      "Imagina ciudades inclusivas y resilientes.",
      "Creativa, Social y Maestra colaboran."
    ),
    buildBaseCareer(
      "renewable_energy",
      "Energías renovables",
      "⚡",
      ["Innovación", "Infraestructura", "Impacto"],
      "Impulsa la transición energética mundial.",
      "Maestra y Técnico a la vanguardia."
    ),
    buildBaseCareer(
      "sports_management",
      "Gestión deportiva",
      "🏅",
      ["Liderazgo", "Mercadeo", "Ciencia"],
      "Administra organizaciones deportivas y eventos icónicos.",
      "Liderazgo y Social disfrutan del desafío."
    ),
    buildBaseCareer(
      "audiovisual_production",
      "Producción audiovisual",
      "🎬",
      ["Storytelling", "Tecnología", "Creatividad"],
      "Produce contenidos que mueven emociones en todo el mundo.",
      "Creativa y Maestra brillan."
    ),
    buildBaseCareer(
      "fashion_design",
      "Diseño de modas",
      "👗",
      ["Creatividad", "Tendencias", "Emprendimiento"],
      "Construye marcas y colecciones con identidad propia.",
      "Creativa y Liderazgo al máximo."
    ),
    buildBaseCareer(
      "veterinary_science",
      "Medicina veterinaria",
      "🐾",
      ["Cuidado", "Investigación", "Resiliencia"],
      "Protege la salud animal y ecosistemas completos.",
      "Social y Técnico comprometidos."
    ),
    buildBaseCareer(
      "aerospace_engineering",
      "Ingeniería aeroespacial",
      "🚀",
      ["Innovación", "Matemáticas", "Exploración"],
      "Diseña vehículos y misiones más allá de la atmósfera.",
      "Maestra y Técnico sueñan alto."
    ),
    buildBaseCareer(
      "ux_design",
      "Diseño UX/UI",
      "🧩",
      ["Investigación", "Diseño", "Tecnología"],
      "Crea experiencias digitales intuitivas y humanas.",
      "Creativa y Maestra en sinergia."
    ),
    buildBaseCareer(
      "logistics",
      "Logística y cadenas de suministro",
      "🚚",
      ["Eficiencia", "Datos", "Gestión"],
      "Optimiza el movimiento global de productos.",
      "Liderazgo y Técnico coordinan."
    ),
    buildBaseCareer(
      "communications",
      "Comunicación corporativa",
      "💬",
      ["Reputación", "Crisis", "Narrativa"],
      "Gestiona la voz pública de organizaciones.",
      "Social y Liderazgo estratégicos."
    ),
    buildBaseCareer(
      "education_technology",
      "Tecnologías educativas",
      "📱",
      ["Innovación", "Aprendizaje", "Diseño"],
      "Construye plataformas que transforman la enseñanza.",
      "Creativa y Maestra crea futuro."
    ),
    buildBaseCareer(
      "marine_biology",
      "Biología marina",
      "🌊",
      ["Investigación", "Conservación", "Aventura"],
      "Explora océanos para proteger su biodiversidad.",
      "Social y Maestra comprometidas."
    ),
    buildBaseCareer(
      "renewable_policy",
      "Políticas de sostenibilidad",
      "♻️",
      ["Impacto", "Economía", "Regulación"],
      "Diseña marcos que impulsan cambios climáticos positivos.",
      "Liderazgo y Maestra visionarias."
    ),
    buildBaseCareer(
      "ai_ethics",
      "Ética de inteligencia artificial",
      "🤖",
      ["Filosofía", "Tecnología", "Derechos"],
      "Equilibra innovación y responsabilidad en IA.",
      "Maestra, Social y Liderazgo."
    ),
    buildBaseCareer(
      "digital_health",
      "Salud digital",
      "🩻",
      ["Innovación", "Datos", "Bienestar"],
      "Conecta tecnología y medicina para prevenir y cuidar.",
      "Maestra y Social avanzan."
    )
  ];

  const REGION_VARIANTS = [
    { key: "norteamerica", label: "Norteamérica", worldRegions: ["América"], focusShift: 6 },
    { key: "latam", label: "Latinoamérica", worldRegions: ["América"], focusShift: 5 },
    { key: "europa", label: "Europa", worldRegions: ["Europa"], focusShift: 4 },
    { key: "asia_pacifico", label: "Asia Pacífico", worldRegions: ["Asia", "Oceanía"], focusShift: 7 },
    { key: "africa", label: "África", worldRegions: ["África"], focusShift: 4 },
    { key: "medio_oriente", label: "Medio Oriente", worldRegions: ["Asia", "África"], focusShift: 6 },
    { key: "oceania", label: "Oceanía", worldRegions: ["Oceanía"], focusShift: 5 },
    { key: "global", label: "Global", worldRegions: ["América", "Europa", "Asia"], focusShift: 6 }
  ];

  const PROGRAM_VARIANTS = [
    { key: "pregrado", label: "Programa de pregrado", short: "Pregrado", costShift: 0, focusShift: 0 },
    { key: "tecnico", label: "Trayecto técnico/profesional", short: "Técnico", costShift: -1, focusShift: -4 },
    { key: "online", label: "Programa online intensivo", short: "Online", costShift: -1, focusShift: 2 },
    { key: "posgrado", label: "Posgrado avanzado", short: "Posgrado", costShift: 1, focusShift: 6 },
    { key: "investigacion", label: "Enfoque en investigación", short: "Investigación", costShift: 1, focusShift: 8 },
    { key: "dual", label: "Programa dual internacional", short: "Dual", costShift: 0, focusShift: 4 },
    { key: "executive", label: "Formato ejecutivo", short: "Ejecutivo", costShift: 1, focusShift: 5 },
    { key: "experiential", label: "Aprendizaje experiencial", short: "Experiencial", costShift: 0, focusShift: 3 }
  ];

  const UNIVERSITIES = buildUniversities();
  const AREA_REGISTRY = buildAreaRegistry();
  const CATALOG = buildCatalog();

  function buildCatalog() {
    const entries = [];
    BASE_CAREERS.forEach((base) => {
      REGION_VARIANTS.forEach((region) => {
        PROGRAM_VARIANTS.forEach((program) => {
          const id = `${base.id}_${program.key}_${region.key}`;
          const cost = shiftCost(base.anchorCost, program.costShift);
          const universities = selectUniversities(region.key, cost);
          const focusAreas = base.focusAreas.map((area, index) => ({
            label: area.label,
            emoji: area.emoji,
            color: area.color,
            value: clamp(area.value + program.focusShift + region.focusShift - index * 2, 40, 97)
          }));

          const compatibilityTags = Array.from(
            new Set([
              ...base.compatibilityTags,
              region.label,
              program.short,
              `Costo ${cost.charAt(0).toUpperCase()}${cost.slice(1)}`
            ])
          );

          const entry = {
            id,
            name: `${base.name} · ${program.short}`,
            emoji: base.emoji,
            summary: `${base.summary} ${program.label} disponible para ${region.label}.`,
            compatibilityTags,
            focusAreas,
            universities,
            estimatedCost: cost,
            compatibleSegments: base.compatibleSegments,
            worldRegions: region.worldRegions,
            notes: `${base.notes} Programa: ${program.label}. Región: ${region.label}.`,
            programKey: program.key,
            programLabel: program.label,
            regionKey: region.key,
            regionLabel: region.label
          };

          entry._search = buildSearchIndex(entry, base);
          entries.push(entry);
        });
      });
    });
    return entries;
  }

  function buildBaseCareer(id, name, emoji, tags, summary, notes) {
    return {
      id,
      name,
      emoji,
      summary,
      notes,
      compatibilityTags: tags,
      focusAreas: defaultFocusFor(tags),
      anchorCost: defaultCostFor(tags),
      compatibleSegments: ["adult", "minor"]
    };
  }

  function defaultFocusFor(tags) {
    const palette = {
      Creatividad: { emoji: "✨", color: "#f97316", value: 86 },
      Tecnología: { emoji: "💻", color: "#2563eb", value: 88 },
      Innovación: { emoji: "🚀", color: "#22c55e", value: 84 },
      "Pensamiento lógico": { emoji: "🧠", color: "#3b82f6", value: 90 },
      Análisis: { emoji: "📊", color: "#0ea5e9", value: 88 },
      Modelado: { emoji: "📐", color: "#6366f1", value: 84 },
      Impacto: { emoji: "🌍", color: "#f59e0b", value: 82 },
      Protección: { emoji: "🛡️", color: "#7c3aed", value: 86 },
      Riesgo: { emoji: "⚠️", color: "#ef4444", value: 80 },
      Acompañamiento: { emoji: "🤝", color: "#f97316", value: 88 },
      Investigación: { emoji: "🔬", color: "#2563eb", value: 90 },
      Empatía: { emoji: "💖", color: "#fb7185", value: 92 },
      Salud: { emoji: "🩺", color: "#16a34a", value: 88 },
      Resiliencia: { emoji: "🧗", color: "#f97316", value: 80 },
      "Gestión clínica": { emoji: "🏥", color: "#0ea5e9", value: 84 },
      Urbanismo: { emoji: "🏙️", color: "#3b82f6", value: 82 },
      Ingeniería: { emoji: "⚙️", color: "#2563eb", value: 88 },
      "Narrativa visual": { emoji: "🎨", color: "#f472b6", value: 86 },
      Branding: { emoji: "🏷️", color: "#facc15", value: 82 },
      Prototipado: { emoji: "🛠️", color: "#f97316", value: 84 },
      Estrategia: { emoji: "📈", color: "#22c55e", value: 86 },
      Emprendimiento: { emoji: "🚀", color: "#f97316", value: 88 },
      Storytelling: { emoji: "🗣️", color: "#a855f7", value: 84 },
      Datos: { emoji: "📊", color: "#0ea5e9", value: 88 },
      Diplomacia: { emoji: "🤝", color: "#3b82f6", value: 82 },
      "Impacto comunitario": { emoji: "🏘️", color: "#10b981", value: 86 },
      Conservación: { emoji: "🌿", color: "#22c55e", value: 88 },
      Laboratorio: { emoji: "🧪", color: "#6366f1", value: 86 },
      Docencia: { emoji: "🍎", color: "#f97316", value: 88 },
      Equidad: { emoji: "⚖️", color: "#f59e0b", value: 84 },
      Cultura: { emoji: "🎭", color: "#a855f7", value: 82 },
      Logística: { emoji: "🚚", color: "#4ade80", value: 84 },
      "Política pública": { emoji: "🏛️", color: "#f59e0b", value: 82 }
    };

    const selected = tags.slice(0, 3).map((tag, index) => {
      const entry = palette[tag] || { emoji: "⭐", color: "#2563eb", value: 78 - index * 4 };
      return {
        label: tag,
        emoji: entry.emoji,
        color: entry.color,
        value: clamp(entry.value - index * 4, 40, 95)
      };
    });

    while (selected.length < 3) {
      selected.push({ label: "Exploración", emoji: "🧭", color: "#0ea5e9", value: 76 - selected.length * 4 });
    }

    return selected;
  }

  function defaultCostFor(tags) {
    if (tags.includes("Investigación") || tags.includes("Innovación")) {
      return "alto";
    }
    if (tags.includes("Cuidado") || tags.includes("Equidad")) {
      return "medio";
    }
    return "medio";
  }

  function shiftCost(baseCost, shift) {
    const baseIndex = COST_INDEX.get(baseCost) ?? 1;
    const nextIndex = clamp(baseIndex + shift, 0, COST_LEVELS.length - 1);
    return COST_LEVELS[nextIndex];
  }

  function selectUniversities(regionKey, targetCost) {
    const pool = regionKey === "global" ? UNIVERSITIES : UNIVERSITIES.filter((item) => item.region === regionKey);
    const fallback = pool.length ? pool : UNIVERSITIES;
    const targetIdx = COST_INDEX.get(targetCost) ?? 1;

    const sorted = fallback
      .map((item) => ({
        ...item,
        score: Math.abs((COST_INDEX.get(item.cost) ?? 1) - targetIdx)
      }))
      .sort((a, b) => a.score - b.score || a.name.localeCompare(b.name));

    const picked = [];
    for (const item of sorted) {
      if (!picked.some((entry) => entry.name === item.name) && picked.length < 4) {
        picked.push(item);
      }
    }

    return picked.map((item) => ({
      name: item.name,
      country: item.country,
      cost: item.cost
    }));
  }

  function buildUniversities() {
    return [
      university("Massachusetts Institute of Technology", "Estados Unidos", "norteamerica", "alto"),
      university("Stanford University", "Estados Unidos", "norteamerica", "alto"),
      university("Harvard University", "Estados Unidos", "norteamerica", "alto"),
      university("University of Toronto", "Canadá", "norteamerica", "alto"),
      university("Georgia Tech", "Estados Unidos", "norteamerica", "medio"),
      university("University of Texas at Austin", "Estados Unidos", "norteamerica", "medio"),
      university("Arizona State University", "Estados Unidos", "norteamerica", "medio"),
      university("Universidad de los Andes", "Colombia", "latam", "alto"),
      university("Tecnológico de Monterrey", "México", "latam", "alto"),
      university("Universidad de Chile", "Chile", "latam", "medio"),
      university("Universidad de Buenos Aires", "Argentina", "latam", "bajo"),
      university("Pontificia Universidad Católica del Perú", "Perú", "latam", "medio"),
      university("Universidad Nacional Autónoma de México", "México", "latam", "bajo"),
      university("Universidad de São Paulo", "Brasil", "latam", "medio"),
      university("Universidad EAFIT", "Colombia", "latam", "medio"),
      university("Universidad de La Habana", "Cuba", "latam", "bajo"),
      university("Imperial College London", "Reino Unido", "europa", "alto"),
      university("Oxford University", "Reino Unido", "europa", "alto"),
      university("ETH Zürich", "Suiza", "europa", "alto"),
      university("Politecnico di Milano", "Italia", "europa", "medio"),
      university("Universidad de Barcelona", "España", "europa", "medio"),
      university("Universidad de Helsinki", "Finlandia", "europa", "medio"),
      university("Universidad de Lisboa", "Portugal", "europa", "medio"),
      university("Universidad de Groningen", "Países Bajos", "europa", "medio"),
      university("Universidad de Viena", "Austria", "europa", "medio"),
      university("Karlsruhe Institute of Technology", "Alemania", "europa", "medio"),
      university("Sorbonne Université", "Francia", "europa", "alto"),
      university("Universidad de Bologna", "Italia", "europa", "medio"),
      university("Tsinghua University", "China", "asia_pacifico", "alto"),
      university("University of Tokyo", "Japón", "asia_pacifico", "alto"),
      university("National University of Singapore", "Singapur", "asia_pacifico", "alto"),
      university("KAIST", "Corea del Sur", "asia_pacifico", "medio"),
      university("Hong Kong University of Science and Technology", "Hong Kong", "asia_pacifico", "alto"),
      university("Monash University", "Australia", "asia_pacifico", "alto"),
      university("University of Queensland", "Australia", "asia_pacifico", "medio"),
      university("University of Auckland", "Nueva Zelanda", "oceania", "medio"),
      university("Australian National University", "Australia", "oceania", "alto"),
      university("University of Sydney", "Australia", "oceania", "alto"),
      university("RMIT University", "Australia", "oceania", "medio"),
      university("University of Canterbury", "Nueva Zelanda", "oceania", "medio"),
      university("University of Cape Town", "Sudáfrica", "africa", "medio"),
      university("University of the Witwatersrand", "Sudáfrica", "africa", "medio"),
      university("Stellenbosch University", "Sudáfrica", "africa", "medio"),
      university("University of Nairobi", "Kenia", "africa", "bajo"),
      university("Addis Ababa University", "Etiopía", "africa", "bajo"),
      university("University of Ghana", "Ghana", "africa", "bajo"),
      university("University of Lagos", "Nigeria", "africa", "bajo"),
      university("American University in Cairo", "Egipto", "medio_oriente", "medio"),
      university("King Abdulaziz University", "Arabia Saudita", "medio_oriente", "alto"),
      university("Khalifa University", "Emiratos Árabes Unidos", "medio_oriente", "alto"),
      university("Weizmann Institute of Science", "Israel", "medio_oriente", "alto"),
      university("Qatar University", "Qatar", "medio_oriente", "medio"),
      university("University of Jordan", "Jordania", "medio_oriente", "medio"),
      university("Université Mohammed VI Polytechnique", "Marruecos", "medio_oriente", "medio"),
      university("Université de Kigali", "Ruanda", "africa", "medio"),
      university("Universidad Diego Portales", "Chile", "latam", "medio"),
      university("Universidad del Pacífico", "Perú", "latam", "medio"),
      university("Tecnológico Nacional de México", "México", "latam", "bajo"),
      university("Universidad Industrial de Santander", "Colombia", "latam", "medio"),
      university("Universidad San Ignacio de Loyola", "Perú", "latam", "medio"),
      university("Universidad de Antioquia", "Colombia", "latam", "bajo"),
      university("Universidad Católica de Córdoba", "Argentina", "latam", "medio"),
      university("Universidade Federal do Rio de Janeiro", "Brasil", "latam", "medio"),
      university("Universidade Estadual de Campinas", "Brasil", "latam", "medio"),
      university("Universidad de Talca", "Chile", "latam", "medio"),
      university("University of British Columbia", "Canadá", "norteamerica", "alto"),
      university("McGill University", "Canadá", "norteamerica", "alto"),
      university("Carnegie Mellon University", "Estados Unidos", "norteamerica", "alto"),
      university("University of Washington", "Estados Unidos", "norteamerica", "medio"),
      university("Purdue University", "Estados Unidos", "norteamerica", "medio"),
      university("University of Michigan", "Estados Unidos", "norteamerica", "alto"),
      university("New York University", "Estados Unidos", "norteamerica", "alto"),
      university("University of Edinburgh", "Reino Unido", "europa", "alto"),
      university("Trinity College Dublin", "Irlanda", "europa", "medio"),
      university("Leiden University", "Países Bajos", "europa", "medio"),
      university("Universidad Autónoma de Madrid", "España", "europa", "medio"),
      university("Universidad de Granada", "España", "europa", "medio"),
      university("Universidad de Salamanca", "España", "europa", "medio"),
      university("Universidad de Sevilla", "España", "europa", "medio"),
      university("Universidad de Zaragoza", "España", "europa", "medio"),
      university("University of Copenhagen", "Dinamarca", "europa", "alto"),
      university("Technical University of Denmark", "Dinamarca", "europa", "alto"),
      university("Lund University", "Suecia", "europa", "alto"),
      university("Chalmers University of Technology", "Suecia", "europa", "alto"),
      university("Aalto University", "Finlandia", "europa", "alto"),
      university("University of Oslo", "Noruega", "europa", "alto"),
      university("University of Bergen", "Noruega", "europa", "alto"),
      university("University of Iceland", "Islandia", "europa", "medio"),
      university("University of Malaya", "Malasia", "asia_pacifico", "medio"),
      university("University of the Philippines", "Filipinas", "asia_pacifico", "bajo"),
      university("Indian Institute of Technology Bombay", "India", "asia_pacifico", "medio"),
      university("Indian Institute of Science", "India", "asia_pacifico", "medio"),
      university("Indian School of Business", "India", "asia_pacifico", "alto"),
      university("University of Delhi", "India", "asia_pacifico", "bajo"),
      university("Universitas Gadjah Mada", "Indonesia", "asia_pacifico", "medio"),
      university("King Mongkut's University of Technology", "Tailandia", "asia_pacifico", "medio"),
      university("Queensland University of Technology", "Australia", "oceania", "medio"),
      university("University of Western Australia", "Australia", "oceania", "alto"),
      university("Curtin University", "Australia", "oceania", "medio"),
      university("Griffith University", "Australia", "oceania", "medio"),
      university("University of Pretoria", "Sudáfrica", "africa", "medio"),
      university("University of Dar es Salaam", "Tanzania", "africa", "bajo"),
      university("Makerere University", "Uganda", "africa", "bajo"),
      university("University of Zambia", "Zambia", "africa", "bajo"),
      university("Université Cheikh Anta Diop", "Senegal", "africa", "medio"),
      university("Universidad de Panamá", "Panamá", "latam", "bajo"),
      university("Universidad de Costa Rica", "Costa Rica", "latam", "medio"),
      university("Universidad Estatal a Distancia", "Costa Rica", "latam", "bajo"),
      university("Universidad Central de Venezuela", "Venezuela", "latam", "bajo"),
      university("University of Maryland", "Estados Unidos", "norteamerica", "medio"),
      university("University of Colorado Boulder", "Estados Unidos", "norteamerica", "medio"),
      university("University of Illinois", "Estados Unidos", "norteamerica", "medio"),
      university("George Mason University", "Estados Unidos", "norteamerica", "medio"),
      university("Northwestern University", "Estados Unidos", "norteamerica", "alto"),
      university("Rice University", "Estados Unidos", "norteamerica", "alto"),
      university("Boston University", "Estados Unidos", "norteamerica", "alto")
    ];
  }

  function buildAreaRegistry() {
    const registry = new Map();
    BASE_CAREERS.forEach((career) => {
      career.compatibilityTags.forEach((tag) => {
        const slug = slugify(tag);
        if (!slug) {
          return;
        }
        const current = registry.get(slug) || { slug, label: tag, count: 0 };
        current.count += 1;
        registry.set(slug, current);
      });
    });
    return registry;
  }

  function university(name, country, region, cost) {
    return { name, country, region, cost };
  }

  function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }

  function normalize(value) {
    return String(value || "")
      .normalize("NFD")
      .replace(/\p{Diacritic}/gu, "")
      .toLowerCase();
  }

  function slugify(value) {
    return normalize(value)
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  function getCatalog() {
    return CATALOG.slice();
  }

  function findCareer(id) {
    return CATALOG.find((item) => item.id === id);
  }

  function filterCatalog({ query = "", segment = "all", cost = "all", university = "all", area = "all" } = {}) {
    const areaLabel = area !== "all" ? resolveAreaLabel(area) : null;
    if (area !== "all" && !areaLabel) {
      return [];
    }

    const normalizedQuery = normalize(query);
    const trimmedQuery = normalizedQuery.trim();
    const queryTerms = trimmedQuery.split(/\s+/).filter(Boolean);
    const targetUniversity = university !== "all" ? normalize(university).trim() : null;

    const results = [];

    CATALOG.forEach((career) => {
      if (segment !== "all" && !career.compatibleSegments.includes(segment)) {
        return;
      }
      if (cost !== "all" && career.estimatedCost !== cost) {
        return;
      }
      if (targetUniversity) {
        const matchesUniversity = career.universities.some((item) => normalize(item.name).includes(targetUniversity));
        if (!matchesUniversity) {
          return;
        }
      }
      if (areaLabel && !career.compatibilityTags.includes(areaLabel)) {
        return;
      }

      if (!queryTerms.length) {
        results.push({ career, score: 0 });
        return;
      }

      const score = computeSearchScore(career._search, trimmedQuery, queryTerms);
      if (score > 0) {
        results.push({ career, score });
      }
    });

    if (!queryTerms.length) {
      return results
        .sort((a, b) => a.career.name.localeCompare(b.career.name, "es"))
        .map((item) => item.career);
    }

    return results
      .sort((a, b) => b.score - a.score || a.career.name.localeCompare(b.career.name, "es"))
      .map((item) => item.career);
  }

  function getUniversityOptions() {
    const registry = new Map();
    CATALOG.forEach((career) => {
      career.universities.forEach((entry) => {
        if (!registry.has(entry.name)) {
          registry.set(entry.name, { name: entry.name, country: entry.country });
        }
      });
    });
    return Array.from(registry.values()).sort((a, b) => a.name.localeCompare(b.name));
  }

  function getAreaOptions() {
    return Array.from(AREA_REGISTRY.values()).sort((a, b) => a.label.localeCompare(b.label, "es"));
  }

  function resolveAreaLabel(slug) {
    return AREA_REGISTRY.get(slug)?.label || null;
  }

  function buildSearchIndex(entry, baseCareer) {
    const baseFields = [
      normalize(baseCareer?.name),
      normalize(baseCareer?.summary),
      normalize(baseCareer?.notes)
    ];

    const variantFields = [
      normalize(entry.name),
      normalize(entry.summary),
      normalize(entry.programLabel),
      normalize(entry.regionLabel),
      normalize(entry.notes)
    ];

    const tagFields = entry.compatibilityTags.map((tag) => normalize(tag));
    const focusFields = entry.focusAreas.map((area) => normalize(area.label));
    const universityFields = entry.universities.map((item) => normalize(item.name));

    const fields = [...baseFields, ...variantFields, ...tagFields, ...focusFields, ...universityFields].filter(Boolean);
    const tokens = new Set();

    fields.forEach((field) => {
      tokenize(field).forEach((token) => tokens.add(token));
    });

    return {
      fields,
      tokens: Array.from(tokens),
      blob: fields.join(" ")
    };
  }

  function computeSearchScore(index, normalizedQuery, queryTerms) {
    if (!index) {
      return 0;
    }

    let score = 0;

    if (normalizedQuery && index.blob.includes(normalizedQuery)) {
      score += 80;
    }

    queryTerms.forEach((term) => {
      let best = Number.NEGATIVE_INFINITY;

      index.fields.forEach((field) => {
        if (field.includes(term)) {
          const bonus = Math.min(12, term.length * 2);
          best = Math.max(best, 50 + bonus);
        }
      });

      if (!Number.isFinite(best)) {
        index.tokens.forEach((token) => {
          const distance = levenshteinDistance(term, token);
          if (distance <= getFuzzyTolerance(term)) {
            const closeness = Math.max(0, Math.min(term.length, token.length) - distance);
            const tokenScore = 40 + closeness * 4 - distance * 6;
            best = Math.max(best, tokenScore);
          }
        });
      }

      if (!Number.isFinite(best)) {
        score -= 30;
      } else {
        score += best;
      }
    });

    return score;
  }

  function getFuzzyTolerance(term) {
    if (term.length <= 3) {
      return 1;
    }
    if (term.length <= 5) {
      return 2;
    }
    if (term.length <= 8) {
      return 3;
    }
    return 4;
  }

  function tokenize(value) {
    return value.split(/[^a-z0-9]+/).filter(Boolean);
  }

  function levenshteinDistance(source, target) {
    if (source === target) {
      return 0;
    }
    if (!source.length) {
      return target.length;
    }
    if (!target.length) {
      return source.length;
    }

    const previous = new Array(target.length + 1);
    const current = new Array(target.length + 1);

    for (let j = 0; j <= target.length; j += 1) {
      previous[j] = j;
    }

    for (let i = 1; i <= source.length; i += 1) {
      current[0] = i;
      const sourceCode = source.charCodeAt(i - 1);

      for (let j = 1; j <= target.length; j += 1) {
        const cost = sourceCode === target.charCodeAt(j - 1) ? 0 : 1;
        current[j] = Math.min(
          current[j - 1] + 1,
          previous[j] + 1,
          previous[j - 1] + cost
        );
      }

      for (let j = 0; j <= target.length; j += 1) {
        previous[j] = current[j];
      }
    }

    return previous[target.length];
  }

  window.CareersCatalog = {
    all: getCatalog,
    find: findCareer,
    filter: filterCatalog,
    universities: getUniversityOptions,
    areas: getAreaOptions,
    size: () => CATALOG.length
  };
})();
