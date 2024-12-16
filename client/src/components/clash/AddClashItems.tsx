"use client";

import React, { ChangeEvent, useRef, useState } from "react";
import Image from "next/image";
import { Upload } from "lucide-react";
import { Button } from "../ui/button";
import { CLASH_ITEMS_URL } from "@/lib/apiEndpoints";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const AddClashItems = ({ token, clashId }: { token: string; clashId: string }) => {

    const router = useRouter()

    const [items, setItems] = useState<Array<ClashItemForm>>([
        { image: null },
        { image: null },
    ]);

    const [urls, setUrls] = useState<Array<string>>(["", ""]);
    const [errors, setErrors] = useState<Array<string>>([]);
    const imgRef1 = useRef<HTMLInputElement | null>(null);
    const imgRef2 = useRef<HTMLInputElement | null>(null);
    const [loading, setLoading] = useState(false);

    const handleImageChange = (event: ChangeEvent<HTMLInputElement>, index: number) => {
        // Handle image upload logic
        const file = event.target.files?.[0];
        if (file) {
            const updatedItems = [...items];
            updatedItems[index].image = file;
            setItems(updatedItems);

            const imageURl = URL.createObjectURL(file);
            console.log(imageURl);
            console.log(file);


            const updatedUrls = [...urls];
            updatedUrls[index] = imageURl;
            setUrls(updatedUrls)

        }
    };

    const handleSubmit = async () => {
        // Handle submit logic
        try {
            const formData = new FormData();
            formData.append("id", clashId);
            items.map(item => item.image && formData.append("images[]", item.image))

            console.log(formData.get("id"));
            console.log(formData.get("images[]"));
            if (formData.get("images[]")) {

                setLoading(true);
                const { data } = await axios.post(CLASH_ITEMS_URL, formData, {
                    headers: {
                        Authorization: token
                    }
                })
                if (data.message) {
                    toast.success(data.message);
                    setTimeout(() => { router.push("/dashboard") }, 1000)
                }
                setLoading(false)
            } else {
                toast.warning("Please upload both images")
            }
        } catch (error) {
            setLoading(false);
            if (error instanceof AxiosError) {
                if (error.response?.status === 422) {
                    setErrors(error.response?.data?.errors);
                } else if (error.response?.status === 404) {
                    toast.error(error.response?.data?.message);
                }
            } else {
                toast.error("Something went wrong.please try again!");
            }
        }


    };

    return (
        <div className="mt-10 px-4">
            <div className="flex flex-wrap lg:flex-nowrap justify-between items-center gap-6">
                {/* First Upload Block */}
                <div className="w-full lg:w-[500px] flex justify-center items-center flex-col gap-4">
                    <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        ref={imgRef1}
                        onChange={(e) => handleImageChange(e, 0)}
                    />
                    <div
                        className="w-full flex justify-center items-center rounded-md border border-dashed p-4 h-[300px] bg-gray-100 hover:bg-gray-200 cursor-pointer transition-all duration-200"
                        onClick={() => imgRef1?.current?.click()}
                    >
                        {urls.length > 0 && urls[0] !== "" ? (
                            <Image
                                src={urls[0]}
                                width={500}
                                height={500}
                                alt="preview-1"
                                className="w-full h-[300px] object-contain rounded-md"
                            />
                        ) : (
                            <h1 className="flex items-center space-x-2 text-lg text-gray-500">
                                <Upload size={24} /> <span>Upload File</span>
                            </h1>
                        )}
                    </div>
                    <span className="text-red-500 text-sm">{errors[0]}</span>
                </div>

                {/* VS Section */}
                <div className="flex w-full lg:w-auto justify-center items-center">
                    <h1 className="text-6xl font-extrabold bg-gradient-to-r text-black bg-clip-text">
                        VS
                    </h1>
                </div>

                {/* Second Upload Block */}
                <div className="w-full lg:w-[500px] flex justify-center items-center flex-col gap-4">
                    <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        ref={imgRef2}
                        onChange={(e) => handleImageChange(e, 1)}
                    />
                    <div
                        className="w-full flex justify-center items-center rounded-md border border-dashed p-4 h-[300px] bg-gray-100 hover:bg-gray-200 cursor-pointer transition-all duration-200"
                        onClick={() => imgRef2?.current?.click()}
                    >
                        {urls.length > 0 && urls[1] !== "" ? (
                            <Image
                                src={urls[1]}
                                width={500}
                                height={500}
                                alt="preview-2"
                                className="w-full h-[300px] object-contain rounded-md"
                            />
                        ) : (
                            <h1 className="flex items-center space-x-2 text-lg text-gray-500">
                                <Upload size={24} /> <span>Upload File</span>
                            </h1>
                        )}
                    </div>
                    <span className="text-red-500 text-sm">{errors[1]}</span>
                </div>
            </div>

            {/* Submit Button */}
            <div className="text-center mt-6">
                <Button
                    className="w-52 "
                    onClick={handleSubmit}
                    disabled={loading}
                >
                    {loading ? "Processing.." : "Submit"}
                </Button>
            </div>
        </div>
    );
};

export default AddClashItems;
