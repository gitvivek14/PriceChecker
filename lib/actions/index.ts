"use server"

import Product from "../models/product.model";
import { connecttoDb } from "../mongoose";
import { scrapeAmazonProduct } from "../scraper";
import { revalidatePath } from "next/cache";
import { getAveragePrice, getHighestPrice, getLowestPrice } from "../utils";
import { User } from "@/types";
import { generateEmailBody, sendEmail } from "../Nodemailer";
import { sendError } from "next/dist/server/api-utils";

export async function scrapeAndStoreProducts(productUrl:string) {
    if(!productUrl) return;
    
    try {
        connecttoDb();
        const scrapeproduct = await scrapeAmazonProduct(productUrl);
        if(!scrapeproduct)return;

        let product = scrapeproduct;
        const existingproduct = await Product.findOne({url:scrapeproduct.url});
        if(existingproduct){
            const updatedPriceHistory : any=[
                ...existingproduct.priceHistory,
                {price:scrapeproduct.currentPrice}
            ]
            product = { 
                ...scrapeproduct ,
                 priceHistory:updatedPriceHistory,
                lowestPrice:getLowestPrice(updatedPriceHistory),
                highestPrice:getHighestPrice(updatedPriceHistory),
                averagePrice:getAveragePrice(updatedPriceHistory)
        }
        }

    const newProduct = await Product.findOneAndUpdate(
        {url:scrapeproduct.url} ,
         product,
         {
        upsert:true , new :true
         }
    );

    revalidatePath(`/products/${newProduct._id}`);


    } catch (error:any) {
            console.log(error)
    }
    
}

export async function getProductById(productId:string){
    try {
        connecttoDb();
        const product = await Product.findOne({_id:productId});
        if(!product) return null;
        return product;
        
    } catch (error) {
        console.log(error)
    }
}


export async function getAllProducts(){
    try {
        connecttoDb();
        const products = await Product.find();
        if(!products) return null;
        return products;
    } catch (error) {
        console.log(error)        
    }
}

export async function getSimilarProducts(productId:string){
    try {
        connecttoDb();

        const currentProduct = await Product.findById(productId);

        if(!currentProduct) return null;

        const similarProduct  = await Product.find({
            _id:{$ne:productId},
        }).limit(3);

        return similarProduct;
    } catch (error) {
        console.log(error)        
    }
}

export async function addUserEmailtoProduct(productId:string,userEmail:string){
    try {
        const product = await Product.findById(productId);
        if(!product) return;
        const userExist = product.users.some((user:User)=>user.email === userEmail);
        if(!userExist){
            product.users.push({email:userEmail})
            await product.save();
            const emailContent = await generateEmailBody(product,"WELCOME");

            await sendEmail(emailContent,[userEmail])
        }
        
    } catch (error) {
        console.log(error)
    }
}