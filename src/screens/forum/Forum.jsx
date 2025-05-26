import React, { useState, useEffect } from 'react';
import Sidebar from '../sidebar/Sidebar';
import './forum.css';

const forumList = [
  {
    course: 'IF012 Pemrograman Berorientasi Objek',
    forums: [
      { id: 1, title: 'Forum 1', date: '12 Sep 2023', unread: 0 },
      { id: 2, title: 'Forum 2', date: '13 Sep 2023', unread: 0 },
      { id: 3, title: 'Forum 3', date: '14 Sep 2023', unread: 0 }
    ]
  }
];

const initialCommentData = {
  1: [
    {
      id: 1,
      user: 'Rini Nirmala, M.Klin',
      content: 'Ini kok gini gimana ???\nhayo dibenerin dulu. jangan buru² dikumpulkan 😋',
      replies: [
        { id: 2, user: 'Jovanca Aduhai', content: 'Baik bu sya kerjakan nanti malam jam 12 bu.' },
        { id: 3, user: 'Rini Nirmala, M.Klin', content: 'okee' }
      ]
    }
  ],
  2: [
    {
      id: 4,
      user: 'Rakabuming Suhu',
      content: 'Bu mau tanya, apa itu SIGIE?',
      replies: [
        { id: 5, user: 'Jonathan Duel', content: 'Bu besok materinya apa?' }
      ]
    }
  ],
  3: [
    {
      id: 6,
      user: 'Ilham Arief',
      content: 'Kapan kumpul tugasnya? saya masih nyetrika data',
      replies: []
    }
  ]
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
              reply.id === editReply.replyId
                ? { ...reply, content: inputText }
                : reply
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
            replies: [
              ...comment.replies,
              { id: Date.now(), user: 'Anda', content: inputText }
            ]
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
        replies: []
      });
    }

    setCommentData(updated);
    setInputText('');
    setReplyTo(null);
    setEditReply({ commentId: null, replyId: null });
  };

  const handleEditReply = (commentId, replyId, content) => {
    setEditReply({ commentId, replyId });
    setInputText(content);
    setReplyTo(null);
  };

  const handleCancel = () => {
    setReplyTo(null);
    setEditReply({ commentId: null, replyId: null });
    setInputText('');
  };

  return (
    <div className="forum-container">
      <Sidebar />
      <div className="forum-main">
        <div className="forum-left">
          <h2>Forum</h2>
          <select className="period-select">
            <option>2022/2023 Genap</option>
            <option>2022/2023 Ganjil</option>
          </select>
          <input type="text" placeholder="Cari judul forum" className="forum-search" />
          {forumList.map((group, i) => (
            <div className="forum-class-group" key={i}>
              <h4>{group.course}</h4>
              <div className="forum-list">
                {group.forums.map((forum) => (
                  <div
                    key={forum.id}
                    className={`forum-item ${selectedForumId === forum.id ? 'active' : ''}`}
                    onClick={() => handleForumClick(forum.id)}
                  >
                    <div>
                      <p>{forum.title}</p>
                      <span>{forum.date}</span>
                    </div>
                    {forum.unread > 0 && <div className="forum-badge">{forum.unread}</div>}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="forum-right fade-in">
          <div className="forum-detail">
            <h3>Forum {selectedForumId}</h3>
            <p className="forum-date">18 Des 2023 - 20 Des 2023 | 09:00 WIB</p>
            <div className="forum-warning">
              Sebagai syarat kehadiran, Anda diwajibkan menuliskan komentar sebanyak 3 kali sebelum forum berakhir
            </div>
            <div className="forum-thread">
              {(commentData[selectedForumId] || []).map((comment) => (
                <div key={comment.id} className="forum-comment">
                  <strong>{comment.user}</strong>
                  {comment.content.split('\n').map((line, index) => (
                    <p key={index}>{line}</p>
                  ))}
                  <button className="reply-btn" onClick={() => setReplyTo(comment.id)}>Reply</button>
                  {comment.replies.map((reply) => (
                    <div key={reply.id} className="forum-reply">
                      <strong>{reply.user}</strong>
                      <p>{reply.content}</p>
                      <button
                        className="edit-btn"
                        onClick={() => handleEditReply(comment.id, reply.id, reply.content)}
                      >
                        Edit
                      </button>
                    </div>
                  ))}
                </div>
              ))}
            </div>

            <div className="forum-input">
              {(replyTo || editReply.replyId) && (
                <div className="replying-info">
                  {editReply.replyId ? 'Mengedit balasan' : 'Membalas komentar'}
                  <button onClick={handleCancel} className="cancel-btn">Batal</button>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forum;
