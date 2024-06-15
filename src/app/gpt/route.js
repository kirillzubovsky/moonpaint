import axios from 'axios';
import { ObjectId } from 'mongodb';
let client;

import { NextResponse } from 'next/server';


export async function POST(req) {
  
  const data = await req.json();
  const moonresponse = data.moonresponse;

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: "gpt-4-turbo",
        "messages": [
              {
                "role": "system",
                "content": "You are a manager for a firm that writes post cards to house owners, selling "
              },
              {
                "role": "user",
                "content": `${userContentRequest}`
              },
            ],
      },
      {
        headers: {
          'Authorization': `Bearer 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`,
          'Content-Type': 'application/json',
        },
      }
    );

    // Extracting the generated text from the response
    const generatedText = response.data.choices[0].message.content;
    // console.log(response.data.choices[0]);

    getDataAndStoreToMongoDB(generatedText, complexity)    

  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    return null; // Handle errors appropriately in your application
  }
  
  return NextResponse.json({ message: "Success!"}, {status: 200});

}