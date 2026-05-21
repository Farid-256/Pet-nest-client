'use client'

import { useEffect, useState } from "react"
import AllPetCard from "@/components/AllPetCard"

const AllPets = () => {

    const [animals, setAnimals] = useState([])

    const [search, setSearch] = useState('')
    const [species, setSpecies] = useState('')
    const [sort, setSort] = useState('')

    useEffect(() => {

        fetch(`http://localhost:5000/animals?search=${search}&species=${species}&sort=${sort}`)
            .then(res => res.json())
            .then(data => setAnimals(data))

    }, [search, species, sort]);

    return (
        <div className="px-10 py-10">

            <h3 className="text-center text-3xl font-bold mb-8">
                Total Animals: {animals.length}
            </h3>


            <div className="flex flex-col md:flex-row gap-4 mb-10 justify-center">


                <input type="text" placeholder="Search by pet name..." value={search} onChange={(e) => setSearch(e.target.value)} className="border px-4 py-3 rounded-xl w-full md:w-72"/>

                <select value={species} onChange={(e) => setSpecies(e.target.value)} className="border px-4 py-3 rounded-xl">
                    <option value="">All Species</option>
                    <option value="Dog">Dog</option>
                    <option value="Cat">Cat</option>
                    <option value="Bird">Bird</option>
                    <option value="Rabbit">Rabbit</option>
                </select>

                <select value={sort} onChange={(e) => setSort(e.target.value)} className="border px-4 py-3 rounded-xl">
                    <option value="">Default Sort</option>
                    <option value="low">Price Low to High</option>
                    <option value="high">Price High to Low</option>
                </select>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">

                {
                    animals.map(animal => (
                        <AllPetCard
                            key={animal._id}
                            animal={animal}
                        />
                    ))
                }

            </div>

        </div>
    );
};

export default AllPets