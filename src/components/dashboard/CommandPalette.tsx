
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
    <div className="fixed inset-0 z-50 bg-[var(--black)]/60 backdrop-blur-sm flex items-start justify-center pt-[20vh]">
      <div className="w-full max-w-2xl bg-[var(--black)] border border-gray-800 rounded-lg shadow-xl overflow-hidden">
        <Command
          className="bg-[var(--black)] text-[var(--white)] border-none"
          filter={(value, search, keywords) => {
            if (value.includes(search.toLowerCase())) return 1;
            if (keywords?.some(keyword => keyword.includes(search.toLowerCase()))) return 1;
            return 0;
          }}
        >
          <div className="border-b border-gray-800 p-2 flex items-center">
            <Search className="ml-2 h-4 w-4 text-neutral-500" />
            <CommandInput 
              value={search}
              onValueChange={setSearch}
              className="w-full bg-transparent border-none focus:outline-none px-2 py-1.5 text-neutral-200 placeholder-gray-500" 
              placeholder="Search commands..." 
              autoFocus
            />
            <kbd className="mr-2 px-1.5 py-0.5 text-xs rounded bg-gray-800 text-neutral-400">
              Esc
            </kbd>
          </div>
          
          <CommandList className="max-h-80 overflow-auto p-2">
            <CommandEmpty className="py-6 text-center text-neutral-500">
              No results found.
            </CommandEmpty>
            
            <CommandGroup heading="Navigation" className="pb-2">
              <CommandItem 
                id="view-board" 
                onSelect={handleSelect} 
                className="flex items-center space-x-2 px-2 py-1.5 rounded cursor-pointer hover:bg-gray-800 text-neutral-200"
                keywords={["kanban", "board", "tasks"]}
              >
                <LayoutGrid className="h-4 w-4 text-neutral-400" />
                <span>View Kanban Board</span>
              </CommandItem>
              <CommandItem 
                id="view-agents" 
                onSelect={handleSelect} 
                className="flex items-center space-x-2 px-2 py-1.5 rounded cursor-pointer hover:bg-gray-800 text-neutral-200"
                keywords={["agents", "ai", "list"]}
              >
                <Bot className="h-4 w-4 text-neutral-400" />
                <span>View Agents</span>
              </CommandItem>
              <CommandItem 
                id="view-analytics" 
                onSelect={handleSelect} 
                className="flex items-center space-x-2 px-2 py-1.5 rounded cursor-pointer hover:bg-gray-800 text-neutral-200"
                keywords={["analytics", "stats", "metrics"]}
              >
                <ChartBar className="h-4 w-4 text-neutral-400" />
                <span>View Analytics</span>
              </CommandItem>
            </CommandGroup>
            
            <CommandGroup heading="Actions" className="pb-2">
              <CommandItem 
                id="new-agent" 
                onSelect={handleSelect} 
                className="flex items-center space-x-2 px-2 py-1.5 rounded cursor-pointer hover:bg-gray-800 text-neutral-200"
                keywords={["create", "agent", "new", "add"]}
              >
                <PlusCircle className="h-4 w-4 text-neutral-400" />
                <span>Create New Agent</span>
              </CommandItem>
              <CommandItem 
                id="new-task" 
                onSelect={handleSelect} 
                className="flex items-center space-x-2 px-2 py-1.5 rounded cursor-pointer hover:bg-gray-800 text-neutral-200"
                keywords={["create", "task", "new", "add"]}
              >
                <PlusCircle className="h-4 w-4 text-neutral-400" />
                <span>Create New Task</span>
              </CommandItem>
              <CommandItem 
                id="refresh" 
                onSelect={handleSelect} 
                className="flex items-center space-x-2 px-2 py-1.5 rounded cursor-pointer hover:bg-gray-800 text-neutral-200"
                keywords={["refresh", "reload", "update"]}
              >
                <RefreshCw className="h-4 w-4 text-neutral-400" />
                <span>Refresh Dashboard</span>
              </CommandItem>
              <CommandItem 
                id="settings" 
                onSelect={handleSelect} 
                className="flex items-center space-x-2 px-2 py-1.5 rounded cursor-pointer hover:bg-gray-800 text-neutral-200"
                keywords={["settings", "preferences", "config"]}
              >
                <Settings className="h-4 w-4 text-neutral-400" />
                <span>Open Settings</span>
              </CommandItem>
            </CommandGroup>
            
            <CommandGroup heading="Manage Agents" className="pb-2">
              {DummyAgentData.map((agent) => (
                <CommandItem 
                  key={agent.id}
                  id={`toggle-agent-${agent.id}`}
                  onSelect={handleSelect}
                  className="flex items-center justify-between px-2 py-1.5 rounded cursor-pointer hover:bg-gray-800 text-neutral-200"
                  keywords={[agent.name, agent.type, agent.status, "toggle", "agent"]}
                >
                  <div className="flex items-center space-x-2">
                    <Bot className="h-4 w-4 text-neutral-400" />
                    <span>{agent.name}</span>
                    <span className="text-neutral-500 text-xs">{`(${agent.type})`}</span>
                  </div>
                  {agent.status === "running" ? (
                    <PauseCircle className="h-4 w-4 text-green-500" />
                  ) : (
                    <PlayCircle className="h-4 w-4 text-neutral-400" />
                  )}
                </CommandItem>
              ))}
            </CommandGroup>
            
            <CommandGroup heading="Resources" className="pb-2">
              <CommandItem 
                id="data-sources" 
                onSelect={handleSelect} 
                className="flex items-center space-x-2 px-2 py-1.5 rounded cursor-pointer hover:bg-gray-800 text-neutral-200"
                keywords={["data", "sources", "database", "vector", "rag"]}
              >
                <Database className="h-4 w-4 text-neutral-400" />
                <span>Manage Data Sources</span>
              </CommandItem>
              <CommandItem 
                id="infrastructure" 
                onSelect={handleSelect} 
                className="flex items-center space-x-2 px-2 py-1.5 rounded cursor-pointer hover:bg-gray-800 text-neutral-200"
                keywords={["infrastructure", "server", "deploy", "resources"]}
              >
                <Server className="h-4 w-4 text-neutral-400" />
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
