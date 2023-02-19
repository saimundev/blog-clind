import React, { useEffect } from 'react'
import { Box, Card, Heading, Image, Text,Container,Button,Spinner } from '@chakra-ui/react'
import { useGetUserQuery } from '../../../store/services/blog';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";

const ProfileInfo = () => {
  const { auth } = useSelector(state =>state.auth)
  const id = auth?.user?._id;
  const { data,isError,isLoading } = useGetUserQuery(id);

  useEffect(()=>{
    isError && toast.error("something went wrong")
  },[isError])
  
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
    <Container maxW="container.sm">
      <Card p="10px" pos="relative">
        <Image 
          mt="20px"
          src={`https://blog-website-59ns.onrender.com/${data?.profile}`}
          height="500px"
          objectFit="cover"
        />
        <Heading textAlign="center" textTransform="uppercase" mt="30px" mb="10px">{data?.name}</Heading>
        <Text textAlign="center" fontWeight="semibold">{data?.email}</Text>
        <Button pos="absolute" top="40px" right="20px"><Link to={`/edit/${data?._id}`}>Edit</Link></Button>
      </Card>
    </Container>
  )
}

export default ProfileInfo