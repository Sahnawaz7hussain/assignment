import {
  Box,
  Flex,
  Input,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
  Text,
  Button,
  Image,
  useColorModeValue,
  IconButton,
  useColorMode,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { userLogoutActionFn } from "../redux/authReducer/authActions";
import axios from "axios";
import { EmailIcon } from "@chakra-ui/icons";

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isAuth } = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();
  const [input, setInput] = useState("");
  const [data, setData] = useState([]);
  //console.log("user: ", user);
  useEffect(() => {
    if (input) {
      const getData = setTimeout(() => {
        axios
          .get(`${import.meta.env.VITE_BASE_URL}/product/search?q=${input}`)
          .then((response) => {
            setData(response.data.products);
            // console.log("navar deboune", response);
          });
      }, 2000);

      return () => clearTimeout(getData);
    } else {
      setData([]);
    }
  }, [input]);
  console.log("datanav: ", data);
  // handleLogout;
  const hanldeLogout = () => {
    dispatch(userLogoutActionFn());
  };
  return (
    <>
      <Flex
        alignItems={"center"}
        h={"70px"}
        w={"100%"}
        px={["2%", "5%", "8%"]}
        bg={useColorModeValue("gray.300", "#161B25")}
        justifyContent={"space-between"}
        pos={"sticky"}
        top={"0"}
        zIndex={"3"}
      >
        <Link to="/">
          <Text fontWeight={"bold"} color={"blue"}>
            Brainerhub
          </Text>
        </Link>
        <Box w={["80%", "60%", "40%"]}>
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Search here"
          />
        </Box>
        <Menu>
          <MenuButton
            as={Button}
            colorScheme="blue"
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            Profile
          </MenuButton>
          <MenuList>
            <MenuGroup title="Profile">
              <MenuItem>My Account</MenuItem>
              <MenuItem>Payments </MenuItem>
            </MenuGroup>
            <MenuDivider />
            <MenuGroup title="Help">
              <MenuItem>Docs</MenuItem>
              <MenuItem>FAQ</MenuItem>
            </MenuGroup>
            <MenuDivider />
            <MenuItem onClick={toggleColorMode}>
              {colorMode === "light" ? "Dark " : "Light "}mode
            </MenuItem>
            <MenuDivider />
            <MenuGroup title="Account">
              {!isAuth ? (
                <>
                  <MenuItem>
                    <Link to="/login">Login</Link>
                  </MenuItem>
                  <MenuItem>
                    <Link to="/signup">Signup</Link>
                  </MenuItem>
                </>
              ) : (
                <Button onClick={hanldeLogout} colorScheme="red" ml={"7px"}>
                  Logout
                </Button>
              )}
            </MenuGroup>
          </MenuList>
        </Menu>
      </Flex>
      {data.length > 0 && (
        <Box
          h={"auto"}
          w={["80%", "60%", "40%"]}
          m={"auto"}
          pos={"absolute"}
          bg={useColorModeValue("gray.300", "#161B25")}
          left={0}
          right={0}
          zIndex={2}
          maxH={"500px"}
          overflowY={"scroll"}
          rounded={"5px"}
          boxSizing="border-box"
          px={"4px"}
        >
          {data.length > 0 &&
            data.map((item, idx) => (
              <Box key={idx}>
                <Link to={`/singleProduct/${item._id}`}>
                  <Flex
                    h={`${200 * item.length}px`}
                    alignItems={"center"}
                    gap={"8px"}
                  >
                    <Box h={"50px"} w={"50px"}>
                      <Image
                        h={"100%"}
                        w={"100%"}
                        objectFit={"contain"}
                        src={item.imgUrl}
                      />
                    </Box>
                    <Text fontSize={"18px"}>{item.name}</Text>
                  </Flex>
                </Link>
              </Box>
            ))}
        </Box>
      )}
    </>
  );
};

export default Navbar;
