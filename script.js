document.addEventListener("DOMContentLoaded", () => {
  // Получаем ссылки на экраны
  const screen1 = document.getElementById("screen1");
  const screen2 = document.getElementById("screen2");
  const screenTools = document.getElementById("screenTools");
  const screenMore = document.getElementById("screenMore");
  const screenSponsors = document.getElementById("screenSponsors");

  // Кнопки переходов в "Мои команды" и "Создать команду"
  const btnNewTeamTop = document.getElementById("btnNewTeamTop");
  const btnNewTeamCenter = document.getElementById("btnNewTeamCenter");
  const btnCancel = document.getElementById("btnCancel");
  const btnSave = document.getElementById("btnSave");

  // Элементы для выбора спонсора
  const btnSelectSponsor = document.getElementById("btnSelectSponsor");
  const selectedSponsorDisplay = document.getElementById("selectedSponsor");
  const btnSponsorBack = document.getElementById("btnSponsorBack");
  const sponsorListItems = document.querySelectorAll("#sponsorList li");

  // Кнопки нижней навигации (на разных экранах могут быть разные ID, поэтому примеры приведены для экрана "Мои команды")
  const navTeams = document.querySelectorAll("#navTeams, #navTeams2, #navTeams3, #navTeams4");
  const navTools = document.querySelectorAll("#navTools, #navTools2, #navTools3, #navTools4");
  const navMore  = document.querySelectorAll("#navMore, #navMore2, #navMore3, #navMore4");

  // Функция для переключения экранов
  function showScreen(screenElement) {
    const screens = [screen1, screen2, screenTools, screenMore, screenSponsors];
    screens.forEach(s => s.classList.remove("active"));
    screenElement.classList.add("active");
  }

  // Переход из "Мои команды" на "Создать команду"
  if(btnNewTeamTop) btnNewTeamTop.addEventListener("click", () => showScreen(screen2));
  if(btnNewTeamCenter) btnNewTeamCenter.addEventListener("click", () => showScreen(screen2));

  // Кнопки "Отмена" и "Сохранить" в "Создать команду" возвращают к "Мои команды"
  if(btnCancel) btnCancel.addEventListener("click", () => showScreen(screen1));
  if(btnSave) btnSave.addEventListener("click", () => {
    // Здесь можно добавить логику сохранения
    showScreen(screen1);
  });

  // Навигация нижней панели
  navTeams.forEach(btn => btn.addEventListener("click", () => showScreen(screen1)));
  navTools.forEach(btn => btn.addEventListener("click", () => showScreen(screenTools)));
  navMore.forEach(btn => btn.addEventListener("click", () => showScreen(screenMore)));

  // Переход на экран выбора спонсора по нажатию на кнопку "Выбрать спонсора"
  btnSelectSponsor.addEventListener("click", () => showScreen(screenSponsors));

  // Кнопка "Назад" в экране спонсоров возвращает в "Создать команду"
  btnSponsorBack.addEventListener("click", () => showScreen(screen2));

  // Обработка клика по элементам списка спонсоров
  sponsorListItems.forEach(item => {
    item.addEventListener("click", () => {
      const sponsorName = item.getAttribute("data-sponsor");
      // Обновляем текст выбранного спонсора в экране "Создать команду"
      selectedSponsorDisplay.textContent = sponsorName;
      // Возвращаемся на экран "Создать команду"
      showScreen(screen2);
    });
  });
});
