import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./components/SignUp";
import Header from "./components/Header";
import CreateBlog from "./pages/CreateBlog";
import GetAllBlogs from "./pages/GetAllBlogs";
import SingleBlogDisplay from "./components/SingleBlogDisplay";
import EditBlog from "./pages/EditBlog";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/create-blog" element={<CreateBlog />} />
        <Route path="/your-blogs" element={<GetAllBlogs />} />
        <Route path="/blog/:blogId" element={<SingleBlogDisplay />} />
        <Route path="/blog/:blogId/edit" element={<EditBlog />} />
      </Routes>
    </div>
  )
}

export default App;
