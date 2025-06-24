This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

```bash
npx create-next-app@latest
```

Here are the answers I am going to give:

```bash
✔ What is your project named? … prostore
✔ Would you like to use TypeScript? … Yes
✔ Would you like to use ESLint? … Yes
✔ Would you like to use Tailwind CSS? … Yes
✔ Would you like to use `src/` directory? … No
✔ Would you like to use App Router? (recommended) … Yes
✔ Would you like to customize the default import alias? … No
```

 for icons
https://lucide.dev/guide/installation

npm install lucide-react

for components using shadcn
https://ui.shadcn.com/docs/components

for theme switches 
npm install next-themes 

Section Intro
Now that we have our basic layout and some components including the product card display, we can start to implement a database.

We're going to be using a cloud PostgreSQL database that is offered through Vercel but is managed and is hosted by Neon, which is a great company and service. We're using the free tier so you don't need to pay anything or enter any credit card information to use this service.

We'll be using Prisma as our ORM to interact with our database. Instead of writing raw SQL queries, Prisma offers easy to use methods to create, read, update, delete and more.

Prisma has models that we can setup in the schema file and these models pertain to the database tables. So we define the fields, types and other annotations like default values and primary keys.

Once we create these models, we can use them to create and run a migration, which will actually create our tables with all the fileds. So there's no having to go into something like PG Admin to create our fields and provision the database.

I want to have some sample data to work with so I'll show you how we can setup seeding, which is an easy, reusable way to populate our database with sample data.

Another library we'll be using and setting up is Zod which is a schema validation library. We'll be using it to validate our data to make sure that it is in the correct format. We'll get this setup in this section.

Once everything is setup and we run our migrations, we'll refactor our code to use the database and Prisma instead of the TypeScript file with the sample data. We're going to create the product details page as well as the product images component which will have a large image and then clickable thumbnails under it.

Lastly, we're actually going to deploy our application to Vercel. Usually I wait until the end, but I want this course to be more realistic and to show you how to deploy your application and have continuous deployment. So that when you push to Github, your application will automatically be deployed to Vercel. So we'll have our development environment and our production environment throughout the course. 

1. got to vercel find storage create DataBase select "Neon Severless Postgres"
2. set it up

neon -- Neon is a cloud-based PostgreSQL database service — fast, serverless, and free-tier-friendly. Ginagamit ito para mag-host ng PostgreSQL databases online, at kadalasan ginagamit ito sa mga modern web apps tulad ng Next.js, Prisma, Vercel, at iba pa. -->



 "npm i -D prisma @prisma/client" -> ORM (Object Relational Mapper) para sa Node.js at TypeScript. Ginagamit ito para makipag-communicate sa databases (MySQL, PostgreSQL, SQLite, atbp.) nang mas madali, type-safe, at developer-friendly. 

 1. $ npx prisma init -> initialize at create schema file
 it initializes Prisma in your project. Basically, it sets up the files and structure needed for you to start using Prisma.

 2. go back to the neon which created copy the DATABASE_URL inside the env of your app project.

 3. setup your db on schema.prisma

 4. add script on package json add this line "postinstall": "prisma generate"

 5. npx prisma generate

 6. megrate to server "npx prisma migrate dev --name init" (first migration setup) this will create file for migration.sql

 7. run 'npx prisma studio' for visualize db admin the actual db -->


 the populate(seeding) database

 1. create function inside dir of DB folder

 2. nameit seed.tsx

 3. 
 import { PrismaClient } from "@prisma/client";

    import sampleData from "./sample-data";

    async function main() { 

        const prisma = new PrismaClient();
        await prisma.product.deleteMany();

        await prisma.product.createMany({data: sampleData.products});
        console.log("Sample data seeded successfully");

    }

    main()

4. $ npx tsx ./db/seed

5.  run 'npx prisma studio' for visualize db admin the actual db 

-->

Utils Create convert Prisma to Json

1. go to ur lib add function:
function convert prisma object to JSON
export function convertToPlainObject<T>(value: T): T {
  return JSON.parse(JSON.stringify(value))
}

2. apply ur function to function and create server function:
    dir lib -> actions -> production.actions.tsx : create like this:

'use server';
import { PrismaClient } from "@/lib/generated/prisma"; // or adjust if not using alias
import { convertToPlainObject } from "../utils";

//get latest products
export async function getLatestProducts() { 
    const prisma = new PrismaClient();

    const data = await prisma.product.findMany({
        take: 4,
        orderBy: { createdAt: 'desc' },
    });

    return   convertToPlainObject(data);
 }


ZOD --> 
Ginagamit ang Zod kapag gusto mong:
Siguraduhin na tama ang format ng data na nanggaling sa form, API, database, atbp.
Mag-validate ng input ng user (halimbawa: email, age, etc.)
I-define ang expected na structure ng data at awtomatikong makuha ang TypeScript type
Protektahan ang system mo sa maling data

1. create a file 'types' in the root folder
2. inside the types folder put index.ts

