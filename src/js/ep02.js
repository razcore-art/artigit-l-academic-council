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
        webcam.snap()
      }
    })
    .catch((err) => {
      console.error(err)
    })
}
