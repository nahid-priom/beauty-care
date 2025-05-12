import React, { useState } from 'react';
import axios from 'axios';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    phoneModel: '',
    phoneIssue: '',
    message: '',
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!/^\d{10}$/.test(formData.phone)) {
      setError("Please enter a valid 10-digit phone number.");
      return;
    }

    setLoading(true);
   

    try {
      const response = await axios.post(
        'https://backend.phonespotmd.com/api/message', 
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          phone_model: formData.phoneModel, 
          phone_issue: formData.phoneIssue, 
          address: '', 
          subject: 'Contact Form Inquiry',
          message: formData.message,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 200) {
       
       
        setFormData({
          name: '',
          email: '',
          phone: '',
          phoneModel: '',
          phoneIssue: '',
          message: '',
        });

        setTimeout(() => {
          
        }, 2000);
      }
    } catch (error) {
    
      
      
    } finally {
      setLoading(false);
    }
    
  };

  return (
    <section className="bg-red-50 py-4 lg:py-10 px-4 pt-36 lg:pt-44 lg:px-0">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Contact Us</h1>
        <p className="text-center text-gray-600 mb-6">
          We would love to hear from you! Fill out the form below and we will get back to you shortly.
        </p>

        <div className="bg-white shadow-md rounded-lg p-6 lg:p-10">
         

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-2" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-red-500"
                placeholder="Enter your name"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-red-500"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2" htmlFor="phone">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                id="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-red-500"
                placeholder="Enter your phone number"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2" htmlFor="phoneModel">
                Phone Model
              </label>
              <input
                type="text"
                name="phoneModel"
                id="phoneModel"
                value={formData.phoneModel}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-red-500"
                placeholder="Enter your phone model (e.g., iPhone 13, Samsung Galaxy S21)"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2" htmlFor="phoneIssue">
                Phone Issue
              </label>
              <input
                type="text"
                name="phoneIssue"
                id="phoneIssue"
                value={formData.phoneIssue}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-red-500"
                placeholder="Describe the issue with your phone"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2" htmlFor="message">
                Message
              </label>
              <textarea
                name="message"
                id="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="5"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-red-500"
                placeholder="Enter your message"
              />
            </div>

            <div>
              <button
                type="submit"
                className="w-full py-3 bg-red-600 text-white font-semibold rounded-lg shadow-lg hover:bg-red-700 transition duration-300"
                disabled={loading}
              >
                {loading ? 'Sending...' : 'Send Message'}
              </button>
              {error && <p className="text-red-500 mt-4">{error}</p>}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
