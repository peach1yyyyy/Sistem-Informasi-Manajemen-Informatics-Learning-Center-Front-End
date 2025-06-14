import React, { useEffect, useState } from 'react';
import './materipage.css';
import Sidebar from '../sidebar/Sidebar';
import ProfileBar from '../profilebar/ProfileBar';
import { useNavigate } from 'react-router-dom';

// Mapping gambar berdasarkan tipe
const typeImageMap = {
  Course: "/images/course.png",
  Workshop: "/images/workshop.png",
  Seminar: "/images/seminar.png",
  Competition: "/images/competition.png"
};

const MateriPage = () => {
  const navigate = useNavigate();
  const [materiList, setMateriList] = useState([]);

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const res = await fetch('http://localhost/react-backend/programs.php');
        const allPrograms = await res.json();

        const myLearnings = JSON.parse(localStorage.getItem('myLearnings')) || [];

        // Filter program yang sudah dibeli (id ada di myLearnings)
        const ownedPrograms = allPrograms
          .filter(p => myLearnings.includes(p.id))
          .map(p => ({
            id: p.id,
            title: p.title,
            type: p.type,
            progress: `${Math.floor(Math.random() * 50 + 50)}%`, // Simulasi progress random
          }));

        setMateriList(ownedPrograms);
      } catch (err) {
        console.error('Error fetching programs:', err);
      }
    };

    fetchPrograms();
  }, []);

  const handleLanjutkan = (id) => {
    navigate(`/materi/detail/${id}`);
  };

  return (
    <div className="materi-layout">
      <Sidebar />
      <div className="materi-main">
        <div className="materi-container">
          <h2 className="materi-title">Materi Saya</h2>
          <div className="materi-grid">
            {materiList.length > 0 ? (
              materiList.map(materi => (
                <div className="materi-card" key={materi.id}>
                  <img
                    src={typeImageMap[materi.type] || "/images/default.png"}
                    alt={materi.title}
                    className="materi-image"
                  />
                  <div className="materi-content">
                    <h3>{materi.title}</h3>
                    <p>Jenis: {materi.type}</p>
                    <p>Progress: {materi.progress}</p>
                    <button className="open-button" onClick={() => handleLanjutkan(materi.id)}>
                      Continue
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p style={{ color: 'white' }}>Belum ada materi yang kamu miliki.</p>
            )}
          </div>
        </div>
      </div>
      <ProfileBar />
    </div>
  );
};

export default MateriPage;


// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Sidebar from '../sidebar/Sidebar';
// import ProfileBar from '../profilebar/ProfileBar';
// import CourseCard from '../dashboard/components/CourseCards'; // import CourseCard
// import './materipage.css';

// const formatDate = (dateStr) => {
//   const date = new Date(dateStr);
//   return date.toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' });
// };

// const MateriPage = () => {
//   const navigate = useNavigate();
//   const [myPrograms, setMyPrograms] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchPrograms = async () => {
//       try {
//         const res = await fetch('http://localhost/react-backend/programs.php');
//         const allPrograms = await res.json();

//         // Ambil id program dari localStorage myLearnings (array id)
//         const storedMyLearnings = localStorage.getItem('myLearnings');
//         const myLearningsIds = storedMyLearnings ? JSON.parse(storedMyLearnings) : [];

//         // Filter program yang ada di myLearnings id
//         const ownedPrograms = allPrograms
//           .filter(p => myLearningsIds.includes(p.id))
//           .map(p => ({
//             ...p,
//             date: formatDate(p.date),
//           }));

//         setMyPrograms(ownedPrograms);
//       } catch (error) {
//         console.error('Gagal fetch programs:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPrograms();
//   }, []);

//   const handleLanjutkan = (id) => {
//     navigate(`/materi/detail/${id}`);
//   };

//   if (loading) return <p style={{ color: 'white' }}>Loading materi...</p>;

//   return (
//     <div className="materi-layout">
//       <Sidebar />
//       <div className="materi-main">
//         <div className="materi-container">
//           <h2 className="materi-title">Materi Saya</h2>
//           <div className="materi-grid">
//             {myPrograms.length > 0 ? (
//               myPrograms.map(prog => (
//                 <div key={prog.id} onClick={() => handleLanjutkan(prog.id)}>
//                   <CourseCard {...prog} />
//                 </div>
//               ))
//             ) : (
//               <p style={{ color: 'white' }}>Belum ada materi yang kamu miliki.</p>
//             )}
//           </div>
//         </div>
//       </div>
//       <ProfileBar />
//     </div>
//   );
// };

// export default MateriPage;

