import Image from 'next/image'

interface LinkBannerProps {
  href: string
  logoSrc: string
  title: string
  backgroundImage: string
  gradientFrom?: string
  gradientTo?: string
  ctaText?: string
  buttonGradientFrom?: string
  buttonGradientTo?: string
  logoAlt?: string
  className?: string
  openInNewTab?: boolean
  invertLogo?: boolean
}

export default function LinkBanner({
  href,
  logoSrc,
  title,
  backgroundImage,
  gradientFrom = 'rgba(37, 37, 37, 0.6)',
  gradientTo = '#33A1D0',
  ctaText = 'Download Now',
  buttonGradientFrom = '#121111',
  buttonGradientTo = '#252525',
  logoAlt = '',
  className = '',
  openInNewTab = true,
  invertLogo = true,
}: LinkBannerProps) {
  return (
    <a
      href={href}
      {...(openInNewTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      aria-label={`${title} — ${ctaText}`}
      className={`group relative flex min-h-25 w-full items-center justify-between gap-3 overflow-hidden rounded-3xl px-[4%] py-3 text-white shadow-lg md:min-h-37.5 md:rounded-4xl ${className}`}
    >
      <Image
        src={backgroundImage}
        alt=""
        fill
        sizes="100vw"
        className="scale-105 object-cover transition-transform duration-500 ease-out group-hover:translate-x-[2%]"
      />
      <span
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(90deg, ${gradientFrom} 0%, ${gradientTo} 100%)`,
        }}
      />
      <span className="relative z-10 flex min-w-0 shrink items-center gap-2 md:gap-[1.2vw]">
        <Image
          src={logoSrc}
          alt={logoAlt}
          width={558}
          height={717}
          className={`h-[clamp(2.75rem,6vw,6.5rem)] w-auto shrink-0 ${invertLogo ? 'brightness-0 invert' : ''}`}
        />
        <span className="font-inter text-[clamp(1.25rem,5vw,5rem)] font-black leading-none tracking-tight">
          {title}
        </span>
      </span>

      <span className="relative z-10 flex shrink-0 items-center gap-2 md:gap-[1.2vw]">
        <span className="font-overpass text-right text-[clamp(1rem,3vw,3rem)] font-black uppercase leading-[0.9]">
          {ctaText.split(/\s+/).map((word, index) => (
            <span key={`${word}-${index}`} className="block">
              {word}
            </span>
          ))}
        </span>
        <span
          className="flex size-[clamp(3rem,7.5vw,7rem)] shrink-0 items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-110"
          style={{
            backgroundImage: `linear-gradient(180deg, ${buttonGradientFrom} 0%, ${buttonGradientTo} 100%)`,
          }}
        >
          <Image src="/Arrow.svg" alt="" width={71} height={71} className="size-[56%]" />
        </span>
      </span>
    </a>
  )
}
