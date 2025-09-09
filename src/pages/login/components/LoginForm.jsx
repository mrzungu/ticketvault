import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import { AuthContext } from '../../../context/AuthContext';

const LoginForm = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const validate = () => {
    const e = {};
    if (!formData.email) e.email = 'Email is required';
    if (!formData.password) e.password = 'Password is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setIsLoading(true);
    try {
      await login(formData.email, formData.password);
      navigate('/admin-dashboard');
    } catch (err) {
      setErrors({ form: err?.message || 'Login failed' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-card border-2 border-border rounded-lg shadow-elevation-2 p-6">
      <form className="space-y-4" onSubmit={handleSubmit}>
        {errors.form && (
          <div className="p-2 text-sm text-destructive border border-destructive/40 rounded">{errors.form}</div>
        )}
        <Input
          label="Email"
          placeholder="you@example.com"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          error={errors.email}
        />
        <div className="relative">
          <Input
            label="Password"
            placeholder="••••••••"
            type={showPassword ? 'text' : 'password'}
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            error={errors.password}
          />
          <button
            type="button"
            onClick={() => setShowPassword((s) => !s)}
            className="absolute right-3 top-9 text-muted-foreground hover:text-foreground"
          >
            <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={18} />
          </button>
        </div>
        <div className="flex items-center justify-between">
          <label className="inline-flex items-center space-x-2 text-sm text-muted-foreground">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="rounded border-border"
            />
            <span>Remember me</span>
          </label>
          <button type="button" className="text-sm text-accent hover:underline">Forgot password?</button>
        </div>
        <Button type="submit" variant="default" fullWidth loading={isLoading} iconName="LogIn" iconPosition="left">
          Log In
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;