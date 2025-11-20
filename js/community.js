document.addEventListener("DOMContentLoaded", () => {
  const storage = window.KlesisStorage;
  if (!storage) {
    return;
  }

  const activeUser = storage.loadActiveUser();
  const badge = document.querySelector("[data-dashboard-badge]");
  const title = document.getElementById("dashboardTitle");
  const subtitle = document.getElementById("dashboardSubtitle");
  const progressFill = document.querySelector(".progress-bar__fill");
  const progressLabel = document.getElementById("progressLabel");

  if (badge) {
    if (activeUser?.segment === "adult") {
      badge.textContent = "Perfil mayor";
      badge.classList.remove("badge--minor");
      badge.classList.add("badge--adult");
      if (title) {
        title.textContent = "Conecta con la comunidad profesional";
      }
      if (subtitle) {
        subtitle.textContent = "Organiza tus proyectos, sigue especialistas y comparte aprendizajes con la red Klesis.";
      }
    } else {
      badge.textContent = "Perfil menor";
      badge.classList.add("badge--minor");
    }
  }

  if (activeUser?.id && progressFill && progressLabel) {
    const savedProgress = storage.loadTestProgress(activeUser.id);
    if (savedProgress?.percentage != null) {
      const percent = Math.max(0, Math.min(100, Number(savedProgress.percentage)));
      progressFill.style.setProperty("--progress", `${percent}%`);
      progressFill.style.width = `${percent}%`;
      progressLabel.textContent = `${percent}%`;
    }
  }

  const followCards = document.querySelectorAll("[data-user-card]");
  if (followCards.length === 0) {
    return;
  }

  const followingSet = new Set(activeUser?.following ?? []);

  followCards.forEach((card) => {
    const button = card.querySelector("[data-follow-toggle]");
    const userId = card.getAttribute("data-user-id");
    if (!button || !userId) {
      return;
    }

    const datasetState = card.getAttribute("data-following") === "true";
    const isFollowing = activeUser ? followingSet.has(userId) : datasetState;
    applyFollowState(card, button, isFollowing);

    button.addEventListener("click", () => {
      if (!activeUser) {
        window.location.href = "../auth/login.html";
        return;
      }

      const current = card.getAttribute("data-following") === "true";
      const nextState = !current;
      applyFollowState(card, button, nextState);

      updateFollowing(activeUser, userId, nextState, storage);
    });
  });
});

function applyFollowState(card, button, isFollowing) {
  card.setAttribute("data-following", String(isFollowing));
  if (isFollowing) {
    button.textContent = "Siguiendo";
    button.classList.remove("btn--primary");
    button.classList.add("btn--outline");
  } else {
    button.textContent = "Seguir";
    button.classList.remove("btn--outline");
    button.classList.add("btn--primary");
  }
}

function updateFollowing(activeUser, targetId, shouldFollow, storage) {
  const list = new Set(activeUser.following ?? []);
  if (shouldFollow) {
    list.add(targetId);
  } else {
    list.delete(targetId);
  }
  activeUser.following = Array.from(list);

  storage.upsertUser(activeUser);

  const persistedUser = storage.loadCurrentUser();
  if (persistedUser?.id === activeUser.id) {
    storage.saveCurrentUser(activeUser);
  }

  const sessionUser = storage.loadSessionUser();
  if (sessionUser?.id === activeUser.id) {
    storage.saveSessionUser(activeUser);
  }
}
