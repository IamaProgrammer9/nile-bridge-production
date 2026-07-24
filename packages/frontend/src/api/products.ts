import api from "./apiService";

export const createProduct = async (data: FormData) => {
    try {
        return {
            success: true,
            response: await api.post(
                "/api/products/add",
                data,
            )
        };
    } catch (err: any) {
        return { success: false, response: err.response };
    }
};

export const getCategories = async () => {
    try {
        return {
            success: true,
            response: await api.get(
                "/api/products/categories/",
            )
        };
    } catch (err: any) {
        return { success: false, response: err.response };
    }
};

export const getProductData = async (id: string) => {
    try {
        return {
            success: true,
            response: await api.get(
                "/api/products/product",
                {
                    params: {
                        id,
                    },
                },
            )
        };
    } catch (err: any) {
        return { success: false, response: err.response };
    }
};

export const getProducts = async (page: number = 1, take: number = 10) => {
    try {
        return {
            success: true,
            response: await api.get(
                "/api/products",
                {
                    params: {
                        page,
                        take,
                    },
                },
            )
        };
    } catch (err: any) {
        return { success: false, response: err.response };
    }
};

export const getFilteredProducts = async (categoryId: number) => {
    try {
        return {
            success: true,
            response: await api.get(
                "/api/products/filtered",
                {
                    params: {
                        categoryId,
                    },
                },
            )
        };
    } catch (err: any) {
        return { success: false, response: err.response };
    }
};

export const getProductReviews = async (id: string) => {
    try {
        return {
            success: true,
            response: await api.get(
                "/api/products/reviews",
                {
                    params: {
                        productId: id,
                    },
                },
            )
        };
    } catch (err: any) {
        return { success: false, response: err.response };
    }
};

export const addProductReview = async ({ productId, rating, comment }: { productId: number; rating: number; comment: string }) => {
    try {
        return {
            success: true,
            response: await api.post(
                "/api/products/review",
                {
                    productId,
                    rating,
                    comment,
                },
            )
        };
    } catch (err: any) {
        return { success: false, response: err.response };
    }
};

export const deleteProduct = async (id: string) => {
    try {
        return {
            success: true,
            response: await api.delete("/api/products/delete", {
                params: { id },
            })
        };
    } catch (err: any) {
        return { success: false, response: err.response };
    }
};

export const editProduct = async (id: string, data: { name: string; price: number; description: string; categoryId: number }) => {
    try {
        return {
            success: true,
            response: await api.put("/api/products/edit", data, {
                params: { id },
            })
        };
    } catch (err: any) {
        return { success: false, response: err.response };
    }
};

export const searchProducts = async (query: string) => {
    try {
        return {
            success: true,
            response: await api.get(
                "/api/products/search",
                {
                    params: {
                        search: query,
                    },
                },
            )
        };
    } catch (err: any) {
        return { success: false, response: err.response };
    }
};
