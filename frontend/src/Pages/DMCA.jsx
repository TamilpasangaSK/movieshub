import React from "react";
import "../styles/dmca.css";

const DMCA = () => {
  return (
    <div className="dmca-container">
      <h1>DMCA Policy</h1>
      <p>
        <strong>TamilMoviesHub</strong> respects the intellectual property rights
        of others and complies with the provisions of the Digital Millennium
        Copyright Act (DMCA). We expect our users to do the same.
      </p>

      <h2>Content Disclaimer</h2>
      <p>
        TamilMoviesHub does not host any copyrighted content on its servers.
        All the files, videos, and links shared on this site are found from
        third-party websites available publicly on the internet. We do not
        upload, store, or distribute copyrighted material directly.
      </p>

      <h2>DMCA Notice Procedure</h2>
      <p>
        If you are the copyright owner (or authorized to act on behalf of one)
        and believe that your copyrighted work has been infringed on our
        website, please send us a DMCA takedown notice with the following
        details:
      </p>
      <ul>
        <li>Your full name, company (if applicable), and contact information (email address is mandatory).</li>
        <li>A description of the copyrighted work you claim has been infringed.</li>
        <li>The exact URLs of the infringing material on TamilMoviesHub.</li>
        <li>A statement that you have a good faith belief that the disputed use is not authorized by you, your agent, or the law.</li>
        <li>A statement, under penalty of perjury, that the information you provided is accurate and that you are the copyright owner or authorized to act on their behalf.</li>
        <li>Your physical or electronic signature.</li>
      </ul>

      <h2>Send DMCA Notice To:</h2>
      <p>
        <strong>Email:</strong> admin@tamilmovieshub.com <br />
        (This is a sample email address — replace with your actual contact email.)
      </p>

      <h2>Important Notes</h2>
      <ul>
        <li>We only process valid DMCA notices that include all the required information above.</li>
        <li>False or misleading claims may result in legal consequences.</li>
        <li>Once we receive a valid DMCA request, we will remove the infringing content or link within 24–48 hours.</li>
      </ul>

      <p>
        By using TamilMoviesHub, you agree to these terms and acknowledge that
        we are not responsible for content hosted on third-party websites.
      </p>
    </div>
  );
};

export default DMCA;
