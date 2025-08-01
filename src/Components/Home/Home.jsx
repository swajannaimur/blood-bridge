import React from 'react';
import bloodAnimation from '../../assets/Lotties/blood donner.json'
import Lottie from 'lottie-react';
import { Link } from 'react-router';
import ContactForm from '../ContactUs/ContactUs';
import FeatureSection from '../FeaturedSection/FeaturedSection';

const Home = () => {


    return (
        <div>
            {/* Banner */}
            <div className='flex justify-between items-center'>
                <div>
                    <div className="text-start my-10">
                        <h1 className="text-4xl font-bold text-primary">Be a Hero, Save Lives</h1>
                        <p className="text-gray-700 mt-2 max-w-3xs text-base sm:text-lg">
                            Join our life-saving mission by becoming a blood donor or find the help you need right when it matters most.
                        </p>
                    </div>
                    <div className='flex gap-4'>
                        <Link to='/register'><button className='btn btn-primary'>Join As Donor</button></Link>
                        <Link to='/'><button className='btn btn-primary'>Search Page</button></Link>
                    </div>
                </div>
                <div className="w-full lg:w-1/2 max-w-md">
                    <Lottie animationData={bloodAnimation} loop={true} />
                </div>
            </div>

            {/* Featured Section */}
            <div>
                <FeatureSection />
            </div>

            {/* Contact Us */}
            <div className=''>
                <ContactForm />
            </div>
        </div>
    );
};

export default Home;