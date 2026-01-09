import React from 'react';
import { Eye } from 'lucide-react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const InventoryChart = ({ inventoryData }) => {
  return (
    <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-lg hover:shadow-xl transition-all">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-2xl font-bold text-slate-800 mb-1">Inventory Mix</h3>
          <p className="text-slate-600">Stock distribution by material</p>
        </div>
        <div className="flex items-center space-x-2 bg-purple-50 px-4 py-2 rounded-lg border border-purple-200">
          <Eye className="w-4 h-4 text-purple-600" />
          <span className="text-sm font-bold text-purple-600">LIVE</span>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <ResponsiveContainer width="50%" height={280}>
          <PieChart>
            <Pie
              data={inventoryData}
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={100}
              paddingAngle={2}
              dataKey="value"
            >
              {inventoryData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} stroke="white" strokeWidth={3} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'white', 
                border: '1px solid #e2e8f0',
                borderRadius: '12px',
                boxShadow: '0 10px 40px rgba(0,0,0,0.1)'
              }} 
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="w-1/2 space-y-3">
          {inventoryData.map((item, index) => (
            <div key={index} className="bg-slate-50 rounded-xl p-4 border border-slate-200 hover:shadow-md transition-all">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 rounded-full shadow-md" style={{ backgroundColor: item.color }}></div>
                  <span className="text-sm font-bold text-slate-800">{item.name}</span>
                </div>
                <span className="text-sm font-bold text-slate-600">{item.percentage}%</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                <div 
                  className="h-2 rounded-full transition-all duration-500" 
                  style={{ backgroundColor: item.color, width: `${item.percentage}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InventoryChart;