//import from libraries
// react-router-dom
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
// import from files
// components/eventhelpers/io/api
import { sendRequest } from "../oi/Api";

export const DeleteEvent = ({ id }) => {
  const navigate = useNavigate();
  const handleDelete = () => {
    if (window.confirm("Warning! This will delete the event! Are you sure?")) {
      sendRequest("events", "DELETE", null, id)
        .then(() => {
          toast.success("Event has been deleted.", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
            style: {
              width: "400px",
              height: "200px",
              color: "black",
              backgroundColor: " rgb(255, 195, 228)",
              borderRadius: "10px",
            },
          });
          navigate("/events");
        })
        .catch((error) => {
          console.error("Error:", error);
          toast.error("Oops! The event was not deleted. Please try again.", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
            style: {
              width: "400px",
              height: "200px",
              color: "black",
              backgroundColor: " rgb(255, 195, 228)",
              borderRadius: "10px",
            },
          });
        });
    }
  };
  return <button onClick={handleDelete}>Delete event</button>;
};
