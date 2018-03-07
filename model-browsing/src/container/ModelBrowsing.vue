/*
 * @Name: 模型浏览页面主组件
 * @Author: 李荣男
 * @Date: 2017-11-17 15:18:35
 * @Last Modified by: 李荣男
 */
<template>
<div id="model-browsing">
    <!-- 按钮群wrap -->
    <div class="menu_btn_wrap" @click="btnClick($event)">
        <div class="btn_box">
            <button value="select" @click="btnValue = 'select'" :class="btnValue=='select'?'active':''"><i class="iconfont icon-zhizhenshubiao"></i>选择</button>
            <button value="transparent_select" @click="btnValue = 'transparent_select'" :class="btnValue=='transparent_select'?'active':''"><i class="iconfont icon-touming"></i>半透明</button>
            <p>选择</p>
        </div>
        <div class="btn_box">
            <!-- <button value="navigate" @click="btnValue = 'navigate'" :class="btnValue=='navigate'?'active':''"><i class="iconfont icon-xuanzhuan"></i>旋转</button> -->
            <!-- <button value="_pan" @click="btnValue = '_pan'" :class="btnValue=='_pan'?'active':''"><i class="iconfont icon-shoushi"></i>平移</button> -->
            <button value="zoom_out"><i class="iconfont icon-fangdafangdajing"></i>放大</button>
            <button value="zoom_in"><i class="iconfont icon-suoxiaofangdajing"></i>缩小</button>
            <!-- <button value="zoom_all"><i class="iconfont icon-shousuo"></i>缩放全部</button>
            <button value="zoom_to_target"><i class="iconfont icon-suofang"></i>缩放选中</button> -->
            <p>导航</p>
        </div>
        <div class="btn_box">
            <button value="clip_plane" @click="btnValue = 'btn_box'" :class="btnValue=='btn_box'?'active':''"><i class="iconfont icon-fencengbuju"></i>切面</button>
            <p>水平切面</p>
        </div>
        <div class="view_btn_box btn_box" @click.stop="btn_setView">
            <button value="Home" class="top_btn"><i class="iconfont icon-d-zuoqian"></i>(主)视角</button>
            <button value="North" class="top_btn"><i class="iconfont icon-d-youhou"></i>前(北)视角</button>
            <button value="South" class="top_btn"><i class="iconfont icon-d-youhou"></i>后(南)视角</button>
            <button value="East" class="middle_btn"><i class="iconfont icon-d-zuohou"></i>左(东)视角</button>
            <button value="West" class="middle_btn"><i class="iconfont icon-d-youqian"></i>右(西)视角</button>
            <button value="Top" class="bottom_btn"><i class="iconfont icon-d-shang"></i>顶(俯)视角</button>
            <button value="Bottom" class="bottom_btn"><i class="iconfont icon-d-xia"></i>底(仰)视角</button>
            <p>标准视角</p>
        </div>
        <div class="panel_btn_box btn_box">
            <button :class="value.boolean ? 'active' : ''" :value="key" v-for="(value,key,index) in panelOption" :key="index" @click="panelClick(key)">{{value.name}}</button>
            <p>面板</p>
        </div>
        <div class="more-box" >
            <el-button-group>
            <el-button type="primary" @click="modelIntegrate">发起模型集成</el-button>
            <el-button  @click="getViewToken" >获取viewToken</el-button>
            <el-button type="primary" @click="getModelData">获取业务模型的楼层数据</el-button>
            <el-button  @click="loadModel_1">简单加载模型</el-button>
            <el-button type="primary" @click="loadModel_2">进阶加载模型</el-button>
            <el-button type="primary" @click="btn_addView">添加多个模型</el-button>
            </el-button-group>        
         </div>
    </div>
    <!-- 两棵树wrap -->
    <div class="tree_wrap" v-show="panelOption.tree.boolean">
        <!-- 楼层树wrap -->
        <small-wrap 
            title="单体 - 楼层" 
            wrapClass="floor_wrap" 
            iconClass="iconfont icon-louceng" 
            infoClass="floor_info">
            <tree slot="info" 
            v-if="modelData.building_floor_nodes"
            ref="floorTree" :treeData="modelData.building_floor_nodes"
            :isAllOpen="false" :isShowcheck="true" :isMultiple="true" @incheckednode="floorClick">
            </tree>
        </small-wrap>
        <!-- 专业树wrap -->
        <small-wrap 
            title="专业 - 构件类型" 
            wrapClass="major_wrap" 
            iconClass="iconfont icon-jianzhuzhu" 
            infoClass="floor_info">
            <tree slot="info" 
            v-if="modelData.majors"
            ref="majorTree" :treeData="modelData.majors" 
            :isAllOpen="true" :isShowcheck="true" :isMultiple="true" :depthShow="0" @incheckednode="majorClick">
            </tree>
        </small-wrap>
    </div>
    <!-- 属性表格wrap -->
    <small-wrap title="属性" wrapClass="type_wrap" iconClass="iconfont icon-bimiconlisto" infoClass="type_info" v-show="panelOption.type.boolean">
        <type-table slot="info" :typeInfos="typeInfos"></type-table>
    </small-wrap>
    <!-- 模型wrap -->
    <div id="model-wrap" :class="[!panelOption.tree.boolean ? 'left_active':'',
        !panelOption.type.boolean ? 'right_active':'',
            !panelOption.quantity.boolean ? 'bottom_active':'']"
            :style="panelOption.quantity.boolean?`bottom:${20+parseInt(tableHeight)}px`:''">
        <div id="bimfacebox">

        </div>
    </div>
    <!-- 工程量表格wrap -->
    <special-wrap title="工程量" height="190" 
        wrapClass="quantity_wrap" 
        iconClass="iconfont icon-86" 
        infoClass="quantity_info" 
        @clickUp="getWrapHeight" 
        :class="[panelOption.tree.boolean ? 'left_active':'',panelOption.type.boolean ? 'right_active':'']" 
        v-show="panelOption.quantity.boolean">
        <el-table :data="quantityData" :height="tableHeight-10" border stripe style="width: 100%">
                <el-table-column prop="specialty" label="专业" :resizable="false" min-width="10%">
                </el-table-column>
                <el-table-column prop="typeName" label="构件类型" :resizable="false" min-width="10%">
                </el-table-column>
                <el-table-column prop="spec" label="规格" :resizable="false" min-width="35%">
                </el-table-column>
                <el-table-column prop="name" label="工程量类型" :resizable="false" min-width="25%">
                </el-table-column>
                <el-table-column prop="unit" label="单位" :resizable="false" min-width="10%">
                </el-table-column>
                <el-table-column prop="value" :resizable="false" label="工程量" min-width="10%">
                </el-table-column>
            </el-table>
    </special-wrap>
