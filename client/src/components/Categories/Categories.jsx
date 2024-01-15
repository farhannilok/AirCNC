import React from 'react';
import Container from '../shared/Container/Container';
import { categories } from './categoriesData';
import CategoryBox from './CategoryBox';
import { useSearchParams } from 'react-router-dom';
const Categories = () => {
    const [params, setParams] = useSearchParams();
    const category = params.get('category')
    return (
        <Container>
            <div className='pt-4 flex flex-row justify-between items-center overflow-x-auto'>
                {
                    categories.map(item => <CategoryBox key={item.label} label={item.label} icon={item.icon} selected={category === item.label}/>)
                }
            </div>
        </Container>
    );
};

export default Categories;