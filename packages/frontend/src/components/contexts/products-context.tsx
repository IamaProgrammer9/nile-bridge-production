import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { getCategories } from "../../api/products";

export interface ProductCategory {
    id: number;
    name: string;
}

export interface ProductsContextData {
    categories: ProductCategory[];
}

const ProductsContext = createContext<(null | ProductsContextData)>(null);

interface ProductsProviderProps {
    children: ReactNode;
}

export function ProductsProvider({ children }: ProductsProviderProps) {
    const [categories, setCategories] = useState([]);

    async function fetchCategories() {
        const result = await getCategories();
        if (result.success) {
            setCategories(result.response.data);
        }
    }

    useEffect(() => {
        fetchCategories();
    }, []);
    
    return (
        <ProductsContext.Provider value={{ categories }}>
            {children}
        </ProductsContext.Provider>
    );
}

export function useProducts() {
    const context = useContext(ProductsContext);
    if (!context) {
        throw new Error("useProducts must be used within a ProductsProvider");
    }
    return context;
}

export default ProductsContext;
