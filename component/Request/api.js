import axios from 'axios'
//测试不能 url1 = "/api",上线时候改成 url1 = ""
const url1 = "https://gym.boysummer.top"
export function regist(username,password) {
  const url = url1+'/users/register'
  return  new Promise((resolve,reject) =>{
    axios.post(url,{username,password})
      .then((res)=>resolve(res.data)).catch((err)=>{
        console.log('出错了');
        console.log(err)
      reject(err);
    });
  })
}
export function login(username,password) {
  const url = url1+"/users/login"
  return  new Promise((resolve,reject) =>{
    axios.post(url,{username,password})
      .then((res)=>resolve(res.data)).catch((err)=>{
      reject(err);
    });
  })
}
//获取训练项目
export function gettrains(user_id) {
  const url = url1+"/trains/gettrains"
  return  new Promise((resolve,reject) =>{
    axios.get(url,{
      params:{
        user_id:user_id
      }
    })
      .then((res)=>resolve(res.data)).catch((err)=>{
      reject(err);
    });
  })
}
//添加训练项目
export function addTrainsName(user_id,train_name) {
  const url = url1+"/trains/addtrains"
  return  new Promise((resolve,reject) =>{
    axios.get(url,{
      params:{
        train_name:train_name,
        user_id:user_id

      }
    })
      .then((res)=>resolve(res.data)).catch((err)=>{
      reject(err);
    });
  })
}
//删除训练项目
export function removeTrainsName(user_id,train_name) {
  const url = url1+"/trains/removetrains"
  return  new Promise((resolve,reject) =>{
    axios.get(url,{
      params:{
        train_name:train_name,
        user_id:user_id
      }
    })
      .then((res)=>resolve(res.data)).catch((err)=>{
      reject(err);
    });
  })
}
//添加训练记录
export function addtrains(param) {
  const url = url1+"/trains/add"
  return  new Promise((resolve,reject) =>{
    axios.post(url,param)
      .then((res)=>resolve(res.data)).catch((err)=>{
      reject(err);
    });
  })
}
//获取训练类型,参数uid
export function getTrainKinds(user_id) {
  const url = url1+"/trains/gettrainkinds"
  return  new Promise((resolve,reject) =>{
    axios.get(url,{
      params:{
        user_id:user_id
      }
    })
      .then((res)=>resolve(res.data)).catch((err)=>{
      reject(err);
    });
  })
}



//根据训练类型获得训练日期和id，参数：user_id，train_kind
export function getTrainDateAndID(user_id,train_kind) {
  const url = url1+"/trains/gettraindate"
  return  new Promise((resolve,reject) =>{
    axios.get(url,{
      params:{
        user_id:user_id,
        train_kind:train_kind
      }
    })
      .then((res)=>resolve(res.data)).catch((err)=>{
      reject(err);
    });
  })
}
////背部训练所有动作的柱形图数据对比，参数：user_id，train_kind
export function getTrainContrast(user_id,train_kind) {
  const url = url1+"/trains/getcontrast"
  return  new Promise((resolve,reject) =>{
    axios.get(url,{
      params:{
        user_id:user_id,
        train_kind:train_kind
      }
    })
      .then((res)=>resolve(res.data)).catch((err)=>{
      reject(err);
    });
  })
}
//
export function getTrainNameByID(train_name_id) {
  const url = url1+"/trains/gettrainnamebyid"
  return  new Promise((resolve,reject) =>{
    axios.get(url,{
      params:{
        train_name_id:train_name_id
      }
    })
      .then((res)=>resolve(res.data)).catch((err)=>{
      reject(err);
    });
  })
}
