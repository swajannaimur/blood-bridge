import React from 'react';
import bloodAnimation from '../../assets/Lotties/blood donner.json'
import Lottie from 'lottie-react';
import { Link } from 'react-router';
import ContactForm from '../ContactUs/ContactUs';
import FeatureSection from '../FeaturedSection/FeaturedSection';

const Home = () => {


    return (
        <div className='space-y-5'>
            {/* Banner */}
            <div className='flex flex-col-reverse lg:flex-row justify-between items-center px-5'>
                <div>
                    <div className="text-center lg:text-start my-5">
                        <h1 className="text-5xl font-bold text-primary">Be a Hero, Save Lives</h1>
                        <p className="text-gray-700 mt-2 max-w-sm text-base sm:text-lg">
                            Join our life-saving mission by becoming a blood donor or find the help you need right when it matters most.
                        </p>
                    </div>
                    <div className='flex gap-4 justify-center items-center md:justify-start'>
                        <Link to='/register'><button className='btn btn-primary'>Join As Donor</button></Link>
                        <Link to='/'><button className='btn btn-primary'>Search Page</button></Link>
                    </div>
                </div>
                <div className="w-full max-w-md">
                    <Lottie animationData={bloodAnimation} loop={true} />
                </div>
            </div>

            {/* Featured Section */}
            <div>
                <FeatureSection />
            </div>

            {/* Contact Us */}
            <div className=' my-4'>
                <ContactForm />
            </div>
        </div>
    );
};

export default Home;