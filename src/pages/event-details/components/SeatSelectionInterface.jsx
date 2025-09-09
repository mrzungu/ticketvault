import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SeatSelectionInterface = ({ 
  venue = {}, 
  selectedTickets = {}, 
  onSeatSelection = () => {},
  className = '' 
}) => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [hoveredSeat, setHoveredSeat] = useState(null);
  const [currentSection, setCurrentSection] = useState('general');

  const defaultVenue = {
    name: "Grand Convention Center",
    layout: {
      sections: [
        {
          id: 'vip',
          name: 'VIP Section',
          rows: 5,
          seatsPerRow: 10,
          startRow: 'A',
          price: 199.99,
          color: '#FFD700'
        },
        {
          id: 'general',
          name: 'General Admission',
          rows: 15,
          seatsPerRow: 20,
          startRow: 'F',
          price: 89.99,
          color: '#00D9FF'
        }
      ]
    }
  };

  const venueData = { ...defaultVenue, ...venue };

  // Generate seat data
  const generateSeats = () => {
    const seats = [];
    
    venueData?.layout?.sections?.forEach(section => {
      for (let row = 0; row < section?.rows; row++) {
        const rowLetter = String.fromCharCode(section?.startRow?.charCodeAt(0) + row);
        
        for (let seatNum = 1; seatNum <= section?.seatsPerRow; seatNum++) {
          const seatId = `${section?.id}-${rowLetter}${seatNum}`;
          const isReserved = Math.random() < 0.15; // 15% randomly reserved
          const isBlocked = Math.random() < 0.05; // 5% blocked/maintenance
          
          seats?.push({
            id: seatId,
            section: section?.id,
            row: rowLetter,
            number: seatNum,
            price: section?.price,
            status: isBlocked ? 'blocked' : isReserved ? 'reserved' : 'available',
            type: section?.id
          });
        }
      }
    });
    
    return seats;
  };

  const [seats] = useState(generateSeats());

  const getTotalTicketsNeeded = () => {
    return Object.values(selectedTickets)?.reduce((sum, quantity) => sum + quantity, 0);
  };

  const handleSeatClick = (seat) => {
    if (seat?.status !== 'available') return;
    
    const isSelected = selectedSeats?.some(s => s?.id === seat?.id);
    const totalNeeded = getTotalTicketsNeeded();
    
    if (isSelected) {
      setSelectedSeats(prev => prev?.filter(s => s?.id !== seat?.id));
    } else if (selectedSeats?.length < totalNeeded) {
      setSelectedSeats(prev => [...prev, seat]);
    }
  };

  const getSeatStatus = (seat) => {
    if (selectedSeats?.some(s => s?.id === seat?.id)) return 'selected';
    return seat?.status;
  };

  const getSeatColor = (seat) => {
    const status = getSeatStatus(seat);
    
    switch (status) {
      case 'selected':
        return 'bg-accent border-accent text-accent-foreground';
      case 'reserved':
        return 'bg-destructive/20 border-destructive text-destructive cursor-not-allowed';
      case 'blocked':
        return 'bg-muted border-muted text-muted-foreground cursor-not-allowed';
      case 'available':
        return seat?.type === 'vip' ?'bg-warning/20 border-warning text-warning hover:bg-warning/30 cursor-pointer' :'bg-success/20 border-success text-success hover:bg-success/30 cursor-pointer';
      default:
        return 'bg-muted border-muted text-muted-foreground';
    }
  };

  const clearSelection = () => {
    setSelectedSeats([]);
  };

  const autoSelectSeats = () => {
    const totalNeeded = getTotalTicketsNeeded();
    const availableSeats = seats?.filter(seat => seat?.status === 'available');
    
    // Try to find seats together
    const bestSeats = findBestSeats(availableSeats, totalNeeded);
    setSelectedSeats(bestSeats?.slice(0, totalNeeded));
  };

  const findBestSeats = (availableSeats, needed) => {
    // Simple algorithm to find seats close together
    const seatsByRow = {};
    availableSeats?.forEach(seat => {
      const key = `${seat?.section}-${seat?.row}`;
      if (!seatsByRow?.[key]) seatsByRow[key] = [];
      seatsByRow?.[key]?.push(seat);
    });

    // Find consecutive seats in the same row
    for (const rowSeats of Object.values(seatsByRow)) {
      rowSeats?.sort((a, b) => a?.number - b?.number);
      
      for (let i = 0; i <= rowSeats?.length - needed; i++) {
        const consecutive = [];
        for (let j = 0; j < needed; j++) {
          if (rowSeats?.[i + j] && rowSeats?.[i + j]?.number === rowSeats?.[i]?.number + j) {
            consecutive?.push(rowSeats?.[i + j]);
          } else {
            break;
          }
        }
        if (consecutive?.length === needed) {
          return consecutive;
        }
      }
    }

    // If no consecutive seats, return best available
    return availableSeats?.slice(0, needed);
  };

  useEffect(() => {
    onSeatSelection(selectedSeats);
  }, [selectedSeats, onSeatSelection]);

  const currentSectionData = venueData?.layout?.sections?.find(s => s?.id === currentSection);
  const sectionSeats = seats?.filter(seat => seat?.section === currentSection);

  if (getTotalTicketsNeeded() === 0) {
    return (
      <div className={`bg-card border-2 border-border rounded-lg p-8 text-center ${className}`}>
        <Icon name="Armchair" size={48} className="text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-foreground mb-2">Select Tickets First</h3>
        <p className="text-muted-foreground">Choose your ticket types to enable seat selection</p>
      </div>
    );
  }

  return (
    <div className={`bg-card border-2 border-border rounded-lg shadow-elevation-2 ${className}`}>
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xl font-semibold text-foreground font-mono">Select Your Seats</h3>
            <p className="text-sm text-muted-foreground">
              Choose {getTotalTicketsNeeded()} seat{getTotalTicketsNeeded() !== 1 ? 's' : ''} for your tickets
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={autoSelectSeats}
              iconName="Zap"
              iconPosition="left"
            >
              Auto Select
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={clearSelection}
              iconName="RotateCcw"
              iconPosition="left"
            >
              Clear
            </Button>
          </div>
        </div>

        {/* Section Tabs */}
        <div className="flex space-x-1 bg-muted rounded-lg p-1">
          {venueData?.layout?.sections?.map(section => (
            <button
              key={section?.id}
              onClick={() => setCurrentSection(section?.id)}
              className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                currentSection === section?.id
                  ? 'bg-accent text-accent-foreground shadow-neo-sm'
                  : 'text-muted-foreground hover:text-foreground hover:bg-background/50'
              }`}
            >
              {section?.name}
            </button>
          ))}
        </div>
      </div>
      {/* Seat Map */}
      <div className="p-6">
        {/* Stage/Screen */}
        <div className="mb-8">
          <div className="w-full h-12 bg-gradient-to-r from-accent/20 via-accent/40 to-accent/20 rounded-lg flex items-center justify-center border-2 border-accent/30">
            <div className="flex items-center space-x-2">
              <Icon name="Monitor" size={20} className="text-accent" />
              <span className="font-medium text-accent">STAGE / SCREEN</span>
            </div>
          </div>
        </div>

        {/* Seat Grid */}
        <div className="mb-6">
          <div className="grid gap-1" style={{ 
            gridTemplateColumns: `repeat(${currentSectionData?.seatsPerRow || 20}, 1fr)` 
          }}>
            {sectionSeats?.map(seat => (
              <button
                key={seat?.id}
                onClick={() => handleSeatClick(seat)}
                onMouseEnter={() => setHoveredSeat(seat)}
                onMouseLeave={() => setHoveredSeat(null)}
                disabled={seat?.status !== 'available' && !selectedSeats?.some(s => s?.id === seat?.id)}
                className={`w-6 h-6 text-xs font-mono border-2 rounded transition-all duration-150 ${getSeatColor(seat)}`}
                title={`${seat?.row}${seat?.number} - $${seat?.price}`}
              >
                {seat?.number}
              </button>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-6 p-4 bg-muted/30 rounded-lg">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-success/20 border-2 border-success rounded"></div>
            <span className="text-sm text-muted-foreground">Available</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-accent border-2 border-accent rounded"></div>
            <span className="text-sm text-muted-foreground">Selected</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-destructive/20 border-2 border-destructive rounded"></div>
            <span className="text-sm text-muted-foreground">Reserved</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-warning/20 border-2 border-warning rounded"></div>
            <span className="text-sm text-muted-foreground">VIP</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-muted border-2 border-muted rounded"></div>
            <span className="text-sm text-muted-foreground">Blocked</span>
          </div>
        </div>

        {/* Seat Info */}
        {hoveredSeat && (
          <div className="p-4 bg-accent/10 border border-accent/20 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">
                  Seat {hoveredSeat?.row}{hoveredSeat?.number}
                </p>
                <p className="text-sm text-muted-foreground">
                  {venueData?.layout?.sections?.find(s => s?.id === hoveredSeat?.section)?.name}
                </p>
              </div>
              <div className="text-right">
                <p className="font-bold text-accent">${hoveredSeat?.price}</p>
                <p className="text-sm text-muted-foreground capitalize">{hoveredSeat?.status}</p>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Selection Summary */}
      {selectedSeats?.length > 0 && (
        <div className="p-6 border-t border-border bg-muted/30">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-medium text-foreground">Selected Seats</h4>
            <span className="text-sm text-muted-foreground">
              {selectedSeats?.length} of {getTotalTicketsNeeded()} selected
            </span>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
            {selectedSeats?.map(seat => (
              <div key={seat?.id} className="flex items-center justify-between p-2 bg-accent/10 rounded border border-accent/20">
                <span className="text-sm font-mono text-foreground">
                  {seat?.row}{seat?.number}
                </span>
                <button
                  onClick={() => handleSeatClick(seat)}
                  className="text-muted-foreground hover:text-destructive transition-colors duration-150"
                >
                  <Icon name="X" size={14} />
                </button>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Seat Selection Total:</span>
            <span className="font-bold text-accent">
              ${selectedSeats?.reduce((sum, seat) => sum + seat?.price, 0)?.toFixed(2)}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default SeatSelectionInterface;