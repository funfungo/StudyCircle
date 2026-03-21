import { useState, useRef, useEffect, useCallback } from 'react'
import './MobileSwiper.css'

export function MobileSwiper({ children }) {
  const [current, setCurrent] = useState(0)
  const containerRef = useRef(null)
  const touchStart = useRef({ x: 0, y: 0 })
  const touchDelta = useRef(0)
  const isDragging = useRef(false)
  const currentRef = useRef(current)
  const wheelLockRef = useRef(false)
  const total = Array.isArray(children) ? children.length : 1

  currentRef.current = current

  const goTo = useCallback(
    (idx) => {
      const clamped = Math.max(0, Math.min(idx, total - 1))
      setCurrent(clamped)
      currentRef.current = clamped
    },
    [total],
  )

  const handleTouchStart = (e) => {
    touchStart.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    }
    touchDelta.current = 0
    isDragging.current = false
  }

  const handleTouchMove = (e) => {
    const dy = e.touches[0].clientY - touchStart.current.y
    const dx = Math.abs(e.touches[0].clientX - touchStart.current.x)
    if (!isDragging.current && Math.abs(dy) > dx && Math.abs(dy) > 10) {
      isDragging.current = true
    }
    if (isDragging.current) {
      touchDelta.current = dy
    }
  }

  const handleTouchEnd = () => {
    if (!isDragging.current) return
    const threshold = 50
    const c = currentRef.current
    if (touchDelta.current < -threshold) goTo(c + 1)
    else if (touchDelta.current > threshold) goTo(c - 1)
    touchDelta.current = 0
    isDragging.current = false
  }

  useEffect(() => {
    const handleWheel = (e) => {
      e.preventDefault()
      if (wheelLockRef.current || Math.abs(e.deltaY) < 30) return
      wheelLockRef.current = true
      setTimeout(() => (wheelLockRef.current = false), 800)
      const c = currentRef.current
      if (e.deltaY > 0) goTo(c + 1)
      else goTo(c - 1)
    }

    const el = containerRef.current
    if (!el) return
    el.addEventListener('wheel', handleWheel, { passive: false })
    return () => el.removeEventListener('wheel', handleWheel)
  }, [goTo])

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'ArrowDown' || e.key === ' ') {
        e.preventDefault()
        goTo(currentRef.current + 1)
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        goTo(currentRef.current - 1)
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [goTo])

  return (
    <div
      className="mobile-swiper"
      ref={containerRef}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className="mobile-swiper__track"
        style={{ transform: `translateY(-${current * 100}%)` }}
      >
        {Array.isArray(children)
          ? children.map((child, i) => (
              <div className="mobile-swiper__slide" key={i}>
                {child}
              </div>
            ))
          : <div className="mobile-swiper__slide">{children}</div>
        }
      </div>

      <div className="mobile-swiper__dots">
        {Array.from({ length: total }, (_, i) => (
          <button
            key={i}
            className={`mobile-swiper__dot ${i === current ? 'active' : ''}`}
            onClick={() => goTo(i)}
            aria-label={`Go to page ${i + 1}`}
          />
        ))}
      </div>

      <div className="mobile-swiper__counter">
        {current + 1} / {total}
      </div>
    </div>
  )
}
