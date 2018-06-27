<template>
  <div class="bimeFaceDemo">
    <el-button-group>
      <el-button type="primary" @click="modelIntegrate">发起模型集成</el-button>
      <el-button  @click="getViewToken" >获取viewToken</el-button>
      <el-button type="primary" @click="getModelData">获取业务模型的楼层数据</el-button>
      <el-button  @click="loadModel_1">简单加载模型</el-button>
      <el-button type="primary" @click="loadModel_2">进阶加载模型</el-button>
      <el-button type="primary" @click="loadModel_3">高阶加载模型</el-button>
      <el-button type="primary" @click="btn_addView">添加多个模型</el-button>

    </el-button-group>
    <div class="toolBar">
      <el-button-group>
      <el-button type="primary" @click="btn_showViewHouse">隐藏/显示ViewHouse</el-button>
      <el-button type="" @click="btn_showComponents" >显示所有构件</el-button>
      <el-button type="primary" @click="btn_showExclusiveComponentsByObjectData" >隐藏所有构件</el-button>
      <el-button type="" @click="btn_getCurrentState" >获取当前模型的浏览状态</el-button>
      <el-button type="primary" @click="btn_getComponentProperty" >获取构件属性</el-button>
      <el-button type="" @click="btn_getSelectedComponents" >获取选中集合中的构件ID数组</el-button>
      <el-button type="primary" @click="btn_setComponentsOpacity" >设置构件半透明或取消构件半透明</el-button>
     <el-button type="" @click="btn_getSelectedComponents" >切面</el-button>
     <el-button type="warning" @click="btn_setOrbitMode" >旋转</el-button>
     <el-button type="" @click="btn_setColor" >为构件类型赋值(颜色)</el-button>
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
      <el-button type="" @click="fullscreen">全屏事件</el-button>
      <el-button type="" @click="getBimfaceTree">获取bimface树</el-button>
    </el-button-group>
    </div>
    <div id="bimfacebox">
     <div style='width:200px;height:50px;background-color:red;'></div> 
    </div>
    <div class="tree-box clearfix" style="margin-top:50px;">
      <div class="floor-tree clearfix" >
        <tree ref="floorTree" :treeData="modelData.building_floor_nodes" v-if="modelData.building_floor_nodes"
                    :isAllOpen="true"
                    :isShowcheck="true"
                     @incheckednode="floorClick"
                    :isMultiple="true"
                    :depthShow="3">
                </tree>
      </div>
      <div class="major-tree clearfix">
        <tree ref="majorTree" :treeData="modelData.majors" v-if="modelData.majors"
                    :isAllOpen="true"
                    :isShowcheck="true"
                    @incheckednode="majorClick"
                    :isMultiple="true"
                    :depthShow="3">
                </tree>
      </div>
    </div>
  </div>
</template>

<script>
var _viewer3D = null;

