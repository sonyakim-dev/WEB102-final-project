import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "/client";
import Form from "../components/Form";
import Loading from "../components/Loading";
import validation from "../components/validation";

const TM_API_KEY = import.meta.env.VITE_TICKET_MASTER;

function EditPost() {
  const controller = new AbortController();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [userPost, setUserPost] = useState([]);
  const [isValidID, setIsValidID] = useState(true);

  const handleChange = (e) => {
    const name = e.target.name;
    setUserPost((prev) => {
      return { ...prev, [name]: e.target.value };
    });
  };

  const handleSubmit = async (e) => {
    console.log("A")
    e.preventDefault();
    try {
      if (!validation(userPost)) {
        throw new Error("Invalid Input");
      }

      const json_ = await (
        await fetch(
          `https://app.ticketmaster.com/discovery/v2/attractions/${userPost.event_id}.json?apikey=${TM_API_KEY}`
        )
      ).json();
      if (!json_) {
        throw new Error(response.status);
      } else {
        await supabase
          .from("EventPost")
          .update({ ...userPost, event_name: json_.name }).eq("id", id);
        window.location = "/posts";
      }
    } catch (error) {
      console.log("Error happend during handleSubmit() in Create.jsx", error);
      setIsValidID(false);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase
          .from("EventPost")
          .select()
          .eq("id", id);
        setUserPost(data[0]);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
    return () => controller.abort();
  }, []);

  return (
    <div className="EditPost">
      {isLoading ? (
        <Loading />
      ) : (
        <Form value={userPost} onChange={handleChange}>
          <div className="flex flex-col justify-center items-center mt-6">
            <input
              className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-[#867070] rounded-md hover:bg-[#514449] focus:outline-none focus:bg-gray-600"
              type="submit"
              value="Update"
              onClick={handleSubmit}
            />
            {!isValidID && (
              <div className="text-sm text-red-600 font-bold">
                * Empty input or Invalid Event ID
              </div>
            )}
          </div>
        </Form>
      )}
    </div>
  );
}

export default EditPost;
