<template>
  <v-card
    class="mx-auto"
    max-width="600"
    variant="flat"
  > 
    <v-card-item>
      <div>
        {{ acoordinate.lat }}, {{ acoordinate.lng }}
      </div>
    </v-card-item>
    <v-card-actions>
      <v-spacer />
      <v-btn 
        size="large"
        @click="openLink(acoordinate.lat, acoordinate.lng)"
      >
        Open Location
      </v-btn>
      <v-spacer />
      <v-btn
        color="red"
        icon="mdi-delete-outline"
        variant="text"
        @click="removeKey(akey)"
      />
    </v-card-actions>
  </v-card>
</template>

<script>
import { defineComponent } from 'vue';
export default defineComponent({
  name: "GeoCard",
  props: {
    coordinate: {
      type: Object, // Object is a constructor for objects
      required: true, // This is optional, but it makes the prop required
    },
  },
  data() {
    return {
      acoordinate: this.coordinate,
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