</div>
</template>

<script>
var _viewer3D = null;
import Tree from "../components/tree";
import SmallWrap from "../components/SmallWrap";
import TypeTable from "../components/TypeTable";
import SpecialWrap from "../components/SpecialWrap";
export default {
  name: "modelBrowsing",
  title: "模型浏览",
  components: {
    Tree,
    SmallWrap,
    TypeTable,
    SpecialWrap
  },
  data() {
    return {
      btnValue: "select", //按钮群中的五个需要互斥效果的开关
      buildingIds: [], //楼层组,内部响应着tree的各项属性
      majorIds: [], //专业组,同上
      typeInfos: [], //构件属性
      quantityData: [], //构件工程量属性
      //面板按钮属性
      panelOption: {
        tree: {
          boolean: true,
          name: "图标树"
        },
        quantity: {
          boolean: true,
          name: "构件工程量"
        },
        type: {
          boolean: true,
          name: "属性"
        }
      },
      // bimface数据
      projectId: "11776527976344046843",
      fileId: 1275581195247424, //文件ID
      fileIdList: "",
      viewToken: "557288f01709411faa561b7df9fdd912",
      isShowViewHouse: true, //是否显示ViewHouse方向标
      isOpacity: true, //构件是否半透明
      modelData: {
        building_floor_nodes: "",
        elementTypeColorList: "",
        floor_revision_specialties: "",
        majors: ""
      },
      modelMap: {},
      tableHeight: "178"
    };
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
            return { floor_id: ele.floor_id, levelName: ele.name };
          }
        });
      }
      let modelMap = this.modelMap;
      //遍历获取所有的file_floorId的数组
      let file_floorIds = [];
      //用名称
      fid.forEach(ele => {
        file_floorIds.push({ levelName: ele.levelName });
      });
      //用file_floorId（模型内部id）
      //   let obj = {};
      //  fid.forEach(ele => {
      //     if (modelMap[ele.floor_id]) {
      //       //如果存在对应楼层id
      //       let arr = modelMap[ele.floor_id].split(",");
      //       arr.forEach(ele2 => {
      //         if (!obj[ele2]) {
      //           file_floorIds.push({ levelName: ele2 });//这里应该用file_floorIds
      //         }
      //       });
      //     }
      //   });
      let result = [];
      //获取构选的专业类型
      let majorArr = this.$refs.majorTree.recheckedchildNode();
      majorArr.forEach(ele => {
        file_floorIds.forEach(ele2 => {
          // let element_type = ele.element_type_id;
          //let element_type = ele.name;
          // result.push({levelName:ele2.levelName,categoryId:element_type})
          let element_type = ele.pId.split("_");
          result.push({
            levelName: ele2.levelName,
            categoryId: element_type.pop()
          });
        });
      });
      //console.log(JSON.stringify(file_floorIds));
      //  file_floorIds = [
      //   { levelName: "第2层", categoryId: 4 },
      //   { levelName: "第3层", categoryId: 4 },
      //   { levelName: "第4层", categoryId: 4 },
      //   { levelName: "首层", categoryId: 4 },
      // ];
      console.log(JSON.stringify(result));
      _viewer3D.showExclusiveComponentsByObjectData(result);

      _viewer3D.render();
    },
    majorClick(val) {
      console.log(val);
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
              that.viewer3D = viewer3D;
              _viewer3D = viewer3D;
              console.log(that.viewer3D);
              //隐藏方向标
              //viewer3D.hideViewHouse();
              let Viewer3DEvent = Glodon.Bimface.Viewer.Viewer3DEvent;
              //绑定点击事件获取选中的edo
              viewer3D.addEventListener(Viewer3DEvent.MouseClicked, function(
                edo
              ) {
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
              //console.log(progress);
            }
          );
        }
      }

      function failureCallback(error) {
        console.log(error);
      }
    },

    //模型操作按钮
    btnClick(event) {
      let command = event.target.value;
      console.log(command);
      if (command == "transparent_select" || command == "clip_plane") {
      }
      if (
        command == "select" ||
        command == "navigate" ||
        command == "_walk" ||
        command == "_pan"
      ) {
      } else if (command == "zoom_out") {
      } else if (command == "zoom_in") {
      } else if (command == "zoom_all") {
      } else if (command == "zoom_to_target") {
      }
    },
    //setView让三维模型回到标准视角
    btn_setView() {
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
        let val = event.target.value;
       _viewer3D.setView(val);
    },
    //添加一个模型到场景
    btn_addView() {
      _viewer3D.addView(this.viewToken3);
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
    //面板按钮点击
    panelClick(key) {
      this.panelOption[key].boolean =
        this.panelOption[key].boolean == true ? false : true;
    },
    getWrapHeight(e) {
      this.tableHeight = e;
    }
  },
  destroyed() {}
};
</script>

