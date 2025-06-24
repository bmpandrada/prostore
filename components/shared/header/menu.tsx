import { Button } from "@/components/ui/button";
import ModeleToggle from "./mode-toggle";
import Link from "next/link";
import { EllipsisVertical, ShoppingCart, UserIcon } from "lucide-react";
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

const Mene = () => {
    return ( 
        <div className="flex justify-end gap-3">
            <nav className="hidden md:flex w-full max-w-xs gap-1">
                <ModeleToggle />
                    {/* Kapag ginamit mo ang asChild, ang component ay hindi magre-render ng sarili 
                    niyang HTML element (halimbawa, hindi siya gagawa ng <button> o <div>), 
                    kundi gagamitin niya ang child element na ibinigay mo bilang base element. */}
                    <Button asChild variant='ghost'>
                        <Link href="/cart">
                            <ShoppingCart className="h-6 w-6" /> Cart
                        </Link>    
                    </Button>
                       <Button asChild>
                        <Link href="/sign-in">
                            <UserIcon className="h-6 w-6" /> Sign-in
                        </Link>    
                    </Button>
            </nav>
            <nav className="md:hidden ">
                <Sheet>
                    <SheetTrigger className="align-middle">
                        <EllipsisVertical />
                    </SheetTrigger>
                    <SheetContent className="flex flex-col items-start p-5">
                        <SheetTitle>Menu</SheetTitle>
                        <ModeleToggle />
                        <Button asChild variant='ghost'>
                            <Link href="/cart">
                                <ShoppingCart className="h-6 w-6" /> Cart
                            </Link>
                         </Button>   
                         <Button asChild>
                            <Link href="/sign-in">
                                <ShoppingCart className="h-6 w-6" /> Sign In
                            </Link>
                         </Button> 
                        <SheetDescription></SheetDescription>
                    </SheetContent>
                </Sheet>
            </nav>
        </div>
     );
}
 
export default Mene;