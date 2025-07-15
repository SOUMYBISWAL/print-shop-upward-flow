import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PrintSettings = () => {
  const navigate = useNavigate();
  const [paperType, setPaperType] = useState("standard");
  const [printType, setPrintType] = useState("bw");
  const [printingSide, setPrintingSide] = useState("single");
  const [pageRange, setPageRange] = useState("all");
  const [copies, setCopies] = useState(1);

  const calculatePrice = () => {
    let basePrice = printType === "bw" ? 1.5 : 4;
    if (printingSide === "double") basePrice += 2.5;
    return basePrice * copies;
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Print Settings</h1>
          <p className="text-muted-foreground">Customize your printing preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Print Options */}
          <div className="lg:col-span-2">
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
                      <Label htmlFor="all">All Pages (1 pages)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="custom" id="custom" />
                      <Label htmlFor="custom">Custom Range</Label>
                    </div>
                  </RadioGroup>
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
                  <span className="text-2xl font-bold">₹{calculatePrice().toFixed(2)} Rs</span>
                </div>
                <p className="text-sm text-muted-foreground">Final price based on 1 page</p>
              </div>

              <Button 
                className="w-full mt-6"
                onClick={() => navigate('/cart')}
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