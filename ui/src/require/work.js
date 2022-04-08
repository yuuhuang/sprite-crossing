import {requireUrl} from './index';

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