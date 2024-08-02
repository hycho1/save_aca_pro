import Anthropic from '@anthropic-ai/sdk';
import dotenv from 'dotenv';

dotenv.config();

console.log(process.env.CLAUDE_API_KEY);




const anthropic = new Anthropic({
    apiKey: process.env.CLAUDE_API_KEY});




  
export const claude_run = async (prompt) => {

    const response = await anthropic.messages.create({
        model: "claude-3-5-sonnet-20240620",
        "X-Api-Key": process.env.CLAUDE_API_KEY,
        max_tokens: 1024,
        messages: [
          {"role": "user", "content": "Hello, world"}
        ]
      });
      

    console.log(response);

    return response;

}


export default claude_run;