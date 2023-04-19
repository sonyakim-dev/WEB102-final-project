import { useState, useEffect } from "react";

function Form({ value, onChange, children }) {

  useEffect(() => {
  }, [value]);

  return (
    <div className="max-w-4xl p-6 mx-auto bounded-md mt-10">
      <form>
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
              value={value.username}
              onChange={onChange}
              required
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
              required
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
              required
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
            <label className="block text-sm font-medium text-black">
              Image URL
            </label>
            <input
              className="block w-full px-4 py-2 mt-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring"
              type="text"
              id="image"
              name="image"
              value={value.image}
              onChange={onChange}
            />
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
              required
            ></textarea>
          </div>
        </div>
        {children}
      </form>
    </div>
  );
}

export default Form;
