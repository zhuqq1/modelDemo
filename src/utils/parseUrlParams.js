import qs from 'qs'
export default{
  methods:{
    /**
     * 外部嵌入，解析url中携带的参数
     * @param {String} showHeader  [是否显示header default:true]
     * @param {String} detailId  [详情id default:null]
     * @param {String} access_token  [外部引用需要传递的参数 default:null]
     * @return {Object}
     */
    parseUrl () {
      let url = window.location.href
      let param = url.split('?')[1]
      if(param){
        param = qs.parse(param)
        return param
      } else {
        return {}
      }
    }
  }
};
