import React from 'react';
import Icon from '../../../components/AppIcon';

const MetricsOverview = ({ metrics = {} }) => {
  const defaultMetrics = {
    totalEvents: 24,
    totalTicketsSold: 15847,
    totalRevenue: 284750.50,
    activeEvents: 8,
    pendingRefunds: 12,
    fraudAlerts: 3,
    ...metrics
  };

  const metricCards = [
    {
      title: "Total Events",
      value: defaultMetrics?.totalEvents,
      change: "+12%",
      changeType: "positive",
      icon: "Calendar",
      description: "Active & completed events"
    },
    {
      title: "Tickets Sold",
      value: defaultMetrics?.totalTicketsSold?.toLocaleString(),
      change: "+8.5%",
      changeType: "positive",
      icon: "Ticket",
      description: "All-time ticket sales"
    },
    {
      title: "Total Revenue",
      value: `$${defaultMetrics?.totalRevenue?.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
      change: "+15.2%",
      changeType: "positive",
      icon: "DollarSign",
      description: "Gross revenue generated"
    },
    {
      title: "Active Events",
      value: defaultMetrics?.activeEvents,
      change: "0%",
      changeType: "neutral",
      icon: "Activity",
      description: "Currently selling tickets"
    },
    {
      title: "Pending Refunds",
      value: defaultMetrics?.pendingRefunds,
      change: "-5%",
      changeType: "positive",
      icon: "RefreshCw",
      description: "Awaiting processing"
    },
    {
      title: "Fraud Alerts",
      value: defaultMetrics?.fraudAlerts,
      change: "+2",
      changeType: "negative",
      icon: "Shield",
      description: "Security incidents"
    }
  ];

  const getChangeColor = (type) => {
    switch (type) {
      case 'positive': return 'text-success';
      case 'negative': return 'text-destructive';
      default: return 'text-muted-foreground';
    }
  };

  const getChangeIcon = (type) => {
    switch (type) {
      case 'positive': return 'TrendingUp';
      case 'negative': return 'TrendingDown';
      default: return 'Minus';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {metricCards?.map((metric, index) => (
        <div
          key={index}
          className="bg-card border-2 border-border rounded-lg p-6 shadow-elevation-1 hover:shadow-elevation-2 transition-all duration-200 hover:scale-[1.02]"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center">
                <Icon name={metric?.icon} size={24} className="text-accent" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground font-mono">
                  {metric?.title}
                </h3>
                <p className="text-2xl font-bold text-foreground font-mono">
                  {metric?.value}
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground">
              {metric?.description}
            </p>
            <div className={`flex items-center space-x-1 ${getChangeColor(metric?.changeType)}`}>
              <Icon name={getChangeIcon(metric?.changeType)} size={14} />
              <span className="text-xs font-medium font-mono">
                {metric?.change}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MetricsOverview;