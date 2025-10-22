import React, { useState, useEffect } from 'react';
import { MessageCircle, ShoppingBag, Home, User, Send, Heart, MessageSquare, Search, Plus, X, Bot, Menu, Bell } from 'lucide-react';

const COLORS = {
  primary: '#8B0000',
  secondary: '#B8860B',
  accent: '#CD853F',
  light: '#FFF8DC',
  white: '#FFFFFF',
  gray: '#F5F5F5',
  darkGray: '#666666',
  border: '#E0E0E0'
};

const App = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [showPostModal, setShowPostModal] = useState(false);
  const [showChatbot, setShowChatbot] = useState(false);
  const [showListingModal, setShowListingModal] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: 'Juan Dela Cruz',
      college: 'College of Engineering',
      content: 'Looking for study buddies for Finals week! Anyone interested in forming a study group for Engineering Math?',
      timestamp: '2 hours ago',
      likes: 12,
      comments: 5,
      liked: false
    },
    {
      id: 2,
      author: 'Maria Santos',
      college: 'College of Computer Studies',
      content: 'Free tutorial materials for Data Structures available! DM me if interested. PUPians helping PUPians! 📚',
      timestamp: '5 hours ago',
      likes: 24,
      comments: 8,
      liked: false
    }
  ]);

  const [listings, setListings] = useState([
    {
      id: 1,
      title: 'Engineering Calculator',
      price: '₱500',
      seller: 'Ramon Cruz',
      college: 'College of Engineering',
      image: '🧮',
      condition: 'Like New',
      description: 'Scientific calculator, barely used'
    },
    {
      id: 2,
      title: 'Programming Books Bundle',
      price: '₱800',
      seller: 'Ana Reyes',
      college: 'College of Computer Studies',
      image: '📚',
      condition: 'Good',
      description: 'C++, Java, and Python books'
    },
    {
      id: 3,
      title: 'Laptop Stand',
      price: '₱300',
      seller: 'Pedro Garcia',
      college: 'College of Business',
      image: '💻',
      condition: 'Used',
      description: 'Adjustable laptop stand'
    }
  ]);

  const [chatMessages, setChatMessages] = useState([
    { type: 'bot', text: 'Hello! I\'m PUPBot, your campus assistant. How can I help you today?' }
  ]);

  const [currentMessage, setCurrentMessage] = useState('');
  const [newPost, setNewPost] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  
  const [conversations, setConversations] = useState([
    {
      id: 1,
      name: 'Ana Reyes',
      college: 'College of Computer Studies',
      lastMessage: 'Is the programming book still available?',
      time: '10m ago',
      unread: 2,
      avatar: 'A'
    },
    {
      id: 2,
      name: 'Pedro Garcia',
      college: 'College of Engineering',
      lastMessage: 'Thanks for the help with the assignment!',
      time: '1h ago',
      unread: 0,
      avatar: 'P'
    },
    {
      id: 3,
      name: 'Maria Santos',
      college: 'College of Business',
      lastMessage: 'See you at the study group tomorrow',
      time: '3h ago',
      unread: 1,
      avatar: 'M'
    }
  ]);

  const handleLike = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, likes: post.liked ? post.likes - 1 : post.likes + 1, liked: !post.liked }
        : post
    ));
  };

  const handleAddPost = () => {
    if (newPost.trim()) {
      const post = {
        id: posts.length + 1,
        author: 'Christian Kyle Tayzon',
        college: 'College of Computer Engineering',
        content: newPost,
        timestamp: 'Just now',
        likes: 0,
        comments: 0,
        liked: false
      };
      setPosts([post, ...posts]);
      setNewPost('');
      setShowPostModal(false);
    }
  };

  const handleSendMessage = () => {
    if (currentMessage.trim()) {
      setChatMessages([...chatMessages, { type: 'user', text: currentMessage }]);
      
      setTimeout(() => {
        const responses = [
          'The PUP Library is open from 8 AM to 6 PM on weekdays.',
          'You can check your grades through the PUP Student Portal.',
          'For enrollment concerns, please visit the Registrar\'s Office.',
          'Campus events are posted on the official PUP Facebook page.',
          'The Marketplace allows verified PUP students to buy and sell items safely.'
        ];
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        setChatMessages(prev => [...prev, { type: 'bot', text: randomResponse }]);
      }, 1000);
      
      setCurrentMessage('');
    }
  };

  const renderHome = () => (
    <div className="space-y-4">
      <div style={{ 
        background: `linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.secondary} 100%)`,
        padding: '24px',
        borderRadius: '12px',
        color: COLORS.white,
        marginBottom: '24px'
      }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '8px' }}>Welcome to ISKOMMUNITY</h2>
        <p style={{ opacity: 0.9 }}>Your unified platform for connection, commerce, and collaboration</p>
      </div>

      <button
        onClick={() => setShowPostModal(true)}
        style={{
          width: '100%',
          padding: '16px',
          background: COLORS.white,
          border: `2px dashed ${COLORS.border}`,
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          cursor: 'pointer',
          color: COLORS.darkGray,
          fontSize: '16px'
        }}
      >
        <Plus size={20} />
        <span>Share something with the PUP community...</span>
      </button>

      {posts.filter(post => 
        post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.author.toLowerCase().includes(searchQuery.toLowerCase())
      ).map(post => (
        <div key={post.id} style={{
          background: COLORS.white,
          padding: '20px',
          borderRadius: '12px',
          border: `1px solid ${COLORS.border}`,
          boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.secondary})`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: COLORS.white,
              fontWeight: 'bold',
              fontSize: '18px'
            }}>
              {post.author.charAt(0)}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: '600', color: COLORS.primary }}>{post.author}</div>
              <div style={{ fontSize: '14px', color: COLORS.darkGray }}>{post.college}</div>
              <div style={{ fontSize: '12px', color: COLORS.darkGray }}>{post.timestamp}</div>
            </div>
          </div>
          <p style={{ marginBottom: '16px', lineHeight: '1.6', color: '#333' }}>{post.content}</p>
          <div style={{ display: 'flex', gap: '24px', paddingTop: '12px', borderTop: `1px solid ${COLORS.border}` }}>
            <button
              onClick={() => handleLike(post.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: post.liked ? COLORS.primary : COLORS.darkGray,
                fontSize: '14px'
              }}
            >
              <Heart size={18} fill={post.liked ? COLORS.primary : 'none'} />
              <span>{post.likes}</span>
            </button>
            <button style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: COLORS.darkGray,
              fontSize: '14px'
            }}>
              <MessageSquare size={18} />
              <span>{post.comments}</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  const renderMarketplace = () => (
    <div>
      <div style={{ 
        background: `linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.secondary} 100%)`,
        padding: '24px',
        borderRadius: '12px',
        color: COLORS.white,
        marginBottom: '24px'
      }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '8px' }}>Student Marketplace</h2>
        <p style={{ opacity: 0.9 }}>Buy and sell within the trusted PUP community</p>
      </div>

      <button
        onClick={() => setShowListingModal(true)}
        style={{
          width: '100%',
          padding: '16px',
          background: COLORS.primary,
          color: COLORS.white,
          border: 'none',
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          cursor: 'pointer',
          fontSize: '16px',
          fontWeight: '600',
          marginBottom: '24px'
        }}
      >
        <Plus size={20} />
        Create Listing
      </button>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
        gap: '20px' 
      }}>
        {listings.map(listing => (
          <div key={listing.id} style={{
            background: COLORS.white,
            borderRadius: '12px',
            overflow: 'hidden',
            border: `1px solid ${COLORS.border}`,
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            cursor: 'pointer',
            transition: 'transform 0.2s, box-shadow 0.2s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-4px)';
            e.currentTarget.style.boxShadow = '0 8px 16px rgba(139,0,0,0.15)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)';
          }}>
            <div style={{
              height: '180px',
              background: `linear-gradient(135deg, ${COLORS.light} 0%, ${COLORS.gray} 100%)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '64px'
            }}>
              {listing.image}
            </div>
            <div style={{ padding: '16px' }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'start',
                marginBottom: '8px'
              }}>
                <h3 style={{ 
                  fontSize: '18px', 
                  fontWeight: '600', 
                  color: COLORS.primary,
                  flex: 1
                }}>{listing.title}</h3>
                <span style={{
                  fontSize: '18px',
                  fontWeight: 'bold',
                  color: COLORS.secondary
                }}>{listing.price}</span>
              </div>
              <p style={{ 
                fontSize: '14px', 
                color: COLORS.darkGray,
                marginBottom: '8px'
              }}>{listing.description}</p>
              <div style={{
                fontSize: '12px',
                color: COLORS.darkGray,
                paddingTop: '12px',
                borderTop: `1px solid ${COLORS.border}`
              }}>
                <div style={{ marginBottom: '4px' }}>
                  <strong>Seller:</strong> {listing.seller}
                </div>
                <div style={{ marginBottom: '4px' }}>
                  <strong>Condition:</strong> {listing.condition}
                </div>
                <div>{listing.college}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: COLORS.gray,
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      {/* Header */}
      <div style={{
        background: COLORS.primary,
        color: COLORS.white,
        padding: '16px 24px',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}>
        <div style={{ 
          maxWidth: '1200px', 
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <img 
              src="https://i.imgur.com/8p0KVXm.png" 
              alt="ISKOmmunity Logo"
              style={{ height: '48px', width: 'auto' }}
            />
          </div>
          
          <div style={{ 
            flex: 1, 
            maxWidth: '400px', 
            margin: '0 24px',
            display: activeTab === 'home' || activeTab === 'marketplace' ? 'block' : 'none'
          }}>
            <div style={{ position: 'relative' }}>
              <Search 
                size={18} 
                style={{ 
                  position: 'absolute', 
                  left: '12px', 
                  top: '50%', 
                  transform: 'translateY(-50%)',
                  color: COLORS.darkGray
                }} 
              />
              <input
                type="text"
                placeholder={activeTab === 'marketplace' ? 'Search listings...' : 'Search posts...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 12px 10px 40px',
                  borderRadius: '24px',
                  border: 'none',
                  fontSize: '14px',
                  outline: 'none'
                }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button style={{
              background: 'rgba(255,255,255,0.2)',
              border: 'none',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: COLORS.white
            }}>
              <Bell size={20} />
            </button>
            <button style={{
              background: 'rgba(255,255,255,0.2)',
              border: 'none',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: COLORS.white
            }}>
              <User size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px' }}>
        {activeTab === 'home' && renderHome()}
        {activeTab === 'marketplace' && renderMarketplace()}
        {activeTab === 'messages' && (
          <div>
            <div style={{ 
              background: `linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.secondary} 100%)`,
              padding: '24px',
              borderRadius: '12px',
              color: COLORS.white,
              marginBottom: '24px'
            }}>
              <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '8px' }}>Messages</h2>
              <p style={{ opacity: 0.9 }}>Connect with fellow PUPians</p>
            </div>

            <div style={{ 
              background: COLORS.white,
              borderRadius: '12px',
              overflow: 'hidden',
              border: `1px solid ${COLORS.border}`
            }}>
              {conversations.map(conv => (
                <div 
                  key={conv.id}
                  style={{
                    padding: '16px',
                    borderBottom: `1px solid ${COLORS.border}`,
                    cursor: 'pointer',
                    display: 'flex',
                    gap: '12px',
                    alignItems: 'center',
                    transition: 'background 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = COLORS.gray}
                  onMouseLeave={(e) => e.currentTarget.style.background = COLORS.white}
                >
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.secondary})`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: COLORS.white,
                    fontWeight: 'bold',
                    fontSize: '18px',
                    flexShrink: 0
                  }}>
                    {conv.avatar}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '4px'
                    }}>
                      <div style={{ fontWeight: '600', color: COLORS.primary }}>{conv.name}</div>
                      <div style={{ fontSize: '12px', color: COLORS.darkGray }}>{conv.time}</div>
                    </div>
                    <div style={{ 
                      fontSize: '14px', 
                      color: COLORS.darkGray,
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}>
                      {conv.lastMessage}
                    </div>
                    <div style={{ fontSize: '12px', color: COLORS.darkGray, marginTop: '2px' }}>
                      {conv.college}
                    </div>
                  </div>
                  {conv.unread > 0 && (
                    <div style={{
                      background: COLORS.primary,
                      color: COLORS.white,
                      borderRadius: '50%',
                      width: '24px',
                      height: '24px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '12px',
                      fontWeight: 'bold',
                      flexShrink: 0
                    }}>
                      {conv.unread}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <div style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        background: COLORS.white,
        borderTop: `1px solid ${COLORS.border}`,
        padding: '12px 0',
        boxShadow: '0 -2px 8px rgba(0,0,0,0.1)'
      }}>
        <div style={{
          maxWidth: '600px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center'
        }}>
          <button
            onClick={() => setActiveTab('home')}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '4px',
              color: activeTab === 'home' ? COLORS.primary : COLORS.darkGray,
              padding: '8px 16px'
            }}
          >
            <Home size={24} />
            <span style={{ fontSize: '12px', fontWeight: activeTab === 'home' ? '600' : '400' }}>Feed</span>
          </button>
          
          <button
            onClick={() => setActiveTab('marketplace')}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '4px',
              color: activeTab === 'marketplace' ? COLORS.primary : COLORS.darkGray,
              padding: '8px 16px'
            }}
          >
            <ShoppingBag size={24} />
            <span style={{ fontSize: '12px', fontWeight: activeTab === 'marketplace' ? '600' : '400' }}>Marketplace</span>
          </button>
          
          <button
            onClick={() => setActiveTab('messages')}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '4px',
              color: activeTab === 'messages' ? COLORS.primary : COLORS.darkGray,
              padding: '8px 16px',
              position: 'relative'
            }}
          >
            <MessageCircle size={24} />
            <span style={{ fontSize: '12px', fontWeight: activeTab === 'messages' ? '600' : '400' }}>Messages</span>
            {conversations.filter(c => c.unread > 0).length > 0 && (
              <div style={{
                position: 'absolute',
                top: '4px',
                right: '12px',
                background: COLORS.primary,
                color: COLORS.white,
                borderRadius: '50%',
                width: '18px',
                height: '18px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '10px',
                fontWeight: 'bold'
              }}>
                {conversations.reduce((sum, c) => sum + c.unread, 0)}
              </div>
            )}
          </button>
          
          <button
            onClick={() => setShowChatbot(true)}
            style={{
              background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.secondary})`,
              border: 'none',
              cursor: 'pointer',
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: COLORS.white,
              boxShadow: '0 4px 12px rgba(139,0,0,0.3)',
              transform: 'translateY(-8px)'
            }}
          >
            <Bot size={28} />
          </button>
        </div>
      </div>

      {/* Post Modal */}
      {showPostModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '20px'
        }}>
          <div style={{
            background: COLORS.white,
            borderRadius: '16px',
            padding: '24px',
            maxWidth: '500px',
            width: '100%',
            maxHeight: '80vh',
            overflow: 'auto'
          }}>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              marginBottom: '20px'
            }}>
              <h3 style={{ fontSize: '20px', fontWeight: '600', margin: 0, color: COLORS.primary }}>Create Post</h3>
              <button
                onClick={() => setShowPostModal(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: COLORS.darkGray
                }}
              >
                <X size={24} />
              </button>
            </div>
            <textarea
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              placeholder="What's on your mind?"
              style={{
                width: '100%',
                minHeight: '150px',
                padding: '12px',
                border: `1px solid ${COLORS.border}`,
                borderRadius: '8px',
                fontSize: '16px',
                resize: 'vertical',
                fontFamily: 'inherit',
                marginBottom: '16px'
              }}
            />
            <button
              onClick={handleAddPost}
              style={{
                width: '100%',
                padding: '12px',
                background: COLORS.primary,
                color: COLORS.white,
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              Post
            </button>
          </div>
        </div>
      )}

      {/* Chatbot Modal */}
      {showChatbot && (
        <div style={{
          position: 'fixed',
          bottom: '100px',
          right: '20px',
          width: '380px',
          height: '500px',
          background: COLORS.white,
          borderRadius: '16px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 1000,
          overflow: 'hidden'
        }}>
          <div style={{
            background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.secondary})`,
            color: COLORS.white,
            padding: '16px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Bot size={24} />
              <div>
                <div style={{ fontWeight: '600' }}>PUPBot</div>
                <div style={{ fontSize: '12px', opacity: 0.9 }}>Campus Assistant</div>
              </div>
            </div>
            <button
              onClick={() => setShowChatbot(false)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: COLORS.white
              }}
            >
              <X size={20} />
            </button>
          </div>

          <div style={{
            flex: 1,
            overflowY: 'auto',
            padding: '16px',
            background: COLORS.gray
          }}>
            {chatMessages.map((msg, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  justifyContent: msg.type === 'user' ? 'flex-end' : 'flex-start',
                  marginBottom: '12px'
                }}
              >
                <div style={{
                  background: msg.type === 'user' ? COLORS.primary : COLORS.white,
                  color: msg.type === 'user' ? COLORS.white : '#333',
                  padding: '10px 14px',
                  borderRadius: '12px',
                  maxWidth: '75%',
                  fontSize: '14px',
                  lineHeight: '1.4',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          <div style={{
            padding: '16px',
            borderTop: `1px solid ${COLORS.border}`,
            background: COLORS.white
          }}>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input
                type="text"
                value={currentMessage}
                onChange={(e) => setCurrentMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask me anything..."
                style={{
                  flex: 1,
                  padding: '10px 14px',
                  border: `1px solid ${COLORS.border}`,
                  borderRadius: '24px',
                  fontSize: '14px',
                  outline: 'none'
                }}
              />
              <button
                onClick={handleSendMessage}
                style={{
                  background: COLORS.primary,
                  border: 'none',
                  borderRadius: '50%',
                  width: '40px',
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: COLORS.white
                }}
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;