import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { HelpCircle, Book, MessageCircle, Mail, ExternalLink } from "lucide-react";

const Help = () => {
  const faqs = [
    {
      question: "How do I create effective job search prompts?",
      answer: "Start with a detailed job description including required skills, experience level, location preferences, and any specific requirements. Our AI will analyze this information and generate optimized search strings for each platform."
    },
    {
      question: "What file formats can I upload for company data?",
      answer: "You can upload PDF and DOCX files containing company information, job requirements, or hiring preferences. This helps personalize the search prompts to match your company's specific needs."
    },
    {
      question: "How are the different platforms handled?",
      answer: "Each platform (Monster, Naukri, Ceipal) has its own search syntax and capabilities. Our system generates platform-specific prompts that take advantage of each platform's unique features and Boolean search operators."
    },
    {
      question: "Can I save and reuse my search configurations?",
      answer: "Yes! You can save successful search configurations as templates and access them anytime. Your search history is also automatically saved for easy reference and reuse."
    },
    {
      question: "How do I interpret the generated search prompts?",
      answer: "The generated prompts use Boolean operators (AND, OR, NOT) and specific keywords optimized for each platform. Copy the prompt and paste it directly into the platform's search field for best results."
    },
    {
      question: "What if I'm not getting good results?",
      answer: "Try providing more specific job requirements, adjusting the experience level, or adding more relevant skills. You can also use our templates as starting points and modify them to fit your needs."
    }
  ];

  const resources = [
    {
      title: "Platform Search Guides",
      description: "Learn how to effectively use search prompts on each platform",
      links: [
        { name: "Monster Search Tips", url: "#" },
        { name: "Naukri Advanced Search", url: "#" },
        { name: "Ceipal Search Guide", url: "#" }
      ]
    },
    {
      title: "Boolean Search Basics",
      description: "Understanding search operators and syntax",
      links: [
        { name: "Boolean Search Tutorial", url: "#" },
        { name: "Advanced Operators", url: "#" },
        { name: "Common Mistakes", url: "#" }
      ]
    },
    {
      title: "Best Practices",
      description: "Tips for maximizing your recruitment success",
      links: [
        { name: "Writing Job Descriptions", url: "#" },
        { name: "Sourcing Strategies", url: "#" },
        { name: "Template Creation", url: "#" }
      ]
    }
  ];

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-6 space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-primary flex items-center justify-center animate-glow">
            <HelpCircle className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold gradient-text animate-fade-in">
            Help & Support
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.1s' }}>
            Everything you need to know about using Project O effectively
          </p>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="hover:shadow-lg transition-all duration-300 glassmorphism animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <CardHeader>
              <Book className="w-8 h-8 text-primary mb-2" />
              <CardTitle>Documentation</CardTitle>
              <CardDescription>Complete guides and tutorials</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">
                <ExternalLink className="w-4 h-4 mr-2" />
                View Docs
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300 glassmorphism animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <CardHeader>
              <MessageCircle className="w-8 h-8 text-primary mb-2" />
              <CardTitle>Community</CardTitle>
              <CardDescription>Connect with other users</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">
                <ExternalLink className="w-4 h-4 mr-2" />
                Join Forum
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300 glassmorphism animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <CardHeader>
              <Mail className="w-8 h-8 text-primary mb-2" />
              <CardTitle>Contact Support</CardTitle>
              <CardDescription>Get personalized help</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">
                <Mail className="w-4 h-4 mr-2" />
                Email Us
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* FAQ Section */}
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-center animate-fade-in" style={{ animationDelay: '0.5s' }}>
            Frequently Asked Questions
          </h2>
          
          <Card className="glassmorphism animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <CardContent className="p-6">
              <Accordion type="single" collapsible className="space-y-2">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`} className="border border-border/50 rounded-lg px-4">
                    <AccordionTrigger className="text-left hover:no-underline hover:text-primary transition-colors">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground pt-2 pb-4">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </div>

        {/* Resources Section */}
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-center animate-fade-in" style={{ animationDelay: '0.7s' }}>
            Learning Resources
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {resources.map((resource, index) => (
              <Card 
                key={index} 
                className="hover:shadow-lg transition-all duration-300 glassmorphism animate-fade-in"
                style={{ animationDelay: `${0.8 + index * 0.1}s` }}
              >
                <CardHeader>
                  <CardTitle className="text-lg">{resource.title}</CardTitle>
                  <CardDescription>{resource.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {resource.links.map((link, linkIndex) => (
                    <Button 
                      key={linkIndex}
                      variant="ghost" 
                      className="w-full justify-start p-2 h-auto hover:bg-primary/10"
                    >
                      <ExternalLink className="w-3 h-3 mr-2 flex-shrink-0" />
                      <span className="text-sm">{link.name}</span>
                    </Button>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Platform Status */}
        <Card className="glassmorphism animate-fade-in" style={{ animationDelay: '1.1s' }}>
          <CardHeader>
            <CardTitle>Platform Status</CardTitle>
            <CardDescription>Current status of supported job platforms</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center justify-between p-3 border border-border/50 rounded-lg">
                <span className="font-medium">Monster</span>
                <Badge className="bg-green-500/10 text-green-500 border-green-500/20">
                  Active
                </Badge>
              </div>
              <div className="flex items-center justify-between p-3 border border-border/50 rounded-lg">
                <span className="font-medium">Naukri</span>
                <Badge className="bg-green-500/10 text-green-500 border-green-500/20">
                  Active
                </Badge>
              </div>
              <div className="flex items-center justify-between p-3 border border-border/50 rounded-lg">
                <span className="font-medium">Ceipal</span>
                <Badge className="bg-green-500/10 text-green-500 border-green-500/20">
                  Active
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Section */}
        <div className="text-center space-y-6 pt-8">
          <h2 className="text-2xl font-bold animate-fade-in" style={{ animationDelay: '1.2s' }}>
            Still need help?
          </h2>
          <p className="text-muted-foreground animate-fade-in" style={{ animationDelay: '1.3s' }}>
            Our support team is here to help you succeed with your recruitment efforts.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: '1.4s' }}>
            <Button className="bg-gradient-primary">
              <Mail className="w-4 h-4 mr-2" />
              Contact Support
            </Button>
            <Button variant="outline">
              <MessageCircle className="w-4 h-4 mr-2" />
              Schedule a Call
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;