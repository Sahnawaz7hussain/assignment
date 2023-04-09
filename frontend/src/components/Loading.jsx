import { Image } from "@chakra-ui/react";
import React from "react";
import gif from "../assets/loading.gif";
const Loading = () => {
  return (
    <>
      <Image src={gif} />
    </>
  );
};

export default Loading;
