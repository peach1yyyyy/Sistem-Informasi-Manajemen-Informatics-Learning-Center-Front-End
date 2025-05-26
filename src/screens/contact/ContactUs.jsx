import React from 'react';
import Sidebar from '../sidebar/Sidebar';
import './contactus.css';

const ContactUs = () => {
  return (
    <div className="contact-container">
      <Sidebar />
      <div className="contact-content">
        <h2>Hubungi Kami</h2>
        <p>Jika Anda memiliki pertanyaan, masukan, atau butuh bantuan, silakan isi formulir berikut atau hubungi kami melalui informasi kontak di bawah ini.</p>

        <form className="contact-form">
          <label>Nama</label>
          <input type="text" placeholder="Nama Anda" />

          <label>Email</label>
          <input type="email" placeholder="Email Anda" />

          <label>Pesan</label>
          <textarea rows="5" placeholder="Tulis pesan Anda di sini..."></textarea>

          <button type="submit">Send Message</button>
        </form>

        <div className="contact-info">
          <h3>Informasi Kontak</h3>
          <p><strong>Email:</strong> info@informatika.untan.ac.id</p>
          <p><strong>Telepon:</strong> (0561) 740185</p>
          <p><strong>Alamat:</strong> Jl. Prof. Dr. H. Hadari Nawari Pontianak 78124</p>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
