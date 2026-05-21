'use client';
import { Button, Input, Label, TextField, TextArea, Select, Modal } from "@heroui/react"
import { authClient } from "../lib/auth-client"
import { toast } from 'react-toastify'

const AddPet = () => {
    const { data: session } = authClient.useSession()
    const user = session?.user;

    const onSubmit = async (e) => {
        e.preventDefault()

        const formData = new FormData(e.currentTarget)
        const newPet = Object.fromEntries(formData.entries())

        newPet.ownerEmail = user?.email;
        newPet.ownerName = user?.name;



        const { data: tokenData } = await authClient.token()

        const res = await fetch('http://localhost:5000/animals', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${tokenData?.token}`
            },
            body: JSON.stringify(newPet)
        })


        const data = await res.json()

        if (data.insertedId) {
            toast.success("Pet added successfully!")
            e.target.reset()
        } else {
            toast.error("Failed to add pet")
        }
    };

    return (
        <div className="flex items-center justify-center">
            <Modal>
                <Button className='bg-blue-700 text-white text-xl rounded-sm px-8 hover:bg-green-700' variant="secondary">
                    + Add Pet
                </Button>

                <Modal.Backdrop>
                    <Modal.Container placement="auto">
                        <Modal.Dialog className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
                            <Modal.CloseTrigger />
                            <Modal.Header>
                                <Modal.Heading>Add New Pet</Modal.Heading>
                                <p className="text-sm text-gray-500">Fill all information about the pet</p>
                            </Modal.Header>

                            <Modal.Body className="p-6">
                                <form onSubmit={onSubmit} id="addPetForm" className="flex flex-col gap-5">

                                    <TextField isRequired name="name">
                                        <Label>Pet Name</Label>
                                        <Input placeholder="Bruno" />
                                    </TextField>

                                    <div className="grid grid-cols-2 gap-4">
                                        {/* Species Select */}
                                        <TextField isRequired name="species">
                                            <Label>Species</Label>
                                            <Input placeholder="Dog / Cat / Bird / Rabbit / etc" />
                                        </TextField>

                                        <TextField isRequired name="breed">
                                            <Label>Breed</Label>
                                            <Input placeholder="Golden Retriever / Maine Coon / Beagle" />
                                        </TextField>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <TextField isRequired name="age" type="number">
                                            <Label>Age (in years)</Label>
                                            <Input type="number" placeholder="2" />
                                        </TextField>

                                        {/* Gender Select */}
                                        <TextField isRequired name="gender">
                                            <Label>Gender</Label>
                                            <Input placeholder="Male / Female" />
                                        </TextField>
                                    </div>

                                    <TextField isRequired name="image">
                                        <Label>Image URL</Label>
                                        <Input placeholder="https://example.com/image.jpg" />
                                    </TextField>

                                    <div className="grid grid-cols-2 gap-4">
                                        <TextField isRequired name="healthStatus">
                                            <Label>Health Status</Label>
                                            <Input placeholder="Healthy" />
                                        </TextField>

                                        <TextField isRequired name="vaccinationStatus">
                                            <Label>Vaccination Status</Label>
                                            <Input placeholder="Fully Vaccinated" />
                                        </TextField>
                                    </div>

                                    <TextField isRequired name="location">
                                        <Label>Location</Label>
                                        <Input placeholder="Dhaka, Mirpur" />
                                    </TextField>

                                    <TextField isRequired name="adoptionFee" type="number">
                                        <Label>Adoption Fee Taka</Label>
                                        <Input type="number" placeholder="500" />
                                    </TextField>

                                    <TextField isRequired name="ownerEmail">
                                        <Label>Owner Email (Auto Filled)</Label>
                                        <Input value={user?.email || ''} readOnly className="bg-gray-100" />
                                    </TextField>

                                    <TextField isRequired name="description">
                                        <Label>Description</Label>
                                        <TextArea rows={5} placeholder="Write details about the pet..." />
                                    </TextField>

                                </form>
                            </Modal.Body>

                            <Modal.Footer>

                                <Button slot="close" variant="secondary">
                                    Cancel
                                </Button>

                                <Button type="submit" form="addPetForm">Add Pet</Button>
                            </Modal.Footer>
                        </Modal.Dialog>
                    </Modal.Container>
                </Modal.Backdrop>
            </Modal>
        </div>
    );
};

export default AddPet