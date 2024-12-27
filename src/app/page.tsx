import Image from 'next/image';
import Logo from '../../public/logo-briankeetman-nl.svg';

export default function Home() {
  return (
    <main className="flex min-h-screen">
      {/* Left half */}
      <div className="w-1/2 p-8 flex flex-col items-center">
        {/* Logo centered */}
        <div className="mb-12">
          <Image alt="Logo" src={Logo} width={200} height={200} />
        </div>

        {/* Text content */}
        <div className="text-slate-100 w-full max-w-md">
          <h2 className="mb-8 text-2xl font-semibold">briankeetman.nl</h2>

          <div className="flex justify-between">
            <div>
              <p className="text-base leading-relaxed">
                Zuidwesterringweg 34a
                <br />
                8309PH Tollebeek
                <br />
                info@briankeetman.nl
              </p>
            </div>
            <div>
              <p className="text-sm leading-relaxed">
                KVK: 90764048
                <br />
                BTW: NL004164420B26
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right half - full image */}
      <div className="w-1/2 relative">
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
