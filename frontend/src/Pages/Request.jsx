import React, { useState } from "react";
import "../styles/request.css";
import axios from "axios";

const Request = () => {    
  const [form, setForm] = useState({
    movieName: "",
    year: "",
    quality: "4k",
    email: "",
    info: "",
  });
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.movieName.trim() || !form.email.trim()) {
      setStatus({ type: "error", message: "Please fill required fields." });
      return;
    }

    // Connect to backend DB via API
    axios.post("http://localhost:5000/request", form)
      .then(res => {
        console.log("Request submitted:", res.data);
        setStatus({ type: "success", message: "Request submitted! We'll notify you by email." });
        setForm({ movieName: "", year: "", quality: "1080p", email: "", info: "" });
      })
      .catch(err => {
        console.error("Submission error:", err);
        setStatus({ type: "error", message: "Something went wrong. Please try again later." });
      });

    setTimeout(() => setStatus(null), 6000);
  };

  return (
    <div className="request-page">
      <div className="request-wrapper">
        <section className="request-card">
          <h1>Request a Movie</h1>
          <p className="subtitle">
            Can't find the Tamil movie you're looking for? Fill out the form below to request it, and we'll try to add it to our collection as soon as possible.
          </p>

          <form className="request-form" onSubmit={handleSubmit}>
            <div className="two-cols">
              <label className="field">
                <span>Movie Name *</span>
                <input
                  type="text"
                  name="movieName"
                  value={form.movieName}
                  onChange={handleChange}
                  placeholder="Enter movie title"
                  required
                />
              </label>

              <label className="field">
                <span>Release Year</span>
                <input
                  type="text"
                  name="year"
                  value={form.year}
                  onChange={handleChange}
                  placeholder="e.g. 2024"
                />
              </label>
            </div>

            <div className="two-cols">
              <label className="field">
                <span>Preferred Quality</span>
                <select name="quality" value={form.quality} onChange={handleChange}>
                  <option>4K</option>
                  <option>1080p</option>
                  <option>720p</option>
                  <option>480p</option>                  
                </select>
              </label>

              <label className="field">
                <span>Email Address *</span>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="To notify you when available"
                  required
                />
              </label>
            </div>

            <label className="field full">
              <span>Additional Information</span>
              <textarea
                name="info"
                value={form.info}
                onChange={handleChange}
                placeholder="Any specific language, subtitles, or other details?"
                rows="5"
              />
            </label>

            {status && (
              <div className={`status ${status.type === "error" ? "error" : "success"}`}>
                {status.message}
              </div>
            )}

            <button className="submit-btn" type="submit">Submit Request</button>
          </form>
        </section>

        <section className="faq-card">
          <h2>Frequently Asked Questions</h2>

          <div className="faq">
            <h4>How long does it take to fulfill a request?</h4>
            <p>We typically try to fulfill movie requests within 24–48 hours, depending on the availability of the content.</p>
          </div>

          <div className="faq">
            <h4>Will I be notified when my requested movie is available?</h4>
            <p>Yes, we'll send you an email notification once your requested movie is available for download.</p>
          </div>

          <div className="faq">
            <h4>What if the movie I requested is not available?</h4>
            <p>If we can't find the movie you requested, we'll let you know via email. Sometimes certain movies are difficult to obtain due to licensing or availability issues.</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Request;
