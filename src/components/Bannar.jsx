import Link from 'next/link';
import Image from 'next/image';
import { FaHeart, FaHome, FaPaw, FaStar } from "react-icons/fa";

const Banner = () => {
    return (
        <div className="relative h-screen flex items-center justify-center overflow-hidden">

            {/* Background Image */}
            <Image
                src='https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=2070'
                alt="Happy pets ready for adoption"
                fill
                className="object-cover"
                priority
                quality={85}
            />

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/70" />

            {/* Content */}
            <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">

                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-5 py-2.5 rounded-full mb-6">
                    <span className="text-yellow-400">❤️</span>
                    <span className="text-sm font-medium text-white tracking-wider">FIND YOUR FOREVER FRIEND</span>
                </div>

                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
                    Give a Home,<br />
                    <span className="text-orange-400">Get Unconditional Love</span>
                </h1>

                <p className="text-lg md:text-xl lg:text-2xl text-gray-200 mb-10 max-w-2xl mx-auto">
                    Thousands of pets are waiting for a loving family.
                    Adopt today and change a life forever.
                </p>

                <Link href="/allPets">
                    <button className="bg-orange-500 hover:bg-orange-600 active:scale-95 transition-all duration-300 text-white text-xl font-semibold px-10 py-4 rounded-2xl flex items-center gap-3 mx-auto shadow-xl shadow-orange-500/40">
                        Adopt Now
                        <FaPaw className="text-2xl" />
                    </button>
                </Link>

                {/* Trust Signals */}
                <div className="flex flex-wrap justify-center gap-6 md:gap-10 mt-16 text-white/80 text-sm md:text-base">
                    <div className="flex items-center gap-2">
                        <FaHeart className="text-red-400" />
                        <span>1200+ Pets Adopted</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <FaStar className="text-yellow-400" />
                        <span>4.9/5 Happy Families</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <FaHome />
                        <span>Dhaka & Nationwide</span>
                    </div>
                </div>
            </div>
            
        </div>
    );
};

export default Banner;