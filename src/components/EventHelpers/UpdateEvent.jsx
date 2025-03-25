// import from libraries
// react-router-dom
import {
  redirect,
  useLoaderData,
  Form,
  useOutletContext,
} from "react-router-dom";
// react-toastify
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import from file
import { sendRequest } from "../oi/Api";

// send updated data to server
export const action = async ({ request, params }) => {
  const formData = await request.formData();
  const postData = Object.fromEntries(formData);

  try {
    const response = await sendRequest(
      "events",
      "PUT",
      postData,
      params.eventId
    );

    toast.success("Event was updated!", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      style: {
        width: "400px",
        height: "200px",
        color: "black",
        backgroundColor: " rgb(255, 195, 228)",
        borderRadius: "10px",
      },
    });

    return redirect(`/event/${response.id}`);
  } catch (error) {
    console.error("Error:", error);
    toast.error("Error! The event was not updated. Please try again!", {
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
  }

  return null;
};

// events-data from json server
export const loader = async ({ params }) => {
  const event = await sendRequest("events", "GET", null, params.eventId);
  return { event };
};

export const UpdateEvent = () => {
  // get all data
  const { event } = useLoaderData();
  const { users, categories } = useOutletContext();
  // form updating event
  return (
    <>
      <div className="form-container">
        <h1>Update Event</h1>
        <div className="form-field">
          <Form method="PUT" action={`/event/${event.id}/update`}>
            <label>Title:</label>
            <input
              type="text"
              name="title"
              placeholder="Title"
              defaultValue={event.title}
            />
            <label>Description:</label>
            <input
              type="text"
              name="description"
              placeholder="Description"
              defaultValue={event.description}
            />
            <label>Image(URL):</label>
            <input
              placeholder="https://website.com/image.jpg......."
              aria-label="image"
              type="text"
              name="image"
              defaultValue={event.image}
            />
            <label>Location</label>
            <input
              type="text"
              name="location"
              placeholder="Location"
              defaultValue={event.location}
            />
            <label>Select event category:</label>
            <select name="categoryIds" placeholder="Select category">
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
              <option value="default">Select event category:</option>
            </select>
            <label> Starts at:</label>
            <input
              type="datetime-local"
              name="startTime"
              defaultValue={event.startTime}
            />
            <label>Ends at:</label>
            <input
              type="datetime-local"
              name="endTime"
              defaultValue={event.endTime}
            />
            <select name="createdBy" placeholder="Select user">
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
              <option value="default">Choose User</option>
            </select>
            <input type="hidden" name="id" value={event.id} />
            <button type="submit">Save</button>
          </Form>
        </div>
      </div>
    </>
  );
};
