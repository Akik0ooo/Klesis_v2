(function () {
  const data = {
    software_engineering: {
      overview:
        "La ingeniería de software combina análisis, diseño y construcción de sistemas digitales escalables. Los programas actuales refuerzan habilidades de programación, arquitectura, pruebas y trabajo colaborativo ágil.",
      outcomes: [
        "Desarrollo full-stack y arquitectura de plataformas",
        "Automatización, pruebas y aseguramiento de calidad",
        "Gestión de proyectos ágiles y liderazgo técnico",
        "Integración de servicios en la nube y ciberseguridad básica"
      ],
      institutions: [
        {
          id: "tec_mx_software",
          name: "Tecnológico de Monterrey",
          country: "México",
          type: "Universidad",
          modality: "Presencial / HyFlex",
          duration: "9 semestres (4.5 años)",
          admission: "Prueba de admisión, entrevista y evidencia de proyectos o logros académicos",
          tuition: "Inversión alta; becas académicas y apoyos socioeconómicos disponibles",
          description:
            "El plan enfatiza retos integradores por semestre, desarrollo ágil y experiencia internacional opcional.",
          curriculum: [
            {
              cycle: "Semestre 1",
              focus: "Fundamentos y pensamiento computacional",
              subjects: [
                "Fundamentos de programación",
                "Matemáticas I para ingeniería",
                "Álgebra lineal",
                "Modelación de sistemas",
                "Proyecto integrador inicial"
              ]
            },
            {
              cycle: "Semestre 2",
              focus: "Estructuras y bases de software",
              subjects: [
                "Programación orientada a objetos",
                "Estructuras de datos",
                "Cálculo vectorial",
                "Probabilidad y estadística",
                "Laboratorio de proyectos ágiles"
              ]
            },
            {
              cycle: "Semestre 3",
              focus: "Arquitectura y experiencia de usuario",
              subjects: [
                "Arquitectura de software",
                "Bases de datos",
                "Diseño centrado en la persona",
                "Computación en la nube",
                "Proyecto Sprint Challenge"
              ]
            },
            {
              cycle: "Semestre 4",
              focus: "Calidad, seguridad y despliegue",
              subjects: [
                "Ingeniería de requisitos",
                "Pruebas y calidad de software",
                "Ciberseguridad aplicada",
                "DevOps y automatización",
                "Proyecto con industria"
              ]
            },
            {
              cycle: "Semestre 5",
              focus: "Escalamiento y especialización",
              subjects: [
                "Patrones de diseño",
                "Servicios web y microservicios",
                "Gestión de proyectos ágiles",
                "Optativa de ciencia de datos",
                "Laboratorio de innovación"
              ]
            },
            {
              cycle: "Semestre 6",
              focus: "Experiencia internacional / profesional",
              subjects: [
                "Proyecto global challenge",
                "Intercambio o práctica profesional",
                "Optativa de inteligencia artificial",
                "Optativa de emprendimiento",
                "Seminario de tendencias tecnológicas"
              ]
            },
            {
              cycle: "Semestre 7",
              focus: "Profundización técnica y liderazgo",
              subjects: [
                "Arquitecturas empresariales",
                "Gestión de producto digital",
                "Gobierno de TI",
                "Integración continua avanzada",
                "Proyecto social tecnológico"
              ]
            },
            {
              cycle: "Semestre 8",
              focus: "Proyecto final y certificaciones",
              subjects: [
                "Proyecto integrador de titulación",
                "Certificación profesional (AWS, Azure o Scrum)",
                "Ética y responsabilidad profesional",
                "Estrategia de innovación",
                "Optativa libre"
              ]
            },
            {
              cycle: "Semestre 9",
              focus: "Residencia profesional",
              subjects: [
                "Práctica profesional supervisada",
                "Seminario de empleabilidad",
                "Gestión de conocimiento",
                "Emprendimiento tecnológico" 
              ]
            }
          ],
          notes: "Plan referencial basado en la estructura de Ingeniería en Tecnologías Computacionales del Tec de Monterrey (corte 2024). Verificar requisitos y asignaturas vigentes en el campus elegido.",
          sources: [
            "Plan de estudio Ingeniería en Tecnologías Computacionales, Tecnológico de Monterrey 2024",
            "Catálogo de unidades de formación Tec21"
          ]
        },
        {
          id: "pucp_pe_software",
          name: "Pontificia Universidad Católica del Perú",
          country: "Perú",
          type: "Universidad",
          modality: "Presencial",
          duration: "10 semestres (5 años)",
          admission: "Examen de admisión PUCP o convenios escolares, entrevista opcional",
          tuition: "Escalas de pago diferenciadas según situación socioeconómica",
          description:
            "El programa aborda ingeniería de software, ciencias de la computación y liderazgo en innovación social con enfoque regional.",
          curriculum: [
            {
              cycle: "Semestre 1",
              focus: "Ciencias básicas y programación",
              subjects: [
                "Introducción a la programación",
                "Matemática básica",
                "Física para ingeniería",
                "Comunicación académica",
                "Ética y ciudadanía"
              ]
            },
            {
              cycle: "Semestre 2",
              focus: "Estructuras, electrónica y algoritmos",
              subjects: [
                "Estructuras de datos",
                "Matemática discreta",
                "Electrónica digital",
                "Microeconomía",
                "Proyecto social universitario"
              ]
            },
            {
              cycle: "Semestre 3",
              focus: "Ingeniería de software e investigación",
              subjects: [
                "Ingeniería de software I",
                "Probabilidad y estadística",
                "Sistemas digitales",
                "Investigación aplicada",
                "Gestión de proyectos"
              ]
            },
            {
              cycle: "Semestre 4",
              focus: "Arquitecturas y experiencia",
              subjects: [
                "Arquitectura de computadores",
                "Interacción humano-computador",
                "Base de datos",
                "Programación concurrente",
                "Emprendimiento tecnológico"
              ]
            },
            {
              cycle: "Semestre 5",
              focus: "Calidad y seguridad",
              subjects: [
                "Ingeniería de software II",
                "Calidad y pruebas",
                "Seguridad informática",
                "Gestión de servicios TI",
                "Optativa de innovación"
              ]
            },
            {
              cycle: "Semestre 6",
              focus: "Aplicaciones distribuidas",
              subjects: [
                "Sistemas operativos",
                "Redes y comunicaciones",
                "Computación en la nube",
                "Optativa de ciencia de datos",
                "Laboratorio de proyectos"
              ]
            },
            {
              cycle: "Semestre 7",
              focus: "Liderazgo y especialidad",
              subjects: [
                "Gestión de proyectos TI",
                "Optativa disciplinar I",
                "Innovación social",
                "Legislación informática",
                "Proyecto de software con empresa"
              ]
            },
            {
              cycle: "Semestre 8",
              focus: "Investigación y desarrollo avanzado",
              subjects: [
                "Inteligencia artificial",
                "Optativa disciplinar II",
                "Métodos de investigación",
                "Gestión de la innovación",
                "Seminario de tesis"
              ]
            },
            {
              cycle: "Semestre 9",
              focus: "Práctica preprofesional",
              subjects: [
                "Prácticas preprofesionales",
                "Proyecto de software en sector público",
                "Optativa libre",
                "Gestión de calidad total"
              ]
            },
            {
              cycle: "Semestre 10",
              focus: "Tesis y certificaciones",
              subjects: [
                "Trabajo de investigación",
                "Sustentación de tesis",
                "Certificación profesional",
                "Electivo humanista"
              ]
            }
          ],
          notes: "Malla basada en la propuesta 2024 de Ingeniería Informática PUCP. Consultar la web oficial para fechas y vacantes.",
          sources: [
            "Facultad de Ciencias e Ingeniería PUCP",
            "Reglamento de prácticas preprofesionales PUCP"
          ]
        },
        {
          id: "duoc_cl_informatica",
          name: "Duoc UC - Ingeniería en Informática",
          country: "Chile",
          type: "Instituto profesional",
          modality: "Presencial / Vespertino",
          duration: "8 semestres (4 años)",
          admission: "Admisión directa con licencia de enseñanza media, pruebas internas opcionales",
          tuition: "Arancel medio; convenios de financiamiento estatal (CAE, becas) disponibles",
          description:
            "Formación aplicada orientada a la industria, con certificaciones intermedias y práctica temprana.",
          curriculum: [
            {
              cycle: "Semestre 1",
              focus: "Fundamentos técnicos",
              subjects: [
                "Programación básica",
                "Matemática aplicada",
                "Sistemas digitales",
                "Comunicación efectiva",
                "Inglés técnico I"
              ]
            },
            {
              cycle: "Semestre 2",
              focus: "Desarrollo e infraestructura",
              subjects: [
                "Programación orientada a objetos",
                "Base de datos I",
                "Redes de computadores",
                "Metodologías ágiles",
                "Inglés técnico II"
              ]
            },
            {
              cycle: "Semestre 3",
              focus: "Aplicaciones empresariales",
              subjects: [
                "Desarrollo web",
                "Base de datos II",
                "Sistemas operativos",
                "Gestión de proyectos",
                "Práctica temprana I"
              ]
            },
            {
              cycle: "Semestre 4",
              focus: "Servicios y ciberseguridad",
              subjects: [
                "Servicios web",
                "Arquitectura de software",
                "Seguridad informática",
                "Ética profesional",
                "Optativa de innovación"
              ]
            },
            {
              cycle: "Semestre 5",
              focus: "Calidad y testing",
              subjects: [
                "Aseguramiento de calidad",
                "Automatización de pruebas",
                "Administración de sistemas",
                "Inglés técnico III",
                "Práctica temprana II"
              ]
            },
            {
              cycle: "Semestre 6",
              focus: "Integración empresarial",
              subjects: [
                "Soluciones empresariales",
                "Gestión de servicios TI",
                "Emprendimiento tecnológico",
                "Optativa de especialidad",
                "Proyecto con cliente real"
              ]
            },
            {
              cycle: "Semestre 7",
              focus: "Proyecto de título",
              subjects: [
                "Gestión estratégica TI",
                "Gobierno de TI",
                "Desarrollo móvil",
                "Responsabilidad social",
                "Proyecto de título I"
              ]
            },
            {
              cycle: "Semestre 8",
              focus: "Práctica profesional",
              subjects: [
                "Práctica profesional",
                "Proyecto de título II",
                "Innovación aplicada",
                "Electivo libre"
              ]
            }
          ],
          notes: "Información alineada con la malla 2024 de Ingeniería en Informática Duoc UC. Verificar campus y jornadas disponibles.",
          sources: [
            "Malla Ingeniería en Informática Duoc UC 2024",
            "Reglamento de titulación Duoc UC"
          ]
        }
      ]
    },
    psychology: {
      overview:
        "La psicología estudia los procesos mentales y el comportamiento, combinando investigación, intervención clínica, comunitaria y organizacional.",
      outcomes: [
        "Evaluación y diagnóstico psicológico",
        "Intervención clínica y psicoterapia",
        "Investigación aplicada y psicometría",
        "Gestión de talento, educación y bienestar"
      ],
      institutions: [
        {
          id: "uba_ar_psicologia",
          name: "Universidad de Buenos Aires",
          country: "Argentina",
          type: "Universidad pública",
          modality: "Presencial",
          duration: "6 años (5 ciclos + práctica profesional)",
          admission: "Ciclo básico común (CBC) obligatorio",
          tuition: "Universidad estatal, arancel cero",
          description:
            "Plan clínico-comunitario con fuerte base teórica, investigación y compromiso social en hospitales universitarios.",
          curriculum: [
            {
              cycle: "CBC",
              focus: "Bases científicas y sociales",
              subjects: [
                "Introducción al pensamiento científico",
                "Introducción a la psicología",
                "Sociología",
                "Biología",
                "Metodología de las ciencias sociales"
              ]
            },
            {
              cycle: "Ciclo profesional común",
              focus: "Teorías y métodos",
              subjects: [
                "Psicología general",
                "Historia de la psicología",
                "Psicoanálisis I",
                "Psicología evolutiva",
                "Estadística aplicada"
              ]
            },
            {
              cycle: "Ciclo troncal",
              focus: "Clínica y procesos sociales",
              subjects: [
                "Psicopatología",
                "Psicología social",
                "Psicología educacional",
                "Neurofisiología",
                "Metodología de la investigación"
              ]
            },
            {
              cycle: "Orientaciones",
              focus: "Clínica, educativa u organizacional",
              subjects: [
                "Diagnóstico e intervención clínica",
                "Psicología laboral",
                "Psicología jurídica",
                "Seminarios optativos",
                "Prácticas profesionales"
              ]
            },
            {
              cycle: "Práctica final",
              focus: "Residencia o tesina",
              subjects: [
                "Práctica supervisada",
                "Seminario de integración",
                "Tesina o trabajo final" 
              ]
            }
          ],
          notes: "Plan basado en la Resolución (CS) 1874/12 y actualizaciones 2023 de la Facultad de Psicología UBA.",
          sources: [
            "Facultad de Psicología UBA - Plan de estudios",
            "Resolución Consejo Superior 1874/12"
          ]
        },
        {
          id: "unam_mx_psicologia",
          name: "Universidad Nacional Autónoma de México",
          country: "México",
          type: "Universidad",
          modality: "Presencial",
          duration: "10 semestres (5 años)",
          admission: "Examen de selección UNAM, pase reglamentado o suaj",
          tuition: "Universidad pública; cuotas simbólicas",
          description:
            "Formación interdisciplinaria con énfasis en investigación, intervención social y clínica comunitaria.",
          curriculum: [
            {
              cycle: "Semestres 1-2",
              focus: "Fundamentos biológicos y sociales",
              subjects: [
                "Fundamentos biológicos del comportamiento",
                "Psicología básica",
                "Antropología",
                "Métodos de investigación",
                "Estadística aplicada"
              ]
            },
            {
              cycle: "Semestres 3-4",
              focus: "Procesos psicológicos",
              subjects: [
                "Neuropsicología",
                "Psicometría",
                "Psicología del desarrollo",
                "Psicología social",
                "Teorías de la personalidad"
              ]
            },
            {
              cycle: "Semestres 5-6",
              focus: "Diagnóstico e intervención",
              subjects: [
                "Psicología clínica",
                "Evaluación psicológica",
                "Psicología educativa",
                "Psicología organizacional",
                "Optativas disciplinarias"
              ]
            },
            {
              cycle: "Semestres 7-8",
              focus: "Prácticas y optativas",
              subjects: [
                "Intervención comunitaria",
                "Seminario de investigación",
                "Optativas de profundización",
                "Prácticas supervisadas"
              ]
            },
            {
              cycle: "Semestres 9-10",
              focus: "Servicio social y titulación",
              subjects: [
                "Servicio social",
                "Seminario de tesis",
                "Trabajo recepcional" 
              ]
            }
          ],
          notes: "Información sintetizada del plan 2016 de la Facultad de Psicología UNAM.",
          sources: [
            "Plan de estudios Licenciatura en Psicología UNAM",
            "Reglamento de Servicio Social UNAM"
          ]
        },
        {
          id: "cayetano_pe_psicologia",
          name: "Universidad Peruana Cayetano Heredia",
          country: "Perú",
          type: "Universidad",
          modality: "Presencial",
          duration: "10 semestres (5 años)",
          admission: "Evaluación integral UPC o traslados externos",
          tuition: "Escalas de pago por categoría socioeconómica",
          description:
            "Enfoque científico con énfasis en neurociencias, salud mental comunitaria y psicología organizacional.",
          curriculum: [
            {
              cycle: "Semestre 1",
              focus: "Bases biológicas y sociales",
              subjects: [
                "Biología del comportamiento",
                "Introducción a la psicología",
                "Análisis cuantitativo",
                "Desarrollo humano",
                "Competencias comunicativas"
              ]
            },
            {
              cycle: "Semestre 2",
              focus: "Procesos cognitivos",
              subjects: [
                "Neuroanatomía funcional",
                "Psicología cognitiva",
                "Métodos de investigación",
                "Interacción social",
                "Optativa de humanidades"
              ]
            },
            {
              cycle: "Semestre 3",
              focus: "Evaluación",
              subjects: [
                "Psicometría",
                "Psicodiagnóstico",
                "Estadística avanzada",
                "Psicología educativa",
                "Proyecto comunitario"
              ]
            },
            {
              cycle: "Semestre 4",
              focus: "Intervención",
              subjects: [
                "Psicoterapia cognitivo-conductual",
                "Psicología de la salud",
                "Psicología organizacional",
                "Optativa profesional",
                "Práctica supervisada I"
              ]
            },
            {
              cycle: "Semestres 5-6",
              focus: "Profundización",
              subjects: [
                "Neuropsicología clínica",
                "Psicología positiva",
                "Gestión del talento",
                "Investigación aplicada",
                "Práctica supervisada II"
              ]
            },
            {
              cycle: "Semestres 7-8",
              focus: "Investigación y emprendimiento",
              subjects: [
                "Seminario de investigación",
                "Innovación social",
                "Optativas de especialidad",
                "Práctica institucional"
              ]
            },
            {
              cycle: "Semestres 9-10",
              focus: "Servicio comunitario y titulación",
              subjects: [
                "Servicio comunitario",
                "Proyecto de tesis",
                "Trabajo de suficiencia profesional" 
              ]
            }
          ],
          notes: "Basado en la malla 2024 de la Facultad de Psicología UPCH. Revisar actualizaciones antes de postular.",
          sources: [
            "Facultad de Psicología UPCH",
            "Reglamento académico UPCH"
          ]
        }
      ]
    },
    medicine: {
      overview:
        "La medicina forma profesionales capaces de prevenir, diagnosticar y tratar enfermedades, con entrenamiento clínico intensivo y rotaciones hospitalarias.",
      outcomes: [
        "Atención clínica integral",
        "Investigación biomédica",
        "Salud pública y gestión hospitalaria",
        "Especialización médica (residencias)"
      ],
      institutions: [
        {
          id: "uchile_cl_medicina",
          name: "Universidad de Chile",
          country: "Chile",
          type: "Universidad",
          modality: "Presencial",
          duration: "14 semestres (7 años) + internado",
          admission: "Proceso centralizado DEMRE, puntajes altos en pruebas de acceso",
          tuition: "Arancel alto con becas estatales y internas",
          description:
            "Formación científica y clínica con internados progresivos en hospitales clínicos de referencia.",
          curriculum: [
            {
              cycle: "Ciclo básico (1°-2° año)",
              focus: "Ciencias fundamentales",
              subjects: [
                "Biología celular",
                "Bioquímica",
                "Anatomía",
                "Histología",
                "Introducción a la clínica"
              ]
            },
            {
              cycle: "Ciclo preclínico (3°-4° año)",
              focus: "Sistema orgánico",
              subjects: [
                "Fisiología",
                "Farmacología",
                "Microbiología",
                "Patología",
                "Semiología clínica"
              ]
            },
            {
              cycle: "Ciclo clínico (5° año)",
              focus: "Rotaciones hospitalarias",
              subjects: [
                "Medicina interna",
                "Cirugía",
                "Pediatría",
                "Ginecología y obstetricia",
                "Psiquiatría"
              ]
            },
            {
              cycle: "Internado (6°-7° año)",
              focus: "Práctica profesional",
              subjects: [
                "Internado de medicina interna",
                "Internado de cirugía",
                "Internado de pediatría",
                "Internado rural",
                "Internado de atención primaria"
              ]
            }
          ],
          notes: "Plan referenciado desde la Facultad de Medicina U. de Chile (actualización 2023).",
          sources: [
            "Facultad de Medicina Universidad de Chile",
            "Reglamento de internados U. de Chile"
          ]
        },
        {
          id: "uba_ar_medicina",
          name: "Universidad de Buenos Aires",
          country: "Argentina",
          type: "Universidad pública",
          modality: "Presencial",
          duration: "6 años + Residencia",
          admission: "Ciclo biomédico común obligatorio",
          tuition: "Universidad estatal, sin aranceles",
          description:
            "Plan riguroso con fuerte inserción hospitalaria y enfoque en salud pública.",
          curriculum: [
            {
              cycle: "CBC",
              focus: "Bases biomédicas",
              subjects: [
                "Biología",
                "Química",
                "Matemática",
                "Física",
                "Introducción al pensamiento científico"
              ]
            },
            {
              cycle: "Ciclo biomédico",
              focus: "Ciencias básicas",
              subjects: [
                "Anatomía",
                "Histología",
                "Bioquímica",
                "Fisiología",
                "Genética"
              ]
            },
            {
              cycle: "Ciclo clínico",
              focus: "Rotaciones hospitalarias",
              subjects: [
                "Semiología",
                "Clínica médica",
                "Cirugía",
                "Pediatría",
                "Ginecología"
              ]
            },
            {
              cycle: "Internado anual rotatorio",
              focus: "Práctica intensiva",
              subjects: [
                "Medicina interna",
                "Cirugía general",
                "Clínica obstétrica",
                "Clínica pediátrica",
                "Atención primaria"
              ]
            }
          ],
          notes: "Basado en el plan de estudios 2022 de la Facultad de Medicina UBA.",
          sources: [
            "Facultad de Medicina UBA",
            "Plan de estudios actualizado 2022"
          ]
        },
        {
          id: "upch_pe_medicina",
          name: "Universidad Peruana Cayetano Heredia",
          country: "Perú",
          type: "Universidad",
          modality: "Presencial",
          duration: "14 semestres (7 años)",
          admission: "Evaluación integral UPCH",
          tuition: "Escalas de pago y becas vocacionales",
          description:
            "Programa reconocido por su enfoque investigativo y alianzas con hospitales nacionales e internacionales.",
          curriculum: [
            {
              cycle: "Ciclo básico",
              focus: "Ciencias biomédicas",
              subjects: [
                "Biología celular",
                "Química médica",
                "Anatomía",
                "Fisiología",
                "Competencias comunicativas"
              ]
            },
            {
              cycle: "Ciclo preclínico",
              focus: "Patologías y laboratorio",
              subjects: [
                "Microbiología",
                "Patología",
                "Farmacología",
                "Bioética",
                "Metodología de investigación"
              ]
            },
            {
              cycle: "Ciclo clínico",
              focus: "Rotaciones progresivas",
              subjects: [
                "Medicina interna",
                "Cirugía",
                "Pediatría",
                "Gineco-obstetricia",
                "Psiquiatría"
              ]
            },
            {
              cycle: "Internado",
              focus: "Práctica final",
              subjects: [
                "Internado hospitalario",
                "Internado de atención primaria",
                "Investigación clínica",
                "Proyecto social"
              ]
            }
          ],
          notes: "Información tomada del plan 2024 de la Facultad de Medicina Humana UPCH.",
          sources: [
            "Facultad de Medicina Humana UPCH",
            "Reglamento de internado UPCH"
          ]
        }
      ]
    }
  };

  window.CareerDetailData = data;
})();
