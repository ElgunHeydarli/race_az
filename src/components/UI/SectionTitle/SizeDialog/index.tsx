import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { CheckIcon } from 'lucide-react';
import { Size } from '@/services/products/types';
import { translateds } from '@/context/TranslateContext';

interface SizeDialogProps {
  sizes: Size[];
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onSetSize: (size: Size) => void;
}

const SizeDialog = ({ sizes, open, setOpen, onSetSize }: SizeDialogProps) => {
  const [selectedSize, setSelectedSize] = useState<null | Size>(null);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const handleSizeSelect = (size: Size) => {
    setSelectedSize(size);
  };

  const handleConfirm = () => {
    if (selectedSize) {
      onSetSize(selectedSize);
    }
    setOpen(false);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) {
        setOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [open]);

  const dialogContent = (
    <>
      <div
        className="fixed inset-0 bg-black/20 z-[200]"
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="dialog-title"
        className="fixed left-1/2 top-1/2 z-[300] max-h-[85vh] w-[90vw] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6 shadow-lg">
        <div className="mb-4">
          <h2 id="dialog-title" className="text-xl font-semibold">
            {translateds('Select_Size')}
          </h2>
          <p className="text-sm text-gray-500">
            {translateds('choose_measure')}
          </p>
        </div>

        <div className="grid grid-cols-3 gap-4 py-4">
          {sizes?.map((size) => (
            <button
              key={size.id}
              type="button"
              className={`flex h-12 cursor-pointer items-center justify-start gap-2 rounded-md border px-3 py-2 text-sm font-medium transition-colors
                ${
                  selectedSize?.name === size.name
                    ? 'border-blue-600 bg-blue-50 text-blue-600'
                    : 'border-gray-200 hover:bg-gray-50'
                }`}
              onClick={() => handleSizeSelect(size)}>
              {selectedSize?.name === size.name && (
                <CheckIcon className="h-4 w-4" />
              )}
              <span>{size.name}</span>
            </button>
          ))}
        </div>

        <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <button
            type="button"
            className="rounded-md cursor-pointer border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            onClick={() => setOpen(false)}>
            Cancel
          </button>
          <button
            type="button"
            className={`rounded-md cursor-pointer px-4 py-2 text-sm font-medium text-white
              ${
                selectedSize
                  ? 'bg-blue-600 hover:bg-blue-700'
                  : 'bg-blue-300 cursor-not-allowed'
              }`}
            onClick={handleConfirm}
            disabled={!selectedSize}>
            Confirm Selection
          </button>
        </div>
      </div>
    </>
  );

  return <>{open && mounted && createPortal(dialogContent, document.body)}</>;
};

export default SizeDialog;
