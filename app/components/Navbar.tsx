import {Link} from "react-router";

const Navbar = () => {
  return (
    <nav className="navbar">
        <Link to="/">
            <p className="text-2xl font-bold text-gradient">HIREBOOST</p>
        </Link>
        <div className="flex gap-3">
            <Link to="/upload" className="primary-button w-fit">
                Upload Resume
            </Link>
            <Link to="/builder" className="secondary-button w-fit">
                Build Resume
            </Link>
        </div>
    </nav>
  );
};

export default Navbar;
