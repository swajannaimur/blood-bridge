import React, { useState } from 'react';
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

    return (
        <div className="max-w-2xl mx-auto my-12 px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-primary text-center mb-4">Contact Us</h2>
            <p className="text-gray-600 text-center mb-8">
                Have questions or suggestions? Fill out the form below and we’ll get back to you shortly.
            </p>

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
    );
};

export default ContactForm;
