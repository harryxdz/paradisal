import React, { useState } from 'react';
import { Calendar, Plus, XCircle, CheckCircle, Clock } from 'lucide-react';
import { Appointment } from '../types';

interface AppointmentSchedulerProps {
  appointments: Appointment[];
  setAppointments: React.Dispatch<React.SetStateAction<Appointment[]>>;
  setNotifications: React.Dispatch<React.SetStateAction<Notification[]>>;
}

const AppointmentScheduler: React.FC<AppointmentSchedulerProps> = ({
  appointments,
  setAppointments,
  setNotifications
}) => {
  const [newAppointment, setNewAppointment] = useState({ service: '', date: '', time: '', location: '' });
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);

  const handleCreateAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    const newAppt: Appointment = {
      id: `APT-${Math.random().toString(36).slice(2, 10).toUpperCase()}`,
      service: newAppointment.service,
      date: newAppointment.date,
      time: newAppointment.time,
      status: 'scheduled',
      location: newAppointment.location
    };
    setAppointments([...appointments, newAppt]);
    setNewAppointment({ service: '', date: '', time: '', location: '' });
    setShowAppointmentModal(false);
    
    // Add notification
    setNotifications(prev => [
      {
        id: Math.random().toString(36).slice(2, 10),
        title: 'Appointment Scheduled',
        message: `Your appointment for ${newAppointment.service} has been scheduled.`,
        date: new Date().toISOString().split('T')[0],
        type: 'info',
        unread: true
      },
      ...prev
    ]);
  };
  
  const cancelAppointment = (id: string) => {
    setAppointments(appointments.map(a => 
      a.id === id ? {...a, status: 'cancelled'} : a
    ));
  };
  
  const rescheduleAppointment = (id: string) => {
    const appt = appointments.find(a => a.id === id);
    if (appt) {
      setNewAppointment({
        service: appt.service,
        date: appt.date,
        time: appt.time,
        location: appt.location
      });
      setAppointments(appointments.filter(a => a.id !== id));
      setShowAppointmentModal(true);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'scheduled': return <Clock className="w-5 h-5 text-blue-500" />;
      case 'cancelled': return <XCircle className="w-5 h-5 text-red-500" />;
      case 'completed': return <CheckCircle className="w-5 h-5 text-green-500" />;
      default: return <Calendar className="w-5 h-5" />;
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold">My Appointments</h3>
        <button
          onClick={() => setShowAppointmentModal(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center hover:bg-blue-700 transition"
        >
          <Plus className="w-4 h-4 mr-1" /> New Appointment
        </button>
      </div>
      
      {appointments.length === 0 ? (
        <div className="text-center py-10 bg-gray-50 rounded-xl">
          <Calendar className="w-10 h-10 mx-auto mb-4 text-blue-500" />
          You have no upcoming appointments scheduled.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {appointments.map(appt => (
            <div key={appt.id} className={`p-4 border rounded-xl hover:shadow-md transition ${
              appt.status === 'cancelled' ? 'bg-gray-100 border-gray-200' : 
              appt.status === 'completed' ? 'bg-green-50 border-green-200' : 
              'bg-white border-blue-200'
            }`}>
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-bold">{appt.service}</h4>
                  <p className="text-sm text-gray-600">{appt.location}</p>
                </div>
                <div className="flex items-center">
                  {getStatusIcon(appt.status)}
                  <span className={`ml-1 text-xs ${
                    appt.status === 'scheduled' ? 'text-blue-600' : 
                    appt.status === 'completed' ? 'text-green-600' : 
                    'text-gray-500'
                  }`}>
                    {appt.status.charAt(0).toUpperCase() + appt.status.slice(1)}
                  </span>
                </div>
              </div>
              <div className="mt-3 flex items-center">
                <Calendar className="w-4 h-4 text-gray-500 mr-2" />
                <span className="font-medium">{new Date(appt.date).toLocaleDateString()} at {appt.time}</span>
              </div>
              {appt.status === 'scheduled' && (
                <div className="mt-4 flex gap-2">
                  <button 
                    onClick={() => rescheduleAppointment(appt.id)}
                    className="text-sm text-blue-600 hover:underline"
                  >
                    Reschedule
                  </button>
                  <button 
                    onClick={() => cancelAppointment(appt.id)}
                    className="text-sm text-red-600 hover:underline"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      
      {showAppointmentModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-blue-600" />
              Schedule New Appointment
            </h3>
            <form onSubmit={handleCreateAppointment}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Service</label>
                <select
                  value={newAppointment.service}
                  onChange={e => setNewAppointment({...newAppointment, service: e.target.value})}
                  className="w-full p-2 border rounded-lg"
                  required
                >
                  <option value="">Select a service</option>
                  <option value="License Renewal">License Renewal</option>
                  <option value="Passport Application">Passport Application</option>
                  <option value="Tax Consultation">Tax Consultation</option>
                  <option value="ID Card Replacement">ID Card Replacement</option>
                  <option value="Permit Application">Permit Application</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Date</label>
                <input
                  type="date"
                  value={newAppointment.date}
                  onChange={e => setNewAppointment({...newAppointment, date: e.target.value})}
                  className="w-full p-2 border rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Time</label>
                <input
                  type="time"
                  value={newAppointment.time}
                  onChange={e => setNewAppointment({...newAppointment, time: e.target.value})}
                  className="w-full p-2 border rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Location</label>
                <select
                  value={newAppointment.location}
                  onChange={e => setNewAppointment({...newAppointment, location: e.target.value})}
                  className="w-full p-2 border rounded-lg"
                  required
                >
                  <option value="">Select a location</option>
                  <option value="Central Office">Central Office</option>
                  <option value="District Office">District Office</option>
                  <option value="North Branch">North Branch</option>
                  <option value="South Branch">South Branch</option>
                </select>
              </div>
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowAppointmentModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Schedule Appointment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentScheduler;