import { useState, useEffect } from "react";
import { supabase } from "/client";
import Loading from "../components/Loading";

function Posts() {
  const [isLoading, setIsLoading] = useState(true);
  const [userPost, setUserPost] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const {data, error} = await supabase.from("EventPost").select()
      setUserPost(data)
      setIsLoading(false);
    }

    return () => {
    }
  }, []);
  

  return <div className="">{isLoading ? <Loading /> : <div></div>}</div>;
}

export default Posts;
