# A Vue project to create a Vue web app in your Telegram bot

The Telegram bot API let you enrich the bot experience integrating web app inside the the bot.
Here is the [link](https://core.telegram.org/bots/webapps) to the documentation.
This projec it meant to explore the API functionalities that Telegram offers in a Vue project.

## Getting started
You need:
- A telegram bot Api token, if you dont have any get it at https://t.me/botfather
- A website to deploy a static app

## Clone and build the project
Run:

    git clone https://github.com/MBoretto/telegram-bot-vue-wep-app.git
    cd telegram-bot-vue-wep-app/
    npm install
    npm run build

At this point the `dist/` directory contains the web abb and can be moved on your website.

## Launching the web app with the bot
A basic bot is needed in order to launch the webapp.
Install the bot dependencies:

    pip install python-telegram-bot --upgrade

Now edit the `web-app-launcher.py`:
    - TOKEN replace your telegram bot Token
    - URL replace the url to the web app

Run the executable:

    ./web-app-launcher.py

Open the bot on telegram and type `/start` press the inline button to launch the webapp.




