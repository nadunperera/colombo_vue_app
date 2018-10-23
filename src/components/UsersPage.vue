<template>
  <v-layout row fill-height>
    <v-flex>
      <v-flex> <!-- v-flex for first toolbar -->
        <v-toolbar flat color="white">
          <v-toolbar-title>Users</v-toolbar-title>
          <v-divider
            class="mx-2"
            inset
            vertical
          ></v-divider>
          <v-btn color="primary" v-on:click="clearAll">Clear</v-btn>
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="search"
            label="Quick Search"
            single-line
            hide-details
          ></v-text-field>
        </v-toolbar>
      </v-flex>
      <v-flex> <!-- v-flex for second toolbar -->
        <v-toolbar flat color="grey lighten-3">
          <v-toolbar-title class="ml-0 caption">Total ({{ users.length }})</v-toolbar-title>
          <v-divider
            class="mx-2"
            inset
            vertical
          ></v-divider>
          <v-toolbar-title class="ml-0 caption">Selected ({{ selected.length }})</v-toolbar-title>
          <v-divider
            class="mx-2"
            inset
            vertical
          ></v-divider>
          <v-toolbar-title class="ml-0 caption">No Filters Active</v-toolbar-title>
        </v-toolbar>
      </v-flex>
      <v-flex> <!-- v-flex for data table -->
        <v-data-table
          v-model="selected"
          :headers="headers"
          :items="users"
          :pagination.sync="pagination"
          :rows-per-page-items="rowsPerPageItems"
          :search="search"
          select-all
          item-key="name"
          class="elevation-1"
        >
          <template slot="items" slot-scope="props">
            <td>
              <v-checkbox v-model="props.selected" hide-details color="primary"></v-checkbox>
            </td>
            <td class="text-xs-left">{{ props.item.id }}</td>
            <td class="text-xs-left">{{ props.item.name }}</td>
            <td class="text-xs-left">{{ props.item.email }}</td>
            <td class="text-xs-left">{{ props.item.mobile_number }}</td>
            <td class="text-xs-left">{{ props.item.suburb }}</td>
            <td class="text-xs-left">{{ props.item.post_code }}</td>
            <td class="justify-center layout px-0">
              <v-icon small class="mr-2" v-on:click="">visibility</v-icon>
              <v-icon small class="mr-2" v-on:click="">edit</v-icon>
              <v-icon small class="mr-2" v-on:click="">email</v-icon>
              <v-icon small v-on:click="">delete</v-icon>
            </td>
          </template>
          <v-alert slot="no-results" :value="true" color="error" icon="warning">
            Your search for "{{ search }}" found no results.
          </v-alert>
        </v-data-table>
      </v-flex>
      <v-flex> <!-- v-flex for fab speed dial -->
        <v-speed-dial v-model="fab" :bottom="bottom" :right="right" :direction="direction" :transition="transition">
          <v-btn slot="activator" v-model="fab" color="pink darken-2" dark fab>
            <v-icon>keyboard_arrow_up</v-icon>
            <v-icon>keyboard_arrow_down</v-icon>
          </v-btn>
          <v-btn fab dark small color="primary" to="/users/new">
            <v-icon>add</v-icon>
          </v-btn>
          <v-dialog v-model="dialogFilter" persistent max-width="500px">
            <v-btn fab dark small slot="activator" color="success">
              <v-icon>filter_list</v-icon>
            </v-btn>
            <v-card>
              <v-card-title>
                <span class="headline">New Filter</span>
              </v-card-title>
              <v-card-text>
                <v-container grid-list-md>
                  <v-layout wrap>
                    <!-- v-flex stuff goes here -->
                  </v-layout>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" flat v-on:click="dialogFilter = false">Close</v-btn>
                <v-btn color="blue darken-1" flat v-on:click="dialogFilter = false">Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-btn fab dark small color="primary">
            <v-icon>save_alt</v-icon>
          </v-btn>
          <v-btn fab dark small color="warning" :disabled="isDisabled">
            <v-icon>email</v-icon>
          </v-btn>
          <v-btn fab dark small color="error" :disabled="isDisabled">
            <v-icon>delete</v-icon>
          </v-btn>
        </v-speed-dial>
      </v-flex>
    </v-flex>
  </v-layout>
