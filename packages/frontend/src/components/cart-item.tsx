import Star from "../assets/star.png";
import HalfStar from "../assets/half-star.png";
import EmptyStar from "../assets/empty-star.png";
import { removeFromCart } from "../api/cart";

export function CartItem(props: {
    id: string;
    image: string;
    name: string;
    rating: number;
    price: number;
    onRemove: (id: string) => void;
}) {
    const stars = getRatingList(props.rating);

    const removeFromCartFunction = async () => {
        const response = await removeFromCart(props.id);
        if (response.success) {
            props.onRemove(props.id);
        } else {
            alert("Something wrong happened when removing from cart");
        }
    };
    
    return (
        <div
            className="w-70 h-fit bg-white rounded-2xl grid grid-rows-[1fr_auto_30px_40px_40px] p-2 gap-4 box-content shadow-none duration-300 hover:shadow-xl"
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
                    removeFromCartFunction();
                }}
                className="cursor-pointer w-full rounded-xl text-white bg-red-600 flex justify-center items-center"
            >
                Remove from cart
            </button>
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
