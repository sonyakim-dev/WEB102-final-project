import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FcLike } from "react-icons/Fc";

const TM_API_KEY = import.meta.env.VITE_TICKET_MASTER;

function PostCard({ data }) {
  return (
    <div className="relative max-w-xs rounded overflow-hidden shadow-lg mx-2 my-5 bg-[#e3d6d6] p-5">
      <Link to={`/posts/detail/${data.id}`}>
        <div className="flex flex-col">
          <div className="flex flex-row items-center">
            <div className="inline-block mr-3" href="#">
              {data.username}
            </div>
            <div className="text-slate-500">{data.event_date}</div>
          </div>
          <div className="text-lg font-extrabold text-[#573d3d]">
            {data.event_name}
          </div>
        </div>
        <h2 className="text-3xl font-extrabold">{data.title}</h2>
        <img className="py-4 max-w-full rounded-br-lg" src={data.image} />
      </Link>
      <p className="">{data.content}</p>

      {/* <div className="pt-2">
        <a className="inline-flex items-center" href="#">
          <span className="mr-2">
            <FcLike />
          </span>
          <span className="font-bold">{data.likes}</span>
        </a>
      </div> */}
    </div>
  );
}

export default PostCard;
