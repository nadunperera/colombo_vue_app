<template>
    <v-layout child-flex>
        <v-data-table
            v-model="selected"
            :headers="headers"
            :items="users"
            :pagination.sync="pagination"
            select-all
            item-key="name"
            class="elevation-1"
        >
            <template slot="headers" slot-scope="props">
            <tr>
                <th>
                <v-checkbox
                    :input-value="props.all"
                    :indeterminate="props.indeterminate"
                    primary
                    color="deep-purple"
                    hide-details
                    @click.native="toggleAll"
                ></v-checkbox>
                </th>
                <th
                v-for="header in props.headers"
                :key="header.text"
                :class="['column sortable', pagination.descending ? 'desc' : 'asc', header.value === pagination.sortBy ? 'active' : '']"
                @click="changeSort(header.value)"
                >
                <v-icon small>arrow_upward</v-icon>
                {{ header.text }}
                </th>
            </tr>
            </template>
            <template slot="items" slot-scope="props">
            <tr :active="props.selected" @click="props.selected = !props.selected">
                <td>
                <v-checkbox
                    :input-value="props.selected"
                    primary
                    color="deep-purple"
                    hide-details
                ></v-checkbox>
                </td>
                <td>{{ props.item.name }}</td>
                <td class="text-xs-right">{{ props.item.email }}</td>
                <td class="text-xs-right">{{ props.item.mobile_number }}</td>
                <td class="text-xs-right">{{ props.item.user_status }}</td>
                <td class="text-xs-right">{{ props.item.user_type }}</td>
                <td class="text-xs-right">{{ props.item.lead_source }}</td>
            </tr>
            </template>
        </v-data-table>
    </v-layout>
</template>

<script>
export default {
  name: "users",
  data: () => ({
    pagination: {
      sortBy: "name"
    },
    selected: [],
    headers: [
      {
        text: "Name",
        align: "left",
        value: "name"
      },
      { text: "Email", value: "email" },
      { text: "Mobile Number", value: "mobile_number" },
      { text: "Status", value: "user_status" },
      { text: "Type", value: "user_type" },
      { text: "Lead Source", value: "lead_source" }
    ],
    users: [
      {
        value: false,
        name: "Nadun Perera",
        email: "nadun.perera@me.com",
        mobile_number: "0405631465",
        user_status: "Idle",
        user_type: "client",
        lead_source: "Exisiting Client"
      },
      {
        value: false,
        name: "Prerana Magar",
        email: "prerana.magar@me.com",
        mobile_number: "0428222719",
        user_status: "New Client",
        user_type: "client",
        lead_source: "Friend"
      },
      {
        value: false,
        name: "Glenn Piper",
        email: "glenn@meridianaustralia.com.au",
        mobile_number: "0487665987",
        user_status: "Staff",
        user_type: "Administrator",
        lead_source: "None"
      },
      {
        value: false,
        name: "Adam Duffy",
        email: "adam@meridianaustralia.com.au",
        mobile_number: "0423654668",
        user_status: "Staff",
        user_type: "Sales Agent",
        lead_source: "None"
      },
      {
        value: false,
        name: "Brett Antymniuk",
        email: "brett@meridianaustralia.com.au",
        mobile_number: "0413760023",
        user_status: "Staff",
        user_type: "Sales Agent",
        lead_source: "None"
      },
      {
        value: false,
        name: "Benjamin Tavai",
        email: "bentavai@gmail.com",
        mobile_number: "0433552764",
        user_status: "Service Not Suitable",
        user_type: "Client",
        lead_source: "Facebook"
      },
      {
        value: false,
        name: "Yza Canja",
        email: "yza@propertyrocket.com.au",
        mobile_number: "0407833539",
        user_status: "In Progress",
        user_type: "Client",
        lead_source: "Facebook"
      },
      {
        value: false,
        name: "Alex Rivas",
        email: "alex@meridianaustralia.com.au",
        mobile_number: "0457428833",
        user_status: "Staff",
        user_type: "Administrator",
        lead_source: "None"
      },
      {
        value: false,
        name: "Matt Pinter",
        email: "matt.pinter@me.com",
        mobile_number: "0403290021",
        user_status: "Delayed Progress",
        user_type: "Client",
        lead_source: "Email Marketing"
      },
      {
        value: false,
        name: "Terry Smith",
        email: "terry.c@evoke.limo",
        mobile_number: "0403892292",
        user_status: "In Progress",
        user_type: "Client",
        lead_source: "Event"
      }
    ]
  }),

  methods: {
    toggleAll() {
      if (this.selected.length) this.selected = [];
      else this.selected = this.users.slice();
    },
    changeSort(column) {
      if (this.pagination.sortBy === column) {
        this.pagination.descending = !this.pagination.descending;
      } else {
        this.pagination.sortBy = column;
        this.pagination.descending = false;
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
