import axios from "axios";

let url;

if (process.env.NODE_ENV === "production") {
  url = "https://oinvb9t9nh.execute-api.us-east-1.amazonaws.com/api/v1";
} else {
  // Use the local server URL when in development
  url = "http://localhost:5000/api/v1"; // Change this to your local server's URL
}

export default axios.create({
  baseURL: url,
});

export { url };
