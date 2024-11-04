import React from 'react';
import '../styles/Resume.css';

const Resume = () => {
  return (
    <div className="resume-container">
      <h1>Resume</h1>
      <div className="resume-content">
        {/* Work Experience Section */}
        <div className="resume-section">
          <div className="resume-entry">
            <div className="entry-title">Work Experience</div>
          </div>
          <div className="resume-details">
            <div className="entry-title">
              <strong>Backend Developer</strong><br />
              CleverAds, Madrid<br />
              <em>Ruby | Ruby on Rails | JavaScript | Node.js</em>
            </div>
            <div className="entry-date">September 2022 – October 2024</div>
            <ul>
              <li>Developed and maintained CleverAds’ backend application using Ruby on Rails, creating an online advertising platform, enabling users to create, optimize, and manage ad campaigns.</li>
              <li>Developed background Workers using Sidekiq to preemptively deal with issues or create additional sales.</li>
              <li>Implemented test-driven development (TDD) practices with RSpec, created unit tests for Models, Controllers, Services, and Workers, increasing test coverage by over 30%.</li>
              <li>Transitioned Ruby on Rails project from MySQL and DBeaver relational database to non-relational database MongoDB and MongoDB Compass.</li>
              <li>Utilized Postman for API calls to test and ensure the functionality of various backend services.</li>
              <li>Maintained three large projects where users interacted with our application through separate and fully functioning bots for MS Teams, Slack, and Google Chat using JavaScript and Node.js. These bots enabled users to track and receive ad reports, create new alerts, and monitor the status of existing alerts.</li>
              <li>Utilized ngrok to test new features and ensure seamless bot functionality.</li>
              <li>Addressed and resolved errors reported in Rollbar, improving system reliability and reducing downtime.</li>
            </ul>
          </div>
          <hr className="resume-divider" />
        </div>

        {/* Skills Section */}
        <div className="resume-section">
          <div className="resume-entry">
            <div className="entry-title">Skills</div>
          </div>
          <div className="resume-details">
            <ul>
              <li><strong>Ruby & Ruby on Rails:</strong> Proficient in developing scalable web applications and backend services using Ruby and the Rails framework.</li>
              <li><strong>Node.js & JavaScript:</strong> Experienced in building and maintaining server-side applications and enhancing user interactions with JavaScript.</li>
              <li><strong>SQL & API Development:</strong> Skilled in designing and querying relational databases, as well as developing and integrating APIs for seamless data exchange.</li>
              <li><strong>Docker, DBeaver, Postman, MongoDB Compass, Ngrok, RSpec, Axios.</strong></li>
            </ul>
          </div>
          <hr className="resume-divider" />
        </div>

        {/* Projects Section */}
        <div className="resume-section">
          <div className="resume-entry">
            <div className="entry-title">Projects</div>
          </div>
          <div className="resume-details">
          <div className="resume-entry">
            <div className="entry-title"><strong>Social Media Clone</strong></div>
            <div className="entry-date">October 2024</div>
          </div>
            <ul>
            <li>Clone of the social media platform X, rettiwT project built with Rails, Ruby, HTML, and SCSS. Implemented test-driven development (TDD) with RSpec. Deployed with Render. <a href="https://social-media-clone-0t7w.onrender.com/" target="_blank" rel="noopener noreferrer">View Project</a></li>
            </ul>
            <div className="entry-title"><strong>FuturApp</strong></div>
            <div className="entry-date">June 2022 – June 2022</div>
            <ul>
              <li>The capstone Web Application group project, FuturApp helps you keep your thoughts and events organized in its timeline, allows you to make predictions for your future, and share predictions within its forum.</li>
              <li>Designed on Figma, implemented with Ruby on Rails, HTML, CSS, JavaScript, and different APIs.</li>
            </ul>
            <div className="resume-entry">
              <div className="entry-title"><strong>GranniesBnB</strong></div>
              <div className="entry-date">May 2022 – June 2022</div>
            </div>
            <ul>
              <li>This project served as a practical demonstration of the skills and knowledge gained throughout the bootcamp. Developed a playful web application designed to allow users to search for, book, and rent local grandmas for unique experiences.</li>
            </ul>
          </div>
          <hr className="resume-divider" />
        </div>

        {/* Education Section */}
        <div className="resume-section">
          <div className="resume-entry">
            <div className="entry-title">Education</div>
          </div>
          <div className="resume-details">
            <div className="entry-title">
              <strong>Le Wagon, Full-Stack Web Developer</strong>
            </div>
            <div className="entry-date">April 2022 – June 2022</div>
            <ul>
              <li>9-week full-time intensive coding bootcamp. Designed, implemented and shipped to production a clone of AirBnB and a Rails prototype of futurapp.me.</li>
            </ul>
            <div className="resume-entry">
              <div className="entry-title"><strong>California Polytechnic State University, S.L.O., CA, USA</strong></div>
            </div>
            <div className="entry-date">September 2009 – June 2013</div>
            <ul>
              <li>Bachelor of Science in Business Administration</li>
            </ul>
          </div>
          <hr className="resume-divider" />
        </div>

        {/* Language Proficiency */}
        <div className="resume-section">
          <div className="resume-entry">
            <div className="entry-title">Languages</div>
          </div>
          <div className="resume-details">
            <ul>
              <li>Fluent in English, Portuguese, and advanced mastery of Spanish.</li>
            </ul>
          </div>
          <hr className="resume-divider" />
        </div>
      </div>
    </div>
  );
};

export default Resume;
