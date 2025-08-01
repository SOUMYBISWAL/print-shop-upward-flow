import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { type UploadedFile } from "@/lib/fileUpload";

const PrintSettings = () => {
  const [location, navigate] = useLocation();
  const [paperType, setPaperType] = useState("standard");
  const [printType, setPrintType] = useState("color");
  const [printingSide, setPrintingSide] = useState("double");
  const [pageRange, setPageRange] = useState("all");
  const [customRange, setCustomRange] = useState("1-2,3-4,5");
  const [copies, setCopies] = useState(1);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [totalPages, setTotalPages] = useState(5);
  const [totalFilesPages, setTotalFilesPages] = useState(5);
  const { toast } = useToast();

  useEffect(() => {
    // Get uploaded files from localStorage
    const filesData = localStorage.getItem('uploadedFiles');
    if (filesData) {
      const files = JSON.parse(filesData) as UploadedFile[];
      setUploadedFiles(files);
      
      // Estimate pages based on file size (rough calculation)
      const estimatedPages = files.reduce((total: number, file: any) => {
        // Rough estimation: 1 page per 100KB for PDF files
        const estimatedFilePages = Math.max(1, Math.ceil(file.size / 100000));
        return total + estimatedFilePages;
      }, 0);
      
      setTotalFilesPages(Math.max(5, estimatedPages)); // Minimum 5 pages as shown in screenshot
      setTotalPages(Math.max(5, estimatedPages));
    } else {
      // Redirect to upload if no files
      navigate('/upload');
    }
  }, [navigate]);

  // Calculate pages based on range selection
  const calculateSelectedPages = () => {
    if (pageRange === "all") {
      return totalFilesPages;
    } else {
      // Parse custom range like "1-2,3-4,5"
      const ranges = customRange.split(',');
      let selectedPages = 0;
      
      ranges.forEach(range => {
        const trimmed = range.trim();
        if (trimmed.includes('-')) {
          const [start, end] = trimmed.split('-').map(n => parseInt(n.trim()));
          if (!isNaN(start) && !isNaN(end)) {
            selectedPages += Math.max(0, end - start + 1);
          }
        } else {
          const pageNum = parseInt(trimmed);
          if (!isNaN(pageNum)) {
            selectedPages += 1;
          }
        }
      });
      
      return Math.min(selectedPages, totalFilesPages);
    }
  };

  useEffect(() => {
    setTotalPages(calculateSelectedPages());
  }, [pageRange, customRange, totalFilesPages]);

  const calculatePrice = () => {
    let basePrice = printType === "bw" ? 1.5 : 4;
    if (printingSide === "double") basePrice += 2.5;
    return basePrice * copies * totalPages;
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Print Settings</h1>
          <p className="text-muted-foreground">Customize your printing preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Print Options */}
          <div>
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-6">Print Options</h2>
              
              <div className="space-y-6">
                {/* Paper Type */}
                <div>
                  <Label className="text-base font-medium">Paper Type</Label>
                  <Select value={paperType} onValueChange={setPaperType}>
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="standard">Standard (70 GSM)</SelectItem>
                      <SelectItem value="premium">Premium (80 GSM)</SelectItem>
                      <SelectItem value="photo">Photo Paper</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Print Type */}
                <div>
                  <Label className="text-base font-medium">Print Type</Label>
                  <RadioGroup value={printType} onValueChange={setPrintType} className="mt-2">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="bw" id="bw" />
                      <Label htmlFor="bw">Black & White (₹1.5 Rs/page)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="color" id="color" />
                      <Label htmlFor="color">Color (₹4 Rs/page)</Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Printing Side */}
                <div>
                  <Label className="text-base font-medium">Printing Side</Label>
                  <RadioGroup value={printingSide} onValueChange={setPrintingSide} className="mt-2">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="single" id="single" />
                      <Label htmlFor="single">Single Sided</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="double" id="double" />
                      <Label htmlFor="double">Double Sided (₹2.5 Rs/page)</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </Card>
          </div>

          {/* Additional Options */}
          <div>
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-6">Additional Options</h2>
              
              <div className="space-y-6">
                {/* Page Range */}
                <div>
                  <Label className="text-base font-medium">Page Range</Label>
                  <RadioGroup value={pageRange} onValueChange={setPageRange} className="mt-2">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="all" id="all" />
                      <Label htmlFor="all">All Pages ({totalFilesPages} pages)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="custom" id="custom" />
                      <Label htmlFor="custom">Custom Range</Label>
                    </div>
                  </RadioGroup>
                  
                  {pageRange === "custom" && (
                    <div className="mt-3 space-y-2">
                      <Input
                        type="text"
                        value={customRange}
                        onChange={(e) => setCustomRange(e.target.value)}
                        placeholder="1-2,3-4,5"
                        className="w-full"
                      />
                      <p className="text-sm text-muted-foreground">
                        Enter page numbers and/or range with hyphens
                      </p>
                      <p className="text-sm font-medium">{totalPages} pages selected</p>
                      <p className="text-sm text-blue-600">
                        {printingSide === "double" ? 
                          `${Math.ceil(totalPages / 2)} physical sheets needed (${totalPages} page ${printingSide === "single" ? "single" : "double"}-sided)` :
                          `${totalPages} physical sheets needed (${totalPages} page single-sided)`
                        }
                      </p>
                    </div>
                  )}
                </div>

                {/* Number of Copies */}
                <div>
                  <Label className="text-base font-medium">Number of Copies</Label>
                  <div className="flex items-center space-x-3 mt-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setCopies(Math.max(1, copies - 1))}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="text-lg font-medium w-8 text-center">{copies}</span>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setCopies(copies + 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Price Summary */}
              <div className="mt-8 p-4 bg-accent/50 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">Estimated Price:</span>
                  <span className="text-2xl font-bold">₹{calculatePrice().toFixed(2)}</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Final price based on {totalPages} pages × {copies} copies
                </p>
              </div>

              <Button 
                className="w-full mt-6"
                onClick={() => {
                  // Store print settings for checkout
                  const printSettings = {
                    paperType,
                    printType,
                    printingSide,
                    pageRange,
                    copies,
                    totalPages,
                    price: calculatePrice(),
                    files: uploadedFiles
                  };
                  localStorage.setItem('printSettings', JSON.stringify(printSettings));
                  navigate('/cart');
                }}
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                Add to Cart
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrintSettings;