"use client"
import { useState, FormEvent } from 'react'
import axios from 'axios'
import { toast } from 'sonner'



export default function AddApiForm() {
   
    const [apiName, setApiName] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [link, setLink] = useState<string>('')
    const [errorMessage, setErrorMessage] = useState<string>('')
    const [successMessage, setSuccessMessage] = useState<string>('')

    const handlesubmit = async (e: FormEvent) => {
        e.preventDefault()
        try {
            const response = await axios.post('/api/user/addapi', {
                apiName,
                description,
                link
            })

            console.log(response.data)
            setSuccessMessage(response.data.message)
            toast.success("Api is Added")
            setErrorMessage('')
            setApiName('')
            setDescription('')
            setLink('')
        } catch (error) {
            console.error("Error submitting form:", error)
            setErrorMessage("Failed to add API. Please try again.")
            setSuccessMessage('')
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-6">
            <h1 className="text-4xl font-bold text-white mb-6 tracking-tight text-center">
                Add New API
            </h1>
            <form className="w-full max-w-md" onSubmit={handlesubmit}>
                <div className="mb-4">
                    <label className="block text-gray-300 mb-1 text-lg font-semibold" htmlFor="apiName">
                        API Name
                    </label>
                    <input
                        type="text"
                        id="apiName"
                        value={apiName}
                        onChange={(e) => setApiName(e.target.value)}
                        required
                        className="w-full p-3 bg-transparent border-2 border-gray-600 text-white rounded-md focus:outline-none focus:ring-0 focus:border-indigo-500 transition duration-200"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-300 mb-1 text-lg font-semibold" htmlFor="description">
                        Description
                    </label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        rows={3}
                        className="w-full p-3 bg-transparent border-2 border-gray-600 text-white rounded-md focus:outline-none focus:ring-0 focus:border-indigo-500 transition duration-200"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-300 mb-1 text-lg font-semibold" htmlFor="link">
                        API Website Link
                    </label>
                    <input
                        type="url"
                        id="link"
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                        required
                        className="w-full p-3 bg-transparent border-2 border-gray-600 text-white rounded-md focus:outline-none focus:ring-0 focus:border-indigo-500 transition duration-200"
                    />
                </div>

                {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                {successMessage && <p className="text-green-500">{successMessage}</p>}

                <button
                    type="submit"
                    className="w-full py-3 mt-6 bg-indigo-600 text-white font-semibold rounded-md shadow-lg hover:bg-indigo-700 transition-colors duration-300"
                >
                    Add API
                </button>
            </form>
        </div>
    )
}
