import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Components/Contexts/AuthContext';
import districts from '../../public/districts.json';
import upozilas from '../../public/upozilas.json';
import DatePicker from 'react-datepicker';
import useAxiosSecure from '../Hooks/axiosSecure';
import { useParams } from 'react-router';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

const UpdateRequest = () => {
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [selectedUpozila, setSelectedUpozila] = useState('');
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState('');
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure()
    const params = useParams()
    const [datas, setDatas] = useState([])
    const filteredUpozilas = upozilas.filter((upozila) => {
        const district = districts.find((district) => district.name === selectedDistrict);
        return district ? upozila.district_id === district.id : true;
    });

    useEffect(() => {
        axiosSecure.get(`/donation-requests/${params.id}`).then((res) => {
            setDatas(res.data);
            setSelectedDistrict(res.data.district);
            setSelectedUpozila(res.data.upozila);
            setSelectedDate(new Date(res.data.donationDate));
            setSelectedTime(res.data.donationTime);
        });
    }, [params.id, axiosSecure]);

    const { _id, recipientName, district, hospitalName, bloodGroup, fullAddresses, requestMessage } = datas

    const handleUpdateRequest = e => {
        e.preventDefault()
        const form = e.target
        const updatedRequest = {
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
        console.log(updatedRequest);

        axiosSecure.put(`/update-request/${_id}`, updatedRequest)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    Swal.fire({
                        title: "Great!",
                        text: "Post Added Successfully",
                        icon: "success"
                    });
                }
            }).catch(error => {
                toast.error(error.message)

            })

    }
    return (
        <div className=" ">
            <div className="mb-6 text-center">
                <h2 className="text-3xl font-bold text-primary">Update Donation Request</h2>
                <p className="max-w-2xl mx-auto text-gray-700 mt-2 text-sm sm:text-base">
                    Modify your existing donation request to reflect updated details or changes in circumstances. Keeping your information accurate helps ensure timely support from donors and improves the chances of a successful donation.
                </p>

            </div>

            <form
                onSubmit={handleUpdateRequest}
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
                            defaultValue={recipientName}
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
                            defaultValue={district}
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
                            defaultValue={hospitalName}
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
                            defaultValue={fullAddresses}
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
                            defaultValue={requestMessage}
                            name="requestMessage"
                            className="input w-full border-primary border-2"
                            placeholder="Why is this donation needed?"
                        />
                    </fieldset>

                    <fieldset>
                        <legend className="text-sm font-bold text-secondary mb-1">Blood Group</legend>
                        <select name="bloodGroup" className="select select-bordered w-full border-2" defaultValue={bloodGroup} required>
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
                <button className="btn btn-primary mt-6 w-full text-lg font-bold">Update Donation Request</button>
            </form>
        </div>
    );
};

export default UpdateRequest;