<template>
  <v-card
    class="mx-auto"
    max-width="600"
    variant="flat"
  > 
    <v-card-item>
      <div>
        Network Name: {{ data.S }}
      </div>
      <div>
        Type: {{ data.T }}
      </div>
      <div>
        Password: {{ data.P }}
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
    data: {
      type: Object,
      required: true,
    },
  },
  emits: [
    'remove-key'
  ],
  created() {
    console.log(this.data);
  }
});
</script>