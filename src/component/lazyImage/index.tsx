import React, { useEffect, useState, useRef } from 'react'

const useLazyLoad = () => {
  const [isVisible, setIsVisible] = useState(false)
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )

    if (imgRef.current) observer.observe(imgRef.current)

    return () => observer.disconnect()
  }, [])

  return { imgRef, isVisible }
}

const LazyImage = ({
  src,
  alt,
  imgClassName,
}: {
  src: string
  alt: string
  imgClassName?: string
}) => {
  const { imgRef, isVisible } = useLazyLoad()

  return (
    <img
      ref={imgRef}
      src={isVisible ? src : undefined}
      alt={alt}
      className={imgClassName}
    />
  )
}

export default React.memo(LazyImage)
