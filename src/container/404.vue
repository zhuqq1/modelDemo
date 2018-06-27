<template>
<div class="bg">
	<div class="cont">
		<div class="c1"><img src="/resources/bim5d-project/img/error.png" alt=""></div>
		<h2>{{error['code']}}</h2>
		<div class="c3">{{error['message']}}</div>
	</div>
</div>
</template>

<script>
export default {
  data() {
    return {
      error: {
        code: "",
        errorid: "13",
        message: "提醒您 - 该功能暂未开放，或者您暂时没有权限使用"
      }
    };
  },
  components: {}
};
</script>

<style lang="css" scoped>
a {
  text-decoration: none;
  outline: none;
}

a:hover {
  text-decoration: underline;
}

.cf:after {
  content: ".";
  display: block;
  height: 0;
  font-size: 0;
  clear: both;
  visibility: hidden;
}

.cf {
  zoom: 1;
  clear: both;
}

.bg {
  width: 100%;
  background: url("/resources/bim5d-project/img/01.jpg") no-repeat center top
    #dad9d7;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  overflow: hidden;
}

.cont {
  margin: 0 auto;
  width: 500px;
  line-height: 20px;
}

.c1 {
  height: 360px;
  text-align: center;
  line-height: 360px;
}

.c1 img {
  display: inline-block !important;
  margin: 0 auto;
  margin-top: 162px;
}

.cont h2 {
  text-align: center;
  color: #555;
  font-size: 18px;
  font-weight: normal;
  height: 35px;
}

.c2 {
  height: 35px;
  text-align: center;
}

.c2 a {
  display: inline-block;
  margin: 0 4px;
  font-size: 14px;
  height: 23px;
  color: #626262;
  padding-top: 1px;
  text-decoration: none;
  text-align: left;
}

.c2 a.re {
  width: 96px;
  height: 24px;
  background: url("/resources/bim5d-project/image/03.png");
  padding-left: 30px;
}

.c2 a.re:hover {
  background: url("/resources/bim5d-project/image/03.png") 0 -24px;
}

.c2 a.re:active {
  background: url("/resources/bim5d-project/image/03.png") 0 -48px;
}

.c3 {
  height: 180px;
  text-align: center;
  color: #999;
  font-size: 12px;
}

#bf {
  position: absolute;
  top: 269px;
  left: 0;
  width: 100%;
}

.bf1 {
  margin: 0 auto;
  width: 99px;
  padding-left: 32px;
}

.bd {
  height: 600px;
  overflow: hidden;
}

#box {
  position: absolute;
  top: 165px;
  left: 0;
  width: 100%;
  text-align: center;
}

.bf1 {
  margin: 0 auto;
  width: 99px;
  padding-left: 32px;
}
</style>
