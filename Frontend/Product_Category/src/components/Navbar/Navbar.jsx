// import React, { useEffect, useState } from "react";
// import { isAuthenticated as checkAuth } from "../../utils/isAuthenticated";
// import { useDispatch } from "react-redux";
// import { logout } from "../../services/authSlice"; // adjust path
// import { useNavigate, Link } from "react-router-dom";
// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleSignOut = async () => {
//     await dispatch(logout());
//     const result = await checkAuth();
//     setIsAuthenticated(!!result); // <- reset local state
//     navigate("/");
//   };

//   useEffect(() => {
//     const checkAuthentication = async () => {
//       const result = await checkAuth();
//       setIsAuthenticated(!!result);
//     };
//     checkAuthentication();
//   }, []);
//   return (
//     <nav className="bg-white shadow-md sticky top-0 z-50">
//       <div className="mx-auto px-3 sm:px-6 lg:px-3">
//         <div className="flex justify-between h-16">
//           {/* Left side */}
//           <div className="flex items-center space-x-8">
//             <Link to="/" className="text-xl font-bold text-gray-900">
//               eCatlog
//             </Link>
//             <div className="hidden md:flex space-x-6">
//               <Link
//                 to="/"
//                 className="text-gray-700 hover:text-gray-900 font-medium"
//               >
//                 Home
//               </Link>
//               <Link
//                 to="/catalog"
//                 className="text-gray-700 hover:text-gray-900 font-medium"
//               >
//                 Catalog
//               </Link>
//             </div>
//           </div>

//           {/* Right side */}

//           {!isAuthenticated ? (
//             <div className="hidden md:flex items-center space-x-4">
//               <button
//                 onClick={() => navigate("/register")}
//                 className="px-4 py-2 border border-gray-800 rounded text-gray-800 font-medium hover:bg-gray-100"
//               >
//                 Sign Up
//               </button>
//               <button
//                 onClick={() => navigate("/login")}
//                 className="px-4 py-2 bg-gray-800 rounded text-white font-medium hover:bg-gray-700"
//               >
//                 Sign In
//               </button>
//             </div>
//           ) : (
//             <button onClick={handleSignOut} className="cursor-pointer ">
//               Sign Out
//             </button>
//           )}

//           {/* Mobile menu button */}
//           <div className="flex items-center md:hidden">
//             <button
//               onClick={() => setIsOpen(!isOpen)}
//               type="button"
//               className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-300"
//               aria-controls="mobile-menu"
//               aria-expanded={isOpen}
//             >
//               <span className="sr-only">Open main menu</span>
//               {/* Hamburger icon */}
//               {!isOpen ? (
//                 <svg
//                   className="block h-6 w-6"
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                   aria-hidden="true"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M4 6h16M4 12h16M4 18h16"
//                   />
//                 </svg>
//               ) : (
//                 // Close icon
//                 <svg
//                   className="block h-6 w-6"
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                   aria-hidden="true"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M6 18L18 6M6 6l12 12"
//                   />
//                 </svg>
//               )}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Mobile menu */}
//       {isOpen && (
//         <div className="md:hidden" id="mobile-menu">
//           <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-200">
//             <a
//               href="/"
//               className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
//             >
//               Home
//             </a>
//             <a
//               href="/catalog"
//               className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
//             >
//               Catlog
//             </a>

//             {!isAuthenticated ? (
//               <>
//                 <a
//                   href="/signup"
//                   className="block px-3 py-2 mt-2 rounded-md text-base font-medium border border-gray-800 text-gray-800 hover:bg-gray-100"
//                 >
//                   Sign Up
//                 </a>
//                 <a
//                   href="/signin"
//                   className="block px-3 py-2 mt-1 rounded-md text-base font-medium bg-gray-800 text-white hover:bg-gray-700"
//                 >
//                   Sign In
//                 </a>
//               </>
//             ) : (
//               <button
//                 onClick={handleSignOut}
//                 className="block w-full text-left px-3 py-2 mt-1 rounded-md text-base font-medium bg-gray-800 text-white hover:bg-gray-100"
//               >
//                 Sign Out
//               </button>
//             )}
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;

import React, { useEffect, useState } from "react";
import { isAuthenticated as checkAuth } from "../../utils/isAuthenticated";
import { useDispatch } from "react-redux";
import { logout } from "../../services/authSlice"; // adjust path
import { useNavigate, Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await dispatch(logout());
    const result = await checkAuth();
    setIsAuthenticated(!!result); // reset local state
    navigate("/");
  };

  useEffect(() => {
    const checkAuthentication = async () => {
      const result = await checkAuth();
      setIsAuthenticated(!!result);
    };
    checkAuthentication();
  }, []);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="mx-auto px-3 sm:px-6 lg:px-3">
        <div className="flex justify-between h-16">
          {/* Left side */}
          <div className="flex items-center space-x-8">
            <Link to="/" className="text-2xl font-bold text-blue-600">
              eCatlog
            </Link>
            <div className="hidden md:flex space-x-6">
              <Link
                to="/"
                className="text-gray-700 hover:text-blue-600 font-medium transition"
              >
                Home
              </Link>
              <Link
                to="/catalog"
                className="text-gray-700 hover:text-blue-600 font-medium transition"
              >
                Catalog
              </Link>
            </div>
          </div>

          {/* Right side */}
          {!isAuthenticated ? (
            <div className="hidden md:flex items-center space-x-4">
              <button
                onClick={() => navigate("/register")}
                className="px-4 py-2 border border-blue-600 rounded text-blue-600 font-medium hover:bg-blue-50 transition"
              >
                Sign Up
              </button>
              <button
                onClick={() => navigate("/login")}
                className="px-4 py-2 bg-blue-600 rounded text-white font-medium hover:bg-blue-700 transition"
              >
                Sign In
              </button>
            </div>
          ) : (
            <button
              onClick={handleSignOut}
              className="px-4 py-2 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 transition"
            >
              Sign Out
            </button>
          )}

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-300"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-200">
            <Link
              to="/"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition"
            >
              Home
            </Link>
            <Link
              to="/catalog"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition"
            >
              Catalog
            </Link>

            {!isAuthenticated ? (
              <>
                <Link
                  to="/register"
                  className="block px-3 py-2 mt-2 rounded-md text-base font-medium border border-blue-600 text-blue-600 hover:bg-blue-50 transition"
                >
                  Sign Up
                </Link>
                <Link
                  to="/login"
                  className="block px-3 py-2 mt-1 rounded-md text-base font-medium bg-blue-600 text-white hover:bg-blue-700 transition"
                >
                  Sign In
                </Link>
              </>
            ) : (
              <button
                onClick={handleSignOut}
                className="block w-full text-left px-3 py-2 mt-1 rounded-md text-base font-medium bg-blue-600 text-white hover:bg-blue-700 transition"
              >
                Sign Out
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
