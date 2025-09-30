'use client';

import { useState } from 'react';

export default function CalculatorPage() {
    const [inputNumber, setInputNumber] = useState<string>('');
    const [multiplicationTable, setMultiplicationTable] = useState<number[]>([]);
    const [baseNumber, setBaseNumber] = useState<number | null>(null);

    const generateTable = () => {
        const num = parseInt(inputNumber);
        if (isNaN(num)) {
            setMultiplicationTable([]);
            setBaseNumber(null);
            return;
        }
        const table: number[] = [];
        for (let i = 1; i <= 12; i++) {
            table.push(num * i);
        }
        setMultiplicationTable(table);
        setBaseNumber(num);
    };

    const clearTable = () => {
        setInputNumber('');
        setMultiplicationTable([]);
        setBaseNumber(null);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-800 mb-2">
                        ตารางสูตรคูณ
                    </h1>
                    <p className="text-gray-600 text-lg">
                        สร้างตารางสูตรคูณด้วยตัวเลขที่คุณต้องการ
                    </p>
                </div>

                {/* Input Section */}
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
                    <div className="flex flex-col md:flex-row gap-4 items-end">
                        <div className="flex-1">
                            <label htmlFor="numberInput" className="block text-sm font-medium text-gray-700 mb-2">
                                ใส่ตัวเลขแม่สูตรคูณ
                            </label>
                            <input
                                id="numberInput"
                                type="number"
                                value={inputNumber}
                                onChange={(e) => setInputNumber(e.target.value)}
                                placeholder="เช่น 2, 3, 5, 9..."
                                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none transition-colors text-lg text-black"
                            />
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={generateTable}
                                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg flex items-center gap-2"
                            >
                                สร้างตาราง
                            </button>
                            <button
                                onClick={clearTable}
                                className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
                            >
                                ลบ
                            </button>
                        </div>
                    </div>
                </div>
                {multiplicationTable.length > 0 && baseNumber !== null && (
                    <div className="bg-white rounded-2xl shadow-lg p-6">
                        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                            ตารางสูตรคูณ {baseNumber}
                        </h2>
                        
                        <div className="grid grid-cols-1 gap-4">
                            {multiplicationTable.map((result, index) => (
                                <div
                                    key={index}
                                    className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg duration-200"
                                >
                                    <div className="text-lg font-semibold text-gray-800">
                                        {baseNumber} × {index + 1} = 
                                        <span className="text-blue-600 ml-2 text-xl">
                                            {result}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}