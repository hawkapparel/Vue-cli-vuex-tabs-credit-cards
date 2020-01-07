<template>
  <div class="modal" v-if="showModal" @click.self="close">
    <transition name="modal">
      <section class="modal-container">
        <button class="btn-close" @click.prevent="close">
          <img src="@/assets/images/close-icon.png" alt="close" />
        </button>
        <div class="modal-body">
          <modal-remove-card v-if="activeModalRemoveCard" />
          <modal-set-default-card v-if="activeModalSetDefault" />
        </div>
      </section>
    </transition>
  </div>
</template>

<script>
import { mapState } from "vuex";
import ModalRemoveCard from "@/components/modals/ModalRemoveCard.vue";
import ModalSetDefaultCard from "@/components/modals/ModalSetDefaultCard.vue";

export default {
  name: "modal",
  components: {
    ModalRemoveCard,
    ModalSetDefaultCard
  },
  computed: {
    ...mapState({
      showModal: state => state.showModal,
      activeModalRemoveCard: state => state.activeModalRemoveCard,
      activeModalSetDefault: state => state.activeModalSetDefault
    })
  },
  methods: {
    close() {
      this.$store.commit("setLastDigits", "");
      this.$store.commit("setActiveModalSetDefault", false);
      this.$store.commit("setActiveModalRemoveCard", false);
      this.$store.commit("setShowModal", false);
    }
  }
};
</script>

<style lang="scss" scoped>
.modal {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  //align-items: center;
  align-items: inherit;
  background-color: rgba(47, 71, 99, 0.6);
  z-index: 1000;

  overflow-y: auto;
  &-enter-active,
  &-leave-active {
    transition: opacity 350ms;
  }

  &-enter,
  &-leave-to {
    opacity: 0;
  }

  &-leave,
  &-enter-to {
    opacity: 1;
  }
  .modal-container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: inline-block;
    width: 78%;
    background-color: white;
    border: 1px solid #c5d0d1;
    border-radius: 2px;
    //text-align: center;
    padding: 17px 18px 20px 18px;
    text-align: left;
    box-shadow: 0 0.5rem 1.75rem -0.25rem rgba(#3d5358, 0.4);
    @include cell768p() {
      width: 458px;
      max-height: 340px;
    }
    .btn-close {
      background-color: transparent;
      border: none;
    }
    .modal-body {
      padding: 0 25px;
    }
  }
}
</style>
