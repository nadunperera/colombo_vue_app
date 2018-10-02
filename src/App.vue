<template>
  <v-app id="app">
    <navigation-main></navigation-main>
    <v-content>
      <v-container fluid>
        <!-- content start -->
        <router-view/>
        <!-- content end -->
      </v-container>
    </v-content>
    <navigation-bottom></navigation-bottom>
  </v-app>
</template>

<script>
import NavigationMain from "./components/NavigationMain";
import NavigationBottom from "./components/NavigationBottom";
export default {
  name: "App",
  components: {
    'navigation-bottom': NavigationBottom,
    'navigation-main': NavigationMain
  }
};
</script>

<style>
</style>
