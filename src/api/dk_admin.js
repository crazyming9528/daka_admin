import request from '@/utils/request';

export function adminRegister(data) {
  return request({
    url: '/admin/register',
    method: 'post',
    data
  })

}


export function fetchAdminList(params) {
  return request({
    url: '/admin/listAdmin',
    method: 'get',
    params,
  })

}

