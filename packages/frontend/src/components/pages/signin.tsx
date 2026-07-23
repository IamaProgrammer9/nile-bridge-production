import LogoBlack from "../../assets/logo.png";
import { useState } from "react";
import { signin } from "../../api/auth.ts";
import {Link} from "react-router";
import { useAuth } from "../contexts/auth-context.tsx";
import { useNavigate } from "react-router";

export function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { checkAuth } = useAuth();
    const navigate = useNavigate();
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setError('');
        setIsLoading(true);

        const response: any = await signin(email, password);
        setIsLoading(false);

        if (response.success) {
            navigate('/');
        } else {
            setError(response.response.data);
        }
        checkAuth();
    };

    return (
        <div className="h-full flex justify-center items-center">
            <div
            className="w-105 h-114 grid grid-rows-[40px_65px_1fr] shadow-none duration-300 p-6 bg-white rounded-2xl hover:shadow-lg">
                <div className="flex justify-center items-center">
                    <img className="h-10" alt="Logo" src={LogoBlack}></img>
                </div>
                <div className="flex justify-center items-center">
                    <span className="text-4xl font-bold">
                        Sign in
                    </span>
                </div>

                {error && (
                    <div className="w-full text-sm text-red-600 font-medium">
                        {error}
                    </div>
                )}

                <form className="w-full h-full flex flex-col items-center gap-5" onSubmit={handleSubmit}>
                    <div className="w-full flex items-center">
                        <div className="grow border-t border-gray-600"></div>
                        <span className="mx-4 shrink text-gray-800 text-lg font-medium">Your info</span>
                        <div className="grow border-t border-gray-600"></div>
                    </div>
                    <input
                    className="w-full h-11 rounded-lg outline-none border border-gray-600 py-2 px-3 focus:border-2"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"/>
                    <input
                    className="w-full h-11 rounded-lg outline-none border border-gray-600 py-2 px-3 focus:border-2"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"/>
                    <button
                    className="w-full h-11 flex justify-center items-center bg-orange-500 text-white font-semibold rounded-lg cursor-pointer"
                    type="submit" disabled={isLoading}>
                        {isLoading ? 'Signing in...' : 'Sign in'}
                    </button>
                    <Link
                    className="w-full h-11 flex justify-center items-center bg-transparent border border-neutral-700 text-neutral-800 font-medium rounded-lg cursor-pointer"
                    to="/signup">
                    Create account
                    </Link>
                </form>
            </div>
        </div>
    );
}

export default SignIn;