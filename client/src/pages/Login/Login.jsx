import { ArrowRight, Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useState } from "react";
import { login } from "@/services/authService";
import Logo from "@/assets/logo.svg";
import PageWrapper from "@/components/layout/PageWrapper";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import LoadingButton from "@/components/ui/LoadingButton";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const { login: loginUser } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
const navigate = useNavigate();
    const validateForm = () => {
        const newErrors = {};

        if (!email.trim()) {
            newErrors.email = "Email is required.";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = "Enter a valid email address.";
        }

        if (!password.trim()) {
            newErrors.password = "Password is required.";
        } else if (password.length < 8) {
            newErrors.password = "Password must be at least 8 characters.";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

   const handleSubmit = async (e) => {
  e.preventDefault();

  if (!validateForm()) return;

  setLoading(true);

  try {
    const response = await login(email, password);

    localStorage.setItem("token", response.token);

    loginUser(response.user);

    navigate("/dashboard");

    // Later we'll replace this with:
    // navigate("/dashboard");

  } catch (error) {
    console.error(
      error.response?.data?.message || error.message
    );
  } finally {
    setLoading(false);
  }
};

    return (
        <PageWrapper>
            <div className="flex min-h-[88vh] items-center justify-center bg-stone-50 p-2">

                <div className="w-full max-w-lg">

                    {/* Logo */}

                    <div className="mb-5 text-center">

                        <img
                            src={Logo}
                            alt="Contri"
                            className="mx-auto mb-8 h-30 w-auto"
                        />

                        <h1 className="font-manrope text-4xl font-semibold tracking-tight text-stone-900">
                            Welcome Back
                        </h1>

                    </div>

                    {/* Card */}

                    <form
                        onSubmit={handleSubmit}
                        className="rounded-3xl border border-neutral-200 bg-white p-8"
                    >

                        {/* Email */}

                        <div className="mb-6">

                            <label className="mb-2 block text-sm font-medium text-neutral-700">
                                Email
                            </label>

                            <div className="flex h-12 items-center rounded-xl border border-neutral-200 px-4 transition-all focus-within:border-emerald-600">

                                <Mail
                                    size={18}
                                    className="mr-3 text-neutral-400"
                                />

                                <input
                                    type="email"
                                    placeholder="john@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-transparent text-sm outline-none placeholder:text-neutral-400"
                                />

                            </div>

                            {errors.email && (
                                <p className="mt-2 text-sm text-red-500">
                                    {errors.email}
                                </p>
                            )}

                        </div>

                        {/* Password */}

                        <div>

                            <label className="mb-2 block text-sm font-medium text-neutral-700">
                                Password
                            </label>

                            <div className="flex h-12 items-center rounded-xl border border-neutral-200 px-4 transition-all focus-within:border-emerald-600">

                                <Lock
                                    size={18}
                                    className="mr-3 text-neutral-400"
                                />

                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-transparent text-sm outline-none placeholder:text-neutral-400"
                                />

                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? (
                                        <EyeOff
                                            size={18}
                                            className="text-neutral-400"
                                        />
                                    ) : (
                                        <Eye
                                            size={18}
                                            className="text-neutral-400"
                                        />
                                    )}
                                </button>

                            </div>

                            {errors.password && (
                                <p className="mt-2 text-sm text-red-500">
                                    {errors.password}
                                </p>
                            )}

                            <div className="mt-3 flex justify-end">

                                <button
                                    type="button"
                                    className="text-sm font-medium text-emerald-600 hover:text-emerald-700"
                                >
                                    Forgot Password?
                                </button>

                            </div>

                        </div>

                        {/* Login Button */}

                        <LoadingButton
    type="submit"
    loading={loading}
    text="Sign In"
    loadingText="Signing In..."
    className="mt-8"
/>

                    </form>

                    {/* Footer */}

                    <p className="mt-8 text-center text-sm text-neutral-500">

                        Don't have an account?

                        <Link
  to="/signup"
  className="ml-2 font-semibold text-emerald-600 hover:text-emerald-700"
>
  Create one
</Link>

                    </p>

                </div>

            </div>
        </PageWrapper>
    );
}