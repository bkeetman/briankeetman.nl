import Image from 'next/image';
import Logo from '../../public/logo-briankeetman-nl.svg';

export default function Home() {
  return (
    <main className="flex flex-col md:flex-row min-h-screen">
      {/* Text section - full width on mobile, half on desktop */}
      <div className="w-full md:w-1/2 p-8 flex flex-col items-center justify-center min-h-[50vh] md:min-h-screen">
        {/* Logo centered */}
        <div className="mb-12">
          <Image alt="Logo" src={Logo} width={200} height={200} />
        </div>

        {/* Text content */}
        <div className="text-slate-100 w-full max-w-md text-center">
          <h2 className="mb-8 text-2xl font-semibold">briankeetman.nl</h2>

          <div className="space-y-8">
            <p className="text-base leading-relaxed">
              Zuidwesterringweg 34a
              <br />
              8309PH Tollebeek
              <br />
              info@briankeetman.nl
            </p>

            <p className="text-sm leading-relaxed">
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
          src="/background.webp"
          alt="Brian met robot"
          fill
          className="object-cover"
          priority
        />
      </div>
    </main>
  );
}
