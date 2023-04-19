import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/Io";
import Loading from "../components/Loading";

const TM_API_KEY = import.meta.env.VITE_TICKET_MASTER;

function Event() {
  const { id } = useParams();
  const controller = new AbortController();
  const [isLoading, setIsLoading] = useState(true);
  const [eventDetail, setEventDetail] = useState();

  const fetchEvent = async () => {
    try {
      const response = await fetch(
        `https://app.ticketmaster.com/discovery/v2/attractions/${id}.json?apikey=${TM_API_KEY}`
      );
      if (!response.ok) {
        throw new Error(response.status);
      }
      const json = await response.json();
      setEventDetail(json);
      setIsLoading(false);
    } catch (error) {
      console.log("Error happend during fetchEvents() in Home.jsx", error);
    }
  };

  useEffect(() => {
    fetchEvent();
    return () => controller.abort();
  }, []);

  return (
    <div className="container mx-auto">
      {isLoading ? (
        <Loading />
      ) : (
        <div className="relative flex flex-col items-center">
          {/* <IoIosArrowBack
            className="left-0 absolute text-[30px] cursor-pointer"
            onClick={() => history.push("/")}
          /> */}
          <h1 className="font-bold m-10">{eventDetail.name}</h1>
          <img className="w-full" src={eventDetail.images[0].url} />
          <br />
          <h2>ID: {eventDetail.id}</h2>
          <div className="">
            {eventDetail?.externalLinks?.youtube && (
              <a
                href={eventDetail.externalLinks.youtube[0].url}
                target="_blank"
              >
                <button className="m-2 text-white">Youtube</button>
              </a>
            )}
            {eventDetail?.externalLinks?.homepage && (
              <a
                href={eventDetail.externalLinks.homepage[0].url}
                target="_blank"
              >
                <button className="m-2 text-white">Website</button>
              </a>
            )}
          </div>
          <a href={eventDetail.url} target="_blank">
            <button className="bg-gradient-to-r from-[#002FA3] to-[#106FDB] text-white m-2">
              Get Ticket
            </button>
          </a>
        </div>
      )}
    </div>
  );
}

export default Event;
