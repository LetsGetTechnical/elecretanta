const getUserAvatar = async () => {
  const response = await fetch('api/getUserAvatar', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
  const userAvatar = await response.json();
  return userAvatar;
};

export default getUserAvatar;
