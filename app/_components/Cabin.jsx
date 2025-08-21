import { EyeSlashIcon, MapPinIcon, UsersIcon } from '@heroicons/react/24/solid'
import React from 'react'
import TextExpander from './TextExpander'
import Image from 'next/image'

function Cabin({ cabin }) {
    const { id, name, maxCapacity, regularPrice, discount, image, description } = cabin;
    return (
        <div className="grid lg:grid-cols-[3fr_4fr] grid-cols-1 gap-20 border border-primary-800 lg:py-3 lg:px-10  mb-24">
            <div className="relative md:scale-[1.15] lg:-translate-x-3 lg:h-full h-96 ">
                <Image className="object-cover w-52" fill src={image} alt={`Cabin ${name}`} />
            </div>

            <div className='lg:px-10 px-5'>
                <h3 className="text-accent-100 font-black lg:text-7xl md:text-6xl text-4xl mb-5 lg:translate-x-[-254px] bg-primary-950 lg:p-6 pb-1  lg:w-[150%]">
                    Cabin {name}
                </h3>

                <p className="sm:text-lg text-primary-300 mb-10">
                    <TextExpander>
                        {description}
                    </TextExpander>
                </p>

                <ul className="flex flex-col gap-4 mb-7">
                    <li className="flex gap-3 items-center">
                        <UsersIcon className="h-5 w-5 text-primary-600" />
                        <span className="sm:text-lg">
                            For up to <span className="font-bold">{maxCapacity}</span>{" "}
                            guests
                        </span>
                    </li>
                    <li className="flex gap-3 items-center">
                        <MapPinIcon className="h-5 w-5 text-primary-600" />
                        <span className="sm:text-lg">
                            Located in the heart of the{" "}
                            <span className="font-bold">Dolomites</span> (Italy)
                        </span>
                    </li>
                    <li className="flex gap-3 items-center">
                        <EyeSlashIcon className="h-5 w-5 text-primary-600" />
                        <span className="sm:text-lg">
                            Privacy <span className="font-bold">100%</span> guaranteed
                        </span>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Cabin