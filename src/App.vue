<template>
  <div>
    <h3>Interface Control:</h3>
    <button @click="TWA.expand()">Expand</button>
    <button @click="TWA.close()">Close</button><br>

    <h3>Data recieved:</h3>
     initData: {{ TWA.initData }} <br>
     initDataUnsafe: <pre>{{ TWA.initDataUnsafe }}</pre><br>
     version: {{ TWA.version }} <br>
     colorScheme: {{ TWA.colorScheme }} <br>
     themeParams: <pre>{{ TWA.themeParams }}</pre> <br>
     isExpanded: {{ TWA.isExpanded }} <br>
     viewportHeight: {{ TWA.viewportHeight }} <br>
     viewportStableHeight: {{ TWA.viewportStableHeight }} <br>
     headerColor: {{ TWA.headerColor }} <div class="square" v-bind:style='{ background-color: {{ TWA.headerColo }} }'><div><br>
     backgroundColor: {{ TWA.backgroundColor }} <br>
     isClosingConfirmationEnabled: {{ TWA.isClosingConfirmationEnabled }} <br>

     <select v-model="style_selected">
      <option disabled value="">Please select one</option>
      <option>light</option>
      <option>medium</option>
      <option>heavy</option>
      <option>rigid</option>
      <option>soft</option>
    </select>
    <button @click="hapticImpact()">Haptic Feedback ({{ style_selected }})</button><br>
    <button @click="TWA.openLink('https://github.com/MBoretto/telegram-bot-vue-wep-app')">Open link in an external browser</button><br>


    <button @click="toggleBackButton()">Show/hide Back Button</button><br>
    <button @click="toggleMainButton()">Show/hide Main Button</button>
    <button @click="toggleEnableMainButton()">Enable/Disable Main Button</button>
    <button @click="toggleProgressMainButton()">Show/Hide Main Button progress</button><br>

    <button @click="toggleClosingDialog()">Enable/Disable Confirmation Dialog</button>

    <button @click="TWA.showAlert('Showing an Alert!!')">Show Alert</button><br>
    <br>
  </div>
</template>


<script>
// Objects
//BackButton
//MainButton
//HapticFeedback

// Methods
//isVersionAtLeast(version)
//setHeaderColor(color)
//setBackgroundColor(color)
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
      app_event_description: null,
      back_button_visible: true,
    };
  },
  created() {
    // Binnding function to all the event types
    this.TWA.onEvent('themeChanged', this.themeChanged);
    this.TWA.onEvent('viewportChanged', this.viewportChanged);
    this.TWA.onEvent('mainButtonClicked', this.mainButtonClicked);
    this.TWA.onEvent('backButtonClicked', this.backButtonClicked);
    this.TWA.onEvent('settingsButtonClicked', this.settingsButtonClicked);
    this.TWA.onEvent('invoiceClosed', this.invoiceClosed);
    this.TWA.onEvent('popupClosed', this.popupClosed);
  },
  mounted() {
    // What is the best? mounted or created??
    this.TWA.ready();
  },
  methods: {
    // attached with onEvent function during created
    themeChanged() {
      TWA.showAlert('Theme has changed');
    },
    viewportChanged() {
      TWA.showAlert('Viewport has changed');
    },
    mainButtonClicked() {
      TWA.showAlert('Main button was pressed');
    },
    backButtonClicked() {
      TWA.showAlert('back button was clicked');
    },
    settingsButtonClicked() {
      TWA.showAlert('Settings button pressed');
    },
    invoiceClosed() {
      TWA.showAlert('Invoice was closed');
    },
    popupClosed() {
      TWA.showAlert('Popup was closed');
    },
    // End of callbacks
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
  }
}
</script>


<style scoped>

.square {
    width: 6px;
    height: 6px;
    border-color: black;
    border-width: 1px;
}
</style>
