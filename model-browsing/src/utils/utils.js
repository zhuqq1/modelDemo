let util = {

};

/**
 * 页面添加title的方法
*/
util.title = function (title) {
    title = title ? title : 'Glodon BIM5D';
    window.document.title = title;
};


util.parseResponse=function(res){
    if(res && res.code==0){
        return res.data;
    }else{
        return -1;
    }
}

util.result=function(res,defaultValue){
    if(res && res.code==0){
        return res.data
    }
    return defaultValue;
},

util.pass=function(res){
    if(res && res.code==0 && res.message=="success"){
        return true;
    }
    return false;
}

/**
 * [treeToList description]
 * 用于将树结构数据、转换带层级关系的列表数据
 * @Author    WangBing
 * @DateTime  2017-09-04
 * @copyright [copyright]
 * @license   [license]
 * @version   [version]
 * @param     {[type]}
 * @return    {[type]}
 */
util.treeToList=function(data){
    let result=[];
    let uuid=(function(){
        var flag=1;
        return function(){
            flag++;
            return flag;
        }
    }());

    let toTable=function(data,level=0,pid="root"){
        level++
        data.map(item=>{
            item.$uuid=uuid();
            item.$pid=pid;
            item.$level=item.level||level;
            item.$isShow=(level==1?true:false);
            item.$isExpand=false;
            result.result.push(item);
            if(item.children){
                this.toTable(item.children,item.$level,item.$pid+"-"+item.$uuid);
                item.$isLeaf=false;
            }else{
                item.$isLeaf=true;
            }
        })
    }
    toTable(data);
}

util.arrayToTree=function(data,pid,id){

        //temp 用于存储没有找到父节点的数据
        //tree 用于存储已经遍历完成的树节点数据
        var temp=[],
            tree=[],
            tempNode={};
        //首先把父节点的数据过滤出来
        data.map(function(item){
            if(!item[pid] || item[pid]==item[id]){
                item.$path=item[id];
                tree.push(item);
            }else{
                temp.push(item);
            }
        })
        //用于在父节点中查找某个key的值为value的节点
        function loopTree(data,key,value){
            data.map(function(item){
                if(item[key]==value){
                    tempNode=item;
                }else if(item.children){
                    loopTree(item.children,key,value);
                }

            })
            return tempNode;
        }

        //遍历没有归属的节点数据、直到temp数据为空、或者为垃圾数据
        function loop(data){
            var len=data.length,
                temp=[];
            data.map(function(item,index){
                var node=loopTree(tree,id,item[pid]);
                if(node){
                    node.children=node.children||[];
                    item.$path=node.$path+"@@"+item[id];
                    node.children.push(item)
                }else{
                    temp.push(item);
                }
                if(len==(index+1)){
                    if(temp.length>0 && temp.length < len){
                        loop(temp);
                    }
                }
            })
        }

        loop(temp)

        return tree;

}

/**
 *  @比较新旧两个函数，返回被删除的数组和新添加的数组
 *  @params oldArr：旧数组
 *  @params newArr 新数组
 *
*/

util.addArr = function (oldArr, newArr) {
    var oldLen = oldArr.length;
    var newLen = newArr.length;
    var arr = [];
    for (var i = 0; i < oldLen; i++) {
        for (var j = 0; j <  newLen; j++) {
            if (oldArr[i] == newArr[j]) {
                arr.push(oldArr[i]);
            }
        }
    }
    var addArr = [];
    for (var n = 0; n < newLen; n++) {
        if (arr.indexOf(newArr[n]) < 0) {
            addArr.push(newArr[n]);
        }
    }
    return addArr;
}

util.delArr =  function(oldArr, newArr) {
    var oldLen = oldArr.length;
    var newLen = newArr.length;
    var arr = [];
    for (var i = 0; i < oldLen; i++) {
        for (var j = 0; j <  newLen; j++) {
            if (oldArr[i] == newArr[j]) {
                arr.push(oldArr[i]);
            }
        }
    }
    var delArr = [];
    for (var n = 0; n < oldLen; n++) {
        if (arr.indexOf(oldArr[n]) < 0) {
            delArr.push(oldArr[n])
        }
    }
    return delArr;
}

