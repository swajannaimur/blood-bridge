import React, { useState } from 'react';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    toast.success("Message sent successfully!");
    setFormData({ name: '', email: '', message: '' });
  };

  // Contact info array
  const contactInfo = [
    {
      icon: <FaPhoneAlt size={25} className="text-primary" />,
      title: 'Phone',
      detail: '+8801631246448'
    },
    {
      icon: <FaEnvelope size={25} className="text-primary" />,
      title: 'Email',
      detail: 'info@bloodbridge.com'
    },
    {
      icon: <FaMapMarkerAlt size={25} className="text-primary" />,
      title: 'Address',
      detail: 'Dhaka, Bangladesh'
    }
  ];

  return (
    <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8 ">
      <h2 className="text-3xl font-bold text-primary text-center mb-4">Get in Touch</h2>
      <p className="text-gray-600 text-center mb-8">
        Have questions or suggestions? Fill out the form below and we’ll get back to you shortly.
      </p>

      <div className="flex flex-col lg:flex-row-reverse gap-8">
        {/* Contact Info Section */}
        <div className="space-y-4">
          {contactInfo.map((info, index) => (
            <div key={index} className="flex gap-5 items-center">
              <div>{info.icon}</div>
              <div>
                <h1 className="font-semibold text-md">{info.title}</h1>
                <h1 className="text-sm">{info.detail}</h1>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Form */}
        <div className="flex-1">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-primary focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-primary focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="5"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-primary focus:border-primary"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-opacity-90 transition duration-300"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
