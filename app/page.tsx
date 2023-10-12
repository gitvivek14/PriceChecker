import HeroCarousel from "@/components/HeroCarousel";
import SearchBar from "@/components/Searchbar";
import Image from "next/image";
import { getAllProducts } from "@/lib/actions";
import ProductCard from "@/components/ProductCard";

const Home = async () => {
  const allProducts = await getAllProducts();

  return (
   <>
   <section className="px-6 border-2 border-red-600 
   md:px-20 py-24">
    <div className="flex max-xl:flex-col gap-16" >
      <div className="flex flex-col justify-center">
        <p className="small-text">
          Smart Shopping starts here 
          <Image src='/assets/icons/arrow.svg' 
          alt="arrow" width={16} height={16}>
          </Image>
        </p>
        <h1 className="head-text">
          Unleash Power of
          <span className="text-primary">PriceWise
          </span>
        </h1>
       <p className="mt-6"> Lorem ipsum dolor, sit amet consectetur adipisicing elit. Expedita eum corporis reprehenderit repudiandae minus ex et magni aspernatur illo consequatur illum dolor quibusdam reiciendis, a excepturi laboriosam nam praesentium ea
       .</p> 
      < SearchBar/>
      </div>
      <HeroCarousel/>
    </div>
   </section>
   {/* new section */}
   <section className="trending-section">
    <h2 className="section-text">Trending</h2>
    <div className="flex flex-wrap gap-x-8 gap-y-16">
   {allProducts?.map((product)=>(
   <ProductCard key={product._id} product={product}/>
   ))}
       </div>
   </section>
   </>
   );
}
 
export default Home
