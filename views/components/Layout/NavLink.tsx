import React from 'react';
import Link, { LinkProps } from 'next/link';
import { useRouter } from 'next/router';

export interface NavLinkProps extends LinkProps {
  children: React.ReactElement;
  hasSubcategories?: boolean;
}

export function NavLink({ children, href, ...props }: NavLinkProps) {
  const router = useRouter();
  let isActive = router.pathname === href;
  if (!isActive && props.hasSubcategories) {
    isActive = router.pathname.includes(href.toString() + '/');
  }
  return (
    <Link href={href} {...props}>
      {isActive ? React.cloneElement(children, { 'data-active': true }) : children}
    </Link>
  );
}
