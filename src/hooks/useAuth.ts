import { useState, useEffect } from 'react';
import { fetchUserAttributes, FetchUserAttributesOutput } from 'aws-amplify/auth';
import { useRouter } from 'next/navigation';

interface UseAuthResult {
    isAuthenticated: boolean;
    user: FetchUserAttributesOutput | null;
    loading: boolean;
}

function useAuth(allowedRoles?: string[]): UseAuthResult {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [user, setUser] = useState<FetchUserAttributesOutput | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const router = useRouter();

    useEffect(() => {
        async function checkAuthStatus() {
            try {
                const currentUser = await fetchUserAttributes();

                setIsAuthenticated(true);
                setUser(currentUser);
            } catch (err) {
                setIsAuthenticated(false);
                setUser(null);

                router.push('/');
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        checkAuthStatus();
    }, [allowedRoles, router]);

    return { isAuthenticated, user, loading };
}

export { useAuth };
