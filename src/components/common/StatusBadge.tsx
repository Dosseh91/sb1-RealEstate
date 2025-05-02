import React from 'react';
import { ListingStatus } from '../../types';

interface StatusBadgeProps {
  status: ListingStatus;
  className?: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className = '' }) => {
  const baseClasses = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium';
  
  const statusClasses = {
    pending: 'bg-warning-50 text-warning-700 border border-warning-300',
    approved: 'bg-success-50 text-success-700 border border-success-300',
    rejected: 'bg-error-50 text-error-700 border border-error-300',
  }[status];
  
  const statusText = {
    pending: 'Pending Review',
    approved: 'Approved',
    rejected: 'Rejected',
  }[status];

  return (
    <span className={`${baseClasses} ${statusClasses} ${className}`}>
      {statusText}
    </span>
  );
};

export default StatusBadge;