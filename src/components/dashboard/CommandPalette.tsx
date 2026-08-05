
import React, { useState, useEffect } from "react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@hanzo/ui";
import { 
  Search, 
  Bot, 
  LayoutGrid, 
  ChartBar, 
  Settings, 
  PlusCircle, 
  PlayCircle,
  PauseCircle,
  Database,
  RefreshCw,
  Server
} from "lucide-react";
import { DummyAgentData } from "./data";

const CommandPalette: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  // Toggle the command palette with Cmd+K or Ctrl+K
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(open => !open);
      }
      
      if (e.key === "Escape") {
        setOpen(false);
      }
    };
    
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  // Handle command selection
  const handleSelect = (id: string) => {
    // Close the palette
    setOpen(false);
    
    // Handle the selected command
    switch (id) {
      case "new-agent":
        console.log("Create new agent");
        break;
      case "new-task":
        console.log("Create new task");
        break;
      case "view-board":
        window.location.href = "/dashboard?view=board";
        break;
      case "view-agents":
        window.location.href = "/dashboard?view=agents";
        break;
      case "view-analytics":
        window.location.href = "/dashboard?view=analytics";
        break;
      case "settings":
        console.log("Open settings");
        break;
      default:
        // Check if it's an agent toggle command
        if (id.startsWith("toggle-agent-")) {
          const agentId = id.replace("toggle-agent-", "");
          console.log(`Toggle agent: ${agentId}`);
        }
    }
  };

  if (!open) return null;

  return (
    <div className="hz-fixed hz-inset hz-z-overlay hz-bg-overlay hz-glass hz-row hz-ai-start hz-jc-center hz-pt-overlay">
      <div className="hz-w-full hz-mw-md hz-bg hz-bordered hz-r-lg hz-shadow-lg hz-clip">
        <Command
          className="hz-bg hz-fg hz-border-none"
          filter={(value, search, keywords) => {
            if (value.includes(search.toLowerCase())) return 1;
            if (keywords?.some(keyword => keyword.includes(search.toLowerCase()))) return 1;
            return 0;
          }}
        >
          <div className="hz-border-b hz-p-2 hz-row hz-ai-center">
            <Search className="hz-sq-2 hz-ml-2 hz-fg-muted" />
            <CommandInput 
              value={search}
              onValueChange={setSearch}
              className="hz-w-full hz-bg-none hz-border-none hz-px-2 hz-py-2 hz-fg" 
              placeholder="Search commands..." 
              autoFocus
            />
            <kbd className="hz-mr-2 hz-px-2 hz-py-1 hz-t-xs hz-r-md hz-bg-raised hz-fg-muted">
              Esc
            </kbd>
          </div>
          
          <CommandList className="hz-scroll-y hz-p-2">
            <CommandEmpty className="hz-py-5 hz-align-center hz-fg-muted">
              No results found.
            </CommandEmpty>
            
            <CommandGroup heading="Navigation" className="hz-pb-4">
              <CommandItem 
                id="view-board" 
                onSelect={handleSelect} 
                className="hz-btn hz-btn-ghost hz-inline-2 hz-pointer hz-fg"
                keywords={["kanban", "board", "tasks"]}
              >
                <LayoutGrid className="hz-sq-2 hz-fg-muted" />
                <span>View Kanban Board</span>
              </CommandItem>
              <CommandItem 
                id="view-agents" 
                onSelect={handleSelect} 
                className="hz-btn hz-btn-ghost hz-inline-2 hz-pointer hz-fg"
                keywords={["agents", "ai", "list"]}
              >
                <Bot className="hz-sq-2 hz-fg-muted" />
                <span>View Agents</span>
              </CommandItem>
              <CommandItem 
                id="view-analytics" 
                onSelect={handleSelect} 
                className="hz-btn hz-btn-ghost hz-inline-2 hz-pointer hz-fg"
                keywords={["analytics", "stats", "metrics"]}
              >
                <ChartBar className="hz-sq-2 hz-fg-muted" />
                <span>View Analytics</span>
              </CommandItem>
            </CommandGroup>
            
            <CommandGroup heading="Actions" className="hz-pb-4">
              <CommandItem 
                id="new-agent" 
                onSelect={handleSelect} 
                className="hz-btn hz-btn-ghost hz-inline-2 hz-pointer hz-fg"
                keywords={["create", "agent", "new", "add"]}
              >
                <PlusCircle className="hz-sq-2 hz-fg-muted" />
                <span>Create New Agent</span>
              </CommandItem>
              <CommandItem 
                id="new-task" 
                onSelect={handleSelect} 
                className="hz-btn hz-btn-ghost hz-inline-2 hz-pointer hz-fg"
                keywords={["create", "task", "new", "add"]}
              >
                <PlusCircle className="hz-sq-2 hz-fg-muted" />
                <span>Create New Task</span>
              </CommandItem>
              <CommandItem 
                id="refresh" 
                onSelect={handleSelect} 
                className="hz-btn hz-btn-ghost hz-inline-2 hz-pointer hz-fg"
                keywords={["refresh", "reload", "update"]}
              >
                <RefreshCw className="hz-sq-2 hz-fg-muted" />
                <span>Refresh Dashboard</span>
              </CommandItem>
              <CommandItem 
                id="settings" 
                onSelect={handleSelect} 
                className="hz-btn hz-btn-ghost hz-inline-2 hz-pointer hz-fg"
                keywords={["settings", "preferences", "config"]}
              >
                <Settings className="hz-sq-2 hz-fg-muted" />
                <span>Open Settings</span>
              </CommandItem>
            </CommandGroup>
            
            <CommandGroup heading="Manage Agents" className="hz-pb-4">
              {DummyAgentData.map((agent) => (
                <CommandItem 
                  key={agent.id}
                  id={`toggle-agent-${agent.id}`}
                  onSelect={handleSelect}
                  className="hz-btn hz-btn-ghost hz-jc-between hz-pointer hz-fg"
                  keywords={[agent.name, agent.type, agent.status, "toggle", "agent"]}
                >
                  <div className="hz-row hz-ai-center hz-inline-2">
                    <Bot className="hz-sq-2 hz-fg-muted" />
                    <span>{agent.name}</span>
                    <span className="hz-fg-muted hz-t-xs">{`(${agent.type})`}</span>
                  </div>
                  {agent.status === "running" ? (
                    <PauseCircle className="hz-sq-2 hz-fg-muted" />
                  ) : (
                    <PlayCircle className="hz-sq-2 hz-fg-muted" />
                  )}
                </CommandItem>
              ))}
            </CommandGroup>
            
            <CommandGroup heading="Resources" className="hz-pb-4">
              <CommandItem 
                id="data-sources" 
                onSelect={handleSelect} 
                className="hz-btn hz-btn-ghost hz-inline-2 hz-pointer hz-fg"
                keywords={["data", "sources", "database", "vector", "rag"]}
              >
                <Database className="hz-sq-2 hz-fg-muted" />
                <span>Manage Data Sources</span>
              </CommandItem>
              <CommandItem 
                id="infrastructure" 
                onSelect={handleSelect} 
                className="hz-btn hz-btn-ghost hz-inline-2 hz-pointer hz-fg"
                keywords={["infrastructure", "server", "deploy", "resources"]}
              >
                <Server className="hz-sq-2 hz-fg-muted" />
                <span>View Infrastructure</span>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </div>
    </div>
  );
};

export default CommandPalette;
