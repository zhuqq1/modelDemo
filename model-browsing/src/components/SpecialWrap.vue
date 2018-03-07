/*
 * @Name: 支持顶部拖拽的盒子小组件
 * @Author: 李荣男
 * @Date: 2017-11-17 15:13:56
 * @Last Modified by: 李荣男
 */
<template>
    <div class="spe_option_wrap" 
    :class="wrapClass" 
    :style="[width == 'none' ? '' : wrapWidth,
        height == 'none' ? '' : wrapHeight]">
        <i class="clicked_line" :class="startTouch?'active':''" @mousedown="touchFunc" style="top:-1px"></i>
        <div class="option_title"><i :class="iconClass"></i>{{title}}</div>
        <div class="option_info" :class="[infoClass,banWidth ? '' : 'info_width']">
            <slot>

            </slot>
        </div>
    </div>
</template>

<script>
export default {
name:"SpecialSmallWrap",
title:"wrap",
props:{
    //title名
    title:{
        type:String,
        default:''
    },
    //最外层div自定义class名
    wrapClass:{
        type:String,
        default:''
    },
    //title小图标的class名
    iconClass:{
        type:String,
        default:''
    },
    //内容div自定义class名
    infoClass:{
        type:String,
        default:''
    },
    //是否要取消内容div的宽度100%,适用于需要出现横向滚动条的表格
    banWidth:{
        type:Boolean,
        default:false
    },
    width:{
        type:String,
        default:"none"
    },
    height:{
        type:String,
        default:"none"
    }
},
data(){
    return {
        startTouch:false,//拖拽事件
        numX:0,//鼠标拖拽时的横坐标
        numY:0,//鼠标拖拽时的纵坐标
        newWidth:0,
        newHeight:0,
        wrapWidth:{
            width:0
        },
        wrapHeight:{
            height:0
        },
        domElement:"",
        mouseInfo:{
            x:0,
            y:0
        }
    }
},
created(){
    let that = this
    this.newWidth = this.width
    this.newHeight = this.height
    this.wrapWidth.height = this.newWidth + "px" 
    this.wrapHeight.height = this.newHeight + "px" 
    window.moveMouse = function(e){
            that.mouseInfo.x = e.pageX - that.numX 
            that.mouseInfo.y = e.pageY - that.numY
            that.domElement.style.top = -(1 - that.mouseInfo.y) + "px"
            let dom = document.getElementById("model-wrap")
            dom.style.bottom = that.top - that.mouseInfo.y + "px"
        }
    window.finishTouchFunc = function(){
            that.domElement.style.top = "-1px"
            that.newHeight = parseInt(that.newHeight) - parseInt(that.mouseInfo.y)
            that.wrapHeight.height = that.newHeight + "px"
            that.startTouch = false
            that.$emit("clickUp",that.newHeight)
            document.body.removeEventListener("mousemove",window.moveMouse,false)
            document.body.removeEventListener("mouseup",window.finishTouchFunc,false)
        }
},
methods: {
        //拖拽-鼠标落下
        touchFunc(e){
            this.startTouch = true
            this.numX = e.pageX
            this.numY = e.pageY
            this.domElement = e.target
            this.top = parseInt(document.getElementById("model-wrap").style.bottom)
            document.body.addEventListener("mousemove",window.moveMouse,false)
            document.body.addEventListener("mouseup",window.finishTouchFunc,false)
        },
}
}
</script>

<style lang="less">
.spe_option_wrap {
        position: absolute;
        box-sizing: border-box;
        background-color: #fff;
        border: 1px solid #aaa;
        border-radius: 5px;
        z-index: 10;
        .clicked_line{
            position: absolute;
            display: block;
            width:100%;
            height: 0;
            border: 2px solid transparent;
            z-index:999;
            cursor:n-resize;
            &.active{
                border: 1px solid #1d90e6;
            }
        }
        .option_title {
            display: inline-block;
            width: 100%;
            height: 29px;
            font-size: 14px;
            text-align: left;
            text-indent: 10px;
            line-height: 30px;
            color: #48576a;
            background-color: #e4e8f1;
            border-bottom: 1px solid #aaa;
            border-radius: 5px 5px 0 0;
            .iconfont{
                height: 29px;
                line-height: 30px;
                margin-right:5px;
            }
        }
        .option_info {
            box-sizing: border-box;
            position: absolute;
            top:29px;
            bottom:0;
            overflow: auto;
            &.info_width{
                width: 100%;
            }
        }
    }
</style>
