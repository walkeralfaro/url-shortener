
interface FeaturesProps {
  icon: string
  title: string
  description: string
}

const features: FeaturesProps[] = [
  {
    icon: '/icon-brand-recognition.svg',
    title: 'Brand Recognition',
    description: "Boost your brand recognition with each click. Generic links don't mean a thing. Branded links help instill confidence in your content."
  },
  {
    icon: '/icon-detailed-records.svg',
    title: 'Detailed Records',
    description: "Gain insights into who is clicking your link. Knowing when and where people engage with your content helps inform better decisions."
  },
  {
    icon: '/icon-fully-customizable.svg',
    title: 'Fully customizable',
    description: "Improve brand awareness and content discoverability through customizable links, supercharging audience engagement."
  },

]

export function Features() {
  return (

    <section className="mt-10">
      <div className="container mx-auto max-w-[400] p-4">

        <h2 className="text-gray-800 text-xl font-bold text-center md:text-2xl lg:text-3xl">Advance Statistics</h2>
        <p className="text-gray-400 text-sm text-center leading-6 mt-5">Track how your links are performing across the web with our advanced statistics dashboard</p>
      </div>

      <div className="container mx-auto max-w-6xl p-4 mt-14">
        <div className="relative flex flex-col items-center gap-16 lg:flex-row lg:items-start lg:justify-between lg:gap-0">
          <div className="absolute bg-blue-400 h-full w-[10] left-1/2 transform -translate-x-1/2 lg:w-full lg:h-[10] lg:top-1/2 lg:-translate-y-1/2"></div>
          {
            features.map((feature, index) => (
              <div className={`bg-white text-center p-8 relative rounded-md max-w-[320] 
                ${index === 1 ? "lg:mt-8" :
                  index === 2 ? "lg:mt-16" : ""
                }`}
                key={feature.title}
              >
                <div className="absolute bg-purple-950 p-4 rounded-full top-1 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <img src={feature.icon} alt={`icon ${feature.title}`} />
                </div>
                <h3 className="text-gray-800 text-lg font-bold mb-4 mt-8">{feature.title}</h3>
                <p className="text-gray-400 text-sm leading-6">{feature.description}</p>
              </div>
            ))
          }

        </div>
      </div>

    </section>
  )
}