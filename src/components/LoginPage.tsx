import React, { useState } from 'react';
import { User, Lock, Eye, EyeOff, Shield, Phone, Mail, LogIn, AlertCircle, Loader } from 'lucide-react';
import { login, validateLoginInput, type LoginCredentials } from '../utils/auth';

interface LoginPageProps {
  setIsLoggedIn: (status: boolean) => void;
  setCurrentPage: (page: string) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ setIsLoggedIn, setCurrentPage }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loginError, setLoginError] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [loginMethod, setLoginMethod] = useState('id');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsLoading(true);
    setErrors({});
    setLoginError('');

    const credentials: LoginCredentials = {
      username: formData.username,
      password: formData.password
    };

    // Validate input
    const validation = validateLoginInput(credentials);
    if (!validation.isValid) {
      setErrors(validation.errors);
      setIsLoading(false);
      return;
    }

    try {
      const result = await login(credentials);
      
      if (result.success && result.session) {
        setIsLoggedIn(true);
        setCurrentPage('account');
      } else {
        setLoginError(result.error || 'Login failed');
      }
    } catch (error) {
      setLoginError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear errors when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
    
    if (loginError) {
      setLoginError('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <LogIn className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Paradisal Portal</h2>
          <p className="mt-2 text-gray-600">Sign in to access services</p>
        </div>

        {/* Login Method Selector */}
        <div className="bg-white p-1 rounded-lg shadow-sm border border-gray-200">
          <div className="grid grid-cols-3 gap-1">
            <button
              onClick={() => setLoginMethod('id')}
              className={`py-2 px-3 text-sm font-medium rounded-md transition-colors ${
                loginMethod === 'id'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Sovereign ID
            </button>
            <button
              onClick={() => setLoginMethod('email')}
              className={`py-2 px-3 text-sm font-medium rounded-md transition-colors ${
                loginMethod === 'email'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Email
            </button>
            <button
              onClick={() => setLoginMethod('phone')}
              className={`py-2 px-3 text-sm font-medium rounded-md transition-colors ${
                loginMethod === 'phone'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Phone
            </button>
          </div>
        </div>

        {/* Login Form */}
        <form className="bg-white p-8 rounded-lg shadow-md space-y-6" onSubmit={handleSubmit}>
          {/* Login Error */}
          {loginError && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
              <div>
                <h4 className="text-sm font-medium text-red-800">Login Failed</h4>
                <p className="text-sm text-red-700 mt-1">{loginError}</p>
              </div>
            </div>
          )}

          <div>
            <label htmlFor="identifier" className="block text-sm font-medium text-gray-700 mb-2">
              {loginMethod === 'id' ? 'Sovereign ID Number' : loginMethod === 'email' ? 'Email Address' : 'Phone Number'}
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                {loginMethod === 'id' && <User className="w-5 h-5 text-gray-400" />}
                {loginMethod === 'email' && <Mail className="w-5 h-5 text-gray-400" />}
                {loginMethod === 'phone' && <Phone className="w-5 h-5 text-gray-400" />}
              </div>
              <input
                id="identifier"
                name="username"
                type={loginMethod === 'email' ? 'email' : 'text'}
                required
                value={formData.username}
                onChange={handleInputChange}
                placeholder={
                  loginMethod === 'id' ? 'PD-2025-123456' : 
                  loginMethod === 'email' ? 'your.email@example.com' : 
                  '+44 1234567890'
                }
                className={`pl-10 pr-4 py-3 w-full border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.username ? 'border-red-300 bg-red-50' : 'border-gray-300'
                }`}
                disabled={isLoading}
              />
            </div>
            {errors.username && (
              <p className="mt-1 text-sm text-red-600">{errors.username}</p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="w-5 h-5 text-gray-400" />
              </div>
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                required
                value={formData.password}
                onChange={handleInputChange}
                className={`pl-10 pr-12 py-3 w-full border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.password ? 'border-red-300 bg-red-50' : 'border-gray-300'
                }`}
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                disabled={isLoading}
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5 text-gray-400" />
                ) : (
                  <Eye className="w-5 h-5 text-gray-400" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">{errors.password}</p>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                disabled={isLoading}
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>

            <button type="button" className="text-sm text-blue-600 hover:text-blue-700">
              Forgot password?
            </button>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <Loader className="w-5 h-5 mr-2 animate-spin" />
                Signing In...
              </>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        {/* Registration Link */}
        <div className="text-center">
          <p className="text-gray-600">
            Claim Your Sovereignty Today - {' '}
            <button className="text-blue-600 hover:text-blue-700 font-medium">
              Apply Now
            </button>
          </p>
        </div>

        {/* Security Notice */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <h4 className="text-sm font-medium text-blue-800 mb-1">Secure Login</h4>
              <p className="text-sm text-blue-700">
                Your information is protected with high-level security. 
                We use encryption to keep your data safe.
              </p>
            </div>
          </div>
        </div>

        {/* Help Links */}
        <div className="grid grid-cols-2 gap-4 text-center text-sm">
          <button className="text-gray-600 hover:text-gray-900">
            Need Help?
          </button>
          <button className="text-gray-600 hover:text-gray-900">
            Contact Support
          </button>
        </div>

        {/* Demo Credentials */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
          <h4 className="text-sm font-medium text-blue-800 mb-2">Demo Accounts</h4>
          <div className="text-xs text-blue-700 space-y-1">
            <p><strong>Admin:</strong> admin / admin123</p>
            <p><strong>National:</strong> maria.rodriguez / mariaPass</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;