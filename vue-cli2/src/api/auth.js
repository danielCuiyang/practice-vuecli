import request from '@/utils/request'

export function upload(file) {
  file.append('source_type',3)
  file.append('source_id',1)
  file.append('rank',0)
   return request({
    url: '/attachments/upload',
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data:file,
    transformRequest: [function (data) {
      // form data 上传  不需要 qs.stringfy(data)
      return data;
    }],
  })
}

export function authPC(imgsId,type){
  return request({
    url: 'hold_tradmark/auth',
    method: 'post',
    data:{
      uid:1,
      type:type,//公司2 个人1
      registrant_hash:'46554', //商标注册实体hash值
      imgs:imgsId
    }
  })
}



 