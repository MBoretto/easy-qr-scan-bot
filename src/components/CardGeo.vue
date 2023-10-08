<template>
  <v-card
    class="mx-auto"
    max-width="600"
    variant="flat"
  > 
    <v-card-item>
      <div>
        {{ data.lat }}, {{ data.lng }}
      </div>
    </v-card-item>
    <v-card-actions>
      <v-spacer />
      <v-btn 
        size="large"
        color="primary"
        variant="tonal"
        @click="openLink(data.lat, data.lng)"
      >
        Open Location
      </v-btn>
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
  name: "CardGeo",
  components: {
    ButtonDelete,
  },
  props: {
    data: {
      type: Object,
      required: true,
    }
  },
  emits: [
    'remove-key'
  ],
  created() {
    console.log(this.data);
  },
  methods: {
    openLink(lat, lng) {
        this.TMA.openLink('https://maps.google.com/?q=' + lat + ',' + lng);
    },
  },
});
</script>