import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Flex,
  Circle,
  Box,
  Image,
  Badge,
  useColorModeValue,
  IconButton,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { FiShoppingCart } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import {
  getProductsActionFn,
  updateProductActionFn,
} from "../redux/productReducer/productActions";
import { useState } from "react";
import { userLogoutActionFn } from "../redux/authReducer/authActions";

function Card({ data, deleteProduct }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialData = {
    name: data.name,
    description: data.description,
    imgUrl: data.imgUrl,
    price: data.price,
    quantity: data.quantity,
  };
  const [productData, setProductData] = useState(initialData);
  const [updateId, setUpdateId] = useState(initialData);
  const dispatch = useDispatch();
  const { isAuth } = useSelector((state) => state.authReducer);

  const handleOnChange = (e) => {
    let { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleEdit = (id) => {
    setUpdateId(id);
    onOpen();
  };

  // update product.
  let query = {};
  const handleUpdateProduct = (id, data) => {
    dispatch(updateProductActionFn(id, data))
      .then((res) => {
        // console.log("update,res:", res);
        if (res.type === "UPDATE_PRODUCT_FAILURE") {
          // dispatch(userLogoutActionFn());
          onClose();

          toast({
            title: `${res.payload.response.data.message}`,
            description: "Please Login again",
            status: "error",
            duration: 4000,
            isClosable: true,
            position: "top",
          });
          // console.log("haaa");
        } else {
          query._page = searchParams.get("_page");
          dispatch(getProductsActionFn(query));
          onClose();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Flex bg={"green.200"}>
      <Box
        bg={useColorModeValue("white", "gray.800")}
        w="100%"
        borderWidth="1px"
        rounded="lg"
        shadow="lg"
        position="relative"
      >
        {
          <Circle
            size="10px"
            position="absolute"
            top={2}
            right={2}
            bg="red.200"
          />
        }
        <Link to={`/singleProduct/${data._id}`}>
          <Box h={"200px"} x={"100%"}>
            <Image
              w={"100%"}
              h={"100%"}
              objectFit={"cover"}
              src={data.imgUrl}
              alt={`Picture of ${data.name}`}
              roundedTop="lg"
            />
          </Box>
        </Link>

        <Box p="6">
          <Box d="flex" alignItems="baseline">
            {
              <Badge rounded="full" px="2" fontSize="0.8em" colorScheme="red">
                New
              </Badge>
            }
          </Box>
          <Box
            fontSize="xl"
            fontWeight="semibold"
            as="h4"
            lineHeight="tight"
            isTruncated
          >
            {data.name}
          </Box>

          <Flex justifyContent="space-between" alignContent="center">
            <Box fontSize="2xl" color={useColorModeValue("gray.800", "white")}>
              <Box as="span" color={"gray.600"} fontSize="xl">
                {"₹ "}
              </Box>
              {data.price.toFixed(2)}
            </Box>
          </Flex>
          {isAuth && (
            <Flex
              flexDir={"row"}
              justifyContent={"flex-end"}
              gap={"8px"}
              alignItems={"center"}
            >
              <>
                <IconButton
                  onClick={() => handleEdit(data._id)}
                  variant="outline"
                  colorScheme="green"
                  aria-label="Send email"
                  icon={<EditIcon />}
                />

                <Modal isOpen={isOpen} onClose={onClose}>
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader>Edit product details.</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                      <Container mt={10} boxShadow={"xl"}>
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
                          <Flex
                            alignItems={"center"}
                            justifyContent={"space-between"}
                          >
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
                      </Container>
                    </ModalBody>

                    <ModalFooter>
                      <Button colorScheme="red" mr={3} onClick={onClose}>
                        Close
                      </Button>
                      <Button
                        onClick={() =>
                          handleUpdateProduct(updateId, productData)
                        }
                        colorScheme="blue"
                      >
                        Update
                      </Button>
                    </ModalFooter>
                  </ModalContent>
                </Modal>
              </>

              <IconButton
                onClick={() => deleteProduct(data._id)}
                variant="outline"
                colorScheme="red"
                aria-label="Send email"
                icon={<DeleteIcon />}
              />
            </Flex>
          )}
        </Box>
      </Box>
    </Flex>
  );
}

export default Card;
