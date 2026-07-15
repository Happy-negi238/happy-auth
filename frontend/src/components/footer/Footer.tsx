import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-zinc-800 bg-black">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <p className="text-sm text-zinc-500">
          © {new Date().getFullYear()} Happy. Built with OpenID Connect.
        </p>

        <div className="flex items-center gap-6 text-sm text-zinc-500">
          <Link
            to="/docs"
            className="transition-colors hover:text-white"
          >
            Docs
          </Link>

          <Link
            to="/create-app"
            className="transition-colors hover:text-white"
          >
            Create App
          </Link>

          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-white"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
