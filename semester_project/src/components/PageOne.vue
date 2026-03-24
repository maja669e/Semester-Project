<script>
export default {
  name: "PageOne",
  data() {
    return {
      selectedCategory: null,
      customCategory: "",
      uploadedImages: [],
    };
  },
  watch: {
    selectedCategory(newVal) {
      if (newVal !== "Andet") {
        this.customCategory = "";
      }
    },
  },
  methods: {
    openFileDialog() {
      this.$refs.fileInput.click();
    },
    handleFiles(event) {
      const files = Array.from(event.target.files);
      files.forEach((file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.uploadedImages.push(e.target.result);
        };
        reader.readAsDataURL(file);
      });
    },
    handleDrop(event) {
      const files = Array.from(event.dataTransfer.files);
      files.forEach((file) => {
        if (!file.type.startsWith("image/")) return;
        const reader = new FileReader();
        reader.onload = (e) => {
          this.uploadedImages.push(e.target.result);
        };
        reader.readAsDataURL(file);
      });
    },
    next() {
      const data = {
        category:
          this.selectedCategory === "Andet"
            ? this.customCategory
            : this.selectedCategory,
        images: this.uploadedImages,
      };
      this.$emit("go-to-add-details", data);
    },
    cancel() {
      this.$emit("go-to-items");
    },
  },
};
</script>

<template>
  <v-container class="pa-4" max-width="600">
    <h2>Beskriv din genstand</h2>
    <p>
      Tilføj billeder, vælg kategori og giv din genstand et navn, så andre kan
      finde den.
    </p>

    <div class="addPhoto">
      <h3>Billeder*</h3>
      <!-- Upload photo https://medium.com/swlh/drop-and-click-file-upload-with-vuetifyjs-f2c2a8357377 -->
      <v-card
        class="upload-card d-flex flex-column align-center justify-center text-center"
        @click="openFileDialog"
        @dragover.prevent
        @drop.prevent="handleDrop"
        flat
      >
        <div class="icon-wrapper mb-4">
          <v-icon size="32" color="#389475">mdi-camera</v-icon>
        </div>

        <div class="text-h6 font-weight-bold mb-2">
          Tilføj mindst ét billede
        </div>

        <div class="text-body-2 text-medium-emphasis">
          Tryk for at uploade fotos af din genstand
        </div>

        <input
          type="file"
          ref="fileInput"
          multiple
          accept="image/*"
          style="display: none"
          @change="handleFiles"
        />
      </v-card>

      <!-- Preview uploaded images -->
      <div class="uploaded-images mt-4" v-if="uploadedImages.length">
        <v-img
          v-for="(img, index) in uploadedImages"
          :key="index"
          :src="img"
          max-width="150"
          class="mr-4 mb-4"
          rounded
        />
      </div>
    </div>

    <!-- Category selection -->
    <div>
      <h3>Kategori*</h3>
      <v-btn-toggle
        v-model="selectedCategory"
        class="category-toggle d-flex flex-wrap ga-2"
        mandatory
      >
        <v-btn value="Elektronik" rounded="xl" variant="#eeece8"
          >Elektronik</v-btn
        >
        <v-btn value="Værktøj" rounded="xl" variant="#eeece8">Værktøj</v-btn>
        <v-btn value="Sport" rounded="xl" variant="#eeece8">Sport</v-btn>
        <v-btn value="Køkken" rounded="xl" variant="#eeece8">Køkken</v-btn>
        <v-btn value="Haveredskaber" rounded="xl" variant="#eeece8"
          >Haveredskaber</v-btn
        >
        <v-btn value="Andet" rounded="xl" variant="#eeece8">Andet</v-btn>
      </v-btn-toggle>

      <v-text-field
        v-if="selectedCategory === 'Andet'"
        v-model="customCategory"
        label="Skriv din kategori"
        class="mt-4"
        color="#389475"
        variant="outlined"
        rounded="xl"
        clearable
      />

      <h3>Navn på genstand*</h3>
      <v-text-field
        label="Hvad er det for en genstand?"
        class="mt-4"
        color="#389475"
        variant="outlined"
        rounded="xl"
      />

      <h3>Mærke</h3>
      <v-text-field
        label="F.eks. Bosch, Apple..."
        class="mt-4"
        color="#389475"
        variant="outlined"
        rounded="xl"
      />
    </div>

    <!--  Tilbage og næste knapper -->

    <v-row>
      <v-col cols="12">
        <div class="fixed-bottom-buttons">
          <v-btn class="ma-2 back_button" size="large" @click="cancel">
            Anuller
          </v-btn>
          <!-- To do - implementere navigation tilbage til MyItems -->
          <v-btn class="ma-2 next_button" size="large" @click="next">
            Næste
          </v-btn>
          <!-- To do - implementere navigation videre til bekræftelsesskærm -->
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.category-toggle .v-btn--active {
  background-color: #389475 !important;
  color: white !important;
}
.uploaded-images {
  display: flex;
  flex-wrap: wrap;
}
:deep(.v-field) {
  --v-field-border-width: 3px;
}

.upload-card {
  height: 240px;
  border: 2px dashed #7bbf9f;
  border-radius: 24px;
  background-color: #f3f7f5;
  cursor: pointer;
  transition: all 0.2s ease;
}

.upload-card:hover {
  background-color: #eef6f2;
  border-color: #389475;
}

/* Icon background */
.icon-wrapper {
  background-color: #dfeee7;
  border-radius: 20px;
  padding: 16px;
}

.fixed-bottom-buttons {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 2px;
}

.back_button,
.next_button {
  flex: 1;
  max-width: 200px;
  min-height: 56px;
  border-radius: 10px;
  font-weight: normal;
}

.back_button {
  background-color: whitesmoke;
  color: black;
}

.next_button {
  background-color: #389475;
  color: white;
}
</style>
