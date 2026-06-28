import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

type LoginFormData = {
  email: string;
  password: string;
};

export default function LoginForm() {
  const { register, handleSubmit } = useForm<LoginFormData>();

  const onSubmit = (data: LoginFormData) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <label className="mb-2 block font-medium">Email</label>

        <input
          type="email"
          placeholder="Enter your email"
          {...register("email")}
          className="w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-500"
        />
      </div>

      <div>
        <label className="mb-2 block font-medium">Password</label>

        <input
          type="password"
          placeholder="Enter your password"
          {...register("password")}
          className="w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-500"
        />
      </div>

      <button
        type="submit"
        className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700"
      >
        Login
      </button>

      <p className="text-center text-sm">
        Don't have an account?{" "}
        <Link to="/signup" className="font-semibold text-blue-600">
          Sign Up
        </Link>
      </p>
    </form>
  );
}
