import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const RegistrationForm = ({ onSubmit = () => {}, isLoading = false }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    marketingConsent: false,
    termsAccepted: false,
    privacyAccepted: false
  });

  const [errors, setErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState(0);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex?.test(email);
  };

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password?.length >= 8) strength += 1;
    if (/[A-Z]/?.test(password)) strength += 1;
    if (/[a-z]/?.test(password)) strength += 1;
    if (/[0-9]/?.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/?.test(password)) strength += 1;
    return strength;
  };

  const getPasswordStrengthText = (strength) => {
    switch (strength) {
      case 0:
      case 1: return { text: 'Very Weak', color: 'text-destructive' };
      case 2: return { text: 'Weak', color: 'text-warning' };
      case 3: return { text: 'Fair', color: 'text-warning' };
      case 4: return { text: 'Good', color: 'text-success' };
      case 5: return { text: 'Strong', color: 'text-success' };
      default: return { text: 'Very Weak', color: 'text-destructive' };
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.fullName?.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData?.email?.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!validateEmail(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData?.password) {
      newErrors.password = 'Password is required';
    } else if (formData?.password?.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long';
    }

    if (!formData?.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData?.password !== formData?.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData?.termsAccepted) {
      newErrors.termsAccepted = 'You must accept the terms of service';
    }

    if (!formData?.privacyAccepted) {
      newErrors.privacyAccepted = 'You must accept the privacy policy';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }

    // Update password strength
    if (field === 'password') {
      setPasswordStrength(calculatePasswordStrength(value));
    }
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const strengthInfo = getPasswordStrengthText(passwordStrength);

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Full Name */}
      <Input
        label="Full Name"
        type="text"
        placeholder="Enter your full name"
        value={formData?.fullName}
        onChange={(e) => handleInputChange('fullName', e?.target?.value)}
        error={errors?.fullName}
        required
        className="transition-all duration-200"
      />
      {/* Email */}
      <Input
        label="Email Address"
        type="email"
        placeholder="Enter your email address"
        value={formData?.email}
        onChange={(e) => handleInputChange('email', e?.target?.value)}
        error={errors?.email}
        description="We'll use this for booking confirmations and account recovery"
        required
        className="transition-all duration-200"
      />
      {/* Password */}
      <div className="space-y-2">
        <Input
          label="Password"
          type="password"
          placeholder="Create a strong password"
          value={formData?.password}
          onChange={(e) => handleInputChange('password', e?.target?.value)}
          error={errors?.password}
          required
          className="transition-all duration-200"
        />
        
        {/* Password Strength Indicator */}
        {formData?.password && (
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <div className="flex-1 bg-muted rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${
                    passwordStrength <= 2 ? 'bg-destructive' : 
                    passwordStrength <= 3 ? 'bg-warning' : 'bg-success'
                  }`}
                  style={{ width: `${(passwordStrength / 5) * 100}%` }}
                />
              </div>
              <span className={`text-xs font-medium ${strengthInfo?.color}`}>
                {strengthInfo?.text}
              </span>
            </div>
            <div className="text-xs text-muted-foreground space-y-1">
              <p>Password requirements:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                <div className={`flex items-center space-x-1 ${formData?.password?.length >= 8 ? 'text-success' : 'text-muted-foreground'}`}>
                  <Icon name={formData?.password?.length >= 8 ? 'Check' : 'X'} size={12} />
                  <span>8+ characters</span>
                </div>
                <div className={`flex items-center space-x-1 ${/[A-Z]/?.test(formData?.password) ? 'text-success' : 'text-muted-foreground'}`}>
                  <Icon name={/[A-Z]/?.test(formData?.password) ? 'Check' : 'X'} size={12} />
                  <span>Uppercase letter</span>
                </div>
                <div className={`flex items-center space-x-1 ${/[0-9]/?.test(formData?.password) ? 'text-success' : 'text-muted-foreground'}`}>
                  <Icon name={/[0-9]/?.test(formData?.password) ? 'Check' : 'X'} size={12} />
                  <span>Number</span>
                </div>
                <div className={`flex items-center space-x-1 ${/[^A-Za-z0-9]/?.test(formData?.password) ? 'text-success' : 'text-muted-foreground'}`}>
                  <Icon name={/[^A-Za-z0-9]/?.test(formData?.password) ? 'Check' : 'X'} size={12} />
                  <span>Special character</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Confirm Password */}
      <Input
        label="Confirm Password"
        type="password"
        placeholder="Re-enter your password"
        value={formData?.confirmPassword}
        onChange={(e) => handleInputChange('confirmPassword', e?.target?.value)}
        error={errors?.confirmPassword}
        required
        className="transition-all duration-200"
      />
      {/* Phone Number (Optional) */}
      <Input
        label="Phone Number (Optional)"
        type="tel"
        placeholder="Enter your phone number"
        value={formData?.phone}
        onChange={(e) => handleInputChange('phone', e?.target?.value)}
        description="For booking updates and support"
        className="transition-all duration-200"
      />
      {/* Marketing Consent */}
      <Checkbox
        label="Send me event updates and special offers"
        description="Get notified about upcoming events and exclusive deals"
        checked={formData?.marketingConsent}
        onChange={(e) => handleInputChange('marketingConsent', e?.target?.checked)}
        className="transition-all duration-200"
      />
      {/* Terms and Privacy */}
      <div className="space-y-3">
        <Checkbox
          label="I agree to the Terms of Service"
          checked={formData?.termsAccepted}
          onChange={(e) => handleInputChange('termsAccepted', e?.target?.checked)}
          error={errors?.termsAccepted}
          required
          className="transition-all duration-200"
        />
        
        <Checkbox
          label="I agree to the Privacy Policy"
          checked={formData?.privacyAccepted}
          onChange={(e) => handleInputChange('privacyAccepted', e?.target?.checked)}
          error={errors?.privacyAccepted}
          required
          className="transition-all duration-200"
        />
      </div>
      {/* Submit Button */}
      <Button
        type="submit"
        variant="default"
        size="lg"
        fullWidth
        loading={isLoading}
        iconName="UserPlus"
        iconPosition="left"
        className="mt-8 shadow-cyber hover:shadow-elevation-3 transition-all duration-200"
      >
        Create Account
      </Button>
    </form>
  );
};

export default RegistrationForm;