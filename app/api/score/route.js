import OpenAI from "openai";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { userHeadline, realHeadline, description } = await req.json();

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  });

  const prompt = `
Original headline: "${realHeadline}"
Article description: "${description}"
User headline: "${userHeadline}"

Judge originality, creativity (0-10), relevance (0-10), emotional impact (0-10).
Return strict JSON:
{
  "creativity": number,
  "relevance": number,
  "impact": number,
  "score": number
}
Score = creativity*3 + relevance*3 + impact*4
`;

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7
  });

  return NextResponse.json(JSON.parse(completion.choices[0].message.content));
}
