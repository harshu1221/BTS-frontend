import { BrowserRouter as Router, Route, Routes } from "react-router";
import HomePage from "./pages/homePage";
import ProfilePage from "./pages/profilePage";
import SingleBlogPage from "./pages/singleBlogPage";
import BlogsPage from "./pages/blogsPage";
import Navbar from "./components/navbar";
import CreateBlog from "./pages/createBlog";
import LoginPage from "./pages/loginPage";
import RegisterPage from "./pages/registerPage";
import GlobalContextProvider from "./context/globalContext";
import AboutPage from "./pages/about";
import PlanningGuidePage from "./pages/planning-guide";

const App = () => {
  return (
    <GlobalContextProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/blogs" element={<BlogsPage />} />
          <Route path="/blogs/:blogId" element={<SingleBlogPage />} />
          <Route path="/blogs/create" element={<CreateBlog />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/planning-guide" element={<PlanningGuidePage />} />
        </Routes> 
    </GlobalContextProvider>
  );
};

export default App;