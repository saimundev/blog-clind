import React, { useEffect, useState } from "react";
import {
  Input,
  Box,
  FormControl,
  Container,
  Card,
  Button,
  Spinner,
  Text,
} from "@chakra-ui/react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  useSingleBlogQuery,
  useUpdateBlogMutation,
} from "../../../store/services/blog";
import toast from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";

const UpdateBlog = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [contect, setContect] = useState("");
  const [image, setImage] = useState("");

  const navigate = useNavigate();

  const { data, isLoading } = useSingleBlogQuery(id);
  const [blog, { isLoading: loding, isSuccess, error }] =
    useUpdateBlogMutation();

  //get data
  useEffect(() => {
    setTitle(data?.title);
    setContect(data?.contect);
  }, [id, data]);

  //error message
  useEffect(() => {
    error && toast.error(error?.data?.message);
  }, [error]);

  //error message
  useEffect(() => {
    if (isSuccess) {
      toast.success("Update successfull");
      navigate("/");
    }
  }, [isSuccess]);



  //submit from
  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!title || !contect){
        toast.error("All Field Are Required")
        return;
    }

      //form data
  const formData = new FormData();
  formData.append("title", title);
  formData.append("contect", contect);
  formData.append("image", image);

    //send data
    await blog({ id, formData });
  };

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
    <Container maxW="container.lg">
      <Card p="10px">
        <form onSubmit={handleSubmit}>
          <FormControl>
            <Input
              type="text"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              placeholder="Inter your Blog Title"
              size="lg"
            />
          </FormControl>
          <FormControl mt="20px">
            <ReactQuill
              theme="snow"
              style={{ height: "150px" }}
              value={contect}
              onChange={setContect}
            />
          </FormControl>
          <FormControl mt="70px">
            <Input
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
              placeholder="Inter your Blog Title"
              size="lg"
            />
          </FormControl>
          <Button
            type="submit"
            variant="solid"
            bg="black"
            color="white"
            width="120px"
            mt="30px"
            isLoading={loding}
            loadingText="Loding..."
            _hover={{
              color: "black",
              borderWidth: "1px",
              borderColor: "black",
              background: "white",
            }}
          >
            UPDATE
          </Button>
        </form>
      </Card>
    </Container>
  );
};

export default UpdateBlog;
