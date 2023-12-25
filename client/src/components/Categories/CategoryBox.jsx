import React from 'react';
import Container from '../shared/Container/Container';

const CategoryBox = ({label, icon: Icon}) => {
    return (
            <div className="flex items-center flex-col justify-center gap-2 p-3 border-b-2 hover:text-neutral-800 border-transparent text-neutral-500">
                <Icon size={26}/>
                <p className='text-sm font-medium'>{label}</p>
            </div>
    );
};

export default CategoryBox;