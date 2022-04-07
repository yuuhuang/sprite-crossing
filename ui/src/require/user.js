import {requireUrl} from './index';

export const reqCheckLogin = async () => {
  const res = await fetch(`${requireUrl}/checkuser`, {
    method: 'GET',
    credentials: 'include',
  });
  const data = await res.json();
  if (data.loginStatus) {
    return data.loginStatus;
  }

  return false;
}

export const reqSignup = async (email, password, nickname) => {
  try {
    const res = await fetch(`${requireUrl}/signup`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email, password, nickname
      })
    });
    const data = await res.json();
    if (data.errors) {
      return data.errors;
    }
  } catch (err) {
    console.log(err);
  }

  return true;
}

export const reqLogin = async (email, password) => {
  try {
    const res = await fetch(`${requireUrl}/login`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email, password
      })
    });
    const data = await res.json();
    if (data.errors) {
      return data.errors;
    }
  } catch (err) {
    console.log(err);
  }

  return true;
}

export const reqLogout = async () => {
  await fetch(`${requireUrl}/logout`, {
    method: 'GET',
    credentials: 'include',
  });

  return true;
}