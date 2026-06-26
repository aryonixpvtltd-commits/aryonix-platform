export const crmStatuses = ["NEW", "CONTACTED", "PROPOSAL_SENT", "NEGOTIATION", "WON", "LOST"] as const;

export type CrmStatus = (typeof crmStatuses)[number];
export type LeadSource = "enquiries" | "chatbot" | "estimator" | "analyzer";

export function isCrmStatus(value: unknown): value is CrmStatus {
  return typeof value === "string" && crmStatuses.includes(value as CrmStatus);
}

export function isLeadSource(value: unknown): value is LeadSource {
  return value === "enquiries" || value === "chatbot" || value === "estimator" || value === "analyzer";
}

export function formatCrmStatus(value: string) {
  return value
    .toLowerCase()
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function readCrmUpdate(input: unknown) {
  const body = typeof input === "object" && input !== null ? input as Record<string, unknown> : {};
  const status = body.status;
  const notes = typeof body.notes === "string" ? body.notes.trim().slice(0, 1200) : undefined;
  const followUpDateText = typeof body.followUpDate === "string" ? body.followUpDate.trim() : "";
  const followUpDate = followUpDateText ? new Date(followUpDateText) : undefined;
  const historyEntry = typeof body.historyEntry === "string" ? body.historyEntry.trim().slice(0, 220) : "";

  return {
    status: isCrmStatus(status) ? status : undefined,
    notes,
    followUpDate: followUpDate && !Number.isNaN(followUpDate.getTime()) ? followUpDate : null,
    historyEntry
  };
}
