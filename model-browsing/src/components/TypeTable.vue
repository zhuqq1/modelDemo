/*
 * @Name: 模型属性展示组件
 * @Author: 李荣男
 * @Date: 2017-11-17 15:13:24
 * @Last Modified by: 李荣男
 */
<template>
    <table class="type_table">
        <tr>
            <th>属性项</th>
            <th>属性值</th>
        </tr>
        <tr :key="index" v-for="(typeInfo,index) in typeInfos">
            <td>{{typeInfo.key}}</td>
            <td>{{typeInfo.value}}</td>
        </tr>
    </table>
</template>

<script>
export default {
    name:"typeTable",
    props:{
        typeInfos:{
            type:Array,
            default:function(){
                return []
            }
        }
    }
}
</script>

<style lang="less">
    .type_table {
        margin-left: -1px;
        margin-top: -1px;
        border-spacing: 0;
        border-collapse: collapse;
        border: 1px solid #ccc;
        font-size: 12px;
        th {
            height: 26px;
            line-height: 26px;
            padding: 0 10px;
            text-align: left;
            font-weight: 100;
            background-color: #e4e8f1;
        }
        td {
            height: 26px;
            line-height: 26px;
            padding: 0 10px;
            white-space: nowrap;  
            border: 1px solid #ccc;
        }
    }
</style>
