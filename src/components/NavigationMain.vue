<template>
  <div id="main-navigation">
    <v-navigation-drawer
      :clipped="$vuetify.breakpoint.lgAndUp"
      v-model="drawer"
      fixed
      app
    >
      <v-list dense class="ml-3">
        <template v-for="item in items">
            <v-layout v-if="item.heading" :key="item.heading" row align-center>
              <v-flex xs6>
                <v-subheader v-if="item.heading">
                {{ item.heading }}
                </v-subheader>
              </v-flex>
            </v-layout>
            <v-list-group v-else-if="item.children" v-model="item.model" :key="item.text"
            :prepend-icon="item.model ? item.icon : item['icon-alt']" append-icon="">
              <v-list-tile slot="activator">
                <v-list-tile-content>
                <v-list-tile-title>
                    {{ item.text }}
                </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile v-for="(child, i) in item.children" :key="i" :to="item.path">
                <v-list-tile-action v-if="child.icon">
                <v-icon>{{ child.icon }}</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                <v-list-tile-title>
                    {{ child.text }}
                </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-list-group>
            <v-list-tile v-else :key="item.text" :to="item.path" active-class="grey lighten-3 primary--text">
              <v-list-tile-action>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>
                {{ item.text }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar :clipped-left="$vuetify.breakpoint.lgAndUp" color="primary"  dark app fixed>
      <v-toolbar-title style="width: 300px">
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <span class="hidden-sm-and-down">Colombo</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>apps</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>notifications</v-icon>
      </v-btn>
      <v-btn icon large>
        <v-avatar size="32px" tile>
          <img src="@/assets/avatar.png" alt="Profile Image">
        </v-avatar>
      </v-btn>
    </v-toolbar>
  </div>
</template>

<script>
export default {
  name: "NavigationMain",
  data() {
    return {
      drawer: null,
      items: [
        { icon: "dashboard", text: "Dashboard", path: "/" },
        { icon: "people", text: "Users", path: "/users" },
        { icon: "business", text: "Projects", path: "" },
        { icon: "place", text: "Events", path: "" },
        { icon: "call_split", text: "Funnels", path: "" },
        { icon: "monetization_on", text: "Sales", path: "" },
        { icon: "folder_special", text: "Invoices", path: "" },
        { icon: "settings", text: "Settings", path: "" }
      ]
    };
  },
  methods: {},
  props: {
    source: String
  }
};
</script>

<style>
</style>
