import React from 'react'
import SideNavigation from '../_components/SideNavigation'

function Layout({children}) {
    return (
        <div className='grid lg:grid-cols-[16rem_1fr] grid-cols-7 h-full gap-12'>
            <SideNavigation/>
            <div className='py-1  max-lg:col-span-6'>{children}</div>
        </div>
    )
}

export default Layout