import React from "react";
import { Avatar, Box, Button, Container, Flex, Menu, MenuButton, MenuItem, MenuList,Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure, } from "@chakra-ui/react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { logOUtUser } from "../../../store/feachers/authSlice";
import { useGetUserQuery } from "../../../store/services/blog";


const Navber = () => {
  const { auth } = useSelector((state) => state.auth);
  const { data } = useGetUserQuery(auth?.user?._id);
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef()
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //logout
  const handleLogOut = () => {
    dispatch(logOUtUser());
    navigate("/login");
  };

  return (
    <Box>
       <Drawer
        isOpen={isOpen}
        placement='left'
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />   
    <DrawerHeader></DrawerHeader>
          <DrawerBody>
            <Button w="full" as={Link} to="/" mt="10px" variant="outline" colorScheme="teal" onClick={onClose}>Home</Button>
            <Button w="full" as={Link} to="/createblog" mt="20px" variant="outline" colorScheme="teal" onClick={onClose}>Create Blog</Button>
            {!auth && <>
              <Button w="full" as={Link} to="/reguster" mt="10px" variant="outline" colorScheme="teal" onClick={onClose}>Reguster</Button>
            <Button w="full" as={Link} to="/login" mt="20px" variant="solid" colorScheme="teal" onClick={onClose}>Login</Button>
            </> }
          </DrawerBody>

          
        </DrawerContent>
      </Drawer>
      <Container maxWidth="container.lg">
        <Flex justify="space-between" align="center" py="20px">
          <Box display={{base:"block",md:"none",lg:"none"}} cursor="pointer">
            <FaBars size="22px" ref={btnRef} onClick={onOpen}/>
          </Box>
          <Box fontSize="26px" fontWeight="bold" display={{base:"none",md:"block",lg:"block"}}>
            KHOTO
          </Box>
          <Box as="ul" display={{base:"none",md:"block",lg:"block"}} listStyleType="none">
            <Flex gap="20px">
              <Box as="li">
                <Box
                  fontSize="16px"
                  px="10px"
                  py="2"
                  fontWeight="light"
                  as={NavLink}
                  style={({ isActive }) =>
                    isActive
                      ? {
                          color: "teal",
                          fontWeight: "inherit",
                        }
                      : {}
                  }
                  to="/"
                  _hover={{ color: "teal", fontWeight: "semibold" }}
                >
                  HOME
                </Box>
              </Box>
              <Box as="li">
                <Box
                  fontSize="16px"
                  px="10px"
                  py="2"
                  fontWeight="light"
                  as={NavLink}
                  style={({ isActive }) =>
                    isActive
                      ? {
                          color: "teal",
                          fontWeight: "inherit",
                        }
                      : {}
                  }
                  to="/createblog"
                  _hover={{ color: "teal", fontWeight: "semibold" }}
                >
                  CREATE BLOG
                </Box>
              </Box>
            </Flex>
          </Box>
          <Box  fontSize="26px" fontWeight="bold" display={{base:"block",md:"none",lg:"none"}}>
            KHOTO
          </Box>
          <Box>
            <Box as="ul"  listStyleType="none">
              <Flex gap="14px" justify="center" align="center">
                {!auth?.user && (
                  <>
                    <Box as="li" display={{base:"none",md:"block",lg:"block"}} >
                      <Box
                        fontSize="16px"
                        px="10px"
                        py="2"
                        fontWeight="light"
                        as={NavLink}
                        style={({ isActive }) =>
                          isActive
                            ? {
                                color: "teal",
                                fontWeight: "inherit",
                              }
                            : {}
                        }
                        to="/login"
                        _hover={{ color: "teal", fontWeight: "semibold" }}
                      >
                        LOGIN
                      </Box>
                    </Box>
                    <Box as="li" display={{base:"none",md:"block",lg:"block"}}>
                      <Box
                        fontSize="16px"
                        px="10px"
                        py="2"
                        fontWeight="light"
                        as={NavLink}
                        style={({ isActive }) =>
                          isActive
                            ? {
                                color: "teal",
                                fontWeight: "inherit",
                              }
                            : {}
                        }
                        to="/reguster"
                        _hover={{ color: "teal", fontWeight: "semibold" }}
                      >
                        <Button
                          borderWidth="1px"
                          borderColor="teal"
                          _hover={{ bg: "teal", color: "white" }}
                        >
                          JOIN FREE
                        </Button>
                      </Box>
                    </Box>
                  </>
                )}
            
                {auth?.user && (
                  <Menu>
                  <MenuButton>
                    <Avatar
                    border="2px solid lightgray"
                    name={auth?.user?.name}
                    src={`https://blog-website-czn0.onrender.com/${data?.profile}`}
                    
                  />
                  </MenuButton>
                  <MenuList px="10px">
                  <Link to="/profile"><MenuItem textTransform="uppercase" fontWeight="semibold">Profile</MenuItem></Link>
                   <Link to={`/content/${auth?.user?._id}`}><MenuItem textTransform="uppercase" fontWeight="semibold">My Blog</MenuItem></Link> 
                    <MenuItem textTransform="uppercase" fontWeight="semibold"  onClick={handleLogOut}>LOGOUT</MenuItem>
                  </MenuList>
                </Menu>
                  
                )}
              </Flex>
            </Box>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
};

export default Navber;
