import Image from 'next/image';
import Logo from '../../public/logo-briankeetman-nl.svg';

export default function Home() {
  return (
    <main className="flex flex-col md:flex-row min-h-screen bg-brand-dark-light">
      {/* Text section - full width on mobile, half on desktop */}
      <div className="w-full md:w-1/2 p-8 flex flex-col items-center justify-center min-h-[50vh] md:min-h-screen">
        {/* Logo centered */}
        <div className="mb-12">
          <Image alt="Logo" src={Logo} width={200} height={200} />
        </div>

        {/* Text content */}
        <div className="text-gray-200 w-full max-w-md text-center">
          <h1 className="mb-4 font-display text-4xl md:text-5xl tracking-tightest text-brand-pink uppercase">
            Brian Keetman.nl
          </h1>
          <h2 className="mb-8 font-display text-2xl md:text-3xl tracking-tight text-white uppercase">
            Full-stack developer & builder
          </h2>

          <div className="space-y-8">
            <p className="text-base leading-relaxed text-gray-200">
              Zuidwesterringweg 34a
              <br />
              8309PH Tollebeek
              <br />
              info@briankeetman.nl
            </p>

            <p className="text-sm leading-relaxed text-gray-400">
              KVK: 90764048
              <br />
              BTW: NL004164420B26
            </p>
          </div>
        </div>
      </div>

      {/* Image section - full width on mobile, half on desktop */}
      <div className="w-full md:w-1/2 relative min-h-[50vh] md:min-h-screen">
        <Image
          src="/background-ufo.webp"
          alt="Brian met robot"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
          quality={90}
          loading="eager"
        />
      </div>
    </main>
  );
}
