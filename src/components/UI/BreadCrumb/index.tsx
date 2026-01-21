import React from 'react';
import { FaArrowRightLong } from 'react-icons/fa6';
import { Link } from 'react-router';

interface BreadcrumbProps {
  children: React.ReactNode;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ children }) => {
  return <nav aria-label="Breadcrumb">{children}</nav>;
};

export const BreadcrumbList: React.FC<BreadcrumbProps> = ({ children }) => {
  return <ol className="flex items-center space-x-2 flex-wrap ">{children}</ol>;
};

interface BreadcrumbItemProps {
  children: React.ReactNode;
}

export const BreadcrumbItem: React.FC<BreadcrumbItemProps> = ({ children }) => {
  return <li className="flex items-center">{children}</li>;
};

interface BreadcrumbLinkProps {
  href: string;
  children: React.ReactNode;
}

export const BreadcrumbLink: React.FC<BreadcrumbLinkProps> = ({
  href,
  children,
}) => {
  return (
    <Link
      to={href}
      className="text-white lg:text-base text-[14px] hover:text-white/70 transition-colors">
      {children}
    </Link>
  );
};

interface BreadcrumbPageProps {
  children: React.ReactNode;
}

export const BreadcrumbPage: React.FC<BreadcrumbPageProps> = ({ children }) => {
  return <span className="text-[#FFFFFF] lg:text-base text-[12px] sm:text-[14px]">{children}</span>;
};

export const BreadcrumbSeparator: React.FC = () => {
  return (
    <span className="mx-2">
      <FaArrowRightLong className='lg:text-base text-[14px]' />
    </span>
  );
};
