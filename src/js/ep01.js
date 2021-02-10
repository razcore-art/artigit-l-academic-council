function main (baseURL) {
  const video = document.querySelector('video')
  video.onended = () => {
    const rGrid = document.querySelector('r-grid')
    rGrid.style.display = 'grid'
  }

  const textarea = document.querySelector('textarea')
  textarea.oninput = (event) => {
    sessionStorage.ep01 = event.target.value
  }
}
