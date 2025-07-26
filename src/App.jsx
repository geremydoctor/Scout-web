import { useState } from 'react';

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
      setTimeout(() => {
        setResult("🔎 Ймовірно: борошниста роса або дефіцит магнію.");
        setLoading(false);
      }, 2000);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: 20 }}>
      <h1>🌿 Scout Web – Діагностика канабісу</h1>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      {image && <img src={image} alt="Uploaded" style={{ width: "100%", borderRadius: 10 }} />}
      {loading ? <p>Обробка зображення...</p> : <p>{result}</p>}
    </div>
  );
}