</template>

<script>
import axios from 'axios'

export default {
  name: "UsersPage",

  data() {
    return {
      //speed dial options
      direction: 'top',
      fab: false,
      right: true,
      bottom: true,
      transition: 'slide-y-reverse-transition',

      //axios api
      info: null,

      //dialog activators
      dialogNew: false,
      dialogFilter: false,

      //search text field
      search: '',

      //data table related
      rowsPerPageItems: [10,20,40,{"text":"$vuetify.dataIterator.rowsPerPageAll","value":-1}],
      pagination: {
        sortBy: "name",
        rowsPerPage: 10,
      },
      selected: [],
      headers: [
        { text: "ID", value: "id" },
        { text: "Name", value: "name" },
        { text: "Email", value: "email" },
        { text: "Mobile Number", value: "mobile_number" },
        { text: "Suburb", value: "suburb" },
        { text: "Post Code", value: "post_code" },
        { text: 'Actions', value: 'name', sortable: false }
      ],
      users: [
        {
          value: false,
          id: 1,
          name: "Nadun Perera",
          email: "nadun.perera@me.com",
          mobile_number: "0405631465",
          suburb: "Rhodes",
          post_code: "2138",
        },
        {
          value: false,
          id: 2,
          name: "Prerana Magar",
          email: "prerana.magar@me.com",
          mobile_number: "0428222719",
          suburb: "Rhodes",
          post_code: "2138",
        },
        {
          value: false,
          id: 3,
          name: "Glenn Piper",
          email: "glenn@meridianaustralia.com.au",
          mobile_number: "0487665987",
          suburb: "Curl Curl",
          post_code: "2455",
        },
        {
          value: false,
          id: 4,
          name: "Adam Duffy",
          email: "adam@meridianaustralia.com.au",
          mobile_number: "0423654668",
          suburb: "North Sydney",
          post_code: "2674",
        },
        {
          value: false,
          id: 5,
          name: "Brett Antymniuk",
          email: "brett@meridianaustralia.com.au",
          mobile_number: "0413760023",
          suburb: "Lindfield",
          post_code: "2887",
        },
        {
          value: false,
          id: 6,
          name: "Benjamin Tavai",
          email: "bentavai@gmail.com",
          mobile_number: "0433552764",
          suburb: "Forestville",
          post_code: "2941",
        },
        {
          value: false,
          id: 7,
          name: "Yza Canja",
          email: "yza@propertyrocket.com.au",
          mobile_number: "0407833539",
          suburb: "Coogee",
          post_code: "2133",
        },
        {
          value: false,
          id: 8,
          name: "Alex Rivas",
          email: "alex@meridianaustralia.com.au",
          mobile_number: "0457428833",
          suburb: "Paddington",
          post_code: "2003",
        },
        {
          value: false,
          id: 9,
          name: "Matt Pinter",
          email: "matt.pinter@me.com",
          mobile_number: "0403290021",
          suburb: "Pyrmont",
          post_code: "2009",
        },
        {
          value: false,
          id: 10,
          name: "Terry Smith",
          email: "terry.c@evoke.limo",
          mobile_number: "0403892292",
          suburb: "Neutral Bay",
          post_code: "2964",
        },
        {
          value: false,
          id: 11,
          name: "Vichithra Mendis",
          email: "vichithra@gmail.com",
          mobile_number: "0489776524",
          suburb: "Manly",
          post_code: "2122",
        },
      ]
    }
  },

  computed: {
    isDisabled() {
      if (this.selected.length == 0) {
        return true
      } else {
        return false
      }
    },
  },

  mounted () {
    //this is where you load the users for the datatable
    axios
      .get('https://api.coindesk.com/v1/bpi/currentprice.json')
      .then(response => {
        this.info = response.data.bpi
        console.log(this.info)
      })
      .catch(error => {
        console.log(error)
        this.errored = true
      })
      .finally(() => this.loading = false)
  },

  methods: {
    clearAll () {
      this.selected = []
      this.search = ''
    },
  },

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .v-speed-dial {
    position: absolute;
  }

  .v-btn--floating {
    position: relative;
  }
</style>
