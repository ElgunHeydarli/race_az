import { FaqTitle } from '@/services/products/types';
import { useState } from 'react';

const ProductFAQ = ({ titles }: { titles: FaqTitle[] }) => {
  const [openSection, setOpenSection] = useState<number | null>(0);

  return (
    <section className="pb-[100px]">
      <div className="main-container">
        <div className="bg-[#FFFFFF0A] backdrop-blur-md px-[48px] py-[60px] rounded-[20px]">
          <div className="text-neutral-500 mb-4">REF: 642/022</div>

          <div className="space-y-4 ">
            {titles.map((item, index) => (
              <div
                key={index}
                className="border-b  border-neutral-800 last:border-0">
                <button
                  onClick={() =>
                    setOpenSection(openSection === index ? null : index)
                  }
                  className="w-full flex cursor-pointer justify-between items-center py-4 text-white hover:text-neutral-400 transition-colors">
                  <span className="text-xl  font-medium">{item.title}</span>
                  <svg
                    className={`w-6 h-6 transform transition-transform duration-200 ${
                      openSection === index ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                <div
                  className={`overflow-hidden transition-all duration-200 ${
                    openSection === index ? 'max-h-96 pb-4' : 'max-h-0'
                  }`}>
                  <p className="text-neutral-400">{item.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductFAQ;
