import { NextResponse } from "next/server";

export async function GET() {
  const date = new Date();
  date.setDate(date.getDate() - 7);

  const response = await fetch(
    `https://newsapi.org/v2/everything?from=${date.toISOString()}&sortBy=publishedAt&pageSize=1&language=en&apiKey=${process.env.NEWS_API_KEY}`
  );

  const data = await response.json();
  const article = data.articles[0];

  return NextResponse.json({
    title: article?.title,
    description: article?.description,
  });
}
