<template>
  <v-app id="app">
    <main-navigation></main-navigation>
    <v-content>
      <v-container fluid fill-height>
        <v-layout justify-center align-center>
          <!-- content start -->
          <router-view/>
          <!-- content end -->
        </v-layout>
      </v-container>
    </v-content>
    <bottom-navigation></bottom-navigation>
  </v-app>
</template>

<script>
import BottomNavigation from "./components/BottomNavigation";
import MainNavigation from "./components/MainNavigation";
export default {
  name: "App",
  components: {
    BottomNavigation: BottomNavigation,
    MainNavigation: MainNavigation
  }
};
</script>

<style>
</style>
