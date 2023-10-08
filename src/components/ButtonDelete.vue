<template>
  <v-btn
    color="red"
    icon="mdi-delete-outline"
    variant="tonal"
    @click="$emit('remove-key')"
  />
</template>

<script>
import { defineComponent } from 'vue';
export default defineComponent({
  name: "ButtonDelete",
  emits: [
    'remove-key'
  ],
});
</script>