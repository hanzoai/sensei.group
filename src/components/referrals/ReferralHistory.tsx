
import React from 'react';
import { DataTable, type Column } from '@hanzo/ui/product';

interface ReferralRecord {
  id: number;
  name: string;
  email: string;
  status: string;
  date: string;
  credits: number;
}

interface ReferralHistoryProps {
  referralHistory: ReferralRecord[];
}

const columns: Column<ReferralRecord>[] = [
  { key: 'name', header: 'Name' },
  { key: 'email', header: 'Email' },
  { key: 'date', header: 'Date' },
  {
    key: 'status',
    header: 'Status',
    render: (r) => (
      <span className={`px-2 py-1 rounded-full text-xs ${
        r.status === 'Completed'
          ? 'bg-green-900/30 text-green-300'
          : 'bg-yellow-900/30 text-yellow-300'
      }`}>
        {r.status}
      </span>
    ),
  },
  {
    key: 'credits',
    header: 'Credits',
    align: 'right',
    mono: true,
    render: (r) => (r.credits > 0 ? `$${r.credits}` : '-'),
  },
];

const ReferralHistory = ({ referralHistory }: ReferralHistoryProps) => {
  return (
    <div className="bg-gray-900/30 border border-gray-800 rounded-lg p-6">
      <h2 className="text-xl font-medium mb-4">Referral History</h2>
      
      <div className="rounded-lg border border-gray-800 overflow-hidden">
        <DataTable<ReferralRecord>
          rows={referralHistory}
          rowKey={(r) => String(r.id)}
          columns={columns}
        />
      </div>
    </div>
  );
};

export default ReferralHistory;
