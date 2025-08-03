import React, { useState, useRef } from 'react';
import { Paperclip, Send, ArrowLeft, MessageCircle, Plus, File, Download, Eye, EyeOff } from 'lucide-react';
import { Ticket, TicketMessage } from '../types';

interface CitizenSupportChatProps {
  tickets: Ticket[];
  activeCitizenTicketId: string | null;
  setActiveCitizenTicketId: (id: string | null) => void;
  handleCitizenTicketSubmit: (e: React.FormEvent) => void;
  handleCitizenTicketMessage: (ticketId: string, message: string, files: File[]) => void;
  ticketDraft: { title: string; message: string; files: File[] };
  setTicketDraft: React.Dispatch<React.SetStateAction<{ title: string; message: string; files: File[] }>>;
  setCitizenTyping: (typing: boolean) => void;
  adminTyping: boolean;
  citizenInfo: { name: string; email: string };
}

const CitizenSupportChat: React.FC<CitizenSupportChatProps> = ({
  tickets,
  activeCitizenTicketId,
  setActiveCitizenTicketId,
  handleCitizenTicketSubmit,
  handleCitizenTicketMessage,
  ticketDraft,
  setTicketDraft,
  setCitizenTyping,
  adminTyping,
  citizenInfo
}) => {
  const [message, setMessage] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(null);
  const chatBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [tickets, activeCitizenTicketId]);

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    setCitizenTyping(true);
    if (typingTimeout) clearTimeout(typingTimeout);
    setTypingTimeout(setTimeout(() => setCitizenTyping(false), 2000));
  };

  const activeTicket = tickets.find(t => t.id === activeCitizenTicketId);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setFiles(Array.from(e.target.files));
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeTicket) {
      handleCitizenTicketMessage(activeTicket.id, message, files);
      setMessage('');
      setFiles([]);
    }
  };

  return activeTicket ? (
    <div>
      <div className="flex items-center justify-between mb-4">
        <button onClick={() => setActiveCitizenTicketId(null)} className="text-blue-500 hover:underline flex items-center">
          <ArrowLeft className="w-4 h-4 mr-1" /> Back to Tickets
        </button>
        <div className="font-semibold">{activeTicket.title}</div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          activeTicket.status === 'open' ? 'bg-blue-100 text-blue-600'
            : activeTicket.status === 'pending' ? 'bg-yellow-100 text-yellow-700'
            : 'bg-gray-100 text-gray-500'
        }`}>
          {activeTicket.status[0].toUpperCase() + activeTicket.status.slice(1)}
        </span>
      </div>
      <div ref={chatBoxRef} className="bg-gray-50 rounded-xl p-4 mb-4 h-64 overflow-y-auto">
        {activeTicket.messages.filter(m => !m.internal).map((msg, i) => (
          <div key={msg.id || i} className={`mb-4 ${msg.sender === 'citizen' ? 'text-right' : 'text-left'}`}>
            <div className={`inline-block px-4 py-2 rounded-2xl max-w-[80%] ${msg.sender === 'citizen' ? 'bg-blue-600 text-white rounded-tr-sm' : 'bg-gray-200 text-gray-800 rounded-tl-sm'}`}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-medium">
                  {msg.sender === 'citizen' ? 'You' : 'Support'}
                </span>
                <span className="text-xs text-gray-300 ml-2">{new Date(msg.timestamp).toLocaleTimeString()}</span>
              </div>
              <div className="text-sm">{msg.message}</div>
              {msg.attachments && msg.attachments.length > 0 && (
                <div className="mt-1 flex flex-wrap gap-2">
                  {msg.attachments.map((att, j) => (
                    <span key={j} className="flex items-center px-2 py-1 bg-white/20 rounded text-xs">
                      <Paperclip className="w-3 h-3 mr-1" /> {att.name}
                    </span>
                  ))}
                </div>
              )}
              <div className="mt-1 text-right">
                {msg.read
                  ? <span className="inline-flex items-center text-xs text-green-500"><Check className="w-3 h-3 mr-1" />Read</span>
                  : <span className="inline-flex items-center text-xs text-gray-400"><EyeOff className="w-3 h-3 mr-1" />Unread</span>
                }
              </div>
            </div>
          </div>
        ))}
      </div>
      {activeTicket.status !== 'closed' && (
        <form onSubmit={handleSend} className="flex flex-col md:flex-row gap-2 items-center">
          <textarea
            value={message}
            onChange={handleInput}
            placeholder="Type your message..."
            className="flex-1 p-3 border rounded-xl min-h-[42px] focus:ring-2 focus:ring-blue-300"
            rows={1}
            onFocus={() => setCitizenTyping(true)}
            onBlur={() => setTimeout(() => setCitizenTyping(false), 1200)}
          />
          <label htmlFor="ticket-attach" className="cursor-pointer flex items-center px-3 py-2 border rounded-lg bg-gray-50 hover:bg-gray-100 transition">
            <Paperclip className="w-4 h-4" />
            <input id="ticket-attach" type="file" multiple className="hidden" onChange={handleFile} />
          </label>
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center hover:bg-blue-700 transition">
            <Send className="w-4 h-4 mr-1" /> Send
          </button>
        </form>
      )}
      <div className="mt-2 text-xs text-gray-400">
        {adminTyping && <span className="flex items-center"><Activity className="w-3 h-3 mr-1 animate-pulse" />Support is typing...</span>}
      </div>
    </div>
  ) : (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold">My Support Tickets</h3>
        <button
          onClick={() => setActiveCitizenTicketId('NEW')}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center hover:bg-blue-700 transition"
        >
          <Plus className="w-4 h-4 mr-1" /> New Ticket
        </button>
      </div>
      {tickets.filter(t => t.requesterEmail === citizenInfo.email).length === 0 ? (
        <div className="text-center text-gray-400 py-10 bg-gray-50 rounded-xl">
          <MessageCircle className="w-10 h-10 mx-auto mb-4 text-blue-500" />
          You have not created any support tickets yet.
        </div>
      ) : (
        <ul className="divide-y bg-white rounded-xl shadow-sm">
          {tickets
            .filter(t => t.requesterEmail === citizenInfo.email)
            .map(t => (
              <li
                key={t.id}
                className="py-3 px-4 flex items-center justify-between cursor-pointer hover:bg-blue-50 transition rounded-xl"
                onClick={() => setActiveCitizenTicketId(t.id)}
              >
                <div>
                  <span className="font-medium">{t.title}</span>
                  <span className="ml-2 text-xs text-gray-400">{t.id}</span>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  t.status === 'open' ? 'bg-blue-100 text-blue-600'
                    : t.status === 'pending' ? 'bg-yellow-100 text-yellow-700'
                    : 'bg-gray-100 text-gray-500'
                }`}>
                  {t.status[0].toUpperCase() + t.status.slice(1)}
                </span>
              </li>
            ))}
        </ul>
      )}
      {activeCitizenTicketId === 'NEW' && (
        <form onSubmit={handleCitizenTicketSubmit} className="mt-6 bg-white p-6 rounded-xl shadow-md space-y-4">
          <h4 className="font-semibold text-lg">Open a New Support Ticket</h4>
          <div>
            <label className="block text-sm text-gray-500 mb-1">Title</label>
            <input
              name="title"
              value={ticketDraft.title}
              onChange={(e) => setTicketDraft({ ...ticketDraft, title: e.target.value })}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-300"
              maxLength={80}
              required
            />
          </div>
          <div>
            <label className="block text-sm text-gray-500 mb-1">Message</label>
            <textarea
              name="message"
              value={ticketDraft.message}
              onChange={(e) => setTicketDraft({ ...ticketDraft, message: e.target.value })}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-300"
              rows={3}
              required
            />
          </div>
          <div>
            <label htmlFor="ticket-files" className="block text-sm text-gray-500 mb-1">Attach files (optional)</label>
            <input
              id="ticket-files"
              type="file"
              multiple
              onChange={(e) => setTicketDraft({ ...ticketDraft, files: e.target.files ? Array.from(e.target.files) : [] })}
              className="mt-1"
            />
            {ticketDraft.files.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {ticketDraft.files.map((f, i) => (
                  <span key={i} className="flex items-center px-2 py-1 bg-gray-200 rounded text-xs text-gray-700">
                    <Paperclip className="w-3 h-3 mr-1" /> {f.name}
                  </span>
                ))}
              </div>
            )}
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center hover:bg-blue-700 transition"
          >
            <MessageCircle className="w-4 h-4 mr-1" /> Submit Ticket
          </button>
        </form>
      )}
    </div>
  );
};

export default CitizenSupportChat;