import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EventsDataTable = ({ events = [], onEventAction = () => {} }) => {
  const [sortField, setSortField] = useState('date');
  const [sortDirection, setSortDirection] = useState('desc');
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const mockEvents = [
    {
      id: "EVT001",
      name: "Tech Conference 2025",
      date: "2025-01-15",
      venue: "Convention Center",
      status: "active",
      ticketsSold: 450,
      capacity: 500,
      revenue: 22500.00,
      type: "conference"
    },
    {
      id: "EVT002", 
      name: "Summer Music Festival",
      date: "2025-06-20",
      venue: "Central Park",
      status: "draft",
      ticketsSold: 0,
      capacity: 2000,
      revenue: 0.00,
      type: "festival"
    },
    {
      id: "EVT003",
      name: "Art Gallery Opening",
      date: "2025-02-10",
      venue: "Modern Art Museum",
      status: "sold_out",
      ticketsSold: 150,
      capacity: 150,
      revenue: 7500.00,
      type: "exhibition"
    },
    {
      id: "EVT004",
      name: "Business Networking",
      date: "2025-01-25",
      venue: "Hotel Grand Ballroom",
      status: "active",
      ticketsSold: 85,
      capacity: 200,
      revenue: 8500.00,
      type: "networking"
    },
    {
      id: "EVT005",
      name: "Comedy Night Special",
      date: "2024-12-15",
      venue: "Comedy Club Downtown",
      status: "completed",
      ticketsSold: 120,
      capacity: 120,
      revenue: 3600.00,
      type: "entertainment"
    }
  ];

  const eventData = events?.length > 0 ? events : mockEvents;

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { color: 'bg-success/20 text-success border-success/30', label: 'Active' },
      draft: { color: 'bg-warning/20 text-warning border-warning/30', label: 'Draft' },
      sold_out: { color: 'bg-accent/20 text-accent border-accent/30', label: 'Sold Out' },
      completed: { color: 'bg-muted/20 text-muted-foreground border-muted/30', label: 'Completed' },
      cancelled: { color: 'bg-destructive/20 text-destructive border-destructive/30', label: 'Cancelled' }
    };

    const config = statusConfig?.[status] || statusConfig?.draft;
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium font-mono border ${config?.color}`}>
        {config?.label}
      </span>
    );
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const filteredAndSortedEvents = eventData?.filter(event => {
      const matchesSearch = event?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                           event?.venue?.toLowerCase()?.includes(searchTerm?.toLowerCase());
      const matchesStatus = filterStatus === 'all' || event?.status === filterStatus;
      return matchesSearch && matchesStatus;
    })?.sort((a, b) => {
      let aValue = a?.[sortField];
      let bValue = b?.[sortField];
      
      if (sortField === 'date') {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      }
      
      if (sortDirection === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

  return (
    <div className="bg-card border-2 border-border rounded-lg shadow-elevation-2">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div>
            <h2 className="text-xl font-semibold text-foreground font-mono">
              Event Management
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Manage all events and track performance
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
            <div className="relative">
              <Icon name="Search" size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e?.target?.value)}
                className="pl-10 pr-4 py-2 bg-input border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
              />
            </div>
            
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e?.target?.value)}
              className="px-3 py-2 bg-input border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="draft">Draft</option>
              <option value="sold_out">Sold Out</option>
              <option value="completed">Completed</option>
            </select>
            
            <Button variant="default" iconName="Plus" iconPosition="left">
              New Event
            </Button>
          </div>
        </div>
      </div>
      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50 border-b border-border">
            <tr>
              {[
                { key: 'name', label: 'Event Name' },
                { key: 'date', label: 'Date' },
                { key: 'venue', label: 'Venue' },
                { key: 'status', label: 'Status' },
                { key: 'ticketsSold', label: 'Tickets Sold' },
                { key: 'revenue', label: 'Revenue' }
              ]?.map((column) => (
                <th
                  key={column?.key}
                  className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider cursor-pointer hover:text-foreground transition-colors duration-150"
                  onClick={() => handleSort(column?.key)}
                >
                  <div className="flex items-center space-x-1">
                    <span>{column?.label}</span>
                    {sortField === column?.key && (
                      <Icon 
                        name={sortDirection === 'asc' ? 'ChevronUp' : 'ChevronDown'} 
                        size={14} 
                      />
                    )}
                  </div>
                </th>
              ))}
              <th className="px-6 py-4 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filteredAndSortedEvents?.map((event) => (
              <tr key={event?.id} className="hover:bg-muted/30 transition-colors duration-150">
                <td className="px-6 py-4">
                  <div>
                    <p className="font-medium text-foreground">{event?.name}</p>
                    <p className="text-sm text-muted-foreground font-mono">ID: {event?.id}</p>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-foreground font-mono">
                  {new Date(event.date)?.toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })}
                </td>
                <td className="px-6 py-4 text-sm text-foreground">
                  {event?.venue}
                </td>
                <td className="px-6 py-4">
                  {getStatusBadge(event?.status)}
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm">
                    <p className="font-medium text-foreground font-mono">
                      {event?.ticketsSold}/{event?.capacity}
                    </p>
                    <div className="w-20 bg-border rounded-full h-1.5 mt-1">
                      <div 
                        className="bg-accent h-1.5 rounded-full transition-all duration-300"
                        style={{ width: `${(event?.ticketsSold / event?.capacity) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm font-medium text-foreground font-mono">
                  ${event?.revenue?.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="Eye"
                      onClick={() => onEventAction('view', event)}
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="Edit"
                      onClick={() => onEventAction('edit', event)}
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="Copy"
                      onClick={() => onEventAction('duplicate', event)}
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="MoreHorizontal"
                      onClick={() => onEventAction('menu', event)}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Mobile Cards */}
      <div className="lg:hidden divide-y divide-border">
        {filteredAndSortedEvents?.map((event) => (
          <div key={event?.id} className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="font-medium text-foreground">{event?.name}</h3>
                <p className="text-sm text-muted-foreground font-mono">ID: {event?.id}</p>
              </div>
              {getStatusBadge(event?.status)}
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
              <div>
                <p className="text-muted-foreground">Date</p>
                <p className="font-medium text-foreground font-mono">
                  {new Date(event.date)?.toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric'
                  })}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground">Venue</p>
                <p className="font-medium text-foreground">{event?.venue}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Sold</p>
                <p className="font-medium text-foreground font-mono">
                  {event?.ticketsSold}/{event?.capacity}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground">Revenue</p>
                <p className="font-medium text-foreground font-mono">
                  ${event?.revenue?.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </p>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex-1 bg-border rounded-full h-2 mr-4">
                <div 
                  className="bg-accent h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(event?.ticketsSold / event?.capacity) * 100}%` }}
                ></div>
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="Eye"
                  onClick={() => onEventAction('view', event)}
                />
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="Edit"
                  onClick={() => onEventAction('edit', event)}
                />
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="MoreHorizontal"
                  onClick={() => onEventAction('menu', event)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Footer */}
      <div className="p-4 border-t border-border bg-muted/30">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
          <p className="text-sm text-muted-foreground">
            Showing {filteredAndSortedEvents?.length} of {eventData?.length} events
          </p>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" iconName="Download">
              Export
            </Button>
            <Button variant="outline" size="sm" iconName="RefreshCw">
              Refresh
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventsDataTable;