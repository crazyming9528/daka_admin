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


export function fetchAdmDetail(id) {
  return request({
    url: '/admin/get/' + id,
    method: 'get',

  })

}


export function updateAdmin(id, data) {
  return request({
    url: '/admin/update/' + id,
    method: 'post',
    data
  })

}


export function deleteAdmin(id) {
  return request({
    url: '/admin/delete/' + id,
    method: 'post',
  })

}

