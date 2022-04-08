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