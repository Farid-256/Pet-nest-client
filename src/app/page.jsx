import Banner from "@/components/Bannar";
import { getData } from "./lib/data";
import PetCard from "@/components/PetCard";
import WhyAdopt from "@/components/WhyAdopt";
import SuccessStories from "@/components/SuccessStories";
import PetCareTips from "@/components/PetCareTips";
import HowItWorks from "@/components/HowItWorks";
import HappyAdopters from "@/components/HappyAdopters";

export default async function Home() {
  const animals = await getData();

  return (
    <main>
      <Banner />

      {/* Featured Pets Section */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-3">Available Pets</h2>
          <p className="text-gray-600 text-lg">Find your perfect companion from our lovely animals</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {animals.map((animal) => (
            <PetCard key={animal._id} animal={animal} />
          ))}
        </div>
      </section>

      <WhyAdopt />
      <SuccessStories />
      <PetCareTips />
      <HowItWorks />
      <HappyAdopters />
    </main>
  );
}