const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

export const getStoredToken = () => localStorage.getItem('ctms_access_token');

const request = async (path, options = {}) => {
  const token = getStoredToken();
  const headers = new Headers(options.headers || {});
  headers.set('Content-Type', 'application/json');

  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  const response = await fetch(`${API_BASE_URL}${path}`, { ...options, headers });
  const body = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(body?.detail || `Request failed with status ${response.status}`);
  }

  return body;
};

export const login = async (email, password) => {
  const result = await request('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
  localStorage.setItem('ctms_access_token', result.access_token);
  return request('/auth/me');
};

export const logout = () => localStorage.removeItem('ctms_access_token');
export const getCurrentUser = () => request('/auth/me');
export const getStudies = () => request('/studies');
export const getPortfolio = () => request('/integration/portfolio');
export const getFhirResource = (resourceType, resourceId) =>
  request(`/integration/fhir/r4/${resourceType}/${resourceId}`);
export const getAuditTrail = (entityType) =>
  request(`/audit/trail${entityType ? `?entity_type=${encodeURIComponent(entityType)}` : ''}`);

export const createStudy = (payload) => request('/studies', {
  method: 'POST',
  body: JSON.stringify(payload),
});