// import form libraries
// react-icons
import { FaSistrix } from "react-icons/fa";

// search events
export const SearchEvent = ({ setFilterEvent }) => {
  // get the data from search
  const matchEvents = async (filterEvent) => {
    const matchedEvent = await fetch(
      `http://localhost:3000/events?q=${filterEvent}`
    );
    return { event: await matchedEvent.json() };
  };

  // function search for data
  const handleSearchEvent = (e) => {
    const searchEvent = e.target.value;
    matchEvents(searchEvent).then(({ event }) => {
      setFilterEvent(event);
    });
  };
  // return search data
  return (
    <section className="searchfield">
      <input onChange={handleSearchEvent} placeholder="search for events" />
      <FaSistrix />
    </section>
  );
};
