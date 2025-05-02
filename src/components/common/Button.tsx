import React from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'success' | 'warning' | 'error' | 'link';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  icon,
  children,
  className = '',
  disabled = false,
  ...props
}) => {
  // Base classes
  const baseClasses = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  // Size classes
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  }[size];
  
  // Variant classes
  const variantClasses = {
    primary: 'bg-primary-700 text-white hover:bg-primary-800 focus:ring-primary-700 active:bg-primary-900 disabled:bg-primary-300',
    secondary: 'bg-accent-600 text-white hover:bg-accent-700 focus:ring-accent-600 active:bg-accent-800 disabled:bg-accent-300',
    outline: 'border border-primary-300 text-primary-700 hover:bg-primary-50 focus:ring-primary-500 active:bg-primary-100 disabled:text-primary-300',
    success: 'bg-success-500 text-white hover:bg-success-600 focus:ring-success-500 active:bg-success-700 disabled:bg-success-300',
    warning: 'bg-warning-500 text-white hover:bg-warning-600 focus:ring-warning-500 active:bg-warning-700 disabled:bg-warning-300',
    error: 'bg-error-500 text-white hover:bg-error-600 focus:ring-error-500 active:bg-error-700 disabled:bg-error-300',
    link: 'text-accent-600 hover:text-accent-800 hover:underline focus:ring-accent-500 p-0 disabled:text-accent-300',
  }[variant];
  
  // Full width class
  const widthClass = fullWidth ? 'w-full' : '';
  
  // Disabled class
  const disabledClass = disabled ? 'cursor-not-allowed opacity-70' : '';

  return (
    <button
      className={`${baseClasses} ${sizeClasses} ${variantClasses} ${widthClass} ${disabledClass} ${className}`}
      disabled={disabled}
      {...props}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
};

export default Button;