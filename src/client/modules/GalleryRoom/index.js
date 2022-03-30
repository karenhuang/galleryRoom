const THREE = require('three')
const TWEEN = require('tween.js')
const async = require('async')

module.exports = function() {
  const PI = Math.PI
  const CircleRad = PI * 2
  const RAD = PI / 180
  const RoomR = 11
  let VM, DOM, scene, camera, renderer, textureLoader, raycaster, light, ambient, mouse, AnimationFrame, controlView
  let roomCanvas, startX, endX, planX, planZ
  let cameraAngle = 70
  let moveStatus = false
  let paintStatus = false
  let updateStatus = true
  let touchObj = []
  let Gallery = null
  let totalPlan = 11
  let unitRad = CircleRad / totalPlan
  let nowRad = unitRad * 5
  let nextRad = nowRad
  let nowImg = 1
  let nextImg = null
  let ZoomInR = RoomR * 0.6
  let floorW = RoomR / Math.cos((unitRad / 2)) * 2
  let wallH = 6
  let wallW = Math.tan((unitRad / 2)) * RoomR * 2

  let initThree = () => {
    return new Promise((resolve, reject) => {
      scene = new THREE.Scene()
      camera = new THREE.PerspectiveCamera(cameraAngle, DOM.parentElement.offsetWidth / DOM.parentElement.offsetHeight, 0.1, 100)
      renderer = new THREE.WebGLRenderer({
        canvas: DOM.querySelector('canvas'),
        antialias: true,
        autoClear: true
      })
      textureLoader = new THREE.TextureLoader()
      textureLoader.setCrossOrigin('anonymous')
      renderer.setSize(DOM.parentElement.offsetWidth, DOM.parentElement.offsetHeight)
      camera.position.set(0, wallH * 0.1, 0)
      camera.rotation.y = 0
      scene.add(camera)
      DOM.appendChild(renderer.domElement)
      resolve()
    })
  }

  let initControl = () => {
    return new Promise((resolve, reject) => {
      roomCanvas = DOM.querySelector('canvas')
      roomCanvas.addEventListener('mousedown', canvasMouseDownHandler)
      roomCanvas.addEventListener('mousemove', canvasMouseMoveHandler)
      roomCanvas.addEventListener('mouseup', canvasMouseUpHandler)
      roomCanvas.addEventListener('mouseleave', canvasMouseUpHandler)
      DOM.addEventListener('mousedown', onMouseDown)
      DOM.addEventListener('mousemove', onMouseMove)
      window.addEventListener('resize', viewResize)
      resolve()
    })
  }

  let initLight = () => {
    return new Promise((resolve, reject) => {
      ambient = new THREE.AmbientLight(0xffffff, 0)
      scene.add(ambient)
      resolve()
    })
  }

  let initRaycaster = () => {
    return new Promise((resolve, reject) => {
      raycaster = new THREE.Raycaster()
      mouse = new THREE.Vector2()
      resolve()
    })
  }

  let addWall = () => {
    for (let i = 0; i < totalPlan; i++) {
      let geometry = new THREE.PlaneGeometry(wallW, wallH)
      let texture = textureLoader.load('http://localhost:8080/textures/wall-1024.jpg')
      let material = new THREE.MeshStandardMaterial({
        metalness: 0.2,
        bumpScale: 0.4,
        side: THREE.DoubleSide,
        map: texture
      })
      let mesh = new THREE.Mesh(geometry, material)
      let wallRad = PI + unitRad * i
      planX = Math.sin(wallRad) * RoomR
      planZ = Math.cos(wallRad) * RoomR
      mesh.scale.set(1, 1, 1)
      mesh.position.set(planX, 0, planZ)
      mesh.rotation.y = unitRad * i
      scene.add(mesh)
      geometry = texture = material = mesh = null
    }
  }

  let addBottomWall = () => {
    for (let i = 0; i < totalPlan; i++) {
      let geometry = new THREE.PlaneGeometry(wallW, wallH * 0.1)
      let material = new THREE.MeshStandardMaterial({
        metalness: 0.2,
        color: 0x333333
      })
      let mesh = new THREE.Mesh(geometry, material)
      let wallRad = PI + unitRad * i
      planX = Math.sin(wallRad) * RoomR * 0.99
      planZ = Math.cos(wallRad) * RoomR * 0.99
      mesh.scale.set(1, 1, 1)
      mesh.position.set(planX, wallH * -0.5, planZ)
      mesh.rotation.y = unitRad * i
      scene.add(mesh)
      geometry = material = mesh = null
    }
  }

  let addpaintingBox = () => {
    let gray = new THREE.MeshLambertMaterial({ color: 0x333333 })
    for (let i = 0; i < totalPlan - 1; i++) {
      let w, h
      let imgW = Gallery.pictures[i].width
      let imgH = Gallery.pictures[i].height
      let texture = textureLoader.load(Gallery.pictures[i].path)
      let material = new THREE.MeshStandardMaterial({
        roughness: 0.8,
        color: 0xfafafa,
        metalness: 0.3,
        bumpScale: 0.025,
        side: THREE.DoubleSide,
        map: texture
      })
      material.map.minFilter = THREE.LinearFilter
      let multMaterial = [gray, gray, gray, gray, material, gray]
      if (imgW > imgH) {
        w = wallW * 3 / 5
        h = (imgH / imgW) * w
      } else {
        h = wallH / 2
        w = (imgW / imgH) * h
      }
      let geometry = new THREE.BoxGeometry(w, h, 0.1)
      let mesh = new THREE.Mesh(geometry, multMaterial)
      let paintRad = PI + unitRad * i
      planX = Math.sin(paintRad) * (RoomR - 0.1)
      planZ = Math.cos(paintRad) * (RoomR - 0.1)
      mesh.scale.set(1, 1, 1)
      mesh.position.set(planX, wallH * 0.05, planZ)
      mesh.rotation.y = unitRad * i
      mesh.data = {
        index: i
      }
      touchObj.push(mesh)
      scene.add(mesh)
      geometry = texture = material = mesh = null
    }
  }

  let addDoor = () => {
    let geometry = new THREE.PlaneGeometry(wallW / 2, wallH * 0.9)
    let texture = textureLoader.load('http://localhost:8080/textures/door.jpg')
    let material = new THREE.MeshPhongMaterial({
      side: THREE.DoubleSide,
      map: texture
    })
    material.map.minFilter = THREE.LinearFilter
    let mesh = new THREE.Mesh(geometry, material)
    let doorRad = PI + unitRad * (totalPlan - 1)
    planX = Math.sin(doorRad) * RoomR * 0.985
    planZ = Math.cos(doorRad) * RoomR * 0.985
    mesh.scale.set(1, 1, 1)
    mesh.position.set(planX, wallH * -0.05, planZ)
    mesh.rotation.y = unitRad * (totalPlan - 1)
    scene.add(mesh)
    geometry = texture = material = mesh = null
  }

  let addPaintingLight = (i) => {
    for (let i = 0; i < totalPlan; i++) {
      light = new THREE.PointLight(0xffffff, 0, 8);
      let lightRad = PI + unitRad * i
      planX = Math.sin(lightRad) * RoomR * 0.45
      planZ = Math.cos(lightRad) * RoomR * 0.45
      light.position.set(planX, wallH * 0.55, planZ)
      scene.add(light);
    }
  }

  let addCeiling = () => {
    let geometry = new THREE.PlaneGeometry(floorW, floorW)
    let material = new THREE.MeshPhongMaterial({
      side: THREE.DoubleSide,
      color: 0x7B7B7B
    })
    let mesh = new THREE.Mesh(geometry, material)
    mesh.position.set(0, wallH * 0.6, 0)
    mesh.rotation.x = 90 * RAD
    scene.add(mesh)
    geometry = material = mesh = null
  }

  let addSecCeiling = () => {
    let geometry = new THREE.PlaneGeometry(floorW, floorW)
    let material = new THREE.MeshPhongMaterial({
      side: THREE.DoubleSide,
      color: 0x7B7B7B
    })
    let mesh = new THREE.Mesh(geometry, material)
    mesh.position.set(0, wallH * 0.5, 0)
    mesh.rotation.x = 90 * RAD
    scene.add(mesh)
    geometry = material = mesh = null
  }

  let addFloor = () => {
    // textureV = imgRate*textureU / moduleRate
    let textureU = 8
    let textureV = 0
    let geometry = new THREE.PlaneGeometry(floorW, floorW)
    let texture = textureLoader.load('http://localhost:8080/textures/hardwood2_diffuse.jpg', map => {
      textureV = ((map.image.naturalWidth / map.image.naturalHeight) * textureU) * (floorW / floorW)
      map.wrapS = map.wrapT = THREE.RepeatWrapping
      map.anisotropy = 4
      map.repeat.set(textureU, textureV)
    })
    let material = new THREE.MeshStandardMaterial({
      roughness: 0.8,
      color: 0xfafafa,
      metalness: 0.3,
      bumpScale: 0.5,
      side: THREE.DoubleSide,
      map: texture
    })
    let mesh = new THREE.Mesh(geometry, material)
    mesh.position.set(0, wallH * -0.5, 0)
    mesh.rotation.x = 90 * RAD
    scene.add(mesh)
    geometry = texture = material = mesh = null
  }

  let addLoading = () => {
    let now = unitRad * 5 + PI
    let to = {
      cpx: 0,
      cpz: 0,
      ambIntensity: 0.8,
    }
    let from = {
      cpx: Math.sin(now) * RoomR,
      cpz: Math.cos(now) * RoomR,
      ambIntensity: 0,
    }
    let cameraMove = new TWEEN.Tween(from).to(to, 3000).easing(TWEEN.Easing.Cubic.Out)
      .onUpdate(function() {
        camera.position.z = from.cpz
        camera.position.z = from.cpx
        ambient.intensity = from.ambIntensity
      })
      .onComplete(function() {
        cameraMove = null
      })
      .start()

    scene.children.forEach(item => {
      if (item.type === 'PointLight') {
        let openLight = new TWEEN.Tween(item).to({ intensity: 0.7 }, 3000)
          .onComplete(function() {
            openLight = null
          })
          .start()
      }
    })

  }

  let raycasterEvent = (e) => {
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1
    raycaster.setFromCamera(mouse, camera)
  }

  let closePaint = () => {
    if (!paintStatus && nextImg == null) return
    let to = {
      cpx: 0,
      cpz: 0
    }
    let from = {
      cpx: camera.position.x,
      cpz: camera.position.z
    }
    let noneFocus = new TWEEN.Tween(from).to(to, 1000).easing(TWEEN.Easing.Cubic.Out)
      .onUpdate(function() {
        camera.position.x = from.cpx
        camera.position.z = from.cpz
      })
      .onComplete(function() {
        paintStatus = false
        noneFocus = null
      })
      .start()
  }

  let openPaint = (i) => {
    if (paintStatus || nextImg != null) return
    nextImg = i
    paintStatus = true
    moveStatus = false
    nextRad = (unitRad * i) % CircleRad
    let cryRad = PI + unitRad * i
    let to = {
      cry: nextRad,
      cpx: Math.sin(cryRad) * ZoomInR,
      cpz: Math.cos(cryRad) * ZoomInR
    }
    let from = {
      cry: camera.rotation.y,
      cpx: 0,
      cpz: 0
    }
    if (to.cry > (PI * 3 / 2) && from.cry < (PI / 2)) {
      to.cry = unitRad * i - PI * 2
    } else if (from.cry > (PI * 3 / 2) && to.cry < (PI / 2)) {
      to.cry = unitRad * i + PI * 2
    }
    let focus = new TWEEN.Tween(from).to(to, 1000).easing(TWEEN.Easing.Cubic.Out)
      .onUpdate(function() {
        camera.rotation.y = from.cry
        camera.position.x = from.cpx
        camera.position.z = from.cpz
      })
      .onComplete(function() {
        nowImg = nextImg
        nextImg = null
        VM.targetIndex = i
        VM.switchPainting()
        focus = null
      })
      .start()
  }

  let renderThree = () => {
    if (updateStatus) {
      if (!paintStatus) {
        camera.rotation.y = nextRad
      }
      renderer.render(scene, camera)
    }
  }

  let animateThree = () => {
    TWEEN.update()
    renderThree()
    AnimationFrame = requestAnimationFrame(animateThree)
  }

  let startThree = () => {
    return new Promise((resolve, reject) => {
      async.auto({
          room: (next) => {
            addWall()
            addBottomWall()
            addDoor()
            addCeiling()
            addSecCeiling()
            addFloor()
            next()
          },
          painting: ['room', (result, next) => {
            initLight()
            addPaintingLight()
            addpaintingBox()
            next()
          }],
        },
        (err, result) => {
          VM.loading.status = false
          let time = setTimeout(() => {
            addLoading()
          }, 500)
          animateThree()
          resolve()
        })

    })

  }

  let canvasMouseDownHandler = (e) => {
    if (paintStatus) return
    startX = e.offsetX
    moveStatus = true
    e.cancelBubble = true
  }

  let canvasMouseMoveHandler = (e) => {
    if (!moveStatus) return
    let moveRad = (((e.offsetX - startX) * cameraAngle) / window.innerHeight) * RAD
    if (startX - e.offsetX > 0) {
      nextRad = (nowRad + moveRad + CircleRad) % CircleRad
    } else {
      nextRad = (nowRad + moveRad) % CircleRad
    }
  }

  let canvasMouseUpHandler = (e) => {
    endX = e.offsetX
    nowRad = nextRad
    moveStatus = false
    if (startX == endX) {
      e.cancelBubble = false
      onMouseDown(e)
    }
  }

  let onMouseDown = (e) => {
    raycasterEvent(e)
    let intersects = raycaster.intersectObjects(touchObj, true)
    if (intersects.length > 0) {
      openPaint(intersects[0].object.data.index)
    }
  }

  let onMouseMove = (e) => {
    raycasterEvent(e)
    let intersects = raycaster.intersectObjects(touchObj, true)
    DOM.style.cursor = intersects.length > 0 ? "pointer" : "default"
  }

  let viewResize = (e) => {
    camera.aspect = DOM.parentElement.offsetWidth / DOM.parentElement.offsetHeight
    camera.updateProjectionMatrix()
    renderer.setSize(DOM.parentElement.offsetWidth, DOM.parentElement.offsetHeight)
  }

  let disposeNode = (node) => {
    updateStatus = false
    if (node instanceof THREE.Mesh) {
      if (node.geometry) {
        node.geometry.dispose();
      }
      if (node.material) {
        if (node.material instanceof Array) {
          node.material.forEach(function(mtrl, idx) {
            if (mtrl.map) mtrl.map.dispose();
            if (mtrl.lightMap) mtrl.lightMap.dispose();
            if (mtrl.bumpMap) mtrl.bumpMap.dispose();
            if (mtrl.normalMap) mtrl.normalMap.dispose();
            if (mtrl.specularMap) mtrl.specularMap.dispose();
            if (mtrl.envMap) mtrl.envMap.dispose();

            mtrl.dispose(); // disposes any programs associated with the material
          })
        } else {
          if (node.material.map) node.material.map.dispose();
          if (node.material.lightMap) node.material.lightMap.dispose();
          if (node.material.bumpMap) node.material.bumpMap.dispose();
          if (node.material.normalMap) node.material.normalMap.dispose();
          if (node.material.specularMap) node.material.specularMap.dispose();
          if (node.material.envMap) node.material.envMap.dispose();

          node.material.dispose(); // disposes any programs associated with the material
        }
      }
    } else if (node.isLight) {
      if (node.isLight.castShadow || node.shadow) {
        node.shadow.camera = null; //my try to dispose  the texture
        if (node.shadow.map) {
          node.shadow.map.texture.dispose();
          node.shadow.map.texture = null;
          node.shadow.map.dispose();
          node.shadow.map = null;
        }
      }
      if (node.target) node.target = null
      node.castShadow = false;
      node.shadow = null;
      node.visible = false;
      node.intensity = 0;
      node.layers.toggle(0);
    }
    if (node.parent) {
      node.parent.remove(node)
    }
    node = null
  }

  let disposeHierarchy = (node, callback) => {
    if (node.children && node.children.length) {
      for (var i = node.children.length - 1; i >= 0; i--) {
        var child = node.children[i];
        disposeHierarchy(child, callback);
      }
    }
    callback(node);
  }

  let clearTouchObj = () => {
    while (touchObj.length) {
      let group = touchObj.pop()
      disposeHierarchy(group, disposeNode)
    }
  }

  let clearScene = () => {
    while (scene.children.length) {
      disposeHierarchy(scene.children.pop(), disposeNode)
    }
  }

  let clearMouse = () => {
    roomCanvas.removeEventListener('mousedown', canvasMouseDownHandler)
    roomCanvas.removeEventListener('mousemove', canvasMouseMoveHandler)
    roomCanvas.removeEventListener('mouseup', canvasMouseUpHandler)
    roomCanvas.removeEventListener('mouseleave', canvasMouseUpHandler)
    DOM.removeEventListener('mousedown', onMouseDown)
    DOM.removeEventListener('mousemove', onMouseMove)
    window.removeEventListener('resize', viewResize)
  }

  let clearAll = (e) => {
    TWEEN.removeAll()
    clearTouchObj()
    clearScene()
    clearMouse()
    disposeNode(ambient)
    disposeNode(light)
    renderer.clear()
    renderer = null
    scene = null
    THREE.Cache.clear()
    touchObj = null
    roomCanvas = null
    VM = null
    DOM = null
    camera = null
    textureLoader = null
    mouse = null
    raycaster = null
    Gallery = null
  }

  return {
    init(vm, dom, data) {
      return new Promise((resolve, reject) => {
        VM = vm
        DOM = dom
        Gallery = data
        updateStatus = true
        initThree().then(initControl).then(initRaycaster)
        resolve()
      })
    },
    close() {
      closePaint()
    },
    destroyAll() {
      clearAll()
    },
    start() {
      startThree()
    },
    stopRenderThree() {
      cancelAnimationFrame(AnimationFrame)
    }
  }




}