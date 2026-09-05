import {NextResponse} from "next/server";import {z} from "zod";import {searchMeetings} from "@/lib/search";
const Input=z.object({question:z.string().min(3).max(1000),client:z.string().optional(),limit:z.number().int().min(1).max(20).default(8)});
export async function POST(req:Request){try{const x=Input.parse(await req.json());return NextResponse.json(await searchMeetings(x.question,x.client,x.limit))}catch(e:any){return NextResponse.json({error:e.message},{status:400})}}
