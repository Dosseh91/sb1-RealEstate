import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Mail, Check } from 'lucide-react';
import Card, { CardContent, CardHeader, CardFooter } from '../common/Card';
import Button from '../common/Button';
import { Message, Listing } from '../../types';
import { getMessagesByAgencyId, getListingById } from '../../data/mockData';
import { useAuth } from '../../contexts/AuthContext';

const MessageList: React.FC = () => {
  const { user } = useAuth();
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [replyText, setReplyText] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  
  React.useEffect(() => {
    if (user) {
      const agencyId = user.id;
      const agencyMessages = getMessagesByAgencyId(agencyId);
      setMessages(agencyMessages);
    }
  }, [user]);

  const markAsRead = (messageId: string) => {
    setMessages(prev => 
      prev.map(msg => 
        msg.id === messageId ? { ...msg, read: true } : msg
      )
    );
  };

  const handleSelectMessage = (message: Message) => {
    setSelectedMessage(message);
    if (!message.read) {
      markAsRead(message.id);
    }
  };

  const handleSendReply = () => {
    // In a real app, we would send the reply to the server
    console.log(`Sending reply to message ${selectedMessage?.id}: ${replyText}`);
    setReplyText('');
    // Maybe show a success message
  };

  const getListingTitle = (listingId: string) => {
    const listing = getListingById(listingId);
    return listing ? listing.title : 'Unknown Listing';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const unreadCount = messages.filter(msg => !msg.read).length;

  return (
    <Card>
      <CardHeader className="flex justify-between items-center">
        <div className="flex items-center">
          <h2 className="text-xl font-semibold text-primary-800">Messages</h2>
          {unreadCount > 0 && (
            <span className="ml-2 px-2 py-0.5 text-xs font-medium rounded-full bg-accent-100 text-accent-800">
              {unreadCount} unread
            </span>
          )}
        </div>
        {selectedMessage && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setSelectedMessage(null)}
            icon={<ArrowLeft className="h-4 w-4" />}
          >
            Back to Messages
          </Button>
        )}
      </CardHeader>
      <CardContent>
        {selectedMessage ? (
          <div className="animate-fade-in">
            <div className="mb-4 pb-4 border-b border-gray-200">
              <div className="flex justify-between items-center mb-2">
                <div>
                  <h3 className="font-medium text-primary-800">
                    From: {selectedMessage.name}
                  </h3>
                  <div className="text-sm text-primary-500">
                    {selectedMessage.email} {selectedMessage.phone && `• ${selectedMessage.phone}`}
                  </div>
                </div>
                <div className="text-sm text-primary-500">
                  {formatDate(selectedMessage.createdAt)}
                </div>
              </div>
              <div className="mt-2">
                <div className="text-sm font-medium text-primary-700">
                  Re: {getListingTitle(selectedMessage.listingId)}
                </div>
              </div>
            </div>
            
            <div className="mb-6 p-4 bg-gray-50 rounded-md">
              <p className="text-primary-800 whitespace-pre-line">
                {selectedMessage.message}
              </p>
            </div>
            
            <div className="mt-4">
              <label htmlFor="reply" className="block text-sm font-medium text-primary-700 mb-2">
                Reply
              </label>
              <textarea
                id="reply"
                value={replyText}
                onChange={e => setReplyText(e.target.value)}
                rows={5}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-500"
                placeholder="Type your reply here..."
              ></textarea>
            </div>
            
            <div className="mt-4 flex justify-end">
              <Button 
                variant="secondary" 
                onClick={handleSendReply}
                disabled={!replyText.trim()}
                icon={<ArrowRight className="h-4 w-4" />}
              >
                Send Reply
              </Button>
            </div>
          </div>
        ) : messages.length > 0 ? (
          <div className="divide-y divide-gray-200">
            {messages.map(message => (
              <div 
                key={message.id} 
                className={`py-4 hover:bg-gray-50 cursor-pointer transition-colors ${!message.read ? 'bg-primary-50' : ''}`}
                onClick={() => handleSelectMessage(message)}
              >
                <div className="flex items-start">
                  <div className={`flex-shrink-0 mr-3 mt-1 ${!message.read ? 'text-accent-600' : 'text-gray-400'}`}>
                    <Mail className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between">
                      <p className={`text-sm font-medium ${!message.read ? 'text-primary-800' : 'text-primary-600'}`}>
                        {message.name}
                      </p>
                      <p className="text-xs text-primary-500">
                        {formatDate(message.createdAt)}
                      </p>
                    </div>
                    <p className="text-xs text-primary-500 mb-1">
                      Re: {getListingTitle(message.listingId)}
                    </p>
                    <p className="text-sm text-primary-600 truncate">
                      {message.message}
                    </p>
                  </div>
                  {!message.read && (
                    <button 
                      className="ml-2 p-1 text-primary-400 hover:text-primary-600 rounded-full hover:bg-gray-100"
                      onClick={(e) => {
                        e.stopPropagation();
                        markAsRead(message.id);
                      }}
                      title="Mark as read"
                    >
                      <Check className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Mail className="h-12 w-12 text-primary-300 mx-auto mb-3" />
            <h3 className="text-lg font-medium text-primary-700 mb-1">No Messages Yet</h3>
            <p className="text-primary-500">
              When clients contact you about your listings, messages will appear here.
            </p>
          </div>
        )}
      </CardContent>
      {!selectedMessage && messages.length > 0 && (
        <CardFooter className="text-center">
          <p className="text-sm text-primary-500">
            Showing {messages.length} messages • {unreadCount} unread
          </p>
        </CardFooter>
      )}
    </Card>
  );
};

export default MessageList;