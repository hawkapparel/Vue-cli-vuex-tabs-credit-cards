<template>
  <div class="credit-card">
    <div class="content">
      <div class="main-info">
        <img
          class="default-icon"
          :src="
            require(`@/assets/images/${
              card.default ? 'ok-green-ico.svg' : 'ok-grey-ico.svg'
            }`)
          "
          alt="icon ok"
        />
        <img
          class="brand-icon"
          :src="require(`@/assets/images/${card.img}`)"
          alt="brand logo"
        />
        <div class="info">
          <p class="card-number">
            {{ card.brand }} {{ "**** **** **** " + card.lastDigits }}
          </p>
          <p class="card-exp-date">Ex.Date: {{ card.expDate }}</p>
        </div>
      </div>
      <div class="btn-actions">
        <button
          class="btn btn-remove"
          @click.prevent="removeCard(card.lastDigits)"
        >
          Remove
        </button>
        <button
          class="btn btn-default"
          :disabled="card.default"
          @click.prevent="setDefault(card.lastDigits)"
        >
          {{ card.default ? "Default" : "Set as default" }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "credit-card",
  data() {
    return {
      tabSelected: ""
    };
  },
  props: {
    card: {
      type: Object,
      required: true
    }
  },
  methods: {
    removeCard(lastDigits) {
      this.$store.commit("setLastDigits", lastDigits);
      this.$store.commit("setActiveModalSetDefault", false);
      this.$store.commit("setActiveModalRemoveCard", true);
      this.$store.commit("setShowModal", true);
    },
    setDefault(lastDigits) {
      this.$store.commit("setLastDigits", lastDigits);
      this.$store.commit("setActiveModalRemoveCard", false);
      this.$store.commit("setActiveModalSetDefault", true);
      this.$store.commit("setShowModal", true);
    }
  }
};
</script>

<style lang="scss" scoped>
.credit-card {
  background-color: $bg-credit-card;
  margin-bottom: 10px;
  padding: 16px 12px 14px 12px;
  &:last-child {
    margin-bottom: 0;
  }
  @include cell768p() {
    height: 93px;
    padding: 0 39px 0 34px;
  }
  .content {
    height: 100%;
    text-align: left;
    @include cell768p() {
      display: flex;
    }
    .main-info {
      width: 100%;

      @include cell768p() {
        display: flex;
        align-items: center;
        width: 50%;
      }
      .default-icon {
        width: 18px;
        height: 18px;
        margin-right: 15px;
        vertical-align: middle;
        @include cell768p() {
          margin-right: 32px;
        }
      }
      .brand-icon {
        width: 69px;
        height: 46px;
        margin-right: 18px;
        vertical-align: middle;
      }
      .info {
        text-align: left;
        padding: 18px 0 30px 34px;
        @include cell768p() {
          padding: 0;
        }
        p {
          color: $dark-gray;
          margin: 0;
        }
        .card-number {
          font-size: 16px;
        }
        .card-exp-date {
          font-size: 12px;
        }
      }
    }
    .btn-actions {
      padding-left: 34px;
      @include cell768p() {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        width: 50%;
        padding-left: 0;
      }
      .btn {
        background-color: transparent;
        padding: 0;
        border: none;
        font-size: 14px;
        border-radius: 0;
        @include cell768p() {
          margin-left: 24px;
        }
        &.btn-remove {
          color: $btn-gray-action;
          border-bottom: 2px solid $btn-gray-action;
          &:hover {
            color: $dark-gray;
            border-bottom: 2px solid $dark-gray;
          }
        }
        &.btn-default {
          color: $second-blue;
          border-bottom: 2px solid $second-blue;
          float: right;
          margin-right: 11px;
          &:hover {
            color: $black-blue;
            border-bottom: 2px solid $black-blue;
          }
          @include cell768p() {
            float: initial;
            margin-right: 0;
          }
        }
      }
    }
  }
}
.input-error {
  border: 1px solid red !important;
}
.select-error {
  border: 1px solid red !important;
}
</style>
