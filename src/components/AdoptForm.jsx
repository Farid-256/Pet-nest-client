'use client'
import { authClient } from "@/app/lib/auth-client";
import { Button, Label } from "@heroui/react";
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';

const AdoptForm = ({ animal }) => {
    const { data: session } = authClient.useSession();
    const user = session?.user;

    const [adoptDate, setAdoptDate] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null

    if (!user) return <p className="text-red-500 text-5xl text-center py-10">Please login to adopt</p>

    const handleAdoption = async () => {
        if (!adoptDate) {
            toast.error("Please select a date");
            return;
        }

        if (user?.email === animal.ownerEmail) {
            toast.error("You cannot adopt your own pet!");
            return;
        }

        setLoading(true);

        const adoptData = {
            userId: user?._id || user?.id,
            userName: user?.name,
            userEmail: user?.email,
            userImage: user?.image,
            animalId: animal._id,
            animalName: animal.name,
            animalPrice: animal.adoptionFee,
            adoptionDate: adoptDate,
            message: message || "I want to adopt this pet.",
            status: 'pending',
            createdAt: new Date().toISOString()
        };

        try {
            const { data: tokenData } = await authClient.token()
            const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/adoptions`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    authorization: `Bearer ${tokenData?.token}`
                },
                body: JSON.stringify(adoptData)
            });

            const data = await res.json();

            if (data.insertedId) {
                toast.success("Adoption request sent successfully!");
                setAdoptDate('');
                setMessage('');
            } else {
                toast.error("Failed to send request");
            }
        } catch (error) {
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    if (!user) return <p className="text-red-500 text-5xl text-center py-10">Please login to adopt</p>;

    return (
        <div className="bg-white rounded-3xl shadow-lg p-8 space-y-5 border border-amber-200">
            <h2 className="text-2xl font-bold">Adopt {animal.name}</h2>

            <div className="space-y-4">
                <div>
                    <Label>Pet Name</Label>
                    <input type="text" value={animal.name} readOnly className="w-full p-3 rounded-2xl bg-gray-100" />
                </div>

                <div>
                    <Label>Your Name</Label>
                    <input type="text" value={user.name} readOnly className="w-full p-3 rounded-2xl bg-gray-100" />
                </div>

                <div>
                    <Label>Your Email</Label>
                    <input type="email" value={user.email} readOnly className="w-full p-3 rounded-2xl bg-gray-100" />
                </div>

                <div>
                    <Label>Preferred Date</Label>
                    <input
                        type="date"
                        value={adoptDate}
                        onChange={(e) => setAdoptDate(e.target.value)}
                        className="w-full p-3 rounded-2xl border"
                    />
                </div>

                <div>
                    <Label>Message (Optional)</Label>
                    <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Why do you want to adopt this pet?"
                        rows={4}
                        className="w-full p-3 rounded-2xl border resize-none"
                    />
                </div>

                <Button onClick={handleAdoption} disabled={loading} className="w-full py-3 text-lg">
                    {loading ? "Sending Request..." : "Adopt Now"}
                </Button>
            </div>
        </div>
    );
};

export default AdoptForm;