import Container from "./Container"
import { FC } from "react"
import Link from 'next/link'

const Footer: FC = () => {
    //Primary Footer Nav Links
    const primLinks = [
        {
            name: "About",
            href: "/legal/service-product-policy"
        },
        {
            name: "FAQ",
            href: "/legal/service-product-policy"
        },
        {
            name: "Franchising",
            href: "/legal/service-product-policy"
        },
        {
            name: "Locations",
            href: "/legal/service-product-policy"
        },
        {
            name: "Membership",
            href: "/legal/service-product-policy"
        },
        {
            name: "Careers",
            href: "/legal/service-product-policy"
        },
        {
            name: "Gift Cards",
            href: "/legal/service-product-policy"
        },
        {
            name: "Contact",
            href: "/legal/service-product-policy"
        },
    ]

    //Secondary Footer Nav Links
    const secLinks = [
        {
            name: "Product & Service Policies",
            href: "/legal/service-product-policy"
        },
        {
            name: "Privacy Policy & Terms of Use",
            href: "/legal/privacy-policy"
        },
        {
            name: "Accessibility Statement",
            href: "/legal/accessibility-statement"
        },
    ]
    
    return (
        <footer className="">
            <div className="border-t border-neutral-primary">
                <Container>
                    <div className="py-10">
                        <div>
                            <ul className='flex flex-row flex-wrap justify-between'>
                                {primLinks.map(link => {
                                    const { href, name } = link
                                    return (
                                        <li className='w-1/2 pb-8'>
                                            <Link href={href}>{name}</Link>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    </div>
                </Container>
            </div>
            <div className="bg-neutral-primary text-white">
                <Container>
                    <div className='py-10 flex flex-col gap-y-8'>
                        <div>
                            <span>Heyday Wellness LLC. All rights reserved 2023.</span>
                        </div>
                        <div>
                            <ul className="flex flex-col gap-y-2">
                                {secLinks.map(link => {
                                    const { href, name } = link
                                    return (
                                        <li>
                                            <Link href={href}>{name}</Link>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    </div>
                </Container>
            </div>
        </footer>
    )
}

export default Footer