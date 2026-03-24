<script>
import Home from "@/components/Home.vue";
import MyItems from "@/components/MyItems.vue";
import AddDetails from "@/components/AddDetails.vue";
import PageOne from "@/components/PageOne.vue";
import ConfirmItemScreen from "./components/ConfirmItemScreen.vue";

export default {
  components: {
    Home,
    MyItems,
    AddDetails,
    PageOne,
    ConfirmItemScreen,
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
    goToPageOne() {
      this.currentPage = "pageOne";
    },
    goToAddDetails(data) {
      console.log("PageOne data:", data);
      this.currentPage = "addDetails";
    },
    handleSaveDetails(details) {
      this.itemDetails = details;
      console.log("Saved:", details);
      this.currentPage = "items"; //Change to next page when implemented
    },
    goToConfirmItem() {
      this.currentPage = "confirmItem";
    },
  },
};
</script>

<template>
  <v-app>
    <v-main>
      <!-- Page navigation -->
      <Home v-if="currentPage === 'home'" @go-to-items="goToItems" />

      <MyItems
        v-if="currentPage === 'items'"
        @go-to-home="goHome"
        @go-to-page-one="goToPageOne"
      />

      <PageOne
        v-if="currentPage === 'pageOne'"
        @go-to-add-details="goToAddDetails"
        @go-to-items="goToItems"
      />

      <AddDetails
        v-if="currentPage === 'addDetails'"
        @go-to-home="goHome"
        @go-to-page-one="goToPageOne"
        @save-details="handleSaveDetails"
        @go-to-confirm-item="goToConfirmItem"
      />
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
