"use client";

import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";

const JsonUploader: React.FC = () => {
    const [title, setTitle] = useState<string>('');
    const [json, setJson] = useState<string>('');

    const handleSubmit = async () => {
        try {
            if (json === '' || title === '') {
                toast.error("Enter all the fields");
                return;
            }
           await axios.post('/api/user/jsonupload', { title, json });
            toast.success("JSON file is uploaded. Check your API section");
        } catch (err) {
            console.error(err);
            toast.error("An error occurred while uploading the JSON file");
        }
    };

    return (
        <div className="bg-background text-foreground flex flex-col items-center space-y-8 py-16 px-4 min-h-screen">
            <h1 className="text-4xl font-extrabold mb-6">Enter JSON Info</h1>

            <input
                className="w-3/4 max-w-lg p-4 text-xl bg-gray-800 border rounded-md placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ease-in-out"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
            />

            <textarea
                value={json}
                onChange={(e) => setJson(e.target.value)}
                className="w-3/4 max-w-lg h-40 p-4 text-xl bg-gray-800 border rounded-md placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ease-in-out"
                placeholder="Paste sample JSON data"
            />

            <button onClick={handleSubmit} className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none transform hover:scale-105 transition-transform duration-200 ease-in-out">
                Upload
            </button>
        </div>
    );
};

export default JsonUploader;
