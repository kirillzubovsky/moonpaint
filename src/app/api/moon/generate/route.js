
// npm install @fal-ai/serverless-client
import * as fal from "@fal-ai/serverless-client";
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req) {

  const request = await req.json();

  console.log("\u001b[1;32m Processing request for image generation with imgUrl param: ", request);

  const result = await fal.subscribe("fal-ai/moondream/batched", {

    input: {
      inputs: [{
        prompt: "Describe the quality of house paint. Lead with the answer to this question - should I paint this house? Yes/No.",
        image_url: request.imgUrl,
      }]
    },
    logs: true,
    onQueueUpdate: (update) => {
      if (update.status === "IN_PROGRESS") {
        update.logs.map((log) => log.message).forEach(console.log);
      }
    },
  });

  console.log("\u001b[1;32m We have a result from the Moondream API: ", result);
  const output = result.outputs[0];

  return NextResponse.json({ result: output }, {status: 200});

}