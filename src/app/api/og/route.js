import { Icons } from "@/components/Icons";
import { Book } from "lucide-react";
import { ImageResponse } from "next/og";
import { NextResponse } from "next/server";

export const runtime = "edge";

const font = fetch(new URL("./lato.ttf", import.meta.url)).then((res) =>
  res.arrayBuffer()
);

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const title =
      searchParams.get("title").charAt(0).toUpperCase() +
        searchParams.get("title").slice(1) ?? "Bloggy";

    return new ImageResponse(
      (
        <div
          style={{
            display: "flex",
            color: "white",
            padding: "70px 20px",
            height: "100%",
            width: "100%",
            justifyContent: "space-between",
            flexDirection: "column",
            backgroundColor: "black",
          }}
        >
          <Book size={40} style={{ color: "white" }} />
          <h1
            style={{
              fontSize: "80px",
              textShadow: "0 2px 2px #000",
              backgroundClip: "text",
              backgroundImage: "linear-gradient(90deg,#fff 40%, #aaa)",
            }}
          >
            {title}
          </h1>
          <h2>Powered by Bloggy</h2>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: "lato",
            data: await font,
            style: "italic",
          },
        ],
      }
    );
  } catch (error) {
    console.log(error.message);
    return NextResponse.json(
      { message: "Failed to generate the OG image" },
      { status: 500 }
    );
  }
}
