import React, { useEffect, useState } from "react";
import { Box, Button, Card, Container, Heading, Input,Alert,AlertTitle } from "@chakra-ui/react";
import { Link,useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import  toast from "react-hot-toast"
import { useLoginUserMutation } from "../../../store/services/blog";
import { getUser } from "../../../store/feachers/authSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg,setErrorMsg] =useState("")

  const [loginUser,{data,error:err,isSuccess,isLoading:loding}] = useLoginUserMutation()
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(()=>{
    err && toast.error(err?.data?.message)
  },[err])

  useEffect(()=>{
    if(isSuccess){
      toast.success("Login Successfull");
      navigate("/")
      localStorage.setItem("user",JSON.stringify(data))
      dispatch(getUser(data))
    }
  },[isSuccess])

  //submit form
  const handleSubmit =async (e)=>{
    e.preventDefault();
    if(!email || !password){
      setErrorMsg("All Field Are Required")
      return;
    }
    
    //Form data
   const loginData = {
    email,
    password
   }
    //send data
    await loginUser(loginData)

    //clear input
    setErrorMsg("");
  }
  return (
    <Container maxW="container.sm" mt="50px">
      <Card px="10px" py="20px" textAlign="center" shadow="inner">
        <Heading size="lg" mb="20px">
          LOGIN NOW
        </Heading>
        {errorMsg && <Alert status="error">
          <AlertTitle>{errorMsg}</AlertTitle>
        </Alert>}
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
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
          <Button
            w="full"
            type="submit"
            borderWidth="1px"
            borderColor="black"
            color="black"
            mt="30px"
            _hover={{ bg: "black", color: "white" }}
            isLoading={loding}
            loadingText="Loding..."
          >
            SIGN IN
          </Button>
        </form>
       <Box textAlign="right" mt="10px">
       <Button variant="link"><Link to="/send-email">Forgoten Password</Link></Button>
       </Box>
      </Card>
    </Container>
  );
};

export default Login;
