import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Center,
  Heading,
  Text,
  Stack,
  useColorModeValue,
  Image,
  Flex,
  Spacer,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { getProductByIdActionFn } from "../redux/productReducer/productActions";
import Loading from "../components/Loading";

const SingleProduct = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { isLoading, isError, data } = useSelector(
    (state) => state.productReducer
  );

  useEffect(() => {
    dispatch(getProductByIdActionFn(id));
  }, [dispatch, id]);
  return (
    <>
      {isError && (
        <Box as="span" color="red">
          Some thing went wrong
        </Box>
      )}
      {isLoading ? (
        <Box
          w={"70%"}
          h={"500px"}
          m={"auto"}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Loading />
        </Box>
      ) : (
        <Box mt={50} px={["4%", "7%", "7%", "12%"]} boxSizing={"border-box"}>
          <Box
            w={"100%"}
            boxShadow={"xl"}
            p={3}
            display={"flex"}
            flexDir={["column", "column", "row"]}
            gap={"10"}
            justifyContent={"center"}
            rounded={"7px"}
          >
            <Box flex={"1"} w={"100%"} m={"auto"}>
              <Image maxH={"350px"} src={data.imgUrl} />
            </Box>
            <Stack flex={"1"}>
              <Flex mt={5} minW={"120px"} maxW={"200px"}>
                <Text fontWeight={600} fontSize={"md"} letterSpacing={1.1}>
                  {"₹ "}
                  {data.price}
                </Text>
                <Spacer />
                <Text fontWeight={400} fontSize={"sm"} letterSpacing={1.1}>
                  {"QTY: "} {data.quantity}
                </Text>
              </Flex>
              <Heading
                color={useColorModeValue("gray.700", "white")}
                fontSize={"2xl"}
                fontFamily={"body"}
              >
                {data.name}
              </Heading>
              <Text color={"gray.500"}>{data.description}</Text>
            </Stack>
          </Box>
        </Box>
      )}
      ;
    </>
  );
};

export default SingleProduct;
