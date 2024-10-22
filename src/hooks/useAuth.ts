import { useState, useEffect } from 'react';
import { fetchUserAttributes, FetchUserAttributesOutput } from 'aws-amplify/auth';

interface UseAuthResult {
    isAuthenticated: boolean;
    user: FetchUserAttributesOutput | null;
    loading: boolean;
}

function useAuth(): UseAuthResult {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [user, setUser] = useState<FetchUserAttributesOutput | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        async function checkAuthStatus() {
            try {
                const currentUser = await fetchUserAttributes();
                setIsAuthenticated(true);
                setUser(currentUser);
            } catch (err) {
                setIsAuthenticated(false);
                setUser(null);

                console.error(err)
            } finally {
                setLoading(false);
            }
        }
        checkAuthStatus();
    }, []);

    return { isAuthenticated, user, loading };
}

export { useAuth };
