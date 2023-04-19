import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import Card from "../components/Card";
import Loading from "../components/Loading";

const TM_API_KEY = import.meta.env.VITE_TICKET_MASTER;

function Home() {
  const controller = new AbortController();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [events, setEvents] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const fetchEvents = async (input = "") => {
    setIsError(false);
    setIsLoading(true);
    try {
      const keyword = input ? "keyword=" + input : "";
      const response = await fetch(
        `https://app.ticketmaster.com/discovery/v2/attractions?${keyword}&apikey=${TM_API_KEY}`
      );
      const json = await response.json();
      if (json?._embedded?.attractions) {
        setEvents((prev) => json._embedded.attractions);
        setIsLoading(false);
      } else throw new Error(response.status);
    } catch (error) {
      console.log(
        "Error happend during fetchEvents() in Home.jsx.\
         Possibily entered a wrong keyword input.",
        error
      );
      setIsError(true);
      setSearchInput("");
    }
  };
  useEffect(() => {
    fetchEvents();
    return () => controller.abort();
  }, []);

  return (
    <div className="container mx-auto flex flex-col items-center">
      <div className="flex flex-row m-2">
        <input
          className="text-xs m-1 py-1 px-4 rounded-full border focus:outline-none focus:border-gray-400"
          type="text"
          placeholder="Search by keyword"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && fetchEvents(searchInput)}
        />
        <button
          className="bg-gray-100 rounded-full m-1 hover:bg-gray-500"
          onClick={() => fetchEvents(searchInput)}
        >
          <FiSearch style={{color: "black"}}/>
        </button>
      </div>
      {isError ? (
        <div className="text-xs font-bold text-red-600">
          * Wrong keyword. Enter again.
        </div>
      ) : null}

      {isLoading ? (
        <Loading />
      ) : (
        <div className="flex flex-row flex-wrap justify-center">
          {events.map((event) => (
            <Link to={`/event/${event.id}`} key={event.id}>
              <Card
                id={event.id}
                name={event.name}
                image={event.images[0].url}
                segment={event.classifications[0].segment?.name}
                genre={event.classifications[0].genre?.name}
                subgenre={event.classifications[0].subGenre?.name}
              />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
