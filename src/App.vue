<template>
  <div id="app">
    <navigation-top></navigation-top>
    <navigation-left></navigation-left>
    <router-view/>
  </div>
</template>

<script>
import NavigationTop from "./components/NavigationTop";
import NavigationLeft from "./components/NavigationLeft";

export default {
    name: "App",
    components: {
        NavigationTop: NavigationTop,
        NavigationLeft: NavigationLeft
    }
};
</script>

<style>
#app {
    font-size: 50px;
}
</style>
