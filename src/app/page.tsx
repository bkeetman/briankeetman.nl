import Image from 'next/image';
import Logo from '../../public/logo-briankeetman-nl.svg';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-gray-800">
      <Image alt="Logo" src={Logo} width={200} height={200} />
      <div className="text-center text-slate-100">
        <div className="text-left inline-block">
          <p>
            <b>briankeetman.nl</b>
          </p>
          <p>Zuidwesterringweg 34a</p>
          <p>8309 PH Tollebeek</p>
          <p>info@briankeetman.nl</p>
        </div>
      </div>
    </main>
  );
}
