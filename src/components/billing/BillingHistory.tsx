
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
      return 'hz-bg-surface hz-fg-muted';
    case 'Pending':
      return 'hz-bg-surface hz-fg-muted';
    case 'Failed':
      return 'hz-bg-surface hz-fg-muted';
    default:
      return 'hz-bg-surface hz-fg-muted';
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
      <span className={`hz-px-2 hz-py-1 hz-r-full hz-t-xs ${getStatusColor(i.status)}`}>
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
        <Download className="hz-sq-2 hz-mr-2" />
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
    <div className="hz-stack-6">
      <div className="hz-row hz-ai-center hz-jc-between">
        <BillingTabsLink tabId="overview" variant="ghost">
          <ArrowLeft className="hz-sq-2 hz-mr-2" /> Back to Overview
        </BillingTabsLink>
        <Button variant="outline">
          <Filter className="hz-sq-2 hz-mr-2" />
          Filter
        </Button>
      </div>
      
      <div className="hz-card">
        <h3 className="hz-t-xl hz-w-medium hz-mb-5">Invoice History</h3>
        
        <div className="hz-scroll-x">
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
