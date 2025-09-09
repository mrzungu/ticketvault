import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ScanHistoryLog = ({ 
  scanHistory = [],
  onClearHistory = () => {},
  onExportHistory = () => {},
  className = ''
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');

  // Mock scan history data
  const mockHistory = scanHistory?.length > 0 ? scanHistory : [
    {
      id: 1,
      ticketId: 'TKT-2025-001234',
      attendeeName: 'John Smith',
      timestamp: new Date(Date.now() - 300000)?.toISOString(),
      status: 'valid',
      seatNumber: 'A-15',
      ticketType: 'VIP',
      scannedBy: 'Staff-001'
    },
    {
      id: 2,
      ticketId: 'TKT-2025-005678',
      attendeeName: 'Sarah Johnson',
      timestamp: new Date(Date.now() - 600000)?.toISOString(),
      status: 'invalid',
      seatNumber: 'B-22',
      ticketType: 'General',
      scannedBy: 'Staff-001',
      error: 'Already scanned'
    },
    {
      id: 3,
      ticketId: 'TKT-2025-009876',
      attendeeName: 'Mike Wilson',
      timestamp: new Date(Date.now() - 900000)?.toISOString(),
      status: 'valid',
      seatNumber: 'C-08',
      ticketType: 'General',
      scannedBy: 'Staff-001'
    },
    {
      id: 4,
      ticketId: 'TKT-2025-004321',
      attendeeName: 'Emma Davis',
      timestamp: new Date(Date.now() - 1200000)?.toISOString(),
      status: 'valid',
      seatNumber: 'A-03',
      ticketType: 'VIP',
      scannedBy: 'Staff-001'
    },
    {
      id: 5,
      ticketId: 'MANUAL-ENTRY-001',
      attendeeName: 'Robert Brown',
      timestamp: new Date(Date.now() - 1500000)?.toISOString(),
      status: 'manual',
      seatNumber: 'D-12',
      ticketType: 'General',
      scannedBy: 'Staff-001',
      isManualEntry: true
    }
  ];

  const filteredHistory = mockHistory?.filter(scan => {
    if (filterStatus === 'all') return true;
    return scan?.status === filterStatus;
  });

  const getStatusIcon = (status) => {
    switch (status) {
      case 'valid': return 'CheckCircle';
      case 'invalid': return 'XCircle';
      case 'manual': return 'Edit';
      default: return 'AlertCircle';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'valid': return 'text-success';
      case 'invalid': return 'text-destructive';
      case 'manual': return 'text-warning';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusBg = (status) => {
    switch (status) {
      case 'valid': return 'bg-success/10 border-success/20';
      case 'invalid': return 'bg-destructive/10 border-destructive/20';
      case 'manual': return 'bg-warning/10 border-warning/20';
      default: return 'bg-muted/10 border-border';
    }
  };

  const getStats = () => {
    const total = mockHistory?.length;
    const valid = mockHistory?.filter(s => s?.status === 'valid')?.length;
    const invalid = mockHistory?.filter(s => s?.status === 'invalid')?.length;
    const manual = mockHistory?.filter(s => s?.status === 'manual')?.length;
    
    return { total, valid, invalid, manual };
  };

  const stats = getStats();

  return (
    <div className={`bg-card border-2 border-border rounded-lg shadow-elevation-1 ${className}`}>
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center space-x-3 hover:bg-muted/50 transition-colors duration-150 rounded-lg p-2 -m-2"
          >
            <div className="w-10 h-10 bg-secondary/20 rounded-lg flex items-center justify-center">
              <Icon name="History" size={20} className="text-muted-foreground" />
            </div>
            <div className="text-left">
              <h3 className="font-semibold text-foreground font-mono">
                Scan History
              </h3>
              <p className="text-sm text-muted-foreground">
                {stats?.total} scans today
              </p>
            </div>
            <Icon 
              name={isExpanded ? "ChevronUp" : "ChevronDown"} 
              size={20} 
              className="text-muted-foreground ml-2" 
            />
          </button>

          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={onExportHistory}
              iconName="Download"
            />
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearHistory}
              iconName="Trash2"
            />
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mt-4 grid grid-cols-4 gap-3">
          <div className="text-center">
            <p className="text-lg font-bold text-foreground font-mono">
              {stats?.total}
            </p>
            <p className="text-xs text-muted-foreground">Total</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-success font-mono">
              {stats?.valid}
            </p>
            <p className="text-xs text-muted-foreground">Valid</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-destructive font-mono">
              {stats?.invalid}
            </p>
            <p className="text-xs text-muted-foreground">Invalid</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-warning font-mono">
              {stats?.manual}
            </p>
            <p className="text-xs text-muted-foreground">Manual</p>
          </div>
        </div>
      </div>
      {/* Expanded Content */}
      {isExpanded && (
        <div className="p-4">
          {/* Filter Controls */}
          <div className="flex items-center space-x-2 mb-4">
            <span className="text-sm font-medium text-muted-foreground font-mono">
              FILTER:
            </span>
            {['all', 'valid', 'invalid', 'manual']?.map((status) => (
              <Button
                key={status}
                variant={filterStatus === status ? "default" : "ghost"}
                size="sm"
                onClick={() => setFilterStatus(status)}
                className="capitalize"
              >
                {status}
              </Button>
            ))}
          </div>

          {/* History List */}
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {filteredHistory?.length === 0 ? (
              <div className="text-center py-8">
                <Icon name="Search" size={48} className="text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">
                  No scans found for selected filter
                </p>
              </div>
            ) : (
              filteredHistory?.map((scan) => (
                <div
                  key={scan?.id}
                  className={`border rounded-lg p-4 transition-all duration-150 hover:shadow-elevation-1 ${getStatusBg(scan?.status)}`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getStatusBg(scan?.status)}`}>
                        <Icon 
                          name={getStatusIcon(scan?.status)} 
                          size={16} 
                          className={getStatusColor(scan?.status)} 
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <p className="font-medium text-foreground">
                            {scan?.attendeeName}
                          </p>
                          {scan?.isManualEntry && (
                            <span className="px-2 py-0.5 bg-warning/20 text-warning text-xs rounded-full font-mono">
                              MANUAL
                            </span>
                          )}
                        </div>
                        <p className="text-sm font-mono text-muted-foreground mb-1">
                          {scan?.ticketId}
                        </p>
                        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                          <span>Seat: {scan?.seatNumber}</span>
                          <span>{scan?.ticketType}</span>
                          <span>By: {scan?.scannedBy}</span>
                        </div>
                        {scan?.error && (
                          <p className="text-xs text-destructive mt-1">
                            Error: {scan?.error}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-mono text-foreground">
                        {new Date(scan.timestamp)?.toLocaleTimeString()}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(scan.timestamp)?.toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Export Options */}
          <div className="mt-6 pt-4 border-t border-border">
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                variant="outline"
                onClick={onExportHistory}
                iconName="FileText"
                iconPosition="left"
                className="flex-1"
              >
                Export as CSV
              </Button>
              <Button
                variant="outline"
                onClick={() => window.print()}
                iconName="Printer"
                iconPosition="left"
                className="flex-1"
              >
                Print Report
              </Button>
              <Button
                variant="destructive"
                onClick={onClearHistory}
                iconName="Trash2"
                iconPosition="left"
                className="flex-1"
              >
                Clear History
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScanHistoryLog;