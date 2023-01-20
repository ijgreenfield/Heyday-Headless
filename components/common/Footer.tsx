import Container from "./Container"
import { FC } from "react"
import Link from 'next/link'

const Footer: FC = () => {
    //Primary Footer Nav Links
    const primLinks = [
        {
            name: "About",
            href: "/about"
        },
        {
            name: "FAQ",
            href: "https://help.heydayskincare.com"
        },
        {
            name: "Franchising",
            href: "https://franchising.heydayskincare.com"
        },
        {
            name: "Locations",
            href: "/locations"
        },
        {
            name: "Membership",
            href: "/membership"
        },
        {
            name: "Careers",
            href: "https://heyday-skincare-careers.careerplug.com/jobs"
        },
        {
            name: "Gift Cards",
            href: "/product/gift-card"
        },
        {
            name: "Contact",
            href: "/contact"
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
        <footer className="font-sans text-sm">
            <div className="border-t border-neutral-primary">
                <Container>
                    <div className="py-10 md:py-12 flex flex-col gap-y-8">
                        <div className="md:w-1/3">
                            <ul className='flex flex-row flex-wrap justify-between md:justify-start text-sm font-mono'>
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
                        <div className="max-w-1/2 text-neutral-primary">
                            <p className="text-lg font-sans text-neutral-primary">Skincare Without Second Guessing</p>
                        </div>
                    </div>
                </Container>
            </div>
            <div className="bg-other-neutral text-white">
                <Container>
                    <div className='py-10 flex flex-col md:flex-row md:justify-between gap-y-8'>
                        <div>
                            <span>Heyday Wellness LLC. All rights reserved 2023.</span>
                        </div>
                        <div>
                            <ul className="flex flex-col md:flex-row gap-y-2 md:gap-x-6">
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