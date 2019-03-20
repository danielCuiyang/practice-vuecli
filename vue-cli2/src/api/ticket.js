import request from '@/utils/request'

export function invoiceSave(form) {
  return request({
    url: '/invoice/save',
    method: 'post',
    data:{
        character:form.character,
        be_made:form.be_made,
        subject_name:form.subject_name,
        bank_deposit:form.bank_deposit,
        general:form.general,
        bank_account:form.bank_account,
        remark:form.remark,
        tax_point:form.tax_point,
        card_number:(form.be_made==1 ? form.idcard : form.tfn),
        id:form.id
    }
  })
}
export function invoiceDetail(id) {
  return request({
    url: '/invoice/detail',
    method: 'get',
    params:{
        id:id
    }
  })
}
