"use client";
import { Button, Callout, Spinner, TextField } from "@radix-ui/themes";

import { IssueSchema } from "@/app/lib/rules";
import { IssueFormTypes } from "@/app/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import "easymde/dist/easymde.min.css";

import SimpleMDE from "react-simplemde-editor";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { AiOutlineAlert } from "react-icons/ai";
import ErrorMsg from "../../global_components/ErrorMsg";
import { Issue } from "@/app/generated/prisma";

const IssueForm = ({ issue }: { issue?: Issue }) => {
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
         if (!issue) {
            await axios.post("/api/issues", data);
         } else {
            await axios.patch(`/api/${issue.id}/edit-issue`, data);
         }
         router.push("/issues");
      } catch {
         setErrorMsg("An unexpected error occured");
      } finally {
         setIsLoading(false);
      }
   };

   return (
      <div className="flex flex-col gap-2 w-full md:w-[50vw]">
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
               defaultValue={issue?.title}
               placeholder="New issue title"
               {...register("title")}
            >
               <TextField.Slot />
            </TextField.Root>
            <ErrorMsg>{errors.title?.message}</ErrorMsg>
            <Controller
               name="description"
               control={control}
               defaultValue={issue?.description}
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

export default IssueForm;
