import { CiFaceMeh, CiFaceSmile } from "react-icons/ci";
import { FaFaceGrin } from "react-icons/fa6";

const adopters = [
    {
        id: 1,
        name: "Rahim Ahmed",
        location: "Dhaka",
        pet: "Rocky (Labrador)",
        message: "Adopting Rocky was the best decision of my life. He brings so much joy to our family every single day!",
        avatar: <CiFaceSmile />,
        rating: 5,
    },
    {
        id: 2,
        name: "Fatima Khanam",
        location: "Chattogram",
        pet: "Sophie (Maine Coon)",
        message: "Sophie is the most gentle and loving cat. The adoption process was so smooth and easy!",
        avatar: <CiFaceMeh />,
        rating: 5,
    },
    {
        id: 3,
        name: "Karim Hossain",
        location: "Rajshahi",
        pet: "Charlie (Beagle)",
        message: "Charlie has completely changed our home atmosphere. Our kids absolutely love him!",
        avatar: <FaFaceGrin />,
        rating: 5,
    },
];

const HappyAdopters = () => {
    return (
        <section className="py-16 px-6 bg-orange-50">
            <div className="max-w-6xl mx-auto">

   
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-gray-800">Happy Adopters</h2>
                    <p className="text-gray-500 mt-3 max-w-xl mx-auto">
                        Real stories from people who gave a pet a forever home.
                        Your story could be next!
                    </p>
                </div>


                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {adopters.map(adopter => (
                        <div key={adopter.id} className="bg-white rounded-3xl p-6 shadow-md hover:shadow-xl transition">

        
                            <div className="text-orange-400 text-lg mb-4">
                                {'⭐'.repeat(adopter.rating)}
                            </div>

                            <p className="text-gray-500 text-sm leading-relaxed mb-6">
                                {adopter.message}
                            </p>


                            <div className="flex items-center gap-3 border-t pt-4">
                                <span className="text-4xl">{adopter.avatar}</span>
                                <div>
                                    <p className="font-bold text-gray-800">{adopter.name}</p>
                                    <p className="text-xs text-gray-400">{adopter.location}</p>
                                    <p className="text-xs text-orange-500 font-medium">{adopter.pet}</p>
                                </div>
                            </div>

                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default HappyAdopters;