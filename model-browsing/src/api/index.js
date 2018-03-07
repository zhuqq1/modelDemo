/*
 * @Name: 模型浏览-接口路径
 * @Author: 李荣男
 * @Date: 2017-11-15 17:43:37
 * @Last Modified by: 李荣男
 */
//基础路径
const baseUrl = '/api';
const apiVersion = "/v1"
const api = {
    //获取模型及相应的各种信息
    fetchModelData: (projectId) => `${baseUrl}/v1/projects/${projectId}/model/data`,
    //获取模型文件
    //fetchGetModel: (projectId) => `${baseUrl}/v1/projects/${projectId}/model/revisions/`,
    //获取构件属性和工程量等信息
    fetchGetModelType: (projectId, edoId) => `${baseUrl}/v1/projects/${projectId}/model/edos/${edoId}`
};

export function url(name, _store, params = {}) {
    if (_store) {
        params.id = _store.state.projectId;
    }
    return baseUrl + apiVersion + api[name](params);
}
export default api;