import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const RevenueChart = ({ revenueData }) => {
  return (
    <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-lg hover:shadow-xl transition-all">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-2xl font-bold text-slate-800 mb-1">Monthly Revenue vs Target</h3>
          <p className="text-slate-600">6-month performance comparison</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-gradient-to-r from-amber-500 to-orange-500 rounded"></div>
            <span className="text-sm font-semibold text-slate-600">Revenue</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-slate-300 rounded"></div>
            <span className="text-sm font-semibold text-slate-600">Target</span>
          </div>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={revenueData} barGap={8}>
          <defs>
            <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f59e0b" stopOpacity={1}/>
              <stop offset="100%" stopColor="#f97316" stopOpacity={0.8}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="month" stroke="#64748b" style={{ fontSize: '13px', fontWeight: '600' }} />
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
          <Legend 
            wrapperStyle={{ paddingTop: '20px', fontWeight: '600' }}
          />
          <Bar 
            dataKey="revenue" 
            fill="url(#barGradient)" 
            radius={[10, 10, 0, 0]}
            name="Revenue"
          />
          <Bar 
            dataKey="target" 
            fill="#cbd5e1" 
            radius={[10, 10, 0, 0]}
            name="Target"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RevenueChart;