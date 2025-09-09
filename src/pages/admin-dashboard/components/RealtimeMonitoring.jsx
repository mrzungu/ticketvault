import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const RealtimeMonitoring = ({ onAlertClick = () => {} }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeScans, setActiveScans] = useState(12);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      // Simulate real-time data updates
      setActiveScans(prev => Math.max(0, prev + Math.floor(Math.random() * 3) - 1));
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const monitoringData = {
    activeScanners: 8,
    scansPerMinute: 45,
    systemUptime: "99.8%",
    fraudDetected: 3,
    lastScanTime: "2 seconds ago",
    serverLoad: 68,
    databaseConnections: 24,
    apiResponseTime: "120ms"
  };

  const recentActivities = [
    {
      id: 1,
      type: "scan_success",
      message: "Ticket EVT001-TKT-4521 validated successfully",
      timestamp: "2 minutes ago",
      location: "Main Entrance - Scanner 3",
      icon: "CheckCircle",
      color: "text-success"
    },
    {
      id: 2,
      type: "fraud_alert",
      message: "Duplicate ticket detected - EVT002-TKT-1234",
      timestamp: "5 minutes ago",
      location: "VIP Entrance - Scanner 1",
      icon: "AlertTriangle",
      color: "text-destructive"
    },
    {
      id: 3,
      type: "system_info",
      message: "Scanner 5 came online",
      timestamp: "8 minutes ago",
      location: "Side Entrance",
      icon: "Wifi",
      color: "text-accent"
    },
    {
      id: 4,
      type: "scan_success",
      message: "VIP ticket EVT001-VIP-0089 validated",
      timestamp: "12 minutes ago",
      location: "VIP Entrance - Scanner 1",
      icon: "Crown",
      color: "text-warning"
    },
    {
      id: 5,
      type: "scan_failed",
      message: "Invalid QR code scanned",
      timestamp: "15 minutes ago",
      location: "Main Entrance - Scanner 2",
      icon: "XCircle",
      color: "text-destructive"
    }
  ];

  const systemAlerts = [
    {
      id: 1,
      severity: "high",
      title: "Multiple Fraud Attempts",
      message: "3 duplicate tickets detected in the last hour",
      action: "Review Security Logs",
      timestamp: "10 minutes ago"
    },
    {
      id: 2,
      severity: "medium",
      title: "Scanner Offline",
      message: "Scanner 7 at East Entrance is not responding",
      action: "Check Connection",
      timestamp: "25 minutes ago"
    },
    {
      id: 3,
      severity: "low",
      title: "High Traffic Volume",
      message: "Scan rate increased by 40% in the last 30 minutes",
      action: "Monitor Performance",
      timestamp: "1 hour ago"
    }
  ];

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'border-destructive bg-destructive/10 text-destructive';
      case 'medium': return 'border-warning bg-warning/10 text-warning';
      case 'low': return 'border-accent bg-accent/10 text-accent';
      default: return 'border-border bg-muted/10 text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6">
      {/* System Status Overview */}
      <div className="bg-card border-2 border-border rounded-lg p-6 shadow-elevation-1">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-foreground font-mono">
            Real-time Monitoring
          </h2>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            <span className="text-sm text-success font-mono">Live</span>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="text-center p-4 bg-muted/30 rounded-lg">
            <Icon name="Scan" size={24} className="text-accent mx-auto mb-2" />
            <p className="text-2xl font-bold text-foreground font-mono">{activeScans}</p>
            <p className="text-xs text-muted-foreground">Active Scans</p>
          </div>
          <div className="text-center p-4 bg-muted/30 rounded-lg">
            <Icon name="Shield" size={24} className="text-success mx-auto mb-2" />
            <p className="text-2xl font-bold text-foreground font-mono">{monitoringData?.activeScanners}</p>
            <p className="text-xs text-muted-foreground">Online Scanners</p>
          </div>
          <div className="text-center p-4 bg-muted/30 rounded-lg">
            <Icon name="Zap" size={24} className="text-warning mx-auto mb-2" />
            <p className="text-2xl font-bold text-foreground font-mono">{monitoringData?.scansPerMinute}</p>
            <p className="text-xs text-muted-foreground">Scans/Minute</p>
          </div>
          <div className="text-center p-4 bg-muted/30 rounded-lg">
            <Icon name="Clock" size={24} className="text-accent mx-auto mb-2" />
            <p className="text-2xl font-bold text-foreground font-mono">{monitoringData?.systemUptime}</p>
            <p className="text-xs text-muted-foreground">Uptime</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* System Performance */}
          <div>
            <h3 className="text-sm font-medium text-foreground mb-4 font-mono">System Performance</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Server Load</span>
                <span className="text-sm font-mono text-foreground">{monitoringData?.serverLoad}%</span>
              </div>
              <div className="w-full bg-border rounded-full h-2">
                <div 
                  className="bg-accent h-2 rounded-full transition-all duration-300"
                  style={{ width: `${monitoringData?.serverLoad}%` }}
                ></div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">DB Connections</span>
                <span className="text-sm font-mono text-foreground">{monitoringData?.databaseConnections}/50</span>
              </div>
              <div className="w-full bg-border rounded-full h-2">
                <div 
                  className="bg-success h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(monitoringData?.databaseConnections / 50) * 100}%` }}
                ></div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">API Response</span>
                <span className="text-sm font-mono text-foreground">{monitoringData?.apiResponseTime}</span>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div>
            <h3 className="text-sm font-medium text-foreground mb-4 font-mono">Quick Stats</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Icon name="AlertTriangle" size={16} className="text-destructive" />
                  <span className="text-sm text-foreground">Fraud Detected</span>
                </div>
                <span className="text-sm font-bold text-destructive font-mono">{monitoringData?.fraudDetected}</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Icon name="Clock" size={16} className="text-accent" />
                  <span className="text-sm text-foreground">Last Scan</span>
                </div>
                <span className="text-sm font-mono text-foreground">{monitoringData?.lastScanTime}</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Icon name="Activity" size={16} className="text-success" />
                  <span className="text-sm text-foreground">System Status</span>
                </div>
                <span className="text-sm font-bold text-success font-mono">Healthy</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Recent Activities */}
      <div className="bg-card border-2 border-border rounded-lg shadow-elevation-1">
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-foreground font-mono">
              Recent Activities
            </h3>
            <span className="text-sm text-muted-foreground font-mono">
              Last updated: {currentTime?.toLocaleTimeString()}
            </span>
          </div>
        </div>
        
        <div className="max-h-80 overflow-y-auto">
          {recentActivities?.map((activity) => (
            <div key={activity?.id} className="p-4 border-b border-border last:border-b-0 hover:bg-muted/30 transition-colors duration-150">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <Icon name={activity?.icon} size={18} className={activity?.color} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground font-medium">
                    {activity?.message}
                  </p>
                  <div className="flex items-center space-x-4 mt-1">
                    <span className="text-xs text-muted-foreground font-mono">
                      {activity?.timestamp}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {activity?.location}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* System Alerts */}
      <div className="bg-card border-2 border-border rounded-lg shadow-elevation-1">
        <div className="p-6 border-b border-border">
          <h3 className="text-lg font-semibold text-foreground font-mono">
            System Alerts
          </h3>
        </div>
        
        <div className="p-6 space-y-4">
          {systemAlerts?.map((alert) => (
            <div
              key={alert?.id}
              className={`p-4 rounded-lg border-2 ${getSeverityColor(alert?.severity)} cursor-pointer hover:scale-[1.02] transition-all duration-200`}
              onClick={() => onAlertClick(alert)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium font-mono uppercase ${getSeverityColor(alert?.severity)}`}>
                      {alert?.severity}
                    </span>
                    <span className="text-xs text-muted-foreground font-mono">
                      {alert?.timestamp}
                    </span>
                  </div>
                  <h4 className="font-medium text-foreground mb-1">
                    {alert?.title}
                  </h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    {alert?.message}
                  </p>
                  <button className="text-sm font-medium text-accent hover:text-accent/80 transition-colors duration-150">
                    {alert?.action} →
                  </button>
                </div>
                <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RealtimeMonitoring;