import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [tweetUrl, setTweetUrl] = useState('');
  const [analysisResult, setAnalysisResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3001'; // Default to 3001 if not set

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setAnalysisResult(null);
    setError('');

    try {
      const response = await axios.post(`${backendUrl}/analyze`, { url: tweetUrl });
      setAnalysisResult(response.data);
    } catch (err) {
      console.error('Error analyzing tweet:', err);
      setError('Tweet analizi sırasında bir hata oluştu. Lütfen URL\'yi kontrol edin veya daha sonra tekrar deneyin.');
      
      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>AI Tweet Analizi</h1>
      </header>
      <main>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={tweetUrl}
            onChange={(e) => setTweetUrl(e.target.value)}
            placeholder="Tweet URL'sini buraya yapıştırın (örn: https://twitter.com/user/status/123...)"
            required
            disabled={loading}
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Analiz Ediliyor...' : 'Tweet\'i Analiz Et'}
          </button>
        </form>

        {error && <p className="error-message">{error}</p>}

        {analysisResult && (
          <div className="analysis-results">
            <h2>Analiz Sonucu:</h2>
            <p><strong>Kullanıcı Adı:</strong> @{analysisResult.username}</p>
            <p><strong>Tweet İçeriği:</strong> {analysisResult.tweetText}</p>
            <p><strong>Duygu:</strong> <span className={`sentiment-${analysisResult.sentiment.toLowerCase()}`}>{analysisResult.sentiment}</span></p>
            <p><strong>Özet:</strong> {analysisResult.summary}</p>
            <p><strong>Tarih ve Saat:</strong> {new Date(analysisResult.datetime).toLocaleString('tr-TR')}</p>
            <p className="success-message">Analiz sonucu Google Sheets'e kaydedildi!</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;