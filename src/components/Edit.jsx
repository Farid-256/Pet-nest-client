"use client";

import { authClient } from "@/app/lib/auth-client";
import { Button, Input, Label, Modal, Surface, TextArea, TextField } from "@heroui/react";

import { redirect, useRouter } from "next/navigation";
import { toast } from "react-toastify";

export function Edit({ pet }) {
    const router = useRouter();

    const { data: session } = authClient.useSession();

    const user = session?.user;

    const onSubmit = async (e) => {

        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const newPet = Object.fromEntries(formData.entries())


        newPet.ownerEmail = user?.email;
        newPet.ownerName = user?.name;

        const { data: tokenData } = await authClient.token()
        const res = await fetch(`http://localhost:5000/animals/${pet._id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${tokenData?.token}`
            },
            body: JSON.stringify(newPet)
        });

        const data = await res.json()

        if (data.modifiedCount > 0) {
            toast.success("Pet updated successfully!");
            router.refresh()
            redirect('/allPets')
        } else {
            toast.error("Failed to update pet");
        }
    };
    return (
        <Modal>
            <Modal.Trigger>
                <button className="py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium
                rounded-2xl transition text-sm w-full">
                    Edit
                </button>
            </Modal.Trigger>


            <Modal.Backdrop>

                <Modal.Container placement="auto">

                    <Modal.Dialog className="max-w-2xl">
                        <Modal.CloseTrigger />
                        <Modal.Header>

                            <Modal.Heading>Contact Us</Modal.Heading>

                        </Modal.Header>
                        <Modal.Body className="p-6">
                            <Surface variant="default">

                                <form onSubmit={onSubmit} id="addPetForm" className="flex flex-col gap-5">

                                    <TextField defaultValue={pet.name} isRequired name="name">
                                        <Label>Pet Name</Label>
                                        <Input placeholder="Bruno" />
                                    </TextField>

                                    <div className="grid grid-cols-2 gap-4">

                                        <TextField defaultValue={pet.species} isRequired name="species">
                                            <Label>Species</Label>
                                            <Input placeholder="Dog / Cat / Bird / Rabbit" />
                                        </TextField>

                                        <TextField defaultValue={pet.breed} isRequired name="breed">
                                            <Label>Breed</Label>
                                            <Input placeholder="Golden Retriever" />
                                        </TextField>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">

                                        <TextField defaultValue={pet.age} isRequired name="age" type="number">
                                            <Label>Age (in years)</Label>
                                            <Input type="number" placeholder="2" />
                                        </TextField>

                                        <TextField defaultValue={pet.gender} isRequired name="gender">
                                            <Label>Gender</Label>
                                            <Input placeholder="Male / Female" />
                                        </TextField>

                                    </div>

                                    <TextField defaultValue={pet.image} isRequired name="image">
                                        <Label>Image URL</Label>
                                        <Input placeholder="https://example.com/image.jpg" />
                                    </TextField>

                                    <div className="grid grid-cols-2 gap-4">

                                        <TextField defaultValue={pet.healthStatus} isRequired name="healthStatus">
                                            <Label>Health Status</Label>
                                            <Input placeholder="Healthy" />
                                        </TextField>

                                        <TextField defaultValue={pet.vaccinationStatus} isRequired name="vaccinationStatus">
                                            <Label>Vaccination Status</Label>
                                            <Input placeholder="Fully Vaccinated" />
                                        </TextField>

                                    </div>

                                    <TextField defaultValue={pet.location} isRequired name="location">
                                        <Label>Location</Label>
                                        <Input placeholder="Dhaka, Mirpur" />
                                    </TextField>

                                    <TextField defaultValue={pet.adoptionFee} isRequired name="adoptionFee" type="number">
                                        <Label>Adoption Fee Taka</Label>
                                        <Input type="number" placeholder="500" />
                                    </TextField>

                                    <TextField isRequired name="ownerEmail">
                                        <Label>Owner Email</Label>
                                        <Input value={user?.email || ""} readOnly className="bg-gray-100" />
                                    </TextField>

                                    <TextField defaultValue={pet.description} isRequired name="description">
                                        <Label>Description</Label>

                                        <TextArea rows={5} placeholder="Write details about the pet..." />
                                    </TextField>

                                    <Modal.Footer>

                                        <Button slot="close" variant="secondary">
                                            Cancel
                                        </Button>

                                        <Button type="submit" form="addPetForm">
                                            Save
                                        </Button>
                                    </Modal.Footer>



                                </form>

                            </Surface>
                        </Modal.Body>



                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
}