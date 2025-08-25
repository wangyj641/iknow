// app/api/langchain/route.ts  (JS 版本同理，只去掉类型标注)
import { NextRequest, NextResponse } from "next/server";
import { ChatOpenAI } from "@langchain/openai";

export const runtime = "nodejs";

const llm = new ChatOpenAI({
  apiKey: process.env.GITHUB_TOKEN, // PAT 需包含 models:read
  model: "openai/gpt-4.1", // ✅ 带 publisher 前缀，示例见下
  temperature: 0.2,
  configuration: {
    baseURL: "https://models.github.ai/inference",
    // 如需，可加自定义头：X-GitHub-Api-Version: 2022-11-28（可选）
    // defaultHeaders: { "X-GitHub-Api-Version": "2022-11-28" }  // 仅当你的 OpenAI 客户端支持
  },
});

export async function POST(req: NextRequest) {
  const { messages } = await req.json();
  const aiMsg = await llm.invoke(messages);
  return NextResponse.json({ output: aiMsg.content });
}
