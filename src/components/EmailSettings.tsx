import React, { useEffect, useState } from 'react';

function EmailSettings() {
  const [recipient, setRecipient] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('/api/email')
      .then(res => res.json())
      .then(data => setRecipient(data.recipient))
      .catch(() => {});
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ recipient })
    });
    if (res.ok) {
      setMessage('Adresse mise à jour');
    } else {
      setMessage("Erreur lors de l'enregistrement");
    }
  };

  return (
    <div className="bg-white shadow rounded p-4 mb-4 animate-fade-in">
      <h2 className="h4 mb-4" style={{ color: '#C81517' }}>Paramètres e-mail</h2>
      <form onSubmit={handleSubmit} className="d-flex gap-3 align-items-end">
        <div className="flex-grow-1">
          <label htmlFor="recipient" className="form-label fw-semibold">Destinataire</label>
          <input
            id="recipient"
            type="email"
            value={recipient}
            onChange={e => setRecipient(e.target.value)}
            className="form-control"
            required
          />
        </div>
        <button type="submit" className="btn text-white" style={{ backgroundColor: '#C81517' }}>
          Enregistrer
        </button>
      </form>
      {message && <p className="mt-3 text-muted">{message}</p>}
    </div>
  );
}

export default EmailSettings;
