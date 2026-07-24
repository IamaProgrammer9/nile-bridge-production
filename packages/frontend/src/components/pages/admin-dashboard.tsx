import { createProduct } from "../../api/products";
import LogoBlack from "../../assets/logo.png";
import { useEffect, useState } from "react";

import {
    useProducts,
    type ProductCategory,
} from "../../components/contexts/products-context.tsx";

import { Link, useNavigate } from "react-router";
import { IoIosWarning } from "react-icons/io";
import { useAuth } from "../contexts/auth-context.tsx";

export function AdminDashboard() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [category, setCategory] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();
    const auth = useAuth();

    const { categories } = useProducts();

    useEffect(() => {
        console.log(true);
        if (!auth.isAuthenticated) {
            navigate("/");
            return;
        }
        if (!auth.user.isAdmin) {
            navigate("/");
        }
    }, [auth.isAuthenticated, auth.user, navigate]);

    const handleFileChange = (event: any) => {
        // Convert FileList to a standard Array
        setSelectedFiles(Array.from((event.target as any).files));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (selectedFiles.length === 0) {
            setError("Please select at least one image first");
            return;
        }

        if (!category) {
            setCategory(categories[0].name);
        }

        const formData = new FormData();
        selectedFiles.forEach((file) => {
            formData.append("images", file);
        });

        formData.append("name", name);
        formData.append("description", description);
        formData.append("price", price.toString());
        formData.append("categoryName", category);

        setError("");
        setIsLoading(true);

        const response: any = await createProduct(formData);

        if (response.success) {
            alert("Product created successfully");
        } else {
            setError(response.response.data);
        }
        setIsLoading(false);
    };

    return (
        <div className="w-full h-full overflow-x flex flex-col justify-center items-center gap-3">
            <div className="flex justify-center items-center flex-col gap-2">
                <div className="text-4xl font-semibold mb-2">
                    Admin Dashboard
                </div>
                <div className="w-120 h-fit bg-white rounded-2xl flex flex-col p-4 gap-2">
                    <div className="flex justify-center items-center">
                        <img className="h-10" alt="Logo" src={LogoBlack}></img>
                    </div>
                    <div className="flex justify-center items-center">
                        <span className="text-4xl font-bold">Add Product</span>
                    </div>

                    {error && (
                        <div className="w-full text-sm text-red-600 font-medium">
                            {JSON.stringify(error, null, 2)}
                        </div>
                    )}

                    <form
                        className="w-full h-full flex flex-col items-center gap-5"
                        onSubmit={handleSubmit}
                    >
                        <div className="w-full flex items-center">
                            <div className="grow border-t border-gray-600"></div>
                            <span className="mx-4 shrink text-gray-800 text-lg font-medium">
                                Your info
                            </span>
                            <div className="grow border-t border-gray-600"></div>
                        </div>
                        <input
                            className="w-full h-11 rounded-lg outline-none border border-gray-600 py-2 px-3 focus:border-2"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Name"
                        />
                        <input
                            className="w-full h-11 rounded-lg outline-none border border-gray-600 py-2 px-3 focus:border-2"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Description"
                        />
                        <input
                            className="w-full h-11 rounded-lg outline-none border border-gray-600 py-2 px-3 focus:border-2"
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(Number(e.target.value))}
                            placeholder="Price"
                        />
                        <select
                            className="w-full h-11 rounded-lg outline-none border border-gray-600 py-2 px-3 focus:border-2"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            name="Category"
                        >
                            {categories.map((cat: ProductCategory) => (
                                <option key={cat.id} value={cat.name}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>
                        <input
                            className="hidden"
                            type="file"
                            multiple
                            onChange={handleFileChange}
                            accept="image/*"
                        />
                        <button
                            className="w-full h-11 flex justify-center items-center bg-transparent border border-neutral-700 text-neutral-800 font-medium rounded-lg cursor-pointer"
                            onClick={() =>
                                (
                                    document.querySelector(
                                        'input[type="file"]',
                                    ) as any
                                ).click()
                            }
                            disabled={isLoading}
                            type="button"
                        >
                            Add image
                        </button>
                        <button
                            className="w-full h-11 flex justify-center items-center bg-orange-500 text-white font-semibold rounded-lg cursor-pointer"
                            type="submit"
                            disabled={isLoading}
                        >
                            {isLoading ? "Adding..." : "Add Product"}
                        </button>
                    </form>
                </div>
            </div>
            <span className="font-semibold text-lg flex items-center gap-1">
                <IoIosWarning className="text-red-500 text-3xl" />
                You are an admin, if you want to delete or edit elements, then
                go to the <Link className="underline" to="/">Home</Link> page.
            </span>
        </div>
    );
}
