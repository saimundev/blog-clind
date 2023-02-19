import {
  Box,
  Button,
  Flex,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { FaAngleDown } from "react-icons/fa";

const Search = ({setSearch,setCatagory}) => {
 
  return (
    <Box>
      <Flex gap="20px" mt={{base:"30px",md:"10px",lg:"10px"}} direction={{base:"column",md:"row",lg:"row"}}>
        {/* Search bolg */}
        <Input size="lg" placeholder="Search By Title" onChange={(e)=>setSearch(e.target.value)}/>

        {/* Filter blog  */}
        <Menu>
          <MenuButton size="lg" textTransform="uppercase" width="200px" as={Button} rightIcon={<FaAngleDown />}>Catagory </MenuButton>
          <MenuList>
            <MenuItem fontWeight="semibold" onClick={()=>setCatagory("all")}>All</MenuItem>
            <MenuItem fontWeight="semibold" onClick={()=>setCatagory("spors")}>Spores</MenuItem>
            <MenuItem fontWeight="semibold" onClick={()=>setCatagory("entertainment")}>Entratenment</MenuItem>
            <MenuItem fontWeight="semibold" onClick={()=>setCatagory("programing")}>Programing</MenuItem>
            <MenuItem fontWeight="semibold" onClick={()=>setCatagory("politic")}>Politices</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Box>
  );
};

export default Search;
