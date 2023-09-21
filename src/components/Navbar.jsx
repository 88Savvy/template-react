import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import papyrusLogo from "../images/papyrusLogo.png";

function Navbar() {
  const { isLoggedIn, role } = useContext(AuthContext);
  const navigate = useNavigate();

  function handleLogout(e) {
    e.preventDefault();
    localStorage.removeItem("userToken");
    localStorage.removeItem("userId");
    localStorage.removeItem("userRole");

    navigate("/login");
  }

  return (
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <Link to="/" className="flex">
            <div className="flex-shrink-0 flex items-center">
              <img
                className="h-10 w-auto"
                src={papyrusLogo}
                alt="Workflow"
              />
            </div>
          </Link>
          <div className="flex items-center">
            {isLoggedIn === false && (
              <>
                <Link
                  to="/#about" // Link to the About section in HomePage
                  className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                >
                  About
                </Link>
                <Link
                  to="/#features" // Link to the Features section in HomePage
                  className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Features
                </Link>
                <Link
                  to="/signup"
                  className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Sign up
                </Link>
                <Link
                  to="/login"
                  className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Log in
                </Link>
              </>
            )}

            {isLoggedIn === true && (
              <>
                <Link
                  to="/profile" // Link to the user's general starting page
                  className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Home
                </Link>
                <Link
                  to="/recommendations" // Link to recommendations page
                  className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Recommendations
                </Link>
                <Link
                  to="/profile-settings" // Link to user's profile settings page
                  className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Profile Settings
                </Link>
                <Link
                  to="/discovery" // Link to the Discover page
                  className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Discover
                </Link>

                <button
                  onClick={handleLogout}
                  className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

/* VERSÃO DA NAVBAR SEM AS CLASSES */
/* 
   <nav>
      <div>
         <Link to="/">
            <div>
               <img
                  src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                  alt="Workflow"
               />
               <span>Dev Suport</span>
            </div>
         </Link>
         <div>
            {isLoggedIn === false && (
               <>
                  <Link to="/signup">Sign up</Link>
                  <Link to="/login">Log in</Link>
               </>
            )}

            {isLoggedIn === true && (
               <>
                  <button onClick={handleLogout}>Logout</button>
                  <Link to="/profile">Profile</Link>
               </>
            )}
         </div>
      </div>
   </nav>
*/
