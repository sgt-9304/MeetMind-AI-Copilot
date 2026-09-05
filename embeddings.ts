import {openai} from "./openai";
export async function embed(text:string){const r=await openai().embeddings.create({model:process.env.OPENAI_EMBEDDING_MODEL||"text-embedding-3-small",input:text});return r.data[0].embedding}
export function chunkTranscript(segments:{id:string;text:string}[],maxChars=1200){const out:{text:string;sourceIds:string[]}[]=[];let text="",ids:string[]=[];for(const s of segments){if(text.length+s.text.length>maxChars&&text){out.push({text,sourceIds:ids});text="";ids=[]}text+=(text?" ":"")+s.text;ids.push(s.id)}if(text)out.push({text,sourceIds:ids});return out}
