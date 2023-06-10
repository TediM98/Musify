export const uploadService = {
  uploadImg
}
async function uploadImg(ev) {
  console.log('upload im data event',ev)
  const CLOUD_NAME = "dsqh7gjeo"
  const UPLOAD_PRESET = "p9v0lxmz"
  const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`

  try {
    const formData = new FormData()
    formData.append('upload_preset', UPLOAD_PRESET)
    formData.append('file', ev.target.files[0])
    console.log('hello from upload img',formData)

    const res = await fetch(UPLOAD_URL, {
      method: 'POST',
      body: formData
    })
    const imgUrl = await res.json()
    return imgUrl
  } catch (err) {
    console.error('Failed to upload', err)
    throw err
  }
}

