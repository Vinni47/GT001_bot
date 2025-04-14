document.addEventListener("DOMContentLoaded", () => {
  // Получаем ссылки на экраны
  const screen1 = document.getElementById("screen1");
  const screen2 = document.getElementById("screen2");
  const screenTools = document.getElementById("screenTools");
  const screenMore = document.getElementById("screenMore");
  
  // Кнопки для переходов
  const btnNewTeamTop = document.getElementById("btnNewTeamTop");
  const btnNewTeamCenter = document.getElementById("btnNewTeamCenter");
  const btnCancel = document.getElementById("btnCancel");
  const btnSave = document.getElementById("btnSave");
  
  // Навигация (нижняя панель) - в каждом экране у нас есть ID-шники
  // но в данном упрощённом примере используем только один комплект
  // (можно расширить, чтобы убирать/добавлять .active на нужных кнопках)
  const navTeams = document.querySelectorAll("#navTeams");
  const navTools = document.querySelectorAll("#navTools");
  const navMore  = document.querySelectorAll("#navMore");

  // Функция, скрывающая все экраны и показывающая нужный
  function showScreen(screenElement) {
    [screen1, screen2, screenTools, screenMore].forEach(s => s.classList.remove("active"));
    screenElement.classList.add("active");
  }

  // Открыть экран2 (Create Team)
  btnNewTeamTop.addEventListener("click", () => showScreen(screen2));
  btnNewTeamCenter.addEventListener("click", () => showScreen(screen2));

  // Cancel и Save -> вернуться в screen1 (My Teams)
  btnCancel.addEventListener("click", () => showScreen(screen1));
  btnSave.addEventListener("click", () => {
    // здесь можно сохранить данные о команде
    showScreen(screen1);
  });

  // Навигация "My Teams"
  navTeams.forEach(btn => {
    btn.addEventListener("click", () => showScreen(screen1));
  });

  // Навигация "Tools"
  navTools.forEach(btn => {
    btn.addEventListener("click", () => showScreen(screenTools));
  });

  // Навигация "More"
  navMore.forEach(btn => {
    btn.addEventListener("click", () => showScreen(screenMore));
  });
});
