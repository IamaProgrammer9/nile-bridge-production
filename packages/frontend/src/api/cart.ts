import api from "./apiService";

export const addToCart = async (productId: string) => {
    try {
        return {
            success: true,
            response: await api.post(
                "/api/cart/add",
                { productId },
            )
        };
    } catch (err: any) {
        return { success: false, response: err.response };
    }
};

export const viewCartItems = async () => {
    try {
        return {
            success: true,
            response: await api.get("/api/cart/")
        };
    } catch (err: any) {
        return { success: false, response: err.response };
    }
};

export const removeFromCart = async (productId: string) => {
    try {
        return {
            success: true,
            response: await api.delete("/api/cart/remove", {
                params: { productId },
            })
        };
    } catch (err: any) {
        return { success: false, response: err.response };
    }
};
