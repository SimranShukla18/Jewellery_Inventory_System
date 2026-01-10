import React from 'react';
import { AlertCircle } from 'lucide-react';

const ErrorBanner = ({ error }) => {
  if (!error) return null;
  
  return (
    <div className="mb-8 bg-red-50 border border-red-200 rounded-2xl p-6 shadow-lg">
      <div className="flex items-center gap-3">
        <AlertCircle className="w-6 h-6 text-red-600" />
        <div>
          <h3 className="text-lg font-bold text-red-800">Connection Error</h3>
          <p className="text-sm text-red-600">Unable to fetch data: {error}</p>
          <p className="text-xs text-red-500 mt-1">Ensure backend is running at http://localhost:5000</p>
        </div>
      </div>
    </div>
  );
};

export default ErrorBanner;