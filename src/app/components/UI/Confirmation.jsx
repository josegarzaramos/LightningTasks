import { Nunito } from 'next/font/google';
import { PiCheckCircleThin } from 'react-icons/pi';

const nunito = Nunito({
  weight: ['400', '800'],
  subsets: ['latin'],
});

const Confirmation = ({ title, subtitle, description }) => {
  return (
    <div className={`flex flex-col gap-3 ${nunito.className}`}>
      <div className="flex flex-col text-blue items-center gap-3 mb-3">
        <PiCheckCircleThin size={'3.5rem'} />
        <h2 className="font-bold text-lg text-blue">{title}</h2>
      </div>
      <p>{subtitle}</p>
      <p>{description}</p>
    </div>
  );
};
export default Confirmation;
