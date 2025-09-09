import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import Icon from '../../../components/AppIcon';

const AnalyticsCharts = ({ timeRange = '7d', onTimeRangeChange = () => {} }) => {
  const [activeChart, setActiveChart] = useState('sales');

  const salesData = [
    { name: 'Mon', general: 120, vip: 45, total: 165 },
    { name: 'Tue', general: 98, vip: 32, total: 130 },
    { name: 'Wed', general: 156, vip: 67, total: 223 },
    { name: 'Thu', general: 134, vip: 54, total: 188 },
    { name: 'Fri', general: 189, vip: 89, total: 278 },
    { name: 'Sat', general: 245, vip: 123, total: 368 },
    { name: 'Sun', general: 198, vip: 98, total: 296 }
  ];

  const revenueData = [
    { name: 'Mon', revenue: 8250 },
    { name: 'Tue', revenue: 6500 },
    { name: 'Wed', revenue: 11150 },
    { name: 'Thu', revenue: 9400 },
    { name: 'Fri', revenue: 13900 },
    { name: 'Sat', revenue: 18400 },
    { name: 'Sun', revenue: 14800 }
  ];

  const eventTypeData = [
    { name: 'Conferences', value: 35, color: '#00D9FF' },
    { name: 'Concerts', value: 28, color: '#10B981' },
    { name: 'Sports', value: 20, color: '#F59E0B' },
    { name: 'Theater', value: 12, color: '#EF4444' },
    { name: 'Other', value: 5, color: '#64748B' }
  ];

  const customerDemographics = [
    { age: '18-25', count: 1250, percentage: 25 },
    { age: '26-35', count: 1875, percentage: 37.5 },
    { age: '36-45', count: 1000, percentage: 20 },
    { age: '46-55', count: 625, percentage: 12.5 },
    { age: '55+', count: 250, percentage: 5 }
  ];

  const timeRangeOptions = [
    { value: '7d', label: '7 Days' },
    { value: '30d', label: '30 Days' },
    { value: '90d', label: '90 Days' },
    { value: '1y', label: '1 Year' }
  ];

  const chartOptions = [
    { key: 'sales', label: 'Ticket Sales', icon: 'BarChart3' },
    { key: 'revenue', label: 'Revenue Trends', icon: 'TrendingUp' },
    { key: 'events', label: 'Event Types', icon: 'PieChart' },
    { key: 'demographics', label: 'Demographics', icon: 'Users' }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-card border-2 border-border rounded-lg p-3 shadow-elevation-2">
          <p className="font-medium text-foreground font-mono">{label}</p>
          {payload?.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry?.color }}>
              {entry?.dataKey}: {entry?.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const renderChart = () => {
    switch (activeChart) {
      case 'sales':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey="name" 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
                fontFamily="JetBrains Mono"
              />
              <YAxis 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
                fontFamily="JetBrains Mono"
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="general" fill="var(--color-accent)" radius={[2, 2, 0, 0]} />
              <Bar dataKey="vip" fill="var(--color-warning)" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        );

      case 'revenue':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey="name" 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
                fontFamily="JetBrains Mono"
              />
              <YAxis 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
                fontFamily="JetBrains Mono"
                tickFormatter={(value) => `$${(value / 1000)?.toFixed(0)}k`}
              />
              <Tooltip 
                content={<CustomTooltip />}
                formatter={(value) => [`$${value?.toLocaleString()}`, 'Revenue']}
              />
              <Line 
                type="monotone" 
                dataKey="revenue" 
                stroke="var(--color-success)" 
                strokeWidth={3}
                dot={{ fill: 'var(--color-success)', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: 'var(--color-success)', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        );

      case 'events':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={eventTypeData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percentage }) => `${name} ${percentage}%`}
                labelLine={false}
              >
                {eventTypeData?.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry?.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        );

      case 'demographics':
        return (
          <div className="space-y-4">
            {customerDemographics?.map((demo, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-sm font-medium text-foreground font-mono w-16">
                    {demo?.age}
                  </span>
                  <div className="flex-1 bg-border rounded-full h-3 w-48">
                    <div 
                      className="bg-accent h-3 rounded-full transition-all duration-500"
                      style={{ width: `${demo?.percentage}%` }}
                    ></div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-foreground font-mono">
                    {demo?.count?.toLocaleString()}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {demo?.percentage}%
                  </p>
                </div>
              </div>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-card border-2 border-border rounded-lg shadow-elevation-2">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div>
            <h2 className="text-xl font-semibold text-foreground font-mono">
              Analytics Dashboard
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Track performance and customer insights
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
            <select
              value={timeRange}
              onChange={(e) => onTimeRangeChange(e?.target?.value)}
              className="px-3 py-2 bg-input border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent font-mono"
            >
              {timeRangeOptions?.map((option) => (
                <option key={option?.value} value={option?.value}>
                  {option?.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      {/* Chart Navigation */}
      <div className="p-6 border-b border-border">
        <div className="flex flex-wrap gap-2">
          {chartOptions?.map((option) => (
            <button
              key={option?.key}
              onClick={() => setActiveChart(option?.key)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeChart === option?.key
                  ? 'bg-accent text-accent-foreground shadow-neo-sm'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              }`}
            >
              <Icon name={option?.icon} size={16} />
              <span>{option?.label}</span>
            </button>
          ))}
        </div>
      </div>
      {/* Chart Content */}
      <div className="p-6">
        <div className="mb-6">
          <h3 className="text-lg font-medium text-foreground font-mono mb-2">
            {chartOptions?.find(opt => opt?.key === activeChart)?.label}
          </h3>
          <p className="text-sm text-muted-foreground">
            {activeChart === 'sales' && 'Daily ticket sales breakdown by type'}
            {activeChart === 'revenue' && 'Revenue trends over selected period'}
            {activeChart === 'events' && 'Distribution of events by category'}
            {activeChart === 'demographics' && 'Customer age distribution'}
          </p>
        </div>

        {renderChart()}

        {/* Chart Legend */}
        {activeChart === 'sales' && (
          <div className="flex items-center justify-center space-x-6 mt-6">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-accent rounded"></div>
              <span className="text-sm text-muted-foreground">General Tickets</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-warning rounded"></div>
              <span className="text-sm text-muted-foreground">VIP Tickets</span>
            </div>
          </div>
        )}
      </div>
      {/* Summary Stats */}
      <div className="p-6 border-t border-border bg-muted/30">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-foreground font-mono">
              {salesData?.reduce((sum, day) => sum + day?.total, 0)?.toLocaleString()}
            </p>
            <p className="text-xs text-muted-foreground">Total Tickets</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-foreground font-mono">
              ${revenueData?.reduce((sum, day) => sum + day?.revenue, 0)?.toLocaleString()}
            </p>
            <p className="text-xs text-muted-foreground">Total Revenue</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-foreground font-mono">
              {Math.round(salesData?.reduce((sum, day) => sum + day?.total, 0) / salesData?.length)}
            </p>
            <p className="text-xs text-muted-foreground">Avg Daily Sales</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-foreground font-mono">
              ${Math.round(revenueData?.reduce((sum, day) => sum + day?.revenue, 0) / revenueData?.length)?.toLocaleString()}
            </p>
            <p className="text-xs text-muted-foreground">Avg Daily Revenue</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsCharts;