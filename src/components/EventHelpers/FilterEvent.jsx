// import from libraries
// react
import { useEffect } from "react";
// react-router-dom
import { useSearchParams } from "react-router-dom";

export const FilterEvent = ({ filterEvent, setFilterEvent }) => {
  // set url params to filter categories
  const [searchParams, setSearchParams] = useSearchParams();
  const typeFilter = searchParams.get("categoryIds");
  // console.log(typeFilter);

  // to select categories
  useEffect(() => {
    const displayedEvents = typeFilter
      ? filterEvent.filter(
          (event) => event.categoryIds.toLowerCase() === typeFilter
        )
      : filterEvent;

    setFilterEvent(displayedEvents);
  }, [typeFilter, filterEvent, setFilterEvent]);

  // buttons select category
  return (
    <div>
      <button
        onClick={() =>
          setSearchParams(new URLSearchParams({ categoryIds: "1" }))
        }
      >
        Active
      </button>
      <button
        onClick={() =>
          setSearchParams(new URLSearchParams({ categoryIds: "2" }))
        }
      >
        Contest
      </button>
      <button
        onClick={() =>
          setSearchParams(new URLSearchParams({ categoryIds: "3" }))
        }
      >
        Workshop
      </button>
      <button
        onClick={() =>
          setSearchParams(new URLSearchParams({ categoryIds: "4" }))
        }
      >
        Social
      </button>
    </div>
  );
};
