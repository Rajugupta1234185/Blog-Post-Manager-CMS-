import React,{useState,useEffect,useRef} from "react";
import { FaUserCircle } from "react-icons/fa";
import { MdMenuOpen } from "react-icons/md";
import { FaArrowRightToBracket } from "react-icons/fa6";
import axios from 'axios';
import { useNavigate } from "react-router-dom";


export default function Dashboard() {
  const[showdetail,setdetail]=useState(false);
  const[Blogs,setblogs]=useState([]);//here we create Blogs as an array variable
  const[getblog,setgetblog]=useState({});
  const [editmodal,seteditmodal]=useState(false);
  const [writeModal, setWriteModal] = useState(false);
  const [newBlog, setNewBlog] = useState({
    blogName: '',
    author: '',
    content: '',
  });
  const [selectedBlog, setSelectedBlog] = useState(null);
  const blogsectionref=useRef(null);
  const[logout,setlogout]=useState(false);
  const navigate=useNavigate();


  // const blogs = [
  //   { id: "bg01", blogname: "socket.io", Author: "Raju Gupta" },
  //   { id: "bg02", blogname: "TCP Protocol", Author: "Bibek Thakur" },
  //   { id: "bg03", blogname: "socket.io", Author: "Krishna Singh" },
  // ];

  //fetching blogs detail from backend
  const fetchingblogs=async()=>{
    try{
      const res=await axios.get("http://192.168.1.75:5000/api/blogs");
      setblogs(res.data.blogs);
      console.log(res.data.blogs);
      console.log("blogs retrieved successfully");

    }
    catch(error){
      alert("Internal server talking from dashboard frontend")
    }
  }
  useEffect(()=>{
    fetchingblogs();
  },[]);


  //handleEdit
  const handleEdit=async(id)=>{
    try{
      const res=await axios.post("http://192.168.1.75:5000/api/blogs/get",{id});
      setgetblog(res.data.data);
      seteditmodal(!editmodal);

    }
     catch(error){
      alert("Internal server talking from dashboard hendleedit")
    }
  }

  //handledelete
  const handleDelete = async (id) => {
  try {
    const res = await axios.post("http://192.168.1.75:5000/api/blogs/delete", {id}
    );

    if (res.status === 200) {
      fetchingblogs();
      alert("Blog deleted successfully");
    }
  } catch (error) {
    alert("Error from dashboard handleDelete");
    console.error(error);
  }
};


//handlesubmit
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const payload = {
      id: getblog._id,        // map _id to id for backend
      blogName: getblog.blogName,
      author: getblog.author,
      content: getblog.content,
    };
    console.log("Sending update payload:", payload);

    const res = await axios.put("http://192.168.1.75:5000/api/blogs/update", payload);

    if (res.status === 200) {
      alert("Blog updated successfully");
      fetchingblogs();
      seteditmodal(false);  // close modal on success
    }
  } catch (error) {
    alert("Server error from handleSubmit dashboard.jsx");
    console.error(error);
  }
};

//handle wirtesubmit
const handleWriteSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post("http://192.168.1.75:5000/api/blogs", newBlog);
    if (res.status === 201 || res.status === 200) {
      alert("✅ Blog created successfully");
      setWriteModal(false);
      setNewBlog({ blogName: '', author: '', content: '' });
      fetchingblogs(); // Refresh table
    }
  } catch (error) {
    alert("❌ Error creating blog");
    console.error(error);
  }
};



//handleScrollblog
const handlescrollblog=()=>{

    blogsectionref.current?.scrollIntoView({ behavior: "smooth" });
}

//handlelogout
const handlelogout=()=>{
  setlogout(!logout)

}

