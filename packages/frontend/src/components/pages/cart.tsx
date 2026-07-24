import { FaShoppingCart } from "react-icons/fa";
import { useEffect, useState } from "react";
import type { Product } from "../items-container";
import { viewCartItems } from "../../api/cart";
import { CartItem } from "../cart-item";

export function CartPage() {
    const [cartItems, setCartItems] = useState<Product[]>([]);

    async function initRequest() {
        await getOwnCartItems();
    }

    async function getOwnCartItems() {
        const result = await viewCartItems();
        if (result.success) {
            setCartItems(result.response.data);
        }
    }

    function handleRemove(id: string) {
        setCartItems((prev) => prev.filter((item) => item.id.toString() !== id));
    }

    useEffect(() => {
        initRequest();
    }, [])
    
    return (
        <div className="w-full h-full p-7 flex flex-col gap-7">
            <div className="text-5xl font-bold flex items-center">
                <FaShoppingCart className="mr-4" />
                Cart
            </div>
            <div className="w-full h-fit flex flex-nowrap gap-4 overflow-x-scroll pb-12">
                {cartItems.map((item, index) => (
                    <div key={index} className="shrink-0">
                        <CartItem
                            id={item.id.toString()}
                            image={`http://localhost:3000/${item.imagesUrl[0]}`}
                            name={`${item.name}`}
                            price={item.price}
                            rating={item.rating}
                            onRemove={handleRemove}
                        />
                    </div>
                ))}
            </div>

            <div className="text-3xl font-bold flex items-center gap-3">
                <span>
                    Total: ${cartItems.reduce((acc, item) => acc + item.price, 0)}
                </span>
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-2xl"
                    onClick={() => alert("Order coming to your house Inshaa Allah")}>
                    Order
                </button>
            </div>
        </div>
    );
}
