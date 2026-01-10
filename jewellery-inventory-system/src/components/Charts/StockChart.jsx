import React from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { Eye, Loader } from 'lucide-react';

const StockChart = ({ data, loading }) => {
  return (
    <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-xl hover:shadow-2xl transition-all">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-2xl font-bold text-slate-800 mb-1">Stock Levels</h3>
          <p className="text-slate-600">Current inventory by product</p>
        </div>
        <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-lg border border-blue-200">
          <Eye className="w-4 h-4 text-blue-600" />
          <span className="text-sm font-bold text-blue-600">LIVE</span>
        </div>
      </div>
      {loading ? (
        <div className="flex items-center justify-center h-80">
          <Loader className="w-8 h-8 text-blue-500 animate-spin" />
        </div>
      ) : data.length > 0 ? (
        <ResponsiveContainer width="100%" height={320}>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="stockGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.05}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="name" stroke="#64748b" style={{ fontSize: '11px', fontWeight: '600' }} angle={-45} textAnchor="end" height={80} />
            <YAxis stroke="#64748b" style={{ fontSize: '13px', fontWeight: '600' }} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'white', 
                border: '1px solid #e2e8f0',
                borderRadius: '12px',
                boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
                padding: '12px'
              }}
              labelStyle={{ fontWeight: '700', color: '#1e293b' }}
            />
            <Area 
              type="monotone" 
              dataKey="stock" 
              stroke="#3b82f6" 
              strokeWidth={3} 
              fill="url(#stockGradient)"
              dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, fill: '#2563eb' }}
            />
          </AreaChart>
        </ResponsiveContainer>
      ) : (
        <div className="flex items-center justify-center h-80 text-slate-400">
          <p>No stock data available</p>
        </div>
      )}
    </div>
  );
};

export default StockChart;