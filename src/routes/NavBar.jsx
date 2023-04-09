import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { MdCreate } from "react-icons/Md";

function NavBar() {
  // const left_link = "pr-5";

  return (
    <div className="">
      <div className="container mx-auto">
        <nav className="flex justify-between items-center px-10 py-5 w-full">
          <div id="nav_left" className="">
            <Link to="/" className="font-bold pr-5">
              Eventgram
            </Link>
            <Link to="/posts">Posts</Link>
          </div>

          <div id="nav_right">
            <Link className="px-5 py-3 bg-[#867070] rounded-md text-white" to="/create">
              <MdCreate className="inline text-lg"/>
            </Link>
          </div>
        </nav>
      </div>
      <Outlet />
    </div>
  );
}

export default NavBar;
