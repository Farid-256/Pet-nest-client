'use client';
import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { authClient } from "@/app/lib/auth-client"
import RequestsModal from './RequestsModal'
import { Edit } from '@/components/Edit'
import { Delete } from '@/components/Delete'

const MyListings = () => {
    const [pets, setPets] = useState([])
    const [loading, setLoading] = useState(true)
    const [selectedPet, setSelectedPet] = useState(null)
    const [showModal, setShowModal] = useState(false)

    const { data: session } = authClient.useSession()
    const user = session?.user

    useEffect(() => {
        if (user?.email) {
            fetchMyPets()
        }
    }, [user])

    const fetchMyPets = async () => {
        const { data: tokenData } = await authClient.token()

        const res = await fetch(`http://localhost:5000/my-listings?email=${user.email}`, {
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${tokenData?.token}`
            },
        })
        const data = await res.json()
        setPets(data)
        setLoading(false)
    };

    const openRequests = (pet) => {
        setSelectedPet(pet)
        setShowModal(true)
    };

    if (loading) {
        return <p className="text-center py-20 text-xl">Loading your pets...</p>
    }

    return (
        <div className="px-4 md:px-6">
    
            <h2 className="text-3xl font-bold mb-6">My Listings</h2>

      
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                <div className="bg-white rounded-2xl shadow p-5 text-center border border-gray-100">
                    <p className="text-3xl font-bold text-gray-800">{pets.length}</p>
                    <p className="text-sm text-gray-400 mt-1">Total Listings</p>
                </div>
                <div className="bg-white rounded-2xl shadow p-5 text-center border border-green-100">
                    <p className="text-3xl font-bold text-green-500">
                        {pets.filter(p => p.status === 'available').length}
                    </p>
                    <p className="text-sm text-gray-400 mt-1">Available</p>
                </div>
                <div className="bg-white rounded-2xl shadow p-5 text-center border border-red-100">
                    <p className="text-3xl font-bold text-red-500">
                        {pets.filter(p => p.status === 'adopted').length}
                    </p>
                    <p className="text-sm text-gray-400 mt-1">Adopted</p>
                </div>
            </div>

            {pets.length === 0 ? (
                <p className="text-center py-20 text-xl text-gray-500">
                    You have not added any pets yet.
                </p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {pets.map((pet) => (
                        <div key={pet._id} className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all">

                            <div className="relative h-52">
                                <Image src={pet.image} alt={pet.name} fill className="object-cover" />
                            </div>

                            <div className="p-5">
                                <h3 className="text-xl font-bold text-gray-800">{pet.name}</h3>
                                <div className='flex gap-2 text-sm'>
                                    <p className="text-gray-500">{pet.location} |</p>
                                    <p className="text-gray-500">Age: {pet.age}</p>
                                </div>
                                <p className="text-orange-600 font-semibold mt-2">Taka {pet.adoptionFee}</p>


                                <div className="flex flex-col gap-2 mt-5">
                                    <Link href={`/allPets/${pet._id}`} className="w-full">
                                        <button className="w-full py-2.5 bg-gray-100 hover:bg-gray-200 rounded-xl text-sm font-medium">
                                            View Details
                                        </button>
                                    </Link>

                                    <div className="grid grid-cols-2 gap-2">
                                        <button onClick={() => openRequests(pet)}
                                            className="py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-sm font-medium">
                                            Requests
                                        </button>

                                        <Edit pet={pet} />

                                        <div className='col-span-2'>
                                            <Delete pet={pet} />
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}


            {showModal && selectedPet && (
                <RequestsModal
                    pet={selectedPet}
                    onClose={() => setShowModal(false)}
                />
            )}
        </div>
    )
}

export default MyListings;