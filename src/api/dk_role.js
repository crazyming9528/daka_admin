import request from '@/utils/request';

export function fetchRoleList() {

  return request({
    url: '/role/list',
    method: 'get',
  })

}

export function createRole(data) {
  return request({
    url: '/role/create',
    method: 'post',
    data
  })
}


export function updateRole(id, data) {
  return request({
    url: '/role/update/' + id,
    method: 'post',
    data
  })

}


export function deleteRoles(ids) {
  return request({
    url: '/role/delete',
    method: 'post',
    data: ids
  })

}

