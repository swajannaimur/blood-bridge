import React from 'react';
import { HeartPulse, Users, ShieldCheck } from 'lucide-react'; 

const FeatureSection = () => {
    const features = [
        {
            icon: <HeartPulse size={32} className="text-primary" />,
            title: 'Quick Blood Matching',
            description: 'Find compatible donors quickly based on blood group and location.'
        },
        {
            icon: <Users size={32} className="text-primary" />,
            title: 'Community of Donors',
            description: 'Join a large and growing network of lifesavers across the country.'
        },
        {
            icon: <ShieldCheck size={32} className="text-primary" />,
            title: 'Secure & Verified',
            description: 'User identities and donations are verified for a safe experience.'
        }
    ];

    return (
        <div className="bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto text-center mb-10">
                <h2 className="text-3xl font-bold text-primary">Why Choose Our Platform?</h2>
                <p className="mt-2 text-gray-600 text-sm sm:text-base">
                    We make it easier and safer to donate and receive blood when it matters the most.
                </p>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
                {features.map((feature, index) => (
                    <div key={index} className="bg-white rounded-2xl shadow-md p-6 text-center hover:shadow-lg transition">
                        <div className="flex justify-center mb-4">{feature.icon}</div>
                        <h3 className="text-xl font-semibold text-gray-800">{feature.title}</h3>
                        <p className="mt-2 text-gray-600 text-sm sm:text-base">{feature.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FeatureSection;
