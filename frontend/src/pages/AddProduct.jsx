import React, { useState } from "react";
import {
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Spinner,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { postProductActionFn } from "../redux/productReducer/productActions";
import { useNavigate } from "react-router-dom";
import { userLogoutActionFn } from "../redux/authReducer/authActions";

const initialData = {
  name: "",
  description: "",
  price: "",
  quantity: "",
  imgUrl: "",
};
const AddProduct = () => {
  const toast = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [productData, setProductData] = useState(initialData);

  // handle onChange
  const handleOnChange = (e) => {
    let { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  // handle add product
  const handleAddProductEvent = () => {
    const { name, description, imgUrl, price, quantity } = productData;
    if (!name || !description || !imgUrl || !price || !quantity) {
      return toast({
        title: "All details are required.",
        description: "There is some field missing please fill all fields.",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
    }
    dispatch(postProductActionFn(productData))
      .then((res) => {
        //  console.log(res, "rrrrrrrr");
        if (res.type === "ADD_PRODUCT_SUCCESS") {
          setProductData(initialData);
          return toast({
            title: "Product added successfully.",
            status: "success",
            position: "top",
            duration: 1000,
            isClosable: true,
          });
        } else {
          // dispatch(userLogoutActionFn());
          toast({
            title: `${res.payload.message}`,
            description: "Please Login again",
            status: "error",
            duration: 2000,
            isClosable: true,
            position: "top",
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
    // console.log("add: ", productData);
  };
  return (
    <Container mt={50} boxShadow={"xl"}>
      <Heading textAlign={"center"}>Add new product.</Heading>
      <br />
      <FormControl isRequired>
        <FormLabel>Name or Title</FormLabel>
        <Input
          placeholder="First name"
          onChange={handleOnChange}
          name="name"
          value={productData.name}
        />
        <br />
        <FormLabel>Description</FormLabel>
        <Textarea
          placeholder="First name"
          onChange={handleOnChange}
          name="description"
          value={productData.description}
        />
        <br />
        <Flex alignItems={"center"} justifyContent={"space-between"}>
          <FormControl flex={1}>
            <FormLabel>Price</FormLabel>
            <Input
              placeholder="Price"
              onChange={handleOnChange}
              name="price"
              value={productData.price}
            />
          </FormControl>
          <FormControl flex={1}>
            <FormLabel>Quantity</FormLabel>
            <Input
              placeholder="Quantity"
              onChange={handleOnChange}
              name="quantity"
              value={productData.quantity}
            />
          </FormControl>
        </Flex>

        <br />
        <FormLabel>Image URL</FormLabel>
        <Input
          placeholder="Image URL"
          onChange={handleOnChange}
          name="imgUrl"
          value={productData.imgUrl}
        />
      </FormControl>
      <Flex display={"flex"} alignItems={"center"} justifyContent={"flex-end"}>
        <Button
          my={5}
          right={0}
          colorScheme="blue"
          onClick={handleAddProductEvent}
        >
          ADD
        </Button>
      </Flex>
    </Container>
  );
};

export default AddProduct;
