// To install @fal-ai/serverless-client, run the following command in your terminal:
// npm install @fal-ai/serverless-client
import * as fal from "@fal-ai/serverless-client";

export async function POST(req) {

  const imgUrl = await req.json();

  console.log("\u001b[1;32m Processing request for image generation with imgUrl param: ", imgUrl);

  const result = await fal.subscribe("fal-ai/moondream/batched", {

    input: {
      inputs: [{
        prompt: "Describe the quality of house paint. Lead with the answer to this question - should I paint this house? Yes/No.",
        image_url: imgUrl,
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

  return NextResponse.json({ result: result}, {status: 200});

}