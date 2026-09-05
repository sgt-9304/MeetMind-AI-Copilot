import {admin} from "./supabase-admin";import {embed} from "./embeddings";import {openai} from "./openai";
export async function searchMeetings(question:string,client?:string,limit=8){const query=await embed(question);const {data,error}=await admin().rpc("match_transcript_segments",{query_embedding:query,match_count:limit,client_filter:client||null});if(error)throw error;const evidence=(data||[]).map((x:any)=>`[${x.id}] ${x.meeting_title} ${x.start_ms}-${x.end_ms}ms: ${x.text}`).join("
");if(!evidence)return {answer:"I do not have enough evidence in the meeting history.",sources:[]};const r=await openai().responses.create({model:process.env.OPENAI_SUMMARY_MODEL||"gpt-4.1-mini",instructions:"Answer only from meeting evidence. Cite segment IDs in square brackets. If evidence is insufficient, say so.",input:`QUESTION:
${question}

EVIDENCE:
${evidence}`});return {answer:r.output_text,sources:data}}
