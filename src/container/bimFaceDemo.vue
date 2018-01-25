<template>
  <div class="bimeFaceDemo">
    <el-button-group>
      <el-button type="primary" @click="getViewToken" >获取viewToken</el-button>
      <el-button type="primary" @click="loadModel_1">简单加载模型</el-button>
      <el-button type="primary" @click="loadModel_2">进阶加载模型</el-button>
    </el-button-group>
    <div class="toolBar">
      <el-button-group>
      <el-button type="primary" @click="btn_showViewHouse">隐藏/显示ViewHouse</el-button>
      <el-button type="primary" @click="btn_showComponents" >显示所有构件</el-button>
      <el-button type="primary" @click="btn_showExclusiveComponentsByObjectData" >隐藏所有构件</el-button>
      <el-button type="primary" @click="btn_getCurrentState" >获取当前模型的浏览状态</el-button>
      <el-button type="primary" @click="btn_getComponentProperty" >获取构件属性</el-button>
      <el-button type="primary" @click="btn_getSelectedComponents" >获取选中集合中的构件ID数组</el-button>
      <el-button type="primary" @click="btn_setComponentsOpacity" >设置构件半透明或取消构件半透明</el-button>
     <el-button type="primary" @click="btn_getSelectedComponents" >切面</el-button>
      <!-- <el-button type="primary" @click="btn_zoomToBoundingBox" >缩放到指定包围盒</el-button>
      <el-button type="primary" @click="btn_zoomToSelectedComponents" >缩放到加入选中集合的构件</el-button> -->
       <!--
      <el-button type="primary" @click="btn_getSelectedComponents" >获取选中集合中的构件ID数组</el-button> -->
    </el-button-group>
     <el-button-group class="visual-angle" style="margin:5px;">
      <el-button type="primary" @click="btn_setView('Home')">标准(主)视角</el-button>
      <el-button  @click="btn_setView('Top')">俯视角</el-button>
      <el-button type="primary" @click="btn_setView('Bottom')">仰视角</el-button>
      <el-button  @click="btn_setView('North')">北视角</el-button>
      <el-button type="primary" @click="btn_setView('South')">南视角</el-button>
      <el-button  @click="btn_setView('West')">西视角</el-button>
      <el-button type="primary" @click="btn_setView('East')">东视角</el-button>
      <el-button  @click="btn_setView('SouthEast')">东南视角</el-button>
      <el-button type="primary" @click="btn_setView('SouthWest')">西南视角</el-button>
      <el-button  @click="btn_setView('NorthEast')">东北视角</el-button>
      <el-button type="primary" @click="btn_setView('NorthWest')">西北视角</el-button>
    </el-button-group>
    </div>
    <div id="bimfacebox">

    </div>
  </div>
</template>

