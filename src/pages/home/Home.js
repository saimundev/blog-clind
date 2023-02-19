import React from 'react'
import { Box, Container } from '@chakra-ui/react'
import Search from './search/Search'
import ShowBlog from './showBlog/ShowBlog'
import { useState } from 'react'

const Home = () => {
  const [search,setSearch] =useState("");
  const [catagory,setCatagory] =useState("all");
  return (
    <Container maxW="container.lg">
        <Search setSearch={setSearch} setCatagory={setCatagory}/>
        <ShowBlog search={search} catagory={catagory}/>
    </Container>
  )
}

export default Home