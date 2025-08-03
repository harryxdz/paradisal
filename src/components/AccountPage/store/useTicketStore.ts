import create from 'zustand';
import { Ticket } from '../types';

interface TicketState {
  tickets: Ticket[];
  activeTicketId: string | null;
  setTickets: (tickets: Ticket[]) => void;
  addTicket: (ticket: Ticket) => void;
  updateTicket: (id: string, update: Partial<Ticket>) => void;
  setActiveTicket: (id: string | null) => void;
}

export const useTicketStore = create<TicketState>((set) => ({
  tickets: [],
  activeTicketId: null,
  setTickets: (tickets) => set({ tickets }),
  addTicket: (ticket) => set((state) => ({ tickets: [ticket, ...state.tickets] })),
  updateTicket: (id, update) => set((state) => ({
    tickets: state.tickets.map(t => 
      t.id === id ? { ...t, ...update } : t
    )
  })),
  setActiveTicket: (id) => set({ activeTicketId: id })
}));