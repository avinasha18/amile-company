import { useNavigate } from 'react-router-dom';
import socket from '../../services/socket/socket';
import { toast } from 'react-toastify';

const ContactApplicant = ({ applicantId, companyId }) => {
  const nav = useNavigate()
  const startChat = () => {
    const room = `${companyId}-${applicantId}`;
    socket.emit('startChat', { companyId, studentId:applicantId }, (response) => {
      if (response.success) {
        nav("/messages")
        socket.emit('joinRoom', room);
      } else {
        toast.error('Error starting chat. Please try again.');
      }
    });
  };

  return (
    <button
      className="px-3 py-1 text-xs font-medium text-white bg-blue-500 rounded hover:bg-blue-600"
      onClick={startChat}
    >
      Contact Applicant
    </button>
  );
};

export default ContactApplicant;
