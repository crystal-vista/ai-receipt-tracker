import OpenAI from "openai";
const key = process.env.OPENAI_API_KEY;

export const parsePredictions = async (predictions: string) => { if (!key) {
    throw new Error('Please set the OPENAI_API_KEY environment variable!');
  }
  const openai = new OpenAI({apiKey : key,  dangerouslyAllowBrowser: true});
  
  try {

  const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          "role": "system",
          "content": [
            {
              type: "text",
              text: `
                Please analyze the following receipt. 
                If the provided text is not a receipt, output "This is not a receipt!"
                Return a JSON object in plaintext in this format, "content" is the entire given receipt:
                {
	                vendorName: string,
                    content: string,
                }
              `
            }
          ]
        },
          {
              role: "user",
              content: [{ type: "text", text: predictions.toString() }],
          },
      ],
  });
  return completion.choices[0].message;

  } catch (error) {
      console.error("Error processing the scanned receipt:", error);
      throw new Error("Failed to process the scan.");
    }

}