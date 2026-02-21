const LoginPage = () => {
  const handleLoginWithGitHub = () => {
    window.location.href = "/api/auth/github";
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="bg-glass p-8 rounded-lg flex flex-col items-center gap-4 max-w-sm w-full">
        <img src="/github.svg" alt="GitHub Logo" className="h-16" />
        <h1 className="text-2xl font-bold">Sign in to GitClone</h1>
        <button
          onClick={handleLoginWithGitHub}
          className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white font-medium py-2 px-6 rounded-lg transition-all duration-200 w-full justify-center"
        >
          Sign in with GitHub
        </button>
      </div>
    </div>
  );
};
export default LoginPage;
