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
      

      className={`relative overflow-hidden border-2 border-purple-400/40 shadow-xl pointer-events-none ${shapeStyles[image.shape]} ${className}`}
    >
      <img
        src={image.url}
        alt={image.alt}


        className="w-full h-full object-cover"

        loading="lazy"
      />

    </div>
  )
}
