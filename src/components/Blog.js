import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardBody,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import Swal from 'sweetalert2'
import moment from "moment";
import { Link } from "react-router-dom";
import { useDeleteBlogMutation } from "../store/services/blog";
import { toast } from "react-hot-toast";

const Blog = ({ item }) => {
  const [show, setShow] = useState(true);
  const [deleteBlog, { error, isLoading: loding, isSuccess }] =
    useDeleteBlogMutation();
  const { contect, title, image, createdAt, _id } = item;

  //error message
  useEffect(() => {
    error && toast.error(error?.data?.message);
  }, [error]);

  //success message
  useEffect(() => {
    if (isSuccess) {
      toast.success("Delete successfull");
    }
  }, [isSuccess]);

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
         deleteBlog(id);
      }
    })
  };
  return (
    <Box>
      <Card mb="30px">
        <Flex direction={{base:"column",md:"row",lg:"row"}} gap="6px">
          <Image
            w={{base:"full",md:"500px",lg:"500px"}}
            h="350px"
            src={`https://blog-website-czn0.onrender.com/${image}`}
            objectFit="cover"
          />
          <CardBody>
            <Heading size="lg" textTransform="capitalize">
              {title}
            </Heading>
            <Text py="8px">
              <Text as="span">{moment(createdAt).format("MMMM Do YYYY")}</Text>
            </Text>
            <Text textAlign="justify">
              <Text
                dangerouslySetInnerHTML={{
                  __html: show ? contect?.slice(0, 300) : contect,
                }}
              />
              <Button variant="link" onClick={() => setShow(!show)}>
                {show ? "Read More" : "Less Content"}
              </Button>
            </Text>
            <Stack direction="row" spacing="20px" mt="20px">
              <Link to={`/update-blog/${_id}`}>
                <Button
                  variant="outline"
                  w="100px"
                  _hover={{ bg: "green", color: "white" }}
                  colorScheme="green"
                >
                  Edit
                </Button>
              </Link>
              <Button
                variant="outline"
                isLoading={loding}
                loadingText="Loding..."
                w="100px"
                _hover={{ bg: "red", color: "white" }}
                colorScheme="red"
                onClick={() => handleDelete(_id)}
              >
                Delete
              </Button>
            </Stack>
          </CardBody>
        </Flex>
      </Card>
    </Box>
  );
};

export default Blog;
