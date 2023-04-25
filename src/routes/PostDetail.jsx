import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { FcLike } from "react-icons/Fc";
import { supabase } from "/client";
import { Modal, Box } from "@mui/material";
import { BsSendFill } from "react-icons/Bs";
import Loading from "../components/Loading";

function PostDetail() {
  const controller = new AbortController();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [userPost, setUserPost] = useState([]);
  const [comment, setComment] = useState("");
  const [open, setOpen] = useState(false);
  const [inputPassword, setInputPassword] = useState("");
  const [isPasswordCorrect, setIsPasswordCorrect] = useState(true);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };

  const handleClose = () => {
    setInputPassword("");
    setIsPasswordCorrect(true);
    setOpen(false);
  };

  const handleLike = async () => {
    await supabase
      .from("EventPost")
      .update({ likes: userPost.likes + 1 })
      .eq("id", id);
    setUserPost((prev) => {
      return { ...prev, likes: prev.likes + 1 };
    });
  };

  const handleDelete = async () => {
    if (inputPassword == userPost.password) {
      await supabase.from("EventPost").delete().eq("id", id);
      window.location = "/posts";
    } else {
      setIsPasswordCorrect(false);
    }
  };

  const handleComment = async () => {
    await supabase
      .from("EventPost")
      .update([{ comments: userPost.comments.concat([comment]) }])
      .eq("id", id);
    setUserPost((prev) => {
      return { ...prev, comments: prev.comments.concat([comment]) };
    });
    setComment("");
  };

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
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="container mx-auto flex flex-col items-center">
          <p>User: {userPost.username}</p>
          <p>Created At: {userPost.created_at.slice(0, 10)}</p>
          <br />
          <h1>{userPost.title}</h1>
          <p>Event Date: {userPost.event_date}</p>
          <p>Rate: {"👍🏻".repeat(userPost.rate)}</p>

          <div className="pt-2 inline-flex items-center" onClick={handleLike}>
            <span className="mr-2">
              <FcLike />
            </span>
            <span className="font-bold">{userPost.likes}</span>
          </div>
          <br />

          <img src={userPost.image} />
          <p className="mx-5 mb-3 mt-1">{userPost.content}</p>

          <div>
            <Link to={`/posts/detail/edit/${id}`}>
              <button className="m-1 px-5 py-2 bg-[#867070] rounded-md text-white">
                Edit
              </button>
            </Link>
            <button
              className="m-1 px-5 py-2 bg-[#cf7b7b] rounded-md text-white"
              onClick={() => setOpen(true)}
            >
              Delete
            </button>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="child-modal-title"
              aria-describedby="child-modal-description"
            >
              <Box sx={{ ...style, width: 230 }}>
                <h2>Enter Password</h2>
                <input
                  className="text-xs py-1 px-2 border focus:outline-none focus:border-gray-400 my-1"
                  type="text"
                  onChange={(e) => setInputPassword(e.target.value)}
                />
                {!isPasswordCorrect && (
                  <p className="text-xs font-bold text-red-600 h-1">
                    Incorrect Password
                  </p>
                )}
                <br />
                <button className="text-sm mr-2" onClick={handleDelete}>
                  Enter
                </button>
                <button className="text-sm mr-2" onClick={handleClose}>
                  Close
                </button>
              </Box>
            </Modal>
          </div>
          <br />

          <div className="relative flex flex-row items-center mb-2">
            <input
              className="pt-2 pb-2 pl-3 h-11 max-w-[500px] bg-slate-100 rounded-lg placeholder:text-slate-600 font-medium pr-20"
              type="text"
              id="comment"
              name="comment"
              placeholder="Write a comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleComment()}
            />
            <div
              className="ml-2 cursor-pointer hover:scale-125 ease-in-out origin-center"
              onClick={handleComment}
            >
              <BsSendFill />
            </div>
          </div>

          {userPost.comments &&
            userPost.comments.map((cmt, i) => (
              <div key={i}>
                <p>{cmt}</p>
                <hr className="border-b-[0.2px]"/>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

export default PostDetail;
