"use client"

import { scrapeAndStoreProducts } from "@/lib/actions";
import { FormEvent, useState } from "react";

const SearchBar = () => {

    const isvalidAmazonProductURL = (url:string)=>{
        try{
            const parsedURL = new URL(url); 
            const hostname = parsedURL.hostname;
            // if hostname == amazon
            if(hostname.includes('amazon.in') || hostname.includes('amazon.com') || hostname.endsWith('amazon')){
                return true;
            }else{
                return false;
            }


        }catch(e){
            return false;

        }

    }
    const[searchprompt ,setsearchprompt] = useState('');
    const [isLoading, setLoading] = useState(false)
    const handlesubmit = async (event:FormEvent<HTMLFormElement>)=>{
        event.preventDefault();
        const isValidLink = isvalidAmazonProductURL(searchprompt);
        // alert(isValidLink ? 'valid':'invalid');
        if(!isValidLink) {
            return alert('please provide valid link')
        }
        try {
            setLoading(true);
            // scrape product
            const product = await scrapeAndStoreProducts(searchprompt)

        } catch (error) {
            console.log(error)
            
        }finally{
            setLoading(false)
        }




    }
    return (
    <form className="flex flex-wrap gap-4 mt-12"
    onSubmit={handlesubmit}
    >
        <input type="text"
        placeholder="enter product link"
        className="searchbar-input"
        value={searchprompt}
        onChange={(e)=> setsearchprompt(e.target.value)}
        ></input>

        <button type="submit"
        disabled={searchprompt===''}

         className="searchbar-btn">
            {isLoading ? 'Searching':'Search'}
         </button>
    </form>
    );
}
 
export default SearchBar;