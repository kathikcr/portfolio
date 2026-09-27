import type { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from 'react';
import styles from './Button.module.css';

type Variant = 'primary' | 'ghost' | 'outline';
type Size = 'sm' | 'md' | 'lg';

interface BaseProps {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  className?: string;
}

type ButtonProps = BaseProps & ButtonHTMLAttributes<HTMLButtonElement> & { as?: 'button' };
type AnchorProps = BaseProps & AnchorHTMLAttributes<HTMLAnchorElement> & { as: 'a' };

type Props = ButtonProps | AnchorProps;

export function Button({ variant = 'ghost', size = 'md', children, className = '', ...rest }: Props) {
  const cls = [
    styles.btn,
    styles[variant],
    styles[size],
    className,
  ].join(' ');

  if (rest.as === 'a') {
    const { as: _as, variant: _v, size: _s, ...aProps } = rest as AnchorProps;
    return <a className={cls} {...aProps}>{children}</a>;
  }

  const { as: _as, variant: _v, size: _s, ...btnProps } = rest as ButtonProps;
  return <button className={cls} {...btnProps}>{children}</button>;
}
