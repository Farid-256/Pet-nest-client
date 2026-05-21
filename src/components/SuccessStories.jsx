import Image from "next/image"

const SuccessStories = () => {
    const stories = [
        {
            name: "Bruno & The Rahman Family",
            story: "Bruno was rescued from the street. Now he's the most loved member of our family. He brings joy every single day!",
            image: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=600",
        },
        {
            name: "Luna & Ayesha",
            story: "Luna helped my daughter overcome her anxiety. Their bond is something I'll always cherish.",
            image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600",
        },
    ];

    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-6">
                <h2 className="text-4xl font-bold text-center mb-4">Success Stories</h2>
                <p className="text-center text-gray-600 mb-12">Real families, real love stories</p>

                <div className="grid md:grid-cols-2 gap-10">
                    {stories.map((story, index) => (
                        <div key={index} className="flex flex-col md:flex-row gap-6 bg-gray-50 p-8 rounded-3xl">
                            <div className="md:w-1/2 relative h-64 rounded-2xl overflow-hidden">
                                <Image src={story.image} alt={story.name} fill className="object-cover" />
                            </div>

                            <div className="md:w-1/2 flex flex-col justify-center">
                                <p className="text-lg italic text-gray-700 mb-4">{story.story}</p>
                                <h4 className="font-semibold text-orange-600">- {story.name}</h4>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SuccessStories