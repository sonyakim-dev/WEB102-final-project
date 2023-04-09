import { useState, useEffect } from "react";
import { supabase } from "/client";

const TM_API_KEY = import.meta.env.VITE_TICKET_MASTER;

function Form({ value, onChange, onSubmit }) {
  const controller = new AbortController();
  const [isValidID, setIsValidID] = useState(false);

  const handleSubmit = async (e) => {
    setIsValidID(false);
    try {
      const json_ = await (
        await fetch(
          `https://app.ticketmaster.com/discovery/v2/attractions/${value.event_id}.json?apikey=${TM_API_KEY}`
        )
      ).json();
      if (!json_) {
        throw new Error(response.status);
      } else {
        await supabase.from("EventPost").insert(value);
        window.location = "/posts";
      }
    } catch (error) {
      console.log("Error happend during handleSubmit() in Create.jsx", error);
      setIsValidID(true);
    }
    // onSubmit();
  };

  useEffect(() => {
    // return () => controller.abort();
  }, [value]);

  return (
    <div className="max-w-4xl p-6 mx-auto bounded-md mt-10">
      {isValidID && (
        <div className="text-sm text-red-600 font-bold">
          * Event ID is invalid
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
        <div>
          <label className="text-black text-sm font-medium" for="username">
            Name
          </label>
          <input
            className="block w-full px-4 py-2 mt-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring"
            type="text"
            id="username"
            name="username"
            value={value.name}
            onChange={onChange}
            // required
          />
        </div>

        <div>
          <label className="text-black text-sm font-medium" for="password">
            Password
          </label>
          <input
            className="block w-full px-4 py-2 mt-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring"
            type="password"
            id="password"
            name="password"
            value={value.password}
            onChange={onChange}
            // required
          />
        </div>

        <div>
          <label className="text-black text-sm font-medium" for="rate">
            Title
          </label>
          <input
            className="block w-full px-4 py-2 mt-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring"
            type="text"
            id="title"
            name="title"
            value={value.title}
            onChange={onChange}
            // required
          />
        </div>

        <div>
          <label className="text-black text-sm font-medium" for="date">
            Event Date
          </label>
          <input
            className="block w-full px-4 py-2 mt-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring"
            type="date"
            id="event_date"
            name="event_date"
            value={value.event_date}
            onChange={onChange}
            // required
          />
        </div>

        <div>
          <label className="text-black text-sm font-medium" for="event_id">
            Event ID
          </label>
          <input
            className="block w-full px-4 py-2 mt-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring"
            type="text"
            id="event_id"
            name="event_id"
            value={value.event_id}
            onChange={onChange}
            required
          />
        </div>

        <div>
          <label className="text-black text-sm font-medium" for="rate">
            Rate
          </label>
          <input
            className="block w-full py-2 mt-2 border focus:outline-none "
            type="range"
            id="rate"
            name="rate"
            min="0"
            max="10"
            value={value.rate}
            onChange={onChange}
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-black">Image</label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-5 border-[1px] border-gray-300 border-dashed rounded-md">
            <div className="space-y-1 text-center">
              <div className="flex text-sm text-gray-600">
                <label
                  for="file-upload"
                  className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                >
                  <svg
                    className="mx-auto h-10 w-10 text-black"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  {/* <span className="">Upload a file</span> */}
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    className="sr-only"
                  />
                </label>
                {/* <p className="pl-1 text-black">or drag and drop</p> */}
              </div>
              {/* <p className="text-xs text-black">PNG, JPG, GIF up to 10MB</p> */}
            </div>
          </div>
        </div>

        <div className="sm:col-span-2">
          <label className="text-black text-sm font-medium" for="story">
            Story
          </label>
          <textarea
            className="block w-full px-4 py-2 mt-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring"
            type="textarea"
            id="content"
            name="content"
            value={value.content}
            onChange={onChange}
          ></textarea>
        </div>
      </div>

      <div className="flex justify-center mt-6">
        <button
          className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-[#867070] rounded-md hover:bg-[#514449] focus:outline-none focus:bg-gray-600"
          onClick={handleSubmit}
        >
          Create
        </button>
      </div>
    </div>
  );
}

export default Form;
