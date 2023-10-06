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
  name: "CardText",
  components: {
    ButtonDelete,
  },
  props: {
    text: {
      type:  String,
      required: true,
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
        this.TMA.openLink('https://maps.google.com/?q=' + lat + ',' + lng);
    },
  },
});
</script>