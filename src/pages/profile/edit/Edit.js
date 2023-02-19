import React, { useState } from "react";
import { Avatar, Box, Button, Card, CardBody, Container, Heading, Input, Spinner, Text } from "@chakra-ui/react";
import { useParams,useNavigate } from "react-router-dom"
import { useGetUserQuery, useUpdateUserMutation } from "../../../store/services/blog";
import { useEffect } from "react";
import toast from "react-hot-toast";

const Edit = () => {
    const { id } = useParams();
  const [update, setUpdate] = useState({
    name: "",
    email: "",
  });
  const [profile,setProfile] =useState("")
  const { data,isLoading} = useGetUserQuery(id);
  const [updateUser,{error,isLoading:loding,isSuccess}] = useUpdateUserMutation();
  const navigate = useNavigate();
 

  //get user data
  useEffect(()=>{
    setUpdate({...data})
  },[data,id])


  const handleInput = (e) => {
    setUpdate({ ...update, [e.target.name]: e.target.value });
  };

  //error message
  useEffect(()=>{
    error && toast.error(error)
  },[error])

  //success
  useEffect(()=>{
    if(isSuccess){
        toast.success("Update Successfull")
        navigate("/profile")
    }
  },[isSuccess])


  //hanlde form
  const handleSubmit = async (e)=>{
    e.preventDefault();

    //form data
    const formData = new FormData();
    formData.append("name",update.name)
    formData.append("email",update.email)
    formData.append("profile",profile)

    //send data
    await updateUser({id,formData})
  }

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
    <Container maxW="container.sm">
       <Card>
        <CardBody>
        <Heading size="lg" textAlign="center" mt="20px" mb="20px">Update User</Heading>
       <Box textAlign="center" mb="20px">
       <Avatar src={ profile ? URL.createObjectURL(profile) : `https://blog-website-59ns.onrender.com/${data?.profile}`} size="lg" />
       </Box>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          name="name"
          onChange={handleInput}
          value={update.name}
          size="lg"
          mb="30px"
        />
        <Input
          type="email"
          name="email"
          readOnly
          onChange={handleInput}
          value={update.email}
          size="lg"
          mb="30px"
        />
        <Input
          type="file"
          name="profile"
          onChange={(e)=>setProfile(e.target.files[0])}
          size="lg"
          mb="30px"
        />
        <Button variant="solid" type="submit" w="full" borderWidth="1px" isLoading={loding} loadingText="Loding..." borderColor="black" _hover={{background:"black",color:"white"}}>Update</Button>
        
      </form>
        </CardBody>
       </Card>
    </Container>
  );
};

export default Edit;
