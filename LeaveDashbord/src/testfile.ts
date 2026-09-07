import { repository } from "./ticket.repository";

export async function deleteTicket(id: number) {
  const ticket = await repository.findTicket(id);
  if (!ticket) {
    throw new CustomError("Ticket not found", 404);
  }
  await repository.deleteTicket(id);
  return { success: true };
}
