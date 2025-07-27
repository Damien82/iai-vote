import React from 'react';

interface StatCardProps {
  label: string;
  value: string | number;
}

const StatCard: React.FC<StatCardProps> = ({ label, value }) => (
  <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition transform duration-200">
    <div className="text-3xl font-bold">{value}</div>
    <div className="text-sm uppercase tracking-wide">{label}</div>
  </div>
);

export default StatCard;
