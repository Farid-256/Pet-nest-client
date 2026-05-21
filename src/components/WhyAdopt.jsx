import Image from "next/image";

const WhyAdopt = () => {
    return (
        <section className="bg-gray-50 py-20">
            <div className="max-w-7xl mx-auto px-6">
                <h2 className="text-4xl font-bold text-center mb-4">Why Adopt Instead of Buying?</h2>
                <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
                    Adopting a pet saves lives and brings unmatched joy to your home.
                </p>

                <div className="grid md:grid-cols-3 gap-8">
                    <div className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-md transition">
                        <Image src='/assets/heart.jpg' height={50} width={50} alt="logo"></Image>
                        <h3 className="text-2xl font-semibold mb-3">Save a Life</h3>
                        <p className="text-gray-600">Thousands of pets are waiting in shelters. By adopting, you give them a second chance at a happy life.</p>
                    </div>

                    <div className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-md transition">
                        <Image src='/assets/home.jpg' height={50} width={50} alt="logo"></Image>
                        <h3 className="text-2xl font-semibold mb-3">Find Your Perfect Match</h3>
                        <p className="text-gray-600">Our pets are already vaccinated, neutered, and temperament tested — ready to become part of your family.</p>
                    </div>

                    <div className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-md transition">
                        <Image src='/assets/dollar.jpg' height={50} width={50} alt="logo"></Image>
                        <h3 className="text-2xl font-semibold mb-3">More Affordable</h3>
                        <p className="text-gray-600">Adoption fees are much lower than buying from breeders, and you get a healthy, loving companion.</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhyAdopt;