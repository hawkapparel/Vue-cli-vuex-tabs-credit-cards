<template>
  <div class="tabs relative">
    <div class="nav-content">
      <ul class="nav-tabs relative">
        <li
          class="nav-item"
          :class="tabSelected === 'my-applications' ? 'active' : ''"
        >
          <button
            class="btn-link flex"
            @click.prevent="changeTab('my-applications')"
          >
            <img
              class="btn-link-icon"
              src="../../assets/images/my-applications-ico.svg"
              alt="My applications"
            />
            My applications
          </button>
        </li>
        <li
          class="nav-item"
          :class="tabSelected === 'my-travelers' ? 'active' : ''"
        >
          <button
            class="btn-link flex"
            @click.prevent="changeTab('my-travelers')"
          >
            <img
              class="btn-link-icon"
              src="../../assets/images/my-travelers-ico.svg"
              alt="My travelers"
            />
            My travelers
          </button>
        </li>
        <li
          class="nav-item"
          :class="tabSelected === 'my-cards' ? 'active' : ''"
        >
          <button class="btn-link flex" @click.prevent="changeTab('my-cards')">
            <img
              class="btn-link-icon"
              src="../../assets/images/my-cards-ico.svg"
              alt="My cards"
            />
            My cards
          </button>
        </li>
        <li
          class="nav-item"
          :class="tabSelected === 'my-account' ? 'active' : ''"
        >
          <button
            class="btn-link flex"
            @click.prevent="changeTab('my-account')"
          >
            <img
              class="btn-link-icon"
              src="../../assets/images/my-account-ico.svg"
              alt="My account"
            />
            My account
          </button>
        </li>
      </ul>
    </div>
    <div class="tab-content">
      <div class="container">
        <div class="row">
          <transition name="fade">
            <div class="tab-pane" v-if="tabSelected === 'my-applications'">
              <div class="card my-cards">
                <div class="card-header">
                  <h3 class="weight-400">My Applications</h3>
                </div>
              </div>
            </div>
            <div class="tab-pane" v-if="tabSelected === 'my-travelers'">
              <div class="card my-cards">
                <div class="card-header">
                  <h3 class="weight-400">My Travelers</h3>
                </div>
              </div>
            </div>
            <div class="tab-pane" v-if="tabSelected === 'my-cards'">
              <div class="card my-cards">
                <div class="card-header">
                  <h3 class="weight-400">My Cards</h3>
                </div>
                <div class="card-body">
                  <credit-card
                    v-for="(card, indexCard) in listOfCards"
                    :key="indexCard"
                    :card="card"
                  />
                </div>
              </div>
              <div class="card add-new-card">
                <div class="card-header" @click.prevent="openAddCard">
                  <h3 class="weight-400">+ Add New Card</h3>
                </div>
                <div class="card-body" v-show="isOpen">
                  <div class="accept-credit-cards">
                    <img
                      class="accept-icon"
                      src="../../assets/images/ok-green-ico.svg"
                      alt="Accept icon"
                    />
                    <div class="text-card">
                      <p>We Accept All Major</p>
                      <p>Debit / Credit Cards</p>
                    </div>
                    <img
                      class="payment-methods"
                      src="../../assets/images/payment-methods.jpg"
                      alt="Payment Methods"
                    />
                  </div>
                  <div class="form-container">
                    <div class="field name-on-card">
                      <label>Name on Card</label>
                      <input
                        class="inputText"
                        :class="{ 'input-error': $v.nameOnCard.$error }"
                        type="text"
                        v-model.trim="$v.nameOnCard.$model"
                      />
                      <label v-if="$v.nameOnCard.$error" class="messageError"
                        >This field is required</label
                      >
                    </div>
                    <div class="field card-number">
                      <label>Credit / Debit Card Number</label>
                      <input
                        class="inputText"
                        :class="{ 'input-error': $v.cardNumber.$error }"
                        type="text"
                        :maxlength="card_number_length"
                        v-mask="mask"
                        v-model.trim="$v.cardNumber.$model"
                        @keyup="parseNumber()"
                      />
                      <label v-if="$v.cardNumber.$error" class="messageError"
                        >Invalid Card Number</label
                      >
                    </div>
                    <div class="field w-160">
                      <label>Exp. Month</label>
                      <select
                        id="cbxExpMonth"
                        class="cbxOptions"
                        :class="expMonthVal ? 'select-error' : ''"
                        v-model="expMonth"
                        @change="onChange('month', expMonth)"
                      >
                        <option value="monthdef"></option>
                        <option
                          v-for="(option, indexFilter) in monthOptions"
                          :key="indexFilter"
                          :value="option"
                        >
                          {{ option }}
                        </option>
                      </select>
                    </div>
                    <div class="field w-160">
                      <label>Exp. Year</label>
                      <select
                        id="cbxExpYear"
                        class="cbxOptions"
                        :class="expYearVal ? 'select-error' : ''"
                        v-model="expYear"
                        @change="onChange('year', expYear)"
                      >
                        <option value="yeardef"></option>
                        <option
                          v-for="(option, indexFilter) in yearOptions"
                          :key="indexFilter"
                          :value="option"
                        >
                          {{ option }}
                        </option>
                      </select>
                    </div>
                    <div class="field cci">
                      <label>Security Code</label>
                      <input
                        class="inputText"
                        :class="{ 'input-error': $v.cvv.$error }"
                        type="text"
                        maxlength="4"
                        v-model.trim="$v.cvv.$model"
                        v-mask="cvv_mask"
                        @keyup="validateCVV()"
                      />
                      <label v-if="$v.cvv.$error" class="messageError"
                        >This field is required</label
                      >
                    </div>
                    <div class="container-action">
                      <img
                        class="sectigo-icon"
                        src="../../assets/images/sectigo-trust-logo.png"
                        alt="Sectigo Logo"
                      />
                      <button class="btn-add-card" @click.prevent="addCard">
                        Add Card
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="tab-pane" v-if="tabSelected === 'my-account'">
              <div class="card my-cards">
                <div class="card-header">
                  <h3 class="weight-400">My Account</h3>
                </div>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { required, maxLength } from "vuelidate/lib/validators";
import CreditCard from "@/components/blocks/CreditCard.vue";

export default {
  name: "tabs",
  components: {
    CreditCard
  },
  validations() {
    return {
      nameOnCard: {
        required
      },
      cardNumber: {
        required,
        maxLength: maxLength(19)
      },
      cvv: {
        required
      }
    };
  },
  data() {
    return {
      tabSelected: "",
      isOpen: false,
      nameOnCard: "",
      cardNumber: "",
      expMonth: "monthdef",
      expYear: "yeardef",
      cvv: "",
      expMonthVal: false,
      expYearVal: false,
      monthOptions: [
        "01",
        "02",
        "03",
        "04",
        "05",
        "06",
        "07",
        "08",
        "09",
        "10",
        "11",
        "12"
      ],
      yearOptions: [
        "2020",
        "2021",
        "2022",
        "2023",
        "2024",
        "2025",
        "2026",
        "2027",
        "2028",
        "2029",
        "2030"
      ],
      card_brand: "",
      card_number_length: 16,
      mask: "################",
      cvv_mask: "###",
      status_card: "",
      status_cvv: ""
    };
  },
  computed: {
    ...mapState({
      listCards: state => state.listCards
    }),
    listOfCards() {
      return this.listCards;
    }
  },
  beforeMount() {
    this.changeTab("my-cards");
  },
  methods: {
    parseNumber() {
      var self = this;
      var card_number = self.cardNumber.replace(/ /g, "");
      var card_length = 16;
      var mask_card_length = 19;
      var card_brand = "";
      if (card_number != "") {
        var mask = "################";
        var cvv_mask = "###";
        // Visa
        var re = new RegExp("^4");
        if (card_number.match(re) != null) {
          card_brand = "visa";
          mask = "#### #### #### ####";
          card_length = 16;
        }
        // Mastercard
        // Updated for Mastercard 2017 BINs expansion
        re = new RegExp("^5[1-5]|^2[2-7]");
        if (card_number.match(re) != null) {
          card_brand = "mastercard";
          mask = "#### #### #### ####";
        }
        // Maestro
        re = new RegExp("^5[0]|^5[6-8]|^6");
        if (card_number.match(re) != null) {
          card_brand = "maestro";
          mask = "#### #### #### ####";
        }

        // China Pay Union
        re = new RegExp("^62");
        if (card_number.match(re) != null) {
          card_brand = "unionpay";
          mask = "#### #### #### ####";
        }

        // AMEX
        re = new RegExp("^3[47]");
        if (card_number.match(re) != null) {
          card_brand = "amex";
          mask = "#### ###### #####";
          cvv_mask = "####";
          card_length = 15;
          mask_card_length = 17;
        }

        // Discover
        re = new RegExp(
          "^(6011|622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[0-1][0-9]|92[0-5]|64[4-9])|65)"
        );
        if (card_number.match(re) != null) {
          card_brand = "discover";
          mask = "#### #### #### ####";
        }
        // Diners
        re = new RegExp("^36");
        if (card_number.match(re) != null) {
          card_brand = "diners";
          if (card_number.length > 14) {
            card_length = 16;
            mask = "#### #### #### ####";
          } else {
            card_length = 14;
            mask = "#### ###### #### #";
          }
        }

        // Diners - Carte Blanche
        re = new RegExp("^30[0-5]");
        if (card_number.match(re) != null) {
          card_brand = "diners";
          mask = "#### #### #### ####";
        }
        // JCB
        re = new RegExp("^35(2[89]|[3-8][0-9])");
        if (card_number.match(re) != null) {
          card_brand = "jcb";
          mask = "#### #### #### ####";
        }
        // Visa Electron
        re = new RegExp("^(4026|417500|4508|4844|491(3|7))");
        if (card_number.match(re) != null) {
          card_brand = "visa";
          mask = "#### #### #### ####";
          card_length = 16;
        }

        //card_number
        self.card_number_length = mask_card_length;
        self.card_brand = card_brand;
        self.mask = mask;
        self.cvv_mask = cvv_mask;

        if (card_number.length >= card_length) {
          self.validateNumber();
        } else {
          self.status_card = "";
        }
      } else {
        self.card_brand = "";
        self.status_card = "";
      }
    },
    validateCVV() {
      var card_cvv = this.cvv;
      var cvv_status = "invalid";

      if (card_cvv.length >= 3) {
        if (this.card_brand == "amex") {
          if (card_cvv.length == 4) {
            cvv_status = "valid";
          }
        } else {
          cvv_status = "valid";
        }
      } else if (card_cvv.length < 1) {
        cvv_status = "";
      }

      this.status_cvv = cvv_status;
      if (cvv_status == "valid") return true;
      else false;
    },
    validateNumber() {
      var self = this;
      // Algoritmo de Luhn
      var tcard = self.cardNumber.replace(/ /g, "");
      if (self.luhnCheck(tcard)) {
        self.status_card = "valid";
        if (self.status_cvv != "valid") {
          self.cvv = "";
        }
      } else {
        self.status_card = "invalid";
      }
      if (self.status_card == "valid") {
        //self.$refs.ref_card_expiry.focus()
        return true;
      } else return false;
    },
    luhnCheck(num) {
      var digit, digits, odd, sum, _i, _len;
      odd = true;
      sum = 0;
      digits = (num + "").split("").reverse();
      for (_i = 0, _len = digits.length; _i < _len; _i++) {
        digit = digits[_i];
        digit = parseInt(digit, 10);
        if ((odd = !odd)) {
          digit *= 2;
        }
        if (digit > 9) {
          digit -= 9;
        }
        sum += digit;
      }
      return sum % 10 === 0;
    },
    onChange(type, currentFilter) {
      if (type === "month") {
        if (this.expMonth) {
          this.expMonthVal = false;
        } else {
          this.expMonthVal = true;
        }
      }

      if (type === "year") {
        if (this.expYear) {
          this.expYearVal = false;
        } else {
          this.expYearVal = true;
        }
      }
    },
    changeTab(tabSelect) {
      this.tabSelected = tabSelect;
    },
    openAddCard() {
      this.isOpen = !this.isOpen;
    },
    addCard() {
      this.$v.$touch();
      if (
        this.$v.$invalid ||
        this.expMonth === "monthdef" ||
        this.expYear === "yeardef" ||
        this.status_card === "" ||
        this.status_cvv === ""
      ) {
        if (this.expMonth === "monthdef") {
          this.expMonthVal = true;
        }

        if (this.expYear === "yeardef") {
          this.expYearVal = true;
        }
      } else {
        this.expMonthVal = false;
        this.expYearVal = false;

        let brandData = "";
        let imgData = "";

        if (this.card_brand === "visa") {
          brandData = "Visa";
          imgData = "visa-card-logo.svg";
        }

        if (this.card_brand === "mastercard") {
          brandData = "MasterCard";
          imgData = "master-card-logo.svg";
        }

        if (this.card_brand === "amex") {
          brandData = "American Express";
          imgData = "amex-card-logo.svg";
        }

        let lastDigitsData = this.cardNumber.substr(-4);
        let expDateData = this.expMonth + "/" + this.expYear;

        let cardData = {
          default: false,
          brand: brandData,
          img: imgData,
          lastDigits: lastDigitsData,
          expDate: expDateData
        };

        this.$store.commit("setAddCard", cardData);

        //Clear data
        this.nameOnCard = "";
        this.cardNumber = "";
        this.expMonth = "monthdef";
        this.expYear = "expYear";
        this.cvv = "";

        this.$v.$reset();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.tabs {
  font-size: 0;
  z-index: 4;
  .nav-content {
    border-bottom: 1px solid $border-gray;
    .nav-tabs {
      display: inline-flex;
      list-style: none;
      padding: 0;
      margin: 0;
      z-index: 5;
      top: 1px;
      .nav-item {
        display: inline-flex;
        position: relative;
        width: 64px;
        border: 1px solid $border-gray;
        margin: 0 4.5px;
        z-index: 6;
        &.active {
          border-top: 2px solid $green;
          border-bottom: 1px solid #fff;
          .btn-link {
            opacity: 1;
          }
        }
        @include cell360p() {
          width: 72px;
        }
        @include cell768p() {
          width: 142px;
          margin: 0 6.5px;
        }
        @include cell1200p() {
          width: 239px;
          margin: 0 12.5px;
        }
        .btn-link {
          width: 100%;
          height: 60px;
          font-weight: bold;
          background-color: transparent;
          align-items: center;
          justify-content: center;
          border: none;
          text-transform: uppercase;
          opacity: 0.3;
          font-size: 0;
          @include cell768p() {
            font-size: 12px;
          }
          @include cell1000p() {
            font-size: 14px;
          }
          @include cell1200p() {
            font-size: 16px;
          }
          .btn-link-icon {
            width: 22px;
            @include cell768p() {
              padding-right: 12px;
            }
          }
        }
      }
    }
  }
  .tab-content {
    padding-top: 50px;
    .tab-pane {
      width: 100%;
      .card {
        margin: 0 10px;
        border-radius: 4px;
        box-shadow: 0 0 1rem rgba(0, 0, 0, 0.1);
        @include cell768p() {
          margin: 0;
        }
        .card-header {
          display: flex;
          align-items: center;
          height: 74px;
          padding: 0 30px;
          text-align: left;
          border-bottom: 2px solid $border-gray;
          h3 {
            color: $second-blue;
          }
        }
        .card-body {
          padding: 12px 10px 16px 8px;
          @include cell768p() {
            padding: 21px 26px 26px 29px;
          }
        }
      }
      .my-cards {
        margin-bottom: 18px;
      }
      .add-new-card {
        .card-header {
          cursor: pointer;
        }
        .card-body {
          padding: 26px 23px 23px 23px;
          @include cell768p() {
            padding: 28px 0px 40px 25px;
          }
          .accept-credit-cards {
            text-align: center;
            padding-bottom: 22px;
            @include cell768p() {
              display: flex;
              align-items: center;
              text-align: left;
              padding-bottom: 60px;
            }
            .accept-icon {
              width: 45px;
              height: 45px;
              display: inline-block;
              vertical-align: middle;
              @include cell768p() {
                display: block;
                vertical-align: initial;
              }
            }
            .text-card {
              display: inline-block;
              vertical-align: middle;
              margin-left: 8px;
              @include cell768p() {
                display: block;
                vertical-align: initial;
              }
              p {
                font-size: 16px;
                font-weight: 600;
                color: $green;
                margin: 0;
              }
            }
            .payment-methods {
              width: 100%;
              padding-top: 18px;
              @include cell380p() {
                width: auto;
              }
              @include cell768p() {
                margin-left: 20px;
                padding-top: 0;
              }
            }
          }
          .form-container {
            width: 100%;
            display: inline-block;
            text-align: left;
            .field {
              display: inline-block;
              text-align: left;
              vertical-align: top;
              font-size: 0;
              padding-bottom: 16px;
              @include cell768p() {
                padding-bottom: 0;
              }
              label {
                display: inline-block;
                width: 100%;
                font-weight: 700;
                font-size: 14px;
                color: $dark-gray;
              }
              .inputText,
              .cbxOptions {
                display: inline-block;
                background-color: transparent;
                margin-top: 12px;
                padding: 0 10px;
                border: 2px solid $border-gray-input-mobile;
                border-radius: 6px;
                color: $dark-gray;
                @include cell768p() {
                  margin-right: 20px;
                }
              }
              &.name-on-card {
                width: 100%;
                @include cell768p() {
                  width: 273px;
                }
                .inputText {
                  width: calc(100% - 20px);
                  @include cell768p() {
                    width: 229px;
                  }
                }
              }
              &.card-number {
                width: 100%;
                @include cell768p() {
                  width: 270px;
                }
                .inputText {
                  width: calc(100% - 20px);
                  @include cell768p() {
                    width: 226px;
                  }
                }
              }
              &.w-160 {
                width: 100%;
                @include cell768p() {
                  width: 180px;
                }
                .cbxOptions {
                  width: 100%;
                  height: 42px;
                  line-height: 42px;
                  @include cell768p() {
                    width: 160px;
                  }
                }
              }
              &.cci {
                width: 100%;
                @include cell768p() {
                  width: 160px;
                }
                .inputText {
                  width: calc(100% - 24px);
                  @include cell768p() {
                    width: 136px;
                  }
                }
              }
              .messageError {
                font-weight: normal;
                color: red;
              }
            }
            .container-action {
              padding-top: 6px;
              text-align: center;
              @include cell768p() {
                display: flex;
                align-items: center;
                text-align: initial;
                padding-top: 30px;
                padding-right: 48px;
              }
              .sectigo-icon {
                width: 88px;
                padding-bottom: 16px;
                @include cell768p() {
                  margin-right: 28px;
                  padding-bottom: 0;
                }
              }
              .btn-add-card {
                width: 100%;
                height: 45px;
                background-color: $green;
                border: none;
                border-radius: 6px;
                font-weight: 700;
                font-size: 18px;
                color: #fff;
                &:hover {
                  background-color: $dark-green;
                }
                @include cell768p() {
                  width: calc(100% - 114px);
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
