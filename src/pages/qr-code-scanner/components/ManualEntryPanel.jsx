import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ManualEntryPanel = ({ 
  onManualScan = () => {},
  isProcessing = false,
  className = ''
}) => {
  const [ticketCode, setTicketCode] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e?.preventDefault();
    
    // Validation
    const newErrors = {};
    if (!ticketCode?.trim()) {
      newErrors.ticketCode = 'Ticket code is required';
    } else if (ticketCode?.length < 8) {
      newErrors.ticketCode = 'Ticket code must be at least 8 characters';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors)?.length === 0) {
      // Simulate manual scan result
      const mockResult = {
        ticketId: ticketCode?.toUpperCase(),
        eventId: 'EVT-MANUAL-ENTRY-2025',
        attendeeName: 'Manual Entry User',
        seatNumber: 'MANUAL',
        ticketType: 'General',
        isValid: ticketCode?.includes('VALID'),
        error: ticketCode?.includes('VALID') ? null : 'Manual entry - verification required',
        timestamp: new Date()?.toISOString(),
        isManualEntry: true
      };
      
      onManualScan(mockResult);
      setTicketCode('');
      setIsExpanded(false);
    }
  };

  const handleQuickCode = (code) => {
    setTicketCode(code);
    setErrors({});
  };

  const quickCodes = [
    { label: 'Valid Test', code: 'VALID-TEST-001' },
    { label: 'Invalid Test', code: 'INVALID-TEST-001' },
    { label: 'VIP Test', code: 'VIP-VALID-001' }
  ];

  return (
    <div className={`bg-card border-2 border-border rounded-lg shadow-elevation-1 ${className}`}>
      {/* Header */}
      <div className="p-4 border-b border-border">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-between text-left hover:bg-muted/50 transition-colors duration-150 rounded-lg p-2 -m-2"
        >
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-secondary/20 rounded-lg flex items-center justify-center">
              <Icon name="Keyboard" size={20} className="text-muted-foreground" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground font-mono">
                Manual Entry
              </h3>
              <p className="text-sm text-muted-foreground">
                Enter ticket code manually
              </p>
            </div>
          </div>
          <Icon 
            name={isExpanded ? "ChevronUp" : "ChevronDown"} 
            size={20} 
            className="text-muted-foreground" 
          />
        </button>
      </div>
      {/* Expanded Content */}
      {isExpanded && (
        <div className="p-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Manual Code Input */}
            <Input
              label="Ticket Code"
              type="text"
              placeholder="Enter ticket code (e.g., TKT-2025-001234)"
              value={ticketCode}
              onChange={(e) => {
                setTicketCode(e?.target?.value?.toUpperCase());
                if (errors?.ticketCode) {
                  setErrors(prev => ({ ...prev, ticketCode: null }));
                }
              }}
              error={errors?.ticketCode}
              required
              className="font-mono"
            />

            {/* Quick Test Codes */}
            <div>
              <label className="text-sm font-medium text-muted-foreground font-mono mb-2 block">
                QUICK TEST CODES
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {quickCodes?.map((item) => (
                  <Button
                    key={item?.code}
                    variant="ghost"
                    size="sm"
                    onClick={() => handleQuickCode(item?.code)}
                    className="justify-start font-mono text-xs"
                  >
                    {item?.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex space-x-3">
              <Button
                type="submit"
                variant="default"
                loading={isProcessing}
                disabled={!ticketCode?.trim()}
                iconName="Search"
                iconPosition="left"
                className="flex-1 font-medium"
              >
                Validate Code
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setTicketCode('');
                  setErrors({});
                }}
                iconName="RotateCcw"
                disabled={!ticketCode?.trim()}
              />
            </div>
          </form>

          {/* Instructions */}
          <div className="mt-6 pt-4 border-t border-border">
            <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <Icon name="Info" size={20} className="text-accent mt-0.5" />
                <div>
                  <p className="font-medium text-accent mb-2">
                    Manual Entry Guidelines
                  </p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Use for damaged or unreadable QR codes</li>
                    <li>• Verify attendee identity before manual entry</li>
                    <li>• All manual entries are logged for audit</li>
                    <li>• Contact supervisor for suspicious tickets</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Emergency Contacts */}
          <div className="mt-4">
            <details className="group">
              <summary className="flex items-center justify-between cursor-pointer text-sm text-muted-foreground hover:text-foreground transition-colors">
                <span className="font-mono">Emergency Contacts</span>
                <Icon name="ChevronDown" size={16} className="group-open:rotate-180 transition-transform" />
              </summary>
              <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-muted/50 rounded-lg p-3">
                  <div className="flex items-center space-x-2 mb-2">
                    <Icon name="Phone" size={16} className="text-muted-foreground" />
                    <span className="text-sm font-medium text-foreground">Supervisor</span>
                  </div>
                  <p className="text-sm font-mono text-muted-foreground">
                    +1 (555) 123-4567
                  </p>
                </div>
                <div className="bg-muted/50 rounded-lg p-3">
                  <div className="flex items-center space-x-2 mb-2">
                    <Icon name="Shield" size={16} className="text-muted-foreground" />
                    <span className="text-sm font-medium text-foreground">Security</span>
                  </div>
                  <p className="text-sm font-mono text-muted-foreground">
                    +1 (555) 987-6543
                  </p>
                </div>
              </div>
            </details>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManualEntryPanel;