import React, { memo } from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/UI/BreadCrumb';

export interface BreadCrumb {
  title: string | undefined;
  link?: string;
}

export interface BreadCrumbTitleProps {
  title?: string | undefined | null;
  breadcrumbs: BreadCrumb[];
  className?: string;
}

const BreadCrumbTitle = ({
  title,
  breadcrumbs,
  className,
}: BreadCrumbTitleProps) => {
  return (
    <section className={`pt-[118px] text-white ${className}`}>
      <div className="main-container">
        <div>
          <Breadcrumb>
            <BreadcrumbList>
              {breadcrumbs?.map((item, index) => (
                <React.Fragment key={index}>
                  {item.link ? (
                    <BreadcrumbItem>
                      <BreadcrumbLink href={item.link}>
                        {item.title}
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                  ) : (
                    <BreadcrumbItem>
                      <BreadcrumbPage>{item.title}</BreadcrumbPage>
                    </BreadcrumbItem>
                  )}
                  {index < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
                </React.Fragment>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        {title && (
          <div className="mt-4">
            <h1 className="text-[20px] sm:text-[28px] md:text-[38px] lg:text-[48px] font-bold">
              {title}
            </h1>
          </div>
        )}
      </div>
    </section>
  );
};

export default memo(BreadCrumbTitle);
