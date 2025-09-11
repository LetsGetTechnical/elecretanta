const getUserAvatar = async (): Promise<string> => {
  const response = await fetch('api/getUserAvatar', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
  const userAvatar = await response.json();
  return userAvatar.avatarUrl;
};

export default getUserAvatar;
