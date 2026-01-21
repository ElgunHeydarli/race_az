import React from 'react';

interface PrimaryButtonProps {
  type?: any;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  type = 'button',
  children,
  onClick,
  className = '',
  disabled = false,
}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`bg-[#0B98A1] hover:bg-[#0a8991] transition-colors duration-200 cursor-pointer py-3.5 sm:py-[14px] w-full rounded-full text-white font-medium ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;
