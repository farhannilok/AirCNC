import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import queryString from 'query-string';
const CategoryBox = ({ label, icon: Icon, selected }) => {
    const [params, setParams] = useSearchParams();
    const navigate = useNavigate();
    const handleClick = () => {
        let currentQuery = {};
        if (params) {
            currentQuery = queryString.parse(params.toString());
        }
        const updatedQuery = {
            ...currentQuery,
            category: label
        }

        const url = queryString.stringifyUrl({
            url: '/',
            query: updatedQuery
        }, { skipNull: true })

        navigate(url);
    }
    return (
        <div
            onClick={handleClick}
            className={`flex items-center flex-col justify-center gap-2 p-3 border-b-2
               hover:text-neutral-800 
               border-transparent 
               text-neutral-500 
               cursor-pointer
               ${selected ?
                'border-b-neutral-800 text-neutral-800'
                : 'border-transparent text-neutral-500'
               }`}>
            <Icon size={26} />
            <p className='text-sm font-medium'>{label}</p>
        </div>
    );
};

export default CategoryBox;