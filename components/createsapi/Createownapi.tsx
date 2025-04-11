"use client";

import { useState } from 'react';
import { Field, FieldType } from '@/utilite/type';
import axios from 'axios';
import { toast } from 'sonner';

export default function GenerateDataComponent() {
  const [fields, setFields] = useState<Field[]>([
    { name: 'id', type: 'number' },
    { name: 'name', type: 'string' }
  ]);
  const [count, setCount] = useState<number>(5);
  const [title, setTitle] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const addField = () => {
    setFields([...fields, { name: '', type: 'string' }]);
  };

  const handleFieldChange = (index: number, key: keyof Field, value: string) => {
    const updatedFields = [...fields];
    updatedFields[index][key] = value as FieldType;
    setFields(updatedFields);
  };

  const generateData = async () => {
    if (title === "") {
      toast.error("Please provide a title");
      return;
    }

    if (fields.some(field => field.name.trim() === "")) {
      toast.error("Field names cannot be empty");
      return;
    }

    setIsLoading(true);
    try {
      await axios.post('/api/user/createapi', { fields, count, title });
      toast.success("API created successfully! Check the page for your API.");
    } catch (error) {
      toast.error("An error occurred while generating data. Please try again.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center px-4 py-8 md:py-12">
      <h1 className="text-2xl md:text-3xl font-semibold mb-6 text-center">Generate Sample Data</h1>

      <div className="mb-4 w-full max-w-lg">
        <label className="block font-medium mb-2 text-white">Title</label>
        <input
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="bg-gray-800 text-white w-full px-4 py-2 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="API Title"
        />
      </div>

      <div className="mb-4 w-full max-w-lg">
        <label className="block font-medium mb-2 text-white">Number of Entries</label>
        <input
          type="number"
          value={count}
          onChange={(e) => setCount(Number(e.target.value))}
          className="bg-gray-800 text-white w-full px-4 py-2 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Number of Entries"
        />
      </div>

      <h2 className="text-xl md:text-2xl font-semibold mb-4 text-white">Fields</h2>

      <div className="w-full max-w-lg space-y-4">
        {fields.map((field, index) => (
          <div key={index} className="flex flex-col sm:flex-row sm:space-x-4 space-y-2 sm:space-y-0">
            <input
              type="text"
              placeholder="Field Name"
              value={field.name}
              onChange={(e) => handleFieldChange(index, 'name', e.target.value)}
              className="bg-gray-800 text-white flex-1 px-4 py-2 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label={`Field Name ${index + 1}`}
            />
            <select
              value={field.type}
              onChange={(e) => handleFieldChange(index, 'type', e.target.value)}
              className="bg-gray-800 text-white flex-1 px-4 py-2 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label={`Field Type ${index + 1}`}
            >
              <option value="string">String</option>
              <option value="number">Number</option>
              <option value="boolean">Boolean</option>
            </select>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-2 sm:space-y-0 mt-6 w-full max-w-lg">
        <button
          onClick={addField}
          className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Add Field
        </button>
        <button
          onClick={generateData}
          disabled={isLoading}
          className={`w-full sm:w-auto px-4 py-2 ${
            isLoading ? "bg-gray-500" : "bg-green-600 hover:bg-green-700"
          } text-white rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-green-500`}
        >
          {isLoading ? "Generating..." : "Generate Data"}
        </button>
      </div>
    </div>
  );
}
