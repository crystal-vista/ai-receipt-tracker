import OpenAI from "openai";
const key = process.env.OPENAI_API_KEY;

export const classifyImage = async (file: File) => {
  if (!key) {
    throw new Error('Please set the OPENAI_API_KEY environment variable!');
  }
  const openai = new OpenAI({apiKey : key,  dangerouslyAllowBrowser: true});
  
  try {
    // Read the file and convert it to base64
    const encoded = await file
      .arrayBuffer()
      .then((buffer) => Buffer.from(buffer).toString("base64"));

  const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          "role": "system",
          "content": [
            {
              "type": "text",
              "text": `
                Please analyze the following receipt. First, output the name of the vendor, and the total amount spent.
                Then, return a list of item purchased and their respective prices, formatted as:
                Vendor: Name  
                Total Amount Spent: $Cost  

                Item List:  
                Item, $Cost 

                Do NOT repeat items. Only look at ITEMS when listing. Do NOT list number of prices.
                If the provided image is not a receipt, output "This is not a receipt!"
              `
            }
          ]
        },
          {
              role: "user",
              content: [
                  { type: "text", text: "turn this receipt into a list of items" },
                  {
                      type: "image_url",
                      image_url: {
                          "url": `data:image/jpeg;base64,${encoded}`,
                          "detail": "low"
                      },
                  }
              ],
          },
      ],
  });
  return completion.choices[0].message;

  } catch (error) {
      console.error("Error processing receipt:", error);
      throw new Error("Failed to process the receipt.");
    }

}