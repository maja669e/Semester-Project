<template>
  <v-app>
    <v-main>
      <HelloWorld />
      <PageOne />
    </v-main>
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
  import HelloWorld from '@/components/HelloWorld.vue'
  import PageOne from '@/components/PageOne.vue'

  
</script>
