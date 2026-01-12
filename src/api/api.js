const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

// Read the JWT from localStorage (if it exists).
const getToken = () => {
  if (typeof localStorage === 'undefined') {
    return null;
  }

  return localStorage.getItem('token');
};

// Build a full URL using the base API URL and optional query params.
const buildUrl = (path, params) => {
  const base = API_BASE_URL || window.location.origin;
  const url = new URL(path, base);

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        url.searchParams.set(key, value);
      }
    });
  }

  return url.toString();
};

const parseJson = async (response) => {
  try {
    return await response.json();
  } catch {
    return null;
  }
};

// Send a JSON request and normalise errors into { error, code }.
const request = async (path, options = {}) => {
  const { method = 'GET', body, headers = {}, params } = options;
  const url = buildUrl(path, params);
  const token = getToken();
  const requestHeaders = { ...headers };

  if (body !== undefined) {
    requestHeaders['Content-Type'] = 'application/json';
  }

  // Attach Authorisation header when a token is available.
  if (token) {
    requestHeaders.Authorization = `Bearer ${token}`;
  }

  try {
    const response = await fetch(url, {
      method,
      headers: requestHeaders,
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
    const data = await parseJson(response);

    if (!response.ok) {
      const error = data?.error || response.statusText || 'Request failed';
      const code = data?.code || response.status;
      throw { error, code };
    }

    return data;
  } catch (err) {
    if (err?.error) {
      throw err;
    }

    throw { error: 'Network error', code: 'network_error' };
  }
};

const get = (path, options) => request(path, { ...options, method: 'GET' });
const post = (path, body, options) => request(path, { ...options, method: 'POST', body });
const put = (path, body, options) => request(path, { ...options, method: 'PUT', body });
const del = (path, options) => request(path, { ...options, method: 'DELETE' });

export { buildUrl, request, get, post, put, del };
