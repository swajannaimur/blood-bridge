import React, { useContext, useState } from 'react';
import { AuthContext } from '../Components/Contexts/AuthContext';
import districts from '../../public/districts.json';
import upozilas from '../../public/upozilas.json';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import useAxiosPublic from '../Hooks/axiosPublic';
import Swal from 'sweetalert2';

const CreateDonationRequest = () => {
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [selectedUpozila, setSelectedUpozila] = useState('');
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState('');
    const { user } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic()

    const filteredUpozilas = upozilas.filter((upozila) => {
        const district = districts.find((district) => district.name === selectedDistrict);
        return district ? upozila.district_id === district.id : true;
    });

    const handleAddVolunteer = (e) => {
        e.preventDefault();
        const form = e.target;
        const newRequest = {
            requesterName: user.displayName,
            requesterEmail: user.email,
            recipientName: form.recipientName.value,
            district: selectedDistrict,
            upozila: selectedUpozila,
            hospitalName: form.hospitalName.value,
            fullAddresses: form.fullAddresses.value,
            requestMessage: form.requestMessage.value,
            bloodGroup: form.bloodGroup.value,
            donationDate: selectedDate.toLocaleDateString('en-GB'),
            donationTime: selectedTime,
            donationStatus: "pending"
        };

        console.log(newRequest);

        axiosPublic.post('/donation-requests', newRequest)
            .then((res) => {
                if (res.data.insertedId) {
                    Swal.fire({
                        title: "Great!",
                        text: "Post Added Successfully",
                        icon: "success"
                    });
                }
                console.log(res.data);
                form.reset();
            }).catch(error => {
                console.log(error);
            });
        // TODO: send data to backend
    };

    return (
        <div className="min-h-screen px-4 py-8">
            <div className="mb-6 text-center">
                <h2 className="text-3xl font-bold text-primary">Add Donation Request</h2>
                <p className="max-w-2xl mx-auto text-gray-700 mt-2 text-sm sm:text-base">
                    In urgent need of blood? Submit a donation request to connect with willing donors in your area. Provide accurate details to ensure timely and effective support. Your request could help save a life.
                </p>
            </div>

            <form
                onSubmit={handleAddVolunteer}
                className="border border-primary p-6 rounded-xl bg-white shadow-md max-w-6xl mx-auto"
            >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

                    <fieldset>
                        <legend className="text-sm font-bold text-secondary mb-1">Requester Name</legend>
                        <input
                            type="text"
                            readOnly
                            defaultValue={user.displayName || ''}
                            name="requesterName"
                            className="input w-full border-primary border-2"
                        />
                    </fieldset>

                    <fieldset>
                        <legend className="text-sm font-bold text-secondary mb-1">Requester Email</legend>
                        <input
                            type="email"
                            readOnly
                            defaultValue={user.email || ''}
                            name="requesterEmail"
                            className="input w-full border-primary border-2"
                        />
                    </fieldset>

                    <fieldset>
                        <legend className="text-sm font-bold text-secondary mb-1">Recipient Name</legend>
                        <input
                            type="text"
                            required
                            name="recipientName"
                            className="input w-full border-primary border-2"
                            placeholder="Recipient's name"
                        />
                    </fieldset>

                    {/* District */}
                    <div>
                        <label className="label font-bold text-sm text-secondary">District</label>
                        <select
                            name="district"
                            className="select select-bordered w-full border-2"
                            value={selectedDistrict}
                            onChange={(e) => {
                                setSelectedDistrict(e.target.value);
                                setSelectedUpozila('');
                            }}
                            required
                        >
                            <option value="" disabled>Select a district</option>
                            {districts
                                .slice()
                                .sort((a, b) => a.name.localeCompare(b.name))
                                .map((district) => (
                                    <option key={district.id} value={district.name}>
                                        {district.name}
                                    </option>
                                ))}
                        </select>
                    </div>

                    {/* Upozila */}
                    <div>
                        <label className="label font-bold text-sm text-secondary">Upozila</label>
                        <select
                            name="upozila"
                            className="select select-bordered w-full border-2"
                            value={selectedUpozila}
                            onChange={(e) => setSelectedUpozila(e.target.value)}
                            required
                        >
                            <option value="" disabled>Select a Upozila</option>
                            {filteredUpozilas
                                .slice()
                                .sort((a, b) => a.name.localeCompare(b.name))
                                .map((upozila) => (
                                    <option key={upozila.id} value={upozila.name}>
                                        {upozila.name}
                                    </option>
                                ))}
                        </select>
                    </div>

                    <fieldset>
                        <legend className="text-sm font-bold text-secondary mb-1">Hospital Name</legend>
                        <input
                            type="text"
                            required
                            name="hospitalName"
                            className="input w-full border-primary border-2"
                            placeholder="Hospital name"
                        />
                    </fieldset>

                    <fieldset>
                        <legend className="text-sm font-bold text-secondary mb-1">Full Address</legend>
                        <input
                            type="text"
                            required
                            name="fullAddresses"
                            className="input w-full border-primary border-2"
                            placeholder="Full address"
                        />
                    </fieldset>

                    <fieldset>
                        <legend className="text-sm font-bold text-secondary mb-1">Request Message</legend>
                        <input
                            type="text"
                            required
                            name="requestMessage"
                            className="input w-full border-primary border-2"
                            placeholder="Why is this donation needed?"
                        />
                    </fieldset>

                    <fieldset>
                        <legend className="text-sm font-bold text-secondary mb-1">Blood Group</legend>
                        <select name="bloodGroup" className="select select-bordered w-full border-2" defaultValue="" required>
                            <option value="" disabled>Select blood group</option>
                            <option value="A+">A+</option>
                            <option value="A-">A-</option>
                            <option value="B+">B+</option>
                            <option value="B-">B-</option>
                            <option value="AB+">AB+</option>
                            <option value="AB-">AB-</option>
                            <option value="O+">O+</option>
                            <option value="O-">O-</option>
                        </select>
                    </fieldset>

                    <fieldset>
                        <legend className="text-sm font-bold text-secondary mb-1">Donation Date</legend>
                        <DatePicker
                            selected={selectedDate}
                            onChange={(date) => setSelectedDate(date)}
                            className="input w-full border-primary border-2"
                            placeholderText="Select donation date"
                            dateFormat="dd/MM/yyyy"
                            required
                        />
                    </fieldset>

                    <fieldset>
                        <legend className="text-sm font-bold text-secondary mb-1">Donation Time</legend>
                        <input
                            type="time"
                            name="donationTime"
                            value={selectedTime}
                            onChange={(e) => setSelectedTime(e.target.value)}
                            className="input w-full border-primary border-2"
                            required
                        />
                    </fieldset>
                </div>
                <button className="btn btn-primary mt-6 w-full text-lg font-bold">Add Request</button>
            </form>
        </div>
    );
};

export default CreateDonationRequest;
