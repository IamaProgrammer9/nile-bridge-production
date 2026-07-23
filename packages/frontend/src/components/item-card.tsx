import { useState } from "react";
import { useNavigate } from "react-router";
import Star from "../assets/star.png";
import HalfStar from "../assets/half-star.png";
import EmptyStar from "../assets/empty-star.png";
import { addToCart } from "../api/cart";
import { deleteProduct, editProduct } from "../api/products";
import { useAuth } from "./contexts/auth-context";
import { useProducts } from "./contexts/products-context";

export function ItemCard(props: {
    id: string;
    image: string;
    name: string;
    rating: number;
    price: number;
    description?: string;
    categoryId?: number;
    onDelete?: (id: string) => void;
    onEdit?: (
        id: string,
        data: {
            name: string;
            price: number;
            description: string;
            categoryId: number;
        },
    ) => void;
}) {
    const navigate = useNavigate();
    const stars = getRatingList(props.rating);
    const auth = useAuth();
    const { categories } = useProducts();
    const [showEditModal, setShowEditModal] = useState(false);
    const [editName, setEditName] = useState(props.name);
    const [editPrice, setEditPrice] = useState(props.price);
    const [editDescription, setEditDescription] = useState(
        props.description ?? "",
    );
    const [editCategoryId, setEditCategoryId] = useState(props.categoryId ?? 0);

    const addToCartFunction = async () => {
        console.log(props.id);
        const response = await addToCart(props.id as string);
        if (response.success) {
            navigate("/");
            alert("Product successfuly added to cart");
        } else {
            if (!auth.isAuthenticated) {
                alert('You need to be logged in to add products to your cart.')
            } else {
                alert("You already have this product in your cart!");
            }
        }
    };

    return (
        <div
            onClick={() => navigate(`/view-product?productId=${props.id}`)}
            className="w-70 h-fit bg-white rounded-2xl grid grid-rows-[1fr_auto_30px_40px_40px_auto] p-2 gap-2 box-content cursor-pointer shadow-none duration-300 hover:shadow-xl"
        >
            <div className="w-full h-fit flex justify-center items-center">
                <img
                    src={props.image}
                    className="bg-neutral-400 rounded-xl object-cover max-h-40 min-h-0"
                    alt=""
                />
            </div>
            <div className="text-xl">{props.name}</div>
            <div className="flex justify-start items-center gap-0.5">
                {stars.map((star, index) => {
                    switch (star) {
                        case 1:
                            return (
                                <img
                                    className="h-6"
                                    src={Star}
                                    key={index}
                                ></img>
                            );
                        case 0.5:
                            return (
                                <img
                                    className="h-6"
                                    src={HalfStar}
                                    key={index}
                                ></img>
                            );
                        case 0:
                            return (
                                <img
                                    className="h-6"
                                    src={EmptyStar}
                                    key={index}
                                ></img>
                            );
                    }
                })}
            </div>
            <div className="text-2xl font-bold mt-1">
                {props.price.toLocaleString()}
                <sup className="text-sm font-normal">EGP</sup>
            </div>
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    addToCartFunction();
                }}
                className="cursor-pointer w-full rounded-xl text-white bg-orange-400 flex justify-center items-center"
            >
                Add to cart
            </button>
            {auth.isAuthenticated && auth.user.isAdmin && (
                <div className="w-full h-11 flex flex-row gap-2">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            deleteProduct(props.id).then((res) => {
                                if (res.success) {
                                    alert("Product deleted successfully");
                                    props.onDelete?.(props.id);
                                } else {
                                    alert("Failed to delete product");
                                }
                            });
                        }}
                        className="w-full h-full bg-red-600 text-white rounded-xl cursor-pointer flex justify-center items-center"
                    >
                        Delete
                    </button>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setEditName(props.name);
                            setEditPrice(props.price);
                            setEditDescription(props.description ?? "");
                            setEditCategoryId(props.categoryId ?? 0);
                            setShowEditModal(true);
                        }}
                        className="w-full h-full bg-blue-600 text-white rounded-xl cursor-pointer flex justify-center items-center"
                    >
                        Edit
                    </button>
                </div>
            )}
            {showEditModal && (
                <div
                    className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center cursor-default"
                    onClick={(e) => {
                        setShowEditModal(false);
                        e.stopPropagation();
                    }}
                >
                    <div
                        className="bg-white rounded-2xl p-6 w-96 relative"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={() => setShowEditModal(false)}
                            className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-xl cursor-pointer"
                        >
                            ✕
                        </button>
                        <h2 className="text-xl font-bold mb-4">Edit Product</h2>
                        <div className="flex flex-col gap-3">
                            <input
                                type="text"
                                placeholder="Name"
                                value={editName}
                                onChange={(e) => setEditName(e.target.value)}
                                className="border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-blue-500"
                            />
                            <input
                                type="number"
                                placeholder="Price"
                                value={editPrice}
                                onChange={(e) =>
                                    setEditPrice(Number(e.target.value))
                                }
                                className="border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-blue-500"
                            />
                            <textarea
                                placeholder="Description"
                                value={editDescription}
                                onChange={(e) =>
                                    setEditDescription(e.target.value)
                                }
                                className="border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-blue-500 h-24 resize-none"
                            />
                            <select
                                value={editCategoryId}
                                onChange={(e) =>
                                    setEditCategoryId(Number(e.target.value))
                                }
                                className="border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-blue-500"
                            >
                                <option value={0} disabled>
                                    Select category
                                </option>
                                {categories.map((cat) => (
                                    <option key={cat.id} value={cat.id}>
                                        {cat.name}
                                    </option>
                                ))}
                            </select>
                            <button
                                onClick={() => {
                                    editProduct(props.id, {
                                        name: editName,
                                        price: editPrice,
                                        description: editDescription,
                                        categoryId: editCategoryId,
                                    }).then((res) => {
                                        if (res.success) {
                                            alert(
                                                "Product updated successfully",
                                            );
                                            props.onEdit?.(props.id, {
                                                name: editName,
                                                price: editPrice,
                                                description: editDescription,
                                                categoryId: editCategoryId,
                                            });
                                            setShowEditModal(false);
                                        } else {
                                            alert("Failed to update product");
                                        }
                                    });
                                }}
                                className="bg-blue-600 text-white rounded-lg py-2 cursor-pointer hover:bg-blue-700"
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

function getRatingList(rating: number): number[] {
    let stars: number[] = [];
    for (let i = 0; i < Math.floor(rating); i++) {
        stars.push(1);
    }
    let remainder = Math.ceil(rating) - rating;
    if (remainder) stars.push(0.5);
    // Increase stars length to 5
    if (stars.length < 5) {
        stars.push(...Array(5 - stars.length).fill(0));
    }
    return stars;
}
