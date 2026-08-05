
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
      <span className={`hz-px-2 hz-py-1 hz-r-full hz-t-xs ${
        r.status === 'Completed'
          ? 'hz-bg-surface hz-fg-soft'
          : 'hz-bg-surface hz-fg-soft'
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
    <div className="hz-card">
      <h2 className="hz-t-xl hz-w-medium hz-mb-4">Referral History</h2>
      
      <div className="hz-r-lg hz-bordered hz-clip">
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
