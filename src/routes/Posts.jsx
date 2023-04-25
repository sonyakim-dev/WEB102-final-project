import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "/client";
import { FiSearch } from "react-icons/fi";
import Loading from "../components/Loading";
import PostCard from "../components/PostCard";
import PostDetail from "./PostDetail";

function Posts() {
  const [isLoading, setIsLoading] = useState(true);
  const [userPost, setUserPost] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  // const handleSearch = () => {
  //   setUserPost((post) => post.filter((prev) => prev.title.includes(searchInput)))
  // }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase
          .from("EventPost")
          .select()
          .order("created_at", { ascending: true });
        setUserPost(data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
    return () => {};
  }, []);

  return (
    <div className="container mx-auto">
      {isLoading ? (
        <Loading />
      ) : (
        <div className="flex flex-col items-center">
          <div className="flex flex-row m-2">
            <input
              className="text-xs m-1 py-1 px-4 h-10 rounded-full border focus:outline-none focus:border-gray-400"
              type="text"
              placeholder="Search by title"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
          </div>
          <br/>
          <div className="box-border max-w-7xl mx-4 sm:columns-1 md:columns-2 lg:columns-3 xl:columns-4">
            {userPost
              .filter((prev) =>
                prev.title.toLowerCase().includes(searchInput.toLowerCase())
              )
              .map((post) => (
                <PostCard data={post} key={post.id} />
              ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Posts;
