import { Link } from "react-router-dom";

const SignUpPage = () => {
  const handleSignUpWithGitHub = () => {
    window.location.href = "/api/auth/github";
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="bg-glass p-8 rounded-lg flex flex-col items-center gap-4 max-w-sm w-full">
        <img src="/github.svg" alt="GitHub Logo" className="h-16" />
        <h1 className="text-2xl font-bold">Join GitClone</h1>
        <button
          onClick={handleSignUpWithGitHub}
          className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white font-medium py-2 px-6 rounded-lg transition-all duration-200 w-full justify-center"
        >
          Sign up with GitHub
        </button>
        <p className="text-sm text-gray-400">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-400 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};
export default SignUpPage;
