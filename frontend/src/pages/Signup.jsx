import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  useColorModeValue,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { userSignupActionFn } from "../redux/authReducer/authActions";

const signupData = {
  name: "",
  email: "",
  password: "",
};

export default function Signup() {
  const [userData, setUserData] = useState(signupData);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  const handleOnChange = (e) => {
    let { value, name } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSignup = (e) => {
    e.preventDefault();
    const { name, email, password } = userData;
    if (!name || !email || !password) {
      return toast({
        title: "Signup Status.",
        description: "All fields are required for signup.",
        status: "error",
        duration: 2000,
        position: "top",
        isClosable: true,
      });
    }
    let isCorrectEmail = validateEmail(email);
    if (!isCorrectEmail) {
      return toast({
        title: "Signup  Status.",
        description: "Please write valid email type.",
        status: "error",
        duration: 2000,
        position: "top",
        isClosable: true,
      });
    }
    console.log("signup Data2: ", userData);

    dispatch(userSignupActionFn(userData))
      .then((res) => {
        console.log("res; res", res);
        if (res.type === "USER_SIGNUP_SUCCESS") {
          toast({
            title: "Signup Status.",
            description: "Your account created successfully.",
            status: "success",
            duration: 20000,
            position: "top",
            isClosable: true,
          });
          navigate("/login");
        } else {
          toast({
            title: "Signup Status.",
            description: `${res.payload}`,
            status: "error",
            duration: 2000,
            position: "top",
            isClosable: true,
          });
        }
        console.log("Signupres: ", res);
      })
      .catch((err) => {
        return toast({
          title: "Signup Status.",
          description: "Something went wrong please try again.",
          status: "error",
          duration: 2000,
          position: "top",
          isClosable: true,
        });
      });
  };
  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"xl"}>Create your account</Heading>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="name">
              <FormLabel>Full name</FormLabel>
              <Input
                placeholder={"Name"}
                type="text"
                name="name"
                onChange={handleOnChange}
                value={userData.name}
              />
            </FormControl>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input
                placeholder={"Email"}
                type="email"
                name="email"
                onChange={handleOnChange}
                value={userData.email}
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input
                placeholder={"password"}
                type="password"
                name="password"
                onChange={handleOnChange}
                value={userData.password}
              />
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
              ></Stack>
              <Button
                onClick={handleSignup}
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
              >
                Sign in
              </Button>
            </Stack>
            <Text>
              All ready have an accound <Link to="/login">Login</Link>{" "}
            </Text>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}

function validateEmail(input) {
  var validRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  if (input.match(validRegex)) {
    return true;
  } else {
    return false;
  }
}