const handlelog=()=>{
  navigate('/');
}







  return (
    <div className="flex flex-col w-screen bg-white">
      {/* Header */}
      <div
        className="flex w-screen h-[35vh] bg-cover"
        style={{ backgroundImage: "url('/Images/dashboard.png')" }}
      >
        {/* Logo Section */}
        <div
          className="h-full w-[33%] bg-cover bg-center justify-center"
          style={{ backgroundImage: "url('/Images/Logo.png')" }}
        ></div>

        {/* Right Side of Header */}
        <div className="flex flex-col w-[70%] justify-between p-4">
          {/* Contact Info */}
          <div className="flex justify-end text-right">
            <div>
              <p>Tel: +001-003452</p>
              <p>Kathmandu, Nepal</p>
            </div>
          </div>

          {/* Search and Icons */}
          <div className="flex justify-between items-center">
            <input
              type="search"
              placeholder="Search blogs..."
              className="w-[70%] p-2 rounded border-2 border-black focus:border-blue-900 focus:outline-none"
            />
            <div className="flex gap-4 text-5xl text-white  ">
              <div className=" group  border-2 border-transparent hover:border-white rounded-md "><MdMenuOpen className="cursor-pointer " onClick={()=>setdetail(!showdetail)} /><FaArrowRightToBracket className="opacity-0 text-sm group-hover:opacity-100 transition-opacity duration-300 ease-in"/></div>
              <div className=" group  border-2 border-transparent hover:border-white rounded-md " onClick={handlelogout}> <FaUserCircle className="cursor-pointer" /><FaArrowRightToBracket className="opacity-0 text-sm group-hover:opacity-100 transition-opacity duration-300 ease-in"/></div>
             
            </div>
          </div>
        </div>
      </div>


      <div className={`h-[10vh] w-screen px-[10%] flex flex-row items-center justify-between bg-gray-500 shadow-md transition-opacity duration-300 ${showdetail ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        <p className="text-xl text-blue-200 cursor-pointer hover:text-blue-400" onClick={()=>setWriteModal(true)}>Write New Blog</p>
        <p className="text-xl text-blue-200 cursor-pointer hover:text-blue-400" onClick={handlescrollblog}>Read Blogs</p>
      </div>


     <div className="w-full h-[50%] px-4 sm:px-[10%] mt-6 overflow-x-auto">
  <p className="text-blue-500 mb-2 text-lg sm:text-xl">Blogs Details Table</p>

  <table className="min-w-full border-collapse border border-gray-300 bg-blue-100 text-left text-sm sm:text-base">
    <thead>
      <tr className="bg-blue-300 text-black">
   
        <th className="border px-3 sm:px-4 py-2">Blog Name</th>
        <th className="border px-3 sm:px-4 py-2">Author</th>
        <th className="border px-3 sm:px-4 py-2">Action</th>
      </tr>
    </thead>

    <tbody>
      {Blogs.map((blog) => (
        <tr key={blog._id} className="hover:bg-blue-200 transition text-black italic">
          
          <td className="border px-3 sm:px-4 py-2">{blog.blogName}</td>
          <td className="border px-3 sm:px-4 py-2">{blog.author}</td>
          <td className="border px-3 sm:px-4 py-2">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
              <button className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md text-sm sm:text-base" onClick={()=>handleEdit(blog._id)}>
                Edit
              </button>
              <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm sm:text-base" onClick={() => handleDelete(blog._id)}
>
                Delete
              </button>
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

{/* blogs section*/}

  <p className="text-blue-500 text-xl mt-30" id="blogs" ref={blogsectionref}>Blogs:</p>
  <div className="mt-[5vh] mb-[5vh] w-full flex justify-center">
        <div className="grid place-items-center gap-6 grid-cols-[repeat(auto-fit,minmax(300px,1fr))] max-w-6xl w-full px-4">
          {Blogs.map((blog) => (
            <div key={blog._id} className="w-full max-w-sm bg-blue-300 rounded-lg shadow p-4">
              <h3 className="text-xl font-semibold text-blue-700">{blog.blogName}</h3>
              <p className="text-sm text-gray-600 mb-2">By: {blog.author}</p>
              <p className="text-gray-800 text-sm">{blog.content.slice(0, 100)}...</p>
              <button
                onClick={() => setSelectedBlog(blog)}
                className="mt-3 text-blue-500 hover:underline"
              >
                Read More
              </button>
            </div>
          ))}
        </div>
      </div>


      {selectedBlog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-3xl w-full max-h-[80vh] overflow-y-auto p-6 relative shadow-lg">
            <button
              onClick={() => setSelectedBlog(null)}
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 text-xl font-bold"
              aria-label="Close modal"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-4 text-blue-700">{selectedBlog.blogName}</h2>
            <p className="text-sm text-gray-600 mb-6">By: {selectedBlog.author}</p>
            <div className="whitespace-pre-wrap text-gray-800">{selectedBlog.content}</div>
          </div>
        </div>
      )}



     {editmodal && (
  <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
    <div className="w-[90%] sm:w-[60%] bg-white p-6 rounded-xl shadow-lg border border-gray-300">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 text-gray-800 font-italic"
      >
        <div className="flex flex-col">
          <label className="mb-1 text-sm">ID:</label>
          <input
            type="text"
            value={getblog._id}
            readOnly
            className="p-2 border border-gray-300 rounded bg-gray-100 text-gray-600 cursor-not-allowed"
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-1 text-sm">Blog Name:</label>
          <input
            type="text"
            value={getblog.blogName}
            onChange={(e) =>
              setgetblog({ ...getblog, blogName: e.target.value })
            }
            className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-1 text-sm">Author:</label>
          <input
            type="text"
            value={getblog.author}
            onChange={(e) =>
              setgetblog({ ...getblog, author: e.target.value })
            }
            className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-1 text-sm">Content:</label>
          <input
            type="text"
            value={getblog.content}
            onChange={(e) =>
              setgetblog({ ...getblog, content: e.target.value })
            }
            className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex justify-end gap-4 mt-4">
          <button
            type="button"
            onClick={() => seteditmodal(false)}
            className="bg-gray-400 hover:bg-gray-500 text-white py-2 px-4 rounded-md transition"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  </div>
)}



  {writeModal && (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="w-[90%] sm:w-[60%] bg-white p-6 rounded-xl shadow-lg border border-gray-300">
        <form
          onSubmit={handleWriteSubmit}
          className="flex flex-col gap-4 text-gray-800 font-italic"
        >
          <div className="flex flex-col">
            <label className="mb-1 text-sm">Blog Name:</label>
            <input
              type="text"
              value={newBlog.blogName}
              onChange={(e) => setNewBlog({ ...newBlog, blogName: e.target.value })}
              className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 text-sm">Author:</label>
            <input
              type="text"
              value={newBlog.author}
              onChange={(e) => setNewBlog({ ...newBlog, author: e.target.value })}
              className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 text-sm">Content:</label>
            <textarea
              value={newBlog.content}
              onChange={(e) => setNewBlog({ ...newBlog, content: e.target.value })}
              className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex justify-end gap-4 mt-4">
            <button
              type="button"
              onClick={() => setWriteModal(false)}
              className="bg-gray-400 hover:bg-gray-500 text-white py-2 px-4 rounded-md transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md transition"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  )}
  

  {/*logout modal*/}
  {logout && (
  <div className="absolute top-[33vh] right-2 sm:right-4 md:right-10 bg-white h-[5vh] w-[25vw] sm:w-[30vw] md:w-[15vw] rounded-lg shadow-lg flex items-center justify-center">
   <p className="text-lg sm:text-xl text-black italic cursor-pointer hover:text-2xl transition-all duration-300" onClick={handlelog}>
  Logout
  </p>

  </div>
  )}


     

    </div>
  );
}
