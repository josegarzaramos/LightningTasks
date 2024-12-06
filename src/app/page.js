import { Nunito } from 'next/font/google';

const nunito = Nunito({
  weight: '400',
  subsets: ['latin'],
});

export default function Home() {
  return (
    <main className={nunito.className}>
      <div className="grid grid-cols-1 lg:grid-cols-main h-full p-4 md:p-10 gap-4 md:gap-10 [&_div]:bg-white [&_div]:rounded [&_div]:p-4 md:[&_div]:p-10">
        <div className="hidden lg:block"></div>
        <div></div>
      </div>
    </main>
  );
}
