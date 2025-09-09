import React, { useState } from 'react';

import Icon from '../AppIcon';

const AuthenticationToggle = ({ 
  mode = 'login', 
  onModeChange = () => {},
  className = '',
  showLabels = true 
}) => {
  const [currentMode, setCurrentMode] = useState(mode);

  const handleToggle = (newMode) => {
    if (newMode !== currentMode) {
      setCurrentMode(newMode);
      onModeChange(newMode);
    }
  };

  const modes = [
    {
      key: 'login',
      label: 'Sign In',
      icon: 'LogIn',
      description: 'Access your account'
    },
    {
      key: 'register',
      label: 'Sign Up',
      icon: 'UserPlus',
      description: 'Create new account'
    }
  ];

  return (
    <div className={`flex flex-col space-y-4 ${className}`}>
      {/* Toggle Buttons */}
      <div className="flex bg-muted rounded-lg p-1 border-2 border-border">
        {modes?.map((modeOption) => (
          <button
            key={modeOption?.key}
            onClick={() => handleToggle(modeOption?.key)}
            className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 text-sm font-medium rounded-md transition-all duration-200 ${
              currentMode === modeOption?.key
                ? 'bg-accent text-accent-foreground shadow-neo-sm transform scale-[0.98]'
                : 'text-muted-foreground hover:text-foreground hover:bg-background/50'
            }`}
          >
            <Icon 
              name={modeOption?.icon} 
              size={18} 
              className={currentMode === modeOption?.key ? 'text-accent-foreground' : 'text-current'} 
            />
            {showLabels && <span>{modeOption?.label}</span>}
          </button>
        ))}
      </div>
      {/* Mode Description */}
      {showLabels && (
        <div className="text-center">
          <p className="text-sm text-muted-foreground font-mono">
            {modes?.find(m => m?.key === currentMode)?.description}
          </p>
        </div>
      )}
      {/* Quick Switch Links */}
      <div className="flex justify-center space-x-4 text-xs">
        {modes?.map((modeOption) => {
          if (modeOption?.key === currentMode) return null;
          
          return (
            <button
              key={modeOption?.key}
              onClick={() => handleToggle(modeOption?.key)}
              className="text-muted-foreground hover:text-accent transition-colors duration-150 underline underline-offset-2"
            >
              {modeOption?.key === 'login' ? 'Already have an account?' : 'Need an account?'}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default AuthenticationToggle;