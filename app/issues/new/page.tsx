"use client";
import {
   Button,
   Callout,
   Spinner,
   Text,
   TextArea,
   TextField,
} from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { IssueFormTypes } from "@/app/lib/types";
import axios from "axios";
import { useRouter } from "next/navigation";
import { AiOutlineAlert } from "react-icons/ai";
import { zodResolver } from "@hookform/resolvers/zod";
import { IssueSchema } from "@/app/lib/rules";
import ErrorMsg from "./components/ErrorMsg";
import { boolean } from "zod";

const NewIssuePage = () => {
   const router = useRouter();
   const {
      register,
      control,
      handleSubmit,
      formState: { errors },
   } = useForm<IssueFormTypes>({
      resolver: zodResolver(IssueSchema),
   });
   const [errorMsg, setErrorMsg] = useState<string>("");
   const [isLoading, setIsLoading] = useState<boolean>(false);

   const handleSubmitEvent = async (data: IssueFormTypes) => {
      setIsLoading(true);
      try {
         await axios.post("/api/issues", data);
         router.push("/issues");
      } catch (error) {
         setErrorMsg("An unexpected error occured");
      } finally {
         setIsLoading(false);
      }
   };

   return (
      <div className="flex flex-col gap-2 w-[50vw]">
         {errorMsg && (
            <Callout.Root color="red">
               <Callout.Icon>
                  <AiOutlineAlert />
               </Callout.Icon>
               <Callout.Text>{errorMsg}</Callout.Text>
            </Callout.Root>
         )}

         <form
            className="flex flex-col gap-4 "
            onSubmit={handleSubmit((data) => handleSubmitEvent(data))}
         >
            <TextField.Root
               placeholder="New issue title"
               {...register("title")}
            >
               <TextField.Slot />
            </TextField.Root>
            <ErrorMsg>{errors.title?.message}</ErrorMsg>
            <Controller
               name="description"
               control={control}
               render={({ field }) => <SimpleMDE {...field} />}
            />

            <ErrorMsg>{errors.description?.message}</ErrorMsg>

            <Button disabled={isLoading}>
               {isLoading ? <Spinner size={"2"} /> : "Submit New Issue"}
            </Button>
         </form>
      </div>
   );
};

export default NewIssuePage;
