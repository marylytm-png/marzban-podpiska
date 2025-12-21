import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useToast } from "@/hooks/use-toast";
import { Copy, CheckCircle2, ChevronDown } from "lucide-react";

export default function HomePage() {
  const [copiedTemplate, setCopiedTemplate] = useState(false);
  const [marzbanInstructionsOpen, setMarzbanInstructionsOpen] = useState(true);
  const { toast } = useToast();

  const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
  const marzbanDomain = "mary.marylytm.uk";
  
  // Google Script style template URL
  const templateUrl = `${baseUrl}/api/exec?url=https://${marzbanDomain}/sub/{USER_TOKEN}?format={FORMAT}`;

  const handleCopyTemplate = async () => {
    try {
      await navigator.clipboard.writeText(templateUrl);
      setCopiedTemplate(true);
      toast({
        title: "Kopyalandı!",
        description: "Template URL panoya kopyalandı.",
      });
      setTimeout(() => setCopiedTemplate(false), 2000);
    } catch (err) {
      toast({
        title: "Hata",
        description: "Link kopyalanamadı. Lütfen manuel olarak kopyalayın.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-2xl mx-auto px-4 sm:px-6 py-12">
        <div className="space-y-8">
          {/* Header Section */}
          <div className="space-y-4">
            <h1 className="text-2xl font-semibold text-foreground">
              Marzban Subscription Proxy
            </h1>
            <p className="text-base text-muted-foreground">
              Google Script gibi çalışan proxy sistemi. Bu linki Marzban panel'ine ekleyip, otomatik olarak tüm kullanıcılarınız için subscription sağlayın.
            </p>
          </div>

          {/* Marzban Integration Instructions */}
          <Card data-testid="card-marzban-integration">
            <Collapsible open={marzbanInstructionsOpen} onOpenChange={setMarzbanInstructionsOpen}>
              <CardHeader className="pb-3">
                <CollapsibleTrigger className="flex items-center justify-between w-full group" data-testid="button-toggle-marzban">
                  <div className="space-y-1 text-left">
                    <CardTitle className="text-lg font-medium">Marzban Paneline Entegrasyon</CardTitle>
                    <CardDescription className="text-sm text-muted-foreground">
                      Google Script tarzı URL - tüm kullanıcılar için
                    </CardDescription>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform flex-shrink-0 ${marzbanInstructionsOpen ? 'rotate-180' : ''}`} />
                </CollapsibleTrigger>
              </CardHeader>
              <CollapsibleContent>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <Label className="text-sm font-medium text-foreground">Marzban Panel'ine Eklenecek URL</Label>
                    <p className="text-sm text-muted-foreground">
                      Bu URL'yi Marzban panel'inin Settings bölümüne yapıştırın. Marzban otomatik olarak {`{USER_TOKEN}`} yerine her kullanıcının token'ını ve {`{FORMAT}`} yerine format'ı koyacaktır.
                    </p>
                    
                    <div className="p-4 bg-muted/50 rounded-md border border-border mt-4">
                      <p 
                        className="text-sm font-mono break-all text-foreground"
                        data-testid="text-template-url"
                      >
                        {templateUrl}
                      </p>
                    </div>
                    <Button 
                      onClick={handleCopyTemplate} 
                      variant="secondary"
                      className="w-full sm:w-auto"
                      data-testid="button-copy-template"
                    >
                      {copiedTemplate ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 mr-2" />
                          Kopyalandı!
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4 mr-2" />
                          Template'i Kopyala
                        </>
                      )}
                    </Button>
                  </div>

                  <Separator />

                  <div className="space-y-3">
                    <p className="text-sm font-medium text-foreground">Kullanım Adımları:</p>
                    
                    <div className="space-y-3">
                      <div className="flex gap-3">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-sm font-semibold text-primary">1</span>
                        </div>
                        <div className="flex-1 space-y-1">
                          <p className="text-sm text-foreground">
                            Marzban paneline giriş yapın
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-sm font-semibold text-primary">2</span>
                        </div>
                        <div className="flex-1 space-y-1">
                          <p className="text-sm text-foreground">
                            Settings → Subscription bölümüne gidin
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-sm font-semibold text-primary">3</span>
                        </div>
                        <div className="flex-1 space-y-1">
                          <p className="text-sm text-foreground">
                            Yukarıdaki URL'yi "Subscription URL Template" alanına yapıştırın
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-sm font-semibold text-primary">4</span>
                        </div>
                        <div className="flex-1 space-y-1">
                          <p className="text-sm text-foreground">
                            Kaydedin!
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="p-3 bg-accent/50 rounded-md mt-4 space-y-2">
                      <p className="text-sm font-medium text-foreground">Ne olur?</p>
                      <p className="text-sm text-muted-foreground">
                        Artık her kullanıcıya verdiğiniz subscription linkinde bu proxy otomatik olarak çalışacaktır. Google Script'teyken yaptığınız gibi, {`{USER_TOKEN}`} ve {`{FORMAT}`} otomatik olarak değiştirilecektir.
                      </p>
                      <p className="text-sm text-muted-foreground mt-2">
                        <strong>Örnek link:</strong> {baseUrl}/api/exec?url=https://mary.marylytm.uk/sub/USER_TOKEN?format=base64
                      </p>
                    </div>
                  </div>
                </CardContent>
              </CollapsibleContent>
            </Collapsible>
          </Card>

          {/* Info Section */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Endpoints Hakkında</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm font-medium text-foreground mb-1">1. Google Script Tarzı (Önerilen):</p>
                <p className="text-xs font-mono text-muted-foreground bg-muted/30 p-2 rounded break-all">
                  /api/exec?url=https://mary.marylytm.uk/sub/{`{USER_TOKEN}`}?format={`{FORMAT}`}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-foreground mb-1">2. Doğrudan Replit Proxy:</p>
                <p className="text-xs font-mono text-muted-foreground bg-muted/30 p-2 rounded break-all">
                  /api/sub/{`{USER_TOKEN}`}?format={`{FORMAT}`}
                </p>
              </div>
              <div className="pt-2 border-t">
                <p className="text-sm text-muted-foreground">
                  İlki (Google Script tarzı) Marzban'da kullanılmak için daha uygun. Mary.marylytm.uk domain'ini kendi proxy sunucunuz gibi kullanabilirsiniz.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
