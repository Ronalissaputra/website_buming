import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import icon from "../../assets/icons/Buminglogo.png";
import gambar from "../../assets/images/ibuhamildananak.webp";
import { useQuery } from "@tanstack/react-query";
import { reqToken } from "../../features/refreshtoken/reqToken";
import { motion } from "framer-motion";

const Wellcome = () => {
  const [navbar, setNavbar] = useState(false);
  const navigate = useNavigate();
  useQuery({
    queryKey: ["reqToken"],
    queryFn: reqToken,
    onSuccess: () => {
      navigate("/dashboard");
    },
    onError: (err) => {
      console.log(err);
    },
  });

  return (
    <>
      <nav className="sticky top-0 z-50 w-full bg-white shadow">
        <div className="w-full justify-between px-4 md:flex md:items-center md:px-8">
          <div>
            <div className="flex w-full items-center justify-between py-3 md:py-5">
              <NavLink to="/" className="flex cursor-pointer items-center">
                <img src={icon} alt="icon" className="h-12" />
                <p className="text-xl md:text-3xl">Buming</p>
              </NavLink>
              <div className="md:hidden">
                <button
                  className="rounded-md p-2 text-gray-700 outline-none focus:border focus:border-gray-400"
                  onClick={() => setNavbar(!navbar)}
                >
                  {navbar ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
          <div>
            <div
              className={`mt-8 flex pb-3 md:mt-0 md:block md:pb-0 ${
                navbar ? "block" : "hidden"
              }`}
            >
              <ul className="relative items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
                <li className="rounded-md bg-blue-600 px-4 py-2 font-bold text-white hover:bg-blue-800">
                  <NavLink to="/masuk">Masuk</NavLink>
                </li>
                <li className="rounded-md border-2 border-blue-600 px-4 py-2 font-bold text-blue-600 hover:border-blue-800 hover:text-blue-800">
                  <NavLink to="/daftar">Daftar</NavLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
      <div className="min-h-screen w-full">
        <div className="relative">
          <img src={gambar} alt="ibuhamil" className="min-h-screen w-full" />
          <div className="absolute bottom-0 left-0 right-0 top-0 mx-5 flex items-center md:mx-10 ">
            <div className="space-y-2 md:space-y-8">
              <p className="text-3xl text-blue-700 md:text-[70px]">
                Sejak Dini Cegah Stunting
              </p>
              <p className="text-xl text-blue-700 md:text-4xl">
                Ibu Cerdas Anak Sehat
              </p>
            </div>
          </div>
        </div>
        <footer className="absolute bottom-0 flex h-14 w-full items-center justify-center bg-slate-100 px-2">
          <p className="absolute px-5">All Right Reserved &copy; 2023</p>
        </footer>
      </div>
    </>
  );
};

export default Wellcome;
