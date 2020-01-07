<template>
  <div id="app">
    <div id="viewport" class="w-100 relative">
      <section class="section-tabs relative">
        <tabs />
      </section>
      <modal />
    </div>
  </div>
</template>

<script>
import Tabs from "./components/blocks/Tabs.vue";
import Modal from "./components/blocks/Modal.vue";

export default {
  name: "app",
  components: {
    Tabs,
    Modal
  }
};
</script>

<style lang="scss">
@import "assets/scss/main.scss";
.section-tabs {
  min-height: 900px;
  padding: 30px 0 80px 0;
  text-align: center;
  z-index: 3;
  @include cell768p() {
    padding: 80px 0 0 0;
  }
}
</style>
