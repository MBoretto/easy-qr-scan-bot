#!/usr/bin/env python3
# pylint: disable=unused-argument, wrong-import-position
# This program is dedicated to the public domain under the CC0 license.

"""

Installation:

    pip install python-telegram-bot --upgrade


Basic example for a bot that uses inline keyboards. For an in-depth explanation, check out
 https://github.com/python-telegram-bot/python-telegram-bot/wiki/InlineKeyboard-Example.
"""

import logging

from telegram import InlineKeyboardButton, InlineKeyboardMarkup, Update, WebAppInfo
from telegram.ext import Application, CommandHandler, CallbackQueryHandler, CallbackContext

from config import TOKEN, URL, URL_TEST

logging.basicConfig(
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s', level=logging.INFO
)
logger = logging.getLogger(__name__)


async def start(update: Update, context: CallbackContext) -> None:
    """Sends a message with three inline buttons attached."""
    keyboard = [
        [InlineKeyboardButton("Scan QR codes", web_app=WebAppInfo(url=URL))],
    ]
    reply_markup = InlineKeyboardMarkup(keyboard)
    await update.message.reply_text('Press to launch QR scanner', reply_markup=reply_markup)

async def develop(update: Update, context: CallbackContext) -> None:
    """Sends a message with three inline buttons attached."""
    keyboard = [
        [InlineKeyboardButton("Scan QR codes with develop branch", web_app=WebAppInfo(url=URL_TEST))],
    ]
    reply_markup = InlineKeyboardMarkup(keyboard)
    await update.message.reply_text('Press to launch QR scanner', reply_markup=reply_markup)

async def button(update: Update, context: CallbackContext) -> None:
    """Parses the CallbackQuery and updates the message text."""
    query = update.callback_query

    # CallbackQueries need to be answered, even if no notification to the user is needed
    # Some clients may have trouble otherwise. See https://core.telegram.org/bots/api#callbackquery
    query.answer()

    await query.edit_message_text(text=f"Selected option: {query.data}")


async def help_command(update: Update, context: CallbackContext) -> None:
    """Displays info on how to use the bot."""
    await update.message.reply_text("Type /start and open the QR dialog.")


def main() -> None:
    """Run the bot."""
    # Create the Application and pass it your bot's token.
    application = Application.builder().token(TOKEN).build()

    application.add_handler(CommandHandler('start', start))
    application.add_handler(CommandHandler('dev', develop))
    application.add_handler(CallbackQueryHandler(button))
    application.add_handler(CommandHandler('help', help_command))

    # Start the Bot
    application.run_polling(allowed_updates=Update.ALL_TYPES)


if __name__ == '__main__':
    main()

