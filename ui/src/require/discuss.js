import {requireUrl} from './index';

export const reqGetDiscuss = async id => {
  try {
    const result = await fetch(`${requireUrl}/discuss`, {
      method: 'POST',
      body: JSON.stringify({id}),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return await result.json();
  } catch (err) {
    console.log(err);

    return {};
  }
}

export const reqGetAllDiscusses = async () => {
  try {
    const result = await fetch(`${requireUrl}/discuss/list`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return await result.json();
  } catch (err) {
    console.log(err);

    return {};
  }
}

export const reqPostDiscuss = async (title, description) => {
  try {
    const result = await fetch(`${requireUrl}/discuss/post`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title, description
      }),
    });

    return await result.json();
  } catch (err) {
    console.log(err);

    return false;
  }
}

export const reqPostComment = async comment => {
  try {
    const {text, uploadTime, id} = comment;
    const result = await fetch(`${requireUrl}/discuss/comment`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text, uploadTime, id
      }),
    });

    return await result.json();
  } catch (err) {
    console.log(err);

    return false;
  }
}

export const reqPostReply = async comment => {
  try {
    const {id, commentIndex, text, uploadTime, replyTo} = comment;
    const result = await fetch(`${requireUrl}/discuss/reply`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id, commentIndex, text, uploadTime, replyTo
      }),
    });

    return await result.json();
  } catch (err) {
    console.log(err);

    return false;
  }
}

export const reqViewDiscuss = async id => {
  try {
    const result = await fetch(`${requireUrl}/discuss/view`, {
      method: 'POST',
      body: JSON.stringify({id}),
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return await result.json();
  } catch (err) {
    console.log(err);

    return {};
  }
}