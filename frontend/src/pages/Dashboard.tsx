import React from 'react';

const Dashboard: React.FC = () => {
  return (
    <div className="card">
      <h1 className="text-2xl font-semibold mb-4">Dashboard</h1>
      <p>Chào mừng bạn đến ứng dụng chẩn đoán tiểu đường.</p>
      <ul className="list-disc ml-6 mt-3 text-gray-700">
        <li>Đi tới mục Chẩn đoán để nhập chỉ số sinh học.</li>
        <li>Xem lịch sử các lần chẩn đoán ở mục Lịch sử.</li>
      </ul>
    </div>
  );
};

export default Dashboard;
