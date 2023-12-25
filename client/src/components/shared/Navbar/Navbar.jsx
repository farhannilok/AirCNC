import React from 'react';
import Container from '../Container/Container';
import Logo from './Logo';
import Search from './Search';
import Menu from './Menu';

const Navbar = () => {
    return (
        <div className='fixed z-10 bg-white w-full shadow-sm'>
            <div className='py-4 border-b-[1px]'>
                <Container>
                    <div className="flex flex-row justify-between items-center">
                        <Logo />
                        <Search />
                        <Menu />
                    </div>
                </Container>
            </div>
        </div>
    );
};

export default Navbar;