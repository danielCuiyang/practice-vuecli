import request from '@/utils/request'

export function getTrdList(regname,page) {
  return request({
    url: '/hold_tradmark',
    method: 'post',
    data:{
        regname:regname,
        page:page,
        pagesize:20
    }
  })
}

export function tmCertified(registrant_hash) {
  return request({
    url: '/hold_tradmark/certified',
    method: 'post',
    data:{
      registrant_hash:registrant_hash
    }
  })
}
