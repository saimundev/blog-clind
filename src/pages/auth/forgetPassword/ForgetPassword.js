import React, { useEffect, useState } from "react";
import { Button, Container, Input, Text } from "@chakra-ui/react";
import { useParams,useNavigate } from "react-router-dom";
import { useForgetPasswordMutation } from "../../../store/services/blog";
import { toast } from "react-hot-toast";

const ForgetPassword = () => {
  const { id, token } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [reseatPassword,{isLoading:loding,error,isSuccess}] = useForgetPasswordMutation();

  const navigate = useNavigate();

  useEffect(()=>{
    error && toast.error(error?.data?.message)
  },[error])

  useEffect(()=>{
    if(isSuccess){
      toast.success("Password Update Successfull")
      navigate("/login")
    }
  },[isSuccess])

  

  //hanlde submit
  const handleSubmit = async (e)=>{
    e.preventDefault();

    const updatePassword = {
      password,
      confirmPassword
    }

   await reseatPassword({id,token,updatePassword})
  }
  return (
    <Container maxW="container.sm" mt="80px">
      <Text fontSize="18px" fontWeight="semibold" mb="10px">
        Enter your New Password
      </Text>
      <form onSubmit={handleSubmit}>
        <Input
          type="password"
          placeholder="Inter Your password"
          size="lg"
          mb="20px"
          onChange={(e)=>setPassword(e.target.value)}
          value={password}
        />
        <Input
          type="password"
          placeholder="Inter Your confirm-password"
          size="lg"
          onChange={(e)=>setConfirmPassword(e.target.value)}
          value={confirmPassword}
        />
        <Button
        type="submit"
          variant="outline"
          w="full"
          borderWidth="1px"
          borderColor="black"
          isLoading={loding}
          loadingText="Loding..."
          mt="30px"
        >
          Update Password
        </Button>
      </form>
    </Container>
  );
};

export default ForgetPassword;
