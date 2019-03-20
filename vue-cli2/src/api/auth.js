import request from '@/utils/request'

export function upload(file,id) {
  file.append('source_type',3)
  file.append('rank',id)
   return request({
    url: '/attachments/upload',
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data:file,
  })
}

export function authPC(imgsId,type,registrant_hash){
  return request({
    url: 'hold_tradmark/auth',
    method: 'post',
    data:{
      type,//公司2 个人1
      registrant_hash, //商标注册实体hash值
      imgs:imgsId
    }
  })
}



 