/*
 * @Name: 带title的盒子小组件
 * @Author: 李荣男
 * @Date: 2017-11-17 15:13:56
 * @Last Modified by: 李荣男
 */
<template>
    <div class="option_wrap" :class="wrapClass">
        <div class="option_title"><i :class="iconClass"></i>{{title}}</div>
        <div class="option_info" :class="[infoClass,banWidth ? '' : 'info_width']">
            <slot name="info">

            </slot>
        </div>
    </div>
</template>

<script>
export default {
name:"SmallWrap",
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
    }
},
data(){
    return {

    }
}
}
</script>

<style lang="less">
.option_wrap {
        position: relative;
        box-sizing: border-box;
        background-color: #fff;
        border: 1px solid #aaa;
        border-radius: 5px;
        overflow: hidden;
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
