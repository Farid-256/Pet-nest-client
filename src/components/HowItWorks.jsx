import { FaHome, FaPhoneAlt, FaSearch } from "react-icons/fa";
import { MdAddTask } from "react-icons/md";

const HowItWorks = () => {
    return (
        <section className="py-20 bg-white">
            <div className="max-w-6xl mx-auto px-6">
                <h2 className="text-4xl font-bold text-center mb-4">How Adoption Works</h2>
                <p className="text-center text-gray-600 mb-16 max-w-2xl mx-auto">
                    Simple steps to bring a new furry friend home
                </p>

                <div className="grid md:grid-cols-4 gap-8">
                    <div className="text-center">
                        <div className="w-16 h-16 mx-auto bg-orange-100 rounded-2xl flex items-center justify-center text-3xl mb-4"><FaSearch /></div>
                        <h3 className="font-semibold mb-2">1. Browse Pets</h3>
                        <p className="text-gray-600 text-sm">Explore our available pets and find your perfect match.</p>
                    </div>

                    <div className="text-center">
                        <div className="w-16 h-16 mx-auto bg-orange-100 rounded-2xl flex items-center justify-center text-3xl mb-4"><MdAddTask /></div>
                        <h3 className="font-semibold mb-2">2. Submit Request</h3>
                        <p className="text-gray-600 text-sm">Fill out the adoption form with your details.</p>
                    </div>

                    <div className="text-center">
                        <div className="w-16 h-16 mx-auto bg-orange-100 rounded-2xl flex items-center justify-center text-3xl mb-4"><FaPhoneAlt /></div>
                        <h3 className="font-semibold mb-2">3. Meet & Greet</h3>
                        <p className="text-gray-600 text-sm">We will contact you for a meeting with the pet.</p>
                    </div>

                    <div className="text-center">
                        <div className="w-16 h-16 mx-auto bg-orange-100 rounded-2xl flex items-center justify-center text-3xl mb-4"><FaHome /></div>
                        <h3 className="font-semibold mb-2">4. Bring Home</h3>
                        <p className="text-gray-600 text-sm">Complete the process and welcome your new family member.</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;