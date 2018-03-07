<template>
  <div id="app">
   <router-view></router-view>
  </div>
</template>

<script>
import Axios from 'axios'
export default {
  name: "app",
   data(){
    return {}
  },
  created() {
    //获取项目Id和token
    this.initProjectId();
    Axios.defaults.headers.common["Authorization"] ="bearer 087dca95-7a45-47ff-926c-6aafabd2b1df";
    this.initToken();
  },
  methods: {
    //获取项目id
    initProjectId() {
      let id = this.$route.params.projectId;
      //this.$store.commit("GET_PROJECT_ID", id);
      // console.log(this.$store.state.projectId)
    },
    //获取项目token验证
    initToken() {
      let queryParams=this.$route.query;
      console.log(queryParams);
      if(queryParams.accessToken){
        Axios.defaults.headers.common["Authorization"] ="bearer " + queryParams.accessToken;
      }
    }
  }
};
</script>

<style>
*{
    box-sizing: border-box
    }
html,
body {
  width: 100%;
  height: 100%;
  overflow: hidden;
  margin: 0;
  cursor: default;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  font-size: 14px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
