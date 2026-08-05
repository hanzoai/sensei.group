
import React, { useState } from "react";
import { Button } from "@hanzo/ui";
import { Download, Filter, Calendar, FileText } from "lucide-react";
import { motion } from "framer-motion";
import { createAnimationVariant, curves } from "@/components/visual/animation-variants";
import { DataTable, type Column } from "@hanzo/ui/product";

const cardAnimation = createAnimationVariant("fadeInBlur", {
  duration: 0.4,
  curve: curves.snappy,
  distance: 15
});

interface Invoice {
  id: string;
  date: string;
  dueDate: string;
  amount: string;
  status: "Paid" | "Due" | "Overdue" | "Processing";
}

const statusColors = {
  Paid: "hz-bg-surface hz-fg-muted",
  Due: "hz-bg-surface hz-fg-muted",
  Overdue: "hz-bg-surface hz-fg-muted",
  Processing: "hz-bg-surface hz-fg-muted"
};

const columns: Column<Invoice>[] = [
  { key: "id", header: "Invoice", mono: true },
  { key: "date", header: "Date" },
  { key: "dueDate", header: "Due Date" },
  { key: "amount", header: "Amount", align: "right", mono: true },
  {
    key: "status",
    header: "Status",
    render: (i) => (
      <span className={`hz-px-2 hz-py-1 hz-r-full hz-t-xs ${statusColors[i.status]}`}>
        {i.status}
      </span>
    ),
  },
  {
    key: "actions",
    header: "Actions",
    align: "right",
    render: () => (
      <Button
        variant="ghost"
        size="sm"
        className="hz-fg-muted hz-link"
      >
        <Download className="hz-sq-2 hz-mr-2" />
        Download
      </Button>
    ),
  },
];

const InvoicesList = () => {
  const [filter, setFilter] = useState("all");
  
  // Mock data for invoices
  const invoices: Invoice[] = [
    {
      id: "INV-20230301",
      date: "Mar 1, 2023",
      dueDate: "Mar 15, 2023",
      amount: "$20.00",
      status: "Paid"
    },
    {
      id: "INV-20230401",
      date: "Apr 1, 2023",
      dueDate: "Apr 15, 2023",
      amount: "$20.00",
      status: "Paid"
    },
    {
      id: "INV-20230501",
      date: "May 1, 2023",
      dueDate: "May 15, 2023",
      amount: "$25.00",
      status: "Paid"
    }
  ];

  const filteredInvoices = invoices.filter(invoice => {
    if (filter === "all") return true;
    return invoice.status.toLowerCase() === filter;
  });

  return (
    <motion.div 
      variants={cardAnimation}
      className="hz-r-lg hz-bordered hz-bg-overlay hz-clip"
    >
      <div className="hz-col-row hz-p-5 hz-border-b hz-jc-between hz-ai-start hz-gap-4">
        <div className="hz-row hz-ai-center hz-gap-3">
          <Calendar className="hz-sq-3 hz-fg-muted" />
          <div className="hz-stack-1">
            <h3 className="hz-t-xl hz-w-medium">Invoice History</h3>
            <p className="hz-t-sm hz-fg-muted">View and download past invoices</p>
          </div>
        </div>
        
        <div className="hz-row hz-ai-center hz-gap-2">
          <Button variant="outline" size="sm" className="hz-bg hz-hoverable">
            <Filter className="hz-sq-2 hz-mr-2" />
            Filter
          </Button>
          
          <Button className="hz-bg-inverse hz-fg-inverse hz-hoverable">
            <Download className="hz-sq-2 hz-mr-2" />
            Export All
          </Button>
        </div>
      </div>
      
      {filteredInvoices.length > 0 ? (
        <div className="hz-scroll-x">
          <DataTable<Invoice>
            rows={filteredInvoices}
            rowKey={(i) => i.id}
            columns={columns}
          />
        </div>
      ) : (
        <div className="hz-py-7 hz-align-center">
          <FileText className="hz-sq-7 hz-mx-auto hz-mb-4 hz-fg-faint" />
          <h3 className="hz-t-xl hz-w-medium hz-mb-2">No Invoices Found</h3>
          <p className="hz-container-narrow hz-mw-sm hz-fg-muted">
            Once you start using our services, your invoices will appear here.
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default InvoicesList;
