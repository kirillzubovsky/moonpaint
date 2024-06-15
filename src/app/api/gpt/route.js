import axios from 'axios';
import { ObjectId } from 'mongodb';
let client;

import { NextResponse } from 'next/server';


export async function POST(req) {
  
  const data = await req.json();
  const moonresponse = data.moonresponse;

  var generatedText = "";

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: "gpt-4-turbo",
        "messages": [
              {
                "role": "system",
                "content": "You are a manager for a firm that writes post cards to house owners, selling them house paint jobs that make the house look better and more expensive. You will get a description of the house current paint job status, and your job is to write a one sentence message that will entice the house owner to sign up for our service to pain their house."
              },
              {
                "role": "user",
                "content": `${moonresponse}`
              },
            ],
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI}`,
          'Content-Type': 'application/json',
        },
      }
    );

    // Extracting the generated text from the response
    generatedText = response.data.choices[0].message.content;
    // console.log(response.data.choices[0]);

  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    return null; // Handle errors appropriately in your application
  }
  
  return NextResponse.json({ message: generatedText}, {status: 200});

}