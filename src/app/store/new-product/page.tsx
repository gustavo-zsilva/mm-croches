"use client"

import { useRef, useState } from 'react'
import Image from 'next/image'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, ControllerFieldState, ControllerRenderProps, FieldValues } from "react-hook-form"
import { z } from 'zod'

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { DragDropInput } from '@/components/DragDropInput'

const formSchema = z.object({
    name: z.string().min(3, { message: 'Nome curto demais!' }).max(80, { message: 'Nome comprido demais!' }),
    description: z.string().max(500, { message: 'Descrição comprida demais!' }),
    price: z.coerce.number({ required_error: 'Preço é obrigatório!' }).positive(),
    imageUrl: z.string().min(1, { message: 'Produto precisa ter uma imagem!' }),
    customMeasure: z.boolean(),
    promptDelivery: z.boolean(),
    type: z.string().min(1, { message: 'Selecione uma opção!' }),
})

export default function NewProduct() {
    const [imagesPreview, setImagesPreview] = useState<string[] | null>(null)
    const filesRef = useRef<FileList | null>(null)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            description: "",
            price: 10.99,
            imageUrl: "",
            customMeasure: false,
            promptDelivery: false,
            type: "",
        }
    })

    function handleImagesChange(files: FileList | null, field: ControllerRenderProps<FieldValues, "imageUrl">) {
        
        let blobs = []
        
        for (const file of files) {
            
            console.log(`Image Src: ${URL.createObjectURL(file)}`)
            blobs.push(URL.createObjectURL(file))
        }
        
        field.value = blobs.join(';')
        setImagesPreview(blobs)
    }

    function handleSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
       
        
    }

    return (
        <div className="px-6">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
                    <FormField
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nome do produto</FormLabel>
                                <FormControl>
                                    <Input placeholder="Nome" {...field} />
                                </FormControl>
                                <FormDescription>
                                    Entre 3 e 80 caracteres
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Descrição do produto</FormLabel>
                                <FormControl>
                                    <Input placeholder="Descrição" {...field} />
                                </FormControl>
                                <FormDescription>
                                    Máx. 500 caracteres
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        name="price"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Preço (R$)</FormLabel>
                                <FormControl>
                                    <Input placeholder="Preço" type="number" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        name="imageUrl"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Imagem</FormLabel>
                                <FormControl>
                                    {/* <Input
                                        className="bg-teal-200 border-teal-300 flex flex-col"
                                        type="file"
                                        accept="image/*"
                                        multiple
                                        
                                        value={field.value}
                                        onChange={(e) => handleImagesChange(e.target.files, field)}
                                    /> */}
                                    <DragDropInput />
                                </FormControl>
                                    {imagesPreview?.map(url => <Image src={url} key={url} alt="Preview" width={200} height={200} />)}
                            </FormItem>
                        )}
                    />
                    <div className="grid grid-cols-2 place-items-center">
                        <FormField
                            name="customMeasure"
                            render={({ field }) => (
                                <FormItem className="flex flex-col items-center">
                                    <FormLabel>Sob medida</FormLabel>
                                    <FormControl>
                                        <Switch
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="promptDelivery"
                            render={({ field }) => (
                                <FormItem className="flex flex-col items-center">
                                    <FormLabel>Pronta Entrega</FormLabel>
                                    <FormControl>
                                        <Switch
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormField
                        name="type"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Tipo</FormLabel>
                                <FormControl>
                                    <Select value={field.value} onValueChange={field.onChange}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Selecione o tipo" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="amigurumi">Amigurumis</SelectItem>
                                            <SelectItem value="clothing">Roupas</SelectItem>
                                            <SelectItem value="accessory">Acessórios</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormDescription>
                                    Seção da loja que o produto deve aparecer
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className="w-full rounded-sm">Submit</Button>
                </form>
            </Form>
        </div>
    )
}