/* global Webcam */

function main (baseURL) {
  const webcam = new Webcam(
    document.getElementById('webcam'),
    'user',
    document.getElementById('canvas')
  )

  webcam
    .start()
    .then(() => {
      const snapshot = document.getElementById('snapshot')
      snapshot.onclick = () => {
        const next = document.getElementById('next')
        next.style.display = 'inline'
        webcam.snap()
      }
    })
    .catch((err) => {
      console.error(err)
    })

  const video = document.getElementById('video')
  video.onended = () => {
    const ep02 = document.getElementById('ep02')
    ep02.style.display = 'block'
  }
}
