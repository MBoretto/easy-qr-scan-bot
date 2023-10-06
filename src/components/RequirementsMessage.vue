<template>
  <div class="text-center">
    <span
      v-if="!isTelegramClient"
    >
      Please open the app from a Telegram client!<br>
    </span>
    <span
      v-if="isTelegramClient && !isTelegramApiUpdated"
    >
      Please update Telegram to Use the app!<br>
      Telegram API version needed 6.9 or greater.<br>
      Your Telegram API version: {{ TMA.version }}
    </span>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
export default defineComponent({
  name: "RequirementsMessage",
  props: {
    isTelegramClient: {
      type: Boolean,
      required: true,
    },
    isTelegramApiUpdated: {
      type: Boolean,
      required: true,
    },
  }
});
</script>