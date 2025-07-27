import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ANIMALS = {
  stompy: {
    name: 'Stompy the Goat',
    species: 'Goat',
    sanctuary: 'Alveus Sanctuary',
    joined: 'August 2023',
    about: "Hi I'm Stompy and I'm an ostrich blah blah I was found in blah blah blah. My favorite food is blah blah bugs.",
    coverImg: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=250&fit=crop&crop=center',
    profileImg: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=100&h=100&fit=crop&crop=center',
    donation: { raised: 815, goal: 2000 },
    gallery: [
      'https://placehold.co/150x100?text=1',
      'https://placehold.co/150x100?text=2',
      'https://placehold.co/150x100?text=3',
    ],
    comments: [
      { user: 'Clara', text: 'Stunned by Stompy\'s beauty! ♥' },
      { user: 'James', text: '👑 1 ♥' },
      { user: 'Emily', text: 'You go, Stomp!' },
    ],
    supporters: [
      { name: 'Pawfect Coffee Co.', amount: 2000 },
      { name: 'Linda S.', amount: 1500 },
      { name: 'CryptoCat DAO', amount: 1250 },
    ],
  },
  luna: {
    name: 'Luna the Cow',
    species: 'Cow',
    sanctuary: 'Gentle Barn',
    joined: 'May 2022',
    about: "Luna loves sunbathing and making new friends. She was rescued from a dairy farm and now enjoys a peaceful life.",
    coverImg: 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=1200&h=250&fit=crop&crop=center',
    profileImg: 'https://images.unsplash.com/photo-1518715308788-3005759c61d4?w=100&h=100&fit=crop&crop=center',
    donation: { raised: 1200, goal: 2500 },
    gallery: [
      'https://placehold.co/150x100?text=Luna1',
      'https://placehold.co/150x100?text=Luna2',
      'https://placehold.co/150x100?text=Luna3',
    ],
    comments: [
      { user: 'Sam', text: 'Luna is the sweetest!' },
      { user: 'Jess', text: 'So glad she\'s safe now.' },
    ],
    supporters: [
      { name: 'Happy Hooves', amount: 900 },
      { name: 'Moo Friends', amount: 700 },
    ],
  },
  bella: {
    name: 'Bella the Pig',
    species: 'Pig',
    sanctuary: 'Sunny Acres',
    joined: 'March 2021',
    about: "Bella is a playful pig who loves mud baths and belly rubs. She was rescued from a factory farm.",
    coverImg: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=1200&h=250&fit=crop&crop=center',
    profileImg: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=100&h=100&fit=crop&crop=center',
    donation: { raised: 600, goal: 1800 },
    gallery: [
      'https://placehold.co/150x100?text=Bella1',
      'https://placehold.co/150x100?text=Bella2',
      'https://placehold.co/150x100?text=Bella3',
    ],
    comments: [
      { user: 'Megan', text: 'Bella is adorable!' },
    ],
    supporters: [
      { name: 'Piggy Pals', amount: 400 },
    ],
  },
  max: {
    name: 'Max the Horse',
    species: 'Horse',
    sanctuary: 'Freedom Reins',
    joined: 'January 2020',
    about: "Max is a gentle giant who loves apples and running in open fields. He was rescued from neglect.",
    coverImg: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?w=1200&h=250&fit=crop&crop=center',
    profileImg: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?w=100&h=100&fit=crop&crop=center',
    donation: { raised: 2000, goal: 3000 },
    gallery: [
      'https://placehold.co/150x100?text=Max1',
      'https://placehold.co/150x100?text=Max2',
      'https://placehold.co/150x100?text=Max3',
    ],
    comments: [
      { user: 'Alex', text: 'Max is so majestic!' },
    ],
    supporters: [
      { name: 'Horse Heroes', amount: 1500 },
    ],
  },
};

const EMOJI_OPTIONS = [
  '🤪', '😊', '😄', '😍', '🥰', '😴', '😎', '🤗', '😌', '🤩',
  '😋', '😝', '🤔', '😏', '😇', '🤠', '👻', '🤖', '🐱', '🐶',
  '🐰', '🐼', '🐨', '🐯', '🦁', '🐸', '🐷', '🐮', '🐴', '🐑'
];

