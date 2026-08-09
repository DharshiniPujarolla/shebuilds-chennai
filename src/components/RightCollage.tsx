import { communityImages } from '../data/communityImages'
import { useEffect, useRef } from 'react'

// Decorative, non-interactive collage component
export function RightCollage() {
  const images = communityImages.slice(0, 6)

  const containerRef = useRef<HTMLDivElement | null>(null)

  // Entrance animation effect: photos pop out from the central SheBuilds wordmark
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const core = document.getElementById('shebuilds-core')
    if (!core) return

    const coreRect = core.getBoundingClientRect()
    const photos = Array.from(container.querySelectorAll<HTMLDivElement>('.photo'))

    photos.forEach((photo, i) => {
      // compute vector from photo center to core center
      const pRect = photo.getBoundingClientRect()
      const dx = coreRect.left + coreRect.width / 2 - (pRect.left + pRect.width / 2)
      const dy = coreRect.top + coreRect.height / 2 - (pRect.top + pRect.height / 2)

      // extract rotation deg from inline transform if present
      const rotMatch = photo.style.transform.match(/rotate\((-?\d+\.?\d*)deg\)/)
      const deg = rotMatch ? parseFloat(rotMatch[1]) : 0

      // set initial state (translated toward core, small, transparent)
      photo.style.transition = `transform 820ms cubic-bezier(.16,.84,.26,1) ${i * 80}ms, opacity 640ms ease ${i * 80}ms`
      photo.style.transform = `translate(${dx}px, ${dy}px) rotate(${deg}deg) scale(0.82)`
      photo.style.opacity = '0'

      // force reflow then animate to final
      // use requestAnimationFrame to ensure styles are applied
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          photo.style.transform = `translate(0px, 0px) rotate(${deg}deg) scale(1)`
          photo.style.opacity = '1'
        })
      })
    })
  }, [])

  const sizes = {
    // width controlled via clamp for responsiveness, aspect-ratio kept consistent
    base: 'clamp(110px, 12.5vw, 150px)'
  }

  const photoStyle = (rotate: number, left?: string, top?: string, right?: string, bottom?: string) => ({
    position: 'absolute' as const,
    left,
    top,
    right,
    bottom,
    transform: `rotate(${rotate}deg)`,
    width: sizes.base,
    aspectRatio: '4 / 5',
    borderRadius: '18px',
    overflow: 'hidden' as const,
    boxShadow: '0 14px 30px rgba(16, 10, 34, 0.45)',
    border: '1px solid rgba(124,58,237,0.12)',
    zIndex: 10,
  })

  const innerStyle = (delay = '0s') => ({
    width: '100%',
    height: '100%',
    transform: 'translateY(0px)',
    animation: `sb-float 7s ease-in-out ${delay} infinite`,
    willChange: 'transform',
    pointerEvents: 'none' as const,
  })

  return (
    <div ref={containerRef} className="right-collage absolute inset-0 flex items-center justify-center">
      {/* Decorative neon thread (SVG) placed behind photos. Coordinates use 0-100 viewBox percentages. */}
      <svg
        aria-hidden="true"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 9, pointerEvents: 'none' }}
      >
        <defs>
          <linearGradient id="neonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#b084ff" stopOpacity="0.9" />
            <stop offset="60%" stopColor="#8b5cf6" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#ff85c0" stopOpacity="0.85" />
          </linearGradient>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2.8" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Smooth curved path that orbits around the central wordmark (keeps clear center) */}
        <path
          d="M78 8 C72 14, 68 20, 66 26 C58 36, 46 40, 36 48 C28 56, 30 66, 38 72 C52 82, 68 78, 78 72"
          fill="none"
          stroke="url(#neonGrad)"
          strokeWidth={1.8}
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity={0.95}
          style={{ filter: 'url(#glow)' }}
        />
      </svg>
      {/* Photo placements around the SheBuilds wordmark */}
      {images[0] && (
        <div data-cursor="view" className="photo photo-1" style={photoStyle(-4, '8%', '8%', undefined, undefined)}>
          <div style={innerStyle('0s')}>
            <div className="img-inner" style={{ width: '100%', height: '100%' }}>
              <img src={images[0].url} alt={images[0].alt} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          </div>
        </div>
      )}

      {images[1] && (
        <div data-cursor="view" className="photo photo-2" style={photoStyle(3, undefined, '8%', '8%', undefined)}>
          <div style={innerStyle('0.9s')}>
            <div className="img-inner" style={{ width: '100%', height: '100%' }}>
              <img src={images[1].url} alt={images[1].alt} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          </div>
        </div>
      )}

      {images[2] && (
        <div data-cursor="view" className="photo photo-3" style={photoStyle(-2, '8%', undefined, undefined, '18%')}>
          <div style={innerStyle('0.4s')}>
            <div className="img-inner" style={{ width: '100%', height: '100%' }}>
              <img src={images[2].url} alt={images[2].alt} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          </div>
        </div>
      )}

      {images[3] && (
        <div data-cursor="view" className="photo photo-4" style={photoStyle(4, undefined, undefined, '8%', '18%')}>
          <div style={innerStyle('0.6s')}>
            <div className="img-inner" style={{ width: '100%', height: '100%' }}>
              <img src={images[3].url} alt={images[3].alt} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          </div>
        </div>
      )}

      {images[4] && (
        <div
          data-cursor="view"
          className="photo photo-5"
          style={{
            // Move photo 5 to upper-middle (above the other top photos), shift slightly left and up to avoid overlap with photo-2
            ...photoStyle(-3, '39%', '0.8%', undefined, undefined),
            transform: `translateX(-50%) rotate(-3deg)`,
          }}
        >
          <div style={innerStyle('1.2s')}>
            <div className="img-inner" style={{ width: '100%', height: '100%' }}>
              <img src={images[4].url} alt={images[4].alt} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          </div>
        </div>
      )}

      {images[5] && (
        <div
          data-cursor="view"
          className="photo photo-6"
          style={{
            ...photoStyle(2, '50%', undefined, undefined, '18%'),
            transform: 'translate(-50%, 0) rotate(2deg)',
          }}
        >
          <div style={innerStyle('1s')}>
            <div className="img-inner" style={{ width: '100%', height: '100%' }}>
              <img src={images[5].url} alt={images[5].alt} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

