import React from "react";
import {
  Box,
  Button,
  Card,
  CardBody,
  Flex,
  Heading,
  Image,
  Skeleton,
  Text,
} from "@chakra-ui/react";
import moment from "moment";
import { Link } from "react-router-dom";

const Cart = ({ item,isLoading }) => {
  const { contect, title, image, author, createdAt,_id } = item;
  return (
    <Box>
      <Card mb="50px">
        <Flex gap="6px" direction={{base:"column",md:"row",lg:"row"}}>
        <Image
            w="500px"
            h="290px"
            src={`https://blog-website-59ns.onrender.com/${image}`}
            objectFit="cover"
          />
          <CardBody>
            <Heading size="lg" textTransform="capitalize">
              {title}
            </Heading>
            <Text py="16px">
              @
              <Text as="span" fontWeight="semibold">
                {" " + author}
              </Text>
              <Text ml="30px" as="span">{moment(createdAt).format("MMMM Do YYYY")}</Text>
            </Text>
            <Text textAlign="justify">
            <Text dangerouslySetInnerHTML={{__html:`${contect?.slice(0, 250)}...`}}/>
              <Button
                textDecoration="underline"
                as={Link}
                to={`/detailes/${_id}`}
                variant="link"
              >
                Read More
              </Button>
            </Text>
          </CardBody>
        </Flex>
      </Card>
    </Box>
  );
};

export default Cart;
