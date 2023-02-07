import request from '../../utils/request';

export async function getProperties() {
  return request('/real_estate_api/properties', {
    method: 'GET',
  });
}

export async function postProperty(data: any) {
  return request('/real_estate_api/properties', {
    method: 'POST',
    data
  });
}

export async function uploadPropertyImage(data: any, property_id: string) {
  return request(`/real_estate_api/properties/${ property_id }/upload`, {
    method: 'POST',
    data
  });
}

export async function updateProperty(data: any, property_id: string) {
  return request(`/real_estate_api/properties/${ property_id }`, {
    method: 'PUT',
    data
  });
}

export async function deleteProperty(property_id: string) {
  return request(`/real_estate_api/properties/${ property_id}`, {
    method: 'DELETE',
  });
}
