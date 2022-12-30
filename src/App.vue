<template>
  <div id="main">
    <div v-if="is_telegram_api_update">
      <h3>QR code</h3>

      <!--<h3>Window Control</h3>
      <b>isExpanded</b>: {{ TWA.isExpanded }}
      <button @click="TWA.expand()">Expand</button>
      <button @click="TWA.close()">Close</button><br>

      <h3>Functions and buttons</h3>
      -->

      <div v-if="code">{{ code }}
        <button @click="openLink()">{{ code }}</button>
        <!--<button @click="copyCodeClipboard()">copy to clipboard</button>-->
      </div>

      <h3>Scan QR code</h3><br>
      <v-btn
        @click="showQRScanner()"
        color="success"
        icon="mdi-qrcode-scan"
        size="x-large"
      ></v-btn>
    </div>

    <div v-if="!is_telegram_api_update">
      Please update Telegram to Use the app!
       Telegram API version needed 6.4 or greater
      Your Telegram API version: {{ TWA.version }}
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      code: null,
      is_telegram_api_update: false,
    };
  },
  created() {
    // Binding function to all the event types
    //this.TWA.onEvent('themeChanged', this.themeChanged);
    this.TWA.onEvent('qrTextReceived', this.processQRCode);
    this.is_telegram_api_update = this.TWA.isVersionAtLeast('6.4');
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
    openLink() {
      this.TWA.openLink(this.code);
    },
    processQRCode(data) {
       this.code = data.data;
       this.hapticImpact();
       this.TWA.closeScanQrPopup();
       //this.TWA.showAlert(data.data);
    },
    // End of callbacks
    showQRScanner() {
      const par = {
          text: "Press to scan"
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
