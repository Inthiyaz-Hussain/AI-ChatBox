import AuthLayout from "../featuresq/auth/AuthLayout";
import SignupForm from "../featuresq/auth/SignupForm";

export default function Signup() {
  return (
    <AuthLayout title="Create Account" subtitle="Sign up to get started">
      <SignupForm />
    </AuthLayout>
  );
}
