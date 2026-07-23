import { useState, useEffect } from "react";
import { useSearchParams } from "react-router";
import { addProductReview, getProductData, getProductReviews } from "../../api/products";
import type { Product } from "../items-container";
import { MdOutlineNavigateNext, MdOutlineNavigateBefore } from "react-icons/md";
import { addToCart } from "../../api/cart";
import { useNavigate } from "react-router";
import Star from "../../assets/star.png";
import HalfStar from "../../assets/half-star.png";
import EmptyStar from "../../assets/empty-star.png";

interface ProductReview {
    userName: string;
    comment: string;
    rating: number;
}

export function ViewProduct() {
    const [searchParams] = useSearchParams();
    const productId = searchParams.get("productId");
    const [product, setProduct] = useState<Product | null>(null);
    const [activeImageIndex, setActiveImageIndex] = useState(0);
    const [comment, setComment] = useState("");
    const [rating, setRating] = useState("");
    const [reviews, setReviews] = useState<ProductReview[]>([]);
    const navigate = useNavigate();

    const initRequest = async () => {
        if (!productId) alert("You must specifiy a product id");

        const productDataResponse = await getProductData(productId as string);

        if (productDataResponse.success) {
            setProduct(productDataResponse.response.data as Product);
            await getOwnProductReviews();
        } else {
            alert("Something wrong happened when fetching the product");
        }
    };

    async function getOwnProductReviews() {
        const reviewsResponse = await getProductReviews(productId as string);

        if (reviewsResponse.success) {
            setReviews(reviewsResponse.response.data as ProductReview[]);
        } else {
            alert("Something wrong happened when fetching the reviews");
        }
    }

    async function addReview() {
        const addReviewResponse = await addProductReview({
            productId: parseInt(productId as string),
            comment: comment,
            rating: parseInt(rating),
        });

        if (addReviewResponse.success) {
            alert("Review added successfully");
            initRequest();
        } else {
            alert("Something wrong happened when adding the review");
        }
    }

    const addToCartFunction = async () => {
        const response = await addToCart(productId as string);
        if (response.success) {
            navigate("/");
            alert("Product successfuly added to cart");
        } else {
            alert("Something wrong happened when adding to cart");
        }
    };

    useEffect(() => {
        initRequest();
    }, []);

    return (
        <div className="w-full h-full flex justify-center">
            <div className="bg-white w-full max-w-300 grid grid-cols-2 p-2">
                <div className="w-full h-full grid grid-rows-[auto_1fr]">
                    <div className="w-full h-100 flex flex-row justify-center overflow-hidden relative">
                        <img
                            src={`http://localhost:3000/${product?.imagesUrl[activeImageIndex]}`}
                            alt={product?.name}
                            className="max-w-200 max-h-full w-auto h-auto object-contain"
                        />
                        <div className="w-full h-full flex items-center absolute">
                            {activeImageIndex > 0 && (
                                <button
                                    onClick={() =>
                                        setActiveImageIndex((prev) => prev - 1)
                                    }
                                    className="w-10 h-10 rounded-full bg-neutral-800/30 flex justify-center items-center cursor-pointer absolute left-2"
                                >
                                    <MdOutlineNavigateBefore className="text-white text-4xl w-fit h-fit" />
                                </button>
                            )}
                            {activeImageIndex !=
                                (product?.imagesUrl.length as number) - 1 && (
                                <button
                                    onClick={() =>
                                        setActiveImageIndex((prev) => prev + 1)
                                    }
                                    className="w-10 h-10 rounded-full bg-neutral-800/30 flex justify-center items-center cursor-pointer absolute right-2"
                                >
                                    <MdOutlineNavigateNext className="text-white text-4xl w-fit h-fit" />
                                </button>
                            )}
                        </div>
                    </div>
                    <div className="w-full h-full p-7 flex flex-col gap-4">
                        <div className="text-4xl font-bold">Write a review</div>
                        <textarea
                            placeholder="Your comment"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            className="w-full h-27 border border-neutral-500 rounded-2xl p-3"
                        />
                        <input
                            type="number"
                            placeholder="Rating"
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}
                            className="w-full h-10 border border-neutral-500 rounded-xl p-3"
                            min="0"
                            max="5"
                        />
                        <button
                            onClick={addReview}
                            className="w-full h-12 cursor-pointer rounded-xl text-xl font-semibold text-white bg-blue-900 flex justify-center items-center"
                        >
                            Submit
                        </button>
                    </div>
                </div>
                <div className="w-full h-full grid grid-rows-[auto_1fr] p-4">
                    <div className="h-100 flex flex-col gap-7">
                        <div className="text-6xl font-bold">
                            {product?.name}
                        </div>
                        <div className="text-xl text-neutral-700">
                            {product?.description}
                        </div>
                        <div className="flex justify-start items-center gap-1">
                            {getRatingList(
                                (product?.rating as number) ?? 0,
                            ).map((star, index) => {
                                switch (star) {
                                    case 1:
                                        return (
                                            <img
                                                className="h-10"
                                                src={Star}
                                                key={index}
                                            />
                                        );
                                    case 0.5:
                                        return (
                                            <img
                                                className="h-10"
                                                src={HalfStar}
                                                key={index}
                                            />
                                        );
                                    case 0:
                                        return (
                                            <img
                                                className="h-10"
                                                src={EmptyStar}
                                                key={index}
                                            />
                                        );
                                }
                            })}
                        </div>
                        <div className="text-4xl font-bold mt-1">
                            {product?.price.toLocaleString()}
                            <sup className="text-sm font-normal">EGP</sup>
                        </div>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                addToCartFunction();
                            }}
                            className="w-full h-15 cursor-pointer rounded-xl text-2xl font-semibold text-white bg-orange-400 flex justify-center items-center"
                        >
                            Add to cart
                        </button>
                    </div>
                    <div className="w-full h-full p-3 flex flex-col gap-4">
                        <div className="text-4xl font-bold">Reviews</div>
                        <div className="w-full h-full overflow-y-scroll">
                            {reviews.length === 0 ? (
                                <div className="text-xl text-neutral-500">No reviews yet</div>
                            ) : reviews.map((review, index) => (
                                <div key={index} className="flex flex-col gap-2">
                                    <div className="text-xl font-bold">{review.userName}</div>
                                    <div className="text-neutral-700">{review.comment}</div>
                                    <div className="flex justify-start items-center gap-1">
                                        {getRatingList(
                                            (review.rating as number) ?? 0,
                                        ).map((star, index) => {
                                            switch (star) {
                                                case 1:
                                                    return (
                                                        <img
                                                            className="h-6"
                                                            src={Star}
                                                            key={index}
                                                        />
                                                    );
                                                case 0.5:
                                                    return (
                                                        <img
                                                            className="h-6"
                                                            src={HalfStar}
                                                            key={index}
                                                        />
                                                    );
                                                case 0:
                                                    return (
                                                        <img
                                                            className="h-6"
                                                            src={EmptyStar}
                                                            key={index}
                                                        />
                                                    );
                                            }
                                        })}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
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
    if (stars.length < 5) {
        stars.push(...Array(5 - stars.length).fill(0));
    }
    return stars;
}
