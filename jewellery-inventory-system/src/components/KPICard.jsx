import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

const KPICard = ({ 
  title, 
  value, 
  change, 
  isPositive, 
  icon: Icon, 
  bgColor, 
  iconColor, 
  textColor 
}) => {
  return (
    <div className={`${bgColor} rounded-2xl p-6 border border-slate-200 hover:shadow-xl transition-all duration-300 cursor-pointer group`}>
      <div className="flex items-start justify-between mb-4">
        <div className={`${iconColor} p-3 rounded-xl shadow-lg group-hover:scale-110 transition-transform`}>
          <Icon className="w-6 h-6 text-white" strokeWidth={2.5} />
        </div>
        <div className="flex items-center space-x-1">
          {isPositive ? (
            <ArrowUpRight className="w-4 h-4 text-emerald-600" />
          ) : (
            <ArrowDownRight className="w-4 h-4 text-red-600" />
          )}
          <span className={`text-sm font-bold ${isPositive ? 'text-emerald-600' : 'text-red-600'}`}>
            {change}
          </span>
        </div>
      </div>
      <p className="text-slate-600 text-sm font-semibold mb-2">{title}</p>
      <p className={`text-4xl font-bold ${textColor}`}>{value}</p>
    </div>
  );
};

export default KPICard;