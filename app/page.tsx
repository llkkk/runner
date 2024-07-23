'use client';

import { useState } from 'react';

const convertToHoursMins = (time: number) => {
  if (time < 1) return '00:00:00';
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = Math.floor(time % 60);
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

const PaceToSpeedConverter = () => {
  const [pace, setPace] = useState('');
  const [kmh, setKmh] = useState('');
  const [result, setResult] = useState<JSX.Element | null>(null);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (kmh) {
      calculateTimesAndDistances(kmh);
    } else if (pace) {
      calculateSpeedAndDistances(pace);
    }
  };

  const calculateSpeedAndDistances = (pace: string) => {
    const min = parseInt(pace.slice(0, -2), 10);
    const sec = parseInt(pace.slice(-2), 10);
    const totalSeconds = min * 60 + sec;
    const speed = (3600 / totalSeconds).toFixed(1);
    setKmh(speed);
    calculateTimesAndDistances(speed);
  };

  const calculateTimesAndDistances = (kmh: string) => {
    const speed = parseFloat(kmh);
    const distances = {
      '100m': 0.1,
      '200m': 0.2,
      '400m': 0.4,
      '800m': 0.8,
      '1KM': 1,
      '5KM': 5,
      '10KM': 10,
      '半马': 21.0975,
      '全马': 42.195,
    };
    const times = [1, 2, 5, 10, 15, 20, 30, 60, 120];

    const distanceRows = Object.entries(distances).map(([label, km], index) => (
      <tr key={label} className={index % 2 ? 'bg-gray-100' : ''}>
        <td className="py-2 px-4">{label}</td>
        <td className="py-2 px-4">{convertToHoursMins((km / speed) * 3600)}</td>
      </tr>
    ));

    const timeRows = times.map((min, index) => (
      <tr key={min} className={index % 2 ? 'bg-gray-100' : ''}>
        <td className="py-2 px-4">{min} 分</td>
        <td className="py-2 px-4">{(min / 60 * speed * 1000).toFixed(0)} 米</td>
      </tr>
    ));

    setResult(
      <div className="mt-6">
        <h2 className="text-lg font-bold mb-4">在此速度下</h2>
        <div className="flex justify-center space-x-8">
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
              <thead className="bg-gray-200">
                <tr>
                  <th className="py-2 px-4">距离</th>
                  <th className="py-2 px-4">时:分:秒</th>
                </tr>
              </thead>
              <tbody>{distanceRows}</tbody>
            </table>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
              <thead className="bg-gray-200">
                <tr>
                  <th className="py-2 px-4">时间</th>
                  <th className="py-2 px-4">距离</th>
                </tr>
              </thead>
              <tbody>{timeRows}</tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-6">时速 - 配速 换算计算器</h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700">配速 (格式: 630, 500 ...)</label>
            <input
              type="text"
              value={pace}
              onChange={(e) => setPace(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Pace"
            />
          </div>
          <div>
            <label className="block text-gray-700">km/h (格式: 12.3, 13 ...)</label>
            <input
              type="text"
              value={kmh}
              onChange={(e) => setKmh(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="km/h"
            />
          </div>
          <div>
            <button type="submit" className="w-full py-2 px-4 bg-blue-500 text-white rounded-md">
              计算
            </button>
          </div>
          <div>
            <button
              type="button"
              onClick={() => {
                setPace('');
                setKmh('');
                setResult(null);
              }}
              className="w-full py-2 px-4 bg-gray-500 text-white rounded-md"
            >
              重置
            </button>
          </div>
        </form>
        {result}
      </div>
    </div>
  );
};

export default PaceToSpeedConverter;
