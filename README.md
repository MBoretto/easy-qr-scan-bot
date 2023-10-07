# Easy QR code scan Telegram
Scan QR codes with Telegram!
<img src="images/easyqrscanbot.jpg" alt="Scan QR codes with Telegram!" width="200">
<img src="images/qrscanner.jpg" alt="Scan QR codes with Telegram!" width="200">

The Telegram [Mini app API](https://core.telegram.org/bots/webapps) API let you use a QR scanner integrated in the Web App.  
This repository contains the code of [@easyqrscanbot](https://t.me/easyqrscanbot)

## How to use the scanner
Make sure that you have updated your Telegram App, the minimum required version of the Telegram API have is `6.9`.

- Research @easyqrscanbot on Telegram and open a private chat.
- Press the Menu Button  in the bottom left corner (`Scan QR`)
<img src="images/startover.jpg" alt="Scan QR button" width="200">
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
In case you wish to deploy your own Mini App you need to clone this repository and enable the GitHub Pages: 

    Settings -> Pages -> Select GitHub Actions as source

At this point Github will deploy for you the Mini App on the Github page associated to your repository.
You also need to link the Mini App to an existing Telegram Bot using the [@BotFather](https://t.me/BotFather) bot. 
If you don't have a bot already you have to create one, [this Telegram guide](https://core.telegram.org/bots/features#botfather) will guide throught this task.

Here's the steps to follow to link the Mini App to your bot:
- Open [@BotFather](https://t.me/BotFather) bot and send the command `/mybots`.
- Press the bot you want to link to the Mini App.
<img src="images/step1.jpg" alt="Step 1" width="200">
- Press `Bot Settings`:
<img src="images/step2.jpg" alt="Step 2" width="200">
- Press `Menu Button`:
<img src="images/step3.jpg" alt="Step 3" width="200">
-Press `Configure menu button`:
<img src="images/step4.jpg" alt="Step 4" width="200">
- At this point you have to insert the URL of your Mini App and then the name you want to give the Menu button: 
<img src="images/step5.jpg" alt="Step 5" width="200">

You will now be able to start your Mini App from the Telegram Bot Menu.