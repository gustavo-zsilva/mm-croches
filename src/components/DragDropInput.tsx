'use client'

import { useState } from "react"
import { ImagePlus } from "lucide-react"

export function DragDropInput() {
    const [dragActive, setDragActive] = useState(false)

    return (
        <div
            className={`${dragActive ? 'bg-indigo-500' : 'bg-indigo-400'} outline-4 outline-dashed outline-indigo-600 outline-offset-2 flex justify-center items-center w-full min-h-[250px] rounded-lg`}
        >
            <input
                className="hidden"
                type="file"
                accept="image/*"
                multiple
                // value={field.value}
                // onChange={(e) => handleImagesChange(e.target.files, field)}
                onDragEnter={() => setDragActive(true)}
                onDragLeave={() => setDragActive(false)}
            />

            <ImagePlus color="#FFF" size={60} />
        </div>
    )
}