import Image from 'next/image';
import Link from 'next/link';
import { FaLocationDot } from 'react-icons/fa6';

const PetCard = ({ animal }) => {
    const { _id, name, species, breed, age, gender, image, location, adoptionFee, status } = animal;

    return (
        <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group border border-gray-100">

            {/* Image */}
            <div className="relative h-64 overflow-hidden">
                <Image
                    src={image}
                    alt={name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                />

                <div className="absolute top-4 right-4">
                    <span className={`px-4 py-1.5 text-xs font-semibold rounded-full shadow-md
                        ${status === 'available' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                        {status === 'available' ? 'Available' : 'Adopted'}
                    </span>
                </div>
            </div>


            <div className="p-6">
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="text-2xl font-bold text-gray-800">{name}</h3>
                        <p className="text-gray-500">{breed} • {species}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-2xl font-semibold text-orange-600">Taka {adoptionFee}</p>
                    </div>
                </div>

                <div className="flex items-center gap-4 text-sm text-gray-600 mt-4">
                    <div>Age: <span className="font-medium">{age} years</span></div>
                    <div>{gender}</div>
                </div>

                <p className="text-sm text-gray-500 mt-3 line-clamp-2 flex items-center gap-1">
                    <FaLocationDot /> {location}
                </p>

                <Link href={`/allPets/${_id}`} className="block mt-6">
                    <button className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-2xl transition-all active:scale-95">
                        View Details
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default PetCard;