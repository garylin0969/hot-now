import React from 'react';

const Header = () => {
    return (
        <header className='sticky top-0 left-0 h-14.5 shadow-md backdrop-blur-xl'>
            <div className='container mx-auto flex h-full items-center justify-between'>
                <h1 className='text-2xl font-bold'>Hot Now</h1>
            </div>
        </header>
    );
};

export default Header;
