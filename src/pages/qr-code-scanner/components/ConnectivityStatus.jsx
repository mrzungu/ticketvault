import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const ConnectivityStatus = ({ className = '' }) => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [lastSync, setLastSync] = useState(new Date());
  const [syncStatus, setSyncStatus] = useState('synced');
  const [pendingScans, setPendingScans] = useState(0);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setSyncStatus('syncing');
      
      // Simulate sync process
      setTimeout(() => {
        setSyncStatus('synced');
        setLastSync(new Date());
        setPendingScans(0);
      }, 2000);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setSyncStatus('offline');
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Simulate periodic sync check
    const syncInterval = setInterval(() => {
      if (isOnline) {
        setLastSync(new Date());
        // Randomly simulate pending scans when offline
        if (Math.random() > 0.8) {
          setPendingScans(Math.floor(Math.random() * 5));
        }
      }
    }, 30000);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      clearInterval(syncInterval);
    };
  }, [isOnline]);

  const getStatusIcon = () => {
    if (!isOnline) return 'WifiOff';
    if (syncStatus === 'syncing') return 'RefreshCw';
    if (syncStatus === 'synced') return 'Wifi';
    return 'AlertTriangle';
  };

  const getStatusColor = () => {
    if (!isOnline) return 'text-destructive';
    if (syncStatus === 'syncing') return 'text-warning';
    if (syncStatus === 'synced') return 'text-success';
    return 'text-muted-foreground';
  };

  const getStatusBg = () => {
    if (!isOnline) return 'bg-destructive/10 border-destructive/20';
    if (syncStatus === 'syncing') return 'bg-warning/10 border-warning/20';
    if (syncStatus === 'synced') return 'bg-success/10 border-success/20';
    return 'bg-muted/10 border-border';
  };

  const getStatusText = () => {
    if (!isOnline) return 'OFFLINE';
    if (syncStatus === 'syncing') return 'SYNCING';
    if (syncStatus === 'synced') return 'ONLINE';
    return 'UNKNOWN';
  };

  const formatLastSync = () => {
    const now = new Date();
    const diff = Math.floor((now - lastSync) / 1000);
    
    if (diff < 60) return `${diff}s ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    return `${Math.floor(diff / 3600)}h ago`;
  };

  return (
    <div className={`bg-card border-2 border-border rounded-lg shadow-elevation-1 ${className}`}>
      <div className="p-4">
        {/* Main Status */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center border ${getStatusBg()}`}>
              <Icon 
                name={getStatusIcon()} 
                size={20} 
                className={`${getStatusColor()} ${syncStatus === 'syncing' ? 'animate-spin' : ''}`} 
              />
            </div>
            <div>
              <h3 className={`font-semibold font-mono ${getStatusColor()}`}>
                {getStatusText()}
              </h3>
              <p className="text-sm text-muted-foreground">
                Database Connection
              </p>
            </div>
          </div>
          
          {/* Connection Indicator */}
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${
              isOnline ? 'bg-success animate-pulse-glow' : 'bg-destructive'
            }`}></div>
            <span className="text-xs font-mono text-muted-foreground">
              {isOnline ? 'CONNECTED' : 'DISCONNECTED'}
            </span>
          </div>
        </div>

        {/* Status Details */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-muted/50 rounded-lg p-3">
            <div className="flex items-center space-x-2 mb-1">
              <Icon name="Clock" size={16} className="text-muted-foreground" />
              <span className="text-xs font-medium text-foreground">LAST SYNC</span>
            </div>
            <p className="text-sm font-mono text-muted-foreground">
              {isOnline ? formatLastSync() : 'Offline'}
            </p>
          </div>
          
          <div className="bg-muted/50 rounded-lg p-3">
            <div className="flex items-center space-x-2 mb-1">
              <Icon name="Database" size={16} className="text-muted-foreground" />
              <span className="text-xs font-medium text-foreground">PENDING</span>
            </div>
            <p className="text-sm font-mono text-muted-foreground">
              {pendingScans} scans
            </p>
          </div>
        </div>

        {/* Offline Warning */}
        {!isOnline && (
          <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3 mb-4">
            <div className="flex items-start space-x-3">
              <Icon name="AlertTriangle" size={16} className="text-destructive mt-0.5" />
              <div>
                <p className="text-sm font-medium text-destructive mb-1">
                  Offline Mode Active
                </p>
                <p className="text-xs text-destructive/80">
                  Scans will be queued and synced when connection is restored.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Pending Scans Warning */}
        {pendingScans > 0 && (
          <div className="bg-warning/10 border border-warning/20 rounded-lg p-3 mb-4">
            <div className="flex items-start space-x-3">
              <Icon name="Upload" size={16} className="text-warning mt-0.5" />
              <div>
                <p className="text-sm font-medium text-warning mb-1">
                  {pendingScans} Pending Sync{pendingScans > 1 ? 's' : ''}
                </p>
                <p className="text-xs text-warning/80">
                  These scans will be uploaded when connection is stable.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Connection Details */}
        <div className="space-y-2 text-xs text-muted-foreground font-mono">
          <div className="flex justify-between">
            <span>Server Status:</span>
            <span className={isOnline ? 'text-success' : 'text-destructive'}>
              {isOnline ? 'Reachable' : 'Unreachable'}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Sync Mode:</span>
            <span>Real-time</span>
          </div>
          <div className="flex justify-between">
            <span>Session ID:</span>
            <span>SCAN-{new Date()?.getTime()?.toString()?.slice(-6)}</span>
          </div>
          <div className="flex justify-between">
            <span>Location:</span>
            <span>Main Entrance</span>
          </div>
        </div>

        {/* Manual Sync Button */}
        {isOnline && (
          <div className="mt-4 pt-4 border-t border-border">
            <button
              onClick={() => {
                setSyncStatus('syncing');
                setTimeout(() => {
                  setSyncStatus('synced');
                  setLastSync(new Date());
                  setPendingScans(0);
                }, 1500);
              }}
              disabled={syncStatus === 'syncing'}
              className="w-full flex items-center justify-center space-x-2 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors duration-150 rounded-lg disabled:opacity-50"
            >
              <Icon 
                name="RefreshCw" 
                size={16} 
                className={syncStatus === 'syncing' ? 'animate-spin' : ''} 
              />
              <span>Force Sync</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConnectivityStatus;