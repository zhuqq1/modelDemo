<template>
    <div class="main-content">
        <router-view></router-view>
    </div>
</template>

<script>
export default {
  name: "body",
  components: {

  },
  created(){
            //获取项目Id和token
            this.initProjectId();
        },
        methods:{
            //获取项目id
            initProjectId () {
                let id = this.$route.params.projectId;
                this.$store.commit('GET_PROJECT_ID',id)
               // console.log(this.$store.state.projectId)
            },
            //获取项目token验证
            initToken () {

            },
        }
};
</script>

<style lang="less">
.main-content {
  width: 100%;
  height: 100%;
//   padding:10px;
//   border:1px solid yellow;
}
</style>
