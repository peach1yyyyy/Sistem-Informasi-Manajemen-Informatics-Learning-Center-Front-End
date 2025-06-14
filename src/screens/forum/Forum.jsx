import React, { useState, useEffect } from 'react';
import Sidebar from '../sidebar/Sidebar';
import './forum.css';

const forumList = [
  { id: 1, title: 'Forum Data Science', date: '12 Sep 2025', unread: 0, programType: 'Seminar', timestamp: new Date('2025-09-12T08:00:00').getTime() },
  { id: 2, title: 'Forum UI/UX', date: '13 Sep 2025', unread: 0, programType: 'Course', timestamp: new Date('2025-09-13T10:00:00').getTime() },
  { id: 3, title: 'Forum Data Mining', date: '14 Sep 2025', unread: 0, programType: 'Course', timestamp: new Date('2025-09-14T11:30:00').getTime() },
  { id: 4, title: 'Forum AI', date: '20 Sep 2025', unread: 2, programType: 'Seminar', timestamp: new Date('2025-09-20T09:15:00').getTime() },
  { id: 5, title: 'Forum Workshop', date: '25 Sep 2025', unread: 1, programType: 'Workshop', timestamp: new Date('2025-09-25T14:45:00').getTime() }
];

const initialCommentData = {
  1: [
    {
      id: 1,
      user: 'Rini Nirmala, M.Klin',
      content: 'Ini kok gini gimana ???\nhayo dibenerin dulu. jangan buru² dikumpulkan 😋',
      likes: 0,
      timestamp: Date.now(),
      replies: [
        { id: 2, user: 'Jovanca Aduhai', content: 'Baik bu sya kerjakan nanti malam jam 12 bu.', likes: 0, timestamp: Date.now() },
        { id: 3, user: 'Rini Nirmala, M.Klin', content: 'okee', likes: 0, timestamp: Date.now() }
      ]
    }
  ],
  2: [
    {
      id: 4,
      user: 'Rakabuming Suhu',
      content: 'Bu mau tanya, apa itu SIGIE?',
      likes: 0,
      timestamp: Date.now(),
      replies: [
        { id: 5, user: 'Jonathan Duel', content: 'Bu besok materinya apa?', likes: 0, timestamp: Date.now() }
      ]
    }
  ]
};

