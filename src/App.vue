<template>
  <div>
    <h3>Window Control</h3>
    <b>isExpanded</b>: {{ TWA.isExpanded }}
    <button @click="TWA.expand()">Expand</button>
    <button @click="TWA.close()">Close</button><br>

    <b>isClosingConfirmationEnabled</b>: {{ TWA.isClosingConfirmationEnabled }}
    <button @click="toggleClosingDialog()">Enable/Disable Confirmation Dialog</button><br>

    <b>viewportHeight</b>: {{ TWA.viewportHeight }} <br>
    <b>viewportStableHeight</b>: {{ TWA.viewportStableHeight }} <br>


    <h3>Theme colors</h3>
    <b>colorScheme</b>: {{ TWA.colorScheme }} <br>
    <b>themeParams</b>:<br>
    <div v-for="(rgb_color, key) in TWA.themeParams">
     <label for="head"><b>{{ key }}</b>: {{ rgb_color }}
       <input type="color" :value="rgb_color" disabled>
     </label> <br>
    </div>

    <h3>Web App colors</h3>
     <label for="header"><b>headerColor</b>: {{ TWA.headerColor }}
       <input type="color" name="header" :value="TWA.headerColor" disabled><br>
       <select @input="changeHeaderColor">
         <option disabled value="">Please select one</option>
         <option>bg_color</option>
         <option>secondary_bg_color</option>
       </select>
     </label> <br>

     <label for="background"> <b>backgroundColor</b>: {{ TWA.backgroundColor }}
       <input type="color" name="background" :value="TWA.backgroundColor" disabled><br>
       <select @input="changeBackgroundColor">
         <option disabled value="">Please select one</option>
         <option>bg_color</option>
         <option>secondary_bg_color</option>
       </select>
     </label> <br>

    <h3>Data received</h3>
    <b>initData</b>: {{ TWA.initData }} <br>
    <b>initDataUnsafe</b>: <pre>{{ TWA.initDataUnsafe }}</pre><br>

    <h3>Bot API version available</h3>
    <b>version</b>: {{ TWA.version }} <br>
    <b>isVersionAtLeast('6.2')</b>: {{ TWA.isVersionAtLeast('6.2') }} <br>

    <h3>Haptic Feedback</h3>
    <select v-model="style_selected">
      <option disabled value="">Please select one</option>
      <option>light</option>
      <option>medium</option>
      <option>heavy</option>
      <option>rigid</option>
      <option>soft</option>
    </select>
    <button @click="hapticImpact()">Haptic Feedback ({{ style_selected }})</button><br>

    <h3>Functions and buttons</h3>
    <button @click="TWA.openLink('https://github.com/MBoretto/telegram-bot-vue-wep-app')">Open link in an external browser</button><br>
    <button @click="toggleBackButton()">Show/hide Back Button</button><br>
    <button @click="toggleMainButton()">Show/hide Main Button</button>
    <button @click="toggleEnableMainButton()">Enable/Disable Main Button</button>
    <button @click="toggleProgressMainButton()">Show/Hide Main Button progress</button><br>

    <h3>Popups</h3>
    <button @click="TWA.showAlert('Showing an Alert!!')">Show Alert</button><br>
    <button @click="TWA.showConfirm('Showing confirm message')">Show Confirm</button><br>
    <button @click="showPopup()">Show Popup message</button><br>
    <button @click="showPopup2()">Show Popup message2</button><br>
    <br>
  </div>
</template>


<script>
// Objects
//BackButton
//MainButton
//HapticFeedback

// Methods
//enableClosingConfirmation() NEW
//disableClosingConfirmation() NEW
//onEvent(eventType, eventHandler)

