<script>
import Home from "@/components/Home.vue";
import MyItems from "@/components/MyItems.vue";
import AddDetails from "@/components/AddDetails.vue";

export default {
  components: {
    Home,
    MyItems,
    AddDetails,
  },
  data() {
    return {
      currentPage: "home",
      itemDetails: null,
    };
  },
  methods: {
    goHome() {
      this.currentPage = "home";
    },
    goToItems() {
      this.currentPage = "items";
    },
    goToAddDetails() {
      this.currentPage = "addDetails";
    },
    handleSaveDetails(details) {
      this.itemDetails = details;
      console.log("Saved:", details);
      this.currentPage = "items"; //Change to next page when implemented
    },
  },
};
</script>

<template>
  <v-app>
    <v-main>
      <HelloWorld />
      <PageOne />
    </v-main>

    <v-btn
      class="ma-2"
      icon="mdi-home"
      location="top left"
      position="absolute"
      @click="goHome"
    />

    <v-btn
      class="ma-2"
      icon="mdi-theme-light-dark"
      location="top right"
      position="absolute"
      @click="$vuetify.theme.cycle()"
    />
  </v-app>
</template>

<script lang="ts" setup>
import HelloWorld from "@/components/HelloWorld.vue";
import PageOne from "@/components/PageOne.vue";
</script>
