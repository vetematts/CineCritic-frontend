export const getJwtPayload = (token) => {
  if (!token) {
    return null;
  }

  try {
    const payloadPart = token.split('.')[1];
    if (!payloadPart) {
      return null;
    }

    const normalised = payloadPart.replace(/-/g, '+').replace(/_/g, '/');
    const decoded = atob(normalised);
    return JSON.parse(decoded);
  } catch {
    return null;
  }
};
