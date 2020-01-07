<template>
  <div class="modal-remove-card">
    <img
      class="modal-image"
      src="@/assets/images/remove-payment-ico.svg"
      alt="remove card"
    />
    <h4 class="title">Remove card</h4>
    <p class="description">Are you sure you want to remove from wallet?</p>
    <div class="btn-container">
      <button class="btn btn-yes" @click.prevent="accept">Yes</button>
      <button class="btn btn-cancel" @click.prevent="close">Cancel</button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "modal-remove-card",
  computed: {
    ...mapState({
      lastDigits: state => state.lastDigits
    })
  },
  methods: {
    accept() {
      this.$store.commit("removeCard", this.lastDigits);
      this.$store.commit("setShowModal", false);
    },
    close() {
      this.$store.commit("setActiveModalRemoveCard", false);
      this.$store.commit("setLastDigits", "");
      this.$store.commit("setShowModal", false);
    }
  }
};
</script>

<style lang="scss" scoped>
.modal-remove-card {
  .modal-image {
    width: 102px;
    @include cell768p() {
      width: 87px;
    }
  }
  .title {
    padding-top: 30px;
    font-size: 24px;
    font-weight: normal;
    color: $modal-blue;
    @include cell768p() {
      padding-top: 36px;
    }
  }
  .description {
    padding-top: 18px;
    margin: 0;
    font-size: 16px;
    color: $dark-gray;
  }
  .btn-container {
    padding-top: 30px;
    text-align: center;
    .btn {
      width: 100%;
      padding: 9px 0;
      margin-bottom: 12px;
      border: 3px solid $green;
      border-radius: 16px;
      background-color: $green;
      color: #fff;
      font-size: 18px;
      font-weight: 700;
      @include cell768p() {
        width: 176px;
        padding: 9px 0;
        margin-bottom: 0;
      }
    }
    .btn-yes {
      &:hover {
        background-color: $dark-green;
        border-color: $dark-green;
      }
      @include cell768p() {
        margin-right: 22px;
      }
    }
    .btn-cancel {
      border: 3px solid $modal-gray;
      background-color: #fff;
      color: $modal-gray;
      &:hover {
        background-color: $modal-gray;
        border-color: $modal-gray;
        color: #fff;
      }
    }
  }
}
</style>
