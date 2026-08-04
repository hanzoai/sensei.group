
import React from 'react';
import { Download, ArrowLeft, Filter } from 'lucide-react';
import { Button } from "@hanzo/ui";
import { DataTable, type Column } from '@hanzo/ui/product';
import BillingTabsLink from './BillingTabsLink';

interface Invoice {
  id: string;
  date: string;
  amount: string;
  status: string;
  description: string;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Paid':
      return 'bg-green-900/20 text-green-400';
    case 'Pending':
      return 'bg-yellow-900/20 text-yellow-400';
    case 'Failed':
      return 'bg-red-900/20 text-red-400';
    default:
      return 'bg-gray-900/20 text-neutral-400';
  }
};

const columns: Column<Invoice>[] = [
  { key: 'id', header: 'Invoice', mono: true },
  { key: 'date', header: 'Date' },
  { key: 'description', header: 'Description' },
  { key: 'amount', header: 'Amount', align: 'right', mono: true },
  {
    key: 'status',
    header: 'Status',
    render: (i) => (
      <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(i.status)}`}>
        {i.status}
      </span>
    ),
  },
  {
    key: 'actions',
    header: 'Actions',
    align: 'right',
    render: () => (
      <Button variant="ghost" size="sm">
        <Download className="h-4 w-4 mr-2" />
        PDF
      </Button>
    ),
  },
];

const BillingHistory = () => {
  const invoices: Invoice[] = [
    { id: 'INV-001', date: 'Jun 15, 2024', amount: '$49.00', status: 'Paid', description: 'Pro Plan - Monthly' },
    { id: 'INV-002', date: 'May 15, 2024', amount: '$49.00', status: 'Paid', description: 'Pro Plan - Monthly' },
    { id: 'INV-003', date: 'Apr 15, 2024', amount: '$49.00', status: 'Paid', description: 'Pro Plan - Monthly' },
    { id: 'INV-004', date: 'Mar 15, 2024', amount: '$49.00', status: 'Paid', description: 'Pro Plan - Monthly' },
    { id: 'INV-005', date: 'Feb 15, 2024', amount: '$49.00', status: 'Paid', description: 'Pro Plan - Monthly' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <BillingTabsLink tabId="overview" variant="ghost">
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Overview
        </BillingTabsLink>
        <Button variant="outline">
          <Filter className="h-4 w-4 mr-2" />
          Filter
        </Button>
      </div>
      
      <div className="bg-gray-900/30 border border-gray-800 rounded-lg p-6">
        <h3 className="text-xl font-medium mb-6">Invoice History</h3>
        
        <div className="overflow-x-auto">
          <DataTable<Invoice>
            rows={invoices}
            rowKey={(i) => i.id}
            columns={columns}
          />
        </div>
      </div>
    </div>
  );
};

export default BillingHistory;
