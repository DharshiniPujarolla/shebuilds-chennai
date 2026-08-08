import type { CommunityImageItem } from '../types'

interface CommunityImageProps {
  image: CommunityImageItem
  className?: string
}

export function CommunityImage({ image, className = '' }: CommunityImageProps) {
  const shapeStyles = {
    circle: 'w-12 h-12 sm:w-16 sm:h-16 rounded-full',
    rounded: 'w-14 h-14 sm:w-20 sm:h-20 rounded-2xl',
    portrait: 'w-16 h-20 sm:w-24 sm:h-28 rounded-2xl'
  }

  return (
    <div
      data-cursor="view"
      className={`relative overflow-hidden border-2 border-purple-400/40 shadow-xl transition-all duration-300 group cursor-pointer ${shapeStyles[image.shape]} ${className}`}
    >
      <img
        src={image.url}
        alt={image.alt}
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        loading="lazy"
      />

      {/* Subtle overlay glow */}
      <div className="absolute inset-0 bg-gradient-to-t from-purple-950/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-1.5" />
    </div>
  )
}
