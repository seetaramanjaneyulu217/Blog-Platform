import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./components/SignUp";
import Header from "./components/Header";
import CreateBlog from "./pages/CreateBlog";
import GetAllBlogs from "./pages/GetAllBlogs";
import SingleOwnBlogDisplay from "./pages/SingleOwnBlogDisplay";
import EditBlog from "./pages/EditBlog";
import BrowseBlogs from "./pages/BrowseBlogs";
import SingleOthersBlogDisplay from "./pages/SingleOthersBlogDisplay";

function App() {

  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/create-blog" element={<CreateBlog />} />
        <Route path="/your-blogs" element={<GetAllBlogs />} />
        <Route path="/blog/:blogId/view" element={<SingleOwnBlogDisplay />} />
        <Route path="/blog/:blogId/others/view" element={<SingleOthersBlogDisplay />} />
        <Route path="/blog/:blogId/edit" element={<EditBlog />} />
        <Route path="/blogs/browse" element={<BrowseBlogs />} />
      </Routes>
    </div>
  )
}

export default App;
