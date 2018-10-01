<template>
  <v-layout row fill-height>
    <v-flex>
      <v-flex> <!-- v-flex for first toolbar -->
        <v-toolbar flat color="white">
          <v-flex> <!-- v-flex for title -->
            <v-toolbar-title>Events</v-toolbar-title>
          </v-flex>
          <v-spacer>
          </v-spacer>
          <v-flex> <!-- v-flex for search field -->
            <v-text-field
              v-model="search"
              append-icon="search"
              label="Quick Search"
              single-line
              hide-details
            ></v-text-field>
          </v-flex>
        </v-toolbar>
      </v-flex>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: "events",
  data() {
    return {
      search: '',
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
