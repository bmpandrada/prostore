import Image from "next/image";
import loader from "@/app/assets/loader.gif"; // Importing the loader image

const LoadingPage = () => {
    return ( <>
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            width: '100vw',
        }}>
            <Image src={loader} alt="Loading..." width={150} height={150} className="mx-auto mt-20" />
        </div>
    </> );
}
 
export default LoadingPage;