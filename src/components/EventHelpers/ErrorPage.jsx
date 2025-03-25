// import from libraries
import { Link, useRouteError } from "react-router-dom";
// import from files

export const ErrorPage = () => {
  const error = useRouteError();
  console.log(error);

  return (
    <section className="error-page">
      <section className="error-container">
        <h1>Oops!</h1>
        <p>
          Something went wrong...<br></br> Please try again later.
        </p>
        <Link to="/events">
          <button>Back to Events</button>
        </Link>
      </section>
    </section>
  );
};
