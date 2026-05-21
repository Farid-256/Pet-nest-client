'use client';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { authClient } from '../lib/auth-client';

const RequestsModal = ({ pet, onClose }) => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchRequests();
    }, [pet._id]);

    const fetchRequests = async () => {
        try {
            const res = await fetch(`http://localhost:5000/requests/${pet._id}`);
            const data = await res.json();
            setRequests(data);
        } catch (error) {
            toast.error("Failed to load requests");
        } finally {
            setLoading(false);
        }
    };

    const handleApprove = async (requestId) => {
        try {
            const { data: tokenData } = await authClient.token();
            const res = await fetch(`http://localhost:5000/requests/approve/${requestId}`, {
                method: 'PATCH',
                headers: {
                    authorization: `Bearer ${tokenData?.token}`
                }
            });
            const data = await res.json();

            if (data.success) {
                toast.success("Request Approved");
                fetchRequests()
            }
        } catch (error) {
            toast.error("Failed to approve");
        }
    };

    const handleReject = async (requestId) => {
        try {
            const { data: tokenData } = await authClient.token();
            const res = await fetch(`http://localhost:5000/requests/reject/${requestId}`, {
                method: 'PATCH',
                headers: {
                    authorization: `Bearer ${tokenData?.token}`
                }
            });
            const data = await res.json();

            if (data.success) {
                toast.success("Request Rejected");
                fetchRequests();
            }
        } catch (error) {
            toast.error("Failed to reject");
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
                <div className="p-6 border-b flex justify-between items-center">
                    <div>
                        <h2 className="text-2xl font-bold">Adoption Requests</h2>
                        <p className="text-gray-500">For: {pet.name}</p>
                    </div>
                    <button onClick={onClose} className="text-3xl text-gray-400 
                    hover:text-gray-600">X</button>
                </div>

                <div className="p-6 overflow-y-auto max-h-[70vh]">
                    {loading ? (
                        <p>Loading requests...</p>
                    ) : requests.length === 0 ? (
                        <p className="text-center py-10 text-gray-500">No adoption requests yet.</p>
                    ) : (
                        <div className="space-y-4">
                            {requests.map(req => (
                                <div key={req._id} className="border rounded-2xl p-5 bg-gray-50">
                                    <div className="flex justify-between">
                                        <div>
                                            <h4 className="font-semibold">{req.userName}</h4>
                                            <p className="text-sm text-gray-500">{req.userEmail}</p>
                                        </div>
                                        <div className={`px-4 py-1 rounded-full text-sm font-medium
                                            ${req.status === 'approved' ? 'text-xl text-green-700' :
                                                req.status === 'rejected' ? 'text-xl text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                            {req.status}
                                        </div>
                                    </div>

                                    <p className="mt-3 text-sm"><strong>Date:</strong> {req.adoptionDate}</p>
                                    {req.message && <p className="mt-2 text-sm italic">{req.message}</p>}

                                    {req.status === 'pending' && (
                                        <div className="flex gap-3 mt-4">
                                            <button onClick={() => handleApprove(req._id)}
                                                className="flex-1 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700">
                                                Approve
                                            </button>

                                            <button
                                                onClick={() => handleReject(req._id)}
                                                className="flex-1 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700"
                                            >
                                                Reject
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RequestsModal