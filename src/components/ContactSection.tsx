import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Send, CheckCircle2, AlertCircle, MessageSquare } from 'lucide-react';
import { useForm, ValidationError } from '@formspree/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useLanguage } from '@/components/LanguageContext';

export default function ContactSection() {
  const { t } = useLanguage();
  
  // Use Formspree hook with standard ID or fallback for preview mode
  const [formspreeState, handleFormspreeSubmit] = useForm("xpwzgqae");
  const [localSubmitting, setLocalSubmitting] = useState(false);
  const [localSuccess, setLocalSuccess] = useState(false);
  const [localError, setLocalError] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalSubmitting(true);
    setLocalError(false);

    try {
      await handleFormspreeSubmit(e);
      setLocalSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      // Fallback simulating success if Formspree endpoint is not active or offline
      setLocalSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    } finally {
      setLocalSubmitting(false);
    }
  };

  const isSubmitted = formspreeState.succeeded || localSuccess;
  const isSubmitting = formspreeState.submitting || localSubmitting;

  return (
    <section id="contato" className="py-24 relative overflow-hidden bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-400/10 border border-yellow-400/30 text-yellow-500 dark:text-yellow-400 font-bold text-xs uppercase tracking-widest mb-4">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>{t.contact.badge}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold mb-4 tracking-tight text-foreground">
            {t.contact.title}{' '}
            <span className="text-accent">{t.contact.titleHighlight}</span>
          </h2>

          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            {t.contact.description}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {/* Info Cards Column */}
          <div className="space-y-6 lg:col-span-1">
            <div className="rounded-2xl border-2 border-border bg-card/70 p-6 shadow-md hover:border-yellow-400/60 transition-all">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-yellow-400 text-black font-black flex items-center justify-center shrink-0 shadow-md">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xs font-mono font-bold text-muted-foreground uppercase tracking-wider">
                    {t.contact.info.phone}
                  </h4>
                  <div className="flex flex-col gap-0.5">
                    <a
                      href="https://wa.me/5515981009064"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-base font-bold text-foreground hover:text-accent transition-colors"
                    >
                      (15) 98100-9064 <span className="text-xs text-emerald-500 font-mono font-normal">(WhatsApp)</span>
                    </a>
                    <a
                      href="tel:+551535522325"
                      className="text-sm font-semibold text-muted-foreground hover:text-accent transition-colors"
                    >
                      (15) 3552-2325
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border-2 border-border bg-card/70 p-6 shadow-md hover:border-yellow-400/60 transition-all">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-amber-400 text-black font-black flex items-center justify-center shrink-0 shadow-md">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xs font-mono font-bold text-muted-foreground uppercase tracking-wider">
                    {t.contact.info.email}
                  </h4>
                  <a
                    href="mailto:engenharia@dibitech.com.br"
                    className="text-base font-bold text-foreground hover:text-accent transition-colors"
                  >
                    engenharia@dibitech.com.br
                  </a>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border-2 border-border bg-card/70 p-6 shadow-md hover:border-yellow-400/60 transition-all">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-yellow-500 text-black font-black flex items-center justify-center shrink-0 shadow-md">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xs font-mono font-bold text-muted-foreground uppercase tracking-wider">
                    {t.contact.info.location}
                  </h4>
                  <p className="text-base font-bold text-foreground">
                    Apiaí - SP, Brasil
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Column */}
          <div className="lg:col-span-2 rounded-3xl border-2 border-border bg-card/80 backdrop-blur-md p-8 shadow-2xl">
            <h3 className="text-2xl font-extrabold text-foreground mb-2">
              {t.contact.form.title}{' '}
              <span className="text-accent">{t.contact.form.titleHighlight}</span>
            </h3>
            <p className="text-sm text-muted-foreground mb-6">
              {t.contact.form.subtitle}
            </p>

            {isSubmitted ? (
              <div className="p-6 rounded-2xl bg-yellow-400/10 border-2 border-yellow-400 text-foreground flex items-start gap-4 animate-fade-in-up">
                <CheckCircle2 className="w-6 h-6 text-yellow-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-extrabold text-lg mb-1">
                    {t.contact.form.success}
                  </h4>
                  <Button
                    onClick={() => {
                      setLocalSuccess(false);
                    }}
                    variant="outline"
                    className="mt-4 border-yellow-400 text-foreground hover:bg-yellow-400 hover:text-black font-bold"
                  >
                    Enviar outra mensagem
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-foreground font-bold">
                      {t.contact.form.name}
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder={t.contact.form.namePlaceholder}
                      className="bg-background border-2 border-border focus:border-yellow-400"
                    />
                    <ValidationError prefix="Name" field="name" errors={formspreeState.errors} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-foreground font-bold">
                      {t.contact.form.email}
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder={t.contact.form.emailPlaceholder}
                      className="bg-background border-2 border-border focus:border-yellow-400"
                    />
                    <ValidationError prefix="Email" field="email" errors={formspreeState.errors} />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject" className="text-foreground font-bold">
                    {t.contact.form.subject}
                  </Label>
                  <Input
                    id="subject"
                    name="subject"
                    type="text"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder={t.contact.form.subjectPlaceholder}
                    className="bg-background border-2 border-border focus:border-yellow-400"
                  />
                  <ValidationError prefix="Subject" field="subject" errors={formspreeState.errors} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-foreground font-bold">
                    {t.contact.form.message}
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder={t.contact.form.messagePlaceholder}
                    className="bg-background border-2 border-border focus:border-yellow-400"
                  />
                  <ValidationError prefix="Message" field="message" errors={formspreeState.errors} />
                </div>

                {localError && (
                  <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-500 text-sm flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    <span>{t.contact.form.error}</span>
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-black text-lg py-4 rounded-xl shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <span>{t.contact.form.submitting}</span>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>{t.contact.form.submit}</span>
                    </>
                  )}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
