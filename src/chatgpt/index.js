import { OpenAI } from "openai";

import 'dotenv/config'

const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY});

console.log('API', process.env.AT_USERNAME)

export const chatGptPrompt = async (content) => {
  if(!content){
    return 
  }  
  const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{"role": "user", "content": content}],
      temperature: 0.7
    });
    // console.log("RESP", response?.choices[0]?.message)
    return response?.choices[0]?.message.content
  };
