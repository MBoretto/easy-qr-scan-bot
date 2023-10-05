<template>
  <v-card
    class="mx-auto"
    max-width="600"
    variant="flat"
  > 
    <v-card-item>
      <div>
        {{ atext }}
      </div>
    </v-card-item>
    <v-card-actions>
      <v-spacer />
      <v-btn
        color="red"
        icon="mdi-delete-outline"
        variant="text"
        @click="$emit('remove-key')"
      />
    </v-card-actions>
  </v-card>
</template>

<script>
import { defineComponent } from 'vue';
export default defineComponent({
  name: "TextCard",
  props: {
    text: {
      type:  String, // Object is a constructor for objects
      required: true, // This is optional, but it makes the prop required
    }
  },
  emits: [
    'remove-key'
  ],
  data() {
    return {
      atext: this.text,
    };
  },
  created() {
    console.log(this.coordinate);
  },
  methods: {
    openLink(lat, lng) {
        this.TWA.openLink('https://maps.google.com/?q=' + lat + ',' + lng);
    },
  },
});
</script>



<style scoped>
</style>