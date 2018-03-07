/*
 * @Name: 模型组件
 * @Author: 李荣男
 * @Date: 2017-11-17 15:16:09
 * @Last Modified by: 李荣男
 */
<template>
    <div id="model">
            <div id="modelViewer-div" style="position:absolute;width:100%;top:0;bottom:0;" v-if="ActiveXObj">
                <object id="modelViewer" classid="CLSID:CD2ABD6C-576F-4236-9EBE-B491593D9B90" style="width: 100%; height: 100%;" align="middle" >
                    <param name="_Version" value="65536">
                    <param name="_ExtentX" value="2646">
                    <param name="_ExtentY" value="1323">
                    <param name="_StockProps" value="0">
                </object>
            </div>
            <div class="progress" id="progress-bar">
                <div id="progress-label" v-html="failedInfo" style="position:absolute;left:0;right:0;text-align: center"></div>
            </div>
    </div>
</template>

<script>
import modelFunc from "../utils/model";
export default {
    name:'model',
    props: {
        //定义构件颜色
        colorList: {
            type: Array,
            default: function() {
                return []
            }
        },
        //楼层专业对应表
        floorRevisionSpecialties:{
            type: Array,
            default: function() {
                return []
            }
        }
    },
    data() {
        return {
            ActiveXObj: false, //判断是否支持模型加载
            failedInfo:'',//加载错误提示内容
        };
    },
    watch: {
        colorList:function(){
            //颜色传来后即可检查浏览器是否支持模型预览
            modelFunc.check5d(this,this.floorRevisionSpecialties);
        },
        deep: true
    },
    created() {
        //判断浏览器,除IE外都不展示模型,并给提示
        if (window.ActiveXObject || "ActiveXObject" in window) {
            this.ActiveXObj = true;
            }
    }
};
</script>

<style lang="less">
#model {
    position: relative;
    overflow: hidden;
    width: 100%;
    height: 100%;
    top: 1200px;
    position: relative;
    &.active {
        top: 0;
    }
    #progress-bar {
        position: absolute;
        width: 100%;
        z-index: 10;
        margin-bottom: 0px;
        border-radius: 0;
        top: 200px;
        height: 15px;
        font-size: 10px;
    }
}
</style>