const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleString('id-ID', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

const Forum = () => {
  const [selectedForumId, setSelectedForumId] = useState(1);
  const [commentData, setCommentData] = useState(() => {
    const stored = localStorage.getItem('comments');
    return stored ? JSON.parse(stored) : initialCommentData;
  });
  const [inputText, setInputText] = useState('');
  const [replyTo, setReplyTo] = useState(null);
  const [editReply, setEditReply] = useState({ commentId: null, replyId: null });
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    localStorage.setItem('comments', JSON.stringify(commentData));
  }, [commentData]);

  const handleForumClick = (id) => {
    setSelectedForumId(id);
    setReplyTo(null);
    setEditReply({ commentId: null, replyId: null });
    setInputText('');
  };

  const handleCommentSubmit = () => {
    if (!inputText.trim()) return;

    const updated = { ...commentData };

    if (editReply.commentId && editReply.replyId) {
      updated[selectedForumId] = updated[selectedForumId].map((comment) => {
        if (comment.id === editReply.commentId) {
          return {
            ...comment,
            replies: comment.replies.map((reply) =>
              reply.id === editReply.replyId ? { ...reply, content: inputText } : reply
            )
          };
        }
        return comment;
      });
      setEditReply({ commentId: null, replyId: null });
    } else if (replyTo) {
      updated[selectedForumId] = updated[selectedForumId].map((comment) => {
        if (comment.id === replyTo) {
          return {
            ...comment,
            replies: [...comment.replies, {
              id: Date.now(),
              user: 'Anda',
              content: inputText,
              likes: 0,
              timestamp: Date.now()
            }]
          };
        }
        return comment;
      });
    } else {
      if (!updated[selectedForumId]) updated[selectedForumId] = [];
      updated[selectedForumId].push({
        id: Date.now(),
        user: 'Anda',
        content: inputText,
        likes: 0,
        timestamp: Date.now(),
        replies: []
      });
    }

    setCommentData(updated);
    setInputText('');
    setReplyTo(null);
    setEditReply({ commentId: null, replyId: null });
  };

  const handleLikeComment = (commentId) => {
    const updated = { ...commentData };
    updated[selectedForumId] = updated[selectedForumId].map((comment) =>
      comment.id === commentId ? { ...comment, likes: (comment.likes || 0) + 1 } : comment
    );
    setCommentData(updated);
  };

  const handleLikeReply = (commentId, replyId) => {
    const updated = { ...commentData };
    updated[selectedForumId] = updated[selectedForumId].map((comment) => {
      if (comment.id === commentId) {
        return {
          ...comment,
          replies: comment.replies.map((reply) =>
            reply.id === replyId ? { ...reply, likes: (reply.likes || 0) + 1 } : reply
          )
        };
      }
      return comment;
    });
    setCommentData(updated);
  };

  const handleEditReply = (commentId, replyId, content) => {
    setEditReply({ commentId, replyId });
    setInputText(content);
    setReplyTo(null);
  };

  const filteredForums = filter === 'All' ? forumList : forumList.filter((f) => f.programType === filter);

  return (
    <div className="forum-container">
      <Sidebar />
      <div className="forum-main">
        <div className="forum-left">
          <div className="forum-header">
            <h2>Forum</h2>
            <div className="course-filter">
              {['All', 'Course', 'Seminar', 'Workshop'].map((f) => (
                <button
                  key={f}
                  className={`filter-button ${filter === f ? 'active' : ''}`}
                  onClick={() => setFilter(f)}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
          <div className="forum-list">
            {filteredForums.length === 0 ? (
              <p className="no-forum">Tidak ada forum untuk kategori ini.</p>
            ) : (
              filteredForums.map((forum) => (
                <div
                  key={forum.id}
                  className={`forum-item ${selectedForumId === forum.id ? 'active' : ''}`}
                  onClick={() => handleForumClick(forum.id)}
                >
                  <div className="forum-info">
                    <p>{forum.title}</p>
                    <span>{forum.date}</span>
                  </div>
                  {forum.unread > 0 && <div className="forum-badge">{forum.unread}</div>}
                </div>
              ))
            )}
          </div>
        </div>

        <div className="forum-right fade-in">
          <div className="forum-detail">
            <h3 style={{ color: '#0d3b66' }}>
              {forumList.find(f => f.id === selectedForumId)?.title || 'Forum'}
            </h3>
            <div className="forum-input">
              {(replyTo || editReply.replyId) && (
                <div className="replying-info">
                  {editReply.replyId ? 'Mengedit balasan' : 'Membalas komentar'}
                  <button
                    onClick={() => {
                      setReplyTo(null);
                      setEditReply({ commentId: null, replyId: null });
                      setInputText('');
                    }}
                    className="cancel-btn"
                  >
                    Batal
                  </button>
                </div>
              )}
              <input
                type="text"
                placeholder="Tulis komentar..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleCommentSubmit()}
              />
              <button onClick={handleCommentSubmit}>⏎</button>
            </div>

            <div className="forum-thread">
              {(commentData[selectedForumId] || []).map((comment) => (
                <div key={comment.id} className="forum-comment">
                  <div className="comment-header">
                    <strong>{comment.user}</strong>
                    <span className="comment-time">{formatDate(comment.timestamp)}</span>
                  </div>
                  <div className="comment-content">
                    {comment.content.split('\n').map((line, index) => (
                      <p key={index}>{line}</p>
                    ))}
                  </div>
                  <div className="comment-actions">
                    <button onClick={() => handleLikeComment(comment.id)}>❤️ {comment.likes || 0}</button>
                    <button onClick={() => setReplyTo(comment.id)}>Reply</button>
                  </div>
                  <div className="forum-replies">
                    {comment.replies.map((reply) => (
                      <div key={reply.id} className="forum-reply">
                        <div className="reply-header">
                          <strong>{reply.user}</strong>
                          <span className="reply-time">{formatDate(reply.timestamp)}</span>
                        </div>
                        <div className="reply-content">{reply.content}</div>
                        <div className="reply-actions">
                          <button onClick={() => handleLikeReply(comment.id, reply.id)}>
                            ❤️ {reply.likes || 0}
                          </button>
                          {reply.user === 'Anda' && (
                            <button onClick={() => handleEditReply(comment.id, reply.id, reply.content)}>
                              Edit
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              {(commentData[selectedForumId] || []).length === 0 && <p>Belum ada komentar.</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forum;
