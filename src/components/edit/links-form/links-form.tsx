// /* eslint-disable @typescript-eslint/no-misused-promises */
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useFieldArray, useForm } from "react-hook-form";
// import { z } from "zod";
// import { Button } from "~/components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "~/components/ui/form";
// import { Input } from "~/components/ui/input";
// import type { LinkState } from "../edit-links";

// const formSchema = z.object({
//   links: z
//     .object({
//       id: z.string(),
//       userId: z.string(),
//       linkName: z.string().nonempty(),
//       url: z.string().nonempty(),
//       priority: z.number(),
//     })
//     .array(),
// });

// type InferredFormSchema = z.infer<typeof formSchema>;

// const LinksForm = ({ links }: { links: LinkState[] }) => {
//   const form = useForm<InferredFormSchema>({
//     resolver: zodResolver(formSchema),
//     defaultValues: { links: links.map((link) => ({ ...link })) },
//   });

//   const { fields, remove } = useFieldArray<InferredFormSchema>({
//     control: form.control,
//     name: "links",
//   });

//   return (
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit((data) => console.log(data))}>
//         <div className="my-6 flex flex-1 flex-col items-center space-y-6 md:mb-10">
//           {fields.map((link, index) => (
//             <div
//               key={link.id}
//               className="w-full space-y-3 rounded-lg bg-[#FAFAFA] p-5"
//             >
//               <div className="flex justify-between">
//                 <div className="flex cursor-pointer items-center gap-2">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     width="12"
//                     height="6"
//                     fill="none"
//                     viewBox="0 0 12 6"
//                   >
//                     <path fill="#737373" d="M0 0h12v1H0zM0 5h12v1H0z" />
//                   </svg>
//                   <h5 className="select-none font-bold text-[#737373]">{`Link #${link.priority}`}</h5>
//                 </div>
//                 <h5
//                   className="cursor-pointer text-[#737373]"
//                   onClick={() => remove(index)}
//                 >
//                   Remove
//                 </h5>
//               </div>
//               <FormField
//                 control={form.control}
//                 name={`links.${index}.linkName`}
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Platform</FormLabel>
//                     <FormControl>
//                       <Input placeholder="shadcn" {...field} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name={`links.${index}.url`}
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Link</FormLabel>
//                     <FormControl>
//                       <Input placeholder="shadcn" {...field} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//             </div>
//           ))}
//           <Button type="submit">Submit</Button>
//         </div>
//       </form>
//     </Form>
//   );
// };

// export default LinksForm;