<script>
var  _viewer3D=null;
export default {
  name: "demo",
  data() {
    return {
      fileId: 1269979933999296, //文件ID
      viewToken: "9e42902fe6394c4e8fc00d66a5d26d74",
      viewer3D:null,
      isShowViewHouse:true,//是否显示ViewHouse方向标
      isOpacity:true,//构件是否半透明
    };
  },
  computed: {},
  watch: {},
  created() {
    this.loadModel_2()
  },
  methods: {
    //获取viewToken
    getViewToken() {
      let url = `/view/token?fileId=${this.fileId}`;
      this.$get(url)
        .then(res => {
          console.log(res);
        })
        .catch(rjs => {
          alert("rjs");
        });
    },
    //简易方式加载模型
    loadModel_1() {
      // 指定待显示的模型或图纸（viewToken从服务端获取）
      var viewToken = this.viewToken;

      // 初始化显示组件
      var options = new BimfaceSDKLoaderConfig();
      options.viewToken = viewToken;
      BimfaceSDKLoader.load(options, successCallback, failureCallback);

      function successCallback(viewMetaData) {
        // 创建WebApplication，直接显示模型或图纸
        var dom4Show = document.getElementById("bimfacebox");
        new Glodon.Bimface.Application.WebApplicationDemo(
          viewMetaData,
          dom4Show
        );
      }

      function failureCallback(error) {
        console.log(error);
      }
    },
    //进阶方式加载模型
    loadModel_2() {
      let that=this;
      // 指定待显示的模型或图纸（viewToken从服务端获取）
      let viewToken = this.viewToken;

      // 初始化显示组件
      var options = new BimfaceSDKLoaderConfig();
      options.viewToken = viewToken;
      BimfaceSDKLoader.load(options, successCallback, failureCallback);

      function successCallback(viewMetaData) {
        if (viewMetaData.viewType == "dwgView") {
          // ======== 判断是否为2D图纸 ========

          // 获取DOM元素
          var dom4Show = document.getElementById("bimfacebox");
          var webAppConfig = new Glodon.Bimface.Application.WebApplication2DConfig();
          webAppConfig.domElement = dom4Show;

          // 创建WebApplication
          var app = new Glodon.Bimface.Application.WebApplication2D(
            webAppConfig
          );

          // 添加待显示的图纸
          app.load(viewToken);

          // 从WebApplication获取viewer2D对象
          var viewer2D = app.getViewer();

          // 调用viewer2D对象的Method，可以继续扩展功能
          // your code
        } else if (viewMetaData.viewType == "3DView") {
          // ======== 判断是否为3D模型 ========
          var dom4Show = document.getElementById("bimfacebox");
          var webAppConfig = new Glodon.Bimface.Application.WebApplication3DConfig();
          //Viewer3DConfig配置信息
          webAppConfig.domElement = dom4Show;

          // 创建WebApplication
          var app = new Glodon.Bimface.Application.WebApplication3D(
            webAppConfig
          );

          // 添加待显示的模型
          app.addView(viewToken);
          // 监听添加view完成的事件----建议在最后一次手动调用render
          app.addEventListener(
            Glodon.Bimface.Application.WebApplication3DEvent.ViewAdded,
            function() {
              // 渲染3D模型
              app.render();

              // 从WebApplication获取viewer3D对象
              var viewer3D = app.getViewer();
                that.viewer3D=viewer3D;
                _viewer3D=viewer3D;
              console.log(that.viewer3D)
              //隐藏方向标
              //viewer3D.hideViewHouse();
              let Viewer3DEvent=Glodon.Bimface.Viewer.Viewer3DEvent;
              //绑定点击事件获取选中的edo
              viewer3D.addEventListener(Viewer3DEvent.MouseClicked,function(edo){
                  console.log(edo)
               });
               //构件选中状态变化SelectionChanged
               viewer3D.addEventListener(Viewer3DEvent.SelectionChanged,function(edo){
                 console.log(123)
               });
              viewer3D.getModeTree(function(data){
                console.log(data);
              })
               
            }
          );
          // 监听添加view进行中的时间，可获取添加进度
          app.addEventListener(
            Glodon.Bimface.Application.WebApplication3DEvent.ViewLoading,
            function(progress) {
              //console.log(progress);
            }
          );
        }
      }

      function failureCallback(error) {
        console.log(error);
      }
    },
    //setView让三维模型回到标准视角
    btn_setView(val){
      //ViewOption	Glodon.Bimface.Viewer.ViewOption.Home
      // Top	俯视角
      // Bottom	仰视角
      // North	北视角
      // South	南视角
      // West	西视角
      // East	东视角
      // SouthEast	东南视角
      // SouthWest	西南视角
      // NorthEast	东北视角
      // NorthWest	西北视角
      _viewer3D.setView(val)
    },
    //显示隐藏showViewHouse
    btn_showViewHouse(){
       this.isShowViewHouse=!this.isShowViewHouse;
      if(this.isShowViewHouse){
         this.viewer3D.showViewHouse();
      }else{
        this.viewer3D.hideViewHouse();
      }
     
    },
    //显示所有构件
    btn_showComponents(){
      _viewer3D.showAllComponents();
    },
    //隐藏所有构件showExclusiveComponentsByObjectData(conditions)显示满足条件的构件，其余全部隐藏
    btn_showExclusiveComponentsByObjectData(Object_Array){
     _viewer3D.showExclusiveComponentsByObjectData({"levelName ":"xxxx"});
    },
    //获取当前模型的浏览状态
    btn_getCurrentState(){
      debugger
      console.log(_viewer3D)
      console.log(this.viewer3D.getCurrentState())
    },
    //获取构件属性objectId, callback
    btn_getComponentProperty(){
      let objectIds=this.btn_getSelectedComponents();
      if(objectIds.length){
          _viewer3D.getComponentProperty(objectIds[objectIds.length-1],(res)=>{
             console.log(res)
         })
      }
    },
    //获取选中集合中的构件ID数组  TODO ???????
    btn_getSelectedComponents(){
      let result=this.viewer3D.getSelectedComponents();
      console.log(result)  //{1052017: true, 1054806: true}
      let arr=Object.keys(result);
      return arr
    },
    //设置构件半透明，或取消构件半透明objectIds(多个objectId的数组	[“x1”, “x2”]), opacity(Translucent	取消半透明Opaque)
    btn_setComponentsOpacity(){
      this.Opacity=!this.Opacity;
      let opacity=(this.Opacity?'Translucent':'Opaque');
      let objectIds=this.btn_getSelectedComponents();
      if(objectIds.length){
          _viewer3D.setComponentsOpacity(objectIds,opacity)
      }
    },
    //zoomToBoundingBox(boundingBox)缩放到指定包围盒
    btn_zoomToBoundingBox(){
      // _viewer3D.setComponentsOpacity(objectIds,opacity)
    }
  },


};
</script>
<style lang="less" >
.bimeFaceDemo {
  #bimfacebox {
    border: 1px solid red;
    width: 100%;
    height: 500px;
  }
      .toolBar{
      margin:5px;
    }
}
</style>