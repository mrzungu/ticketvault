import React, { useState, useEffect, useContext, useMemo } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { AuthContext } from '../../../context/AuthContext';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../../../lib/firebase';

const UserManagement = ({ onUserAction = () => {} }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [sortField, setSortField] = useState('lastActive');
  const [sortDirection, setSortDirection] = useState('desc');
  const [users, setUsers] = useState([]);

  const { user, profile } = useContext(AuthContext);

  useEffect(() => {
    const q = query(collection(db, 'users'), orderBy('lastActive', 'desc'));
    const unsub = onSnapshot(q, (snap) => {
      const list = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      setUsers(list);
    });
    return () => unsub();
  }, []);

  const getRoleBadge = (role) => {
    const roleConfig = {
      admin: { color: 'bg-destructive/20 text-destructive border-destructive/30', label: 'Admin' },
      staff: { color: 'bg-warning/20 text-warning border-warning/30', label: 'Staff' },
      customer: { color: 'bg-accent/20 text-accent border-accent/30', label: 'Customer' }
    };
    const config = roleConfig?.[role] || roleConfig?.customer;
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium font-mono border ${config?.color}`}>
        {config?.label}
      </span>
    );
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { color: 'bg-success/20 text-success border-success/30', label: 'Active' },
      inactive: { color: 'bg-muted/20 text-muted-foreground border-muted/30', label: 'Inactive' },
      suspended: { color: 'bg-destructive/20 text-destructive border-destructive/30', label: 'Suspended' }
    };
    const config = statusConfig?.[status] || statusConfig?.inactive;
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium font-mono border ${config?.color}`}>
        {config?.label}
      </span>
    );
  };

  const formatLastActive = (dateString) => {
    try {
      const date = dateString?.toDate ? dateString.toDate() : new Date(dateString);
      const now = new Date();
      const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
      if (diffInHours < 1) return 'Just now';
      if (diffInHours < 24) return `${diffInHours}h ago`;
      if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;
      return date?.toLocaleDateString();
    } catch { return '—'; }
  };

  const handleSort = (field) => {
    if (sortField === field) setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    else { setSortField(field); setSortDirection('asc'); }
  };

  const filteredAndSortedUsers = useMemo(() => {
    const base = users.filter((u) => {
      const matchesSearch = (u?.name || u?.email || '').toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRole = filterRole === 'all' || u?.role === filterRole;
      return matchesSearch && matchesRole;
    });
    return base.sort((a, b) => {
      let aValue = a?.[sortField];
      let bValue = b?.[sortField];
      if (sortField === 'lastActive') {
        aValue = aValue?.toDate ? aValue.toDate() : new Date(aValue);
        bValue = bValue?.toDate ? bValue.toDate() : new Date(bValue);
      }
      return sortDirection === 'asc' ? (aValue > bValue ? 1 : -1) : (aValue < bValue ? 1 : -1);
    });
  }, [users, searchTerm, filterRole, sortField, sortDirection]);

  const userStats = {
    total: users?.length || 0,
    active: users?.filter((u) => u?.status === 'active')?.length || 0,
    staff: users?.filter((u) => ['staff','admin'].includes(u?.role))?.length || 0,
    suspended: users?.filter((u) => u?.status === 'suspended')?.length || 0,
  };

  if (!user) {
    return <p className="p-6 text-center text-muted-foreground">Please log in to view users.</p>;
  }

  if (!['admin', 'staff'].includes(profile?.role || 'customer')) {
    return <p className="p-6 text-center text-muted-foreground">You don’t have permission to view this page.</p>;
  }

  return (
    <div className="bg-card border-2 border-border rounded-lg shadow-elevation-2">
      {/* Header */}
      <div className="p-6 border-b border-border flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-foreground font-mono">User Management</h2>
          <p className="text-sm text-muted-foreground mt-1">Manage user accounts and permissions</p>
        </div>
        <Button variant="default" iconName="UserPlus" iconPosition="left">
          Add User
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-6">
        <div className="text-center p-4 bg-muted/30 rounded-lg">
          <p className="text-2xl font-bold text-foreground font-mono">{userStats.total}</p>
          <p className="text-xs text-muted-foreground">Total Users</p>
        </div>
        <div className="text-center p-4 bg-muted/30 rounded-lg">
          <p className="text-2xl font-bold text-success font-mono">{userStats.active}</p>
          <p className="text-xs text-muted-foreground">Active</p>
        </div>
        <div className="text-center p-4 bg-muted/30 rounded-lg">
          <p className="text-2xl font-bold text-warning font-mono">{userStats.staff}</p>
          <p className="text-xs text-muted-foreground">Staff</p>
        </div>
        <div className="text-center p-4 bg-muted/30 rounded-lg">
          <p className="text-2xl font-bold text-destructive font-mono">{userStats.suspended}</p>
          <p className="text-xs text-muted-foreground">Suspended</p>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50 border-b border-border">
            <tr>
              <th className="px-6 py-4 text-left">User</th>
              <th className="px-6 py-4 cursor-pointer" onClick={() => handleSort('role')}>
                Role {sortField === 'role' && <Icon name={sortDirection === 'asc' ? 'ChevronUp' : 'ChevronDown'} />}
              </th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 cursor-pointer" onClick={() => handleSort('lastActive')}>
                Last Active {sortField === 'lastActive' && (
                  <Icon name={sortDirection === 'asc' ? 'ChevronUp' : 'ChevronDown'} />
                )}
              </th>
              <th className="px-6 py-4">Activity</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filteredAndSortedUsers?.map((u) => (
              <tr key={u.id}>
                <td className="px-6 py-4 flex items-center space-x-3">
                  <img src={u?.avatar || `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(u?.name||u?.email||'U')}`} alt={u?.name} className="w-10 h-10 rounded-full border" />
                  <div>
                    <p className="font-medium">{u?.name || u?.email}</p>
                    <p className="text-sm text-muted-foreground">{u?.email}</p>
                  </div>
                </td>
                <td className="px-6 py-4">{getRoleBadge(u?.role)}</td>
                <td className="px-6 py-4">{getStatusBadge(u?.status)}</td>
                <td className="px-6 py-4">{formatLastActive(u?.lastActive)}</td>
                <td className="px-6 py-4">
                  {u?.ticketsPurchased || 0} tickets – ${Number(u?.totalSpent||0).toFixed(2)}
                </td>
                <td className="px-6 py-4 text-right">
                  <Button variant="ghost" size="sm" iconName="Eye" onClick={() => onUserAction('view', u)} />
                  <Button variant="ghost" size="sm" iconName="Edit" onClick={() => onUserAction('edit', u)} />
                  <Button variant="ghost" size="sm" iconName="MoreHorizontal" onClick={() => onUserAction('menu', u)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;