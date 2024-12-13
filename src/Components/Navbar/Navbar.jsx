// import   "./Navbar.module.css";
import "../Navbar/Navbar.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { userContext } from "../../Context/UserContext";
import Logo from "../../assets/images/logo.png";
import { cartContext } from "../../Context/CartContext";
import { wishContext } from "../../Context/WishlistContext";

export default function Navbar() {
  let { GetWishlist, counterWishlist } = useContext(wishContext);
  let { getCarts, CounterCart } = useContext(cartContext);

  const [list, setList] = useState(false);
  const { Token, setToken } = useContext(userContext);
  const [isScrolled, setIsScrolled] = useState(false);
  const [Theme, setTheme] = useState("light");
  let navigation = useNavigate();

  const openList = () => {
    setList(!list);
  };

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("userID");
    localStorage.removeItem("CounterWishlist");
    localStorage.removeItem("counterCart");
    setToken(null);
    localStorage.removeItem("idForUser");
    navigation("login");
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY !== 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (Token) {
      getCarts();
      GetWishlist();
    }
  }, [Token]);

  useEffect(() => {
    if (Theme == "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [Theme]);

  // const handelTheme = () => {
  //   setTheme(Theme === "dark" ? "light" : "dark");
  // };

  return (
    <>
      <nav
        className={`bg-gray-100 border-gray-200 fixed top-0 start-0 end-0 z-[999] transition-all duration-300 shadow-md " ${
          isScrolled ? "p-3" : "p-1"
        } lg:px-5 sm:p-0`}
      >
        <div className="flex justify-between items-center mx-auto p-2 lg:px-0">
          <NavLink
            to=""
            className="logo-img flex gap-1 items-center text-3xl text-green-700 font-bold"
          >
            <i className="fa-solid fa-seedling text-green-500 text-[20px]"></i>
            <h2 className="font-fontBody tracking-wide text-[20px]">SwiftMart</h2>
          </NavLink>

          {Token ? (
            <ul className="hidden md:flex gap-4 text-sm text-green-800 font-fontBody">
              <li>
                <NavLink
                  to=""
                  className="font-light hover:text-black transition-all duration-[0.3s]"
                  aria-current="page"
                >
                  Home
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="product"
                  className="  hover:text-black transition-all duration-[0.3s]"
                >
                  Products
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="category"
                  className="  hover:text-black transition-all duration-[0.3s]"
                >
                  Categories
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="brand"
                  className="  hover:text-black transition-all duration-[0.3s]"
                >
                  Brands
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="allorders"
                  className="  hover:text-black transition-all duration-[0.3s]"
                >
                  Orders History
                </NavLink>
              </li>
            </ul>
          ) : null}

          <div className="logs items-baseline gap-4 hidden lg:flex">
            <Link
              to={"https://www.instagram.com"}
              target="_blank"
              className="fa-brands fa-instagram cursor-pointer hover:text-red-600 transition-colors duration-[0.3s]"
            ></Link>

            <Link
              to={"https://www.facebook.com"}
              target="_blank"
              className="fa-brands fa-facebook cursor-pointer hover:text-blue-600 transition-colors duration-[0.3s]"
            ></Link>

            <Link
              to={"https://www.tiktok.com"}
              target="_blank"
              className="fa-brands fa-tiktok cursor-pointer hover:text-black transition-colors duration-[0.3s]"
            ></Link>

            <Link
              to={"https://www.twitter.com"}
              target="_blank"
              className="fa-brands fa-twitter cursor-pointer hover:text-blue-400 transition-colors duration-[0.3s]"
            ></Link>

            <Link
              to={"https://www.linkedin.com"}
              target="_blank"
              className="fa-brands fa-linkedin cursor-pointer hover:text-blue-700 transition-colors duration-[0.3s]"
            ></Link>

            <Link
              to={"https://www.youtube.com"}
              target="_blank"
              className="fa-brands fa-youtube cursor-pointer hover:text-red-600 transition-colors duration-[0.3s]"
            ></Link>
          </div>

          <div className="system flex items-baseline">
            {Token ? (
              <div className="flex gap-6">
                {/* Wishlist Section */}
                <div className="relative flex items-center text-gray-700 hover:text-green-800 transition-all duration-300">
                  <p className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full px-2 py-0.5 shadow-md">
                    {counterWishlist}
                  </p>
                  <Link
                    to="wishlist"
                    className="flex items-center gap-2 text-sm font-medium"
                  >
                    <div className="p-2  hidden lg:block bg-gray-100 hover:bg-green-100 rounded-full shadow transition-transform duration-300 hover:scale-110">
                      <i className="fa-solid fa-heart text-red-500 "></i>
                    </div>
                    <span className="ps-2">Wishlist</span>
                  </Link>
                </div>

                {/* Cart Section */}
                <div className="relative flex items-center text-gray-700 hover:text-green-800 transition-all duration-300">
                  <p className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full px-2 py-0.5 shadow-md">
                    {CounterCart}
                  </p>
                  <Link
                    to="cart"
                    className="flex items-center gap-2 text-sm font-medium"
                  >
                    <div className="p-2  hidden lg:block bg-gray-100 hover:bg-green-100 rounded-full shadow transition-transform duration-300 hover:scale-110">
                      <i className="fa-solid fa-cart-shopping text-green-500"></i>
                    </div>
                    <span>Cart</span>
                  </Link>
                </div>
              </div>
            ) : null}

            {/* DarkMode
            <div className="relative bg-white dark:bg-black text-gray-500 dark:text-white">
              <button className="absolute" onClick={handelTheme}>
                <i class="fa-brands fa-affiliatetheme"></i>
              </button>
            </div> */}

            {Token ? (
              <div
                onClick={logout}
                className="text-sm group cursor-pointer text-gray-500 ms-4 flex items-baseline gap-1 me-1"
              >
                <span className="hover:text-black transition-all duration-[0.3s]">
                  LogOut
                </span>
                <i className="fa-solid fa-arrow-right-from-bracket group-hover:text-green-700 transition-all duration-[0.3s]"></i>
              </div>
            ) : (
              <div className="flex items-baseline gap-5">
                <NavLink
                  to="login"
                  className="text-sm ms-3 text-gray-500 hover:text-black transition-all duration-[0.3s]"
                >
                  Login
                </NavLink>
                <NavLink
                  to="register"
                  className="text-sm  text-gray-500  hover:text-black transition-all duration-[0.3s]"
                >
                  Register
                </NavLink>
              </div>
            )}
          </div>

          {Token ? (
            <div className="block md:hidden icon border border-1 border-gray-800 p-2 rounded-md cursor-pointer">
              <i
                onClick={openList}
                className="fa-solid fa-bars text-2xl align-middle text-gray-600"
              ></i>
            </div>
          ) : null}
        </div>

        {/* start list */}
        {Token ? (
          <>
            {" "}
            {list && (
              <ul className="text-gray-600  flex-col px-6 gap-4 text-sm py-3 flex md:hidden">
                <li>
                  <NavLink
                    to=""
                    className=" hover:text-black transition-all duration-[0.3s]"
                    aria-current="page"
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="cart"
                    className=" hover:text-black transition-all duration-[0.3s]"
                  >
                    Cart
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="product"
                    className="  hover:text-black transition-all duration-[0.3s]"
                  >
                    Products
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="category"
                    className=" hover:text-black transition-all duration-[0.3s]"
                  >
                    Categories
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="brand"
                    className=" hover:text-black transition-all duration-[0.3s]"
                  >
                    Brands
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="allorders"
                    className="  hover:text-black transition-all duration-[0.3s]"
                  >
                    Orders History
                  </NavLink>
                </li>
              </ul>
            )}
          </>
        ) : null}
        {/* end list */}
      </nav>
    </>
  );
}
