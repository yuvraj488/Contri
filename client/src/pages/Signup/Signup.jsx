import { ArrowRight, Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

import Logo from "@/assets/logo.svg";
import PageWrapper from "@/components/layout/PageWrapper";
import { signup } from "@/services/authService";
import { useNavigate } from "react-router-dom";

export default function Signup() {
    const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!fullName.trim()) {
      newErrors.fullName = "Full name is required.";
    }

    if (!email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Enter a valid email.";
    }

    if (!password.trim()) {
      newErrors.password = "Password is required.";
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters.";
    }

    if (confirmPassword !== password) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const response = await signup({
        fullName,
        email,
        password,
      });

      localStorage.setItem("token", response.token);

      navigate("/");

    } catch (error) {
      console.error(
        error.response?.data?.message || error.message
      );
    }
  };

  return (
    <PageWrapper>
      <div className="flex min-h-[88vh] items-center justify-center bg-stone-50 p-2">

        <div className="w-full max-w-lg">

          <div className="mb-5 text-center">

            <img
              src={Logo}
              alt="Contri"
              className="mx-auto mb-8 h-30 w-auto"
            />

            <h1 className="font-manrope text-4xl font-semibold tracking-tight text-stone-900">
              Create Account
            </h1>

          </div>

          <form
            onSubmit={handleSubmit}
            className="rounded-3xl border border-neutral-200 bg-white p-8"
          >

            {/* Full Name */}

            <div className="mb-6">

              <label className="mb-2 block text-sm font-medium text-neutral-700">
                Full Name
              </label>

              <div className="flex h-12 items-center rounded-xl border border-neutral-200 px-4">

                <User
                  size={18}
                  className="mr-3 text-neutral-400"
                />

                <input
                  value={fullName}
                  onChange={(e)=>setFullName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full bg-transparent outline-none"
                />

              </div>

              {errors.fullName && (
                <p className="mt-2 text-sm text-red-500">
                  {errors.fullName}
                </p>
              )}

            </div>

            {/* Email */}

            <div className="mb-6">

              <label className="mb-2 block text-sm font-medium text-neutral-700">
                Email
              </label>

              <div className="flex h-12 items-center rounded-xl border border-neutral-200 px-4">

                <Mail
                  size={18}
                  className="mr-3 text-neutral-400"
                />

                <input
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)}
                  placeholder="john@example.com"
                  className="w-full bg-transparent outline-none"
                />

              </div>

              {errors.email && (
                <p className="mt-2 text-sm text-red-500">
                  {errors.email}
                </p>
              )}

            </div>

            {/* Password */}

            <div className="mb-6">

              <label className="mb-2 block text-sm font-medium text-neutral-700">
                Password
              </label>

              <div className="flex h-12 items-center rounded-xl border border-neutral-200 px-4">

                <Lock
                  size={18}
                  className="mr-3 text-neutral-400"
                />

                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e)=>setPassword(e.target.value)}
                  className="w-full bg-transparent outline-none"
                />

                <button
                  type="button"
                  onClick={()=>setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18}/> : <Eye size={18}/>}
                </button>

              </div>

              {errors.password && (
                <p className="mt-2 text-sm text-red-500">
                  {errors.password}
                </p>
              )}

            </div>

            {/* Confirm Password */}

            <div>

              <label className="mb-2 block text-sm font-medium text-neutral-700">
                Confirm Password
              </label>

              <div className="flex h-12 items-center rounded-xl border border-neutral-200 px-4">

                <Lock
                  size={18}
                  className="mr-3 text-neutral-400"
                />

                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e)=>setConfirmPassword(e.target.value)}
                  className="w-full bg-transparent outline-none"
                />

              </div>

              {errors.confirmPassword && (
                <p className="mt-2 text-sm text-red-500">
                  {errors.confirmPassword}
                </p>
              )}

            </div>

            <button
              type="submit"
              className="mt-8 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 text-white font-semibold"
            >
              Create Account
              <ArrowRight size={18}/>
            </button>

          </form>

          <p className="mt-8 text-center text-sm text-neutral-500">

            Already have an account?

            <Link
              to="/"
              className="ml-2 font-semibold text-emerald-600"
            >
              Sign In
            </Link>

          </p>

        </div>

      </div>
    </PageWrapper>
  );
}