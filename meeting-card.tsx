export function MeetingCard({title,client}:{title:string;client?:string}){return <article className="card"><h3>{title}</h3><p className="muted">{client||"Internal meeting"}</p></article>}
