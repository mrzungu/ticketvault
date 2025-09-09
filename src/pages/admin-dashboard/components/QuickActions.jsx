import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActions = ({ onActionClick = () => {} }) => {
  const navigate = useNavigate();

  const primaryActions = [
    {
      id: 'create-event',
      title: 'Create New Event',
      description: 'Set up a new event with tickets and pricing',
      icon: 'Plus',
      color: 'bg-accent text-accent-foreground',
      action: () => onActionClick('create-event')
    },
    {
      id: 'scan-tickets',
      title: 'QR Code Scanner',
      description: 'Validate tickets at event entrance',
      icon: 'QrCode',
      color: 'bg-success text-success-foreground',
      action: () => navigate('/qr-code-scanner')
    },
    {
      id: 'view-reports',
      title: 'Generate Reports',
      description: 'Create detailed analytics reports',
      icon: 'FileText',
      color: 'bg-warning text-warning-foreground',
      action: () => onActionClick('generate-reports')
    }
  ];

  const secondaryActions = [
    {
      id: 'bulk-email',
      title: 'Send Bulk Email',
      description: 'Email notifications to customers',
      icon: 'Mail',
      action: () => onActionClick('bulk-email')
    },
    {
      id: 'export-data',
      title: 'Export Data',
      description: 'Download customer and sales data',
      icon: 'Download',
      action: () => onActionClick('export-data')
    },
    {
      id: 'system-settings',
      title: 'System Settings',
      description: 'Configure platform settings',
      icon: 'Settings',
      action: () => onActionClick('system-settings')
    },
    {
      id: 'user-roles',
      title: 'Manage Roles',
      description: 'Assign user permissions',
      icon: 'Shield',
      action: () => onActionClick('user-roles')
    },
    {
      id: 'backup-data',
      title: 'Backup System',
      description: 'Create system backup',
      icon: 'Database',
      action: () => onActionClick('backup-data')
    },
    {
      id: 'support-tickets',
      title: 'Support Center',
      description: 'Manage customer support',
      icon: 'HelpCircle',
      action: () => onActionClick('support-tickets')
    }
  ];

  const recentTasks = [
    {
      id: 1,
      title: 'Review pending refunds',
      description: '12 refund requests awaiting approval',
      priority: 'high',
      dueDate: 'Today',
      action: () => onActionClick('pending-refunds')
    },
    {
      id: 2,
      title: 'Update event capacity',
      description: 'Tech Conference 2025 venue change',
      priority: 'medium',
      dueDate: 'Tomorrow',
      action: () => onActionClick('update-capacity')
    },
    {
      id: 3,
      title: 'Staff training session',
      description: 'New QR scanner training scheduled',
      priority: 'low',
      dueDate: 'This week',
      action: () => onActionClick('staff-training')
    }
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-destructive';
      case 'medium': return 'text-warning';
      case 'low': return 'text-accent';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6">
      {/* Primary Actions */}
      <div className="bg-card border-2 border-border rounded-lg p-6 shadow-elevation-1">
        <h2 className="text-lg font-semibold text-foreground font-mono mb-6">
          Quick Actions
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {primaryActions?.map((action) => (
            <button
              key={action?.id}
              onClick={action?.action}
              className={`p-6 rounded-lg ${action?.color} hover:scale-[1.02] transition-all duration-200 shadow-neo-sm hover:shadow-cyber text-left group`}
            >
              <div className="flex items-start justify-between mb-4">
                <Icon name={action?.icon} size={32} className="group-hover:scale-110 transition-transform duration-200" />
                <Icon name="ArrowUpRight" size={20} className="opacity-60 group-hover:opacity-100 transition-opacity duration-200" />
              </div>
              <h3 className="font-semibold mb-2">{action?.title}</h3>
              <p className="text-sm opacity-90">{action?.description}</p>
            </button>
          ))}
        </div>
      </div>
      {/* Secondary Actions */}
      <div className="bg-card border-2 border-border rounded-lg p-6 shadow-elevation-1">
        <h3 className="text-lg font-semibold text-foreground font-mono mb-6">
          Administrative Tools
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {secondaryActions?.map((action) => (
            <button
              key={action?.id}
              onClick={action?.action}
              className="flex items-start space-x-4 p-4 rounded-lg border border-border hover:bg-muted/50 hover:border-accent/50 transition-all duration-200 text-left group"
            >
              <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center group-hover:bg-accent/20 transition-colors duration-200">
                <Icon name={action?.icon} size={20} className="text-muted-foreground group-hover:text-accent transition-colors duration-200" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-foreground mb-1">{action?.title}</h4>
                <p className="text-sm text-muted-foreground">{action?.description}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
      {/* Recent Tasks */}
      <div className="bg-card border-2 border-border rounded-lg p-6 shadow-elevation-1">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-foreground font-mono">
            Pending Tasks
          </h3>
          <Button variant="ghost" size="sm" iconName="MoreHorizontal" />
        </div>
        
        <div className="space-y-4">
          {recentTasks?.map((task) => (
            <div
              key={task?.id}
              className="flex items-start justify-between p-4 rounded-lg border border-border hover:bg-muted/30 transition-colors duration-200 cursor-pointer"
              onClick={task?.action}
            >
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h4 className="font-medium text-foreground">{task?.title}</h4>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium font-mono uppercase ${getPriorityColor(task?.priority)}`}>
                    {task?.priority}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{task?.description}</p>
                <div className="flex items-center space-x-2">
                  <Icon name="Clock" size={14} className="text-muted-foreground" />
                  <span className="text-xs text-muted-foreground font-mono">{task?.dueDate}</span>
                </div>
              </div>
              <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
            </div>
          ))}
        </div>
        
        <div className="mt-6 pt-4 border-t border-border">
          <Button variant="outline" fullWidth iconName="Plus" iconPosition="left">
            Add New Task
          </Button>
        </div>
      </div>
      {/* System Status */}
      <div className="bg-card border-2 border-border rounded-lg p-6 shadow-elevation-1">
        <h3 className="text-lg font-semibold text-foreground font-mono mb-6">
          System Status
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                <span className="text-sm text-foreground">API Services</span>
              </div>
              <span className="text-sm font-mono text-success">Operational</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                <span className="text-sm text-foreground">Payment Gateway</span>
              </div>
              <span className="text-sm font-mono text-success">Operational</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-warning rounded-full"></div>
                <span className="text-sm text-foreground">Email Service</span>
              </div>
              <span className="text-sm font-mono text-warning">Degraded</span>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                <span className="text-sm text-foreground">Database</span>
              </div>
              <span className="text-sm font-mono text-success">Operational</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                <span className="text-sm text-foreground">QR Scanner Network</span>
              </div>
              <span className="text-sm font-mono text-success">Operational</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                <span className="text-sm text-foreground">CDN</span>
              </div>
              <span className="text-sm font-mono text-success">Operational</span>
            </div>
          </div>
        </div>
        
        <div className="mt-6 pt-4 border-t border-border">
          <Button variant="outline" size="sm" iconName="ExternalLink" iconPosition="right">
            View Status Page
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;