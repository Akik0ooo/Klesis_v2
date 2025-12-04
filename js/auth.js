document.addEventListener("DOMContentLoaded", () => {
  const storage = window.KlesisStorage;
  if (!storage) {
    console.warn("KlesisStorage no está disponible");
    return;
  }

  initSegmentSelection();
  initAdultRegister(storage);
  initMinorRegister(storage);
  initAdultLogin(storage);
  initMinorLogin(storage);
  initGoogleButtons();
});

function initSegmentSelection() {
  const segmentButtons = document.querySelectorAll("[data-select-segment]");
  if (!segmentButtons.length) {
    return;
  }

  segmentButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const segment = button.getAttribute("data-select-segment");
      if (segment === "adult") {
        window.location.href = "register_mayordeedad.html";
      }
      if (segment === "minor") {
        window.location.href = "register_menor.html";
      }
    });
  });
}

function initAdultRegister(storage) {
  const form = document.getElementById("registerAdultForm");
  if (!form) {
    return;
  }

  const errorBox = form.querySelector("[data-error]");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (errorBox) {
      errorBox.textContent = "";
    }

    const formData = new FormData(form);
    const firstName = storage.sanitize(formData.get("firstName"));
    const lastName = storage.sanitize(formData.get("lastName"));
    const email = storage.sanitize(formData.get("email")).toLowerCase();
    const password = String(formData.get("password"));
    const confirmPassword = String(formData.get("confirmPassword"));
    const interests = storage.sanitize(formData.get("interests"));
    const remember = formData.get("remember") === "on";

    const errors = [];
    if (!firstName) {
      errors.push("El nombre es obligatorio.");
    }
    if (!lastName) {
      errors.push("El apellido es obligatorio.");
    }
    if (!isValidEmail(email)) {
      errors.push("Ingresa un correo electrónico válido.");
    }
    if (!passwordIsStrong(password)) {
      errors.push("La contraseña debe tener al menos 8 caracteres con letras y números.");
    }
    if (password !== confirmPassword) {
      errors.push("Las contraseñas no coinciden.");
    }

    const users = storage.loadUsers();
    if (users.some((user) => user.email === email)) {
      errors.push("Ya existe una cuenta registrada con este correo.");
    }

    if (errors.length) {
      setError(errorBox, errors.join(" "));
      return;
    }

    const passwordHash = await storage.hashPassword(password);
    const user = {
      id: storage.generateId(),
      segment: "adult",
      firstName,
      lastName,
      displayName: `${firstName} ${lastName}`.trim(),
      email,
      passwordHash,
      interests,
      createdAt: new Date().toISOString(),
      provider: "email",
      avatarUrl: null,
      favoriteCareers: [],
      followingIds: [],
      recommendedCareers: [],
      careerComparisons: [],
      interestProfile: null,
    };

    storage.upsertUser(user);
    persistSession(storage, user, remember);
    form.reset();
    window.location.href = "../../index.html";
  });
}

function initMinorRegister(storage) {
  const form = document.getElementById("registerMinorForm");
  if (!form) {
    return;
  }

  const errorBox = form.querySelector("[data-error]");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (errorBox) {
      errorBox.textContent = "";
    }

    const formData = new FormData(form);
    const nickname = storage.sanitize(formData.get("nickname"));
    const confirmNickname = storage.sanitize(formData.get("confirmNickname"));
    const password = String(formData.get("password"));
    const age = Number(formData.get("age"));
    const rawInterests = Array.from(form.querySelectorAll("#minorInterests option:checked")).map((option) => option.value);
    const customInterest = storage.sanitize(formData.get("customInterest"));
    const remember = formData.get("remember") === "on";

    const interests = rawInterests.filter(Boolean);
    if (customInterest) {
      interests.push(customInterest);
    }

    const errors = [];
    if (!nickname) {
      errors.push("El nickname es obligatorio.");
    }
    if (nickname !== confirmNickname) {
      errors.push("Los nicknames no coinciden.");
    }
    if (!passwordIsStrong(password)) {
      errors.push("Tu contraseña debe tener al menos 8 caracteres con letras y números.");
    }
    if (!Number.isFinite(age) || age < 8 || age > 17) {
      errors.push("Ingresa una edad válida entre 8 y 17 años.");
    }

    const normalizedNickname = normalizeNickname(nickname);
    const users = storage.loadUsers();
    if (
      users.some(
        (user) =>
          user.segment === "minor" && normalizeNickname(user.nickname) === normalizedNickname
      )
    ) {
      errors.push("Ya existe una cuenta con este nickname.");
    }

    if (errors.length) {
      setError(errorBox, errors.join(" "));
      return;
    }

    const passwordHash = await storage.hashPassword(password);
    const user = {
      id: storage.generateId(),
      segment: "minor",
      nickname,
      firstName: nickname,
      displayName: nickname,
      email: null,
      passwordHash,
      age,
      interests,
      createdAt: new Date().toISOString(),
      provider: "nickname",
      avatarUrl: null,
      favoriteCareers: [],
      followingIds: [],
      recommendedCareers: [],
      careerComparisons: [],
      interestProfile: null,
    };

    storage.upsertUser(user);
    persistSession(storage, user, remember);
    form.reset();
    window.location.href = "../../index.html";
  });
}

