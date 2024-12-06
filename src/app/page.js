import { Nunito } from 'next/font/google';
import TasksList from './components/TasksList';

const nunito = Nunito({
  weight: ['400', '800'],
  subsets: ['latin'],
});

export default function Home() {
  return (
    <main className={nunito.className}>
      <div className="grid grid-cols-1 lg:grid-cols-main h-full p-4 md:p-10 gap-4 md:gap-10 [&>div]:bg-white [&>div]:rounded [&>div]:p-4 md:[&>div]:p-10">
        <div className="hidden lg:block"></div>
        <div className="overflow-auto">
          <TasksList />
        </div>
      </div>
    </main>
  );
}
