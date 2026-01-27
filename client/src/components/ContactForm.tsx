import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertMessageSchema } from "@shared/schema";
import { useSendMessage } from "@/hooks/use-portfolio";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { Send, Loader2, Mail, MapPin } from "lucide-react";
import { z } from "zod";

type ContactFormValues = z.infer<typeof insertMessageSchema>;

export function ContactForm() {
  const { toast } = useToast();
  const sendMessage = useSendMessage();

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(insertMessageSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    try {
      await sendMessage.mutateAsync(data);
      toast({
        title: "Message Sent!",
        description: "Thanks for reaching out. I'll get back to you soon.",
        variant: "default",
      });
      form.reset();
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to send message",
        variant: "destructive",
      });
    }
  };

  return (
    <section id="contact" className="section-padding mb-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-16"
      >
        <h2 className="text-3xl font-bold mb-4">Get In Touch</h2>
        <div className="h-1 w-20 bg-primary rounded-full" />
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Info */}
        <div className="space-y-8">
          <p className="text-xl text-muted-foreground leading-relaxed">
            Interested in collaborating on AI projects, enterprise architecture consulting, or just want to talk tech? Drop me a message!
          </p>
          
          <div className="space-y-6">
            <div className="flex items-center gap-4 glass p-4 rounded-xl">
              <div className="p-3 bg-primary/10 rounded-full text-primary">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Email</div>
                <div className="font-medium">contact@mayankchugh.com</div>
              </div>
            </div>
            
            <div className="flex items-center gap-4 glass p-4 rounded-xl">
              <div className="p-3 bg-primary/10 rounded-full text-primary">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Location</div>
                <div className="font-medium">Global / Remote</div>
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="glass p-8 rounded-2xl border-t border-primary/20">
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Name</label>
              <input
                {...form.register("name")}
                className="w-full px-4 py-3 rounded-lg bg-background/50 border border-white/10 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                placeholder="John Doe"
              />
              {form.formState.errors.name && (
                <span className="text-xs text-red-500">{form.formState.errors.name.message}</span>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <input
                {...form.register("email")}
                type="email"
                className="w-full px-4 py-3 rounded-lg bg-background/50 border border-white/10 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                placeholder="john@example.com"
              />
              {form.formState.errors.email && (
                <span className="text-xs text-red-500">{form.formState.errors.email.message}</span>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Message</label>
              <textarea
                {...form.register("message")}
                rows={4}
                className="w-full px-4 py-3 rounded-lg bg-background/50 border border-white/10 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none"
                placeholder="Tell me about your project..."
              />
              {form.formState.errors.message && (
                <span className="text-xs text-red-500">{form.formState.errors.message.message}</span>
              )}
            </div>

            <button
              type="submit"
              disabled={sendMessage.isPending}
              className="w-full py-4 rounded-xl font-bold bg-primary text-primary-foreground hover:bg-primary/90 transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/20 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {sendMessage.isPending ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  Send Message
                  <Send className="w-5 h-5" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
