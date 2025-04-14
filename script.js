document.addEventListener("DOMContentLoaded", () => {
  // Функция переключения экранов
  function showScreen(screenElement) {
    const screens = document.querySelectorAll(".screen");
    screens.forEach(screen => screen.classList.remove("active"));
    screenElement.classList.add("active");
  }

  // Ссылки на экраны
  const screen1 = document.getElementById("screen1");
  const screen2 = document.getElementById("screen2");
  const screenSponsors = document.getElementById("screenSponsors");
  const screenTools = document.getElementById("screenTools");
  const screenMore = document.getElementById("screenMore");

  // Элементы для переходов между экранами
  const btnNewTeamTop = document.getElementById("btnNewTeamTop");
  const btnNewTeamCenter = document.getElementById("btnNewTeamCenter");
  const btnCancel = document.getElementById("btnCancel");
  const btnSave = document.getElementById("btnSave");
  const btnSelectSponsor = document.getElementById("btnSelectSponsor");
  const btnSponsorBack = document.getElementById("btnSponsorBack");

  // Нижняя навигация (на экранах 1 и 2)
  const navTeams  = document.getElementById("navTeams");
  const navTools  = document.getElementById("navTools");
  const navMore   = document.getElementById("navMore");
  const navTeams2 = document.getElementById("navTeams2");
  const navTools2 = document.getElementById("navTools2");
  const navMore2  = document.getElementById("navMore2");
  const navTeams3 = document.getElementById("navTeams3");
  const navTools3 = document.getElementById("navTools3");
  const navMore3  = document.getElementById("navMore3");
  const navTeams4 = document.getElementById("navTeams4");
  const navTools4 = document.getElementById("navTools4");
  const navMore4  = document.getElementById("navMore4");

  // Элемент для отображения выбранного спонсора
  const selectedSponsorDisplay = document.getElementById("selectedSponsor");

  // Переключение экранов "Новая команда"
  if (btnNewTeamTop) btnNewTeamTop.addEventListener("click", () => showScreen(screen2));
  if (btnNewTeamCenter) btnNewTeamCenter.addEventListener("click", () => showScreen(screen2));
  if (btnCancel) btnCancel.addEventListener("click", () => showScreen(screen1));
  if (btnSave) btnSave.addEventListener("click", () => {
    // Здесь можно добавить логику сохранения команды
    showScreen(screen1);
  });

  // Нижняя навигация
  if (navTeams) navTeams.addEventListener("click", () => showScreen(screen1));
  if (navTeams2) navTeams2.addEventListener("click", () => showScreen(screen1));
  if (navTeams3) navTeams3.addEventListener("click", () => showScreen(screen1));
  if (navTeams4) navTeams4.addEventListener("click", () => showScreen(screen1));

  if (navTools) navTools.addEventListener("click", () => showScreen(screenTools));
  if (navTools2) navTools2.addEventListener("click", () => showScreen(screenTools));
  if (navTools3) navTools3.addEventListener("click", () => showScreen(screenTools));
  if (navTools4) navTools4.addEventListener("click", () => showScreen(screenTools));

  if (navMore) navMore.addEventListener("click", () => showScreen(screenMore));
  if (navMore2) navMore2.addEventListener("click", () => showScreen(screenMore));
  if (navMore3) navMore3.addEventListener("click", () => showScreen(screenMore));
  if (navMore4) navMore4.addEventListener("click", () => showScreen(screenMore));

  // Переход на экран выбора спонсора
  if (btnSelectSponsor) {
    btnSelectSponsor.addEventListener("click", () => {
      showScreen(screenSponsors);
    });
  }

  // Назад с экрана спонсоров в "Создать команду"
  if (btnSponsorBack) {
    btnSponsorBack.addEventListener("click", () => {
      showScreen(screen2);
    });
  }

  // Загрузка данных о спонсорах из файла sponsors.json
  fetch("sponsors.json")
    .then(response => {
      if (!response.ok) {
        throw new Error("Не удалось загрузить sponsors.json: " + response.statusText);
      }
      return response.json();
    })
    .then(sponsorsData => {
      const sponsorListEl = document.getElementById("sponsorList");
      let sponsorHTML = "";

      sponsorsData.forEach(sponsor => {
        // Формируем список перков для каждого спонсора
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

      // Обработка клика по элементу спонсора
      const sponsorItems = document.querySelectorAll(".sponsor-item");
      sponsorItems.forEach(item => {
        item.addEventListener("click", () => {
          const sponsorSlug = item.getAttribute("data-sponsor");
          const selectedSponsor = sponsorsData.find(s => s.slug === sponsorSlug);
          if (selectedSponsor) {
            selectedSponsorDisplay.textContent = selectedSponsor.name;
          }
          // Возвращаемся на экран "Создать команду"
          showScreen(screen2);
        });
      });
    })
    .catch(error => {
      console.error("Ошибка загрузки спонсоров:", error);
      const sponsorListEl = document.getElementById("sponsorList");
      sponsorListEl.innerHTML = "<li>Ошибка загрузки данных о спонсорах.</li>";
    });
});
