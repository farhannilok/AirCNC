import React, { useContext, useState } from 'react';
import Calender from '../Calender/Calender';
import Button from '../Button/Button';
import { AuthContext } from '../../providers/AuthProvider';
import BookingModal from '../Modal/BookingModal';
import { formatDistance } from 'date-fns';
import { addBooking, updateStatus } from '../../api/booking';
import {toast} from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
const RoomReservation = ({roomData}) => {
    const navigate = useNavigate()
    const {user} = useContext(AuthContext)
    const [isOpen, setOpen] = useState(false)
    const [date, setDate] = useState({
        startDate: new Date(roomData?.from),
        endDate: new Date(roomData?.to),
        key: 'selection',
    });
    const totalPrice = parseFloat(formatDistance(new Date(roomData?.from), new Date(roomData?.to)).split(' ')[0]) * roomData?.price;

    const [bookingInfo, setBookingInfo] = useState({
        roomID: roomData._id,
        title: roomData.title,
        image: roomData.image,
        location: roomData.location,
        host: user?.email,
        guest: {name: user.displayName, email: user?.email, image: user?.photoURL},
        price: totalPrice,
        from: date.startDate,
        to: date.endDate
        
    })
    const closeModal = () => {
        setOpen(false)
    }

    const modalHandler = () => {
        addBooking(bookingInfo)
        .then(data => {
            closeModal()
            updateStatus(roomData._id, true)
            .then(data => {
                toast.success('Booking Successful.')
                navigate('/dashboard/my-bookings')

            })
            .catch(err => toast.error('Uh oh something went wrong!'))
        })
        .catch(err => toast.error('Something went wrong!'))
    }

    const handleDateChange = (ranges) => {
        setDate({...ranges})
    }
    return (
        <div className='bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden'>
            <div className='flex flex-row items-center gap-1 p-4'>
                <div className='text-2xl font-semibold'>$ {roomData.price}</div>
                <div className='font-light text-neutral-600'>night</div>
            </div>
            <hr />
            <div className='flex justify-center'>
                <Calender date={date} handleDateChange={handleDateChange}/>
            </div>
            <hr />
            <div className='p-4'>
                <Button onClick={() => setOpen(true)} label="Reserve" disabled={roomData?.host?.email === user?.email || roomData.booked}/>
            </div>
            <div className='p-4 flex flex-row items-center justify-between text-lg font-semibold'>
                <div>Total</div>
                <div>$ {totalPrice}</div>
            </div>

            <BookingModal modalHandler={modalHandler} isOpen={isOpen} closeModal={closeModal} bookingInfo={bookingInfo}/>
        </div>
    );
};

export default RoomReservation;