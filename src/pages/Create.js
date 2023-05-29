// Import necessary libraries and components from React, React Router, and local Supabase configuration.
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../config/superbaseClient";

// Define the Create functional component.
const Create = () => {
  // useNavigate is a hook from 'react-router-dom' that returns a function for navigation.
  const navigate = useNavigate();

  // Initialize useState hooks for managing form fields and form error messages.
  const [title, setTitle] = useState("");
  const [method, setMethod] = useState("");
  const [rating, setRating] = useState("");
  const [formError, setFormError] = useState(null);

  // Define the handleSubmit function which is executed when the form is submitted.
  const handleSubmit = async (e) => {
    // Prevents the page from reloading when the form is submitted.
    e.preventDefault();

    // Validation check: If any of the form fields are empty, set an error message and stop execution.
    if (!title || !method || !rating) {
      setFormError("Please fill in all the fields correctly");
      return;
    }

    // Insert the new smoothie into the 'smoothies' table in the database.
    // The .insert() method takes an array of objects to insert.
    // We are also using .select() to get all columns in the inserted row returned by the query.
    const { data, error } = await supabase
      .from("smoothies")
      .insert([{ title, method, rating }])
      .select();

    // If there's an error in the insertion process, log the error to the console and set a form error.
    if (error) {
      console.log(error);
      setFormError("Please fill in all the fields correctly");
    }

    // If the insertion is successful, log the data to the console, clear any form errors, and navigate to the homepage.
    if (data) {
      console.log(data);
      setFormError(null);
      navigate("/");
    }
  };

  // Render the component: a form for creating a new smoothie.
  return (
    <div className="page create">
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          // Update the 'title' state every time the user types into the Title field.
          onChange={(e) => setTitle(e.target.value)}
        />

        <label htmlFor="method">Method:</label>
        <textarea
          id="method"
          value={method}
          // Update the 'method' state every time the user types into the Method field.
          onChange={(e) => setMethod(e.target.value)}
        />

        <label htmlFor="rating">Rating:</label>
        <input
          type="number"
          id="rating"
          value={rating}
          // Update the 'rating' state every time the user types into the Rating field.
          onChange={(e) => setRating(e.target.value)}
        />

        <button>Create Smoothie Recipe</button>

        {/* If there's a form error, display it */}
        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  );
};

// Export the Create component to be used in other parts of the application.
export default Create;
