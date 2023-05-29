import { Link } from "react-router-dom";
import supabase from "../config/superbaseClient";

const SmoothieCard = ({ smoothie, onDelete }) => {
  const handleDelete = async () => {
    const { data, error } = await supabase
      .from("smoothies")
      .delete()
      .eq("id", smoothie.id)
      .select();

    if (error) {
      console.log(error);
    }

    if (data) {
      console.log(data);
      onDelete(smoothie.id);
    }
  };

  return (
    <div className="smoothie-card">
      <h3>{smoothie.title}</h3>
      <p>{smoothie.method}</p>
      <div className="rating">{smoothie.rating}</div>
      <div className="buttons">
        {/* This is a Link component from React Router. It's a replacement for <a href="">  
        The 'to' prop tells the Link where to go when clicked. Here, it's using string concatenation to add the id property of the smoothie object to a string containing a single forward slash.
        So, if smoothie.id was 123, the link would go to "/123".*/}
        <Link to={"/" + smoothie.id}>
          <i className="material-icons">edit</i>
          <i className="material-icons" onClick={handleDelete}>
            delete
          </i>
        </Link>
      </div>
    </div>
  );
};

export default SmoothieCard;
