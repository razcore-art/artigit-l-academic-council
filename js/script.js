/* global BABYLON, anime */
function randomUnicode () {
  const min = 0x21
  const max = 0x7e
  return String.fromCharCode(min + (max - min + 1) * Math.random())
}

function main (name, env) {
  const canvas = document.getElementById('babylon-engine')
  const babylon = new BABYLON.Engine(canvas, true, {
    preserveDrawingBuffer: true,
    stencil: true
  })

  const scene = new BABYLON.Scene(babylon)
  const camera = new BABYLON.TargetCamera(
    'camera',
    new BABYLON.Vector3(0, 0, -5),
    scene
  )
  camera.setTarget(BABYLON.Vector3.Zero())
  camera.attachControl(canvas, true)

  let path = '/assets/particleSystem.json'
  if (env === 'production') path = `/${name}$path`

  fetch(path)
    .then((response) => response.json())
    .then((data) => {
      const particleSystem = BABYLON.ParticleSystem.Parse(data, scene, '')
      particleSystem.activeParticleCount = particleSystem.manualEmitCount
      particleSystem.minLifeTime = Number.MAX_SAFE_INTEGER

      const duration = 6
      const titleText = 'digital twin'
      const title = document.getElementById('title')
      title.append(
        ...Array.from(titleText).map((value) => {
          const span = document.createElement('span')
          span.innerText = value
          return span
        })
      )
      let update = 0
      const updates = Array.from(titleText).map(() => anime.random(10, 20))
      const durations = Array.from(titleText).map(
        () => 100 * anime.random(20, 10 * duration)
      )

      anime
        .timeline()
        .add({
          targets: '#title',
          duration: (1000 * duration) / 4,
          opacity: [0, 1],
          easing: 'easeInSine'
        })
        .add(
          {
            targets: '#title > span',
            duration: 1000 * duration,
            update: function (anim) {
              update++
              anim.animatables.forEach((animatable, index) => {
                if (
                  update % updates[index] === 0 &&
                  anim.currentTime < durations[index]
                ) {
                  animatable.target.innerText = randomUnicode()
                } else if (anim.currentTime >= durations[index]) {
                  animatable.target.innerText = titleText.slice(
                    index,
                    index + 1
                  )
                }
              })
            }
          },
          0
        )
    })
    .catch(console.error)

  const defaultPipeline = new BABYLON.DefaultRenderingPipeline(
    'DefaultRenderingPipeline',
    true,
    scene,
    scene.cameras
  )

  defaultPipeline.imageProcessingEnabled = true
  defaultPipeline.imageProcessing.vignetteEnabled = true
  defaultPipeline.imageProcessing.vignetteCameraFov = 0.3
  defaultPipeline.imageProcessing.vignetteColor = new BABYLON.Color4(
    0.475,
    0.965,
    0.992,
    1
  )

  defaultPipeline.chromaticAberrationEnabled = true
  defaultPipeline.chromaticAberration.aberrationAmount = 5
  defaultPipeline.chromaticAberration.radialIntensity = 1

  defaultPipeline.grainEnabled = true
  defaultPipeline.grain.animated = true
  defaultPipeline.grain.intensity = 10

  defaultPipeline.depthOfFieldEnabled = true

  scene.clearColor = scene.clearColor.toLinearSpace()

  babylon.runRenderLoop(() => scene.render())
  window.addEventListener('resize', () => babylon.resize())
}
