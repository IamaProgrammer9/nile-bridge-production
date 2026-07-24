import { IoSearch } from "react-icons/io5";
import { useAuth } from "./contexts/auth-context.tsx";
import { Link } from "react-router";
import LogoWhite from "../assets/logo_white.png";
import Person from "../assets/person.png";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router";
import { logOut } from "../api/auth.ts";

export function AppHeader({ onSearch }: { onSearch: (query: string) => void }) {
    const auth = useAuth();
    const [profileMenuState, setProfileMenuState] = useState(false);
    const profileMenuRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    async function handleLogout() {
        auth.logout(null);
        await logOut();
        navigate("/signin");
    }

    useEffect(() => {
        const handleOutsideClick = (event: any) => {
            if (
                profileMenuRef.current &&
                !profileMenuRef.current.contains(event.target)
            ) {
                setProfileMenuState(false);
            }
        };

        if (profileMenuState) {
            document.addEventListener("mousedown", handleOutsideClick);
        } else {
            document.removeEventListener("mousedown", handleOutsideClick);
        }
    }, [profileMenuState]);

    const toggleProfileMenu = () => {
        setProfileMenuState(!profileMenuState);
    };

    return (
        <div className="h-full w-full bg-slate-900 grid grid-cols-[320px_1fr_320px] items-center justify-evenly p-2">
            {/* 2. Added min-h-0 to let the wrapper shrink, and h-full to the image */}
            <Link to="/" className="h-full min-h-0 flex items-center">
                <img
                    className="h-full w-auto object-contain"
                    src={LogoWhite}
                    alt="Logo"
                />
            </Link>

            {/*Search bar*/}
            <div className="flex w-full h-full justify-center items-center">
                <div className="w-[90%] h-[80%] grid grid-cols-[1fr_60px]">
                    {/*Search input*/}
                    <input
                        className="w-full h-full border bg-white border-gray-800 rounded-bl-xl rounded-tl-xl px-4"
                        placeholder="Search"
                        onChange={(e) => onSearch(e.target.value)}
                    />
                    {/*Search button*/}
                    <button className="w-full h-full flex justify-center items-center border border-l-0 border-gray-800 bg-gray-200 rounded-tr-xl rounded-br-xl">
                        <IoSearch className="text-xl" />
                    </button>
                </div>
            </div>

            {/*Other actions*/}
            <div className="h-full min-w-20 flex justify-center items-center">
                {auth?.isAuthenticated ? (
                    <div className="w-full h-full flex items-center justify-end pr-4 gap-2">
                        {/*Navbar if user is admin*/}
                        {auth?.user.isAdmin ? (
                            <div className="flex items-center gap-2">
                                <Link
                                    to="/admin"
                                    className="text-lg text-white hover:underline"
                                >
                                    Admin
                                </Link>
                                <Link
                                    to="/"
                                    className="text-lg text-white hover:underline"
                                >
                                    Home
                                </Link>
                                <span className="text-lg text-white">|</span>
                            </div>
                        ) : null}
                        <div
                            ref={profileMenuRef}
                            className="w-fit h-fit flex items-center gap-3 relative"
                        >
                            <span className="text-lg text-white">
                                {auth.user.name}
                            </span>
                            <button
                                onClick={toggleProfileMenu}
                                className="w-10 h-10 rounded-full cursor-pointer"
                            >
                                <img
                                    src={Person}
                                    alt="person"
                                    className="w-10 h-10 rounded-full"
                                />
                            </button>
                            {/* Floating Menu */}
                            {profileMenuState && (
                                <ul
                                    style={{
                                        position: "absolute",
                                        top: "100%",
                                        left: 0,
                                        marginTop: "8px",
                                        backgroundColor: "white",
                                        border: "1px solid #ccc",
                                        borderRadius: "4px",
                                        padding: "8px 0",
                                        listStyle: "none",
                                        minWidth: "150px",
                                        boxShadow:
                                            "0px 4px 6px rgba(0,0,0,0.1)",
                                        zIndex: 10,
                                    }}
                                >
                                    <Link to="/cart">
                                        <li
                                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                            onClick={() =>
                                                console.log("Orders")
                                            }
                                        >
                                            Cart
                                        </li>
                                    </Link>
                                    <li
                                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                        onClick={() => handleLogout()}
                                    >
                                        Logout
                                    </li>
                                </ul>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="w-full flex justify-center items-center gap-2">
                        <Link
                            to="/signin"
                            className="px-8 py-2 bg-white border border-gray-800 rounded-3xl cursor-pointer"
                        >
                            Sign in
                        </Link>
                        <Link
                            to="/signup"
                            className="px-8 py-2 bg-yellow-300 rounded-3xl cursor-pointer"
                        >
                            Join us
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
