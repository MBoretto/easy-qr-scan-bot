<template>
  <v-card
    class="mx-auto"
    max-width="600"
    variant="flat"
  > 
    <v-card-item>
      <div>
        {{ aurl.value }}
      </div>
    </v-card-item>
    <v-card-actions>
      <v-spacer />
      <v-btn 
        size="large"
        @click="openLink(aurl.value)"
      >
        Open Link
      </v-btn>
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
  name: "UrlCard",
  props: {
    url: {
      type: Object, // Object is a constructor for objects
      required: true, // This is optional, but it makes the prop required
    },
  },
  emits: [
    'remove-key'
  ],
  data() {
    return {
      aurl: this.url,
    };
  },
  created() {
    console.log(this.url);
  },
  methods: {
    openLink(url) {
        this.TWA.openLink(url);
    },
  },
});
</script>



<style scoped>
</style>