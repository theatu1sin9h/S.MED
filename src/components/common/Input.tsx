import React, { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  fullWidth?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, fullWidth = false, className = '', ...props }, ref) => {
    const widthClass = fullWidth ? 'w-full' : '';
    const errorClass = error ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 dark:border-gray-700 focus:ring-blue-500 focus:border-blue-500';
    
    return (
      <div className={`${widthClass} ${className}`}>
        {label && (
          <label htmlFor={props.id} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {label}
          </label>
        )}
        <div className="relative rounded-md">
          {icon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              {React.cloneElement(icon as React.ReactElement, { 
                className: 'h-5 w-5 text-gray-400',
                'aria-hidden': true 
              })}
            </div>
          )}
          <input
            ref={ref}
            className={`
              bg-white dark:bg-gray-900 
              text-gray-900 dark:text-gray-100
              rounded-md 
              shadow-sm 
              block w-full 
              ${icon ? 'pl-10' : 'pl-3'} 
              pr-3 
              py-2 
              ${errorClass}
              placeholder-gray-400
              focus:outline-none focus:ring-2
              transition-colors duration-200
            `}
            {...props}
          />
        </div>
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;