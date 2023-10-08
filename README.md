# Easy QR code scan Telegram
Scan QR codes with Telegram!


<img src="images/easyqrscanbot.jpg" alt="Scan QR codes with Telegram!" width="300">
<img src="images/qrscanner.jpg" alt="Scan QR codes with Telegram!" width="300">

The Telegram [Mini app API](https://core.telegram.org/bots/webapps) let you use a QR scanner integrated in the Mini App.  
This repository contains the code of [@easyqrscanbot](https://t.me/easyqrscanbot)

## How to use the scanner
Make sure that you have updated your Telegram App, the minimum required version of the Telegram API have is `6.9`.

- Research @easyqrscanbot on Telegram and open a private chat.
- Press the Menu Button  in the bottom left corner (`Scan QR`)
<img src="images/startover.jpg" alt="Scan QR button" width="300">
- Start scanning QR codes!

## Compatibility
QR code scanner is supported by nn Telegram smartphone Clients (Android and iOS) having Telegram API greater than `6.9`.
Telegram Web Clients do not supported QR scanning yet, however the Mini App is still accessible on the Web Client and it is possible to access the history of scanned QR codes.

## About
This project shows how to build the Telegram Mini App making use of a Modern Javascript framework like [Vue](https://vuejs.org/).
It also showcase how to use the latest Telegram features introduced in Telegram API version 6.9:
- QR scanner 
- Telegram Cloud Storage (a key value database accessible from the Mini App)
The project can be considered pure Vue Front End application that make use of the [Telegram Cloud Storage](https://core.telegram.org/bots/webapps#cloudstorage) Back End to save the scan acquired.

## Mini App Deployment
Built and deployment are automated using Github actions at every push on the `master` branch. 
The Mini App is deployed on the Github page associated to this repository: [Mini App Link](https://mboretto.github.io/easy-qr-scan-bot/).

## Reference for developers
To clone and build the project:

    git clone https://github.com/MBoretto/easy-qr-scan-bot.git
    cd easy-qr-scan-bot
    npm install
    npm run build

To run linting:

    npm run lint



## Deploy your own Mini App

Before continuing you need to have a Telegram Bot. If you don't have one [this Telegram guide](https://core.telegram.org/bots/features#botfather) will guide throught this task.

### Clone and deploy
In case you wish to deploy your own Mini App you need to clone this repository and enable the GitHub Pages: 

    Settings -> Pages -> Select GitHub Actions as source

At this point Github will deploy for you the Mini App on the Github page associated to your repository.

You don't need to use Github Pages to deploy your Mini App, you can use any hosting service you want that supports `https://`.

### Start the mini app using the Telegram Bot Menu
This is the most convinent way to start the Mini App as you just need to configure the Telegram Bot Menu once.
Here's the steps to link the Mini App to the bot menu:
- Open [@BotFather](https://t.me/BotFather) bot and send the command `/mybots`.
- Press the bot you want to link to the Mini App.
<img src="images/step1.jpg" alt="Step 1" width="300">
- Press `Bot Settings`:
<img src="images/step2.jpg" alt="Step 2" width="300">
- Press `Menu Button`:
<img src="images/step3.jpg" alt="Step 3" width="300">
-Press `Configure menu button`:
<img src="images/step4.jpg" alt="Step 4" width="300">
- At this point you have to insert the URL of your Mini App and then the name you want to give the Menu button: 
<img src="images/step5.jpg" alt="Step 5" width="300">

You will now be able to start your Mini App from the Telegram Bot Menu.

### Start the mini app using the Telegram Bot command
I found this method useful during the development phase as it allows you to specify a different URL for the Mini App without having to reconfigure the Telegram Bot Menu.
The drawback is that you need a running telegram instance to send the command to the bot.
Here's the steps to start the Mini App using the command:

- Install the [python-telegram-bot library](https://python-telegram-bot.org/):

    pip3 install python-telegram-bot --upgrade

- Rename the `config-example.py` in `config.py`:

    mv config-example.py config.py

- Edit the `config.py` file and insert:
1) your Telegram Bot Token, you can retrieve it from [@BotFather](https://t.me/BotFather) bot (`TOKEN`).
2) the `URL` and `URL_TEST` links.

- Run the `web-app-launcher.py` script:

    python3 web-app-launcher.py

- Open your Telegram Bot and send the command `/start` (production link) or `/dev` (test link) to the bot.
- Press the button to open a version of the Mini App
