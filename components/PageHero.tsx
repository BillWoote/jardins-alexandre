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
      
      {/* Image on full background */}
      <div className="absolute inset-0 z-0 hidden lg:block overflow-hidden">
        <Image
          src="/acceuil-fonds.webp"
          alt="Jardinage"
          fill
          className="object-cover opacity-10 mix-blend-soft-light"
        />
      </div>
      
      {/* Container with flexbox for logo + text on laptop */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center lg:items-center lg:justify-between gap-8">
          {/* Logo on the left - responsive size */}
          <div className="flex-shrink-0 hidden lg:block">
            <div className="relative w-[250px] h-[193px] xl:w-[350px] xl:h-[270px] 2xl:w-[450px] 2xl:h-[347px]">
              <Image
                src="/logo-final.avif"
                alt="Les Jardins d'Alexandre"
                fill
                className="drop-shadow-2xl object-contain"
              />
            </div>
          </div>
          
          {/* Text content on the right */}
          <div className="text-center lg:text-left text-white flex-1 lg:max-w-md xl:max-w-2xl">
            <h1 className="text-3xl md:text-4xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-bold mb-4 leading-tight">
              {title}
            </h1>
            {subtitle && (
              <p className="text-xl md:text-2xl text-primary-100 max-w-2xl mx-auto lg:mx-0 mb-8">
                {subtitle}
              </p>
            )}
            {children && (
              <div className="mt-8">
                {children}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
