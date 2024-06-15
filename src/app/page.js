'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import RainbowText from '@/components/layout/rainbow-text';
import Image from 'next/image';

const textClasses = [
  "text-violet-500",
  "text-teal-400",
  "text-red-500",
  "text-green-500",
  "text-blue-500"
];

// export const metadata = {
//   title: 'MoonPaint | Machine Learning for your house',
//   description: 'Evaluate your house with machine learning, find the right contractor to paint your house, and get a quote.',
// };

export default function BooksIndexPage() {

  const presetInputPrompt = "Enter address here..."

  const [address, setAddress] = useState(presetInputPrompt);
  const [imageUrl, setImageUrl] = useState('');

  const houseImgAddress = [
    "2510 Magnolia Blvd W, Seattle, WA 98199",
    "2607 Magnolia Blvd W, Seattle, WA 98199",
    "2701 Magnolia Blvd W, Seattle, WA 98199",
    "2805 Magnolia Blvd W, Seattle, WA 98199",
    "2903 Magnolia Blvd W, Seattle, WA 98199",
    "3001 Magnolia Blvd W, Seattle, WA 98199",
    "3100 Magnolia Blvd W, Seattle, WA 98199",
    "3202 Magnolia Blvd W, Seattle, WA 98199",
    "3300 Magnolia Blvd W, Seattle, WA 98199",
    "3404 Magnolia Blvd W, Seattle, WA 98199",
    "3502 Magnolia Blvd W, Seattle, WA 98199",
    "3600 Magnolia Blvd W, Seattle, WA 98199",
    "3702 Magnolia Blvd W, Seattle, WA 98199",
    "3800 Magnolia Blvd W, Seattle, WA 98199",
    "3902 Magnolia Blvd W, Seattle, WA 98199",
    "4000 Magnolia Blvd W, Seattle, WA 98199",
    "4102 Magnolia Blvd W, Seattle, WA 98199",
    "4200 Magnolia Blvd W, Seattle, WA 98199",
  ]

  const houseImgList = [
  "https://moonpaint.s3.us-west-1.amazonaws.com/demo/img/bad_001.jpg",
  "https://moonpaint.s3.us-west-1.amazonaws.com/demo/img/bad_002.jpg",
  "https://moonpaint.s3.us-west-1.amazonaws.com/demo/img/bad_003.jpg",
  "https://moonpaint.s3.us-west-1.amazonaws.com/demo/img/bad_004.jpg",
  "https://moonpaint.s3.us-west-1.amazonaws.com/demo/img/bad_005.jpg",
  "https://moonpaint.s3.us-west-1.amazonaws.com/demo/img/bad_006.jpg",
  "https://moonpaint.s3.us-west-1.amazonaws.com/demo/img/good_001.jpg",
  "https://moonpaint.s3.us-west-1.amazonaws.com/demo/img/good_002.jpg",
  "https://moonpaint.s3.us-west-1.amazonaws.com/demo/img/good_003.jpg",
  "https://moonpaint.s3.us-west-1.amazonaws.com/demo/img/good_004.jpg",
  "https://moonpaint.s3.us-west-1.amazonaws.com/demo/img/good_005.jpg",
  "https://moonpaint.s3.us-west-1.amazonaws.com/demo/img/good_006.jpg",
  "https://moonpaint.s3.us-west-1.amazonaws.com/demo/img/med_001.jpg",
  "https://moonpaint.s3.us-west-1.amazonaws.com/demo/img/med_002.jpg",
  "https://moonpaint.s3.us-west-1.amazonaws.com/demo/img/med_003.jpg",
  "https://moonpaint.s3.us-west-1.amazonaws.com/demo/img/med_004.jpg",
  "https://moonpaint.s3.us-west-1.amazonaws.com/demo/img/med_005.jpg",
  "https://moonpaint.s3.us-west-1.amazonaws.com/demo/img/med_006.jpg",
  ]

  function handleFormSubmit(e) {

    const houseImgAddress = [
      
    ]
    e.preventDefault();
    const randomImage = houseImgList[Math.floor(Math.random() * houseImgList.length)];
    setImageUrl(randomImage);
    // Function body will be implemented later
    setAddress(presetInputPrompt);
  }  

  return (
    <>
      <main className="marketing flex flex-col justify-start subpixel-antialiased overflow-hidden">
        <div className='w-full px-6 pb-[4em] text-center sm:pt-32 lg:px-8'>
          <div className='m-auto'>
            <div className="mr-auto flex-center w-full mb-1 max-md:mt-[2em] text-center">
              <div className="mr-auto mt-5 mb-5 flex-start w-full text-2xl font-semibold text-violet-500">
                <h1>
                  <RainbowText
                    text="MoonPaint"
                    classes={textClasses}
                    delay={8000}
                    className='text-7xl font-bold text-black-600'
                  />
                </h1>
              </div>

              <div className="mt-5">
                <form onSubmit={(e) => handleFormSubmit(e)}>
                  <input
                    type="text"
                    placeholder="Enter your address"
                    value={address}
                    onClick={(e) => setAddress(houseImgAddress[Math.floor(Math.random() * houseImgAddress.length)])}
                    onChange={(e) => setAddress(e.target.value)}
                    className="p-2 text-lg border-2 border-gray-300 rounded-lg w-1/2"
                  />
                  <button
                    type="submit"
                    className="ml-4 p-2 bg-blue-500 text-white rounded-lg"
                  >
                    Submit
                  </button>
                </form>
                {imageUrl && (
                  <div className="mt-5">
                    <Image src={imageUrl} alt="House Image" width={600} height={400} />
                  </div>
                )}
              </div>

            </div>
          </div>
        </div>
      </main>
    </>
  );
}
