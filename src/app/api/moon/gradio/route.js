
import { NextRequest, NextResponse } from 'next/server';
import { Client } from "@gradio/client";


export async function POST(req) {

  const request = await req.json();
  console.log("\u001b[1;32m Processing request for image generation with imgUrl param: ", request);

  const app = await Client.connect("Yakshaving/moondream2")

  const response = await fetch(request.imgUrl);
  const exampleImage = await response.blob();

  const result = await app.predict("/answer_question", [
    exampleImage,
    "Does this house need to be painted? Explain why"
  ]);

  console.log("\u001b[1;32m We have a result from the Moondream API: ", result);
  const output = result.data[0];

  return NextResponse.json({ result: output }, {status: 200});

}