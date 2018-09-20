<template>
  <div id="main-navigation">
    <v-navigation-drawer
      :clipped="$vuetify.breakpoint.lgAndUp"
      v-model="drawer"
      fixed
      app
    >
      <v-list dense>
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
              <v-list-tile
                  v-for="(child, i) in item.children"
                  :key="i"
                  @click=""
              >
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
            <v-list-tile v-else :key="item.text" @click="">
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
    <v-toolbar :clipped-left="$vuetify.breakpoint.lgAndUp" color="blue darken-3"  dark app fixed>
      <v-toolbar-title style="width: 300px" class="ml-0 pl-3">
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <span class="hidden-sm-and-down">Colombo</span>
      </v-toolbar-title>
      <v-text-field flat solo-inverted hide-details prepend-inner-icon="search" label="Search" class="hidden-sm-and-down" ></v-text-field>
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
  name: "main-navigation",
  data: () => ({
    drawer: null,
    items: [
      { icon: "dashboard", text: "Dashboard" },
      { icon: "people", text: "Users" },
      { icon: "business", text: "Projects" },
      { icon: "place", text: "Events" },
      { icon: "call_split", text: "Funnels" },
      { icon: "monetization_on", text: "Sales" },
      { icon: "folder_special", text: "Invoices" },
      { icon: "settings", text: "Settings" }
    ]
  }),
  props: {
    source: String
  }
};
</script>

<style>
</style>
