import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Heading,
  Spinner,
  Text,
  Input,
} from "@chakra-ui/react";
import { useUserBlogQuery } from "../../../store/services/blog";
import { useParams } from "react-router-dom";
import Blog from "../../../components/Blog";
import { toast } from "react-hot-toast";

const Content = () => {
  const { id } = useParams();
  const [search, setSearch] = useState("");
  const [blog, setBlog] = useState([]);
  const { data, isError, isLoading } = useUserBlogQuery(id);

  //error message
  useEffect(() => {
    isError && toast.error("something went wrong");
  }, [isError]);

  //search blog item
  useEffect(() => {
    const filterBlog = data?.filter((item) =>
      item.title.toLowerCase().trim().includes(search.toLowerCase())
    );
    setBlog(filterBlog);
  }, [data, blog]);

  //loding
  if (isLoading)
    return (
      <Box
        display="flex"
        gap="16px"
        alignItems="center"
        justifyContent="center"
        mt="50px"
      >
        <Spinner size="lg" />
        <Text as="span" fontWeight="semibold">
          Loding...
        </Text>
      </Box>
    );

  return (
    <Box>
      <Container maxW="container.lg">
        <Heading size="lg" py="20px" mb="10px" textAlign="center">
          MY BLOG
        </Heading>
        <Text fontWeight="semibold" mb="6px">Search Your Blog</Text>
        {data?.length && (
          <Input
            placeholder="Search Your Blog By Title"
            mb="30px"
            w="full"
            onChange={(e) => setSearch(e.target.value)}
          />
        )}
        {blog?.length ? (
          blog?.map((item) => <Blog item={item} />)
        ) : (
          <Text fontSize="30px" textAlign="center">
            NO BLOG YET
          </Text>
        )}
      </Container>
    </Box>
  );
};

export default Content;
