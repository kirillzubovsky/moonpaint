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
  const [moonResponse, setMoonResponse] = useState("");
  const [OpenAIResponse, setOpenAIResponse] = useState('');
  const [sloppyUrl, setSloppyUrl] = useState('');

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

    e.preventDefault();
    const randomImage = houseImgList[Math.floor(Math.random() * houseImgList.length)];
    setImageUrl(randomImage);
    // Function body will be implemented later
    // setAddress(presetInputPrompt);
  }  

    const generateHandwriting = async (OpenAIResponse) => {

    console.log("Hello Sloppy API? ")

    const message = "Dear Home Owner: " + OpenAIResponse.replace(/ /g, '+');
    const sloppyAPI = `https://sloppyjoe.com/v1/api/handwriting/generate/image?message=${message}`

    console.log("Polling sloppy API: ", sloppyAPI);
    
    let redirectUrl = null;

    const fetchSloppyAPI = async () => {

        while (!redirectUrl) {
            try {
                const response = await fetch(sloppyAPI, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response.redirected) {
                    redirectUrl = response.url;
                    setSloppyUrl(response.url)
                } else {
                    await new Promise(resolve => setTimeout(resolve, 5000));
                }
            } catch (error) {
                console.error('Error calling Sloppy API:', error);
                await new Promise(resolve => setTimeout(resolve, 5000));
            }
        }

        return redirectUrl;
    };

    fetchSloppyAPI();
       
  }


  const generateOpenAIResponse = async (moonResponse) => {
    
    try {
      
      const response = await fetch(`/api/gpt`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          moonresponse: moonResponse
        })
      });

      const responseData = await response.json();

      console.log("\u001b[1;32m Reponse from OpenAI ", responseData);
      setOpenAIResponse(responseData.message);
      generateHandwriting(responseData.message);
    
    } catch (error) {
      console.error('Error fetching moon response data:', error);
    }      
  }

  const generateMoonResponse = async (imgUrl) => {

    setMoonResponse("Dreaming...");
    
    try {
      
      const response = await fetch(`/api/moon/gradio`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          imgUrl: imgUrl  // Assuming input is the correct format for prompt
        })
      });

      const responseData = await response.json();

      console.log("\u001b[1;32m What do we get in response FROM API/MOON/GENERATE: ", responseData);
      setMoonResponse(responseData.result);
      generateOpenAIResponse(responseData.result);
    
    } catch (error) {
      console.error('Error fetching moon response data:', error);
    }      
  }

  const Postcard = ({ address, imageUrl, message }) => {
    return (
      <div className="postcard">
        <div className="postcard-image">
          <img src={imageUrl} alt="Postcard" />
        </div>
        <div className="postcard-content">
          <div className="postcard-address">
            <h3 style={{ textAlign: 'left' }}>To:</h3>
            <p style={{ textAlign: 'left' }}>{address}</p>
            <hr></hr>
          </div>
          <div className="postcard-message handwriting">
            {sloppyUrl ? <img src={sloppyUrl} alt="Handwritten Postcard" /> : <p>{message}</p>}
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <main className="marketing flex flex-col justify-start subpixel-antialiased overflow-hidden">
        <div className='w-full px-6 pb-[4em] text-center sm:pt-32 lg:px-8'>
          <div className='m-auto'>
            <div className="mr-auto flex-center w-full mb-1 max-md:mt-[2em] text-center">

              <div className="mr-auto mt-5 mb-[2em] flex-start w-full text-2xl font-semibold text-violet-500">
                
                  <RainbowText
                    text="MoonPaint"
                    classes={textClasses}
                    delay={8000}
                    className='mb-[2em]'
                  />
                
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
                  <div className='mt-[3em] flex justify-center'>
                    <div className="flex flex-col md:flex-row mt-5 max-w-4xl">
                      <div className="flex-1">
                        <Image src={imageUrl} alt="House Image" width={600} height={400} 
                        onLoad={() => generateMoonResponse(imageUrl)}
                        />
                      </div>
                      <div className="flex-1 md:pl-4 text-justify">
                        <p className='pl-[1em]'>{moonResponse}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="mt-[4em]">
              </div>

              {typeof OpenAIResponse === 'string' && OpenAIResponse.length > 4 && 
                <div className="flex justify-center w-full mb-1 max-md:mt-[2em] relative">
                  
                    <>
                      <div className="mt-5 absolute" style={{top:"-5%", right: "22%"}}>
                        <Image 
                          src="/arrow-down.png" 
                          alt="Arrow Down" 
                          width={50} 
                          height={150} 
                        />
                      </div>
                      <Postcard address={address} imageUrl={imageUrl} message={OpenAIResponse} />
                    </>
                  
                </div>
              }

            </div>
          </div>
        </div>
      </main>
    </>
  );
}
