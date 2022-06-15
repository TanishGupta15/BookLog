import React from "react";
import "./css/chooseUs.css";

function ChooseUs() {
  return (
    <div className="choose-us-section">
      <div className="texts-section">
        <div className="heading">
          <p>Why Choose us</p>
          <div className="underline"></div>
        </div>

        <div className="features">
          <div className="first-feature">
            <p className="feature-heading">Feature 1</p>
            <p className="feature-description">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cursus
              nec at feugiat adipiscing lacus sollicitudin commodo duis ut.
              Ullamcorper purus lectus id egestas orci vitae lectus. Orci nec
              tortor vitae sapien ut suscipit viverra.
            </p>
          </div>

          <div className="second-feature">
            <p className="feature-heading">Feature 2</p>
            <p className="feature-description">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cursus
              nec at feugiat adipiscing lacus sollicitudin commodo duis ut.
              Ullamcorper purus lectus id egestas orci vitae lectus. Orci nec
              tortor vitae sapien ut suscipit viverra.
            </p>
          </div>
        </div>
      </div>

      <div className="card">
          <div className="card-text-section">
              <p className="quote-of-day">Quote of the day</p>
              <p className="author">Random Author </p>
          </div>

          <button>Know More</button>
      </div>
    </div>
  );
}

export default ChooseUs;
