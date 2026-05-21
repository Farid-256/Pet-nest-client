"use client";

import { FaHeartbeat, FaBone, FaBath } from "react-icons/fa";

const PetCareTips = () => {
    const tips = [
        {
            id: 1,
            title: "Healthy Food",
            desc: "Provide balanced meals with proteins, vitamins, and clean water daily.",
            icon: <FaBone className="text-4xl text-orange-500" />
        },
        {
            id: 2,
            title: "Regular Checkup",
            desc: "Visit a veterinarian regularly to ensure your pet stays healthy.",
            icon: <FaHeartbeat className="text-4xl text-red-500" />
        },
        {
            id: 3,
            title: "Clean & Hygiene",
            desc: "Keep your pet clean with regular baths and grooming.",
            icon: <FaBath className="text-4xl text-blue-500" />
        }
    ];

    return (
        <section className="py-20 px-6 md:px-16 bg-orange-50">
            <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-gray-800">Pet Care Tips</h2>
                <p className="text-gray-500 mt-3">
                    Simple tips to keep your lovely pets healthy and happy.
                </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                {tips.map(tip => (
                    <div
                        key={tip.id}
                        className="bg-white rounded-3xl p-8 shadow hover:shadow-xl transition"
                    >
                        <div className="mb-5">{tip.icon}</div>

                        <h3 className="text-2xl font-semibold mb-3">
                            {tip.title}
                        </h3>

                        <p className="text-gray-600">
                            {tip.desc}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default PetCareTips;