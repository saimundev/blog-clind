import { lazy,Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import { ChakraProvider } from "@chakra-ui/react";
import Navber from "./pages/share/navber/Navber";
import PrivateRoute from "./pages/auth/provateRoute/PrivateRoute";
import Footer from "./pages/share/footer/Footer";
const Home = lazy(()=>import("./pages/home/Home"))
const CreateBlog = lazy(()=>import("./pages/blog/createBlog/CreateBlog"))
const Detailes = lazy(()=>import("./pages/home/detailes/Detailes"))
const Reguster = lazy(()=>import("./pages/auth/reguster/Reguster"))
const Login = lazy(()=>import("./pages/auth/login/Login"))
const Profile = lazy(()=>import("./pages/profile/Profile"))
const Edit = lazy(()=>import("./pages/profile/edit/Edit"))
const Content = lazy(()=>import("./pages/profile/content/Content"))
const UpdateBlog = lazy(()=>import("./pages/blog/updateBlog/UpdateBlog"))
const EmailSend = lazy(()=>import("./pages/auth/emailSend/EmailSend"))
const ForgetPassword = lazy(()=>import("./pages/auth/forgetPassword/ForgetPassword"))


function App() {
  return (
    <ChakraProvider>
      <Router>
        <Navber />
        <Toaster />
        <Suspense fallback={<h1>Loding...</h1>}>
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
        </Suspense>
        <Footer />
      </Router>
    </ChakraProvider>
  );
}

export default App;
