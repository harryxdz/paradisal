import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { checkPermissions } from '../utils/security';

export const useSecurity = (requiredPermissions: string[]) => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyAccess = async () => {
      const hasAccess = await checkPermissions(requiredPermissions);
      if (!hasAccess) {
        navigate('/unauthorized', { state: { from: location } });
      }
    };
    
    verifyAccess();
    
    // Activity timeout
    const timeout = setTimeout(() => {
      // Handle session timeout
    }, 30 * 60 * 1000); // 30 minutes
    
    return () => clearTimeout(timeout);
  }, [requiredPermissions, location, navigate]);
};