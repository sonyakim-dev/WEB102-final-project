import { useState } from "react";
import { supabase } from "/client";
import Form from "../components/Form";
import validation from "../components/validation";

const TM_API_KEY = import.meta.env.VITE_TICKET_MASTER;

function Create() {
  const [postInput, setPostInput] = useState({
    event_id: "",
    username: "",
    password: "",
    title: "",
    event_date: "2023-01-01",
    image: "",
    rate:"10",
    comments: [],
  });
  const [isValidID, setIsValidID] = useState(true);

  const handleChange = (e) => {
    const name = e.target.name;
    setPostInput((prev) => {
      return { ...prev, [name]: e.target.value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!validation(postInput)) {
        throw new Error("Invalid Input");
      }

      const json_ = await (
        await fetch(
          `https://app.ticketmaster.com/discovery/v2/attractions/${postInput.event_id}.json?apikey=${TM_API_KEY}`
        )
      ).json();
      if (!json_) {
        throw new Error(response.status);
      } else {
        await supabase
          .from("EventPost")
          .insert({ ...postInput, event_name: json_.name, image: json_.images[0]?.url });
        window.location = "/posts";
      }
    } catch (error) {
      console.log("Error happend during handleSubmit() in Create.jsx", error);
      setIsValidID(false);
    }
  };

  return (
    <div className="container mx-auto">
      <Form value={postInput} onChange={handleChange}>
        <div className="flex flex-col justify-center items-center mt-6">
          <input
            className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-[#867070] rounded-md hover:bg-[#514449] focus:outline-none focus:bg-gray-600"
            type="submit"
            value="Create"
            onClick={handleSubmit}
          />
          {!isValidID && (
            <div className="text-sm text-red-600 font-bold">
              * Empty input or Invalid Event ID
            </div>
          )}
        </div>
      </Form>
    </div>
  );
}

export default Create;
