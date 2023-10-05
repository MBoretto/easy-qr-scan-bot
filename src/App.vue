<template>
  <div id="main">
    <div
      v-if="is_telegram_client && is_telegram_api_updated"
    >
      <v-card
        class="mx-auto"
        max-width="600"
      >
        <!--toolbar-->
        <v-toolbar color="primary">
          <v-spacer />
          <v-btn
            @click="showQRScanner()"
          >
            <v-icon>
              mdi-qrcode-scan
            </v-icon>
            Scan
          </v-btn>
          <v-spacer />
          <v-btn
            @click="show_history = true"
          >
            <v-icon>
              mdi-history
            </v-icon>
            History
          </v-btn>
          <v-spacer />
          <v-btn
            @click="show_history = false"
          >
            <v-icon>
              mdi-cog 
            </v-icon>
            Settings
          </v-btn>
          <v-spacer />
        </v-toolbar>
        <!--history-->
        <v-card 
          v-if="show_history"
        >
          <!--previous scans-->
          <v-expansion-panels v-model="expanded_panels">
            <v-expansion-panel
              v-for="(akey, index) in cloud_storage_keys"
              :key="index"
            >
              <v-expansion-panel-title>
                <v-row no-gutters>
                  <v-col
                    cols="2" 
                    class="d-flex justify-start"
                  >
                    <v-avatar color="grey-lighten-1">
                      <v-icon color="white">
                        {{ getIconFromType(akey) }}
                      </v-icon>
                    </v-avatar>
                  </v-col>
                  <v-col
                    cols="10"
                  >
                    <div>
                      <div 
                        class="headline mb-1"
                      >
                        {{ cloud_storage_values[akey] }}
                      </div>
                      <div
                        class="text-subtitle-2 text-grey"
                      >
                        {{ formattedDate(akey) }}
                      </div>
                    </div>
                  </v-col>
                </v-row>
              </v-expansion-panel-title>
              <v-expansion-panel-text v-if="enriched_values[akey] && enriched_values[akey].hasOwnProperty('type')">
                <GeoCard
                  v-if="enriched_values[akey]['type'] === 'geo'"
                  :coordinate="enriched_values[akey]['info']"
                  @remove-key="removeKey(key)"  
                />
                <UrlCard
                  v-if="enriched_values[akey]['type'] === 'url'"
                  :url="enriched_values[akey]['info']"
                  @remove-key="removeKey(key)" 
                />
              </v-expansion-panel-text>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-card>
        <!--settings-->
        <v-card 
          v-if="!show_history"
        >
          <v-list
            lines="one" 
          >
            <v-list-subheader inset>
              User Controls
            </v-list-subheader>
            <v-list-item
              title="Continuous scan"
              subtitle="Do not close the QR scanner after a scan"
            >
              <template #append>
                <v-switch
                  v-model="is_continuous_scan"
                  color="success"
                  hide-details
                  @click="is_continuous_scan = !is_continuous_scan"
                />
              </template>
            </v-list-item>
            <v-list-subheader inset>
              Debug
            </v-list-subheader>
            <v-list-item
              title="Sync Cloud Storage"
              subtitle="Sync the local cache with Telegram Cloud Storage"
            >
              <template #append>
                <v-btn @click="loadStorage()">
                  Sync
                </v-btn>
              </template>
            </v-list-item>
            <v-list-item
              title="Enrich QR codes"
              subtitle="Decode the content of the QR code according to the type"
            >
              <template #append>
                <v-btn @click="enrichValues(cloud_storage_values)">
                  Enrich
                </v-btn>
              </template>
            </v-list-item>
            <v-list-item
              title="Show debug"
              subtitle="Show debug information"
            >
              <template #append>
                <v-switch
                  v-model="show_debug"
                  color="success"
                  hide-details
                  @click="show_debug = !show_debug"
                />
              </template>
            </v-list-item>
          </v-list>
          <div
            v-if="show_debug"
          >
            <h1>Debug</h1>
            <pre>{{ valuesAsJSON }}</pre>
            <pre>{{ keysAsJSON }}</pre>
            <pre>{{ enrichAsJSON }}</pre>
          </div>
        </v-card>        
      </v-card>
    </div>
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
import { prepareUrl, prepareCoordinate } from './helpers'
import UrlCard from "./components/UrlCard.vue";
import GeoCard from "./components/GeoCard.vue";

