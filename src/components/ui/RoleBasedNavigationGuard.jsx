import React from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const RoleBasedNavigationGuard = ({ 
  user = null, 
  requiredRole = 'authenticated',
  requiredPermissions = [],
  children,
  fallbackComponent = null,
  redirectPath = '/login',
  onUnauthorized = () => {},
  showFallback = true,
  className = ''
}) => {
  const checkUserRole = () => {
    if (!user) return requiredRole === 'public';
    
    switch (requiredRole) {
      case 'public':
        return true;
      case 'authenticated':
        return !!user;
      case 'staff':
        return user?.role === 'staff' || user?.role === 'admin';
      case 'admin':
        return user?.role === 'admin';
      default:
        return user?.role === requiredRole;
    }
  };

  const checkPermissions = () => {
    if (!requiredPermissions?.length) return true;
    if (!user?.permissions) return false;
    
    return requiredPermissions?.every(permission => 
      user?.permissions?.includes(permission)
    );
  };

  const hasAccess = checkUserRole() && checkPermissions();

  const handleUnauthorizedClick = () => {
    onUnauthorized({
      user,
      requiredRole,
      requiredPermissions,
      redirectPath
    });
  };

  if (hasAccess) {
    return <div className={className}>{children}</div>;
  }

  if (fallbackComponent) {
    return <div className={className}>{fallbackComponent}</div>;
  }

  if (!showFallback) {
    return null;
  }

  // Default unauthorized fallback
  const getUnauthorizedMessage = () => {
    if (!user) {
      return {
        title: 'Authentication Required',
        message: 'Please sign in to access this feature.',
        icon: 'Lock',
        actionText: 'Sign In',
        variant: 'default'
      };
    }

    if (requiredRole === 'staff' || requiredRole === 'admin') {
      return {
        title: 'Staff Access Required',
        message: 'This feature is restricted to authorized staff members only.',
        icon: 'Shield',
        actionText: 'Contact Admin',
        variant: 'outline'
      };
    }

    return {
      title: 'Access Restricted',
      message: 'You do not have permission to access this feature.',
      icon: 'AlertTriangle',
      actionText: 'Go Back',
      variant: 'outline'
    };
  };

  const unauthorizedInfo = getUnauthorizedMessage();

  return (
    <div className={`flex flex-col items-center justify-center p-8 text-center bg-muted/30 rounded-lg border-2 border-dashed border-border ${className}`}>
      <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
        <Icon 
          name={unauthorizedInfo?.icon} 
          size={32} 
          className="text-muted-foreground" 
        />
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2 font-mono">
        {unauthorizedInfo?.title}
      </h3>
      <p className="text-muted-foreground mb-6 max-w-md">
        {unauthorizedInfo?.message}
      </p>
      {/* Role-specific additional info */}
      {requiredRole === 'staff' && (
        <div className="bg-warning/10 border border-warning/20 rounded-lg p-4 mb-6 max-w-md">
          <div className="flex items-start space-x-3">
            <Icon name="Info" size={20} className="text-warning mt-0.5" />
            <div className="text-left">
              <p className="text-sm font-medium text-warning mb-1">Staff Access</p>
              <p className="text-xs text-muted-foreground">
                This section includes ticket scanning, event management, and administrative tools.
              </p>
            </div>
          </div>
        </div>
      )}
      {/* Required permissions display */}
      {requiredPermissions?.length > 0 && (
        <div className="bg-card border border-border rounded-lg p-4 mb-6 max-w-md">
          <p className="text-sm font-medium text-foreground mb-2">Required Permissions:</p>
          <div className="flex flex-wrap gap-2">
            {requiredPermissions?.map((permission) => (
              <span 
                key={permission}
                className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full font-mono"
              >
                {permission}
              </span>
            ))}
          </div>
        </div>
      )}
      <Button
        variant={unauthorizedInfo?.variant}
        onClick={handleUnauthorizedClick}
        iconName={!user ? 'LogIn' : 'ArrowLeft'}
        iconPosition="left"
        className="font-medium"
      >
        {unauthorizedInfo?.actionText}
      </Button>
      {/* Debug info in development */}
      {process.env?.NODE_ENV === 'development' && (
        <div className="mt-6 p-3 bg-secondary/10 rounded-lg text-xs font-mono text-left max-w-md">
          <p className="text-secondary font-medium mb-2">Debug Info:</p>
          <p>User Role: {user?.role || 'none'}</p>
          <p>Required Role: {requiredRole}</p>
          <p>Required Permissions: {requiredPermissions?.join(', ') || 'none'}</p>
          <p>Has Access: {hasAccess ? 'true' : 'false'}</p>
        </div>
      )}
    </div>
  );
};

export default RoleBasedNavigationGuard;