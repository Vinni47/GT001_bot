document.addEventListener("DOMContentLoaded", function() {
  // Инициализируем объект Telegram WebApp API
  const tg = window.Telegram && window.Telegram.WebApp;
  
  if (!tg) {
    console.error("Telegram WebApp API не найден!");
    return;
  }
  
  // Выводим в консоль данные, переданные Telegram (например, информация о пользователе)
  console.log("Telegram WebApp инициализирован:", tg.initData);

  // Можно изменить оформление приложения, используя темы Telegram
  document.body.style.backgroundColor = tg.themeParams.bg_color || "#fff";

  // Обработчик кнопки "Отправить данные"
  document.getElementById("sendData").addEventListener("click", function(){
    // Здесь можно отправлять данные обратно боту
    // tg.sendData принимает строку, которую потом бот сможет обработать
    tg.sendData("Пользователь нажал кнопку отправки данных");
    alert("Данные отправлены!");
  });

  // Дополнительные сценарии: можно обрабатывать события закрытия, изменять размер окна и прочее
  tg.onEvent('themeChanged', function(){
    document.body.style.backgroundColor = tg.themeParams.bg_color;
  });
});
