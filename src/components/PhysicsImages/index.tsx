'use client'

import { useEffect, useRef } from 'react'
import Matter from 'matter-js'

type Props = {
  images: any
  className?: any
  size?: number
}

export function PhysicsImages({ images, className, size }: Props) {
  const sceneRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sceneRef.current) return

    const { Engine, Render, Runner, World, Bodies, Mouse, MouseConstraint, Events } = Matter

    const width = sceneRef.current.clientWidth
    const height = sceneRef.current.clientHeight
    const wallThickness = 200

    /* ---------------- ENGINE ---------------- */

    const engine = Engine.create({
      positionIterations: 10,
      velocityIterations: 8,
    })

    engine.gravity.y = 1
    engine.gravity.scale = 0 // ⛔ gravity OFF initially

    /* ---------------- RENDERER ---------------- */

    const render = Render.create({
      element: sceneRef.current,
      engine,
      options: {
        width,
        height,
        wireframes: false,
        background: 'transparent',
        showBounds: false,
        showAxes: false,
        showCollisions: false,
        showVelocity: false,
      },
    })

    render.canvas.style.display = 'block'
    render.canvas.style.pointerEvents = 'none'

    /* ---------------- WALLS ---------------- */

    const wallOptions = {
      isStatic: true,
      render: { visible: false },
    }

    const bottomWall = Bodies.rectangle(
      width / 2,
      height + wallThickness / 2,
      width,
      wallThickness,
      wallOptions,
    )

    const leftWall = Bodies.rectangle(
      -wallThickness / 2,
      height / 2,
      wallThickness,
      height,
      wallOptions,
    )

    const rightWall = Bodies.rectangle(
      width + wallThickness / 2,
      height / 2,
      wallThickness,
      height,
      wallOptions,
    )

    World.add(engine.world, [bottomWall, leftWall, rightWall])

    /* ---------------- BODIES ---------------- */

    // const bodies = images.map((src: any) => {
    //   //   const visualSize = window.matchMedia('(max-width:1280px)').matches
    //   //     ? window.matchMedia('(max-width:640px)').matches
    //   //       ? src.width / 0.8
    //   //       : src.width / 0.5
    //   //     : src.width
    //   //   const imageWidth = src.srcWidth || src.width
    //   //   const radius = visualSize / 2

    //   const visualSize = size || 30 // 👈 exact size you want
    //   const baseWidth = src.srcWidth || src.width || 30
    //   const imageWidth = Math.min(baseWidth, 64) //
    //   const radius = visualSize / 2
    //   return Bodies.circle(
    //     Math.random() * width,
    //     -Math.random() * 50, // spawn outside canvas
    //     radius,
    //     {
    //       density: 0.0025,
    //       friction: 0.03,
    //       frictionAir: 0.02,
    //       restitution: 0.6,
    //       render: {
    //         sprite: {
    //           texture: src.url,
    //           xScale: visualSize / imageWidth,
    //           yScale: visualSize / imageWidth,
    //         },
    //       },
    //     },
    //   )
    // })
    const DEFAULT_SRC_SIZE = 512

    const bodies = images.map((src: any) => {
      const visualSize = size || 30
      const radius = visualSize / 2

      const imageWidth = src.srcWidth || DEFAULT_SRC_SIZE

      return Bodies.circle(Math.random() * width, -Math.random() * 50, radius, {
        render: {
          sprite: {
            texture: src.url,
            xScale: visualSize / imageWidth,
            yScale: visualSize / imageWidth,
          },
        },
      })
    })
    World.add(engine.world, bodies)

    /* ---------------- TOP WALL (DELAYED) ---------------- */

    let topWallAdded = false

    Events.on(engine, 'afterUpdate', () => {
      if (topWallAdded) return

      const someEntered = bodies.some((body: any) => body.position.y > 0)

      if (someEntered) {
        setTimeout(() => {
          const topWall = Bodies.rectangle(
            width / 2,
            -wallThickness / 2,
            width,
            wallThickness,
            wallOptions,
          )
          World.add(engine.world, topWall)
          topWallAdded = true
        }, 4000)
      }
    })

    /* ---------------- MOUSE (DRAG ONLY) ---------------- */

    const mouse = Mouse.create(sceneRef.current!)
    const mouseAny = mouse as any

    // allow page scroll
    mouseAny.element.removeEventListener('wheel', mouseAny.mousewheel)
    mouseAny.element.removeEventListener('mousewheel', mouseAny.mousewheel)
    mouseAny.element.removeEventListener('DOMMouseScroll', mouseAny.mousewheel)

    const mouseConstraint = MouseConstraint.create(engine, {
      mouse,
      constraint: {
        stiffness: 0.25,
        render: { visible: false },
      },
    })

    World.add(engine.world, mouseConstraint)

    /* ---------------- INTERSECTION OBSERVER ---------------- */

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // smooth gravity ramp
          Events.on(engine, 'beforeUpdate', () => {
            engine.gravity.scale = 0.001
          })

          observer.disconnect()
        }
      },
      { threshold: 0.2 },
    )

    observer.observe(sceneRef.current)

    /* ---------------- START ---------------- */

    Render.run(render)
    Runner.run(Runner.create(), engine)

    return () => {
      observer.disconnect()
      Render.stop(render)
      World.clear(engine.world, false)
      Engine.clear(engine)
      render.canvas.remove()
    }
  }, [images])

  return (
    <div ref={sceneRef} className={`physics_wrapper relative w-full h-full ${className ?? ''}`} />
  )
}
