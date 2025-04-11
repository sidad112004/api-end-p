"use client"
import React, { useEffect, useState } from 'react'
import { SearchIcon, PlusCircleIcon, ExternalLinkIcon, XIcon } from '@heroicons/react/solid'
import { allapi } from '@/action/allapi'
import { searchapi } from '@/action/searchapi'
import { getSession, signIn } from 'next-auth/react'
import { redirect } from 'next/navigation'

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [apiResults, setApiResults] = useState([])
  const [selectedApi, setSelectedApi] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleSearch = async () => {
    try {
      const data = await searchapi(searchTerm)
      setApiResults(data || [])
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    const fetchApiData = async () => {
      try {
        const data = await allapi()
        setApiResults(data)
      } catch (error) {
        console.error("Failed to fetch API data:", error)
      }
    }
    fetchApiData()
  }, [])

  const openModal = (api) => {
    setSelectedApi(api)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setSelectedApi(null)
    setIsModalOpen(false)
  }

  const handleaddapi = async () => {
    const data = await getSession()
    if (data === null) {
      signIn()
    } else {
      redirect('/dashboard/addapi')
    }
  }

  return (
    <div className="flex flex-col items-center px-4 sm:px-6 lg:px-8 py-6 min-h-screen bg-gray-900 text-white">
      {/* Top Controls */}
      <div className="w-full max-w-5xl flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
        {/* Search Bar */}
        <div className="flex w-full md:flex-1 items-center bg-gray-800 rounded-full shadow-lg p-2 px-4">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search API name..."
            className="flex-grow text-sm sm:text-base p-2 text-white bg-transparent border-none placeholder-gray-400 focus:outline-none"
          />
          <button
            onClick={handleSearch}
            className="flex items-center gap-1 bg-indigo-500 text-white px-4 py-2 rounded-full hover:bg-indigo-600 transition duration-300"
          >
            <SearchIcon className="h-5 w-5" />
            <span className="hidden sm:inline">Search</span>
          </button>
        </div>

        {/* Add API Button */}
        <button
          onClick={handleaddapi}
          className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-full shadow-md hover:bg-green-600 transition duration-300"
        >
          <PlusCircleIcon className="h-6 w-6" />
          <span className="hidden sm:inline">Add API</span>
        </button>
      </div>

      {/* Grid of Results */}
      <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {apiResults.length > 0 ? (
          apiResults.map((api, index) => (
            <div
              key={index}
              onClick={() => openModal(api)}
              className="bg-gray-800 p-5 rounded-xl shadow hover:shadow-lg transition-transform hover:scale-[1.02] cursor-pointer"
            >
              <h3 className="text-lg font-semibold mb-2">{api.apiName}</h3>
              <p className="text-gray-400 text-sm mb-3">ID: <span className="font-medium">{api.id}</span></p>
              <a
                href={api.link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-1 text-indigo-400 hover:text-indigo-600 font-medium text-sm"
              >
                <ExternalLinkIcon className="h-4 w-4" />
                Visit Website
              </a>
            </div>
          ))
        ) : (
          <p className="text-gray-400 text-center col-span-full">No results found.</p>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && selectedApi && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 p-4">
          <div className="bg-gray-800 rounded-xl p-6 sm:p-8 w-full max-w-md sm:max-w-lg relative shadow-2xl">
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-white hover:text-red-500"
            >
              <XIcon className="h-6 w-6" />
            </button>
            <h2 className="text-2xl font-bold mb-3">{selectedApi.apiName}</h2>
            <p className="text-gray-300 mb-2 text-sm">Description: {selectedApi.description}</p>
            <p className="text-gray-400 mb-4 text-sm">Posted by: <span className="font-medium">{selectedApi.id}</span></p>
            <a
              href={selectedApi.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-indigo-400 hover:text-indigo-600 font-semibold text-sm"
            >
              <ExternalLinkIcon className="h-5 w-5 mr-1" />
              Visit API Website
            </a>
          </div>
        </div>
      )}
    </div>
  )
}

export default Dashboard
