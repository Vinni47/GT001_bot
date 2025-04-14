document.addEventListener("DOMContentLoaded", () => {
  // Функция переключения экранов
  function showScreen(screenElement) {
    const screens = document.querySelectorAll(".screen");
    screens.forEach(s => s.classList.remove("active"));
    screenElement.classList.add("active");
  }

  // Ссылки на экраны
  const screen1 = document.getElementById("screen1");
  const screen2 = document.getElementById("screen2");
  const screenSponsors = document.getElementById("screenSponsors");
  const screenTools = document.getElementById("screenTools");
  const screenMore = document.getElementById("screenMore");

  // Элементы для перехода
  const btnNewTeamTop = document.getElementById("btnNewTeamTop");
  const btnNewTeamCenter = document.getElementById("btnNewTeamCenter");
  const btnCancel = document.getElementById("btnCancel");
  const btnSave = document.getElementById("btnSave");
  const btnSelectSponsor = document.getElementById("btnSelectSponsor");
  const btnSponsorBack = document.getElementById("btnSponsorBack");

  // Навигационные кнопки (внизу)
  const navTeams = document.getElementById("navTeams");
  const navTools = document.getElementById("navTools");
  const navMore  = document.getElementById("navMore");

  // Возможно, у тебя несколько похожих кнопок на других экранах — добавь при необходимости.
  
  // Показать "Мои команды" (экран1)
  if (btnNewTeamTop) {
    btnNewTeamTop.addEventListener("click", () => showScreen(screen2));
  }
  if (btnNewTeamCenter) {
    btnNewTeamCenter.addEventListener("click", () => showScreen(screen2));
  }

  // Отмена / Сохранить → назад на экран1
  if (btnCancel) {
    btnCancel.addEventListener("click", () => showScreen(screen1));
  }
  if (btnSave) {
    btnSave.addEventListener("click", () => {
      // Здесь логика сохранения...
      showScreen(screen1);
    });
  }

  // Навигация снизу
  if (navTeams) navTeams.addEventListener("click", () => showScreen(screen1));
  if (navTools) navTools.addEventListener("click", () => showScreen(screenTools));
  if (navMore)  navMore.addEventListener("click", () => showScreen(screenMore));

  // Кнопка "Выбрать спонсора"
  if (btnSelectSponsor) {
    btnSelectSponsor.addEventListener("click", () => {
      showScreen(screenSponsors);
    });
  }

  // Назад со спонсоров
  if (btnSponsorBack) {
    btnSponsorBack.addEventListener("click", () => {
      showScreen(screen2);
    });
  }

  // Загрузка данных о спонсорах из sponsors.json (пример)
  fetch("sponsors.json")
    .then(response => {
      if (!response.ok) {
        throw new Error("Ошибка при загрузке sponsors.json: " + response.statusText);
      }
      return response.json();
    })
    .then(sponsorsData => {
      const sponsorListEl = document.getElementById("sponsorList");
      let sponsorHTML = "";

      sponsorsData.forEach(sponsor => {
        let perksHTML = "";
        if (sponsor.perks && Array.isArray(sponsor.perks)) {
          perksHTML = sponsor.perks.map(perk => {
            return `<li>
                      <span class="perk-name">${perk.name}:</span>
                      <span class="perk-description">${perk.description.short}</span>
                    </li>`;
          }).join("");
        }

        sponsorHTML += `
          <li class="sponsor-item" data-sponsor="${sponsor.slug}">
            <h3>${sponsor.name}</h3>
            <p>Класс перков: ${sponsor.perkClass || "Не указан"}</p>
            <div class="perk-frame">
              <p class="perk-title">Доступные перки:</p>
              <ul class="perk-list">
                ${perksHTML}
              </ul>
            </div>
          </li>
        `;
      });

      sponsorListEl.innerHTML = sponsorHTML;

      // При клике на конкретного спонсора
      const sponsorItems = sponsorListEl.querySelectorAll(".sponsor-item");
      sponsorItems.forEach(item => {
        item.addEventListener("click", () => {
          const sponsorSlug = item.getAttribute("data-sponsor");
          const selectedSponsor = sponsorsData.find(s => s.slug === sponsorSlug);
          if (selectedSponsor) {
            document.getElementById("selectedSponsor").textContent = selectedSponsor.name;
          }
          showScreen(screen2);
        });
      });
    })
    .catch(error => {
      console.error("Ошибка загрузки:", error);
      const sponsorListEl = document.getElementById("sponsorList");
      sponsorListEl.innerHTML = "<li>Ошибка загрузки спонсоров.</li>";
    });
});
