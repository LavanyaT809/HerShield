import React from 'react';
import './Contacts.css';

const contacts = [
  {
    name: 'Lavanya Tuptewar',
    phone: '8830948124',
    email: 'lavanya.tuptewar23@vit.edu',
  },
  {
    name: 'Isha Thakur',
    phone: '9960568571',
    email: 'isha.thakur23@vit.edu',
  },
  {
    name: 'Rudrani Sarangdhar',
    phone: '7350333678',
    email: 'rudrani.sarangdhar23@vit.edu',
  },
];

const Contacts = () => {
  return (
    <div className="contacts-container">
      <div className="glass-container">
        <div className="contacts-header">
          <h1>Emergency Contacts</h1>
        </div>
        <div className="contacts-list">
          <h2>My Contacts</h2>
          {contacts.map((contact, index) => (
            <div className="contact-item" key={index}>
              <div className="contact-info">
                <p className="contact-name">{contact.name}</p>
                <p className="contact-email">{contact.email}</p>
              </div>
              <p className="contact-phone">{contact.phone}</p>
            </div>
          ))}
        </div>
        <div className="contact-actions">
          <button className="edit-contacts-button">Edit Contacts</button>
          <button className="add-contact-button">Add Contact</button>
        </div>
      </div>
    </div>
  );
};

export default Contacts;
