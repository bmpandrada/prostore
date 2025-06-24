'use client'; {/*ay isang directive na ginagamit sa Next.js (lalo na sa App Router) para sabihin na ang  
                isang file o component ay dapat i-render sa client-side (browser) at hindi sa server. */}

import { useTheme } from "next-themes";
import { 
    DropdownMenu, 
    DropdownMenuTrigger, 
    DropdownMenuLabel, 
    DropdownMenuSeparator,
    DropdownMenuContent,
    DropdownMenuCheckboxItem} 
from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button"; // Importing Button component from the UI library
import { MoonIcon, SunIcon, SunMoon } from "lucide-react"; // Importing icons for light and dark mode    
import { useEffect, useState } from "react";


const ModeleToggle = () => {
    const [ mounted, setMounted ] = useState(false); // State to check if the component is mounted
    const { theme, setTheme } = useTheme();

    const themes = [
        { label: 'Light', value: 'light', icon: <SunIcon /> },
        { label: 'Dark', value: 'dark', icon: <MoonIcon /> },
        { label: 'System', value: 'system', icon: <SunMoon /> } 
    ]

    const currentTheme = themes.find(iconKey => iconKey.value === theme);
    
    useEffect(() => {
        setMounted(true); // Set mounted to true after the component is mounted
    }, [])

    if (!mounted) return null; // If not mounted, return null to avoid hydration errors


    return (<DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button variant={"ghost"}
                className="focus-visible:ring-0 focus-visible:ring-offset-0">
                {currentTheme?.icon}
            </Button>
        </DropdownMenuTrigger>
                <DropdownMenuContent>
            <DropdownMenuLabel>Apperance</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {themes.map(({label, value})=> (
                 <DropdownMenuCheckboxItem checked={theme === value}
                 key={value}
                 onClick={() => setTheme(value)}>
                {label}
                </DropdownMenuCheckboxItem>
            ))}

            </DropdownMenuContent>
    </DropdownMenu> );
}
 
export default ModeleToggle;