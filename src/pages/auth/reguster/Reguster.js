import React, { useEffect, useState } from "react";
import { Alert, AlertDescription, AlertTitle, Box, Button, Card, Container, Heading, Input } from "@chakra-ui/react";
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { useCreateUserMutation } from "../../../store/services/blog";
import { getUser } from "../../../store/feachers/authSlice";

const Reguster = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profile, setProfile] = useState("");
  const [error,setError] =useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch()

  const [createUser,{data,error:err,isSuccess,isLoading:loding}] = useCreateUserMutation()
 

  useEffect(()=>{
    err && toast.error(err?.data?.message)
  },[err])

  useEffect(()=>{
    if(isSuccess){
      toast.success("Account create successfull")
      navigate("/")
      localStorage.setItem("user",JSON.stringify(data))
      dispatch(getUser(data))
    }
  },[isSuccess])

  //submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    //validation
    if (!name || !email || !password || !profile) {
      setError("All Field Are Required")
      return;
    }


    //Form data
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("profile", profile);

    //send data
   await createUser(formData)
   

    //clear error
    setError("")
  };
  return (
    <Container maxW="container.sm" mt="50px">
      
        
        <Heading size="lg" mb="20px">
          FREE JOIN NOW
        </Heading>
        <Card px="10px" py="20px" textAlign="center" shadow="inner">
        {error && <Alert status="error">
          <AlertTitle>{error}</AlertTitle>
        </Alert>}
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            fontWeight="semibold"
            mt="20px"
            size="md"
            placeholder="Enter Your Name"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          <Input
            type="email"
            fontWeight="semibold"
            mt="20px"
            size="md"
            placeholder="Enter Your Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <Input
            type="password"
            fontWeight="semibold"
            mt="20px"
            size="md"
            placeholder="Enter Your Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <Input
            type="file"
            name="profile"
            onChange={(e) => setProfile(e.target.files[0])}
            fontWeight="semibold"
            mt="20px"
            size="md"
          />
          <Button
            type="submit"
            w="full"
            borderWidth="1px"
            borderColor="black"
            color="black"
            mt="20px"
            isLoading={loding}
            loadingText="Loding..."
            _hover={{ bg: "black", color: "white" }}
          >
           {loding ? "Loding...":"SIGN UP"} 
          </Button>
        </form>
      </Card>
    </Container>
  );
};

export default Reguster;
