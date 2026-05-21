'use client';
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { authClient } from "@/app/lib/auth-client"
import Link from 'next/link'

const MyRequests = () => {
    const [requests, setRequests] = useState([])
    const [loading, setLoading] = useState(true)

    const { data: session } = authClient.useSession()
    const user = session?.user

    useEffect(() => {
        if (user?.email) {
            fetchMyRequests()
        }
    }, [user])

    const fetchMyRequests = async () => {
        try {
            const { data: tokenData } = await authClient.token()
            
            const res = await fetch(`http://localhost:5000/my-requests?email=${user.email}`, {
                headers: {
                    'content-type': 'application/json',
                    authorization: `Bearer ${tokenData?.token}`
                },
            });
            const data = await res.json()
            setRequests(data)
        } catch (error) {
            console.error(error)
            toast.error("Failed to load your requests")
        } finally {
            setLoading(false)
        }
    };

    const cancelRequest = async (requestId) => {
        if (!confirm("Are you sure you want to cancel this request?")) return;

        try {
            const { data: tokenData } = await authClient.token();
            const res = await fetch(`http://localhost:5000/adoptions/${requestId}`, {
                method: 'DELETE',
                headers: {
                    authorization: `Bearer ${tokenData?.token}`
                }

            });

            const data = await res.json();

            if (data.deletedCount > 0) {
                toast.success("Request cancelled successfully");
                fetchMyRequests(); // Refresh list
            } else {
                toast.error("Failed to cancel request");
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong");
        }
    };

    if (loading) {
        return <p className="text-center py-20 text-xl">Loading your requests...</p>;
    }

    return (
        <div>
            <h2 className="text-3xl font-bold mb-8">My Adoption Requests</h2>

            {requests.length === 0 ? (
                <p className="text-center py-20 text-xl text-gray-500">
                    You have not made any adoption requests yet.
                </p>
            ) : (
                <div className="space-y-4">
                    {requests.map((req) => (
                        <div key={req._id} className="bg-white rounded-3xl p-6 shadow border border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">

                            <div className="flex-1">
                                <h3 className="text-xl font-semibold text-gray-800">{req.animalName}</h3>
                                <p className="text-gray-500 text-sm">
                                    Requested on: <span className="font-medium">{req.createdAt?.slice(0, 10)}</span>
                                </p>
                                {req.adoptionDate && (
                                    <p className="text-gray-500 text-sm">
                                        Preferred Date: <span className="font-medium">{req.adoptionDate}</span>
                                    </p>
                                )}
                            </div>

                            <div className="flex items-center gap-4">
                                <div className={`px-5 py-2 rounded-full text-sm font-semibold
                                    ${req.status === 'approved' ? 'bg-green-100 text-green-700' :
                                        req.status === 'rejected' ? 'bg-red-100 text-red-700' :
                                            'bg-yellow-100 text-yellow-700'}`}>
                                    {req.status.toUpperCase()}
                                </div>

                                <Link href={`/allPets/${req.animalId}`}>
                                    <button className="px-5 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl text-sm font-medium">
                                        View Pet
                                    </button>
                                </Link>


                                {req.status === 'pending' && (
                                    <button onClick={() => cancelRequest(req._id)}
                                        className="px-5 py-2 bg-red-600 hover:bg-red-700
                                        text-white rounded-xl text-sm font-medium">
                                        Cancel
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default MyRequests