export default {
  components: {
    UrlCard,
    GeoCard
  },
  data() {
    return {
      is_telegram_client: false,
      is_telegram_api_updated: false,
      last_code: null,
      show_history: true,
      // Cloud storage
      cloud_storage_keys: [],
      cloud_storage_values: {},
      enriched_values: {},
      is_continuous_scan: false,
      show_debug: false,
      expanded_panels: [0], // Set the first element to expanded by default
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
    },
    enrichAsJSON() {
      // Convert the array to a JSON string
      return JSON.stringify(this.enriched_values, null, 2);
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
      this.loadStorage();
    }
    //this.enrichValues(this.cloud_storage_values);
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
      this.enrichValues(data);
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
    enrichValue(key) {
      this.enriched_values[key] = {};
      const code_type = this.detectCodeType(this.cloud_storage_values[key]);
      this.enriched_values[key]['type'] = code_type;
    
      if (code_type == "geo") {
        this.enriched_values[key]['info'] = prepareCoordinate(this.cloud_storage_values[key]);
      } else if (code_type == "wifi") {
        //this.enriched_values[key]['info'] = processWifiCode(this.cloud_storage_values[key]);
      } else if (code_type == "vcard") {
        //this.enriched_values[key]['info'] = processVcardCode(this.cloud_storage_values[key]);
      } else if (code_type == "url") {
        this.enriched_values[key]['info'] = prepareUrl(this.cloud_storage_values[key]);
      }

    },
    enrichValues(data) {
      for (var key in data) {
        this.enrichValue(key);
      }
    },
    themeChanged() {
      //this.TWA.showAlert('Theme has changed');
      return;
    },
    mainButtonClicked() {
      this.showQRScanner();
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
      return timestamp;
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
      const second = date.getSeconds();
      // Format the date as "dd/mm/yyyy hh:mm:ss"
      const formattedDate = `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year} ${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}:${second.toString().padStart(2, '0')}`;

      return formattedDate;
    },
    processQRCode(data) {
      // avoids to scan the same code twice in continuous scan mode
      if (data.data == this.last_code) {
        return;
      }
      this.last_code = data.data;
      //const result = prepareUrl(this.last_code)
      //this.is_url = result.is_url;
      //this.url = result.value;

      this.hapticImpact();
      let key = this.addToStorage(data.data);
      this.enrichValue(key);
      if (!this.is_continuous_scan) {
        this.TWA.closeScanQrPopup();
      }
      // Back to the history screen
      this.show_history = true;
      // last element displayed
      this.expanded_panels = [0];
      //this.TWA.showAlert(data.data);
    },
    detectCodeType(code) {
      // if start with geo
      if (code.startsWith("geo:")) {
        return "geo";
      } else if (code.startsWith("WIFI:")) {
        return "wifi";
      } else if (code.startsWith("BEGIN:VCARD")) {
        return "vcard";
      } else if (code.startsWith("http")) {
        return "url";
      }
      return "text";
    },
    getIconFromType(key) {
      // check if key exists
      if (!this.enriched_values[key]) {
        console.log("key not found");
        return "mdi-text-box";
      }
      // check it key type exists
      if (!this.enriched_values[key]['type']) {
        console.log("type not found");
        return "mdi-text-box";
      }
      let type = this.enriched_values[key]['type'];
      if (type == "geo") {
        return "mdi-map-marker-outline";
      }
      if (type == "wifi") {
        return "mdi-wifi";
      }
      if (type == "vcard") {
        return "mdi-account";
      }
      if (type == "url") {
        return "mdi-link";
      }
      if (type  == "text") {
        return "mdi-text-box";
      }
    },
    // End of callbacks
    showQRScanner() {
      let par = {
          text: ""
        };
      if (this.is_continuous_scan) {
        par = {
          text: "Continuous scan enabled.",
        };
      }

      this.TWA.showScanQrPopup(par);
    },
    hapticImpact() {
      // light medium heavy rigid soft
      this.TWA.HapticFeedback.impactOccurred("rigid");
      this.TWA.HapticFeedback.impactOccurred("heavy");
    }
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
/*
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
}*/


/* .icon-button {
  display: flex;
  flex-direction: column;
  align-items: center;
} */

</style>
