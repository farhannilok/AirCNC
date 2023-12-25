import React from 'react';
import Container from '../shared/Container/Container';
import { categories } from './categoriesData';
import CategoryBox from './CategoryBox';
const Categories = () => {
    return (
        <Container>
            <div className='pt-4 flex flex-row justify-between items-center overflow-x-auto'>
                {
                    categories.map(item => <CategoryBox key={item.label} label={item.label} icon={item.icon} />)
                }
            </div>
        </Container>
    );
};

export default Categories;