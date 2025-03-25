const ROOT_URL = "http://localhost:3000/";
// request to json server
export const sendRequest = async (endpoint, method, data = null, id = null) => {
  const url = id ? `${ROOT_URL}${endpoint}/${id}` : `${ROOT_URL}${endpoint}`;

  const options = {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (data) {
    options.body = JSON.stringify(data);
  }

  const response = await fetch(url, options);

  // Simulating error unable to delete event
  /* if (method === "DELETE") {
    throw new Error("Simulated error");
  }

  // Simulating error unable to add new event
  if (method === "POST") {
    throw new Error("Simulated error");
  }

  // Simulating error unable to update event
  if (method === "PUT") {
    throw new Error("Simulated error");
  }
    */

  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(errorMessage);
  }

  const responseData = await response.json();

  return responseData;
};
