import React, { useState, useEffect } from 'react';
import AdminSidebar from './AdminSidebar';
import AddMaterialModal from './AddMaterialModal';
import { v4 as uuidv4 } from 'uuid';
import './admin.css';

const ManageMaterial = () => {
  const [programs, setPrograms] = useState([]);
  const [selectedProgramId, setSelectedProgramId] = useState('');
  const [modules, setModules] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState(null);

  // Fetch programs from backend
  const fetchPrograms = async () => {
    try {
      const res = await fetch('http://localhost/react-backend/programs.php');
      const data = await res.json();
      setPrograms(data);
    } catch (error) {
      console.error('Gagal fetch programs', error);
    }
  };

  useEffect(() => {
    fetchPrograms();
  }, []);

  useEffect(() => {
    if (selectedProgramId) {
      const saved = localStorage.getItem(`modules_program_${selectedProgramId}`);
      setModules(saved ? JSON.parse(saved) : []);
    } else {
      setModules([]);
    }
    setEditData(null);
  }, [selectedProgramId]);

  const handleSaveModule = (moduleData) => {
    if (!selectedProgramId) {
      alert('Pilih program dulu');
      return;
    }
    const key = `modules_program_${selectedProgramId}`;
    const savedModules = localStorage.getItem(key);
    const currentModules = savedModules ? JSON.parse(savedModules) : [];

    if (moduleData.id) {
      const updatedModules = currentModules.map(m => m.id === moduleData.id ? moduleData : m);
      localStorage.setItem(key, JSON.stringify(updatedModules));
      setModules(updatedModules);
    } else {
      const newModule = { ...moduleData, id: uuidv4() };
      const newModules = [...currentModules, newModule];
      localStorage.setItem(key, JSON.stringify(newModules));
      setModules(newModules);
    }
    setShowModal(false);
  };

  const handleEditModule = (mod) => {
    setEditData(mod);
    setShowModal(true);
  };

  const handleDeleteModule = (id) => {
    if (window.confirm('Yakin hapus modul ini?')) {
      const key = `modules_program_${selectedProgramId}`;
      const filtered = modules.filter(m => m.id !== id);
      localStorage.setItem(key, JSON.stringify(filtered));
      setModules(filtered);
    }
  };

  return (
    <div style={{ display: 'flex' }}>
      <AdminSidebar />
      <div className="admin-page scroll-hidden" style={{ flex: 1 }}>
        <h1>Kelola Modul Materi</h1>

        <div className="admin-actions">
          <label style={{ fontWeight: 600, marginRight: '10px', marginTop: '5px', color: '#0d3b66'}}>
            Pilih Program:
          </label>
          <select
            className="admin-select"
            value={selectedProgramId}
            onChange={(e) => setSelectedProgramId(e.target.value)}
          >
            <option value="">-- Pilih Program --</option>
            {programs.map(p => (
              <option key={p.id} value={p.id}>
                {p.title}
              </option>
            ))}
          </select>

          {selectedProgramId && (
            <button className="admin-btn add" style={{ marginLeft: '10px' }} onClick={() => {
              setEditData(null);
              setShowModal(true);
            }}>
              Tambah Modul
            </button>
          )}
        </div>

        {selectedProgramId && (
          <table className="admin-table">
            <thead>
              <tr>
                <th>No. Modul</th>
                <th>Link YouTube</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {modules.length === 0 ? (
                <tr>
                  <td colSpan="3" style={{ textAlign: 'center', color: '#999' }}>
                    Belum ada modul untuk program ini.
                  </td>
                </tr>
              ) : (
                modules
                  .sort((a, b) => Number(a.module_number) - Number(b.module_number))
                  .map(mod => (
                    <tr key={mod.id}>
                      <td>{mod.module_number}</td>
                      <td>
                        <a href={mod.youtube_link} target="_blank" rel="noreferrer">
                          {mod.youtube_link}
                        </a>
                      </td>
                      <td>
                        <button className="admin-btn edit" onClick={() => handleEditModule(mod)}>
                          Update
                        </button>
                        <button className="admin-btn delete" onClick={() => handleDeleteModule(mod.id)}>
                          Hapus
                        </button>
                      </td>
                    </tr>
                  ))
              )}
            </tbody>
          </table>
        )}

        {showModal && (
          <AddMaterialModal
            onClose={() => setShowModal(false)}
            onSave={handleSaveModule}
            defaultData={editData}
            programId={selectedProgramId}
          />
        )}
      </div>
    </div>
  );
};

export default ManageMaterial;
