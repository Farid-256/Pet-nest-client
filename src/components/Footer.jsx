import Link from 'next/link';
import Image from 'next/image';
import { FaFacebookF, FaInstagram, FaPhoneAlt, FaTwitter, FaYoutube } from 'react-icons/fa';
import { MdLocationOn } from "react-icons/md";
import { IoMdMail } from "react-icons/io";
import { FaRegCopyright, FaHeart } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300 mt-auto">
            <div className="max-w-7xl mx-auto px-6 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

                    {/* Brand Section */}
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <Image
                                className="rounded-2xl"
                                src="/assets/logo.jpg"
                                height={70}
                                width={70}
                                alt="PetNest Logo"
                            />
                            <h2 className="text-3xl font-bold text-white">PetNest</h2>
                        </div>
                        <p className="text-gray-400 leading-relaxed">
                            Giving every pet a loving home.<br />
                            Adopt, don&apos;t shop.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-5">Quick Links</h3>
                        <ul className="space-y-3">
                            <li><Link href="/" className="hover:text-white transition">Home</Link></li>
                            <li><Link href="/allPets" className="hover:text-white transition">Find Pets</Link></li>
                            <li><Link href="/adopt" className="hover:text-white transition">Adoption Process</Link></li>
                            <li><Link href="/stories" className="hover:text-white transition">Success Stories</Link></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-5">Support</h3>
                        <ul className="space-y-3">
                            <li><Link href="/about" className="hover:text-white transition">About Us</Link></li>
                            <li><Link href="/contact" className="hover:text-white transition">Contact</Link></li>
                            <li><Link href="/faq" className="hover:text-white transition">FAQs</Link></li>
                            <li><Link href="/volunteer" className="hover:text-white transition">Become a Volunteer</Link></li>
                        </ul>
                    </div>

                    {/* Contact & Social */}
                    <div className='flex flex-col space-y-5'>
                        <h3 className="text-lg font-semibold text-white">Get in Touch</h3>

                        <div className='space-y-2'>
                            <p className="flex items-center gap-2">
                                <MdLocationOn /> Dhaka, Bangladesh
                            </p>

                            <p className="flex items-center gap-2">
                                <IoMdMail /> faridiqubal34fx@gmail.com
                            </p>

                            <p className="flex items-center gap-2">
                                <FaPhoneAlt /> +88 01992-811801
                            </p>
                        </div>

                        <div className="flex gap-5 text-2xl">
                            <a href="https://www.facebook.com" target="_blank" className="hover:text-white transition"><FaFacebookF /></a>

                            <a href="https://www.instagram.com" target="_blank" className="hover:text-white transition"><FaInstagram /></a>

                            <a href="https://www.facebook.com/" target="_blank" className="hover:text-white transition"><FaTwitter /></a>

                            <a href="https://www.youtube.com/" target="_blank" className="hover:text-white transition"><FaYoutube /></a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-800 py-6">
                <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-sm">
                    <p className="flex items-center gap-1">
                        <FaRegCopyright /> 2026 PetNest. All rights reserved.
                    </p>
                    <p className="mt-3 md:mt-0 flex items-center gap-1">
                        Made with <FaHeart className="text-red-500" /> for our furry friends
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;