<style lang="less">
#layer {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 10;
  .layer_info {
    position: absolute;
    top: 30%;
    left: 50%;
    width: 300px;
    height: 60px;
    margin-left: -150px;
    p {
      font-size: 16px;
      color: white;
      text-align: center;
      line-height: 1.2;
    }
    #layer-line-wrap {
      width: 300px;
      height: 10px;
      border-radius: 0 10px 0 10px;
      border: 1px solid white;
    }
    #layer-line {
      width: 0;
      height: 10px;
      border-radius: 0 10px 0 10px;
      background-color: #00b0f0;
    }
  }
}
#model-browsing {
  width: 100%;
  height: 100%;
  .menu_btn_wrap {
    width: 100%;
    height: 110px;
    .btn_box {
      float: left;
      height: 90px;
      margin-top: 5px;
      padding: 0 5px;
      border-right: 1px solid #aaa;
      &:last-of-type {
        border-right: none;
      }
      button {
        height: 70px;
        padding: 0 12px;
        border: 1px solid #aaa;
        border-radius: 5px;
        background-color: #e4e8f1;
        .iconfont {
          display: block;
          height: 30px;
          font-size: 25px;
          line-height: 30px;
        }
        &.active {
          color: #000;
          border-color: #000;
          background-color: #fff;
        }
        &:hover {
          background-color: #fff;
        }
      }
      p {
        margin: 0;
        line-height: 22px;
        text-align: center;
      }
      &.view_btn_box {
        width: 265px;
        button {
          width: 82px;
          height: 24px;
          padding: 0;
          .iconfont {
            display: inline;
            font-size: 14px;
            line-height: 24px;
          }
          &.top_btn {
            border-radius: 5px 5px 0 0;
            border-bottom: none;
          }
          &.middle_btn {
            border-radius: 0;
          }
          &.bottom_btn {
            border-radius: 0 0 5px 5px;
            border-top: none;
          }
          &.active {
            color: #000;
            border-color: #000;
            background-color: #fff;
          }
          &:hover {
            background-color: #fff;
          }
        }
      }
      &.panel_btn_box {
        width: 105px;
        button {
          width: 95px;
          height: 24px;
          border: 1px solid #333;
          border-radius: 0;
          &:first-of-type {
            border-bottom: none;
            border-radius: 5px 5px 0 0;
          }
          &:last-of-type {
            border-top: none;
            border-radius: 0 0 5px 5px;
          }
          &.active {
            color: #000;
            border-color: #000;
            background-color: #fff;
          }
          &:hover {
            background-color: #fff;
          }
        }
      }
    }
    .more-box{
        float:right;
        width: 500px;
        .el-button{
            white-space: normal
        }
    }
  }
  .checkbox_con {
    .checkbox_inner {
      box-sizing: content-box;
    }
  }
  .tree_wrap {
    float: left;
    position: absolute;
    top: 110px;
    left: 5px;
    bottom: 15px;
    width: 240px;
  }
  .floor_wrap,
  .major_wrap {
    float: left;
    width: 240px;
    height: 50%;
    margin-bottom: 10px;
    .option_info {
      width: 235px;
      padding: 5px 0 0 10px;
    }
  }
  .type_wrap {
    float: right;
    right: 5px;
    position: absolute;
    width: 240px;
    top: 110px;
    bottom: 5px;
    .type_info {
      th {
        min-width: 119px;
      }
    }
  }
  #model-wrap {
    position: absolute;
    top: 110px;
    left: 250px;
    right: 250px;
    margin: 0;
    border: 1px solid red;
    &.left_active {
      left: 0;
    }
    &.right_active {
      right: 0px;
    }
    &.bottom_active {
      bottom: 5px;
    }
    #bimfacebox {
      width: 100%;
      height: 100%;
    }
  }
  .quantity_wrap {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 5px;
    margin: 0;
    &.left_active {
      left: 250px;
    }
    &.right_active {
      right: 250px;
    }
    .quantity_info {
      overflow: hidden;
      table {
        font-size: 12px;
        th {
          height: 22px;
          line-height: 22px;
        }
        td {
          height: 22px;
          line-height: 22px;
        }
      }
    }
  }
}
</style>
