(function (global) {
  "use strict";

  const STORAGE_PREFIX = "klesis_v1";
  const KEY_USERS = `${STORAGE_PREFIX}_users`;
  const KEY_CURRENT_USER = `${STORAGE_PREFIX}_current_user`;
  const KEY_SESSION_USER = `${STORAGE_PREFIX}_session_user`;
  const KEY_TEST_PROGRESS = `${STORAGE_PREFIX}_test_progress`;
  const KEY_FORUM_THREADS = `${STORAGE_PREFIX}_forum_threads`;

  const defaultThreads = [
    {
      id: "thread-onboarding",
      title: "Primeros pasos en orientación vocacional",
      author: "Equipo Klesis",
      segment: "adult",
      tags: ["orientación", "perfil"],
      createdAt: new Date().toISOString(),
      replies: 5,
      excerpt:
        "Comparte tus metas profesionales o cuenta cómo acompañas a menores en su proceso.",
    },
  ];

  async function hashPassword(plainText) {
    const encoder = new TextEncoder();
    const data = encoder.encode(String(plainText ?? ""));
    const digest = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(digest));
    return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  }

  function withUserDefaults(user) {
    if (!user) {
      return user;
    }
    const normalized = { ...user };
    normalized.avatarUrl = normalized.avatarUrl ?? null;
    normalized.favoriteCareers = Array.isArray(normalized.favoriteCareers) ? normalized.favoriteCareers : [];
    normalized.followingIds = Array.isArray(normalized.followingIds) ? normalized.followingIds : [];
    normalized.recommendedCareers = Array.isArray(normalized.recommendedCareers) ? normalized.recommendedCareers : [];
    normalized.careerComparisons = Array.isArray(normalized.careerComparisons) ? normalized.careerComparisons : [];
    normalized.interestProfile = normalized.interestProfile ?? null;
    normalized.updatedAt = normalized.updatedAt ?? normalized.createdAt ?? null;
    return normalized;
  }

  function sanitizeUser(user) {
    if (!user) {
      return null;
    }
    const { passwordHash: _hidden, ...publicProfile } = user;
    return publicProfile;
  }

  function loadUsers() {
    try {
      const raw = localStorage.getItem(KEY_USERS);
      if (!raw) {
        return [];
      }
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) {
        return [];
      }
      return parsed.map((candidate) => withUserDefaults(candidate));
    } catch (error) {
      console.error("KlesisStorage.loadUsers", error);
      return [];
    }
  }

  function saveUsers(users) {
    localStorage.setItem(KEY_USERS, JSON.stringify(users));
  }

  function loadCurrentUser() {
    try {
      const raw = localStorage.getItem(KEY_CURRENT_USER);
      if (!raw) {
        return null;
      }
      return JSON.parse(raw);
    } catch (error) {
      console.error("KlesisStorage.loadCurrentUser", error);
      return null;
    }
  }

  function saveCurrentUser(user) {
    if (!user) {
      localStorage.removeItem(KEY_CURRENT_USER);
      return;
    }
    localStorage.setItem(KEY_CURRENT_USER, JSON.stringify(user));
  }

  function loadSessionUser() {
    try {
      const raw = sessionStorage.getItem(KEY_SESSION_USER);
      if (!raw) {
        return null;
      }
      return JSON.parse(raw);
    } catch (error) {
      console.error("KlesisStorage.loadSessionUser", error);
      return null;
    }
  }

  function saveSessionUser(user) {
    if (!user) {
      sessionStorage.removeItem(KEY_SESSION_USER);
      return;
    }
    sessionStorage.setItem(KEY_SESSION_USER, JSON.stringify(user));
  }

  function loadActiveUser() {
    return loadSessionUser() ?? loadCurrentUser();
  }

  function loadTestProgress(userId) {
    try {
      const raw = localStorage.getItem(KEY_TEST_PROGRESS);
      if (!raw) {
        return {};
      }
      const parsed = JSON.parse(raw);
      return parsed?.[userId] ?? null;
    } catch (error) {
      console.error("KlesisStorage.loadTestProgress", error);
      return null;
    }
  }

  function saveTestProgress(userId, progress) {
    if (!userId) {
      return;
    }
    const raw = localStorage.getItem(KEY_TEST_PROGRESS);
    const payload = raw ? JSON.parse(raw) : {};
    payload[userId] = progress;
    localStorage.setItem(KEY_TEST_PROGRESS, JSON.stringify(payload));
  }

  function removeTestProgress(userId) {
    if (!userId) {
      return;
    }
    try {
      const raw = localStorage.getItem(KEY_TEST_PROGRESS);
      if (!raw) {
        return;
      }
      const payload = JSON.parse(raw);
      if (payload && Object.prototype.hasOwnProperty.call(payload, userId)) {
        delete payload[userId];
        const keys = Object.keys(payload);
        if (!keys.length) {
          localStorage.removeItem(KEY_TEST_PROGRESS);
        } else {
          localStorage.setItem(KEY_TEST_PROGRESS, JSON.stringify(payload));
        }
      }
    } catch (error) {
      console.error("KlesisStorage.removeTestProgress", error);
    }
  }

  function loadThreads() {
    try {
      const raw = localStorage.getItem(KEY_FORUM_THREADS);
      if (!raw) {
        localStorage.setItem(KEY_FORUM_THREADS, JSON.stringify(defaultThreads));
        return [...defaultThreads];
      }
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [...defaultThreads];
    } catch (error) {
      console.error("KlesisStorage.loadThreads", error);
      return [...defaultThreads];
    }
  }

  function saveThreads(threads) {
    localStorage.setItem(KEY_FORUM_THREADS, JSON.stringify(threads));
  }

  function generateId() {
    return crypto.randomUUID();
  }

  function sanitize(value) {
    return String(value ?? "").trim();
  }

  function upsertUser(updatedUser) {
    const users = loadUsers();
    const index = users.findIndex((user) => user.id === updatedUser.id);
    const normalized = withUserDefaults(updatedUser);
    if (index >= 0) {
      users[index] = normalized;
    } else {
      users.push(normalized);
    }
    saveUsers(users);
  }

  function deleteUser(userId) {
    if (!userId) {
      return false;
    }

    const users = loadUsers();
    const filtered = users.filter((user) => user.id !== userId);
    if (filtered.length === users.length) {
      return false;
    }

    const sanitized = filtered.map((user) => {
      const copy = { ...user };
      if (Array.isArray(copy.followingIds)) {
        copy.followingIds = copy.followingIds.filter((id) => id !== userId);
      }
      return withUserDefaults(copy);
    });

    saveUsers(sanitized);

    const current = loadCurrentUser();
    if (current?.id === userId) {
      saveCurrentUser(null);
    }

    const session = loadSessionUser();
    if (session?.id === userId) {
      saveSessionUser(null);
    }

    removeTestProgress(userId);
    return true;
  }

  function findUserById(userId) {
    if (!userId) {
      return null;
    }
    const users = loadUsers();
    return users.find((user) => user.id === userId) ?? null;
  }

  function syncActiveUser(user) {
    if (!user) {
      return;
    }
    const publicProfile = sanitizeUser(user);
    const persisted = loadCurrentUser();
    if (persisted?.id === user.id) {
      saveCurrentUser(publicProfile);
    }
    const session = loadSessionUser();
    if (session?.id === user.id) {
      saveSessionUser(publicProfile);
    }
  }

  global.KlesisStorage = Object.freeze({
    hashPassword,
    loadUsers,
    saveUsers,
    findUserById,
    loadCurrentUser,
    saveCurrentUser,
    loadSessionUser,
    saveSessionUser,
    loadActiveUser,
    loadTestProgress,
    saveTestProgress,
    removeTestProgress,
    loadThreads,
    saveThreads,
    generateId,
    sanitize,
    upsertUser,
    deleteUser,
    sanitizeUser,
    syncActiveUser,
    withUserDefaults,
  });
})(window);
