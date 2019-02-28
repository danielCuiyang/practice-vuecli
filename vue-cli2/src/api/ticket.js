import request from '@/utils/request'

export function invoiceSave(form) {
  return request({
    url: '/invoice/save',
    method: 'post',
    data:{
        token:"eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1c2VyX2lkIjoiMyIsImRldmljZV9pZCI6IjMiLCJkYXRlIjoxNTUxMTU3NzY3fQ.MchVkVv9xhiwFlMQZ1CcmvfSVgBqiY9D_qD3iCcT548lBxLHvcyW0Uaus0pVz6SLSr1qqpVD8LGIU1CRSZt6zJg8vDT2za9Gh1V-Q91KTsJiRUWfUxFWK6x_xPY78_BUIXP09GQko6PeZjoM_3tQAXgg0Qv2curqHn-40o7K-FA",
        character:form.character,
        device_id:"",
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
export function invoiceDetail() {
  return request({
    url: '/invoice/detail',
    method: 'get',
    params:{
        token:"eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1c2VyX2lkIjoiMyIsImRldmljZV9pZCI6IjMiLCJkYXRlIjoxNTUxMTU3NzY3fQ.MchVkVv9xhiwFlMQZ1CcmvfSVgBqiY9D_qD3iCcT548lBxLHvcyW0Uaus0pVz6SLSr1qqpVD8LGIU1CRSZt6zJg8vDT2za9Gh1V-Q91KTsJiRUWfUxFWK6x_xPY78_BUIXP09GQko6PeZjoM_3tQAXgg0Qv2curqHn-40o7K-FA",
        // DeceiveId:"",
        id:3
    }
  })
}
