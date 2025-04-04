// import from libraries
// react
import { useState } from "react";
// react-router-dom
import { Link, useLoaderData, useOutletContext } from "react-router-dom";
// import from file
// component/EventHelpers
import { SearchEvent } from "../components/EventHelpers/SearchEvent";
import { SortEvent } from "../components/EventHelpers/SortEvent";
import { FilterEvent } from "../components/EventHelpers/FilterEvent";
// components/oi/api
import { sendRequest } from "../components/oi/Api";

// data json server
export const loader = async () => {
  const events = await sendRequest("events", "GET", null);
  return { events };
};

export const EventsPage = () => {
  // display events
  const { events } = useLoaderData();
  const { categories } = useOutletContext();
  // show data
  const [filterEvent, setFilterEvent] = useState(events);
  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
  // data pagination
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedEvents = filterEvent.slice(startIndex, endIndex);
  // calculate data pagination
  const totalPages = Math.ceil(filterEvent.length / itemsPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
  // handle next prev page buttons
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  // show page numbers
  const renderPageNumbers = pageNumbers.map((pageNumber, index) => {
    if (
      pageNumber === 1 || // Always show first page
      pageNumber === totalPages || // Always show last page
      (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1) // Show current page and 2 adjacent pages
    ) {
      return (
        <span
          key={index}
          className={pageNumber === currentPage ? "active" : ""}
          onClick={() => handlePageChange(pageNumber)}
        >
          {pageNumber}
        </span>
      );
    } else if (
      pageNumber === currentPage - 2 || // Show first '...' if more than 2 pages between current pages
      pageNumber === currentPage + 2 // Show last '...' if more than 2 pages between current pages
    ) {
      return <span key={index}>. . .</span>;
    } else {
      return null; // Return null for other page numbers
    }
  });

  // display events
  return (
    <section className="card-page-container">
      <section className="header-container">
        <section className="sort-search-container">
          <SearchEvent setFilterEvent={setFilterEvent} />
          <SortEvent events={filterEvent} setFilterEvent={setFilterEvent} />
        </section>
        <section className="filter-container">
          <FilterEvent filterEvent={events} setFilterEvent={setFilterEvent} />
        </section>
        <section className="events-title">
          <h1>Upcoming Events:</h1>
        </section>
      </section>
      {displayedEvents ? (
        <section className="card-container">
          {displayedEvents.map((event) => (
            <article className="card" key={event.id}>
              <Link to={`/event/${event.id}`}>
                <section className="card-header">
                  <h1>{event.title}</h1>
                  <h3>Location: {event.location}</h3>
                  <p>
                    {event.description.slice(0, 20)}
                    {event.description.length > 20 ? "....." : ""}
                  </p>
                </section>

                <section className="card-body">
                  <section className="events-image-container">
                    <img
                      src={event.image}
                      alt={event.title}
                      style={{ objectFit: "cover" }}
                    />
                  </section>

                  <section className="card-body-items">
                    <section className="time-container">
                      <section className="time-display">
                        <p>Start Date: </p>
                        <p>
                          {new Date(event.startTime).toLocaleDateString([], {
                            year: "numeric",
                            month: "numeric",
                            day: "2-digit",
                          })}
                        </p>
                      </section>
                      <section className="time-display">
                        <p>Time: </p>
                        <p>
                          {new Date(event.startTime).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </section>
                      <section className="time-display">
                        <p>Ends Date:</p>
                        <p>
                          {new Date(event.endTime).toLocaleDateString([], {
                            year: "numeric",
                            month: "numeric",
                            day: "2-digit",
                          })}
                        </p>
                      </section>
                      <section className="time-display">
                        <p>Time:</p>
                        <p>
                          {new Date(event.endTime).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </section>
                    </section>
                    <section>
                      {categories.map((category) =>
                        event.categoryIds?.includes(category.id) ? (
                          <div key={category.id}>
                            <p>Event category: {category.name}</p>
                          </div>
                        ) : null
                      )}
                    </section>
                  </section>
                </section>
              </Link>
            </article>
          ))}
        </section>
      ) : null}

      {/* Pagination controls */}
      <div className="pagination">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Prev
        </button>

        {renderPageNumbers}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={endIndex >= filterEvent.length}
        >
          Next
        </button>
      </div>
    </section>
  );
};
