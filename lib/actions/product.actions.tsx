'use server';

import { convertToPlainObject } from "../utils";
import { LATEST_PRODUCTS_LIMIT } from "../constants";
import { prisma } from '@/db/prisma';

//get latest products
export async function getLatestProducts() { 

    const data = await prisma.product.findMany({
        take: LATEST_PRODUCTS_LIMIT,
        orderBy: { createdAt: 'desc' },
    });
    return   convertToPlainObject(data);
 }

 // get product by slug
 export async function getProductBySlug(slug: string) {
    return await prisma.product.findFirst({
        where: { slug: slug},
    })
 }