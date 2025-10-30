import PrimaryButton from '@/components/UI/PrimaryButton';
import { translateds } from '@/context/TranslateContext';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router';

const ErrorPage = () => {
  const navigate = useNavigate();
  return (
    <section className="py-[100px]">
      <div className="min-h-screen w-full flex items-center justify-center bg-black p-4">
        <div className="max-w-md w-full mx-auto text-center space-y-6">
          <div className="flex items-center justify-center w-full aspect-square max-w-[200px] mx-auto">
            {/* Reduced the size of the SVG to make it smaller */}
            <svg
              width="160" // Decreased size
              height="160" // Decreased size
              viewBox="0 0 180 180"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <rect
                x="0.5"
                y="0.5"
                width="179"
                height="179"
                rx="89.5"
                stroke="#FB6D6D"
              />
              <path
                d="M105 75L75 105"
                stroke="#FB6D6D"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M75 75L105 105"
                stroke="#FB6D6D"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="space-y-4">
            <h1 className="text-2xl font-bold text-white">
              {translateds('Oops')}
            </h1>
            <p className="text-gray-400">{translateds('error_occurred')}</p>
            <PrimaryButton
              className="gap-2 flex items-center justify-center"
              onClick={() => navigate('/')}>
              {translateds('return_home')}
              <ArrowLeft className="w-4 h-4" />
            </PrimaryButton>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ErrorPage;
