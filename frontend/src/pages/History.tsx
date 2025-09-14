import React, { useEffect, useState } from 'react';
import { diagnosisService, DiagnosisResponse } from '../services/diagnosisService';

const History: React.FC = () => {
  const [history, setHistory] = useState<DiagnosisResponse[]>([]);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchHistory = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await diagnosisService.getHistory();
        setHistory(data);
      } catch (e: any) {
        setError(e.response?.data || 'Không thể tải lịch sử');
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  return (
    <div className="card">
      <h2 className="text-xl font-semibold mb-4">Lịch sử chẩn đoán</h2>
      {loading && <p>Đang tải...</p>}
      {error && <div className="mb-4 p-3 bg-danger-50 border border-danger-200 rounded text-danger-700">{error}</div>}
      {!loading && history.length === 0 && <p className="text-gray-500">Chưa có lịch sử.</p>}
      <div className="space-y-3">
        {history.map(item => (
          <div key={item.id} className="border rounded p-3">
            <div className="flex justify-between">
              <div>
                <p className="font-medium">{item.diagnosisDisplayName}</p>
                <p className="text-sm text-gray-600">Điểm nguy cơ: {item.riskScore}</p>
              </div>
              <div className="text-sm text-gray-500">{new Date(item.createdAt).toLocaleString()}</div>
            </div>
            <p className="whitespace-pre-line mt-2 text-gray-700">{item.recommendations}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default History;