import Tree from "@/components/tree";
export default {
  name: "demo",
  components: { Tree },
  data() {
    return {
      projectId: "11776527976344046843",
      fileId: 1275581195247424, //文件ID
      fileIdList: "",
      //viewToken: "3dacbb33e2fc443da17e20202477c1bb",
      viewToken: "4dbf85913da44898b972f7014c0119c4",
      viewToken2: "",
      viewer3D: null,
      isShowViewHouse: true, //是否显示ViewHouse方向标
      isOpacity: true, //构件是否半透明
      modelData: {
        building_floor_nodes: "",
        elementTypeColorList: "",
        floor_revision_specialties: "",
        majors: ""
      },
      modelMap: {}
    };
  },
  computed: {},
  watch: {
    //测试1232
  },
  created() {
    this.getModelData();
    // this.get5dFileId()
    // .then(res=>{
    //   this.getViewToken();
    // }).then(res=>{
    //   // this.loadModel_2();
    // });
     this.loadModel_2();
  // this.loadModel_3();
  },
  methods: {
    //发起模型集成
    modelIntegrate() {
      let url = this.$api.fetchModelIntegrate();
      let list = this.fileIdList;
      list = [{ fileId: "1275581195247424" }];
      let data = { sources: [] };
      list.forEach(ele => {
        data.sources.push({ fileId: ele.fileId });
      });
      // data.sources.shift();
      // data.sources.shift();
      console.log(JSON.stringify(data));
      var params = {
        method: "put",
        data: JSON.stringify(data),
        headers: { "Content-Type": "application/json" }
      };
      this.$Axios(url, params).then(res => {
        console.log(res);
      });
    },
    //5d获取文件fileId
    get5dFileId() {
      let url = this.$api.fetchFileId(this.projectId);
      return this.$get(url).then(res => {
        console.log(res);
        let result = res.data;
        this.fileId = result[0].fileId;
        let arr = [].concat(result);
        this.fileIdList = arr;
        console.log(this.fileIdList);
        console.log("模型fileId------" + this.fileId);
        //获取viewToken
        // this.getViewToken();
      });
    },
    //获取viewToken
    getViewToken() {
      //let url = `/view/token?fileId=${this.fileId}`;//bimface提供
      let url = this.$api.fetchViewToken(this.projectId, this.fileId);
      return this.$get(url)
        .then(res => {
          console.log(res);
          this.viewToken = res.data;
          console.log("模型viewToken------" + res.data);
          //首次加载模型
          // this.loadModel_2();
        })
        .catch(rjs => {
          alert("rjs");
        });
    },
    //获取5d树结构
    getModelData() {
      //单体楼楼层geo文件对应关系；场布    GET请求
      let url = this.$api.fetchModelData(this.projectId);
      this.$get(url)
        .then(res => {
          let data = res.data;
          let modelData = {
            building_floor_nodes: JSON.parse(data.building_floor_nodes),
            elementTypeColorList: JSON.parse(data.elementTypeColorList),
            floor_revision_specialties: JSON.parse(
              data.floor_revision_specialties
            ),
            majors: JSON.parse(data.specialty_element_type_nodes)
          };
          modelData.building_floor_nodes.forEach(element => {
            element["_parentId"] = element.pId;
          });
          modelData.majors.forEach((element, index) => {
            element["_parentId"] = element.pId;
          });
          let modelMap = this.modelMap;
          modelData.floor_revision_specialties.forEach(ele => {
            if (ele.type == "igms") {
              if (!modelMap[ele.floor_id]) {
                modelMap[ele.floor_id] = ele.file_floor_id;
              }
            }
          });
          this.modelData = modelData;
          console.log(this.modelData);
        })
        .catch(rjs => {
          console.log("出错");
        });
    },
    //单体点击事件
    floorClick(val) {
      let fid = [];
      if (val && val.length) {
        fid = val.map(ele => {
          if (ele._parentId) {
            return {floor_id:ele.floor_id,levelName:ele.name};
          }
        });
      }
      let modelMap = this.modelMap;
      //遍历获取所有的file_floorId的数组
      let file_floorIds = [];
      //用名称
      // fid.forEach(ele=>{
      //  file_floorIds.push({levelName:ele.levelName})
      // })
      //用file_floorId（模型内部id）
      let obj = {};
     fid.forEach(ele => {
        if (modelMap[ele.floor_id]) {
          //如果存在对应楼层id
          let arr = modelMap[ele.floor_id].split(",");
          arr.forEach(ele2 => {
            if (!obj[ele2]) {
              file_floorIds.push({ levelName: ele2 });//这里应该用file_floorIds
            }
          });
        }
      }); 
      let result=[];
      //获取构选的专业类型
      let majorArr = this.$refs.majorTree.recheckedchildNode();
      majorArr.forEach(ele => {
        file_floorIds.forEach(ele2 => {
          let element_type = ele.element_type_id;
          //let element_type = ele.name;
          // result.push({levelName:ele2.levelName,categoryId:element_type})
          //let element_type=ele.pId.split('_');
         // result.push({levelName:ele2.levelName,categoryId:element_type.pop()})
          //result.push({levelName:ele2.levelName,familyId:element_type})
          result.push({levelName:ele2.levelName,categoryId:element_type})
          //result.push({floorId:ele2.levelName})
        });
      });
      //console.log(JSON.stringify(file_floorIds));
      //  file_floorIds = [
      //   { levelName: "第2层", categoryId: 4 },
      //   { levelName: "第3层", categoryId: 4 },
      //   { levelName: "第4层", categoryId: 4 },
      //   { levelName: "首层", categoryId: 4 },
      // ];
     // result =[{"levelName":"9027197081339194598","familyId":1000}];
      console.log(JSON.stringify(result));
      _viewer3D.showExclusiveComponentsByObjectData(result);
      _viewer3D.render();
    },
    majorClick(val){
      console.log(val)
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
      let that = this;
      // 指定待显示的模型或图纸（viewToken从服务端获取）
      let viewToken = this.viewToken;

      // 初始化显示组件
      var options = new BimfaceSDKLoaderConfig();
      options.viewToken = viewToken;
      BimfaceSDKLoader.load(options, successCallback, failureCallback);
      function successCallback(viewMetaData) {
                var ControlConfig = new Glodon.Bimface.UI.Control.ControlConfig();
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
            Glodon.Bimface.Application.WebApplication3DEvent.ViewAdded,function() {
              // 渲染3D模型
              app.render();

              // 从WebApplication获取viewer3D对象
              var viewer3D = app.getViewer();
              that.viewer3D = viewer3D;
              _viewer3D = viewer3D;
               //手动添加api
                that.addApi();
              //隐藏方向标
              //viewer3D.hideViewHouse();
              let Viewer3DEvent = Glodon.Bimface.Viewer.Viewer3DEvent;
              //绑定点击事件获取选中的edo
              viewer3D.addEventListener(Viewer3DEvent.MouseClicked, function(edo) {
                console.log(edo);
              });
              //构件选中状态变化SelectionChanged
              viewer3D.addEventListener(
                Viewer3DEvent.SelectionChanged,
                function(edo) {
                  console.log(123);
                }
              );
              viewer3D.getModeTree(function(data) {
                console.log(data);
              });
            }
          );
          // 监听添加view进行中的时间，可获取添加进度
          app.addEventListener(
            Glodon.Bimface.Application.WebApplication3DEvent.ViewLoading,
            function(progress) {
              console.log(progress);
              if(progress.progress==100){
               
              }
            }
          );
        }
      }

      function failureCallback(error) {
        console.log(error);
      }
    },
    //高阶方式加载模型
    loadModel_3(){
      let that = this;
      // 指定待显示的模型或图纸（viewToken从服务端获取）
      let viewToken = this.viewToken;

      // 初始化显示组件
      var options = new BimfaceSDKLoaderConfig();
      options.viewToken = viewToken;
      BimfaceSDKLoader.load(options, successCallback, failureCallback);
      function successCallback(viewMetaData) {
                var ControlConfig = new Glodon.Bimface.UI.Control.ControlConfig();
        if (viewMetaData.viewType == "dwgView") {
          // ======== 判断是否为2D图纸 ========

  
        } else if (viewMetaData.viewType == "3DView") {
          // ======== 判断是否为3D模型 ========
          var dom4Show = document.getElementById("bimfacebox");

        // 配置参数
          var config = new Glodon.Bimface.Viewer.Viewer3DConfig();
          config.domElement = dom4Show;


        // 创建viewer3D对象
          var viewer3D = new Glodon.Bimface.Viewer.Viewer3D(config);

          // 添加模型
          viewer3D.addView(viewToken);
          that.viewer3D = viewer3D;
           _viewer3D = viewer3D;

          // 监听添加view完成的事件
			viewer3D.addEventListener(Glodon.Bimface.Viewer.Viewer3DEvent.ViewAdded, function() {
	
				// 渲染3D模型
				viewer3D.render();
	
        // 调用viewer3D对象的Method，可以继续扩展功能	
               //手动添加api
                that.addApi();
              //隐藏方向标
              //viewer3D.hideViewHouse();
              let Viewer3DEvent = Glodon.Bimface.Viewer.Viewer3DEvent;
              //绑定点击事件获取选中的edo
              viewer3D.addEventListener(Viewer3DEvent.MouseClicked, function(edo) {
                console.log(edo);
              });
              //构件选中状态变化SelectionChanged
              viewer3D.addEventListener(
                Viewer3DEvent.SelectionChanged,
                function(edo) {
                  console.log(123);
                }
              );
              viewer3D.getModeTree(function(data) {
                console.log(data);
              });
				
			});
          // 监听添加view进行中的时间，可获取添加进度
          viewer3D.addEventListener(Glodon.Bimface.Viewer.Viewer3DEvent.ViewLoading,
            function(progress) {
              console.log(progress);
            }
          );
        }
      }

      function failureCallback(error) {
        console.log(error);
      }
    },
    //添加一个模型到场景
    btn_addView() {
      _viewer3D.addView(this.viewToken3);
    },
    //setView让三维模型回到标准视角
    btn_setView(val) {
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
      _viewer3D.setView(val);
    },
    //显示隐藏showViewHouse
    btn_showViewHouse() {
      this.isShowViewHouse = !this.isShowViewHouse;
      if (this.isShowViewHouse) {
        this.viewer3D.showViewHouse();
      } else {
        this.viewer3D.hideViewHouse();
      }
      
    },
    //显示所有构件
    btn_showComponents() {
      _viewer3D.showAllComponents();
       _viewer3D.render();
    },
    //隐藏所有构件showExclusiveComponentsByObjectData(conditions)显示满足条件的构件，其余全部隐藏
    btn_showExclusiveComponentsByObjectData(Object_Array) {
      _viewer3D.showExclusiveComponentsByObjectData({ "levelName ": "xxxx" });
       _viewer3D.render();
    },
    //获取当前模型的浏览状态
    btn_getCurrentState() {
      console.log(_viewer3D);
      console.log(this.viewer3D.getCurrentState());
    },
    //获取构件属性objectId, callback
    btn_getComponentProperty() {
      let objectIds = this.btn_getSelectedComponents();
      if (objectIds.length) {
        _viewer3D.getComponentProperty(objectIds[objectIds.length - 1], res => {
          console.log(res);
        });
      }
    },
    //获取选中集合中的构件ID数组  TODO ???????
    btn_getSelectedComponents() {
      let result = this.viewer3D.getSelectedComponents();
      console.log(result); //{1052017: true, 1054806: true}
      let arr = Object.keys(result);
      return arr;
    },
    //设置构件半透明，或取消构件半透明objectIds(多个objectId的数组	[“x1”, “x2”]), opacity(Translucent	取消半透明Opaque)
    btn_setComponentsOpacity() {
      this.Opacity = !this.Opacity;
      let opacity = this.Opacity ? "Translucent" : "Opaque";
      let objectIds = this.btn_getSelectedComponents();
      if (objectIds.length) {
        _viewer3D.setComponentsOpacity(objectIds, opacity);
      }
    },
    //zoomToBoundingBox(boundingBox)缩放到指定包围盒
    btn_zoomToBoundingBox() {
      // _viewer3D.setComponentsOpacity(objectIds,opacity)
    },
    //模型旋转
    btn_setOrbitMode(){
      _viewer3D.setOrbitMode();
      console.log("旋转")
    },
    //为构件类型赋值
    btn_setColor(){
    //   let colors=this.modelData.elementTypeColorList || [];
      let categoryIds=[];
     let colors=[-1,6,7,9];
      colors.forEach(ele=>{
        //let rgba=this.toDecimal(ele.solidColor).split(',');
        //_viewer3D.overrideComponentsColorByObjectData([{"levelName":"第3层",categoryId:5}],new Glodon.Web.Graphics.Color(255,0,0,1))
      })
      _viewer3D.overrideComponentsColorByObjectData([{"levelName":"第3层"}],new Glodon.Web.Graphics.Color(255, 0, 0, 1))
      _viewer3D.render();
    },

    //全屏事件
    fullscreen(){
      _viewer3D.enableFullScreen(true)
    },
    //获取bimface树
    getBimfaceTree(){
      _viewer3D.getModeTree(function(data) {
                console.log(data);
      });
   

      return
      let url=this.$api.fetchBimfaceTree('1275603192069952');
       var params = {
        treeType:'floor',
        integrateId:'1275603192069952'
      };
      this.$post(url, params).then(res => {
        console.log(res);
      });
    },
    //十进制转16进制
    toHex( dec,count){
				var dec=Number(dec).toString(16);
				var zero = '000000';
				var tmp  = count-dec.length;
				return (zero.substr(0,tmp) + dec);
    },
    //重新自己添加的api
    addApi(){
    //设置旋转模式
    // _viewer3D.prototype=Glodon.Bimface.Viewer.Viewer3D.prototype;
    //   Glodon.Bimface.Viewer.Viewer3D.prototype.setOrbitMode = function() {
    //       this.getViewer().setOrbitMode();
    //   };
       //重写全屏事件方法
       return
      var viewNS = Glodon.Web.Lang.Utility.Namespace.ensureNamespace(Glodon, "Bimface.Viewer");
      _viewer3D.__proto__.enableFullScreen = function(isEnabled,id) {
              var element =document.getElementById('bimfacebox') || this._opt.domElement,
                  self = this;
              if (isEnabled) {
                  Glodon.Web.Lang.Utility.FullScreen.fullScreen(element);
              } else {
                  Glodon.Web.Lang.Utility.FullScreen.exitFullScreen();
              }
              setTimeout(function() {
                  self.resize();
                  console.log(1332)
                  _viewer3D.render()
              }, 500);
          }
          // viewNS.Viewer.prototype.enableFullScreen = function(isEnabled,id) {
          //     var element =document.getElementById(id) || this._opt.domElement,
          //         self = this;
          //     if (isEnabled) {
          //         Glodon.Web.Lang.Utility.FullScreen.fullScreen(element);
          //     } else {
          //         Glodon.Web.Lang.Utility.FullScreen.exitFullScreen();
          //     }
          //     setTimeout(function() {
          //         self.resize();
          //     }, 500);
          // }
      console.log(_viewer3D)
      console.log(viewNS)
      console.log(_viewer3D.enableFullScreen)    
    },
  }
};
</script>
<style lang="less" >
.bimeFaceDemo {
  #bimfacebox {
    border: 1px solid red;
    width: 100%;
    height: 500px;
  }
  .toolBar {
    margin: 5px;
  }
  .tree-box {
    //border:1px solid red;
    > div {
      float: left;
      margin: 5px 20px;
      height: 200px;
      overflow: auto;
      border: 1px solid red;
      padding: 5px;
    }
  }
}
</style>