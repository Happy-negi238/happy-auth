const NotFound = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0a0a0a] px-4">
      <div className="text-center">
        <h1 className="text-8xl font-bold tracking-tight text-white">404</h1>

        <p className="mt-3 max-w-md text-sm text-neutral-400">
          The page you're looking for doesn't exist, has been moved, or the link
          you followed is invalid.
        </p>
      </div>
    </div>
  );
};

export default NotFound;