import { insertProductScheme } from "@/lib/validator";
import { z } from "zod";

export type Product = z.infer<typeof insertProductScheme> & { // Extending the Product type with additional properties
    id: string;
    rating: string;
    createdAt: Date;

}

2. install zod 'npm i zod'
3. create validator inside of lib name it validators.ts
import { z } from "zod";
import { formatNumberWithDecimal } from "./utils";

const currency =  z
    .string()
    .refine((value)=> /^\d+(\.\d{2})?$/.test(formatNumberWithDecimal(Number(value))),
    'Price must be a valid number with two decimal places');

//Schema for inserting products
export const insertProductScheme = z.object({
    name: z.string().min(3, 'Name must be at least 3 characters long'),
    slug: z.string().min(3, 'Slug must be at least 3 characters long'),
    category: z.string().min(3, 'Category must be at least 3 characters long'),
    brand: z.string().min(3, 'Brand must be at least 3 characters long'),
    description: z.string().optional(),
    stock: z.coerce.number(),
    images: z.array(z.string()).min(1, 'Product must have at least one image'),
    isFeatured: z.boolean(),
    banner: z.string().nullable(),
    price: currency,
})

now use it:
import { Product } from "@/types";
const ProductCard = ({ product }: {product: Product}) => ...



-> 3 thing to install for Serveless Environment Config

1. npm install @neondatabase/serverless @prisma/adapter-neon ws
2. npm i -D @types/ws bufferutil
3. go to prisma add one line of code for use of adapter

generator client {
  provider = "prisma-client-js"
  output   = "../lib/generated/prisma" < -- removed
  previewFeatures = ["driverAdapters"]  <--- add
}

4. run npx prisma generate

5. 
'use server';
import { prisma } from '@/db/prisma'; 
import { convertToPlainObject } from "../utils";
import { LATEST_PRODUCTS_LIMIT } from "../constants";

//get latest products
export async function getLatestProducts() { 

    const data = await prisma.product.findMany({
        take: LATEST_PRODUCTS_LIMIT,
        orderBy: { createdAt: 'desc' },
    });

    return   convertToPlainObject(data);
 }


6. create inside db file nameit prisma.ts:
import { neonConfig } from '@neondatabase/serverless';
import { PrismaNeon } from '@prisma/adapter-neon';
import { PrismaClient } from '@prisma/client';
import ws from 'ws';

const connectionString = `${process.env.DATABASE_URL}`
const adapter = new PrismaNeon({ connectionString })
neonConfig.webSocketConstructor = ws;

export const prisma = new PrismaClient({ adapter }).$extends({
  result: {
    product: {
      price: {
        compute(product) {
          return product.price.toString();
        },
      },
      rating: {
        compute(product) {
          return product.rating.toString();
        },
      },
    },
  },
});

7. create slug : go to lib/action: product.action.tsx
 // get product by slug
 export async function getProductBySlug(slug: string) {
    return await prisma.product.findFirst({
        where: { slug: slug},
    })
 }

 8. create route server slug got to root file product/[slug] : page.tsx

import { Badge } from "@/components/ui/badge"; 
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getProductBySlug } from "@/lib/actions/product.actions";
import { notFound } from "next/navigation";
import ProductPrice from "@/components/shared/product/product-price";


const ProductDetailsPage = async(props: 
    { params: Promise<{slug: string}>;
}) => {
    const { slug } = await props.params;
    const product = await getProductBySlug(slug);
    if(!product) notFound();
    
    return  <>
    <section>
        <div className="grid grid-cols-1 md:grid-cols-5">
            <div className="col-span-2">

            </div>
            <div className="col-span-2 p-5">
                <div className="flex flex-col gap-6">
                    <p>
                        {product.brand} {product.category}
                    </p>
                    <h1 className="h3-bold">{product.name}</h1>
                    <p>{product.rating} of {product.numReviews} Reviews</p>
                    <div className="flex-col sm:flex-row sm:items-center gap-3">
                        <ProductPrice value={Number(product.price)}
                         className="w-24 rounded-full
                          bg-green-100 text-green px-5 py-2" />
                    </div>
                </div>
                <div className="mt-10">
                    <p className="font-semibold">Description</p>
                    <p>{product.description}</p>
                </div>
            </div>
                <div>
                    <Card>
                        <CardContent className="p-4">
                            <div className="mb-2 flex justify-between">
                                <div>Price</div>
                                <div>
                                    <ProductPrice value={Number(product.price)} />
                                </div>
                            </div>
                            <div className="mb-2 flex justify-between">
                                <div>Status</div>
                                {product.stock > 0 ? (
                                    <Badge variant={"outline"}>In Stock</Badge>
                                ) : (
                                    <Badge variant={"destructive"}>Out Of Stock</Badge>)}
                            </div>
                            {product.stock > 0 && (
                                <div className="flex-center">
                                    <Button className="w-full">Add To Cart</Button>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>

        </div>
    </section>
    
    </>;
}
 
export default ProductDetailsPage;

``


Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
