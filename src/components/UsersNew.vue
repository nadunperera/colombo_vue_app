<template>
  <v-layout row fill-height>
    <v-flex>
      <v-flex> <!-- v-flex for first toolbar -->
        <v-toolbar flat color="white">
          <v-toolbar-title>Create a New User</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
      </v-flex>
      <v-flex> <!-- v-flex for second toolbar -->
        <v-toolbar flat color="grey lighten-3">
          <v-toolbar-title class="ml-0 caption">Fill out below details to add a new user to Colombo.</v-toolbar-title>
        </v-toolbar>
      </v-flex>
      <v-flex> <!-- stepper -->
        <v-stepper v-model="e1">
          <v-stepper-header>
            <v-stepper-step :complete="e1 > 1" step="1">Personal Details</v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step :complete="e1 > 2" step="2">Financial Details</v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step :complete="e1 > 3" step="3">Lead Details</v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step step="4">Interaction Details</v-stepper-step>
          </v-stepper-header>

          <v-stepper-items>
            <v-stepper-content step="1">
              <v-card class="mb-5" color="grey lighten-5">
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
                      <v-flex xs12 sm4>
                        <v-text-field
                          label="First Name"
                          maxlength="20"
                          v-model.trim="firstName"
                          :error-messages="firstNameErrors"
                          @input="$v.firstName.$touch()"
                          @blur="$v.firstName.$touch()"
                        ></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm4>
                        <v-text-field
                          label="Last Name"
                          v-model.trim="lastName"
                          maxlength="20"
                          :error-messages="lastNameErrors"
                          @input="$v.lastName.$touch()"
                          @blur="$v.lastName.$touch()"
                        ></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm4>
                        <v-select
                          label="Age"
                          v-model="age"
                          :items="ageChoices"
                        ></v-select>
                      </v-flex>
                      <v-flex xs12 sm4>
                        <v-text-field
                          label="Email"
                          v-model="email"
                          maxlength="50"
                          :error-messages="emailErrors"
                          @input="$v.email.$touch()"
                          @blur="$v.email.$touch()"
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
                          label="Purchasing Entity"
                          hint="Full legal purchasing entity name"
                          v-model.trim="purchasingEntity"
                        ></v-text-field>
                      </v-flex>
                      <v-flex xs3>
                        <v-combobox
                          :loading="isLoadingUser"
                          v-model="partnersEmail"
                          :items="loadedUsers"
                          :search-input.sync="autoCompleteUser"
                          item-text="name"
                          item-value="symbol"
                          label="Partner's Email"
                          :error-messages="partnersEmailErrors"
                          @input="$v.partnersEmail.$touch()"
                          @blur="$v.partnersEmail.$touch()"
                        ></v-combobox>
                      </v-flex>
                      <v-flex xs12 sm3>
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
                      <v-flex xs12 sm3>
                        <v-text-field
                          label="Partner's First Name"
                          maxlength="20"
                          v-model.trim="partnersFirstName"
                        ></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm3>
                        <v-text-field
                          label="Partner's Last Name"
                          maxlength="20"
                          v-model.trim="partnersLastName"
                        ></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm6>
                        <v-text-field
                          label="Address"
                          maxlength="50"
                          v-model.trim="address"
                          :error-messages="addressErrors"
                          @input="$v.address.$touch()"
                          @blur="$v.address.$touch()"
                        ></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm3>
                        <v-text-field
                          label="Suburb"
                          maxlength="20"
                          v-model.trim="suburb"
                          :error-messages="suburbErrors"
                          @input="$v.suburb.$touch()"
                          @blur="$v.suburb.$touch()"
                        ></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm3>
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
                          label="Fax Number"
                          maxlength="10"
                          hint="Format: 0292266229"
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
                          hint="Format: 0292266229"
                          v-model.trim="officeNumber"
                          :error-messages="officeNumberErrors"
                          @input="$v.officeNumber.$touch()"
                          @blur="$v.officeNumber.$touch()"
                        ></v-text-field>
                      </v-flex>
                      <v-flex>
                        <v-checkbox label="Australian Resident?" v-model="australianResident" color="primary"></v-checkbox>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-card-text>
              </v-card>
              <v-btn color="primary" @click="nextStep">Continue</v-btn>
              <v-btn flat @click="dialogClose = true">Cancel</v-btn>
            </v-stepper-content>

            <v-stepper-content step="2">
              <v-card class="mb-5" color="grey lighten-5">
                <v-card-text>
                  <v-container grid-list-md>
                    <v-layout wrap>
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
                        <v-checkbox label="Firb Required?" v-model="firbRequired" color="primary"></v-checkbox>
                      </v-flex>
                      <v-flex>
                        <v-checkbox label="Investment Needed?" v-model="investmentNeeded" color="primary"></v-checkbox>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-card-text>
              </v-card>
              <v-btn color="primary" @click="e1 = 3">Continue</v-btn>
              <v-btn flat color="primary" @click="e1 = 1">Go Back</v-btn>
              <v-btn flat @click="dialogClose = true">Cancel</v-btn>
            </v-stepper-content>

            <v-stepper-content step="3">
              <v-card class="mb-5" color="grey lighten-1" height="200px"></v-card>
              <v-btn color="primary" @click="e1 = 4">Continue</v-btn>
              <v-btn flat color="primary" @click="e1 = 2">Go Back</v-btn>
              <v-btn flat @click="dialogClose = true">Cancel</v-btn>
            </v-stepper-content>

            <v-stepper-content step="4">
              <v-card class="mb-5" color="grey lighten-1" height="200px"></v-card>
              <v-btn color="primary" @click="e1 = 1">Continue</v-btn>
              <v-btn flat color="primary" @click="e1 = 3">Go Back</v-btn>
              <v-btn flat @click="dialogClose = true">Cancel</v-btn>
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
      </v-flex>
      <v-dialog v-model="dialogClose" max-width="290"> <!-- dialog model -->
        <v-card>
          <v-card-title class="headline">Are you sure?</v-card-title>
          <v-card-text>
            All your current progress will be lost. Are you sure, would you like to close this session?
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="success" flat="flat" @click="dialogClose = false">No</v-btn>
            <v-btn color="success" flat="flat" @click="dialogClose = false">Yes</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-flex>
  </v-layout>
</template>

<script>
import axios from 'axios'
import { validationMixin } from 'vuelidate'
import { required, email, numeric, minLength } from 'vuelidate/lib/validators'

export default {
  name: "UsersNew",

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
    partnersEmail: { email },
    partnersMobileNumber: { numeric, minLength: minLength(10) },
  },

  data () {
    return {
      //stepper
      e1: 0,

      //dialog activators
      dialogClose: false,

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
      userStatus: null,
      userStatusChoices: [
        'Staff',
        'New Client',
        'In Progress',
        'Delayed Progress',
        'Service Not Suitable',
        'Idle',
      ],
      firstName: '',
      lastName: '',
      partnersFirstName: '',
      partnersLastName: '',
      partnersEmail: '',
      partnersMobileNumber: '',
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

      //autocomplete combobox users/partners
      loadedUsers: [],
      autoCompleteUser: null,
      isLoadingUser: false,
    }
  },

  computed: {
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
    lastNameErrors () {
      const errors = []
      if (!this.$v.lastName.$dirty) return errors
      !this.$v.lastName.required && errors.push('Last Name is required')
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
  },

  methods: {
    // this is to validate forms when pressing the continue button
    nextStep () {
        this.$v.$touch()
        if (this.$v.$invalid) {
          console.log("Fix the errors on the form!")
        } else {
          this.e1 = 2
        }
    }
  }
}
</script>
