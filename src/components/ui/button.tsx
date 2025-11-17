'use client';

import * as React from 'react';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  variant?: 'default' | 'ghost';
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'default', asChild, children, ...props }, ref) => {
    const baseStyles =
      'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50';
    
    const variantStyles = {
      default: 'bg-brand-pink text-brand-dark hover:bg-pink-500',
      ghost: 'hover:bg-white/5',
    };

    const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${className}`;

    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children, {
        className: `${combinedClassName} ${children.props.className || ''}`,
        ...props,
      });
    }

    return (
      <button ref={ref} className={combinedClassName} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };
export default Button;

