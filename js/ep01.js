function main (baseURL) {
  const video = document.getElementById('video')
  video.onended = () => {
    const ep01 = document.getElementById('ep01')
    ep01.style.display = 'block'
  }

  const userInput = document.getElementById('user-input')
  userInput.oninput = (event) => {
    sessionStorage.ep01 = event.target.value
  }
}
