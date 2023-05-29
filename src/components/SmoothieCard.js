// Import Link from 'react-router-dom' to handle routing in our React application.
import { Link } from "react-router-dom";

// Import supabase client from local configuration file.
// Supabase is an open source Firebase alternative.
import supabase from "../config/superbaseClient";

// Define the SmoothieCard functional component. It takes 'smoothie' and 'onDelete' as props.
const SmoothieCard = ({ smoothie, onDelete }) => {
  // This function is responsible for deleting a smoothie. It's asynchronous because it needs to wait for the server response.
  const handleDelete = async () => {
    // Delete a smoothie from the 'smoothies' table in the database, where the smoothie's id matches the id passed to the function.
    // It also selects all columns (with the .select() method) in the deleted rows to be returned by the query.
    const { data, error } = await supabase
      .from("smoothies")
      .delete()
      .eq("id", smoothie.id)
      .select();

    // If there's an error in the deletion process, log the error to the console.
    if (error) {
      console.log(error);
    }

    // If the deletion is successful, log the data to the console and call the onDelete function passed as a prop to the component, passing it the id of the deleted smoothie.
    if (data) {
      console.log(data);
      onDelete(smoothie.id);
    }
  };

  // Render the component. Each smoothie's information is displayed, along with buttons to edit and delete the smoothie.
  return (
    <div className="smoothie-card">
      <h3>{smoothie.title}</h3> {/* Display the smoothie's title */}
      <p>{smoothie.method}</p> {/* Display the smoothie's method */}
      <div className="rating">{smoothie.rating}</div>{" "}
      {/* Display the smoothie's rating */}
      {/* Render the Edit and Delete buttons */}
      <div className="buttons">
        {/* When the Edit icon is clicked, the user is navigated to a new page (specified by the URL, which includes the id of the smoothie) */}
        <Link to={"/" + smoothie.id}>
          <i className="material-icons">edit</i>

          {/* When the Delete icon is clicked, the handleDelete function is called, which deletes the smoothie */}
          <i className="material-icons" onClick={handleDelete}>
            delete
          </i>
        </Link>
      </div>
    </div>
  );
};

// Export the SmoothieCard component to be used in other parts of the application.
export default SmoothieCard;
