<template>
  <v-toolbar color="primary">
    <v-spacer />
    <v-btn
      @click="$emit('show-qr-scanner')"
    >
      <v-icon>
        mdi-qrcode-scan
      </v-icon>
      Scan
    </v-btn>
    <v-spacer />
    <v-btn
      @click="$emit('show-history')"
    >
      <v-icon>
        mdi-history
      </v-icon>
      History
    </v-btn>
    <v-spacer />
    <v-btn
      @click="$emit('show-settings')"
    >
      <v-icon>
        mdi-cog 
      </v-icon>
      Settings
    </v-btn>
    <v-spacer />
  </v-toolbar>
</template>

<script>
import { defineComponent } from 'vue';
export default defineComponent({
  name: "AppMenu",
  emits: [
    'show-qr-scanner',
    'show-history',
    'show-settings'
  ],
});
</script>