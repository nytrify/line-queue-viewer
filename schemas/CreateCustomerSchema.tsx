import customerDataAtom from "@/data/Customers";
import { useAtom } from "jotai";
import {z}  from "zod";

export const CreateCustomerSchema = z.object({
    name: z.string().nonempty({message: "Name is required."})
        .refine((item) => {
            const queue = useAtom(customerDataAtom);
            return !queue.some(q => q.includes(item))
        }, {message: "Name is already in the queue!"});
})

export type CreateCustomerSchemaType = z.infer<typeof CreateCustomerSchema>