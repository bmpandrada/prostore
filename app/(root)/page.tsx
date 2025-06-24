// export const metadata = { for SEO connect with the title of the page outside of the root layout
//   title: 'Home',
// }

// const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
// const Homepage = async() => { for loading the page with a delay
// await delay(1000); // Simulate a delay for demonstration purposes
"use server";
import { getLatestProducts } from "@/lib/actions/product.actions";
import ProductList  from "@/components/shared/product/product-list";

const Homepage = async () => {
  // await delay(1000); // Simulate a delay for demonstration purposes
  // console.log("Homepage loaded with sample data:", sampleData.products);
  const latestProducts = await getLatestProducts();
  
  return <ProductList data={latestProducts} title="Newest Arrivals"/>
}
 
export default Homepage;