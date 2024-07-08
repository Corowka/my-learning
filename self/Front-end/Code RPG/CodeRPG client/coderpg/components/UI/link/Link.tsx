

import router from 'next/router';
import { ReactNode } from 'react';

interface LinkProps {
  href: string
  children: ReactNode
}

export const Link = ({ href, children }: LinkProps) => {

  const customLinkOnClick = (e: any) => {
    e.preventDefault();
    router.push(href);
  }

  return (
    <a
      href={href}
      onClick={e => customLinkOnClick(e)}
      style={{ textDecoration: "none" }}
    >
      {children}
    </a>
  );
}
