import React from 'react';
import { cn } from '../../lib/utils';

const Badge = ({ className, children, ...props }) => (
  <span className={cn("inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium", className)} {...props}>
    {children}
  </span>
);

export default Badge;
