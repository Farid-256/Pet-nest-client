'use client'
import { useState } from 'react'
import MyRequests from './MyRequests'
import AddPet from './AddPet'
import MyListings from './MyListings'
import { Menu, X } from 'lucide-react'

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState('myListings')
    const [sidebarOpen, setSidebarOpen] = useState(false)

    const menuItems = [
        { id: 'myListings', label: 'My Listings' },
        { id: 'addPet', label: 'Add Pet' },
        { id: 'myRequests', label: 'My Requests' },
    ];

    return (
        <div className="flex min-h-screen bg-gray-100">

            <div className={`fixed md:static inset-y-0 left-0 z-50 w-72 bg-white border-r shadow-sm transform transition-transform duration-300 
                ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>

                <div className="p-6 border-b flex justify-between items-center md:hidden">
                    <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
                    <button onClick={() => setSidebarOpen(false)}>
                        <X size={28} />
                    </button>
                </div>

                <div className="p-6 border-b hidden md:block">
                    <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
                </div>

                <div className="p-4">
                    {menuItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => {
                                setActiveTab(item.id)
                                setSidebarOpen(false) 
                            }}
                            className={`w-full text-left px-5 py-3 rounded-xl mb-1 transition-all text-lg
                                ${activeTab === item.id
                                    ? 'bg-orange-500 text-white font-medium'
                                    : 'hover:bg-gray-100 text-gray-700'}`}
                        >
                            {item.label}
                        </button>
                    ))}
                </div>
            </div>

   
            <div className="flex-1 min-w-0">

  
                <div className="md:hidden bg-white border-b px-6 py-4 flex items-center justify-between sticky top-0 z-40">
                    <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
                    <button onClick={() => setSidebarOpen(true)}>
                        <Menu size={28} />
                    </button>
                </div>

                <div className="p-4 md:p-8">
                    {activeTab === 'myListings' && <MyListings />}
                    {activeTab === 'addPet' && <AddPet />}
                    {activeTab === 'myRequests' && <MyRequests />}
                </div>
            </div>
        </div>
    )
}

export default Dashboard