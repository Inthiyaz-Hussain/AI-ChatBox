import AuthLayout from "../featuresq/auth/AuthLayout";
import LoginForm from "../featuresq/auth/LoginForm";

export default function Login() {
  return (
    <AuthLayout title="Welcome Back" subtitle="Sign in to continue">
      <LoginForm />
    </AuthLayout>
  );
}
