import { getAnimalById } from "@/app/lib/data";
import AdoptForm from "@/components/AdoptForm";
import Image from "next/image";
import { FaLocationDot } from "react-icons/fa6";

const PetsDetailsPage = async ({ params }) => {
    const { petsId } = await params;
    const animal = await getAnimalById(petsId);

    const { name, species, breed, age, gender, image, location, adoptionFee, status, description, healthStatus, vaccinationStatus } = animal;

    return (
        <section className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12 space-y-8 md:space-y-12">

            <div className="relative h-72 md:h-80 lg:h-96 rounded-3xl overflow-hidden shadow-xl">
                <Image src={image} alt={name} fill className="object-cover" priority/>

                <span className={`absolute top-5 right-5 px-6 py-2.5 rounded-full text-sm font-semibold shadow-md
                    ${status === "available" ? "bg-green-500 text-white" : "bg-red-500 text-white"}`}>
                    {status === "available" ? "Available" : "Adopted"}
                </span>
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">

                {/* Pet Details */}
                <div className="bg-white rounded-3xl shadow-lg p-6 md:p-10 space-y-6 border border-amber-100">
                    <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">{name}</h1>
                            <p className="text-gray-500 mt-1 text-lg">{breed} • {species}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-3xl font-bold text-orange-500">৳{adoptionFee}</p>
                            <p className="text-sm text-gray-400">Adoption Fee</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gray-50 p-5 rounded-2xl">
                            <p className="text-xs text-gray-400">Age</p>
                            <p className="font-semibold text-xl">{age} years</p>
                        </div>
                        <div className="bg-gray-50 p-5 rounded-2xl">
                            <p className="text-xs text-gray-400">Gender</p>
                            <p className="font-semibold text-xl">{gender}</p>
                        </div>
                        <div className="bg-gray-50 p-5 rounded-2xl">
                            <p className="text-xs text-gray-400">Species</p>
                            <p className="font-semibold text-xl">{species}</p>
                        </div>
                        <div className="bg-gray-50 p-5 rounded-2xl">
                            <p className="text-xs text-gray-400">Location</p>
                            <p className="font-semibold text-xl flex items-center gap-1"><FaLocationDot /> {location}</p>
                        </div>
                        <div className="bg-gray-50 p-5 rounded-2xl">
                            <p className="text-xs text-gray-400">Health</p>
                            <p className="font-semibold text-green-600 text-xl">{healthStatus}</p>
                        </div>
                        <div className="bg-gray-50 p-5 rounded-2xl">
                            <p className="text-xs text-gray-400">Vaccination</p>
                            <p className="font-semibold text-blue-600 text-xl">{vaccinationStatus}</p>
                        </div>
                    </div>

                    <div>
                        <h3 className="font-bold text-gray-700 mb-3 text-xl">About {name}</h3>
                        <p className="text-gray-600 leading-relaxed text-[15.5px]">{description}</p>
                    </div>
                </div>

                {/* Adopt Form */}
                <AdoptForm animal={animal} />

            </div>
        </section>
    );
};

export default PetsDetailsPage