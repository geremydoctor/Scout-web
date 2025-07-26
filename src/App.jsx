import React, { useState } from 'react';

export default function App() {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      setResult("");
      setLoading(true);

      // Читання в base64 для API
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64 = reader.result.split(',')[1];
        try {
          const res = await fetch("http://localhost:8000/api/analyze", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ imageBase64: base64 })
          });
          const data = await res.json();
          setResult(data);
        } catch (err) {
          setResult("Помилка аналізу зображення");
        }
        setLoading(false);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: 20 }}>
      <h1>🌿 Scout Web – Діагностика канабісу</h1>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      {image && <img src={image} alt="Uploaded" style={{ width: "100%", borderRadius: 10, marginTop: 12 }} />}
      {loading ? <p>Обробка зображення AI...</p> : (result && <p>{result}</p>)}
    </div>
  );
}
