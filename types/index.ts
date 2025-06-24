import { insertProductScheme } from "@/lib/validator";
import { z } from "zod";

export type Product = z.infer<typeof insertProductScheme> & { // Extending the Product type with additional properties
    id: string;
    rating: string;
    createdAt: Date;

}