/**
 * @ 获取cookie方法；
 * @params key需要获取的键值；
*/
util.getCookie = function (key) {
    var cookieArr = document.cookie.split('; ');
    for(var i = 0; i < cookieArr.length; i++) {
        var arr = cookieArr[i].split('=');
        if(arr[0] === key) {
            return arr[1];
        }
    }
    return false;
}

util.setCookie = function(key, value, iDay) {
    if (iDay > 0) {
        var oDate = new Date();
        oDate.setDate(oDate.getDate() + iDay);
        // Cookie 的expires 属性指定浏览器可发送Cookie 的有效期。当省略expires 属性时，Cookie仅在浏览器关闭之前有效。
        document.cookie = key + '=' + value + ';expires=' + oDate + ';path=/';
    } else {
        document.cookie = key + '=' + value + ';path=/';
    }
}
util.deleteCookie =function(name) {
    util.setCookie(name, "", -1);
}
/**
 * 数组转递归
 * @param  {Array} data   [数据源]
 * @param  {Object} option [配置项]
 * id 默认为id
 * label 默认设置中的key
 * labelName tree中的key(label所对应的值)
 * parent   父id key
 * @return {Array}        [递归数组]
 */
util.getTree =  function(data, option) {
    let targetId = option.id ? option.id : 'id';
    let label = option.label|| "name";
    let labelName = option.labelName ||'label';
    let parent = option.parent|| "_parentId";
    function a(data, id, child) {
        let result = [], temp;
        child = child ? child : 'children';
        let _len = data.length;
        for (let i = 0; i < _len; i++) {
            let item = data[i];
            if (item[parent] == id) {
                let obj = {};
                for (let key in item) {
                    obj[key] = item[key]
                }
                obj[labelName] = item[label];
                obj.id = item[targetId];
                temp = a(data, item[targetId], child);
                if (temp.length > 0) {
                    obj[child] = temp;
                }
                result.push(obj);
            }
        }
        return result;
    }
    return a(data)
}
//获取递归数组中除了本身及其子节点以外的数据
util.getTreeFilter =  function(data,value,option) {
    if(!option){option={}}
    let targetId = option.id ? option.id : 'id';
    let label = option.label|| "name";
    let labelName = option.labelName ||'label';
    let parent = option.parent|| "_parentId";
    function a(data, id, child) {
        let result = [], temp;
        child = child ? child : 'children';
        let _len = data.length;
        for (let i = 0; i < _len; i++) {
            let item = data[i];
            if (item[parent] == id && item[targetId]!=value) {
                let obj = {};
                for (let key in item) {
                    obj[key] = item[key]
                }
                obj[labelName] = item[label];
                obj.id = item[targetId];
                temp = a(data, item[targetId], child);
                if (temp.length > 0) {
                    obj[child] = temp;
                }
                result.push(obj);
            }
        }
        return result;
    }
    return a(data)
}
util.getTreeList = function(arr, parentId, selfId,rootId){
    let rootList = [];
    for (let i = 0; i < arr.length; i++) {
        let obj = arr[i];
        if (!obj[parentId] || obj[parentId] === rootId) {
            rootList.push(obj);
        }
    }
    let result = [];
    for (let j = 0; j < rootList.length; j++) {
        let dataInfo = rootList[j];
        this.getChildList(dataInfo, arr, parentId, selfId);
        result.push(dataInfo);
    }
    return rootList;
}
util.getChildList = function(parentVo, arr, parentId, selfId){
    let a = [];
    for (let i = 0; i < arr.length; i++) {
        let dataInfo = arr[i];
        if (dataInfo[parentId] == parentVo[selfId]) {
            a.push(dataInfo);
            this.getChildList(dataInfo, arr, parentId, selfId);
        }
    }
    if (a.length > 0) {
        parentVo.children = a;
    }
}

export function Debounce(fn, delay) {
    this.timeout = 0;
    this.fn = fn;
    this.delay = delay;

    this.stop = function() {
        clearTimeout(this.timeout);
    }

    this.run = function(excutor, delay) {
        this.stop();
        var fn = excutor || this.fn;
        var delayTime = delay || this.delay;
        this.timeout = setTimeout(function() {
            fn();
        },
        delayTime);
    }
}

export default util;
