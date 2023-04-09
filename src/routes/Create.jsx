import { useState } from "react";
import Form from "../components/Form";
import { supabase } from "/client";

function Create() {
  const [postInput, setPostInput] = useState({
    event_id: "",
    username: "",
    password: "",
    title: "",
    event_date: "",
    rate: "",
    image: "",
    content: "",
  });
  const [inValidID, setInValidID] = useState(false);

  const handleChange = (e) => {
    const name = e.target.name;
    setPostInput((prev) => {
      return { ...prev, [name]: e.target.value };
    });
  };
  
  const handleSubmit = async () => {
    await supabase.from("EventPost").insert(postInput)
    console.log(postInput);
  };

  return (
    <div>
      <Form value={postInput} onChange={handleChange} onSubmit={handleSubmit} />
    </div>
  );
}

export default Create;
