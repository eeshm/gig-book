import {cn }from "@/lib/utils";
import Image from "next/image";

export const Grid = () => {
    return (
        <div className="pt-20 ">
            <div className="grid grid-cols-2 md:grid-cols-4">
                <Column>
                    <Card src="/images/image1.jpg" alt="Jazz Band Performing" className="md:rounded-tl-3xl"/>
                    <Card src="/images/image2.jpg" alt="Jazz Band Performing" className=""/>
                    <Card src="/images/image12.jpg" alt="Jazz Band Performing" className=""/>
                </Column>
                <Column>
                    <Card src="/images/image5.jpg" alt="Jazz Band Performing" className=""/>
                    <Card src="/images/image6.jpg" alt="Jazz Band Performing" className=""/>
                    <Card src="/images/image9.jpg" alt="Jazz Band Performing" className=""/>
                </Column>
                <Column>
                    <Card src="/images/image10.jpg" alt="Jazz Band Performing" className=""/>
                    <Card src="/images/image8.jpg" alt="Jazz Band Performing" className=""/>
                    <Card src="/images/image7.jpg" alt="Jazz Band Performing" className=""/>
                </Column>
                <Column>
                    <Card src="/images/image4.jpg" alt="Jazz Band Performing" className="md:rounded-tr-3xl"/>
                    <Card src="/images/image11.jpg" alt="Jazz Band Performing" className=""/>
                    <Card src="/images/image3.jpg" alt="Jazz Band Performing" className=""/>
                </Column>
            </div>
        </div>
    )
}



const Card = ({ src, alt, className }: { src: string; alt: string; className: string }) => {
    return <div className={cn("relative my-2 mx-2 overflow-hidden shadow-sm group", className)}>
            <Image 
            src={src}
            alt={alt}
            width={300}
            height={200}
            className={cn("hover:scale-[1.05] transition-transform duration-300 ease-in-out")}
            />
        </div>
};


const Column = ({ children }: { children: React.ReactNode }) => {
    return <div>{children}</div>
}

export default Grid;