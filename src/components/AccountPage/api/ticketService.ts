import axios from 'axios';
import type { Ticket, TicketMessage } from '../types';

const API_URL = import.meta.env.VITE_API_URL;

export const TicketService = {
  async getTickets(): Promise<Ticket[]> {
    const response = await axios.get(`${API_URL}/tickets`);
    return response.data;
  },
  
  async createTicket(ticketData: Omit<Ticket, 'id'>): Promise<Ticket> {
    const response = await axios.post(`${API_URL}/tickets`, ticketData);
    return response.data;
  },
  
  async sendMessage(ticketId: string, message: TicketMessage): Promise<Ticket> {
    const response = await axios.post(
      `${API_URL}/tickets/${ticketId}/messages`,
      message
    );
    return response.data;
  },
  
  async closeTicket(ticketId: string): Promise<Ticket> {
    const response = await axios.patch(
      `${API_URL}/tickets/${ticketId}/close`
    );
    return response.data;
  }
};