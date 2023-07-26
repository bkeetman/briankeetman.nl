import Image from 'next/image';
import Logo from '../../public/logo-briankeetman-nl.svg';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-gray-800">
      <Image alt="Logo" src={Logo} width={200} height={200} />
      <div className="text-center text-slate-100 prose dark:prose-invert">
        <h2 className="text-left  mb-4">briankeetman.nl</h2>
        <div className="flex justify-center items-start">
          <div className="text-left inline-block">
            <p>
              Zuidwesterringweg 34a
              <br />
              8309PH Tollebeek
              <br />
              info@briankeetman.nl
            </p>
          </div>
          <div className="text-left inline-block ml-8">
            <p className="prose-sm">
              KVK: 90764048
              <br />
              BTW: NL004164420B26
            </p>
          </div>
        </div>
      </div>
      <div></div>
    </main>
  );
}
