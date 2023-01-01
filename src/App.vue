<template>
  <div id="main">
    <div
      v-if="is_telegram_api_update"
      class="text-center"
    >
      <!--<h3>Window Control</h3>
      <b>isExpanded</b>: {{ TWA.isExpanded }}
      <button @click="TWA.expand()">Expand</button>
      <button @click="TWA.close()">Close</button><br>
      <h3>Functions and buttons</h3>
      -->

      <div v-if="code">
        <h3>QR code:</h3>
        {{ code }} <br>

        <v-btn
          v-if="is_url"
          size="large"
          @click="openLink()"
        >
          Open Link
        </v-btn>
        <!--<button @click="copyCodeClipboard()">copy to clipboard</button>-->
      </div>
      <div v-if="!code">
        <h3>Scan a QR code!</h3>
      </div>
    </div>

    <div
      v-if="!is_telegram_api_update"
      class="text-center"
    >
      Please update Telegram to Use the app!<br>
      Telegram API version needed 6.4 or greater.<br>
      Your Telegram API version: {{ TWA.version }}
      <!--<h3>Scan QR code</h3><br>
      <v-btn
        @click="showQRScanner()"
        icon="mdi-qrcode-scan"
        size="x-large"
      ></v-btn>-->
    </div>
  </div>
</template>


<script>
import { prepareUrl } from './helpers'

export default {
  data() {
    return {
      is_telegram_api_update: false,
      code: null,
      is_url: false,
      url: null,
    };
  },
  created() {
    // Binding function to all the event types
    //this.TWA.onEvent('themeChanged', this.themeChanged);
    this.TWA.MainButton.setText("Scan QR code");
    this.TWA.onEvent('qrTextReceived', this.processQRCode);
    this.TWA.onEvent('mainButtonClicked', this.mainButtonClicked);
    this.is_telegram_api_update = this.TWA.isVersionAtLeast('6.4');

    if (this.is_telegram_api_update) {
      this.TWA.MainButton.show();
    }
  },
  mounted() {
    // What is the best? mounted or created??
    this.TWA.ready();
    this.showQRScanner()
  },
  methods: {
    // attached with onEvent function during created
    themeChanged() {
      //this.TWA.showAlert('Theme has changed');
    },
    mainButtonClicked() {
      this.showQRScanner();
    },
    openLink() {
      this.TWA.openLink(this.url);
    },
    processQRCode(data) {
       this.code = data.data;
       const result = prepareUrl(this.code)
       this.is_url = result.is_url;
       this.url = result.value;
       this.hapticImpact();
       this.TWA.closeScanQrPopup();

       //this.TWA.showAlert(data.data);
    },
    // End of callbacks
    showQRScanner() {
      const par = {
          text: ""
        };
      this.TWA.showScanQrPopup(par);
    },
    hapticImpact() {
      // light medium heavy rigid soft
      this.TWA.HapticFeedback.impactOccurred("heavy");
    },
    //copyCodeClipboard() {
    //  var Url = this.$refs.mylink;
    //  Url.innerHTML = window.location.href;
    //  console.log(Url.innerHTML)
    //  Url.select();
    //  document.execCommand("copy");
    //}
  }
}
</script>

<style scoped>
/*
bg_color            .
secondary_bg_color  var(--tg-theme-secondary-bg-color)
link_color          var(--tg-theme-link-color).
*/
#main {
  background-color: var(--tg-theme-bg-color, white);
  color: var(--tg-theme-text-color, black);
  /*https://stackoverflow.com/questions/1165497/how-to-prevent-text-from-overflowing-in-css*/
  word-wrap: break-word;
}
b {
  color: var(--tg-theme-hint-color, black);
}
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
