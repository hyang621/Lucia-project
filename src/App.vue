<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {

    }
  },
  mounted() {
    this.getToggleDevice();
    const that = this;
    window.onresize = function () {  //监听屏幕的改变
        setTimeout(function () {
          that.getToggleDevice();
        }, 10)
    }
  },
  methods: {
    getToggleDevice() {
      let screenWidth = document.body.clientWidth;
      var tmp = false;
      if(screenWidth > 992) {
        tmp = true;
      }
      this.$store.commit("devicePC", tmp);
    }
  }
}
</script>

<style lang="less">
@import './assets/style/common.less';
@import './assets/style/index.less';

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width: 100%;
  height: 100%;
}
</style>
