import { useState } from "react";
import { useProducts, type ProductCategory } from "../../contexts/products-context.tsx";
import { ItemsContainer } from "../../items-container.tsx";

export function Home({ searchQuery }: { searchQuery: string }) {
    const { categories } = useProducts();
    const [categoryId, setCategoryId] = useState(-1);
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(0);
    
    return (
        <div className="w-full h-full grid grid-rows-[50px_1fr]">
            <div className="w-full h-full bg-white flex justify-evenly items-center p-4">
                <div className="flex gap-2 text-xl">
                    <span>
                        Minimum price:
                    </span>
                    <input
                        type="number"
                        className="w-32 rounded border border-neutral-600"
                        value={minPrice}
                        onChange={(e) => setMinPrice(parseInt(e.target.value))}
                    />
                </div>
                <div className="flex gap-2 text-xl">
                    <span>
                        Maximum price:
                    </span>
                    <input
                        type="number"
                        className="w-32 rounded border border-neutral-600"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                    />
                </div>
                <select
                    className="w-48 h-9 rounded-lg outline-none border border-gray-600 py-2 px-3 focus:border-2"
                    value={categoryId}
                    onChange={(e) => setCategoryId(parseInt(e.target.value))}
                    name="Category"
                >
                    <option key="none" value="-1">
                        All
                    </option>
                    {categories.map((cat: ProductCategory) => (
                        <option key={cat.id} value={cat.id}>
                            {cat.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className="w-full h-full flex justify-center">
                <div className="w-full h-fit max-w-7xl">
                    <div className="flex items-center my-4">
                        <div className="grow border-t border-gray-300"></div>
                        <span className="mx-8 shrink text-gray-800 text-4xl font-semibold">
                            Most popular
                        </span>
                        <div className="grow border-t border-gray-300"></div>
                    </div>
                    <ItemsContainer searchQuery={searchQuery} minPrice={minPrice} maxPrice={maxPrice} categoryId={categoryId}></ItemsContainer>
                </div>
            </div>
        </div>
    );
}

export default Home;
