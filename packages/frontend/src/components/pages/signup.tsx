import LogoBlack from "../../assets/logo.png";
import { useState } from "react";
import { signup } from "../../api/auth.ts";
import { Link, useNavigate } from "react-router";

export function SignUp() {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setError("");

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        setIsLoading(true);
        
        const result = await signup(email, name, password, isAdmin);
        if (result.success) {
            navigate('/signin');
        } else {
            setError(result.response?.data || "Failed to create account.");
        }
        
        setIsLoading(false);
    };

    return (
        <div className="h-full flex justify-center items-center">
            <div className="w-105 h-fit grid grid-rows-[40px_65px_1fr] shadow-none duration-300 p-6 bg-white rounded-2xl hover:shadow-lg">
                <div className="flex justify-center items-center">
                    <img className="h-10" alt="Logo" src={LogoBlack} />
                </div>
                <div className="flex justify-center items-center">
                    <span className="text-4xl font-bold">
                        Sign up
                    </span>
                </div>
                <form className="w-full h-full flex flex-col items-center gap-5" onSubmit={handleSubmit}>
                    <div className="w-full flex items-center">
                        <div className="grow border-t border-gray-600"></div>
                        <span className="mx-4 shrink text-gray-800 text-lg font-medium">Your info</span>
                        <div className="grow border-t border-gray-600"></div>
                    </div>

                    {error && (
                        <div className="w-full text-sm text-red-600 font-medium">
                            {error}
                        </div>
                    )}

                    <input
                        className="w-full h-11 rounded-lg outline-none border border-gray-600 py-2 px-3 focus:border-2"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        required
                    />

                    <input
                        className="w-full h-11 rounded-lg outline-none border border-gray-600 py-2 px-3 focus:border-2"
                        type="text"
                        value={name}
                        onChange={(n) => setName(n.target.value)}
                        placeholder="Name"
                        required
                    />

                    <input
                        className="w-full h-11 rounded-lg outline-none border border-gray-600 py-2 px-3 focus:border-2"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        required
                    />

                    <input
                        className="w-full h-11 rounded-lg outline-none border border-gray-600 py-2 px-3 focus:border-2"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm password"
                        required
                    />

                    <div className="flex flex-row gap-2 items-center">
                        <input type="checkbox" id="admin" checked={isAdmin} onChange={(n) => setIsAdmin(n.target.checked)} name="admin"/>
                        <label htmlFor="admin">Is Admin</label>
                    </div>

                    <button
                        className="w-full h-11 flex justify-center items-center bg-orange-500 text-white font-semibold rounded-lg cursor-pointer disabled:cursor-not-allowed disabled:opacity-70"
                        type="submit"
                        disabled={isLoading}
                    >
                        {isLoading ? "Creating account..." : "Create account"}
                    </button>

                    <Link
                        className="w-full h-11 flex justify-center items-center bg-transparent border border-neutral-700 text-neutral-800 font-medium rounded-lg cursor-pointer"
                        to="/signin"
                    >
                        Already have an account? Sign in
                    </Link>
                </form>
            </div>
        </div>
    );
}

export default SignUp;
