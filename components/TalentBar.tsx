interface TalentBarProps {
  talents: string[]
  background: string
}

export default function TalentBar({ talents, background }: TalentBarProps) {
  return (
    <div
      className="w-full rounded-full py-3 md:py-4 px-6 md:px-10 mb-[6vw] md:mb-[3vw] shadow-md overflow-hidden whitespace-nowrap flex items-center relative"
      style={{ background }}
    >
      <div className="animate-marquee flex items-center whitespace-nowrap will-change-transform">
        {[...talents, ...talents].map((talent, index) => (
          <span
            key={`${talent}-${index}`}
            className="text-white font-bold uppercase text-[3vw] md:text-sm tracking-widest pr-[8vw] md:pr-[4vw] whitespace-nowrap"
          >
            {talent}
          </span>
        ))}
      </div>
    </div>
  )
}
