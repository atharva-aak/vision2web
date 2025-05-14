"use client"
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { CloudUpload, Loader2Icon, WandSparkles, X } from 'lucide-react'
import Image from 'next/image'
//@ts-ignore
import uuid4 from "uuid4";
import React, { ChangeEvent, useState } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { storage } from '@/configs/firebaseConfig'
import axios from 'axios'
import { useAuthContext } from '@/app/provider'
import { useRouter } from 'next/navigation'
import Constants from '@/data/Constants'
import { toast } from 'sonner'

function ImageUpload() {

    const [previewUrl, setPreviewUrl] = useState<string | null>(null)
    const [file, setFile] = useState<any>();
    const [model, setModel] = useState<string>();
    const [description, setDescription] = useState<string>();
    const { user } = useAuthContext();
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const OnImageSelect = (event: ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
            console.log(files[0])
            const imageUrl = URL.createObjectURL(files[0]);
            setFile(files[0]);
            setPreviewUrl(imageUrl);
        }
    }

    const OnConverToCodeButtonClick = async () => {
        if (!file || !model || !description) {
            console.log("Select All Fields");
            return;
        }
        setLoading(true);
        // Save Image to Firebase
        const fileName = Date.now() + '.png';
        const imageRef = ref(storage, "Wireframe_To_Code/" + fileName);
        await uploadBytes(imageRef, file).then(resp => {
            console.log("Image Uploaded...")
        });

        const imageUrl = await getDownloadURL(imageRef);
        console.log(imageUrl);

        const uid = uuid4();
        console.log(uid);
        // Save Info To Database
        const result = await axios.post('/api/wireframe-to-code', {
            uid: uid,
            description: description,
            imageUrl: imageUrl,
            model: model,
            email: user?.email
        });
        if (result.data?.error) {
            console.log("Not Enough credits");
            toast('Not Enough Credits!');
            setLoading(false);
            return;
        }
        setLoading(false);
        router.push('/view-code/' + uid);
    }

    return (
      <div className="mt-6 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {!previewUrl ? (
            <div
              className="p-7 border border-[#5b3bb2] rounded-md shadow-md flex flex-col items-center justify-center 
                        bg-cover bg-center relative mt-5" // Added mt-5 for slight downward shift
              style={{ backgroundImage: "url('/herobg.png')" }}
            >
              {/* Dark Overlay for Better Visibility */}
              <div className="absolute inset-0.5 bg-black opacity-40"></div>

              <div className="relative flex flex-col items-center">
                <CloudUpload className="h-10 w-10 text-white" />
                <h2 className="font-bold text-lg text-white mt-2">
                  Upload Image
                </h2>
                <p className="text-gray-300 mt-2">
                  Click Button Select Wireframe Image
                </p>
                <div className="p-5 w-full flex mt-4 justify-center">
                  <label htmlFor="imageSelect">
                    <h2 className="p-2 bg-blue-100 font-bold rounded-md px-5 cursor-pointer hover:bg-[#714dd5] hover:text-white transition duration-300">
                      Select Image
                    </h2>
                  </label>
                </div>
                <input
                  type="file"
                  id="imageSelect"
                  className="hidden"
                  multiple={false}
                  onChange={OnImageSelect}
                />
              </div>
            </div>
          ) : (
            <div className="p-5 border border-[#5b3bb2] border-dashed mt-5">
              <Image
                src={previewUrl}
                alt="preview"
                width={500}
                height={500}
                className="w-full h-[250px] object-contain"
              />
              <X
                className="flex ite justify-end w-full cursor-pointer text-white"
                onClick={() => setPreviewUrl(null)}
              />
            </div>
          )}

          <div
            className="p-7 border border-[#5b3bb2] rounded-md shadow-md flex flex-col
                        bg-cover bg-center relative overflow-hidden mt-5" // Added mt-5 for slight downward shift
            style={{ backgroundImage: "url('/herobg.png')" }}
          >
            {/* Dark Overlay for Better Visibility */}
            <div className="absolute inset-0.5 bg-black opacity-40"></div>
            <div className="relative flex flex-col">
              <h2 className="font-bold text-lg text-white mb-2">
                Select AI Model
              </h2>
              <Select onValueChange={(value) => setModel(value)}>
                <SelectTrigger className="w-full border border-[#5b3bb2] text-white">
                  <SelectValue
                    placeholder="Select AI Model"
                    className="!text-white"
                  />
                </SelectTrigger>
                <SelectContent className="bg-[#050816] border-none text-white">
                  {Constants?.AiModelList.map((model, index) => (
                    <SelectItem
                      value={model.name}
                      key={index}
                      className="cursor-pointer !bg-[#050816] !text-white hover:!bg-[#4921b1] hover:!text-white transition duration-300 data-[state=checked]:!text-white data-[state=checked]:!font-bold"
                    >
                      <div className="flex items-center gap-2">
                        <Image
                          src={model.icon}
                          alt={model.name}
                          width={25}
                          height={25}
                        />
                        <h2 className="!text-white"> {model.name} </h2>{" "}
                        {/* Force white text */}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <h2 className="font-bold text-lg mt-7 text-white">
                Enter Description about your webpage
              </h2>
              <Textarea
                onChange={(event) => setDescription(event?.target.value)}
                className="mt-3 h-[150px] border border-[#5b3bb2] text-white"
                placeholder="Write about your web page !"
              />
            </div>
          </div>
        </div>

        <div className="mt-14 flex items-center justify-center ">
          {" "}
          {/* Increased spacing */}
          <Button
            onClick={OnConverToCodeButtonClick}
            disabled={loading}
            className="bg-[#5b3bb2] hover:bg-[#4e2cad]"
          >
            {loading ? (
              <Loader2Icon className=" animate-spin" />
            ) : (
              <WandSparkles />
            )}
            Convert to Code
          </Button>
        </div>
      </div>
    );
    
}

export default ImageUpload
