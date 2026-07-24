import { createContext, useContext, useEffect, useState } from 'react';
import { IsAuth, refreshToken } from '../../api/auth';

interface User {
    id: number,
    name: string,
    isAdmin: boolean,
}

interface AuthContextData {
    user: User;
    isAuthenticated: boolean;
    loading: boolean;
    checkAuth: any;
    login: any;
    logout: any;
}

const AuthContext = createContext<(null | AuthContextData)>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<(null | User)>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);

    const login = (userData: User) => {
        setUser(userData);
    }
    const logout = () => {
        setIsAuthenticated(false);
        setUser(null);
    }

    const checkAuth = async () => {
        try {
            await handleIsAuth();
        } catch {
            await handleRefreshToken();
        } finally {
            setLoading(false);
        }
    };

    const handleIsAuth = async () => {
        const result = await IsAuth();
        if (result.success) {
            setUser(result.response.data);
            setIsAuthenticated(true);
        } else {
            throw new Error('User is not authenticated');
        }
    }

    const handleRefreshToken = async () => {
        const result: any = await refreshToken();
        if (result.success) {
            setTimeout(async () => {
                await handleIsAuth();
            }, 300)
        }
    }

    useEffect(() => {
        const initAuth = async () => {
            await checkAuth();
            setLoading(false);
        };
        initAuth();
    }, []);

    return (
        <AuthContext.Provider value={{ user: (user as User), isAuthenticated, checkAuth, loading, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
