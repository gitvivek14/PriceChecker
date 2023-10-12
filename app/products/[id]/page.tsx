import Modal from "@/components/Modal";
import PriceInfoCard from "@/components/PriceInfoCard";
import ProductCard from "@/components/ProductCard";
import { getProductById, getSimilarProducts } from "@/lib/actions";
import { formatNumber } from "@/lib/utils";
import { Product } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

type Props =  {
    params:{id:string}
}
const ProductDetails = async  ({params:{id}}:Props) => {
    const Product:Product = await getProductById(id);
    if(!Product) redirect('/');

    const similarProducts = await getSimilarProducts(id);
    return ( <div className = "product-container">
        <div className="flex gap-28 xl:flex-row flex-col">
            <div className="product-image">
                <Image src={Product.image}
                alt={Product.title}
                width={580}
                height={400}
                className="mx-auto"
                ></Image>
            </div>
            <div className="flex-1 flex flex-col ">
                <div className="flex justify-between items-start gap-5
                flex-wrap pb-6 ">
                    <div className="flex flex-col gap-3">
                        <p className="text-[28px] text-secondary font-semibold">{Product.title}</p>
                        <Link href={Product.url} 
                        target="_blank"
                        className="text-base text-black opacity-50"
                        >
                            Visit Product
                        </Link>
                        </div>


                        <div className="flex items-center gap-3">
                            <div className="product-hearts">
                                <Image
                                 src="/assets/icons/red-heart.svg"
                                 alt="heart"
                                 width={20}
                                 height={20}
                                 ></Image>
                                <p className="text-base 
                                font-semibold text-[#D46F77]">
                                    {Product.reviewsCount}
                                </p>
                            </div>
                            <div className="p-2 bg-white-200 rounded-10">
                                <Image src="/assets/icons/bookmark.svg"
                                alt="bookmark"
                                width={20}
                                height={20}
                                ></Image>
                            </div>
                            <div className="p-2 bg-white-200 rounded-10">
                                <Image src="/assets/icons/share.svg"
                                alt="share"
                                width={20}
                                height={20}
                                ></Image>
                            </div>
                        </div>
                         </div>

                         <div className="product-info">
                            <div className="flex flex-col gap-2">
                                <p className="text-[34px]
                                 text-secondary font-bold">
                                    {Product.currency} 
                                    {formatNumber(Product.currentPrice)}</p>

                                    <p className="text-[21px] text-black
                                    opacity-50 line-through
                                font-bold">
                                    {Product.currency} 
                                    {formatNumber(Product.originalPrice)}</p>
                            </div>
                            <div className="flex flex-col gap-4">
                                <div className="flex gap-3">
                                    <div className="product-stars">
                                        <Image src="/assets/icon/star.svg"
                                        alt="star"
                                        width={16}
                                        height={16}
                                        ></Image>

                                        <p className="text-sm 
                                        text-primary-orange font-semibold">{Product.stars || '25'}</p>
                                    </div>
                                    <div className="product-reviews">
                                    <Image src="/assets/icon/comment.svg"
                                        alt="comment"
                                        width={16}
                                        height={16}
                                        ></Image>
                                        <p className="text-sm text-secondary font-semibold"
                                        >{Product.reviewsCount} Reviews</p>
                                    </div>
                                </div>

                                <p className="text-sm text-black opacity-50">
                                    <span className="text-primary-green font-semibold">93%</span> of buyers reccommned this
                                </p>
                            </div>
                         </div>


                         <div className="my-7 flex flex-col gap-5">
                            <div className="flex gap-5 flex-wrap">
                                <PriceInfoCard
                                title="Current Price"
                                iconSrc = "/assets/icons/price-tag.svg"
                                value={`${Product.currency} ${formatNumber(Product.currentPrice)}`}
                                borderColor = "#b6dbff"
                                ></PriceInfoCard>
                                 <PriceInfoCard
                                title="Average Price"
                                iconSrc = "/assets/icons/chart.svg"
                                value={`${Product.currency} ${formatNumber(Product.averagePrice)}`}
                                borderColor = "#b6dbff"
                                ></PriceInfoCard>
                                 <PriceInfoCard
                                title="Highest Price"
                                iconSrc = "/assets/icons/arrow-up.svg"
                                value={`${Product.currency} ${formatNumber(Product.highestPrice)}`}
                                borderColor = "#b6dbff"
                                ></PriceInfoCard>
                                 <PriceInfoCard
                                title="Lowest Price"
                                iconSrc = "/assets/icons/arrow-down.svg"
                                value={`${Product.currency} ${formatNumber(Product.lowestPrice)}`}
                                borderColor = "#BEFFC5"
                                ></PriceInfoCard>
                            </div>

                         </div>
                         <Modal productId={id}></Modal>
                 </div>

        </div>
        <div className="flex flex-col gap-6 border-2 border-red-500">
            <div className="flex flex-col gap-5">
                    <h3 className="text-2xl text-secondary font-semibold">
                        Product Description
                    </h3>

                    <div className="flex flex-col gap-4">
                        {
                            Product?.description?.split('\n')
                        }
                    </div>

            </div>

            <button className="btn w-fit mx-auto flex items-center
            justify-center gap-3 min-w-[200px]
            ">
                <Image src="/assets/icons/bag.svg"
                alt="check"
                width={22}
                height={22}
                ></Image>


                <Link href="/" className="text-base text-white">
                    Buy Now
                </Link>
            </button>
        </div>


       {
        similarProducts && similarProducts?.length>0 && (
            <div className="py-14 flex flex-col gap-2 w-full">
                <p className="section-text">Similar Products</p>

                <div className="flex flex-wrap gap-10 mt-7 w-full">
                    {similarProducts.map((product)=>(
                        <ProductCard key={product._id} product={product}></ProductCard>
                    ))}
                </div>

            </div>
        )
       }
    </div> );
}
 
export default ProductDetails;