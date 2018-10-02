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
          <v-dialog v-model="dialogNew" persistent scrollable max-width="500px"> <!-- create new user dialog -->
            <v-btn fab dark small color="primary" slot="activator">
              <v-icon>add</v-icon>
            </v-btn>
            <v-card>
              <v-card-title>
                <span class="headline">Create New User</span>
              </v-card-title>
              <v-divider></v-divider>
              <v-card-text>
                <v-container grid-list-md>
                  <v-layout wrap>
                    <v-flex xs12 sm6>
                      <v-select
                        label="User Type"
                        v-model="userType"
                        :items="userTypeChoices"
                        :error-messages="userTypeErrors"
                        @input="$v.userType.$touch()"
                        @blur="$v.userType.$touch()"
                      ></v-select>
                    </v-flex>
                    <v-flex xs12 sm6>
                      <v-select
                        label="User Status"
                        v-model="userStatus"
                        :items="userStatusChoices"
                        :error-messages="userStatusErrors"
                        @input="$v.userStatus.$touch()"
                        @blur="$v.userStatus.$touch()"
                      ></v-select>
                    </v-flex>
                    <v-flex>
                      <v-text-field
                        label="First Name"
                        maxlength="20"
                        v-model.trim="firstName"
                        :error-messages="firstNameErrors"
                        @input="$v.firstName.$touch()"
                        @blur="$v.firstName.$touch()"
                      ></v-text-field>
                    </v-flex>
                    <v-flex>
                      <v-text-field
                        label="Last Name"
                        v-model.trim="lastName"
                        maxlength="20"
                        :error-messages="lastNameErrors"
                        @input="$v.lastName.$touch()"
                        @blur="$v.lastName.$touch()"
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12>
                      <v-text-field
                        label="Purchasing Entity"
                        hint="Full legal purchasing entity name"
                        v-model.trim="purchasingEntity"
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12>
                      <v-text-field
                        label="Email"
                        v-model="email"
                        :error-messages="emailErrors"
                        @input="$v.email.$touch()"
                        @blur="$v.email.$touch()"
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12>
                      <v-text-field
                        label="Address"
                        maxlength="50"
                        v-model.trim="address"
                        :error-messages="addressErrors"
                        @input="$v.address.$touch()"
                        @blur="$v.address.$touch()"
                      ></v-text-field>
                    </v-flex>
                    <v-flex>
                      <v-text-field
                        label="Suburb"
                        maxlength="20"
                        v-model.trim="suburb"
                        :error-messages="suburbErrors"
                        @input="$v.suburb.$touch()"
                        @blur="$v.suburb.$touch()"
                      ></v-text-field>
                    </v-flex>
                    <v-flex>
                      <v-text-field
                        label="Post Code"
                        maxlength="4"
                        v-model.trim="postCode"
                        :error-messages="postCodeErrors"
                        @input="$v.postCode.$touch()"
                        @blur="$v.postCode.$touch()"
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm4>
                      <v-text-field
                        label="Mobile Number"
                        maxlength="10"
                        hint="Format: 0405631465"
                        v-model.trim="mobileNumber"
                        :error-messages="mobileNumberErrors"
                        @input="$v.mobileNumber.$touch()"
                        @blur="$v.mobileNumber.$touch()"
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm4>
                      <v-text-field
                        label="Fax Number"
                        maxlength="10"
                        hint="Format: 0405631465"
                        v-model.trim="faxNumber"
                        :error-messages="faxNumberErrors"
                        @input="$v.faxNumber.$touch()"
                        @blur="$v.faxNumber.$touch()"
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm4>
                      <v-text-field
                        label="Office Number"
                        maxlength="10"
                        hint="Format: 0405631465"
                        v-model.trim="officeNumber"
                        :error-messages="officeNumberErrors"
                        @input="$v.officeNumber.$touch()"
                        @blur="$v.officeNumber.$touch()"
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6>
                      <v-select
                        label="Age"
                        v-model="age"
                        :items="ageChoices"
                      ></v-select>
                    </v-flex>
                    <v-flex xs12 sm6>
                      <v-select
                        label="Lead Source"
                        v-model="leadSource"
                        :items="leadSourceChoices"
                      ></v-select>
                    </v-flex>
                    <v-flex xs12 sm6>
                      <v-text-field
                        label="Personal Income"
                        maxlength="7"
                        v-model.trim="personalIncome"
                        :error-messages="personalIncomeErrors"
                        @input="$v.personalIncome.$touch()"
                        @blur="$v.personalIncome.$touch()"
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6>
                      <v-text-field
                        label="Partners Income"
                        maxlength="7"
                        v-model.trim="partnersIncome"
                        :error-messages="partnersIncomeErrors"
                        @input="$v.partnersIncome.$touch()"
                        @blur="$v.partnersIncome.$touch()"
                      ></v-text-field>
                    </v-flex>
                    <v-flex>
                      <v-checkbox label="Own Home?" v-model="ownHome" color="primary"></v-checkbox>
                    </v-flex>
                    <v-flex xs12 sm6>
                      <v-select
                        label="Owned Properties"
                        v-model="ownedProperties"
                        :items="ownedPropertiesChoices"
                      ></v-select>
                    </v-flex>
                    <v-flex>
                      <v-checkbox label="GST Registered?" v-model="gstRegistered" color="primary"></v-checkbox>
                    </v-flex>
                    <v-flex xs12 sm6>
                      <v-text-field
                        label="ABN"
                        maxlength="11"
                        v-model.trim="abn"
                        :error-messages="abnErrors"
                        @input="$v.abn.$touch()"
                        @blur="$v.abn.$touch()"
                      ></v-text-field>
                    </v-flex>
                    <v-flex>
                      <v-checkbox label="Australian Resident?" v-model="australianResident" color="primary"></v-checkbox>
                    </v-flex>
                    <v-flex>
                      <v-checkbox label="Firb Required?" v-model="firbRequired" color="primary"></v-checkbox>
                    </v-flex>
                    <v-flex>
                      <v-checkbox label="Investment Needed?" v-model="investmentNeeded" color="primary"></v-checkbox>
                    </v-flex>
                    <v-flex xs12>
                      <v-autocomplete
                        :loading="isLoadingReferrer"
                        :items="loadedReferrers"
                        :search-input.sync="autoCompleteReferrer"
                        v-model="referrerSelect"
                        hide-details
                        hide-selected
                        label="Referrer?"
                        item-text="name"
                        item-value="symbol"
                      >
                        <template slot="no-data">
                          <v-list-tile>
                            <v-list-tile-title>
                              Start typing to search for a <strong>Referrer</strong>
                            </v-list-tile-title>
                          </v-list-tile>
                        </template>
                        <template slot="selection" slot-scope="{ item, selected }">
                          <span>{{ item.symbol }} | {{ item.name }}</span>
                        </template>
                        <template slot="item" slot-scope="{ item, tile }">
                          <v-list-tile-content>
                          <v-list-tile-title v-text="item.name"></v-list-tile-title>
                          <v-list-tile-sub-title v-text="item.symbol"></v-list-tile-sub-title>
                          </v-list-tile-content>
                        </template>
                      </v-autocomplete>
                    </v-flex>
                    <v-flex xs12>
                      <v-autocomplete
                        :loading="isLoadingBusinessPartner"
                        :items="loadedBusinessPartners"
                        :search-input.sync="autoCompleteBusinessPartner"
                        v-model="businessPartnerSelect"
                        hide-details
                        hide-selected
                        label="Business Partner?"
                        item-text="name"
                        item-value="symbol"
                      >
                        <template slot="no-data">
                          <v-list-tile>
                            <v-list-tile-title>
                              Start typing to search for a <strong>Business Partner</strong>
                            </v-list-tile-title>
                          </v-list-tile>
                        </template>
                        <template slot="selection" slot-scope="{ item, selected }">
                          <span>{{ item.symbol }} | {{ item.name }}</span>
                        </template>
                        <template slot="item" slot-scope="{ item, tile }">
                          <v-list-tile-content>
                          <v-list-tile-title v-text="item.name"></v-list-tile-title>
                          <v-list-tile-sub-title v-text="item.symbol"></v-list-tile-sub-title>
                          </v-list-tile-content>
                        </template>
                      </v-autocomplete>
                    </v-flex>
                    <v-flex xs6>
                      <v-autocomplete
                        :loading="isLoadingUser"
                        :items="loadedUsers"
                        :search-input.sync="autoCompleteUser"
                        v-model="partnerSelect"
                        hide-details
                        hide-selected
                        label="Partner?"
                        item-text="name"
                        item-value="symbol"
                      >
                        <template slot="no-data">
                          <v-list-tile>
                            <v-list-tile-title>
                              Start typing to search for a <strong>Partner</strong>
                            </v-list-tile-title>
                          </v-list-tile>
                        </template>
                        <template slot="selection" slot-scope="{ item, selected }">
                          <span>{{ item.symbol }} | {{ item.name }}</span>
                        </template>
                        <template slot="item" slot-scope="{ item, tile }">
                          <v-list-tile-content>
                          <v-list-tile-title v-text="item.name"></v-list-tile-title>
                          <v-list-tile-sub-title v-text="item.symbol"></v-list-tile-sub-title>
                          </v-list-tile-content>
                        </template>
                      </v-autocomplete>
                    </v-flex>
                    <v-flex>
                      <v-dialog v-model="dialogAddPartner" persistent max-width="300px">
                        <v-btn flat slot="activator" color="primary">Add a Partner</v-btn>
                        <v-card>
                          <v-card-title>
                            <span class="headline">Add a Partner</span>
                          </v-card-title>
                          <v-divider></v-divider>
                          <v-card-text>
                            <v-container grid-list-md>
                              <v-layout wrap>
                                <v-flex xs12>
                                  <v-text-field
                                    label="Partner's First Name"
                                    maxlength="20"
                                    v-model.trim="partnersFirstName"
                                    :error-messages="partnersFirstNameErrors"
                                    @input="$v.partnersFirstName.$touch()"
                                    @blur="$v.partnersFirstName.$touch()"
                                  ></v-text-field>
                                </v-flex>
                                <v-flex xs12>
                                  <v-text-field
                                    label="Partner's Last Name"
                                    maxlength="20"
                                    v-model.trim="partnersLastName"
                                    :error-messages="partnersLastNameErrors"
                                    @input="$v.partnersLastName.$touch()"
                                    @blur="$v.partnersLastName.$touch()"
                                  ></v-text-field>
                                </v-flex>
                                <v-flex xs12>
                                  <v-text-field
                                    label="Partner's Email"
                                    v-model="partnersEmail"
                                    :error-messages="partnersEmailErrors"
                                    @input="$v.partnersEmail.$touch()"
                                    @blur="$v.partnersEmail.$touch()"
                                  ></v-text-field>
                                </v-flex>
                                <v-flex xs12>
                                  <v-text-field
                                    label="Partner's Mobile Number"
                                    maxlength="10"
                                    hint="Format: 0405631465"
                                    v-model.trim="partnersMobileNumber"
                                    :error-messages="partnersMobileNumberErrors"
                                    @input="$v.partnersMobileNumber.$touch()"
                                    @blur="$v.partnersMobileNumber.$touch()"
                                  ></v-text-field>
                                </v-flex>
                              </v-layout>
                            </v-container>
                          </v-card-text>
                          <v-divider></v-divider>
                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="error" flat v-on:click="dialogAddPartner = false">Close</v-btn>
                            <v-btn color="primary" flat v-on:click="dialogAddPartner = false">Save</v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-dialog>
                    </v-flex>
                    <v-flex xs12>
                      <v-textarea
                        label="Comment"
                        v-model="comment"
                      ></v-textarea>
                    </v-flex>
                    <v-flex>
                      <v-checkbox label="No Marketing Emails" v-model="noMarketingEmails" color="primary"></v-checkbox>
                    </v-flex>
                    <v-flex>
                      <v-checkbox label="Do Not Contact" v-model="doNotContact" color="primary"></v-checkbox>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-card-text>
              <v-divider></v-divider>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="error" flat v-on:click="dialogNew = false">Close</v-btn>
                <v-btn color="primary" flat v-on:click="saveNewUser">Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
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
import { validationMixin } from 'vuelidate'
import { required, email, numeric, minLength } from 'vuelidate/lib/validators'

