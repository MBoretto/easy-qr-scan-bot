# Easy QR code scan Telegram
Scan QR codes with Telegram!
![Scan QR codes with Telegram!](images/easyqrscanbot.jpg) ![Scan QR codes with Telegram!](images/qrscanner.jpg) 

The Telegram [Mini app API](https://core.telegram.org/bots/webapps) API let you use a QR scanner integrated in the Web App.  
This repository contains the code of [@easyqrscanbot](https://t.me/easyqrscanbot)

## How to use the scanner
Make sure that you have updated your Telegram App, the minimum required version of the Telegram API have is `6.9`.

- Research @easyqrscanbot on Telegram and open a private chat.
- Press the button called `Scan QR` in the bottom left corner
![Scan QR button](images/startover.jpg)

- Start scanning QR codes!


## About
This project shows how to build the Telegram Mini App making use of a Modern Javascript framework like [Vue](https://vuejs.org/).
It also showcase how to use the latest Telegram features introduced in Telegram API version 6.9:
- QR scanner 
- Telegram Cloud Storage (a key value database accessible from the Mini App)
The project can be considered pure Vue Front End application that make use of the [Telegram Cloud Storage](https://core.telegram.org/bots/webapps#cloudstorage) Back End to save the scan acquired.

### Mini App Deployment
Built and deployment are automated using Github actions at every push on the master branch. 
The Mini App is deployed on the Github page associated to this repository: [Mini App Link](https://mboretto.github.io/easy-qr-scan-bot/).

## Reference for developers
To clone and build the project:

    git clone https://github.com/MBoretto/easy-qr-scan-bot.git
    cd easy-qr-scan-bot
    npm install
    npm run build


## Deploy your own Mini App
In case you wish to deploy your own Mini App you need to clone this repository and enable the GitHub Pages: `Settings -> Pages -> Select GitHub Actions as source`.
After that, you also need to link the Mini App to an existing Telegram Bot using the [@BotFather](https://t.me/BotFather) bot. 
If you don't have a bot already you have to create one, [this Telegram guide](https://core.telegram.org/bots/features#botfather) will guide throught this task.
