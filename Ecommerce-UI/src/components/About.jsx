import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const About = () => {
  return (
    <div className="about-page container my-5">
      <div className="row">
      <div className="col-md-12">
          {/* About Us Card */}
          <div className="card mb-4">
            <div className="card-body">
              <h1 className="card-title">About Us</h1>
              <p className="card-text">
                Welcome to Easy Ecommerce, where local makers meet community support.
              </p>
              <p className="card-text">
                At Easy Ecommerce, we’re all about connecting people with amazing, handcrafted products made by local artisans and small business owners. We’re passionate about helping you find those special, one-of-a-kind items that you can’t get anywhere else—whether it’s a unique gift, a piece of art that speaks to you, or something to make your home feel a little more, well, *you*.
              </p>
            </div>
          </div>

          {/* Our Mission Card */}
          <div className="card mb-4">
            <div className="card-body">
              <h2 className="card-title">Our Mission</h2>
              <p className="card-text">
                We’re here to make it easier for small businesses and artisans to reach people who appreciate quality and craftsmanship. We believe that by supporting local makers, we’re helping to build a stronger, more vibrant community. And, at the end of the day, that’s what it’s all about.
              </p>
            </div>
          </div>

          {/* Why Shop With Us Card */}
          <div className="card mb-4">
            <div className="card-body">
              <h2 className="card-title">Why Shop With Us?</h2>
              <p className="card-text">
                <b>Support Local Businesses:</b> When you shop with us, you’re helping small businesses grow and thrive right here in your community.
              </p>
              <p className="card-text">
                <b>Safe & Secure:</b> We take your privacy seriously, using top-notch security measures to keep your personal information safe.
              </p>
            </div>
          </div>

          {/* Our Story Card */}
          <div className="card mb-4">
            <div className="card-body">
              <h2 className="card-title">Our Story</h2>
              <p className="card-text">
                Easy Ecommerce was started by a group of students who wanted to make a difference in the way people shop. We saw how tough it can be for small creators to stand out, so we set out to create a space where they could shine. What started as a simple idea will grow into a community of makers and buyers who all share a love for quality products.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
