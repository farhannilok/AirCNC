import React from 'react';
import Heading from '../Heading/Heading';

const Header = ({roomData}) => {
    return (
        <>
            <Heading
                title={roomData?.location}
                subtitle="Sidemen, Indonesia"
            />
            <div className='w-full md:h-[60vh] overflow-hidden rounded-xl'>
                <img className='object-cover w-full' src={roomData.image} alt="header img" />
            </div>
        </>
    );
};

export default Header;