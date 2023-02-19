import React, { useEffect, useState } from "react";
import {
  Input,
  Box,
  FormControl,
  Container,
  CardBody,
  Card,
  Select,
  Button,
} from "@chakra-ui/react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useCreateBlogMutation } from "../../../store/services/blog";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [contect, setContect] = useState("");
  const [catagory,setCatagory] =useState("")
  const [image, setImage] = useState("");
  const { auth } = useSelector((state) => state.auth);

  const [CreateBlogs,{isLoading:loding,isSuccess,error}] = useCreateBlogMutation();
  const userId = auth?.user?._id;
  const author = auth?.user?.name;
  const navigate = useNavigate();

  useEffect(()=>{
    error && toast.error(error?.data?.message)
  },[error])

  useEffect(()=>{
    if(isSuccess){
      toast.success("Blog Create Successfull")
      navigate("/");

    }
  },[isSuccess])

  //submit from
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    //validation
    if(!title || !contect || !image || !catagory){
      toast.error("All Field Are Required")
      return;
  
    }

    //form data
    const formData = new FormData();
    formData.append("title", title);
    formData.append("contect", contect);
    formData.append("catagory", catagory);
    formData.append("image", image);
    formData.append("userId", userId);
    formData.append("author", author);

    //send data
    await CreateBlogs(formData);
  };

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
            <Select placeholder='Select option' onChange={(e)=>setCatagory(e.target.value)}>
              <option value='spors'>Spors</option>
              <option value='politic'>Politic</option>
              <option value='entertainment'>Entertainment</option>
              <option value='programing'>Programing</option>
            </Select>
          </FormControl>
          <FormControl mt="20px">
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
            POST
          </Button>
        </form>
      </Card>
    </Container>
  );
};

export default CreateBlog;
