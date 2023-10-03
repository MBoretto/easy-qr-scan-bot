<template>
  <div id="main">
    <div
      v-if="is_telegram_client && is_telegram_api_updated"
      class="text-center"
    >
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

      <h1>Previous Scans</h1>
      <ul>
        <li
          v-for="(akey, index) in cloud_storage_keys"
          :key="index"
        >
          {{ cloud_storage_values[akey] }} - {{ formattedDate(akey) }} 
          <button @click="removeKey(akey)">
            Delete
          </button>
        </li>
      </ul>
    </div>
    <v-switch
      v-model="is_continuous_scan"
      color="success"
      label="Continuous Scan"
      hide-details
      @click="is_continuous_scan = !is_continuous_scan"
    />

    <button @click="loadStorage()">
      Sync
    </button>
    <h1>Debug</h1>
    <pre>{{ valuesAsJSON }}</pre>
    <pre>{{ keysAsJSON }}</pre>
    <div
      v-if="!is_telegram_client"
      class="text-center"
    >
      Please open the app from a Telegram client!<br>
    </div>
    <div
      v-if="is_telegram_client && !is_telegram_api_updated"
      class="text-center"
    >
      Please update Telegram to Use the app!<br>
      Telegram API version needed 6.9 or greater.<br>
      Your Telegram API version: {{ TWA.version }}
    </div>
  </div>
</template>

<script>
import { prepareUrl } from './helpers'

export default {
  data() {
    return {
      is_telegram_client: false,
      is_telegram_api_updated: false,
      code: null,
      is_url: false,
      url: null,
      // Cloud storage
      cloud_storage_keys: [],
      cloud_storage_values: {},
      is_continuous_scan: false,
    };
  },
  computed: {
    valuesAsJSON() {
      // Convert the array to a JSON string
      return JSON.stringify(this.cloud_storage_values, null, 2);
    },
    keysAsJSON() {
      // Convert the array to a JSON string
      return JSON.stringify(this.cloud_storage_keys, null, 2);
    }
  },
  created() {
    // Binding function to all the event types
    //this.TWA.onEvent('themeChanged', this.themeChanged);
    this.TWA.MainButton.setText("Scan QR code");
    this.TWA.onEvent('qrTextReceived', this.processQRCode);
    this.TWA.onEvent('mainButtonClicked', this.mainButtonClicked);
    // platform not updated if version is not 6.9 or greater
    this.is_telegram_api_updated = this.TWA.isVersionAtLeast('6.9');

    if (this.TWA.platform != "unknown") {
      this.is_telegram_client = true;
    }

    if (this.is_telegram_client && this.is_telegram_api_updated) {
      this.TWA.MainButton.show();
      //this.showQRScanner();
    }
    this.loadStorage();
  },
  mounted() {
    this.TWA.ready();
  },
  methods: {
    loadStorage() {
      this.TWA.CloudStorage.getKeys(this.processKeys);
    },
    processKeys(error, data) {
      if (error) {
        this.TWA.showAlert(error);
        return;
      }
      //sort timestamps in descending order
      data.sort((a, b) => b - a);
      this.cloud_storage_keys = data;
      this.TWA.CloudStorage.getItems(data, this.processItems);
    },
    processItems(error, data) {
      if (error) {
        this.TWA.showAlert(error);
        return;
      }
      this.cloud_storage_values = data;
    },
    removeKey(key) {
      for (var index = 0; index < this.cloud_storage_keys.length; index++) {
        if (this.cloud_storage_keys[index] === key) {
          this.cloud_storage_keys.splice(index, 1);
          delete this.cloud_storage_values[key];
          break;
        }
      }
      this.TWA.CloudStorage.removeItem(key);
    },
    themeChanged() {
      //this.TWA.showAlert('Theme has changed');
      return;
    },
    mainButtonClicked() {
      this.showQRScanner();
    },
    openLink() {
      this.TWA.openLink(this.url);
    },
    addToStorage(value) {
      // generate a key based on the timestamp
      const timestamp = new Date().getTime();

      // check if the value is longer than 4096 characters
      if (value.length > 4096) {
        this.TWA.showAlert('Error Value is longer than 4096 characters');
        return;
      }
      this.TWA.CloudStorage.setItem(timestamp, value);
      // convert timestamp in string and add it to the array
      this.cloud_storage_keys.unshift(timestamp.toString());
      this.cloud_storage_values[timestamp] = value;
      //this.TWA.showAlert('Item added key: ' + this.akey + ' value: ' + this.avalue);
    },
    formattedDate(timestamp) {
      // Create a Date object from the timestamp
      const date = new Date(parseInt(timestamp));

      // Extract day, month, year, hour, and minute components
      const day = date.getDate();
      const month = date.getMonth() + 1; // Months are zero-based, so add 1
      const year = date.getFullYear();
      const hour = date.getHours();
      const minute = date.getMinutes();

      // Format the date as "dd/mm/yyyy hh:mm"
      const formattedDate = `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year} ${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      return formattedDate;
    },
    processQRCode(data) {
       this.code = data.data;
       const result = prepareUrl(this.code)
       this.is_url = result.is_url;
       this.url = result.value;
       this.hapticImpact();
       this.addToStorage(data.data);
       if (!this.is_continuous_scan) {
         this.TWA.closeScanQrPopup();
       }
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
