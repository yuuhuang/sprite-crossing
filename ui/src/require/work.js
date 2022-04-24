import {requireUrl} from './index';

export const reqGetWork = async image => {
  try {
    const result = await fetch(`${requireUrl}/work`, {
      method: 'POST',
      body: JSON.stringify({image}),
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

export const reqGetAllWorks = async () => {
  try {
    const result = await fetch(`${requireUrl}/workslist`, {
      method: 'GET',
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

export const reqPostWork = async work => {
  const {image, title, description, tags} = work;
  let imageUrl;

  try {
    const formData = new FormData();
    formData.append('work', image);
    const resultImg = await fetch(`${requireUrl}/upload/work`, {
      method: 'POST',
      body: formData,
    });
    const resultDataImg = await resultImg.json();
    if (resultDataImg.success) {
      imageUrl = resultDataImg.filename;
    } else {
      throw resultDataImg.error;
    }

    const result = await fetch(`${requireUrl}/work/publish`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        image: imageUrl, title, description, tags,
      }),
    });
    const resultData = await result.json();
    if (resultData.errors) {
      console.log(resultData.errors);

      return false;
    }
  } catch (err) {
    console.log(err);

    return false;
  }

  return true;
}

export const reqViewWork = async image => {
  try {
    const result = await fetch(`${requireUrl}/work/view`, {
      method: 'POST',
      body: JSON.stringify({image}),
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

export const reqLikeWork = async image => {
  try {
    const result = await fetch(`${requireUrl}/work/like`, {
      method: 'POST',
      body: JSON.stringify({image}),
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return await result.json();
  } catch (err) {
    console.log(err);

    return {err};
  }
}

export const reqCommentWork = async comments => {
  try {
    const {image, text, uploadTime, replyTo} = comments;
    const result = await fetch(`${requireUrl}/work/comment`, {
      method: 'POST',
      body: JSON.stringify({image, text, uploadTime, replyTo}),
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return await result.json();
  } catch (err) {
    console.log(err);

    return {err};
  }
}