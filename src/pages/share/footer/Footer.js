import { Box, Container, Grid, Text,GridItem, HStack, VStack, Divider } from '@chakra-ui/react'
import React from 'react'
import { FaFacebook,FaInstagram,FaLinkedin } from "react-icons/fa";
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <Container maxW="container.lg">
        <Divider orientation="horizontal" />
        <Grid templateColumns={{base:'repeat(1, 1fr)',md:'repeat(3, 1fr)',lg:'repeat(3, 1fr)'}} gap={6} py="30px" mt="50px">
            <GridItem textAlign={{base:"center"}}>
                <Text fontSize="24px">KOTHA</Text>
               <HStack gap="6px" justify={{base:"center"}} fontSize="28px" mt="20px">
               <FaFacebook />
                <FaInstagram />
                <FaLinkedin />
               </HStack>
            </GridItem >
            <GridItem >
               <VStack gap="0px">
               <Link to="/">Home</Link>
               <Link to="/login">Loding</Link>
               <Link to="/reguster">Reguster</Link>
               </VStack>
            </GridItem>
            <GridItem>
            <Text textAlign={{base:"center",md:"right",lg:"right"}} fontWeight="medium" mt="30px">Devlop By Saimun Islam</Text>
            </GridItem>
        </Grid>
    </Container>
  )
}

export default Footer