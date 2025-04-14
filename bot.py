import logging
from telegram import InlineKeyboardButton, InlineKeyboardMarkup, Update
from telegram.ext import Updater, CommandHandler, CallbackContext

# Включаем логирование (опционально, для отладки)
logging.basicConfig(
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    level=logging.INFO
)
logger = logging.getLogger(__name__)

# Замените 'ВАШ_ТОКЕН' на токен, полученный от BotFather
TOKEN = '8143777294:AAEk3H0ZNxhzf08Y0_i9UtYjRlCoQwNYpo8'

def start(update: Update, context: CallbackContext) -> None:
    # Получаем идентификатор чата пользователя, запустившего /start
    chat_id = update.effective_chat.id
    
    # Формируем inline-клавиатуру с кнопкой, которая запускает Web App
    keyboard = [
        [InlineKeyboardButton("Открыть приложение", web_app={"url": "https://vinni47.github.io/GT001_bot/"})]
    ]
    reply_markup = InlineKeyboardMarkup(keyboard)
    
    # Отправляем сообщение с кнопкой
    update.message.reply_text("Запусти мини-приложение Gaslands Companion", reply_markup=reply_markup)

def main() -> None:
    # Создаем объект Updater и передаем ему токен
    updater = Updater(TOKEN, use_context=True)
    
    # Получаем диспетчер для регистрации обработчиков
    dispatcher = updater.dispatcher
    
    # Регистрируем обработчик команды /start
    dispatcher.add_handler(CommandHandler("start", start))
    
    # Запускаем бота через polling, чтобы получать обновления
    updater.start_polling()
    
    # Бот будет работать до принудительного завершения (Ctrl+C)
    updater.idle()

if __name__ == '__main__':
    main()
