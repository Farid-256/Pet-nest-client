"use client";


import { authClient } from "@/app/lib/auth-client";
import { AlertDialog, Button } from "@heroui/react";
import { useRouter } from "next/navigation";

export function Delete({ pet }) {
    const router = useRouter()
    const handleDelete = async () => {

        const {data:tokenData} = await authClient.token()

        const res = await fetch(`http://localhost:5000/my-listings/${pet._id}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${tokenData?.token}`

            },
        })
        const data = await res.json()
        if (data.deletedCount > 0) {
            router.push('/allPets')
            router.refresh()
        }
    }
    return (
        <AlertDialog>
            <Button className='w-full' variant="danger">Delete</Button>
            <AlertDialog.Backdrop>
                <AlertDialog.Container>
                    <AlertDialog.Dialog className="w-96">
                        <AlertDialog.CloseTrigger />
                        <AlertDialog.Header>
                            <AlertDialog.Icon status="danger" />
                            <AlertDialog.Heading>Delete project permanently?</AlertDialog.Heading>
                        </AlertDialog.Header>
                        <AlertDialog.Body>
                            <p>
                                This will permanently delete <strong>My Awesome Project</strong> and all of its
                                data. This action cannot be undone.
                            </p>
                        </AlertDialog.Body>
                        <AlertDialog.Footer>
                            <Button slot="close" variant="tertiary">
                                Cancel
                            </Button>

                            <Button onClick={handleDelete} slot="close" variant="danger">
                                Delete Project
                            </Button>
                        </AlertDialog.Footer>
                    </AlertDialog.Dialog>
                </AlertDialog.Container>
            </AlertDialog.Backdrop>
        </AlertDialog>
    );
}