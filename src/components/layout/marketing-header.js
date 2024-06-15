"use client";
import { useState } from 'react'
import { Dialog } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
// import SmartyWormImage from '@/../public/TheNovice-book-worm-smm.png'
import Image from 'next/image';
import Link from 'next/link';

const navigation = [
  { name: 'Pricing', href: '#pricing' },
  { name: 'How it Works', href: '#how-it-works' },
  { name: 'FAQ', href: '#faq' },
]

export default function MarketingHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="bg-white top-0 z-10 w-full flex-col font-large" style={{background: "#f8f7f4"}}>
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-2 lg:px-8" aria-label="Global">
        <div className="flex flex-1">
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <a key={item.name} href={item.href} className="text-sm font-semibold leading-6 text-gray-900">
                {item.name}
              </a>
            ))}
              <a 
                href="#"
                data-contact="aGVsbG9Ac21hcnR5c3RvcnkuY29t"
                onClick={(e) => { e.target.href = 'mailto:' + window.atob(e.target.dataset.contact) }}
                className="text-sm font-semibold leading-6 text-gray-900"
                title="Contact The Novice"
                >
                Contact
              </a>            
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </div>
        <Link href="https://TheNovice.com" className="-m-1.5 p-1.5">
          <span className="sr-only">The Novice</span>
            {/* <Image 
              className="h-12 sm:h-20 w-auto hover:saturate-200"  
              src={SmartyWormImage} 
              alt="TheNovice book  worm mascot"
              width="100px" height="100px" /> */}
        </Link>
        <div className="flex flex-1 justify-end">
          <Link href="/login" className="text-sm font-semibold leading-6 text-gray-900">
            Log in <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </nav>
      <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 left-0 z-10 w-full overflow-y-auto bg-white px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex flex-1">
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">The Novice</span>
              {/* <Image 
                className="h-12 sm:h-20 w-auto hover:saturate-200"  
                src={SmartyWormImage} 
                alt="TheNovice book  worm mascot"
                width="100px" height="100px" /> */}
            </a>
            <div className="flex flex-1 justify-end">
              <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
                Log in <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div>
          <div className="mt-6 space-y-2">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={()=>{setMobileMenuOpen(false)}}
                className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
              >
                {item.name}
              </a>
            ))}
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  )
}
