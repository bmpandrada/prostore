import { cn } from "@/lib/utils";

type ProductPriceProps = { 
    value: number;
    className?: string;
 }

interface ProductPriceComponentProps {
    value: ProductPriceProps['value'];
    className?: ProductPriceProps['className'];
}

const ProductPrice = ({ value, className }: ProductPriceComponentProps) => {
    const stringValue = value.toFixed(2); // para sa fixed decimal places
    const [intVal, floatVal] = stringValue.split('.');

    return ( 
         <p className={cn(`text-2xl ${className}`)}>
            <span className="text-xs align-super">$</span>
            { intVal }
            <span className="text-xs align-super">{ floatVal }</span>
        </p>    
    );
}
 
export default ProductPrice;