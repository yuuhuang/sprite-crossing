import {requireUrl} from './index';

export const reqGetUser = async nickname => {
  let data;
  try {
    const res = await fetch(`${requireUrl}/userinfo`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nickname,
      }),
    });
    data = await res.json();
    if (data.errors) {
      console.log(data.errors);

      return {};
    }
  } catch (err) {
    console.log(err);

    return {};
  }

  return data;
}

// eslint-disable-next-line max-lines-per-function
export const reqPostUser = async user => {
  // eslint-disable-next-line prefer-const
  const {nickname, avatar, bio, backgroundImage} = user;
  let data, avatarFile, backgroundFile;

  try {
    if (avatar.name) {
      const formData = new FormData();
      formData.append('avatar', avatar);
      const result = await fetch(`${requireUrl}/upload/avatar`, {
        method: 'POST',
        body: formData,
      });
      const resultData = await result.json();
      avatarFile = resultData.success ? resultData.filename : '';
    }
    if (backgroundImage.name) {
      const formData = new FormData();
      formData.append('background', backgroundImage);
      const result = await fetch(`${requireUrl}/upload/background`, {
        method: 'POST',
        body: formData,
      });
      const resultData = await result.json();
      backgroundFile = resultData.success ? resultData.filename : '';
    }
    const res = await fetch(`${requireUrl}/update/profile`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nickname, avatar: avatarFile || '', bio, backgroundImage: backgroundFile || ''
      }),
    });
    data = await res.json();
    if (data.errors) {
      console.log(data.errors);

      return false;
    }
  } catch (err) {
    console.log(err);

    return false;
  }

  return data;
}