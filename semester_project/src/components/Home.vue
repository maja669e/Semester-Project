<script>
export default {
  name: "",
  components: {},
  data() {
    return {};
  },
  computed: {},
  methods: {},
  watch: {},
};
</script>

<template>
  <v-container class="text-center">
    <h1 class="mt-15 mb-2">Velkommen til dit lokale fællesskab</h1>

    <div class="flex-grow-1"></div>

    <v-row>
      <v-col cols="12">
        <v-btn class="items_button" size="large" @click="$emit('go-to-items')">
          Dine genstande
        </v-btn>
      </v-col>

      <v-col cols="12">
        <v-btn class="loans_button" size="large"> Dine lån </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.items_button,
.loans_button {
  background-color: #389475;
  color: white;
  font-weight: normal;
  min-width: 200px;
  border-radius: 10px;
}
</style>
