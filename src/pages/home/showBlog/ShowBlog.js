import React, { useEffect, useState } from "react";
import { Box, Spinner, Text } from "@chakra-ui/react";
import Cart from "../../../components/Cart";
import toast from "react-hot-toast";
import { useGetBlogQuery } from "../../../store/services/blog";
import Pagenation from "../pagenation/Pagenation";

const ShowBlog = ({ search, catagory }) => {
  const [page, setPage] = useState(1);
  const { data, isError, isLoading } = useGetBlogQuery({
    search,
    page,
    catagory,
  });
  useEffect(() => {
    isError && toast.error("something went wrong");
  }, [isError]);

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
    <Box mt="50px">
      {data?.blog?.length ? (
        data?.blog?.map((item) => <Cart item={item} isLoading={isLoading} />)
      ) : (
        <Text fontSize="30px" textAlign="center">
          NO BLOG AVAILAVAIL
        </Text>
      )}

      {data?.blog?.length && <Pagenation
        page={page}
        setPage={setPage}
        pageCount={data?.pagenation?.pageCount}
      />}
    </Box>
  );
};

export default ShowBlog;
