// import from libraries
// react-router-dom
import { redirect, Form, useOutletContext } from "react-router-dom";
// react-toastify
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import from files
// components/oi/Api
import { sendRequest } from "../oi/Api";

// send data to server
export const action = async ({ request }) => {
  const formData = await request.formData();
  const postData = Object.fromEntries(formData);

  try {
    const response = await sendRequest("events", "POST", postData);

    toast.success("Event succesfully created!", {
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

    return redirect(`/event/${response.id}`);
  } catch (error) {
    console.error("Error:", error);
    toast.error("The event was not created, please try again.", {
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

// users and categories from json server
export const NewEvent = () => {
  // to use users and categories from jsonserver
  const { users, categories } = useOutletContext();
  //console.log(users, categories);

  // form creating new event
  return (
    <section className="form-container">
      <h1>Create New Event</h1>

      <section className="form-field">
        <Form method="post" id="new-event-form" action="/event/new">
          <label>Title:</label>
          <input type="text" name="title" placeholder="Title" />
          <label>Description:</label>
          <input type="text" name="description" placeholder="Description" />
          <label>Image(URL):</label>
          <input
            placeholder="https://website.com/image.jpg......."
            aria-label="image"
            type="text"
            name="image"
          />
          <label>Location</label>
          <input type="text" name="location" placeholder="Location" />
          <label>Select event category:</label>
          <select name="categoryIds" placeholder="Select event category">
            <option value="default">Select event category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          <label> Starts at:</label>
          <input type="datetime-local" name="startTime" />
          <label>Ends at:</label>
          <input type="datetime-local" name="endTime" />
          <label>Select User</label>
          <select name="createdBy" placeholder="Select user">
            <option value="default">Choose an User</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          <button className="form-btn" type="submit">
            Save
          </button>
        </Form>
      </section>
    </section>
  );
};
