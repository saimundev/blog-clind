import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Heading,
  Image,
  Text,
  Container,
  Textarea,
  List,
  ListItem,
  Avatar,
  Stack,
  Spinner,
} from "@chakra-ui/react";
import {
  useCommentBlogMutation,
  useLikeBlogMutation,
  useSingleBlogQuery,
} from "../../../store/services/blog";
import { BsHandThumbsUp, BsHandThumbsUpFill, BsClock } from "react-icons/bs";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import moment from "moment";
import { useSelector } from "react-redux";

const Detailes = () => {
  const { id } = useParams();
  const { data, isError, isLoading } = useSingleBlogQuery(id);
  const [comment, setComment] = useState("");
  const { auth } = useSelector((state) => state.auth);
  const userId = auth?.user?._id;
  const [userCommant, { error, isSuccess, isLoading: loding }] =
    useCommentBlogMutation();
  const [likesBlog, { error: err }] = useLikeBlogMutation();

  useEffect(() => {
    isError && toast.error("something went wrong");
  }, [isError]);

  useEffect(() => {
    error && toast.error(data?.error?.message);
  }, [error]);

  useEffect(() => {
    err && toast.error(data?.error?.message);
  }, [err]);

  useEffect(() => {
    isSuccess && toast.success("Commant Added Successfull");
  }, [isSuccess]);

  //hanlde comment
  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!comment){
       toast.error("Empty is not allow")
       return;
    }

    const commentData = {
      comment,
      userId,
    };
    await userCommant({ id, commentData });

    //clear input
    setComment("");
  };


  // hanlde like and dislike
  const hanldeLogComment = (e) => {
    e.preventDefault();
    toast.error("Need to login");
  };

  //like blog
  const hanldeLikeBlog = async () => {
    const user = {
      userId: userId,
    };
    await likesBlog({ id, user });
  };

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
    <Box>
      <Container maxW="container.lg">
        <Card textAlign="center">
          <Heading size="lg" textTransform="capitalize">
            {data?.title}
          </Heading>
          <Text py="14px" textTransform="capitalize" fontWeight="semibold">
            By {data?.author}
          </Text>
          <Image
            w="100%"
            h="350px"
            objectFit="cover"
            my="20px"
            src={`https://blog-website-59ns.onrender.com/${data?.image}`}
          />
          <CardBody>
            <Text textAlign="justify">
              <Text dangerouslySetInnerHTML={{ __html: data?.contect }} />
            </Text>
          </CardBody>
          <CardFooter>
            {/* like Blog */}
            {auth ? (
              <Button onClick={hanldeLikeBlog}>
                {data?.like?.includes(userId) ? (
                  <BsHandThumbsUpFill size="40px" />
                ) : (
                  <BsHandThumbsUp size="40px" />
                )}
                <Box as="span" fontSize="30px" ml="16px">
                  {data?.like?.length}
                </Box>
              </Button>
            ) : (
              <Button onClick={() => toast.error("Login Plese")}>
                <BsHandThumbsUp size="40px" />
                <Box as="span" fontSize="30px" ml="16px">
                  {data?.like?.length}
                </Box>
              </Button>
            )}
          </CardFooter>
          {/* comment form */}
          <form
            style={{ marginTop: "40px" }}
            onSubmit={auth ? handleSubmit : hanldeLogComment}
          >
            <Textarea
              placeholder="Inter Your Comment"
              border="1px solid lightgray"
              fontWeight="semibold"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <Box mt="16px" textAlign="right">
              <Button
                bg="black"
                type="submit"
                variant="solid"
                color="white"
                isLoading={loding}
                loadingText="Loding..."
                _hover={{ border: "black", borderWidth: "1px" }}
              >
                Comment
              </Button>
            </Box>
          </form>
          {/* comment bolg */}
          <Box mt="40px">
            <Text
              fontSize="24px"
              fontWeight="semibold"
              textAlign="left"
              mb="16px"
              mt="10px"
            >
              Comments
            </Text>
            {data?.comments?.map((comment) => (
              <List mb="10px">
                <ListItem
                  borderWidth="1px"
                  p="10px"
                  borderColor="gray.300"
                  fontSize="16px"
                  fontWeight="semibold"
                  borderRadius="8px"
                  textAlign="justify"
                  color="gray.600"
                >
                  <Box>
                    <Stack direction="row" gap="6px" align="center">
                      <Avatar
                        src={`https://blog-website-59ns.onrender.com/${comment.postedBy.profile} `}
                      />
                      <Text
                        fontSize="18px"
                        color="black"
                        fontWeight="semibold"
                        mb="10px"
                      >
                        {comment?.postedBy?.name}
                      </Text>
                    </Stack>

                    <Text ml="10px" mt="10px" fontWeight="semibold">
                      {comment.comment}
                    </Text>

                    <Box
                      display="flex"
                      alignItems="center"
                      gap="10px"
                      ml="10px"
                      mt="10px"
                      fontSize="14px"
                      fontWeight="light"
                    >
                      <BsClock />
                      <Text>{moment(comment?.createdAt).fromNow()}</Text>
                    </Box>
                  </Box>
                </ListItem>
              </List>
            ))}
          </Box>
        </Card>
      </Container>
    </Box>
  );
};

export default Detailes;
