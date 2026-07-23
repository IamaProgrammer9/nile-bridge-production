import { useState, useEffect, useRef } from "react";
import {ItemCard} from "./item-card.tsx";
import { getFilteredProducts, getProducts, searchProducts } from "../api/products.ts";

export interface Product {
    id: number;
    name: string;
    price: number;
    imagesUrl: string[];
    description: string;
    categoryId: number;
    createdAt: string;
    rating: number;
}

export function ItemsContainer({ searchQuery, minPrice, maxPrice, categoryId = -1 }: { searchQuery: string, minPrice: number, maxPrice: number, categoryId?: number }) {
    const [items, setItems] = useState<Product[]>([]);
    const [searchItems, setSearchedItems] = useState<Product[]>([]);
    const [page, setPage] = useState<number>(1);
    const [filteredItems, setFilteredItems] = useState<Product[]>([]);
    const [loading, setLoading] = useState(false);
    const loadingRef = useRef(false);

    async function addProducts() {
        if (loadingRef.current) return;
        loadingRef.current = true;
        setLoading(true);
        const result = await getProducts(page, 10);
        if (result.success) {
            setItems(prev => prev.concat(result.response.data.data));
            setPage(prev => prev + 1);
        }
        loadingRef.current = false;
        setLoading(false);
    }

    async function handleCategoryChange(categoryId: number) {
        const result = await getFilteredProducts(categoryId);
        if (result.success) {
            setFilteredItems(result.response.data.data);
        };
    }

    async function Search(query: string) {
        const result = await searchProducts(query);
        if (result.success) {
            setSearchedItems(result.response.data);
        }
    }

    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        function handleScroll() {
            if (
                container!.scrollHeight - container!.scrollTop - container!.clientHeight < 200
            ) {
                addProducts();
            }
        }

        container.addEventListener("scroll", handleScroll);
        return () => container.removeEventListener("scroll", handleScroll);
    }, [page, loading]);

    useEffect(() => {
        addProducts();
    }, []);

    useEffect(() => {
        if (searchQuery) {
            Search(searchQuery);
        } else {
            setSearchedItems([]);
        }
        if (categoryId !== -1) {
            handleCategoryChange(categoryId);
        } else {
            setFilteredItems([]);
        }
    }, [searchQuery, minPrice, maxPrice, categoryId]);

    return (
        <div
            ref={containerRef}
            className="p-2 h-[calc(100vh-4rem)] overflow-y-auto bg-gray-100 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2"
        >
            {(searchQuery ? searchItems : categoryId !== -1 ? filteredItems : items).map((el) => {
                if (minPrice || maxPrice) {    
                    if (el.price < minPrice || el.price > maxPrice) {
                        return null;
                    }
                }

                if (categoryId != -1) {

                    if (el.categoryId !== categoryId) {
                        return null;
                    }
                }
                
                return <ItemCard
                    id={el.id.toString()}
                    image={`http://localhost:3000/${el.imagesUrl[0]}`}
                    name={`${el.name}`}
                    price={el.price}
                    key={el.id}
                    rating={el.rating}
                    description={el.description}
                    categoryId={el.categoryId}
                    onDelete={(deletedId) => {
                        setItems(prev => prev.filter(item => item.id.toString() !== deletedId));
                        setSearchedItems(prev => prev.filter(item => item.id.toString() !== deletedId));
                    }}
                    onEdit={(editedId, data) => {
                        const updater = (items: Product[]) => items.map(item =>
                            item.id.toString() === editedId
                                ? { ...item, name: data.name, price: data.price, description: data.description, categoryId: data.categoryId }
                                : item
                        );
                        setItems(updater);
                        setSearchedItems(updater);
                    }}
                />
            })}
        </div>
    )
}
