import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CameraViewfinder = ({ 
  onScanResult = () => {},
  isScanning = false,
  onToggleScanning = () => {},
  className = ''
}) => {
  const [hasCamera, setHasCamera] = useState(false);
  const [cameraError, setCameraError] = useState(null);
  const [flashEnabled, setFlashEnabled] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  useEffect(() => {
    initializeCamera();
    return () => {
      stopCamera();
    };
  }, []);

  const initializeCamera = async () => {
    try {
      const stream = await navigator.mediaDevices?.getUserMedia({
        video: {
          facingMode: 'environment',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }
      });
      
      if (videoRef?.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setHasCamera(true);
        setCameraError(null);
      }
    } catch (error) {
      console.error('Camera initialization failed:', error);
      setCameraError('Camera access denied or not available');
      setHasCamera(false);
    }
  };

  const stopCamera = () => {
    if (streamRef?.current) {
      streamRef?.current?.getTracks()?.forEach(track => track?.stop());
      streamRef.current = null;
    }
  };

  const toggleFlash = async () => {
    if (streamRef?.current) {
      const track = streamRef?.current?.getVideoTracks()?.[0];
      if (track && track?.getCapabilities()?.torch) {
        try {
          await track?.applyConstraints({
            advanced: [{ torch: !flashEnabled }]
          });
          setFlashEnabled(!flashEnabled);
        } catch (error) {
          console.error('Flash toggle failed:', error);
        }
      }
    }
  };

  const adjustZoom = (delta) => {
    const newZoom = Math.max(1, Math.min(3, zoomLevel + delta));
    setZoomLevel(newZoom);
    
    if (streamRef?.current) {
      const track = streamRef?.current?.getVideoTracks()?.[0];
      if (track && track?.getCapabilities()?.zoom) {
        try {
          track?.applyConstraints({
            advanced: [{ zoom: newZoom }]
          });
        } catch (error) {
          console.error('Zoom adjustment failed:', error);
        }
      }
    }
  };

  const simulateScan = () => {
    // Simulate QR code detection for demo purposes
    const mockResults = [
      {
        ticketId: 'TKT-2025-001234',
        eventId: 'EVT-TECH-SUMMIT-2025',
        attendeeName: 'John Smith',
        seatNumber: 'A-15',
        ticketType: 'VIP',
        isValid: true,
        timestamp: new Date()?.toISOString()
      },
      {
        ticketId: 'TKT-2025-005678',
        eventId: 'EVT-MUSIC-FEST-2025',
        attendeeName: 'Sarah Johnson',
        seatNumber: 'B-22',
        ticketType: 'General',
        isValid: false,
        error: 'Ticket already scanned at 14:05:32',
        timestamp: new Date()?.toISOString()
      }
    ];
    
    const randomResult = mockResults?.[Math.floor(Math.random() * mockResults?.length)];
    onScanResult(randomResult);
  };

  if (cameraError) {
    return (
      <div className={`bg-card border-2 border-border rounded-lg p-8 text-center ${className}`}>
        <div className="w-16 h-16 bg-destructive/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="CameraOff" size={32} className="text-destructive" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2 font-mono">
          Camera Not Available
        </h3>
        <p className="text-muted-foreground mb-6">
          {cameraError}
        </p>
        <Button
          variant="outline"
          onClick={initializeCamera}
          iconName="RefreshCw"
          iconPosition="left"
        >
          Retry Camera Access
        </Button>
      </div>
    );
  }

  return (
    <div className={`bg-card border-2 border-border rounded-lg overflow-hidden shadow-elevation-2 ${className}`}>
      {/* Camera Header */}
      <div className="p-4 border-b border-border bg-secondary/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-success rounded-full animate-pulse-glow"></div>
            <span className="text-sm font-medium text-foreground font-mono">
              {isScanning ? 'SCANNING ACTIVE' : 'CAMERA READY'}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleFlash}
              iconName={flashEnabled ? "Flashlight" : "FlashlightOff"}
              className={flashEnabled ? 'text-warning' : ''}
            />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => adjustZoom(-0.5)}
              iconName="ZoomOut"
              disabled={zoomLevel <= 1}
            />
            <span className="text-xs font-mono text-muted-foreground">
              {zoomLevel?.toFixed(1)}x
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => adjustZoom(0.5)}
              iconName="ZoomIn"
              disabled={zoomLevel >= 3}
            />
          </div>
        </div>
      </div>
      {/* Camera Viewfinder */}
      <div className="relative aspect-video bg-secondary/20">
        {hasCamera ? (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover"
            style={{ transform: `scale(${zoomLevel})` }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center">
              <Icon name="Camera" size={64} className="text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Initializing camera...</p>
            </div>
          </div>
        )}

        {/* Scanning Overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
            {/* Scanning Frame */}
            <div className={`w-64 h-64 border-4 rounded-lg transition-all duration-300 ${
              isScanning ? 'border-accent shadow-cyber animate-pulse-glow' : 'border-muted-foreground/50'
            }`}>
              {/* Corner Indicators */}
              <div className="absolute -top-2 -left-2 w-6 h-6 border-l-4 border-t-4 border-accent rounded-tl-lg"></div>
              <div className="absolute -top-2 -right-2 w-6 h-6 border-r-4 border-t-4 border-accent rounded-tr-lg"></div>
              <div className="absolute -bottom-2 -left-2 w-6 h-6 border-l-4 border-b-4 border-accent rounded-bl-lg"></div>
              <div className="absolute -bottom-2 -right-2 w-6 h-6 border-r-4 border-b-4 border-accent rounded-br-lg"></div>
              
              {/* Scanning Line */}
              {isScanning && (
                <div className="absolute inset-x-0 top-0 h-1 bg-accent shadow-cyber animate-bounce"></div>
              )}
            </div>

            {/* Center Target */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className={`w-8 h-8 border-2 rounded-full transition-all duration-300 ${
                isScanning ? 'border-accent bg-accent/20' : 'border-muted-foreground/50'
              }`}>
                <div className="w-full h-full flex items-center justify-center">
                  <div className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    isScanning ? 'bg-accent animate-pulse' : 'bg-muted-foreground/50'
                  }`}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Alignment Guide */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
          <div className="bg-background/90 backdrop-blur-sm border border-border rounded-lg px-4 py-2">
            <p className="text-xs text-foreground font-mono text-center">
              {isScanning ? 'Hold steady while scanning...' : 'Position QR code within frame'}
            </p>
          </div>
        </div>
      </div>
      {/* Camera Controls */}
      <div className="p-4 border-t border-border">
        <div className="flex items-center justify-center space-x-4">
          <Button
            variant={isScanning ? "destructive" : "default"}
            onClick={onToggleScanning}
            iconName={isScanning ? "Square" : "Play"}
            iconPosition="left"
            className="font-medium"
          >
            {isScanning ? 'Stop Scanning' : 'Start Scanning'}
          </Button>
          
          <Button
            variant="outline"
            onClick={simulateScan}
            iconName="Scan"
            iconPosition="left"
            disabled={!hasCamera}
          >
            Test Scan
          </Button>
        </div>

        {/* Camera Status */}
        <div className="mt-4 flex items-center justify-center space-x-6 text-xs text-muted-foreground font-mono">
          <div className="flex items-center space-x-2">
            <Icon name="Camera" size={14} />
            <span>{hasCamera ? 'Connected' : 'Disconnected'}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name={flashEnabled ? "Flashlight" : "FlashlightOff"} size={14} />
            <span>Flash {flashEnabled ? 'On' : 'Off'}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Focus" size={14} />
            <span>Zoom {zoomLevel?.toFixed(1)}x</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CameraViewfinder;