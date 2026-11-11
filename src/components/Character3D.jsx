import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { RotateCw, Eye, Sparkles, ShieldCheck } from 'lucide-react'

export default function Character3D({ fallbackImage = '/images/duy-portrait.svg' }) {
  const mountRef = useRef(null)
  const [webGLSupported, setWebGLSupported] = useState(true)
  const [isWireframe, setIsWireframe] = useState(false)
  const [isRotating, setIsRotating] = useState(true)
  const [loadedModelType, setLoadedModelType] = useState('3D Procedural Rig') // or 'Custom GLTF'
  const [lightingMode, setLightingMode] = useState('cyber') // 'cyber' | 'studio'

  const wireframeRef = useRef(false)
  const rotatingRef = useRef(true)
  wireframeRef.current = isWireframe
  rotatingRef.current = isRotating

  useEffect(() => {
    const container = mountRef.current
    if (!container) return

    // Test WebGL support
    try {
      const testCanvas = document.createElement('canvas')
      const gl = testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl')
      if (!gl) {
        setWebGLSupported(false)
        return
      }
    } catch {
      setWebGLSupported(false)
      return
    }

    const width = container.clientWidth || 500
    const height = container.clientHeight || 600

    // Scene & Camera
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100)
    camera.position.set(0, 0.2, 3.8)

    // Renderer
    let renderer
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance'
      })
    } catch {
      setWebGLSupported(false)
      return
    }

    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.2
    container.appendChild(renderer.domElement)

    // Cinematic Lighting System (Brand Colors)
    // 1. Ambient Base
    const ambientLight = new THREE.AmbientLight(0x0B1528, 1.2)
    scene.add(ambientLight)

    // 2. Electric Blue Key Light (Front-Left)
    const keyLight = new THREE.DirectionalLight(0x1558C9, 3.5)
    keyLight.position.set(-2.5, 2.5, 3)
    keyLight.castShadow = true
    scene.add(keyLight)

    // 3. Neon Lime Rim / Edge Light (Behind-Right) - Outlines the silhouette
    const rimLight = new THREE.DirectionalLight(0xD4FF24, 2.8)
    rimLight.position.set(3, 2, -2.5)
    scene.add(rimLight)

    // 4. Cyan Fill Light (Front-Right)
    const fillLight = new THREE.PointLight(0x00D9FF, 1.5, 10)
    fillLight.position.set(2, 0.5, 2)
    scene.add(fillLight)

    // Root Group for Character
    const characterRoot = new THREE.Group()
    scene.add(characterRoot)

    // Materials
    const suitMaterial = new THREE.MeshStandardMaterial({
      color: 0x0B0F17,
      roughness: 0.65,
      metalness: 0.2
    })
    const lapelMaterial = new THREE.MeshStandardMaterial({
      color: 0x121A28,
      roughness: 0.4,
      metalness: 0.4
    })
    const shirtMaterial = new THREE.MeshStandardMaterial({
      color: 0xF5F7FA,
      roughness: 0.3,
      metalness: 0.1
    })
    const skinMaterial = new THREE.MeshStandardMaterial({
      color: 0xE8B79B,
      roughness: 0.55,
      metalness: 0.05
    })
    const hairMaterial = new THREE.MeshStandardMaterial({
      color: 0x1A1512,
      roughness: 0.7,
      metalness: 0.1
    })
    const neonLimeMaterial = new THREE.MeshBasicMaterial({
      color: 0xD4FF24,
      wireframe: false
    })
    const electricBlueGlowMat = new THREE.MeshBasicMaterial({
      color: 0x1558C9,
      transparent: true,
      opacity: 0.35,
      wireframe: true
    })

    const allMaterials = [suitMaterial, lapelMaterial, shirtMaterial, skinMaterial, hairMaterial]

    // Hierarchical Body Parts
    let headGroup = new THREE.Group()
    let chestGroup = new THREE.Group()
    let leftEye, rightEye
    let leftEyelid, rightEyelid

    // Check for user's custom GLTF model first
    const gltfLoader = new GLTFLoader()
    let customModelLoaded = false
    let mixer = null

    gltfLoader.load(
      '/models/character.glb',
      (gltf) => {
        customModelLoaded = true
        setLoadedModelType('Custom GLB Asset')
        const model = gltf.scene
        model.scale.set(1.5, 1.5, 1.5)
        model.position.set(0, -1.2, 0)
        characterRoot.add(model)

        if (gltf.animations && gltf.animations.length > 0) {
          mixer = new THREE.AnimationMixer(model)
          const action = mixer.clipAction(gltf.animations[0])
          action.play()
        }
      },
      undefined,
      () => {
        // Build Procedural 3D Rigged Male Character in Suit with Arms Crossed
        buildProceduralCharacter()
      }
    )

    function buildProceduralCharacter() {
      // 1. CHEST & TORSO (Tailored Black Suit)
      const torsoGeo = new THREE.CylinderGeometry(0.55, 0.42, 1.1, 16)
      const torsoMesh = new THREE.Mesh(torsoGeo, suitMaterial)
      torsoMesh.position.y = -0.3
      torsoMesh.castShadow = true
      chestGroup.add(torsoMesh)

      // Crisp White Shirt Inset
      const shirtGeo = new THREE.CylinderGeometry(0.24, 0.18, 0.65, 8)
      const shirtMesh = new THREE.Mesh(shirtGeo, shirtMaterial)
      shirtMesh.position.set(0, 0.05, 0.28)
      shirtMesh.rotation.y = Math.PI / 4
      chestGroup.add(shirtMesh)

      // Suit Lapels (V-line)
      const lapelLGeo = new THREE.BoxGeometry(0.12, 0.7, 0.05)
      const lapelL = new THREE.Mesh(lapelLGeo, lapelMaterial)
      lapelL.position.set(-0.2, 0.05, 0.38)
      lapelL.rotation.z = -0.22
      lapelL.rotation.y = 0.15
      chestGroup.add(lapelL)

      const lapelR = lapelL.clone()
      lapelR.position.x = 0.2
      lapelR.rotation.z = 0.22
      lapelR.rotation.y = -0.15
      chestGroup.add(lapelR)

      // Tie / Dark Accent
      const tieGeo = new THREE.BoxGeometry(0.06, 0.45, 0.02)
      const tieMat = new THREE.MeshStandardMaterial({ color: 0x05080E, roughness: 0.3 })
      const tieMesh = new THREE.Mesh(tieGeo, tieMat)
      tieMesh.position.set(0, 0.02, 0.39)
      chestGroup.add(tieMesh)

      // 2. ARMS CROSSED POSE
      // Shoulders
      const shoulderLGeo = new THREE.SphereGeometry(0.18, 12, 12)
      const shoulderL = new THREE.Mesh(shoulderLGeo, suitMaterial)
      shoulderL.position.set(-0.62, 0.15, 0.05)
      chestGroup.add(shoulderL)

      const shoulderR = shoulderL.clone()
      shoulderR.position.x = 0.62
      chestGroup.add(shoulderR)

      // Upper Arms angled inward
      const upperArmLGeo = new THREE.CylinderGeometry(0.13, 0.11, 0.48, 12)
      const upperArmL = new THREE.Mesh(upperArmLGeo, suitMaterial)
      upperArmL.position.set(-0.55, -0.1, 0.18)
      upperArmL.rotation.z = -0.45
      upperArmL.rotation.x = 0.4
      chestGroup.add(upperArmL)

      const upperArmR = upperArmL.clone()
      upperArmR.position.x = 0.55
      upperArmR.rotation.z = 0.45
      upperArmR.rotation.x = 0.4
      chestGroup.add(upperArmR)

      // Forearms crossed across chest
      // Right forearm (crossing left to right)
      const forearmRGeo = new THREE.CylinderGeometry(0.11, 0.1, 0.65, 12)
      const forearmR = new THREE.Mesh(forearmRGeo, suitMaterial)
      forearmR.position.set(0.05, -0.32, 0.42)
      forearmR.rotation.z = Math.PI / 2.1
      forearmR.rotation.y = 0.1
      chestGroup.add(forearmR)

      // Left forearm (crossing right to left overlapping)
      const forearmL = new THREE.Mesh(forearmRGeo, lapelMaterial)
      forearmL.position.set(-0.02, -0.22, 0.48)
      forearmL.rotation.z = -Math.PI / 2.1
      forearmL.rotation.y = -0.1
      chestGroup.add(forearmL)

      // Hands resting naturally on arms
      const handGeo = new THREE.SphereGeometry(0.09, 10, 10)
      const handL = new THREE.Mesh(handGeo, skinMaterial)
      handL.position.set(0.35, -0.25, 0.46)
      chestGroup.add(handL)

      const handR = new THREE.Mesh(handGeo, skinMaterial)
      handR.position.set(-0.35, -0.35, 0.4)
      chestGroup.add(handR)

      // 3. BALANCED NECK (Natural proportion, not elongated!)
      const neckGeo = new THREE.CylinderGeometry(0.15, 0.17, 0.24, 16)
      const neckMesh = new THREE.Mesh(neckGeo, skinMaterial)
      neckMesh.position.set(0, 0.34, 0.05)
      chestGroup.add(neckMesh)

      // 4. HEAD & FACE
      headGroup.position.set(0, 0.62, 0.08)

      // Cranium / Face Oval
      const headGeo = new THREE.SphereGeometry(0.28, 20, 20)
      headGeo.scale(0.9, 1.1, 0.95)
      const headMesh = new THREE.Mesh(headGeo, skinMaterial)
      headMesh.castShadow = true
      headGroup.add(headMesh)

      // Styled Hair (Modern layered volume)
      const hairGeo = new THREE.SphereGeometry(0.3, 16, 16)
      hairGeo.scale(0.95, 0.9, 1.05)
      const hairMesh = new THREE.Mesh(hairGeo, hairMaterial)
      hairMesh.position.set(0, 0.1, -0.04)
      headGroup.add(hairMesh)

      // Hair quiff / bangs
      const quiffGeo = new THREE.ConeGeometry(0.16, 0.25, 8)
      const quiff = new THREE.Mesh(quiffGeo, hairMaterial)
      quiff.position.set(0.05, 0.28, 0.16)
      quiff.rotation.x = -1.2
      quiff.rotation.z = -0.3
      headGroup.add(quiff)

      // Eyes & Eyeballs
      const eyeGeo = new THREE.SphereGeometry(0.035, 10, 10)
      const eyeMat = new THREE.MeshBasicMaterial({ color: 0xFFFFFF })
      const pupilMat = new THREE.MeshBasicMaterial({ color: 0x1A2535 })

      // Left Eye
      const leftEyeAnchor = new THREE.Group()
      leftEyeAnchor.position.set(-0.09, 0.03, 0.23)
      const eyeLMesh = new THREE.Mesh(eyeGeo, eyeMat)
      const pupilL = new THREE.Mesh(new THREE.SphereGeometry(0.016, 8, 8), pupilMat)
      pupilL.position.set(0, 0, 0.026)
      eyeLMesh.add(pupilL)
      leftEyeAnchor.add(eyeLMesh)
      headGroup.add(leftEyeAnchor)
      leftEye = leftEyeAnchor

      // Eyelid for blinking
      const eyelidGeo = new THREE.BoxGeometry(0.08, 0.04, 0.05)
      leftEyelid = new THREE.Mesh(eyelidGeo, skinMaterial)
      leftEyelid.position.set(-0.09, 0.06, 0.24)
      leftEyelid.scale.set(1, 0.1, 1)
      headGroup.add(leftEyelid)

      // Right Eye
      const rightEyeAnchor = new THREE.Group()
      rightEyeAnchor.position.set(0.09, 0.03, 0.23)
      const eyeRMesh = new THREE.Mesh(eyeGeo, eyeMat)
      const pupilR = new THREE.Mesh(new THREE.SphereGeometry(0.016, 8, 8), pupilMat)
      pupilR.position.set(0, 0, 0.026)
      eyeRMesh.add(pupilR)
      rightEyeAnchor.add(eyeRMesh)
      headGroup.add(rightEyeAnchor)
      rightEye = rightEyeAnchor

      rightEyelid = new THREE.Mesh(eyelidGeo, skinMaterial)
      rightEyelid.position.set(0.09, 0.06, 0.24)
      rightEyelid.scale.set(1, 0.1, 1)
      headGroup.add(rightEyelid)

      // Eyebrows (Confident expression)
      const browGeo = new THREE.BoxGeometry(0.08, 0.016, 0.03)
      const browL = new THREE.Mesh(browGeo, hairMaterial)
      browL.position.set(-0.09, 0.08, 0.25)
      browL.rotation.z = -0.08
      headGroup.add(browL)

      const browR = new THREE.Mesh(browGeo, hairMaterial)
      browR.position.set(0.09, 0.08, 0.25)
      browR.rotation.z = 0.08
      headGroup.add(browR)

      // Nose
      const noseGeo = new THREE.ConeGeometry(0.035, 0.1, 5)
      const nose = new THREE.Mesh(noseGeo, skinMaterial)
      nose.position.set(0, -0.03, 0.27)
      nose.rotation.x = -0.3
      headGroup.add(nose)

      // Subtle Smile
      const smileGeo = new THREE.TorusGeometry(0.05, 0.01, 6, 12, Math.PI / 1.5)
      const smileMat = new THREE.MeshBasicMaterial({ color: 0x9E5848 })
      const smile = new THREE.Mesh(smileGeo, smileMat)
      smile.position.set(0, -0.11, 0.25)
      smile.rotation.x = Math.PI / 2
      smile.rotation.z = Math.PI / 1.25
      headGroup.add(smile)

      // Add Head & Chest to Root
      chestGroup.position.y = -0.3
      characterRoot.add(chestGroup)
      characterRoot.add(headGroup)
    }

    // 5. ORBITING CYBERNETIC RINGS & HOLO-CAGE
    const holoRing1Geo = new THREE.TorusGeometry(1.2, 0.01, 8, 64)
    const holoRing1 = new THREE.Mesh(holoRing1Geo, neonLimeMaterial)
    holoRing1.rotation.x = Math.PI / 3
    scene.add(holoRing1)

    const holoRing2Geo = new THREE.TorusGeometry(1.4, 0.008, 8, 64)
    const holoRing2 = new THREE.Mesh(holoRing2Geo, electricBlueGlowMat)
    holoRing2.rotation.x = -Math.PI / 4
    scene.add(holoRing2)

    // Holographic Base Platform
    const platformGeo = new THREE.CylinderGeometry(0.9, 1.05, 0.08, 24)
    const platformMat = new THREE.MeshStandardMaterial({
      color: 0x070B14,
      roughness: 0.3,
      metalness: 0.8
    })
    const platform = new THREE.Mesh(platformGeo, platformMat)
    platform.position.y = -1.2
    scene.add(platform)

    const platformRing = new THREE.Mesh(
      new THREE.RingGeometry(0.92, 0.98, 32),
      neonLimeMaterial
    )
    platformRing.rotation.x = -Math.PI / 2
    platformRing.position.y = -1.15
    scene.add(platformRing)

    // Mouse Tracking Parallax
    let mouse = { x: 0, y: 0 }
    let targetRotation = { x: 0, y: 0 }

    const onMouseMove = (e) => {
      const rect = container.getBoundingClientRect()
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1
      mouse.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1)
    }
    window.addEventListener('mousemove', onMouseMove)

    // Window Resize
    const onResize = () => {
      if (!container) return
      const w = container.clientWidth
      const h = container.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener('resize', onResize)

    // Eye Blink Timer
    let blinkTimer = 0
    let isBlinking = false

    // Animation Loop
    let animId
    const clock = new THREE.Clock()

    const animate = () => {
      const delta = clock.getDelta()
      const elapsedTime = clock.getElapsedTime()

      // Mixer for GLTF if present
      if (mixer) mixer.update(delta)

      // Update wireframe mode dynamically
      allMaterials.forEach((mat) => {
        mat.wireframe = wireframeRef.current
      })

      // Idle Breathing Animation (Subtle rhythmic motion)
      const breathing = Math.sin(elapsedTime * 1.8) * 0.02
      if (chestGroup) {
        chestGroup.position.y = -0.3 + breathing
        chestGroup.scale.set(1 + breathing * 0.3, 1 + breathing * 0.5, 1 + breathing * 0.3)
      }

      // Blink animation
      blinkTimer += delta
      if (blinkTimer > 3.5) {
        isBlinking = true
        if (leftEyelid && rightEyelid) {
          leftEyelid.scale.y = 1.0
          rightEyelid.scale.y = 1.0
        }
        if (blinkTimer > 3.65) {
          isBlinking = false
          blinkTimer = 0
          if (leftEyelid && rightEyelid) {
            leftEyelid.scale.y = 0.1
            rightEyelid.scale.y = 0.1
          }
        }
      }

      // Smooth Head Tracking toward Mouse
      targetRotation.y = THREE.MathUtils.lerp(targetRotation.y, mouse.x * 0.45, 0.06)
      targetRotation.x = THREE.MathUtils.lerp(targetRotation.x, -mouse.y * 0.3, 0.06)

      if (headGroup) {
        headGroup.rotation.y = targetRotation.y
        headGroup.rotation.x = targetRotation.x
      }

      // Eyes follow closely
      if (leftEye && rightEye) {
        leftEye.rotation.y = mouse.x * 0.2
        leftEye.rotation.x = -mouse.y * 0.15
        rightEye.rotation.y = mouse.x * 0.2
        rightEye.rotation.x = -mouse.y * 0.15
      }

      // Auto-rotation of the character pedestal or slight sway
      if (rotatingRef.current) {
        characterRoot.rotation.y = Math.sin(elapsedTime * 0.5) * 0.15
      }

      // Orbiting Hologram Rings
      holoRing1.rotation.z = elapsedTime * 0.35
      holoRing2.rotation.z = -elapsedTime * 0.25

      renderer.render(scene, camera)
      animId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', onResize)
      cancelAnimationFrame(animId)
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
      renderer.dispose()
    }
  }, [])

  return (
    <div className="relative w-full h-[450px] sm:h-[520px] lg:h-[600px] flex items-center justify-center select-none">
      {/* WebGL Canvas or Fallback */}
      {webGLSupported ? (
        <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />
      ) : (
        /* Graceful Fallback if WebGL not supported */
        <div className="relative w-full h-full flex flex-col items-center justify-center">
          <div className="relative w-72 sm:w-80 h-96 sm:h-[420px] rounded-2xl overflow-hidden border border-[#1558C9]/40 shadow-[0_0_30px_rgba(21,88,201,0.3)] bg-[#0B101A]">
            <img
              src={fallbackImage}
              alt="Duy - Backend Developer Avatar"
              className="w-full h-full object-cover"
            />
          </div>
          <p className="mt-3 font-mono text-[11px] text-[#9299A6]">
            [2D FALLBACK ACTIVE: HARDWARE ACCELERATION DISABLED]
          </p>
        </div>
      )}

      {/* Cyber HUD Floating Badges & Controls Overlay */}
      <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
        <div className="cyber-badge-lime text-[10px] backdrop-blur-md shadow-lg">
          <span className="w-1.5 h-1.5 rounded-full bg-[#D4FF24] animate-ping" />
          <span>3D LIVE AVATAR // ARMS CROSSED</span>
        </div>
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#0B101A]/80 border border-[#1B2638] text-[10px] font-mono text-[#00D9FF]">
          <ShieldCheck className="w-3 h-3 text-[#1558C9]" />
          <span>{loadedModelType}</span>
        </div>
      </div>

      {/* Interactive Controls Bar */}
      <div className="absolute bottom-4 right-4 z-20 flex items-center gap-2 bg-[#0B101A]/90 border border-[#1B2638] backdrop-blur-md px-3 py-1.5 rounded-xl shadow-[0_0_20px_rgba(0,0,0,0.8)]">
        {/* Toggle Wireframe */}
        <button
          type="button"
          onClick={() => setIsWireframe(!isWireframe)}
          title="Toggle Cyber Wireframe Mode"
          className={`px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold flex items-center gap-1.5 transition-all ${
            isWireframe
              ? 'bg-[#D4FF24] text-[#030407] shadow-[0_0_10px_#D4FF24]'
              : 'text-[#9299A6] hover:text-[#F5F7FA] hover:bg-[#1558C9]/20'
          }`}
        >
          <Sparkles className="w-3 h-3" />
          <span>WIREFRAME</span>
        </button>

        {/* Toggle Rotation Sway */}
        <button
          type="button"
          onClick={() => setIsRotating(!isRotating)}
          title="Toggle Idle Motion"
          className={`p-1.5 rounded-lg text-[10px] transition-all ${
            isRotating
              ? 'text-[#00D9FF] bg-[#1558C9]/25 border border-[#1558C9]/50'
              : 'text-[#9299A6] hover:text-[#F5F7FA]'
          }`}
        >
          <RotateCw className={`w-3.5 h-3.5 ${isRotating ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {/* Ambient Lighting Edge Accents */}
      <div className="absolute -left-6 top-1/2 -translate-y-1/2 w-1.5 h-32 rounded-full bg-gradient-to-b from-transparent via-[#1558C9] to-transparent opacity-70 pointer-events-none" />
      <div className="absolute -right-6 top-1/2 -translate-y-1/2 w-1.5 h-32 rounded-full bg-gradient-to-b from-transparent via-[#D4FF24] to-transparent opacity-80 pointer-events-none" />
    </div>
  )
}