export default function EditableAmbassadorProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [animal, setAnimal] = useState(ANIMALS[id] || ANIMALS['stompy']);
  const [isDark, setIsDark] = useState(false);
  const [newPostContent, setNewPostContent] = useState('');
  const [showEditModal, setShowEditModal] = useState(false);
  const [showFeelingEdit, setShowFeelingEdit] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [editData, setEditData] = useState({
    name: animal.name,
    about: animal.about,
    profileImg: animal.profileImg,
    coverImg: animal.coverImg,
    donationGoal: animal.donation.goal,
    feeling: animal.feeling || 'Silly',
    feelingEmoji: animal.feelingEmoji || '🤪'
  });
  const [selectedProfileFile, setSelectedProfileFile] = useState(null);
  const [selectedBannerFile, setSelectedBannerFile] = useState(null);
  const [selectedPostImage, setSelectedPostImage] = useState(null);
  const [postImagePreview, setPostImagePreview] = useState('');
  const [showPostModal, setShowPostModal] = useState(false);

  useEffect(() => {
    const updateTheme = () => {
      setIsDark(document.documentElement.getAttribute('data-theme') === 'dark');
    };
    updateTheme();
    window.addEventListener('themechange', updateTheme);
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => {
      window.removeEventListener('themechange', updateTheme);
      observer.disconnect();
    };
  }, []);

  // Add mock stats and timeline posts for desktop, inspired by mobile
  const animalStats = {
    age: animal.age || '3 years old',
    location: animal.location || 'Austin, Texas',
    rescueDate: animal.rescueDate || 'March 2022',
    followers: animal.followers || 1247,
    personality: animal.personality || ['Playful', 'Adventurous', 'Social'],
    needs: animal.needs || ['Special diet', 'Regular vet checkups', 'Enrichment toys'],
    feeling: editData.feeling,
    feelingEmoji: editData.feelingEmoji,
    feelingUpdate: animal.feelingUpdate || '2 hours ago',
  };
  
  const timelinePosts = [
    {
      id: 1,
      date: '2 days ago',
      user: animal.name,
      avatar: animal.profileImg,
      content: 'Stompy got a new climbing structure! Thanks to your donations, Stompy now has a brand new climbing structure in his enclosure. He absolutely loves it!',
      image: animal.gallery[0],
      reactions: { like: 8, laugh: 2, love: 5, sad: 0 },
      comments: [
        { user: 'Clara', text: 'So happy for Stompy!' },
        { user: 'James', text: 'Goat parkour king!' }
      ]
    },
    {
      id: 2,
      date: '1 week ago',
      user: animal.name,
      avatar: animal.profileImg,
      content: 'Vet checkup went great! Stompy had his annual checkup and the vet says he\'s in perfect health. His hooves are looking great too!',
      image: null,
      reactions: { like: 12, laugh: 1, love: 7, sad: 0 },
      comments: [
        { user: 'Emily', text: 'Healthy and happy!' }
      ]
    }
  ];
  
  const [postReactions, setPostReactions] = useState(timelinePosts.map(post => ({ ...post.reactions })));
  const [postComments, setPostComments] = useState(timelinePosts.map(post => post.comments));
  const [commentInputs, setCommentInputs] = useState(timelinePosts.map(() => ''));

  const handleReact = (postIdx, type) => {
    setPostReactions(prev => prev.map((r, i) => i === postIdx ? { ...r, [type]: r[type] + 1 } : r));
  };
  
  const handleCommentInput = (postIdx, value) => {
    setCommentInputs(prev => prev.map((v, i) => i === postIdx ? value : v));
  };
  
  const handleAddComment = (postIdx) => {
    if (commentInputs[postIdx].trim()) {
      setPostComments(prev => prev.map((c, i) => i === postIdx ? [...c, { user: 'You', text: commentInputs[postIdx] }] : c));
      setCommentInputs(prev => prev.map((v, i) => i === postIdx ? '' : v));
    }
  };

  const handleAddPost = () => {
    if (newPostContent.trim()) {
      const newPost = {
        id: Date.now(),
        date: 'Just now',
        user: animal.name,
        avatar: animal.profileImg,
        content: newPostContent,
        image: postImagePreview || null,
        reactions: { like: 0, laugh: 0, love: 0, sad: 0 },
        comments: []
      };
      
      // Add to timeline posts
      timelinePosts.unshift(newPost);
      setPostReactions(prev => [{ like: 0, laugh: 0, love: 0, sad: 0 }, ...prev]);
      setPostComments(prev => [[], ...prev]);
      setCommentInputs(prev => ['', ...prev]);
      setNewPostContent('');
      setSelectedPostImage(null);
      setPostImagePreview('');
    }
  };

  const handleProfileFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedProfileFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setEditData(prev => ({ ...prev, profileImg: e.target.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBannerFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedBannerFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setEditData(prev => ({ ...prev, coverImg: e.target.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePostImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedPostImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setPostImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveEdit = () => {
    setAnimal(prev => ({
      ...prev,
      name: editData.name,
      about: editData.about,
      profileImg: editData.profileImg,
      coverImg: editData.coverImg,
      feeling: editData.feeling,
      feelingEmoji: editData.feelingEmoji,
      donation: {
        ...prev.donation,
        goal: editData.donationGoal
      }
    }));
    setShowEditModal(false);
    setSelectedProfileFile(null);
    setSelectedBannerFile(null);
  };

  const handleCancelEdit = () => {
    setEditData({
      name: animal.name,
      about: animal.about,
      profileImg: animal.profileImg,
      coverImg: animal.coverImg,
      donationGoal: animal.donation.goal,
      feeling: animal.feeling || 'Silly',
      feelingEmoji: animal.feelingEmoji || '🤪'
    });
    setShowEditModal(false);
    setSelectedProfileFile(null);
    setSelectedBannerFile(null);
  };

  const handleSaveFeeling = () => {
    setAnimal(prev => ({
      ...prev,
      feeling: editData.feeling,
      feelingEmoji: editData.feelingEmoji
    }));
    setShowFeelingEdit(false);
  };

  const handleCancelFeeling = () => {
    setEditData(prev => ({
      ...prev,
      feeling: animal.feeling || 'Silly',
      feelingEmoji: animal.feelingEmoji || '🤪'
    }));
    setShowFeelingEdit(false);
  };

  const handleEmojiSelect = (emoji) => {
    setEditData(prev => ({ ...prev, feelingEmoji: emoji }));
    setShowEmojiPicker(false);
  };

  return (
    <div className="ambassador-profile" style={{ background: 'var(--background)' }}>
      {/* Header with Edit Button */}
      <div style={{ 
        background: 'var(--card)', 
        padding: '16px 24px', 
        borderBottom: '1px solid var(--border)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24
      }}>
        <button 
          onClick={() => navigate(-1)}
          style={{
            background: 'none',
            border: 'none',
            fontSize: 16,
            cursor: 'pointer',
            color: 'var(--text)',
            display: 'flex',
            alignItems: 'center',
            gap: 8
          }}
        >
          ← Back to Dashboard
        </button>
        <button 
          onClick={() => setShowEditModal(true)}
          className="button"
          style={{ padding: '8px 16px', fontSize: 14 }}
        >
          Edit Profile
        </button>
      </div>

      {/* Cover and Profile Header */}
      <div className="profile-header" style={{ position: 'relative', height: 180, background: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(${animal.coverImg})`, backgroundSize: 'cover', backgroundPosition: 'center', borderRadius: 24, marginBottom: 24 }}>
        {/* Avatar and name/species/sanctuary positioned together */}
        <div className="avatar-name" style={{ position: 'absolute', bottom: -60, left: 32, display: 'flex', alignItems: 'flex-end', gap: 24 }}>
          <img src={animal.profileImg} alt="Animal Avatar" style={{ border: '4px solid var(--background)', borderRadius: '50%', width: 100, height: 100, objectFit: 'cover' }} />
          <div style={{ marginBottom: 60 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <h1 style={{ margin: 0, fontFamily: 'Calistoga, serif', color: '#fff', fontSize: 28 }}>{animal.name}</h1>
              <span style={{ color: '#fff', opacity: 0.7, fontSize: 16, fontWeight: 400, marginLeft: 4 }}>{animal.species} @ {animal.sanctuary}</span>
            </div>
          </div>
        </div>

      </div>

      {/* Fundraising Bar */}
      <div className="profile-stats" style={{ marginLeft: 176, marginBottom: 32 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginBottom: 16 }}>
          <div style={{ fontSize: 24, fontWeight: 600, color: 'var(--primary)' }}>${animal.donation.raised} raised</div>
          <div style={{ fontSize: 14, color: 'var(--text)', opacity: 0.7 }}>/ ${animal.donation.goal} goal</div>
          <div style={{ flex: 1 }}>
            <div style={{ width: '100%', height: 8, background: 'var(--gray)', borderRadius: 4, overflow: 'hidden' }}>
              <div style={{ width: `${Math.round((animal.donation.raised/animal.donation.goal)*100)}%`, height: '100%', background: 'linear-gradient(90deg, var(--primary), var(--secondary))', borderRadius: 4 }} />
            </div>
          </div>
          <div style={{ fontSize: 14, color: 'var(--primary)', fontWeight: 600 }}>{Math.round((animal.donation.raised/animal.donation.goal)*100)}%</div>
        </div>
      </div>

      {/* Emotion Card */}
      <div style={{ maxWidth: 1100, margin: '0 auto', marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, background: 'var(--card)', border: '2px solid var(--accent)', borderRadius: 16, padding: '16px 24px' }}>
          <span style={{ fontSize: 32 }}>{animalStats.feelingEmoji}</span>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 600, fontSize: 18, color: 'var(--primary)' }}>{animal.name} is feeling: {animalStats.feeling}</div>
            <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Updated {animalStats.feelingUpdate}</div>
          </div>
          <button 
            onClick={() => setShowFeelingEdit(true)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: 18,
              color: 'var(--text-secondary)',
              padding: 8,
              borderRadius: 8,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            ✏️
          </button>
        </div>
      </div>

      {/* New Post Section - Facebook Style */}
      <div style={{ maxWidth: 1100, margin: '0 auto', marginBottom: 24 }}>
        <div style={{ background: 'var(--card)', borderRadius: 12, padding: 20, boxShadow: '0 2px 8px rgba(0,0,0,0.04)', border: '1px solid var(--border)' }}>
          {/* Condensed Post Input */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', background: 'var(--background)', borderRadius: 8, border: '1px solid var(--border)', cursor: 'pointer' }} onClick={() => setShowPostModal(true)}>
            <img 
              src={animal.profileImg} 
              alt={animal.name} 
              style={{ 
                width: 40, 
                height: 40, 
                borderRadius: '50%', 
                objectFit: 'cover' 
              }} 
            />
            <div style={{ flex: 1, color: 'var(--text-secondary)', fontSize: 16 }}>
              What's on your mind, {animal.name.split(' ')[0]}?
            </div>
          </div>
          
          {/* Post Options Bar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 12, paddingTop: 12, borderTop: '1px solid var(--border)' }}>
            <button 
              onClick={() => setShowPostModal(true)}
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 8, 
                background: 'none', 
                border: 'none', 
                color: 'var(--text-secondary)', 
                cursor: 'pointer',
                padding: '8px 12px',
                borderRadius: 6,
                fontSize: 14
              }}
            >
              <span style={{ color: '#45bd62', fontSize: 18 }}>📷</span>
              Photo/Video
            </button>
            <button 
              onClick={() => setShowPostModal(true)}
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 8, 
                background: 'none', 
                border: 'none', 
                color: 'var(--text-secondary)', 
                cursor: 'pointer',
                padding: '8px 12px',
                borderRadius: 6,
                fontSize: 14
              }}
            >
              <span style={{ color: '#f7b928', fontSize: 18 }}>😊</span>
              Feeling/Activity
            </button>
            <button 
              onClick={() => setShowPostModal(true)}
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 8, 
                background: 'none', 
                border: 'none', 
                color: 'var(--text-secondary)', 
                cursor: 'pointer',
                padding: '8px 12px',
                borderRadius: 6,
                fontSize: 14
              }}
            >
              <span style={{ color: '#e41e3f', fontSize: 18 }}>📍</span>
              Check in
            </button>
          </div>
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
          zIndex: 1000
        }}>
          <div style={{
            background: 'var(--card)',
            borderRadius: 16,
            padding: 0,
            maxWidth: 500,
            width: '90%',
            maxHeight: '90vh',
            overflow: 'hidden',
            boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
          }}>
            {/* Modal Header */}
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              padding: '16px 20px',
              borderBottom: '1px solid var(--border)'
            }}>
              <h2 style={{ margin: 0, fontSize: 20, fontWeight: 600, color: 'var(--text)' }}>Create post</h2>
              <button 
                onClick={() => setShowPostModal(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: 24,
                  cursor: 'pointer',
                  color: 'var(--text-secondary)',
                  padding: 0,
                  width: 32,
                  height: 32,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                ×
              </button>
            </div>

            {/* User Info */}
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 12, 
              padding: '16px 20px',
              borderBottom: '1px solid var(--border)'
            }}>
              <img 
                src={animal.profileImg} 
                alt={animal.name} 
                style={{ 
                  width: 40, 
                  height: 40, 
                  borderRadius: '50%', 
                  objectFit: 'cover' 
                }} 
              />
              <div>
                <div style={{ fontWeight: 600, color: 'var(--text)' }}>{animal.name}</div>
                <button style={{
                  background: 'var(--background)',
                  border: '1px solid var(--border)',
                  borderRadius: 6,
                  padding: '4px 8px',
                  fontSize: 12,
                  color: 'var(--text-secondary)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4
                }}>
                  🌐 Public ▼
                </button>
              </div>
            </div>

            {/* Post Content Area */}
            <div style={{ padding: '20px' }}>
              <textarea
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
                placeholder={`What's on your mind, ${animal.name.split(' ')[0]}?`}
                style={{
                  width: '100%',
                  minHeight: 120,
                  border: 'none',
                  background: 'transparent',
                  color: 'var(--text)',
                  fontSize: 16,
                  resize: 'none',
                  outline: 'none',
                  fontFamily: 'inherit'
                }}
              />
              
              {/* Post Image Preview */}
              {postImagePreview && (
                <div style={{ marginTop: 16, position: 'relative' }}>
                  <img 
                    src={postImagePreview} 
                    alt="Post preview" 
                    style={{ 
                      width: '100%', 
                      maxHeight: 300, 
                      borderRadius: 8,
                      objectFit: 'cover'
                    }} 
                  />
                  <button 
                    onClick={() => {
                      setSelectedPostImage(null);
                      setPostImagePreview('');
                    }}
                    style={{
                      position: 'absolute',
                      top: 8,
                      right: 8,
                      background: 'rgba(0,0,0,0.7)',
                      border: 'none',
                      borderRadius: '50%',
                      width: 32,
                      height: 32,
                      color: 'white',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    ×
                  </button>
                </div>
              )}
            </div>

                         {/* Add to your post section */}
             <div style={{ 
               padding: '16px 20px',
               borderTop: '1px solid var(--border)',
               borderBottom: '1px solid var(--border)'
             }}>
               <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)', marginBottom: 12 }}>
                 Add to your post
               </div>
               <div style={{ display: 'flex', gap: 16 }}>
                 <button 
                   onClick={() => document.getElementById('post-image-upload').click()}
                   style={{
                     display: 'flex',
                     alignItems: 'center',
                     gap: 8,
                     background: 'none',
                     border: 'none',
                     color: 'var(--text-secondary)',
                     cursor: 'pointer',
                     padding: '8px 12px',
                     borderRadius: 6,
                     fontSize: 14
                   }}
                 >
                   <span style={{ color: '#45bd62', fontSize: 18 }}>📷</span>
                   Photo/Video
                 </button>
               </div>
             </div>

            {/* Hidden file input */}
            <input
              type="file"
              accept="image/*"
              onChange={handlePostImageChange}
              style={{ display: 'none' }}
              id="post-image-upload"
            />

            {/* Post Button */}
            <div style={{ padding: '16px 20px' }}>
              <button 
                onClick={() => {
                  handleAddPost();
                  setShowPostModal(false);
                }}
                disabled={!newPostContent.trim()}
                style={{
                  width: '100%',
                  padding: '12px',
                  background: newPostContent.trim() ? 'var(--primary)' : 'var(--border)',
                  color: newPostContent.trim() ? 'white' : 'var(--text-secondary)',
                  border: 'none',
                  borderRadius: 8,
                  fontSize: 16,
                  fontWeight: 600,
                  cursor: newPostContent.trim() ? 'pointer' : 'not-allowed'
                }}
              >
                Post
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Layout */}
      <div className="tab-content" style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 24 }}>
        {/* Sidebar */}
        <div className="sidebar">
          <div className="about-card" style={{ background: 'var(--card)', borderRadius: 16, padding: 24, marginBottom: 24 }}>
            <h2>About {animal.name.split(' ')[0]}</h2>
            <p>{animal.about}</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
              <div><strong>Age:</strong><br />{animalStats.age}</div>
              <div><strong>Location:</strong><br />{animalStats.location}</div>
              <div><strong>Rescued:</strong><br />{animalStats.rescueDate}</div>
              <div><strong>Followers:</strong><br />{animalStats.followers.toLocaleString()}</div>
            </div>
            <div style={{ marginBottom: 12 }}>
              <strong>Personality:</strong>
              <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                {animalStats.personality.map(trait => (
                  <span key={trait} style={{ padding: '4px 8px', background: 'linear-gradient(90deg, var(--accent), var(--primary))', color: '#fff', borderRadius: 12, fontSize: 12, fontWeight: 600 }}>{trait}</span>
                ))}
              </div>
            </div>
            <div>
              <strong>Current Needs:</strong>
              <ul style={{ margin: '8px 0 0 0', paddingLeft: 20, color: 'var(--text)' }}>
                {animalStats.needs.map(need => (
                  <li key={need} style={{ marginBottom: 4 }}>{need}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="leaderboard" style={{ background: 'var(--card)', borderRadius: 16, padding: 24, marginBottom: 24 }}>
            <h2>Top Supporters 🏆</h2>
            <ol>
              {animal.supporters.map((s, i) => (
                <li key={i}><strong>{s.name}</strong> – ${s.amount.toLocaleString()}</li>
              ))}
            </ol>
          </div>
          <div className="gallery" style={{ background: 'var(--card)', borderRadius: 16, padding: 24, marginBottom: 24 }}>
            <h2>Photo Gallery</h2>
            <div className="photo-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginTop: 12 }}>
              {(animal.gallery.slice(0, 9)).map((img, i) => (
                <img key={i} src={img} alt={`${animal.name} ${i+1}`} style={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover', borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }} />
              ))}
            </div>
            <a href="#" style={{ display: 'block', marginTop: 16, color: 'var(--primary)', fontWeight: 600, textDecoration: 'none', textAlign: 'right' }}>See all photos</a>
          </div>
          <div className="comments" style={{ background: 'var(--card)', borderRadius: 16, padding: 24 }}>
            <h2>Comments</h2>
            <div style={{ background: 'var(--background)', padding: 16, borderRadius: 12, marginTop: 12 }}>
              {animal.comments.map((c, i) => (
                <p key={i}><strong>{c.user}:</strong> {c.text}</p>
              ))}
            </div>
            <div style={{ marginTop: 16, display: 'flex' }}>
              <input type="text" placeholder="Add a comment..." style={{ flex: 1, padding: '0.5rem', borderRadius: '6px 0 0 6px', border: '1.5px solid var(--border)', background: 'var(--background)', color: 'var(--text)' }} />
              <button className="button" style={{ borderRadius: '0 6px 6px 0', background: 'var(--pink)', color: '#fff' }}>Post</button>
            </div>
          </div>
        </div>
        {/* Main Content */}
        <div>
          <div className="status" style={{ background: 'var(--card)', borderRadius: 16, padding: 24, marginBottom: 24 }}>
            <h2>Timeline & Updates</h2>
            {timelinePosts.map((post, idx) => (
              <div key={post.id} style={{ background: 'var(--background)', borderRadius: 12, padding: 20, marginBottom: 20, boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                  <img src={post.avatar} alt={post.user} style={{ width: 40, height: 40, borderRadius: '50%' }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, color: 'var(--text)' }}>{post.user}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{post.date}</div>
                  </div>
                </div>
                <div style={{ marginBottom: 8, color: 'var(--text)' }}>{post.content}</div>
                {post.image && <img src={post.image} alt="Post" style={{ width: '100%', borderRadius: 8, marginBottom: 8 }} />}
                <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 8 }}>
                  <button onClick={() => handleReact(idx, 'like')} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 18 }}>👍 {postReactions[idx].like}</button>
                  <button onClick={() => handleReact(idx, 'laugh')} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 18 }}>😂 {postReactions[idx].laugh}</button>
                  <button onClick={() => handleReact(idx, 'love')} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 18 }}>😍 {postReactions[idx].love}</button>
                  <button onClick={() => handleReact(idx, 'sad')} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 18 }}>😢 {postReactions[idx].sad}</button>
                </div>
                <div style={{ marginBottom: 8 }}>
                  {postComments[idx].map((c, i) => (
                    <div key={i} style={{ fontSize: 14, color: 'var(--text)', marginBottom: 4 }}><strong>{c.user}:</strong> {c.text}</div>
                  ))}
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <input type="text" value={commentInputs[idx]} onChange={e => handleCommentInput(idx, e.target.value)} placeholder="Add a comment..." style={{ flex: 1, padding: '0.5rem', borderRadius: 6, border: '1.5px solid var(--border)', background: 'var(--background)', color: 'var(--text)' }} />
                  <button className="button" style={{ borderRadius: 6, background: 'var(--pink)', color: '#fff' }} onClick={() => handleAddComment(idx)}>Post</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {showEditModal && (
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
          zIndex: 1000
        }}>
          <div style={{
            background: 'var(--card)',
            borderRadius: 16,
            padding: 32,
            maxWidth: 500,
            width: '90%',
            maxHeight: '90vh',
            overflow: 'auto',
            boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <h2 style={{ margin: 0, fontSize: 24, fontWeight: 600, color: 'var(--text)' }}>Edit Profile</h2>
              <button 
                onClick={handleCancelEdit}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: 24,
                  cursor: 'pointer',
                  color: 'var(--text-secondary)',
                  padding: 0,
                  width: 32,
                  height: 32,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                ×
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 20, alignItems: 'center' }}>
              {/* Profile Picture */}
              <div style={{ width: '100%', textAlign: 'center' }}>
                <label style={{ display: 'block', marginBottom: 8, fontWeight: 600, color: 'var(--text)' }}>
                  Profile Picture
                </label>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, marginBottom: 12 }}>
                  <img 
                    src={editData.profileImg} 
                    alt="Profile" 
                    style={{ 
                      width: 120, 
                      height: 120, 
                      borderRadius: '50%', 
                      objectFit: 'cover',
                      border: '2px solid var(--border)'
                    }} 
                  />
                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleProfileFileChange}
                      style={{ display: 'none' }}
                      id="profile-upload"
                    />
                    <label 
                      htmlFor="profile-upload"
                      className="button"
                      style={{
                        display: 'inline-block',
                        padding: '8px 16px',
                        fontSize: 14,
                        cursor: 'pointer',
                        textAlign: 'center',
                        marginBottom: 8
                      }}
                    >
                      Choose File
                    </label>
                    {selectedProfileFile && (
                      <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
                        Selected: {selectedProfileFile.name}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Banner Image */}
              <div style={{ width: '100%', textAlign: 'center' }}>
                <label style={{ display: 'block', marginBottom: 8, fontWeight: 600, color: 'var(--text)' }}>
                  Banner Image
                </label>
                <div style={{ marginBottom: 12 }}>
                  <img 
                    src={editData.coverImg} 
                    alt="Banner" 
                    style={{ 
                      width: '100%', 
                      height: 120, 
                      objectFit: 'cover',
                      borderRadius: 8,
                      border: '2px solid var(--border)'
                    }} 
                  />
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginBottom: 12 }}>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleBannerFileChange}
                    style={{ display: 'none' }}
                    id="banner-upload"
                  />
                  <label 
                    htmlFor="banner-upload"
                    className="button"
                    style={{
                      display: 'inline-block',
                      padding: '8px 16px',
                      fontSize: 14,
                      cursor: 'pointer',
                      textAlign: 'center'
                    }}
                  >
                    Choose File
                  </label>
                  {selectedBannerFile && (
                    <div style={{ fontSize: 12, color: 'var(--text-secondary)', display: 'flex', alignItems: 'center' }}>
                      Selected: {selectedBannerFile.name}
                    </div>
                  )}
                </div>
              </div>

              {/* Name */}
              <div style={{ width: '100%', textAlign: 'center' }}>
                <label style={{ display: 'block', marginBottom: 8, fontWeight: 600, color: 'var(--text)' }}>
                  Name
                </label>
                <input
                  type="text"
                  value={editData.name}
                  onChange={(e) => setEditData(prev => ({ ...prev, name: e.target.value }))}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid var(--border)',
                    borderRadius: 8,
                    background: 'var(--background)',
                    color: 'var(--text)',
                    fontSize: 16,
                    textAlign: 'center'
                  }}
                />
              </div>

              {/* About */}
              <div style={{ width: '100%', textAlign: 'center' }}>
                <label style={{ display: 'block', marginBottom: 8, fontWeight: 600, color: 'var(--text)' }}>
                  About
                </label>
                <textarea
                  value={editData.about}
                  onChange={(e) => setEditData(prev => ({ ...prev, about: e.target.value }))}
                  rows={4}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid var(--border)',
                    borderRadius: 8,
                    background: 'var(--background)',
                    color: 'var(--text)',
                    fontSize: 14,
                    resize: 'vertical',
                    textAlign: 'center'
                  }}
                />
              </div>

              {/* Donation Goal */}
              <div style={{ width: '100%', textAlign: 'center' }}>
                <label style={{ display: 'block', marginBottom: 8, fontWeight: 600, color: 'var(--text)' }}>
                  Donation Goal ($)
                </label>
                <input
                  type="number"
                  value={editData.donationGoal}
                  onChange={(e) => setEditData(prev => ({ ...prev, donationGoal: parseInt(e.target.value) || 0 }))}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid var(--border)',
                    borderRadius: 8,
                    background: 'var(--background)',
                    color: 'var(--text)',
                    fontSize: 16,
                    textAlign: 'center'
                  }}
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: 12, marginTop: 32 }}>
              <button 
                onClick={handleCancelEdit}
                style={{
                  flex: 1,
                  padding: '12px',
                  border: '1px solid var(--border)',
                  borderRadius: 8,
                  background: 'var(--background)',
                  color: 'var(--text)',
                  fontSize: 16,
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
              <button 
                onClick={handleSaveEdit}
                className="button"
                style={{
                  flex: 1,
                  padding: '12px',
                  fontSize: 16
                }}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Feeling Modal */}
      {showFeelingEdit && (
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
          zIndex: 1000
        }}>
          <div style={{
            background: 'var(--card)',
            borderRadius: 16,
            padding: 32,
            maxWidth: 400,
            width: '90%',
            boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <h2 style={{ margin: 0, fontSize: 24, fontWeight: 600, color: 'var(--text)' }}>Edit Feeling</h2>
              <button 
                onClick={handleCancelFeeling}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: 24,
                  cursor: 'pointer',
                  color: 'var(--text-secondary)',
                  padding: 0,
                  width: 32,
                  height: 32,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                ×
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {/* Feeling Emoji */}
              <div>
                <label style={{ display: 'block', marginBottom: 8, fontWeight: 600, color: 'var(--text)' }}>
                  Feeling Emoji
                </label>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                  <span style={{ fontSize: 32 }}>{editData.feelingEmoji}</span>
                  <button 
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                    className="button"
                    style={{
                      padding: '8px 16px',
                      fontSize: 14
                    }}
                  >
                    Choose Emoji
                  </button>
                </div>
                {showEmojiPicker && (
                  <div style={{
                    background: 'var(--background)',
                    border: '1px solid var(--border)',
                    borderRadius: 8,
                    padding: 12,
                    marginBottom: 12,
                    maxHeight: 200,
                    overflow: 'auto'
                  }}>
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(6, 1fr)',
                      gap: 8
                    }}>
                      {EMOJI_OPTIONS.map((emoji, index) => (
                        <button
                          key={index}
                          onClick={() => handleEmojiSelect(emoji)}
                          style={{
                            background: 'none',
                            border: 'none',
                            fontSize: 24,
                            cursor: 'pointer',
                            padding: 8,
                            borderRadius: 4,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          {emoji}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Feeling Text */}
              <div>
                <label style={{ display: 'block', marginBottom: 8, fontWeight: 600, color: 'var(--text)' }}>
                  Feeling Description
                </label>
                <input
                  type="text"
                  value={editData.feeling}
                  onChange={(e) => setEditData(prev => ({ ...prev, feeling: e.target.value }))}
                  placeholder="e.g., Happy, Excited, Sleepy"
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid var(--border)',
                    borderRadius: 8,
                    background: 'var(--background)',
                    color: 'var(--text)',
                    fontSize: 16
                  }}
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: 12, marginTop: 32 }}>
              <button 
                onClick={handleCancelFeeling}
                style={{
                  flex: 1,
                  padding: '12px',
                  border: '1px solid var(--border)',
                  borderRadius: 8,
                  background: 'var(--background)',
                  color: 'var(--text)',
                  fontSize: 16,
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
              <button 
                onClick={handleSaveFeeling}
                className="button"
                style={{
                  flex: 1,
                  padding: '12px',
                  fontSize: 16
                }}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 