//offEvent(eventType, eventHandler)
//sendData(data)
//openTelegramLink(url)
//openInvoice(url[, callback])
//showPopup(params[, callback]) NEW
//showAlert(message[, callback]) NEW
//showConfirm(message[, callback]) NEW
export default {
  data() {
    return {
      style_selected: 'medium',
    };
  },
  created() {
    // Binnding function to all the event types
    this.TWA.onEvent('themeChanged', this.themeChanged);
    // triggered too often
    //this.TWA.onEvent('viewportChanged', this.viewportChanged);
    this.TWA.onEvent('mainButtonClicked', this.mainButtonClicked);
    this.TWA.onEvent('backButtonClicked', this.backButtonClicked);
    // I couldn't trigger this yet
    this.TWA.onEvent('settingsButtonClicked', this.settingsButtonClicked);
    this.TWA.onEvent('invoiceClosed', this.invoiceClosed);
    // Seems that the popup is an alter itself
    // Commenting this otherwise I'm stuck in a loop
    //this.TWA.onEvent('popupClosed', this.popupClosed);
  },
  mounted() {
    // What is the best? mounted or created??
    this.TWA.ready();
  },
  methods: {
    // attached with onEvent function during created
    themeChanged() {
      this.TWA.showAlert('Theme has changed');
    },
    viewportChanged() {
      this.TWA.showAlert('Viewport has changed');
    },
    mainButtonClicked() {
      this.TWA.showAlert('Main button was pressed');
      window.Telegram.WebApp.showAlert('Main button was pressed version2');
    },
    backButtonClicked() {
      this.TWA.showAlert('back button was clicked');
    },
    settingsButtonClicked() {
      this.TWA.showAlert('Settings button pressed');
    },
    invoiceClosed() {
      this.TWA.showAlert('Invoice was closed');
    },
    popupClosed() {
      this.TWA.showAlert('Popup was closed');
    },
    // End of callbacks
    changeHeaderColor(event) {
        const color = event.target.value;
        this.TWA.setHeaderColor(color);
    },
    changeBackgroundColor(event) {
        const color = event.target.value;
        this.TWA.setBackgroundColor(color);
    },
    toggleBackButton() {
      if (this.TWA.BackButton.isVisible) {
        this.TWA.BackButton.hide();
      } else {
        this.TWA.BackButton.show();
      }
    },
    toggleMainButton() {
      if (this.TWA.MainButton.isVisible) {
        this.TWA.MainButton.hide();
      } else {
        this.TWA.MainButton.show();
      }
    },
    toggleEnableMainButton() {
      if (!this.TWA.MainButton.isVisible) {
        this.TWA.MainButton.show();
      }
      if (this.TWA.MainButton.isActive) {
        this.TWA.MainButton.disable();
      } else {
        this.TWA.MainButton.enable();
      }
    },
    toggleProgressMainButton() {
      if (!this.TWA.MainButton.isVisible) {
        this.TWA.MainButton.show();
      }
      if (this.TWA.MainButton.isActive) {
        this.TWA.MainButton.hideProgress();
      } else {
        this.TWA.MainButton.showProgress();
      }
    },
    toggleClosingDialog() {
      if (this.TWA.isClosingConfirmationEnabled) {
        this.TWA.disableClosingConfirmation();
      } else {
        this.TWA.enableClosingConfirmation();
      }
    },
    hapticImpact() {
      this.TWA.HapticFeedback.impactOccurred(this.style_selected);
    },
    showPopup() {
      const par = {
                    title: "Popup title",
                    message: "Popup with default, ok and close buttons",
                    buttons: [
                      {id: "default", type: "default", text: "default"},
                      {id: "ok", type: "ok", text: "ok"},
                      {id: "close", type: "close", text: "close"}
                    ]
                  };

      this.TWA.showPopup(par);
    },
    showPopup2() {
      const par = {
                    title: "Popup title",
                    message: "Popup with cancel and destrucitve buttons",
                    buttons: [
                      {id: "cancel", type: "cancel", text: "cancel"},
                      {id: "destructive", type: "destructive", text: "destructive"}
                    ]
                  };

      this.TWA.showPopup(par);
    },
  }
}
</script>


<style scoped>

/*
bg_color            var(--tg-theme-bg-color).
secondary_bg_color  var(--tg-theme-secondary-bg-color)
hint_color          var(--tg-theme-hint-color).
link_color          var(--tg-theme-link-color).
*/
h3 {
  color: var(--tg-theme-text-color, black);
}
button {
  background-color: var(--tg-theme-button-color, #008CBA);
  border: 5px;
  color: var(--tg-theme-button-text-color, black);
  padding: 15px;
  margin: 5px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 15px;
}
</style>
