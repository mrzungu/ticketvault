import React from 'react';
import Icon from '../AppIcon';

const BookingProgressIndicator = ({ 
  currentStep = 1, 
  onStepClick = () => {},
  allowBackNavigation = true,
  className = '' 
}) => {
  const steps = [
    {
      id: 1,
      label: 'Event Selection',
      icon: 'Calendar',
      description: 'Choose your event'
    },
    {
      id: 2,
      label: 'Ticket Details',
      icon: 'Ticket',
      description: 'Select tickets & seats'
    },
    {
      id: 3,
      label: 'Payment',
      icon: 'CreditCard',
      description: 'Secure checkout'
    },
    {
      id: 4,
      label: 'Confirmation',
      icon: 'CheckCircle',
      description: 'Booking complete'
    }
  ];

  const getStepStatus = (stepId) => {
    if (stepId < currentStep) return 'completed';
    if (stepId === currentStep) return 'current';
    return 'upcoming';
  };

  const handleStepClick = (stepId) => {
    if (allowBackNavigation && stepId < currentStep) {
      onStepClick(stepId);
    }
  };

  const getStepClasses = (step) => {
    const status = getStepStatus(step?.id);
    const isClickable = allowBackNavigation && step?.id < currentStep;
    
    let classes = 'flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 ';
    
    if (status === 'completed') {
      classes += isClickable 
        ? 'bg-success/10 text-success cursor-pointer hover:bg-success/20 hover:scale-[1.02]' 
        : 'bg-success/10 text-success';
    } else if (status === 'current') {
      classes += 'bg-accent/20 text-accent border-2 border-accent shadow-cyber';
    } else {
      classes += 'bg-muted/50 text-muted-foreground';
    }
    
    return classes;
  };

  const getIconClasses = (step) => {
    const status = getStepStatus(step?.id);
    
    if (status === 'completed') return 'text-success';
    if (status === 'current') return 'text-accent';
    return 'text-muted-foreground';
  };

  return (
    <div className={`bg-card border-2 border-border rounded-lg shadow-elevation-1 ${className}`}>
      {/* Desktop Progress Bar */}
      <div className="hidden md:block p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-foreground font-mono">
            Booking Progress
          </h2>
          <div className="text-sm text-muted-foreground font-mono">
            Step {currentStep} of {steps?.length}
          </div>
        </div>

        {/* Progress Line */}
        <div className="relative mb-8">
          <div className="absolute top-6 left-6 right-6 h-0.5 bg-border"></div>
          <div 
            className="absolute top-6 left-6 h-0.5 bg-accent transition-all duration-500 ease-smooth"
            style={{ width: `${((currentStep - 1) / (steps?.length - 1)) * 100}%` }}
          ></div>
          
          <div className="flex justify-between">
            {steps?.map((step) => {
              const status = getStepStatus(step?.id);
              const isClickable = allowBackNavigation && step?.id < currentStep;
              
              return (
                <div key={step?.id} className="flex flex-col items-center">
                  <button
                    onClick={() => handleStepClick(step?.id)}
                    disabled={!isClickable}
                    className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                      status === 'completed'
                        ? `bg-success border-success ${isClickable ? 'hover:scale-110 cursor-pointer' : ''}`
                        : status === 'current' ?'bg-accent border-accent shadow-cyber animate-pulse-glow' :'bg-background border-border'
                    }`}
                  >
                    <Icon 
                      name={status === 'completed' ? 'Check' : step?.icon} 
                      size={20} 
                      className={getIconClasses(step)}
                    />
                  </button>
                  <div className="mt-3 text-center">
                    <p className={`text-sm font-medium ${
                      status === 'current' ? 'text-accent' : 
                      status === 'completed' ? 'text-success' : 'text-muted-foreground'
                    }`}>
                      {step?.label}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {step?.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {/* Mobile Progress */}
      <div className="md:hidden p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold text-foreground font-mono">
            Step {currentStep} of {steps?.length}
          </h2>
          <div className="text-sm text-muted-foreground">
            {Math.round((currentStep / steps?.length) * 100)}%
          </div>
        </div>

        {/* Mobile Progress Bar */}
        <div className="w-full bg-border rounded-full h-2 mb-4">
          <div 
            className="bg-accent h-2 rounded-full transition-all duration-500 ease-smooth"
            style={{ width: `${(currentStep / steps?.length) * 100}%` }}
          ></div>
        </div>

        {/* Current Step Info */}
        <div className="flex items-center space-x-3 p-3 bg-accent/10 rounded-lg border border-accent/20">
          <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center">
            <Icon name={steps?.[currentStep - 1]?.icon} size={20} className="text-accent-foreground" />
          </div>
          <div>
            <p className="font-medium text-accent">{steps?.[currentStep - 1]?.label}</p>
            <p className="text-sm text-muted-foreground">{steps?.[currentStep - 1]?.description}</p>
          </div>
        </div>

        {/* Step Navigation */}
        {allowBackNavigation && currentStep > 1 && (
          <div className="mt-4 space-y-2">
            <p className="text-xs text-muted-foreground font-mono">Previous steps:</p>
            <div className="flex flex-wrap gap-2">
              {steps?.slice(0, currentStep - 1)?.map((step) => (
                <button
                  key={step?.id}
                  onClick={() => handleStepClick(step?.id)}
                  className="flex items-center space-x-2 px-3 py-1 bg-success/10 text-success rounded-full text-xs hover:bg-success/20 transition-colors duration-150"
                >
                  <Icon name="Check" size={12} />
                  <span>{step?.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingProgressIndicator;