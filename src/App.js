import { ChakraProvider } from "@chakra-ui/react";
import Home from "./pages/home/Home";
import Navber from "./pages/share/navber/Navber";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import CreateBlog from "./pages/blog/createBlog/CreateBlog";
import Detailes from "./pages/home/detailes/Detailes";
import Reguster from "./pages/auth/reguster/Reguster";
import Login from "./pages/auth/login/Login";
import EmailSend from "./pages/auth/emailSend/EmailSend";
import ForgetPassword from "./pages/auth/forgetPassword/ForgetPassword";
import PrivateRoute from "./pages/auth/provateRoute/PrivateRoute";
import Profile from "./pages/profile/Profile";
import Edit from "./pages/profile/edit/Edit";
import Content from "./pages/profile/content/Content";
import UpdateBlog from "./pages/blog/updateBlog/UpdateBlog";
import Footer from "./pages/share/footer/Footer";

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Navber />
        <Toaster />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/reguster" element={<Reguster />} />
          <Route path="/login" element={<Login />} />
          <Route path="/send-email" element={<EmailSend />} />
          <Route path="/changepassword/:id/:token" element={<ForgetPassword />} />
          <Route path="/createblog" element={<PrivateRoute> <CreateBlog /> </PrivateRoute>} />
          <Route path="/detailes/:id" element={<Detailes />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/edit/:id" element={<Edit />} />
          <Route path="/content/:id" element={<Content />} />
          <Route path="/update-blog/:id" element={<UpdateBlog  />} />
        </Routes>
        <Footer />
      </Router>
    </ChakraProvider>
  );
}

export default App;
