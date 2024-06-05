'use client'

import { useEffect, useState, useRef } from "react"
import Image from "next/image"

import { ControllerRenderProps, FieldValues } from "react-hook-form"

import { ImagePlus, X } from "lucide-react"

type DragDropInputProps = {
    field: ControllerRenderProps<FieldValues, "imagesUrl">
}

export function DragDropInput({ field }: DragDropInputProps) {
    const [dragActive, setDragActive] = useState(false)
    const inputRef = useRef<HTMLInputElement | null>(null)
    const [imagesPreview, setImagesPreview] = useState<string[]>([])

    useEffect(() => {
        const stringUrlList = imagesPreview.join(';')
        field.value = stringUrlList
        field.onChange(stringUrlList)

    }, [imagesPreview])

    function handleDrop(e: any) {
        e.preventDefault()
        e.stopPropagation()
        setDragActive(false)

        const droppedFiles: File[] = Array.from(e.dataTransfer.files)
        const urlList = droppedFiles.map(file => URL.createObjectURL(file))

        setImagesPreview((prevState) => [...prevState, ...urlList])
    }

    function handleDragOver(e: any) {
        e.preventDefault()
    }

    function handleDragEnter(e: any) {
        e.preventDefault()
        setDragActive(true)
        
    }

    function handleDragLeave(e: any) {
        e.preventDefault()
        setDragActive(false)
    }

    function handleOpenFileExplorer() {
        inputRef.current?.click()
    }

    function handleFileChange(e: any) {
        const selectedFiles: File[] = Array.from(e.target.files)
        const urlList = selectedFiles.map(file => URL.createObjectURL(file))
        
        setImagesPreview((prevState) => [...prevState, ...urlList])
    }

    function handleDeleteFile(e: any, url: string) {
        e.preventDefault()

        const newImagesPreview = imagesPreview.filter(currentUrl => currentUrl !== url)
        setImagesPreview(newImagesPreview)
    }

    return (
        <div className="flex flex-col gap-6">
            <div
                className={`
                    ${dragActive ? 'bg-indigo-500' : 'bg-indigo-400'}
                    cursor-pointer
                    outline-4
                    outline-dashed
                    outline-indigo-600
                    outline-offset-2
                    flex
                    flex-col
                    p-6
                    justify-center
                    items-center
                    w-full
                    min-h-[250px]
                    rounded-lg
                `}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={handleOpenFileExplorer}
            >
                <input
                    className="hidden"
                    type="file"
                    accept="image/*"
                    multiple
                    ref={inputRef}
                    onChange={handleFileChange}
                />
                <ImagePlus color="#FFF" size={60} />
                <h3 className="text-center mt-3 text-white">
                    Arraste imagens aqui ou clique para fazer upload
                </h3>
            </div>
            <ul className="bg-gray-300 flex gap-6 overflow-scroll outline-4 outline-dashed outline-gray-300 outline-offset-2 min-h-40 p-2 rounded-lg">
                {imagesPreview.length === 0 && <h3 className="m-auto text-gray-600">Nenhuma imagem selecionada</h3>}
                {imagesPreview.map(url => (
                    <li key={url} className="relative flex flex-col shrink-0 justify-between items-center gap-2">
                        <picture className="w-[100px] h-[100px]">
                            <Image src={url} alt="Image Preview" width={0} height={0} sizes="100vw" className="rounded-sm w-full h-auto" />
                        </picture>
                        <button
                            className="absolute text-center p-1 bg-red-500 rounded-full -top-2 -right-2"
                            data-url={url}
                            onClick={(e) => handleDeleteFile(e, url)}
                        >
                            <X color="#FFF" size={18} />
                        </button>
                    </li>
                ))}
            </ul>
        </div>

    )
}