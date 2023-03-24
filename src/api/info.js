import axios from "../axios";
import qs from "qs"

// 列表数据查询接口
const getInfoList = () => {
  return new Promise((resolve, reject) => {
    axios
      .get("/info")
      .then((res) => resolve(res.data))
      .catch((err) => reject(err));
  });
};

// 新增信息
const addInfo = (params) => {
  // 如果使用的qs进行序列化
  // 那么content-type就是application/x-www-form-urlencoded
  // 也就是常说的表单提交传输的样式是formdata
  // 不加的话是content-type: application/json; charset=utf-8
  return new Promise((resolve, reject) => {
    axios
    //   .post("/info", params)
      .post("/info", qs.stringify(params))
      .then((res) => resolve(res.data))
      .catch((err) => reject(err));
  });
};

// 删除信息
const deleteInfo = (id) => {
  return new Promise((resolve, reject) => {
    axios
      .delete(`/info/${id}`)
      .then((res) => resolve(res.data))
      .catch((err) => reject(err));
  });
};

// 修改信息
const editInfo = (params) => {
  return new Promise((resolve, reject) => {
    axios
      .put(`/info`, qs.stringify(params))
      .then((res) => resolve(res.data))
      .catch((err) => reject(err));
  });
};

export { getInfoList, addInfo, deleteInfo, editInfo };
