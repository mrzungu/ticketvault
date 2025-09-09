import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import RoleBasedNavigationGuard from '../../components/ui/RoleBasedNavigationGuard';
import MetricsOverview from './components/MetricsOverview';
import EventsDataTable from './components/EventsDataTable';
import RealtimeMonitoring from './components/RealtimeMonitoring';
import AnalyticsCharts from './components/AnalyticsCharts';
import UserManagement from './components/UserManagement';
import QuickActions from './components/QuickActions';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [timeRange, setTimeRange] = useState('7d');
  const [isLoading, setIsLoading] = useState(true);

  // Mock admin user - in real app, this would come from authentication context
  useEffect(() => {
    // Simulate loading and authentication check
    const timer = setTimeout(() => {
      const mockAdminUser = {
        id: 'admin-001',
        name: 'Admin User',
        email: 'admin@ticketvault.com',
        role: 'admin',
        permissions: ['read', 'write', 'delete', 'manage_users', 'manage_events', 'view_analytics']
      };
      setUser(mockAdminUser);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleAuthToggle = (newUser) => {
    setUser(newUser);
    if (!newUser) {
      navigate('/login');
    }
  };

  const handleEventAction = (action, event) => {
    console.log(`Event action: ${action}`, event);
    // Handle event actions like view, edit, duplicate, etc.
    switch (action) {
      case 'view':
        navigate(`/event-details?id=${event?.id}`);
        break;
      case 'edit':
        // Navigate to event edit page
        break;
      case 'duplicate':
        // Handle event duplication
        break;
      default:
        break;
    }
  };

  const handleUserAction = (action, userData) => {
    console.log(`User action: ${action}`, userData);
    // Handle user management actions
  };

  const handleAlertClick = (alert) => {
    console.log('Alert clicked:', alert);
    // Handle alert actions
  };

  const handleActionClick = (actionId) => {
    console.log('Quick action clicked:', actionId);
    // Handle quick actions
    switch (actionId) {
      case 'create-event':
        // Navigate to event creation
        break;
      case 'generate-reports':
        // Open reports modal
        break;
      case 'bulk-email':
        // Open bulk email interface
        break;
      default:
        break;
    }
  };

  const tabOptions = [
    { key: 'overview', label: 'Overview', icon: 'BarChart3' },
    { key: 'events', label: 'Events', icon: 'Calendar' },
    { key: 'users', label: 'Users', icon: 'Users' },
    { key: 'analytics', label: 'Analytics', icon: 'TrendingUp' },
    { key: 'monitoring', label: 'Monitoring', icon: 'Activity' },
    { key: 'actions', label: 'Quick Actions', icon: 'Zap' }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header user={user} onAuthToggle={handleAuthToggle} />
        <div className="pt-16 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-muted-foreground font-mono">Loading admin dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header user={user} onAuthToggle={handleAuthToggle} />
      <div className="pt-16">
        <RoleBasedNavigationGuard
          user={user}
          requiredRole="admin"
          onUnauthorized={() => navigate('/login')}
          className="min-h-screen"
        >
          <div className="container mx-auto px-4 py-8">
            {/* Page Header */}
            <div className="mb-8">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                <div>
                  <h1 className="text-3xl font-bold text-foreground font-mono">
                    Admin Dashboard
                  </h1>
                  <p className="text-muted-foreground mt-2">
                    Comprehensive event management and system analytics
                  </p>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                    <span className="font-mono">System Operational</span>
                  </div>
                  <div className="text-sm text-muted-foreground font-mono">
                    Last updated: {new Date()?.toLocaleTimeString()}
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="mb-8">
              <div className="border-b border-border">
                <nav className="flex space-x-8 overflow-x-auto">
                  {tabOptions?.map((tab) => (
                    <button
                      key={tab?.key}
                      onClick={() => setActiveTab(tab?.key)}
                      className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors duration-200 ${
                        activeTab === tab?.key
                          ? 'border-accent text-accent' :'border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground'
                      }`}
                    >
                      <span>{tab?.label}</span>
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Tab Content */}
            <div className="space-y-8">
              {activeTab === 'overview' && (
                <div className="space-y-8">
                  <MetricsOverview />
                  <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                    <div className="xl:col-span-2">
                      <EventsDataTable onEventAction={handleEventAction} />
                    </div>
                    <div>
                      <RealtimeMonitoring onAlertClick={handleAlertClick} />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'events' && (
                <EventsDataTable onEventAction={handleEventAction} />
              )}

              {activeTab === 'users' && (
                <UserManagement onUserAction={handleUserAction} />
              )}

              {activeTab === 'analytics' && (
                <AnalyticsCharts 
                  timeRange={timeRange} 
                  onTimeRangeChange={setTimeRange} 
                />
              )}

              {activeTab === 'monitoring' && (
                <RealtimeMonitoring onAlertClick={handleAlertClick} />
              )}

              {activeTab === 'actions' && (
                <QuickActions onActionClick={handleActionClick} />
              )}
            </div>
          </div>
        </RoleBasedNavigationGuard>
      </div>
    </div>
  );
};

export default AdminDashboard;