export type TranscriptSegment={id:string;meeting_id:string;speaker:string;start_ms:number;end_ms:number;text:string};
export type ActionItem={task:string;owner:string|null;dueDate:string|null;sourceSegmentIds:string[];reviewStatus:"pending"|"approved"|"rejected"};
export type MeetingIntelligence={summary:string;decisions:{text:string;sourceSegmentIds:string[]}[];actionItems:ActionItem[];risks:{text:string;sourceSegmentIds:string[]}[]};
