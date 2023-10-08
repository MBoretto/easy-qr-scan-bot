<template>
  <v-card>
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
            v-model="local_is_continuous_scan"
            color="success"
            hide-details
            @click="$emit('toggle-continuous_scan')"
          />
        </template>
      </v-list-item>
      <v-list-subheader inset>
        About
      </v-list-subheader>
      <v-list-item
        title="Show Your Love on GitHub"
        subtitle="Contribute and Support @easyqrscanbot"
      >
        <template #append>
          <v-btn @click="openLink('https://github.com/MBoretto/easy-qr-scan-bot')">
            <v-icon>mdi-github</v-icon>
          </v-btn>
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
          <v-btn
            @click="$emit('load-storage')"
          >
            Sync
          </v-btn>
        </template>
      </v-list-item>
      <v-list-item
        title="Enrich QR codes"
        subtitle="Decode the content of the QR code according to the type"
      >
        <template #append>
          <v-btn
            @click="$emit('enrich-values')"
          >
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
      <pre>{{ keysAsJSON }}</pre>
      <pre>{{ valuesAsJSON }}</pre>
      <pre>{{ enrichAsJSON }}</pre>
    </div>
  </v-card>
</template>

<script>
import { defineComponent } from 'vue';
export default defineComponent({
  name: "AppSettings",
  props: {
    isContinuousScan: {
      type: Boolean, // Object is a constructor for objects
      required: true, // This is optional, but it makes the prop required
    },
    cloudStorageValues: {
      type: Object, // Object is a constructor for objects
      required: true, // This is optional, but it makes the prop required
    },
    cloudStorageKeys: {
      type: Object, // Object is a constructor for objects
      required: true, // This is optional, but it makes the prop required
    },
    enrichedValues: {
      type: Object, // Object is a constructor for objects
      required: true, // This is optional, but it makes the prop required
    },
  },
  emits: [
    'toggle-continuous_scan',
    'load-storage',
    'enrich-values'
  ],
  data() {
    return {
      show_debug: false,
      local_is_continuous_scan: this.isContinuousScan,
    }
  },
  computed: {
    valuesAsJSON() {
      return JSON.stringify(this.cloudStorageValues, null, 2);
    },
    keysAsJSON() {
      return JSON.stringify(this.cloudStorageKeys, null, 2);
    },
    enrichAsJSON() {
      return JSON.stringify(this.enrichedValues, null, 2);
    }
  },
  methods: {
    openLink(url) {
        this.TMA.openLink(url);
    },
  }
});
</script>