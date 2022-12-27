# A Vue project to create a Vue Web App in your Telegram bot

The Telegram bot API let you enrich the bot experience integrating Web App inside the the bot.
Here is the [link](https://core.telegram.org/bots/webapps) to the documentation.
This projec it meant to explore the API functionalities that Telegram offers in a Vue project.

## Test the Web App
The master branch of this repository is deployed on Github pages: [https://mboretto.github.io/telegram-bot-vue-wep-app/](https://mboretto.github.io/telegram-bot-vue-wep-app/).
In ordert to test it, you only need to launch the Web App from your own telegram bot as explained in the next section.
If you don't have a bot and the API token get one at [Bot Father](https://t.me/botfather), the telegram bot that creates all the bots!

### Launch the Web App from the bot
Here's the steps to run a bot locally and start the Web App.  
Install the bot dependencies:

    pip install python-telegram-bot --upgrade

Now edit the `web-app-launcher.py` and replace the `TOKEN` variable with your telegram bot Token.  
Run the executable:

    ./web-app-launcher.py

Open the bot on telegram and type `/start` press the inline button to launch the webapp.


### Deploy your own Web App
The Web App from the previous example is linked to the master branch of this repository. If you want to make changes you need to send a merge request or deploy it elsewhere.
It should be sufficient to clone this repository and enable the GitHub Pages: Settings -> Pages -> Select GitHub Actions as source.
After doing that, change accordingly the Web App link in the `web-app-launcher.py` (`URL` variable) and run again the `/start` command in chat with the bot.


## Clone and build the project

    git clone https://github.com/MBoretto/telegram-bot-vue-wep-app.git
    cd telegram-bot-vue-wep-app/
    npm install
    npm run build


## Issues
- Seems to me that the Haptic Feedback is not working, also I don't feel any difference between styles
- `onEvent('popupClosed', afunction )` I coundn't menage to make it work with parameters
- variables like isClosingConfirmationEnabled are not reactive. Should them be monitored with watched?
- settingsButtonClicked cannot trigger on that event
