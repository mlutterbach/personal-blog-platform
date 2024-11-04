import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Contact.css';

const apiUrl = process.env.RAILS_APP_WEBSITE_URL || 'http://localhost:3001';

const Contact = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const contactData = {
      first_name: firstName,
      last_name: lastName,
      email,
      subject,
      message,
    };

    try {
      const response = await axios.post(`${apiUrl}/api/v1/contacts`, { contact: contactData }, {
        headers: {
          'Accept': 'application/json',
        },
      });

      console.log('Form submitted:', response.data);
      setSuccessMessage('Thank you for your message. We will get back to you soon!');

      // Reset form fields
      setFirstName('');
      setLastName('');
      setEmail('');
      setSubject('');
      setMessage('');
      setErrorMessage('');
    } catch (error) {
      console.error('Error submitting form:', error);
      setErrorMessage('Error submitting form. Please try again later.');
      setSuccessMessage('');
    }
  };

  return (
    <div className="contact-container">
      <div className="contact-info">
        <h1>Contact</h1>
        <p>Looking forward to hearing from you.</p>
        <div>
          <div className="contact-detail">Email</div>
          <div className="contact-content">mlutterb@gmail.com</div>
        </div>
        <div>
          <div className="contact-detail">LinkedIn</div>
          <div className="contact-content">linkedin.com/in/marcoslutterbach/</div>
        </div>
        <div>
          <div className="contact-detail">GitHub</div>
          <div className="contact-content">https://github.com/mlutterbach</div>
        </div>
      </div>

      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="name-fields">
          <div className="field">
            <label>First Name:</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div className="field">
            <label>Last Name:</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="name-fields">
          <div className="field">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="field">
            <label>Subject:</label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="field">
          <label>Message:</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          ></textarea>
        </div>

        <button type="submit">Submit</button>

        {successMessage && <p className="success-message">{successMessage}</p>}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </form>
    </div>
  );
};

export default Contact;
