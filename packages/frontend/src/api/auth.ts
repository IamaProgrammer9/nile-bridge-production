import api from "./apiService";

/**
 * @param email - The user's email address
 * @param password - The user's password
 * @returns `{ success: true, response }` on success, `{ success: false, response: err.response }` on failure
 */
export async function signin(email: string, password: string): Promise<{ success: boolean, response: any }> {
    try {
        return {
            success: true,
            response: await api.post(
                "/api/auth/signin",
                {
                    email,
                    password
                },
            )
        };
    } catch (err: any) {
        return { success: false, response: err.response };
    }
}

/**
 * @param email - The user's email address
 * @param name - The user's display name
 * @param password - The user's password
 * @returns The response from the signup API call
 */
export async function signup(email: string, name: string, password: string, isAdmin: boolean) {
    try {
        return {
            success: true,
            response: await api.post(
                "/api/auth/signup",
                {
                    email,
                    password,
                    name,
                    isAdmin,
                },
            )
        };
    } catch (err: any) {
        return { success: false, response: err.response };
    }
}

/**
 * @returns The access token to be stored in the memory.
 */
export async function refreshToken() {
    try {
        return {
            success: true,
            response: await api.post(
                "/api/auth/refresh",
            )
        };
    } catch (err: any) {
        return { success: false, response: err.response };
    }
}

/**
 * Checks whether the user is authenticated or not, and returns user's info if authorized.
 * @res `{ id: number, name: string }`
 * @error `Not authenticated`
 */
export async function IsAuth() {
    try {
        return {
            success: true,
            response: await api.get(
                "/api/auth/",
            )
        };
    } catch (err: any) {
        return { success: false, response: err.response };
    }
}

export async function logOut() {
    try {
        return {
            success: true,
            response: await api.post(
                "/api/auth/logout",
            )
        };
    } catch (err: any) {
        return { success: false, response: err.response };
    }
}