export default {
  name: "ViewUsers",

  mixins: [validationMixin],

  validations: {
    userType: { required },
    firstName: { required },
    lastName: { required },
    email: { required, email },
    address: { required },
    suburb: { required },
    postCode: { required, numeric },
    mobileNumber: { required, numeric, minLength: minLength(10) },
    faxNumber: { numeric, minLength: minLength(10) },
    officeNumber: { numeric, minLength: minLength(10) },
    userStatus: { required },
    personalIncome: { numeric },
    partnersIncome: { numeric },
    abn: { numeric, minLength: minLength(11) },
    partnersFirstName: { required },
    partnersLastName: { required },
    partnersEmail: { required, email },
    partnersMobileNumber: { required, numeric, minLength: minLength(10) },
  },

  data() {
    return {
      //speed dial options
      direction: 'top',
      fab: false,
      right: true,
      bottom: true,
      transition: 'slide-y-reverse-transition',

      //new user realted input fields
      userType: null,
      userTypeChoices: [
        'Administrator',
        'Sales Agent',
        'Business Partner',
        'Introducer',
        'BDM',
        'Accountant',
        'Acquisitions',
        'Client',
      ],
      firstName: '',
      lastName: '',
      purchasingEntity: '',
      email: '',
      address: '',
      suburb: '',
      postCode: '',
      mobileNumber: '',
      faxNumber: '',
      officeNumber: '',
      age: null,
      ageChoices: [
        '15-25',
        '26-35',
        '36-50',
        '51+',
      ],
      leadSource: null,
      leadSourceChoices: [
        'Facebook',
        'Friend',
        'Google Search',
        'Media Article',
        'Exisiting Client',
        'Book Promotion',
        'Website',
        'Another Business',
      ],
      userStatus: null,
      userStatusChoices: [
        'Staff',
        'New Client',
        'In Progress',
        'Delayed Progress',
        'Service Not Suitable',
        'Idle',
      ],
      doNotContact: false,
      personalIncome: '',
      partnersIncome: '',
      ownedProperties: null,
      ownedPropertiesChoices: [
        '1',
        '2',
        '3',
        '4',
        '5',
      ],
      ownHome: false,
      gstRegistered: false,
      abn: '',
      australianResident: false,
      firbRequired: false,
      investmentNeeded: false,
      referrerSelect: null,
      businessPartnerSelect: null,
      partnerSelect: null,
      noMarketingEmails: false,
      addPartner: false,
      partnersFirstName: '',
      partnersLastName: '',
      partnersEmail: '',
      partnersMobileNumber: '',
      partnersAge: '',
      comment: '',

      //autocomplete referrers
      loadedReferrers: [],
      autoCompleteReferrer: null,
      isLoadingReferrer: false,

      //autocomplete business partners
      loadedBusinessPartners: [],
      autoCompleteBusinessPartner: null,
      isLoadingBusinessPartner: false,

      //autocomplete users/partners
      loadedUsers: [],
      autoCompleteUser: null,
      isLoadingUser: false,

      //axios api
      info: null,

      //dialog activators
      dialogNew: false,
      dialogFilter: false,
      dialogAddPartner: false,

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
    userTypeErrors () {
      const errors = []
      if (!this.$v.userType.$dirty) return errors
      !this.$v.userType.required && errors.push('User Type is required')
      return errors
    },
    firstNameErrors () {
      const errors = []
      if (!this.$v.firstName.$dirty) return errors
      !this.$v.firstName.required && errors.push('First Name is required')
      return errors
    },
    partnersFirstNameErrors () {
      const errors = []
      if (!this.$v.partnersFirstName.$dirty) return errors
      !this.$v.partnersFirstName.required && errors.push("Partner's First Name is required")
      return errors
    },
    lastNameErrors () {
      const errors = []
      if (!this.$v.lastName.$dirty) return errors
      !this.$v.lastName.required && errors.push('Last Name is required')
      return errors
    },
    partnersLastNameErrors () {
      const errors = []
      if (!this.$v.partnersLastName.$dirty) return errors
      !this.$v.partnersLastName.required && errors.push("Partner's Last Name is required")
      return errors
    },
    emailErrors () {
      const errors = []
      if (!this.$v.email.$dirty) return errors
      !this.$v.email.email && errors.push('Must be valid e-mail')
      !this.$v.email.required && errors.push('E-mail is required')
      return errors
    },
    partnersEmailErrors () {
      const errors = []
      if (!this.$v.partnersEmail.$dirty) return errors
      !this.$v.partnersEmail.email && errors.push('Must be valid e-mail')
      !this.$v.partnersEmail.required && errors.push("Partner's E-mail is required")
      return errors
    },
    addressErrors () {
      const errors = []
      if (!this.$v.address.$dirty) return errors
      !this.$v.address.required && errors.push('Address is required')
      return errors
    },
    suburbErrors () {
      const errors = []
      if (!this.$v.suburb.$dirty) return errors
      !this.$v.suburb.required && errors.push('Suburb is required')
      return errors
    },
    postCodeErrors () {
      const errors = []
      if (!this.$v.postCode.$dirty) return errors
      !this.$v.postCode.required && errors.push('Post Code is required')
      !this.$v.postCode.numeric && errors.push('Post Code is numerics only')
      return errors
    },
    mobileNumberErrors () {
      const errors = []
      if (!this.$v.mobileNumber.$dirty) return errors
      !this.$v.mobileNumber.required && errors.push('Mobile Number is required')
      !this.$v.mobileNumber.minLength && errors.push('Mobile Number must be 10 characters long')
      !this.$v.mobileNumber.numeric && errors.push('Mobile Number is numerics only')
      return errors
    },
    partnersMobileNumberErrors () {
      const errors = []
      if (!this.$v.partnersMobileNumber.$dirty) return errors
      !this.$v.partnersMobileNumber.required && errors.push("Partner's Mobile Number is required")
      !this.$v.partnersMobileNumber.minLength && errors.push('Mobile Number must be 10 characters long')
      !this.$v.partnersMobileNumber.numeric && errors.push('Mobile Number is numerics only')
      return errors
    },
    faxNumberErrors () {
      const errors = []
      if (!this.$v.faxNumber.$dirty) return errors
      !this.$v.faxNumber.minLength && errors.push('Fax Number must be 10 characters long')
      !this.$v.faxNumber.numeric && errors.push('Fax Number is numerics only')
      return errors
    },
    officeNumberErrors () {
      const errors = []
      if (!this.$v.officeNumber.$dirty) return errors
      !this.$v.officeNumber.minLength && errors.push('Office Number must be 10 characters long')
      !this.$v.officeNumber.numeric && errors.push('Office number is numerics only')
      return errors
    },
    userStatusErrors () {
      const errors = []
      if (!this.$v.userStatus.$dirty) return errors
      !this.$v.userStatus.required && errors.push('User Status is required')
      return errors
    },
    personalIncomeErrors () {
      const errors = []
      if (!this.$v.personalIncome.$dirty) return errors
      !this.$v.personalIncome.numeric && errors.push('Personal Income is numerics only')
      return errors
    },
    partnersIncomeErrors () {
      const errors = []
      if (!this.$v.partnersIncome.$dirty) return errors
      !this.$v.partnersIncome.numeric && errors.push('Partners Income is numerics only')
      return errors
    },
    abnErrors () {
      const errors = []
      if (!this.$v.abn.$dirty) return errors
      !this.$v.abn.minLength && errors.push('ABN must be 11 characters long')
      !this.$v.abn.numeric && errors.push('ABN is numerics only')
      return errors
    },
  },

  watch: {
    autoCompleteReferrer (val) {
      // Items have already been loaded
      if (this.loadedReferrers.length > 0) return

      this.isLoadingReferrer = true

      // Lazily load input users
      axios
        .get('https://api.coinmarketcap.com/v2/listings/')
        .then(res => {
          this.loadedReferrers = res.data.data
        })
        .catch(err => {
          console.log(err)
        })
        .finally(() => (this.isLoadingReferrer = false))
    },
    autoCompleteBusinessPartner (val) {
      // Items have already been loaded
      if (this.loadedBusinessPartners.length > 0) return

      this.isLoadingBusinessPartner = true

      // Lazily load input users
      axios
        .get('https://api.coinmarketcap.com/v2/listings/')
        .then(res => {
          this.loadedBusinessPartners = res.data.data
        })
        .catch(err => {
          console.log(err)
        })
        .finally(() => (this.isLoadingBusinessPartner = false))
    },
    autoCompleteUser (val) {
      // Items have already been loaded
      if (this.loadedUsers.length > 0) return

      this.isLoadingUser = true

      // Lazily load input users
      axios
        .get('https://api.coinmarketcap.com/v2/listings/')
        .then(res => {
          this.loadedUsers = res.data.data
        })
        .catch(err => {
          console.log(err)
        })
        .finally(() => (this.isLoadingUser = false))
    }
  }

  mounted () {
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
    saveNewUser () {
      this.$v.$touch()
    },
    savePartner () {
      this.$v.$touch()
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
