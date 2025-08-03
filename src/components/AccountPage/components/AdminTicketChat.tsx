import React, { useState, useRef } from 'react';
import { Paperclip, Send, ArrowLeft, ClipboardCheck, XCircle, EyeOff } from 'lucide-react';
import { Ticket, Macro } from '../types';

interface AdminTicketChatProps {
  ticket: Ticket;
  setActiveAdminTicketId: (id: string | null) => void;
  handleAdminSendMessage: (ticketId: string, message: string, files: File[], internal: boolean) => void;
  handleCloseTicket: (ticketId: string) => void;
  setAdminTyping: (typing: boolean) => void;
  citizenTyping: boolean;
  collaborators: { id: string; name: string; initials: string }[];
  PREDEFINED_MACROS: Macro[];
}

const AdminTicketChat: React.FC<AdminTicketChatProps> = ({
  ticket,
  setActiveAdminTicketId,
  handleAdminSendMessage,
  handleCloseTicket,
  setAdminTyping,
  citizenTyping,
  collaborators,
  PREDEFINED_MACROS
}) => {
  const [message, setMessage] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [internal, setInternal] = useState(false);
  const [adminMacroMenu, setAdminMacroMenu] = useState<{ open: boolean; anchor: null | HTMLElement }>({ open: false, anchor: null });
  const [macroFilter, setMacroFilter] = useState('');
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(null);
  const chatBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [ticket]);

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    setAdminTyping(true);
    if (typingTimeout) clearTimeout(typingTimeout);
    setTypingTimeout(setTimeout(() => setAdminTyping(false), 2000));
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setFiles(Array.from(e.target.files));
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    handleAdminSendMessage(ticket.id, message, files, internal);
    setMessage('');
    setFiles([]);
  };

  const handleMacro = (macro: string) => {
    setMessage(macro);
    setAdminMacroMenu({ open: false, anchor: null });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <button onClick={() => setActiveAdminTicketId(null)} className="text-blue-500 hover:underline flex items-center">
          <ArrowLeft className="w-4 h-4 mr-1" /> Back to Tickets
        </button>
        <div>
          <div className="font-semibold">{ticket.title}</div>
          <div className="text-xs text-gray-400">
            Ticket ID: {ticket.id} — Requester: {ticket.requesterName}
          </div>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          ticket.status === 'open' ? 'bg-blue-100 text-blue-600'
            : ticket.status === 'pending' ? 'bg-yellow-100 text-yellow-700'
            : 'bg-gray-100 text-gray-500'
        }`}>
          {ticket.status[0].toUpperCase() + ticket.status.slice(1)}
        </span>
      </div>
      
      {collaborators.length > 0 && (
        <div className="mb-3 p-2 bg-blue-50 rounded-lg flex items-center">
          <span className="text-xs text-gray-500 mr-2">Also viewing:</span>
          <div className="flex -space-x-2">
            {collaborators.map(user => (
              <div key={user.id} className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs">
                {user.initials}
              </div>
            ))}
          </div>
        </div>
      )}
      
      <div ref={chatBoxRef} className="bg-gray-50 rounded-xl p-4 mb-4 h-64 overflow-y-auto">
        {ticket.messages.map((msg, i) => (
          <div
            key={msg.id || i}
            className={`mb-4 ${msg.sender === 'admin'
              ? (msg.internal ? 'pr-12' : 'text-right') : 'text-left'}`}
          >
            <div className={`inline-block px-4 py-2 rounded-2xl max-w-[80%] ${
              msg.internal
                ? 'bg-yellow-100 text-yellow-800 border border-yellow-200 rounded-tl-sm'
                : msg.sender === 'admin'
                  ? 'bg-blue-600 text-white rounded-tr-sm'
                  : 'bg-gray-200 text-gray-800 rounded-tl-sm'
            }`}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-medium">
                  {msg.internal
                    ? <span className="flex items-center"><EyeOff className="w-3 h-3 mr-1" />Internal note</span>
                    : msg.sender === 'admin' ? 'Support' : ticket.requesterName}
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
      {ticket.status !== 'closed' && (
        <form onSubmit={handleSend} className="flex flex-col md:flex-row gap-2 items-center">
          <textarea
            value={message}
            onChange={handleInput}
            placeholder={internal ? 'Internal note (not visible to citizen)' : 'Type your reply...'}
            className="flex-1 p-3 border rounded-xl min-h-[42px] focus:ring-2 focus:ring-blue-300"
            rows={1}
            onFocus={() => setAdminTyping(true)}
            onBlur={() => setTimeout(() => setAdminTyping(false), 1200)}
          />
          <label htmlFor="admin-attach" className="cursor-pointer flex items-center px-3 py-2 border rounded-lg bg-gray-50 hover:bg-gray-100 transition">
            <Paperclip className="w-4 h-4" />
            <input id="admin-attach" type="file" multiple className="hidden" onChange={handleFile} />
          </label>
          <button
            type="button"
            className="px-3 py-2 border rounded-lg bg-gray-50 hover:bg-gray-100 transition flex items-center"
            onClick={e => setAdminMacroMenu({ open: !adminMacroMenu.open, anchor: e.currentTarget })}
            title="Insert template"
          >
            <ClipboardCheck className="w-4 h-4" />
          </button>
          <label className="flex items-center ml-2 text-xs text-yellow-700 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={internal}
              onChange={() => setInternal(i => !i)}
              className="mr-1 accent-blue-600"
            />
            Internal
          </label>
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center hover:bg-blue-700 transition">
            <Send className="w-4 h-4 mr-1" /> Send
          </button>
          <button
            type="button"
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg flex items-center ml-2 hover:bg-gray-400 transition"
            onClick={() => handleCloseTicket(ticket.id)}
            disabled={ticket.status === 'closed'}
          >
            <XCircle className="w-4 h-4 mr-1" /> Close
          </button>
        </form>
      )}
      <div className="mt-2 text-xs text-gray-400">
        {citizenTyping && <span className="flex items-center"><Activity className="w-3 h-3 mr-1 animate-pulse" />Citizen is typing...</span>}
      </div>
      {adminMacroMenu.open && (
        <div className="absolute z-50 mt-2 bg-white border rounded-xl shadow-lg p-3" style={{ minWidth: 220 }}>
          <input
            type="text"
            placeholder="Filter templates"
            value={macroFilter}
            onChange={e => setMacroFilter(e.target.value)}
            className="p-2 border rounded-lg mb-2 w-full text-sm"
          />
          <div className="max-h-60 overflow-y-auto">
            {PREDEFINED_MACROS.filter(m => m.label.toLowerCase().includes(macroFilter.toLowerCase())).map((macro, i) => (
              <div key={i} className="p-2 hover:bg-blue-50 cursor-pointer rounded-lg text-sm" onClick={() => handleMacro(macro.text)}>
                <div className="font-medium">{macro.label}</div>
                <div className="text-gray-500 text-xs">{macro.text.slice(0, 80)}{macro.text.length > 80 ? '…' : ''}</div>
              </div>
            ))}
          </div>
          <button className="mt-2 text-blue-600 text-sm w-full text-center py-1 hover:bg-gray-50 rounded-lg" onClick={() => setAdminMacroMenu({ open: false, anchor: null })}>Close</button>
        </div>
      )}
    </div>
  );
};

export default AdminTicketChat;