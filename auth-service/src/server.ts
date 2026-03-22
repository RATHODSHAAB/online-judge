import "dotenv/config";
//Import App 
import app from "./app.js";

const PORT = process.env.PORT || 5001;

//start listening 
//Start a server on port 5000
// and wait for incoming requests
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});