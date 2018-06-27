<template>
  <div id="app" ref="app">
   <router-view></router-view>
  </div>
</template>

<script>
import Axios from 'axios';
export default {
  name: "app",
  created() {
    //获取项目Id和token
    this.initProjectId();
    this.initToken();
    //document.cookie = 'SESSION' + '=' + '3e800ca9-2923-46f6-8605-d27442d1513d' + ';path=/';
  },
  methods: {
    //获取项目id
    initProjectId() {
      //let id = this.$route.params.projectId;
      //this.$store.commit('GET_PROJECT_ID',id)
      // console.log(this.$store.state.projectId)
    },
    //获取项目token验证
    initToken() {
     // let queryParams = this.$route.query;
      //if (queryParams.accessToken) {
      // Axios.defaults.headers.common["Authorization"] ="bearer 12ced766-42f1-40e1-a6a0-1f81054cee3f";//沙沙
      //Axios.defaults.headers.common["Authorization"] ="bearer b752342d-9967-4d8b-a644-70fe52da9e93";//张浩
        //Axios.defaults.headers.common["Authorization"] ="bearer 13d7685f-748c-41bd-88bd-f4cce926386d";//我的
      //}
    }
  }
};
</script>

<style>
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
