import type { CommunityImageItem } from '../types'

interface CommunityImageProps {
  image: CommunityImageItem
  className?: string
}

export function CommunityImage({ image, className = '' }: CommunityImageProps) {
  const shapeStyles = {
    circle: 'rounded-full',
    rounded: 'rounded-2xl',
    portrait: 'rounded-2xl'
  }

  return (
    <div
      data-cursor="view"
      className={`relative overflow-hidden border-2 border-purple-400/40 shadow-xl transition-all duration-300 ${shapeStyles[image.shape]} ${className}`}
    >
      <img
        src={image.url}
        alt={image.alt}
        className="w-full h-full object-cover object-center"
        loading="lazy"
      />

      {/* Subtle overlay glow */}
      <div className="absolute inset-0 bg-gradient-to-t from-purple-950/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-1.5" />
    </div>
  )
}
