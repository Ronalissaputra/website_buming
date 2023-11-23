import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { reqToken } from "../../features/refreshtoken/reqToken";
import { reqLogout } from "../../features/authentication/reqLogout";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import icon from "../../assets/icons/Buminglogo.png";
import {
  useDisclosure,
  Menu,
  MenuList,
  MenuItem,
  Button,
  MenuButton,
} from "@chakra-ui/react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";

const Header = () => {
  const initialFocusRef = React.useRef();
  const navigate = useNavigate();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const [navbar, setNavbar] = useState(false);
  const [nama, setNama] = useState("");
  const [idn, setIdn] = useState("");
  const [userrole, setUserrole] = useState("");
  const [drop, setDrop] = useState(false);
  useQuery({
    queryKey: ["reqToken"],
    queryFn: reqToken,
    onSuccess: (res) => {
      setNama(res.decoded.email);
      setIdn(res.decoded.userId);
      setUserrole(res.decoded.userrole);
    },
    onError: () => {
      navigate("/");
      toast({
        title: "Error",
        description: "session anda telah berakhir, silahkan login kembali",
        status: "error",
        position: "top",
        duration: 4000,
        isClosable: true,
      });
    },
  });

  const { mutate } = useMutation({
    mutationKey: ["reqLogout"],
    mutationFn: reqLogout,
    onSuccess: () => {
      navigate("/");
    },
    onError: (err) => {
      console.log(err);
    },
  });

  return (
    <nav className="sticky top-0 z-50 w-full bg-white shadow">
      <div className="mx-auto justify-between px-4 md:flex md:items-center md:px-8 lg:max-w-7xl">
        <div>
          <div className="flex items-center justify-between py-3 md:block md:py-5">
            <div className="flex items-center">
              <img src={icon} alt="icon" className="h-12" />
              <p className="text-2xl">Buming</p>
            </div>
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
            className={`mt-8 flex-1 justify-self-center pb-3 md:mt-0 md:block md:pb-0 ${
              navbar ? "block" : "hidden"
            }`}
          >
            <ul className="relative items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
              <li className="text-gray-600 hover:text-blue-600">
                <NavLink to="/dashboard">Dashboard</NavLink>
              </li>
              <Menu>
                <MenuButton
                  as={Button}
                  display="flex"
                  alignItems="center"
                  fontWeight="none"
                  variant="unstyled"
                  rightIcon={<ChevronDownIcon />}
                  _hover={{ color: "blue" }}
                >
                  Pemantauan
                </MenuButton>
                <MenuList>
                  <MenuItem>
                    <NavLink
                      to="/pemantauan/kehamilan"
                      className="h-full w-full"
                    >
                      Kehamilan
                    </NavLink>
                  </MenuItem>
                  <MenuItem>
                    <NavLink to="/pemantauan/nifas" className="h-full w-full">
                      Nifas
                    </NavLink>
                  </MenuItem>
                  <MenuItem>
                    <NavLink to="/pemantauan/anak" className="h-full w-full">
                      Anak
                    </NavLink>
                  </MenuItem>
                </MenuList>
              </Menu>
              <Menu>
                <MenuButton
                  as={Button}
                  display="flex"
                  alignItems="center"
                  fontWeight="none"
                  variant="unstyled"
                  rightIcon={<ChevronDownIcon />}
                  _hover={{ color: "blue" }}
                >
                  Tambah
                </MenuButton>
                <MenuList>
                  <MenuItem>
                    <NavLink to="/tambah/ibuhamil" className="h-full w-full">
                      Ibuhamil
                    </NavLink>
                  </MenuItem>
                  <MenuItem>
                    <NavLink to="/tambah/anak" className="h-full w-full">
                      Anak
                    </NavLink>
                  </MenuItem>
                  <MenuItem>
                    <NavLink to="/tambah/artikel" className="h-full w-full">
                      Artikel
                    </NavLink>
                  </MenuItem>
                </MenuList>
              </Menu>
              <>
                <Popover
                  initialFocusRef={initialFocusRef}
                  placement="bottom"
                  closeOnBlur={false}
                >
                  <PopoverTrigger>
                    <div className="hidden h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-indigo-400 md:flex">
                      <p className="text-xl font-light text-slate-100">
                        {nama && nama[0].toUpperCase()}
                      </p>
                    </div>
                  </PopoverTrigger>
                  <PopoverContent
                    color="white"
                    bg="blue.800"
                    borderColor="blue.800"
                  >
                    <PopoverHeader pt={4} fontWeight="bold" border="0">
                      Hi {nama}
                    </PopoverHeader>
                    <PopoverArrow bg="blue.800" />
                    <PopoverCloseButton />
                    <PopoverBody>
                      <Button w="full">Update profile</Button>
                    </PopoverBody>
                    <PopoverFooter border="0" pb={4}>
                      <Button
                        onClick={() => mutate()}
                        colorScheme="green"
                        w="full"
                      >
                        Logout
                      </Button>
                    </PopoverFooter>
                  </PopoverContent>
                </Popover>
              </>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
