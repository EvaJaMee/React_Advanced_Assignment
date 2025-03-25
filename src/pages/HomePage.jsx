// import from libraries
import React from "react";
// react-router-dom
import { Link } from "react-router-dom";
// import local image
import homepageGreetingImage from "../images/Homepage_Greeting.jpg";

export const HomePage = () => {
  return (
    <section className="home-page-container">
      <Link to="/events">
        <article className="homepage-article">
          <img
            src={homepageGreetingImage}
            alt="Girls wearing Japanese Fashion"
          />
          <p>
            Fan of Japanese Fashion? Make-up? Skin-care? Hairstyles? Then you
            arrived at the right place! Here, you will find all upcoming events
            related to Japanese Fashion. From Fashion Shows to Make-up
            tutorials, you will find everything here. Get together and stay
            updated with the latest trends in Japanese Fashion with other fans!
            <br></br>
            <br></br>
            Enter to see what events we have!
          </p>
        </article>
      </Link>
    </section>
  );
};
