<template>
  <v-card
    class="mx-auto"
    max-width="600"
    variant="flat"
  > 
    <v-card-item>
      <div>
        Network Name: {{ wifi.S }}
      </div>
      <div>
        Type: {{ wifi.T }}
      </div>
      <div>
        Password: {{ wifi.P }}
      </div>
    </v-card-item>
    <v-card-actions>
      <v-spacer />
      <ButtonDelete
        @remove-key="$emit('remove-key')"
      />
    </v-card-actions>
  </v-card>
</template>

<script>
import { defineComponent } from 'vue';
import ButtonDelete from "./ButtonDelete.vue";
export default defineComponent({
  name: "CardWifi",
  components: {
    ButtonDelete,
  },
  props: {
    wifi: {
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