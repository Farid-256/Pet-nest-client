import Image from 'next/image';
import Link from 'next/link';
import { IoLocationOutline } from 'react-icons/io5';

const AllPetCard = ({ animal }) => {
    const { _id, name, species, breed, age, gender, image, location, adoptionFee, status } = animal;

    return (
        <section className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl 
        transition-all duration-300 group border border-gray-100">

            {/* Image Section */}
            <div className="relative h-64 overflow-hidden">
                <Image src={image} alt={name} fill className="object-cover
                group-hover:scale-105 transition-transform duration-500"/>

                <div className="absolute top-4 right-4">
                    <span className={`px-4 py-1.5 text-xs font-semibold rounded-full shadow-md
                        ${status === 'available'
                            ? 'bg-green-500 text-white'
                            : 'bg-red-500 text-white'}`}>
                        {status === 'available' ? 'Available' : 'Adopted'}
                    </span>
                </div>
            </div>


            <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                    <div>
                        <h3 className="text-2xl font-bold text-gray-800">{name}</h3>
                        <p className="text-gray-500 text-sm">{breed} | {species}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-2xl font-semibold text-orange-600">Taka {adoptionFee}</p>
                    </div>
                </div>

                <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                    <div> Age: <span className="font-medium">{age} years</span></div>
                    <div> {gender}</div>
                </div>

                <p className="text-gray-500 text-sm mb-6 line-clamp-2 flex items-center gap-1">
                    <IoLocationOutline /> {location}
                </p>

                {/* Action Buttons */}
                    <Link href={`/allPets/${_id}`} className="flex-1">
                        <button className="w-full py-3.5 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium rounded-2xl transition">
                            View Details
                        </button>
                    </Link>
            </div>

        </section>
    );
};

export default AllPetCard;