import Image from 'next/image'
import { ReactNode } from 'react'

interface PageHeroProps {
  title: string
  subtitle?: string
  children?: ReactNode
}

export default function PageHero({ title, subtitle, children }: PageHeroProps) {
  return (
    <section className="relative h-[400px] lg:h-[500px] flex items-center justify-center bg-gradient-to-br from-primary-900 to-primary-700">
      <div className="absolute inset-0 bg-black/30" />
      
      {/* Logo on the left - responsive size */}
      <div className="absolute left-4 lg:left-8 xl:left-16 2xl:left-24 top-1/2 -translate-y-1/2 z-10 hidden lg:block">
        <div className="relative w-[150px] h-[150px] xl:w-[200px] xl:h-[200px] 2xl:w-[300px] 2xl:h-[300px]">
          <Image
            src="/accueil-LOGO.avif"
            alt="Les Jardins d'Alexandre"
            fill
            className="drop-shadow-2xl object-contain"
          />
        </div>
      </div>
      
      {/* Image on full background */}
      <div className="absolute inset-0 z-0 hidden lg:block overflow-hidden">
        <Image
          src="/acceuil-fonds.webp"
          alt="Jardinage"
          fill
          className="object-cover opacity-10 mix-blend-soft-light"
        />
      </div>
      
      <div className="relative z-10 text-center text-white px-4 max-w-4xl lg:mr-[180px] xl:mr-0">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
          {title}
        </h1>
        {subtitle && (
          <p className="text-xl md:text-2xl text-primary-100 max-w-2xl mx-auto mb-8">
            {subtitle}
          </p>
        )}
        {children && (
          <div className="mt-8">
            {children}
          </div>
        )}
      </div>
    </section>
  )
}
