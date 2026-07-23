import AuthLayout from "../../layouts/AuthLayout/AuthLayout";
import { Button, Input } from "../../components/ui";

function Login() {
  return (
    <AuthLayout title="Welcome back!">

      <form className="space-y-6">

        <Input
          label="Email"
          type="email"
          placeholder="Enter your email"
        />

        <Input
          label="Password"
          type="password"
          placeholder="Enter your password"
        />

        <Button>
          Log In
        </Button>

      </form>

      <p className="mt-6 text-center text-sm text-gray-500">
        Don't have an account?{" "}
        <button
          type="button"
          className="font-semibold text-[var(--primary)] hover:underline"
        >
          Sign Up
        </button>
      </p>

    </AuthLayout>
  );
}

export default Login;