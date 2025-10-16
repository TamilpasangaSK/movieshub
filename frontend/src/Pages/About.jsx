import React, { useState } from "react";
import "../styles/About.css";
import axios from "axios";

const About = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post("http://localhost:5000/about", form)
      .then(res => {
        console.log("Contact form submitted:", res.data);
        alert("Thanks — your message was submitted!");
        setForm({ name: "", email: "", subject: "", message: "" });
      })
      .catch(err => {
        console.error("Submission error:", err);
        alert("Oops! Something went wrong. Please try again later.");
      });
  };

  return (
    <div className="about-page">
      <div className="about-container">
        <section className="about-card">
          <h1>About TamilMoviesHub</h1>
          <p>
            Welcome to <strong>TamilMoviesHub</strong>, your go-to destination for
            high-quality Tamil movie downloads. Since our launch, we’re committed
            to providing movie enthusiasts a seamless and convenient way to
            access their favorite Tamil films.
          </p>

          <h3>Our Mission</h3>
          <p>
            Our mission is to create a user-friendly platform where Tamil movie
            lovers can easily find and download their favorite movies in various
            quality formats. We maintain an extensive collection that caters to
            diverse tastes and preferences, from the latest Tamil releases to
            dubbed Hollywood blockbusters.
          </p>

          <h3>What We Offer</h3>
          <ul>
            <li>High-quality Tamil movies from 720p up to 4K Ultra HD</li>
            <li>Multiple download options and mirrors for each movie</li>
            <li>Dual audio options for international films</li>
            <li>Regular updates with the latest Tamil releases</li>
            <li>User-friendly interface for easy navigation</li>
            <li>Responsive design that works on all devices</li>
          </ul>

          <h3>Our Content Policy</h3>
          <p>
            At TamilMoviesHub, we respect intellectual property rights and only
            provide links to content that is already available on the internet.
            We do not host any content on our servers. We comply with DMCA
            regulations and promptly respond to any legitimate takedown requests
            from copyright holders.
          </p>

          <h3>Community</h3>
          <p>
            We value our community of Tamil movie enthusiasts and welcome feedback
            to improve our service. Join our Telegram channel to stay updated with
            the latest releases and announcements.
          </p>

          <div className="cta-row">
            <a
              className="telegram-btn"
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.open("https://t.me/yourchannel", "_blank");
              }}
            >
              Join Our Telegram Channel
            </a>
          </div>
        </section>

        <section className="contact-card">
          <h2>Contact Us</h2>
          <p className="contact-sub">
            Have questions, feedback, or need assistance? Fill out the form below
            and we'll get back to you as soon as possible.
          </p>

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="row">
              <label>
                <span>Your Name *</span>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                <span>Email Address *</span>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>

            <label className="full">
              <span>Subject *</span>
              <input
                name="subject"
                value={form.subject}
                onChange={handleChange}
                required
              />
            </label>

            <label className="full">
              <span>Your Message *</span>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows="6"
                required
              />
            </label>

            <button className="send-btn" type="submit">Send Message</button>
          </form>

          <div className="other-ways">
            <h4>Other Ways to Reach Us</h4>
            <div className="other-grid">
              <div className="other-block">
                <h5>Email Support</h5>
                <p>For general inquiries:</p>
                <a href="mailto:info@tamilmovieshub.example.com">info@tamilmovieshub.example.com</a>
                <p style={{ marginTop: 8 }}>For technical support:</p>
                <a href="mailto:support@tamilmovieshub.example.com">support@tamilmovieshub.example.com</a>
              </div>

              <div className="other-block">
                <h5>Telegram Channel</h5>
                <p>Join our Telegram channel for quick updates and support.</p>
                <a
                  className="telegram-btn small"
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    window.open("https://t.me/yourchannel", "_blank");
                  }}
                >
                  Join Our Telegram Channel
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
