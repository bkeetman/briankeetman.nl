import Image from 'next/image';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-white">
      <Image
        alt="Logo"
        src={'/logo-briankeetman-nl.png'}
        width={200}
        height={200}
      />
    </main>
  );
}
