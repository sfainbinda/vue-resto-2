<template>
  <div class="main">
    <div class="d-flex justify-content-center align-items-center signin">
      <SignIn />
    </div>
  </div>
</template>
<script>
import SignIn from "@/components/SignIn.vue";
export default {
  name: "SignView",
  components: { SignIn },
};
</script>
<style scoped>
.main {
  background-color: #e9ecef;
  /* height: 100vh;
  width: 100vw; */
  background-image: url("../assets/bkg-2.jpg");
}
.signin {
  height: 100vh;
}
</style>
