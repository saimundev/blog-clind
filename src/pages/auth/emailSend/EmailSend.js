import React, { useEffect, useState } from "react";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  CloseButton,
  Container,
  Input,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useForgetPasswordLinkMutation } from "../../../store/services/blog";
import { toast } from "react-hot-toast";

const EmailSend = () => {
  const [email, setEmail] = useState("");
  const [successMsg, setSuccessMsg] = useState(false);
  const [sendMail, { isLoading: loding, error, isSuccess }] =
    useForgetPasswordLinkMutation();

  useEffect(() => {
    error && toast.error(error?.data?.message);
  }, [error]);

  useEffect(() => {
    if (isSuccess) {
      setSuccessMsg(true);
    }
  }, [isSuccess]);

  const handleSubmit = async (e) => {
    e.preventDefault();
   

    await sendMail({email:email});

    //clear input
    setEmail("");
  };
  return (
    <Container maxW="container.sm" mt="80px">
      <Text fontSize="18px" fontWeight="semibold" mb="10px">
        Find Your Account By Email
      </Text>
      <form onSubmit={handleSubmit}>
        <Input
          placeholder="Inter Your Email"
          size="lg"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button
          type="submit"
          variant="outline"
          isLoading={loding}
          loadingText="Loding..."
          w="full"
          borderWidth="1px"
          borderColor="black"
          mt="30px"
        >
          Send Email
        </Button>
      </form>

      {/* success Message */}
      {successMsg && (
        <Alert
          status="success"
          variant="subtle"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
          height="150px"
          mt="20px"
        >
          <AlertIcon boxSize="40px" mr={0} />
          <AlertTitle mt={4} mb={1} fontSize="lg">
            Successfully Send Email Your Inbox
          </AlertTitle>
          <AlertDescription maxWidth="sm">
           Plese Check Your Email And Reset Your Password. This Link Valid For 30 minit
          </AlertDescription>
        </Alert>
      )}
    </Container>
  );
};

export default EmailSend;
