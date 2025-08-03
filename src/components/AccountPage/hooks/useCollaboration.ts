import { useEffect, useState } from 'react';
import { useTicketStore } from '../store/useTicketStore';
import { getSocket } from '../api/socket';

export const useCollaboration = (ticketId: string) => {
  const [collaborators, setCollaborators] = useState([]);
  const { updateTicket } = useTicketStore();

  useEffect(() => {
    const socket = getSocket();
    
    socket.emit('join-ticket', ticketId);
    
    socket.on('ticket-updated', (updatedTicket) => {
      updateTicket(updatedTicket.id, updatedTicket);
    });
    
    socket.on('collaborators-updated', (users) => {
      setCollaborators(users);
    });
    
    return () => {
      socket.emit('leave-ticket', ticketId);
      socket.off('ticket-updated');
      socket.off('collaborators-updated');
    };
  }, [ticketId, updateTicket]);

  return collaborators;
};