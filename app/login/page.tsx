import { Mail, Lock, User } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="min-h-screen mt-4 flex items-center justify-center bg-[#f5f5ff] px-4 pt-[120px]">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-xl font-semibold text-center mb-6">Sign in to your Account</h2>

        <form className="space-y-4">

          <div className="flex items-center border border-gray-300 rounded px-3 py-2">
            <Mail className="h-5 w-5 text-gray-400 mr-2" />
            <input
              type="email"
              placeholder="Email"
              className="w-full outline-none"
            />
          </div>

          <div className="flex items-center border border-gray-300 rounded px-3 py-2">
            <Lock className="h-5 w-5 text-gray-400 mr-2" />
            <input
              type="password"
              placeholder="Password"
              className="w-full outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-amber-600 hover:bg-amber-900 text-white py-2 rounded-md font-semibold"
          >
            Login
          </button>
        </form>

        <p className="text-center text-sm mt-6">
          Don't yet have an Account{" "}
          <a href="/register" className="font-semibold underline">
            Register
          </a>
        </p>
      </div>
    </div>
  );
}