function initAdultLogin(storage) {
  const form = document.getElementById("loginAdultForm");
  if (!form) {
    return;
  }

  const errorBox = form.querySelector("[data-error]");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (errorBox) {
      errorBox.textContent = "";
    }

    const formData = new FormData(form);
    const email = storage.sanitize(formData.get("email")).toLowerCase();
    const password = String(formData.get("password"));
    const remember = formData.get("remember") === "on";

    if (!isValidEmail(email) || !password) {
      setError(errorBox, "Revisa tus credenciales e inténtalo nuevamente.");
      return;
    }

    const users = storage.loadUsers();
    const user = users.find((candidate) => candidate.email === email);
    if (!user || user.segment !== "adult") {
      setError(errorBox, "No encontramos una cuenta de mayor de edad con este correo.");
      return;
    }

    const passwordHash = await storage.hashPassword(password);
    if (passwordHash !== user.passwordHash) {
      setError(errorBox, "La contraseña no coincide.");
      return;
    }

    persistSession(storage, user, remember);
    window.location.href = "../../index.html";
  });
}

function initMinorLogin(storage) {
  const form = document.getElementById("loginMinorForm");
  if (!form) {
    return;
  }

  const errorBox = form.querySelector("[data-error]");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (errorBox) {
      errorBox.textContent = "";
    }

    const formData = new FormData(form);
    const nickname = storage.sanitize(formData.get("nickname"));
    const password = String(formData.get("password"));
    const remember = formData.get("remember") === "on";

    if (!nickname || !password) {
      setError(errorBox, "Completa tu nickname y contraseña para continuar.");
      return;
    }

    const users = storage.loadUsers();
    const normalized = normalizeNickname(nickname);
    const user = users.find(
      (candidate) =>
        candidate.segment === "minor" && normalizeNickname(candidate.nickname) === normalized
    );

    if (!user) {
      setError(errorBox, "No encontramos una cuenta con este nickname.");
      return;
    }

    const passwordHash = await storage.hashPassword(password);
    if (passwordHash !== user.passwordHash) {
      setError(errorBox, "La contraseña no coincide.");
      return;
    }

    persistSession(storage, user, remember);
    window.location.href = "../../index.html";
  });
}

function persistSession(storage, user, remember) {
  const { passwordHash: _hidden, ...publicProfile } = user;
  if (remember) {
    storage.saveCurrentUser(publicProfile);
    storage.saveSessionUser(null);
  } else {
    storage.saveSessionUser(publicProfile);
    storage.saveCurrentUser(null);
  }
}

function initGoogleButtons() {
  const buttons = document.querySelectorAll("[data-google-signin]");
  if (!buttons.length) {
    return;
  }

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      alert("La opción de Google estará disponible próximamente. Usa tu correo para registrarte.");
    });
  });
}

function normalizeNickname(value) {
  return String(value ?? "").trim().toLowerCase();
}

function setError(node, message) {
  if (!node) {
    return;
  }
  node.textContent = message;
}

function isValidEmail(value) {
  return /.+@.+\..+/.test(value);
}

function passwordIsStrong(value) {
  if (typeof value !== "string" || value.length < 8) {
    return false;
  }
  const hasLetter = /[A-Za-z]/.test(value);
  const hasNumber = /\d/.test(value);
  return hasLetter && hasNumber;
}
