import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getProductsActionFn,
  deleteProductActionFn,
} from "../redux/productReducer/productActions";
import Card from "../components/Card";
import {
  Box,
  Button,
  Flex,
  Radio,
  RadioGroup,
  SimpleGrid,
  Spacer,
  Stack,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import Loading from "../components/Loading";
import { userLogoutActionFn } from "../redux/authReducer/authActions";

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const toast = useToast();
  const location = useLocation();
  const dispatch = useDispatch();

  const [sort, setSort] = useState(searchParams.get("_sort") || "");
  const [page, setPage] = useState(searchParams.get("_page") || 1);
  const product = useSelector((state) => state.productReducer);
  const { isAuth } = useSelector((state) => state.authReducer);
  const { isLoading, isError, data } = product;
  let params = {};
  // handle pagination function
  const handlePagination = (val) => {
    setPage((pre) => Number(pre) + Number(val));
  };

  // set searchParams;
  useEffect(() => {
    if (page) {
      page && (params._page = page);
      setSearchParams(params);
    }
  }, [page]);

  // get products
  let query = {};
  useEffect(() => {
    if (location.search) {
      query._page = searchParams.get("_page");
      sort && (query._sort = sort);
      dispatch(getProductsActionFn(query));
    }
  }, [location.search, sort]);

  // delete product;
  const deleteProduct = (id) => {
    if (!id) return;
    dispatch(deleteProductActionFn(id))
      .then((res) => {
        if (res.type === "DELETE_PRODUCT_SUCCESS") {
          query._page = searchParams.get("_page");
          sort && (query._sort = sort);
          dispatch(getProductsActionFn(query));
        } else {
          dispatch(userLogoutActionFn);
          return toast({
            title: `${res.payload.response.data.message}`,
            description: "Please login again",
            status: "error",
            duration: 4000,
            isClosable: true,
            position: "top",
          });
        }
        //console.log(res, "quer: ", query);
      })
      .catch((err) => {
        //setErr(true)
      });
  };

  return (
    <Box
      w={"100%"}
      boxSizing={"border-box"}
      mt={"20px"}
      px={["3%", "5%", "8%"]}
    >
      <Flex>
        <VStack>
          <Text fontWeight={"bold"}>Sort by name</Text>
          <RadioGroup onChange={(value) => setSort(value)} value={sort}>
            <Stack>
              <Radio value="asc">Ascending</Radio>
              <Radio value="desc">Descending</Radio>
            </Stack>
          </RadioGroup>
        </VStack>
        <Spacer />
        {isAuth && (
          <Link to="/add">
            <Button colorScheme="blue" rightIcon={<AddIcon />}>
              Add new Product
            </Button>
          </Link>
        )}
      </Flex>
      <br />
      <br />
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
        <>
          <SimpleGrid columns={[1, 2, 2, 4]} rowGap={"10"} columnGap={"5"}>
            {data.products !== undefined &&
              data?.products.map((item, idx) => (
                <Card key={idx} data={item} deleteProduct={deleteProduct} />
              ))}
          </SimpleGrid>
          <Flex
            w={["90%", "70%", "60%", "30%"]}
            m={"auto"}
            my={"10"}
            dir={"row"}
            gap={"5"}
            alignItems={"center"}
            justify={"center"}
          >
            <Button
              colorScheme={"blue"}
              isDisabled={page <= 1}
              onClick={() => handlePagination(-1)}
            >
              Prev
            </Button>
            <Text fontWeight={"bold"}>{page}</Text>
            <Button
              colorScheme={"blue"}
              isDisabled={product.data.totalPages === page}
              onClick={() => handlePagination(1)}
            >
              Next
            </Button>
          </Flex>
        </>
      )}
    </Box>
  );
};

export default Products;
