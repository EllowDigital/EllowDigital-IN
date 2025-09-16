import { useState, useEffect, useRef } from "react";
import { Search, X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

// Define search results categories and items
const searchData = {
  services: [
    { title: "Web Development", href: "#services" },
    { title: "Mobile Apps", href: "#services" },
    { title: "UI/UX Design", href: "#services" },
    { title: "E-commerce Solutions", href: "#services" },
    { title: "Digital Marketing", href: "#services" },
  ],
  pages: [
    { title: "About Us", href: "#about" },
    { title: "Portfolio", href: "#portfolio" },
    { title: "Contact", href: "#contact" },
    { title: "Team", href: "/team" },
  ],
  offers: [
    { title: "Static Website Package", href: "#offers" },
    { title: "School CS Projects", href: "#offers" },
  ],
};

type SearchResult = {
  title: string;
  href: string;
  category: string;
};

interface SearchModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SearchModal = ({ open, onOpenChange }: SearchModalProps) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // Focus input when modal opens
  useEffect(() => {
    if (open) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    } else {
      setQuery("");
      setResults([]);
      setSelectedIndex(-1);
    }
  }, [open]);

  // Search function
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const allResults: SearchResult[] = [];

    // Search through all categories
    Object.entries(searchData).forEach(([category, items]) => {
      items.forEach((item) => {
        if (item.title.toLowerCase().includes(query.toLowerCase())) {
          allResults.push({
            ...item,
            category,
          });
        }
      });
    });

    setResults(allResults);
    setSelectedIndex(allResults.length > 0 ? 0 : -1);
  }, [query]);

  // Handle navigation
  const handleNavigate = (result: SearchResult) => {
    onOpenChange(false);

    if (result.href.startsWith("#")) {
      setTimeout(() => {
        const element = document.querySelector(result.href);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
          toast.success(`Navigated to ${result.title}`);
        }
      }, 100);
    } else {
      navigate(result.href);
      toast.success(`Navigated to ${result.title}`);
    }
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < results.length - 1 ? prev + 1 : prev
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev));
        break;
      case "Enter":
        if (selectedIndex >= 0 && results[selectedIndex]) {
          handleNavigate(results[selectedIndex]);
        }
        break;
      case "Escape":
        onOpenChange(false);
        break;
      default:
        break;
    }
  };

  // Group results by category
  const groupedResults = results.reduce((acc, result) => {
    if (!acc[result.category]) {
      acc[result.category] = [];
    }
    acc[result.category].push(result);
    return acc;
  }, {} as Record<string, SearchResult[]>);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md md:max-w-lg bg-background/95 backdrop-blur-md border border-orange-500/10">
        <DialogHeader className="border-b pb-4">
          <div className="flex items-center gap-2 text-orange-500">
            <Search className="h-5 w-5" />
            <span className="text-lg font-medium">Search</span>
          </div>
        </DialogHeader>

        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            ref={inputRef}
            placeholder="Search for services, pages, and more..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="pl-10 py-6 text-lg bg-background/50"
          />
          {query && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-3 top-3 h-6 w-6 text-muted-foreground hover:text-foreground"
              onClick={() => setQuery("")}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>

        {query.trim() && results.length === 0 ? (
          <div className="py-6 text-center">
            <p className="text-muted-foreground">No results found</p>
            <p className="text-sm text-muted-foreground mt-1">
              Try searching with different keywords
            </p>
          </div>
        ) : (
          <div className="mt-4 max-h-[300px] overflow-y-auto">
            {Object.entries(groupedResults).map(
              ([category, categoryResults]) => (
                <div key={category} className="mb-4">
                  <h3 className="text-xs uppercase text-muted-foreground mb-2 px-2">
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </h3>
                  <div className="space-y-1">
                    {categoryResults.map((result, index) => {
                      const resultIndex = results.findIndex(
                        (r) =>
                          r.title === result.title &&
                          r.category === result.category
                      );
                      return (
                        <div
                          key={`${result.category}-${index}`}
                          className={`px-2 py-1.5 rounded-md cursor-pointer flex items-center ${
                            resultIndex === selectedIndex
                              ? "bg-orange-500/10 text-orange-500"
                              : "hover:bg-muted"
                          }`}
                          onClick={() => handleNavigate(result)}
                        >
                          <div className="mr-3 p-1.5 rounded-md bg-muted">
                            <Search className="h-3.5 w-3.5 text-muted-foreground" />
                          </div>
                          <span>{result.title}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )
            )}
          </div>
        )}

        <div className="mt-auto pt-4 border-t text-xs text-muted-foreground">
          <div className="flex items-center justify-between">
            <p>Press ↑↓ to navigate</p>
            <p>Press Enter to select</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SearchModal;
