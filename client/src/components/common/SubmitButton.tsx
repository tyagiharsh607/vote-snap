'use client'

import { useFormStatus } from 'react-dom'
import { Button } from '../ui/button'

export function SubmitButton() {
    const { pending } = useFormStatus()

    return (

        <Button
            disabled={pending}
            type="submit"
            className={`w-full bg-black hover:bg-gray-800 text-white py-2 rounded-full transition-all duration-300 ${pending ? "opacity-70 cursor-not-allowed" : "hover:scale-105"
                }`}
        >
            {pending ? "Processing..." : "Submit"}
        </Button>

    )
}