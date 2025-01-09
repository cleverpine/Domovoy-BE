const PREFFERED_TIMEZONE = 'outlook.timezone="E. Europe Standard Time"';

const fetchWithHeaders = async (url, token, body, method) => {
  const response = await fetch(url, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      Prefer: PREFFERED_TIMEZONE,
      Accept: 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errorText = await response.text();
    const error = new Error(`HTTP Error ${response.status}: ${response.statusText} - ${errorText}`);
    error.status = response.status;
    throw error;
  }

  return response.json();
};

module.exports = fetchWithHeaders;
