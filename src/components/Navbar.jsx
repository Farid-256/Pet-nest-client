'use client'
import { authClient } from "@/app/lib/auth-client";
import { Avatar } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
    const pathName = usePathname();
    const [showDropdown, setShowDropdown] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const { data: session } = authClient.useSession();
    const user = session?.user;

    const handleLogout = async () => {
        await authClient.signOut();
        window.location.href = '/';
        setMobileMenuOpen(false);
    };

    return (
        <nav className="bg-amber-50 border-b sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-6 py-5">
                <div className="flex justify-between items-center">

                    {/* Logo */}
                    <div className="flex items-center gap-2">
                        <Image className="rounded-full" src='/assets/navlogo.jpg' height={60} width={60} alt="logo" />
                        <h1 className="text-3xl font-bold text-fuchsia-500">Pet<span className="text-orange-500">Nest</span></h1>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-10">
                        <Link href="/" className={pathName === '/' ? 'text-xl text-gray-500 border-b-3 border-blue-700' : 'text-xl text-gray-500'}>
                            Home
                        </Link>
                        <Link href="/allPets" className={pathName === '/allPets' ? 'text-xl text-gray-500 border-b-3 border-blue-700' : 'text-xl text-gray-500'}>
                            All Pets
                        </Link>
                    </div>

                    {/* Right Side */}
                    <div className="flex items-center gap-4">
                        {user ? (
                            <div className="relative">
                                <div
                                    className="cursor-pointer"
                                    onClick={() => setShowDropdown(!showDropdown)}>
                                    <Avatar>
                                        <Avatar.Image alt={user.name} src={user?.image} />
                                        <Avatar.Fallback>{user.name?.[0]}</Avatar.Fallback>
                                    </Avatar>
                                </div>

                                {showDropdown && (
                                    <div className="absolute right-0 mt-3 w-52 bg-white rounded-2xl shadow-xl border py-2 z-50">
                                        <Link href="/dashBord" className="block px-6 py-3 hover:bg-gray-100" onClick={() => setShowDropdown(false)}>
                                            Dashboard
                                        </Link>

                                        <button onClick={handleLogout}
                                            className="w-full text-left px-6 py-3 hover:bg-gray-100 text-red-600 font-medium">
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Link href="/login">
                                <button className="bg-blue-700 hover:bg-blue-800 text-white px-8 py-2 cursor-pointer rounded-sm transition">
                                    Login
                                </button>
                            </Link>
                        )}

                        {/* Mobile Menu Button */}
                        <button
                            className="md:hidden"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden mt-6 py-6 border-t">
                        <div className="flex flex-col gap-6 text-lg">
                            <Link href="/" onClick={() => setMobileMenuOpen(false)} className="hover:text-orange-500">
                                Home
                            </Link>
                            <Link href="/allPets" onClick={() => setMobileMenuOpen(false)} className="hover:text-orange-500">
                                All Pets
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;