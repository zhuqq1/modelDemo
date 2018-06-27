//基础路径
const baseUrl = '/api';
const apiVersion = "/v1";
//全部分离后需要在头部加入"CLIENTVERSION":"V1"
const CLIENTVERSION = 'V1';
const api = {
    fetchFileId: (projectId) => `${baseUrl}/v1/projects/${projectId}/bimface/tranFileList`,
    fetchViewToken: (projectId, fileId) => `${baseUrl}/v1/projects/${projectId}/bimface/getViewToken?fileId=${fileId}`,
    fetchModelData: (projectId) => `${baseUrl}/v1/projects/${projectId}/model/data`,
    fetchBimfaceTree: (integrateId) => `${baseUrl}/v2/integrations/${integrateId}/tree`,
    //模型集成put
    fetchModelIntegrate: (projectId) => `${baseUrl}/v1/bimface/integrate`,
};

export default api;