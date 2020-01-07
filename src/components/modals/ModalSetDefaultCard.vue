<template>
  <div class="modal-set-default-card">
    <img
      class="modal-image"
      src="@/assets/images/default-card-ico.svg"
      alt="remove card"
    />
    <h4 class="title">Change default card</h4>
    <p class="description">
      This card will appear as a primary option for your payment. Are you sure
      you want to set this card as default?
    </p>
    <div class="btn-container">
      <button class="btn btn-yes" @click.prevent="accept">Yes</button>
      <button class="btn btn-cancel" @click.prevent="close">Cancel</button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "modal-set-default-card",
  computed: {
    ...mapState({
      lastDigits: state => state.lastDigits
    })
  },
  methods: {
    accept() {
      this.$store.commit("setDefault", this.lastDigits);
      this.$store.commit("setShowModal", false);
    },
    close() {
      this.$store.commit("setActiveModalSetDefault", false);
      this.$store.commit("setLastDigits", "");
      this.$store.commit("setShowModal", false);
    }
  }
};
</script>

<style lang="scss" scoped>
.modal-set-default-card {
  .modal-image {
    width: 104px;
    @include cell768p() {
      width: 90px;
    }
  }
  .title {
    padding-top: 26px;
    font-size: 24px;
    font-weight: normal;
    color: $modal-blue;
    @include cell768p() {
      padding-top: 24px;
    }
  }
  .description {
    padding-top: 12px;
    margin: 0;
    font-size: 16px;
    text-align: justify;
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
      margin-right: 22px;
      &:hover {
        background-color: $dark-green;
        border-color: $dark-green;
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
