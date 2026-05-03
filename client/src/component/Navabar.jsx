import React from 'react'

const Navabar = () => {
  return (
    <div className="flex justify-between items-center bg-blue-500 text-white p-4">
        {/* logo */}
        <div className="text-xl font-bold">
            <h1>Crud-dummy</h1>
        </div>

        <div>
            <ul className="flex space-x-4">
                <li>Home</li>
                <li>About</li>
                <li>Contact</li>
            </ul>
        </div>

    </div>
  )
}

export default Navabar