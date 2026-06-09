import { useEffect, useRef, useState } from 'react';
import { SUBSTANCE } from '@/constants/substance';

interface DropNoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (message: string, author: string) => void;
}

export function DropNoteModal({ isOpen, onClose, onSubmit }: DropNoteModalProps) {
  const [message, setMessage] = useState('');
  const [author, setAuthor] = useState('');
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const copy = SUBSTANCE.story.globalUI.noteDrop;

  useEffect(() => {
    if (!isOpen) return;

    const focusTimer = window.setTimeout(() => {
      messageRef.current?.focus();
    }, 0);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.clearTimeout(focusTimer);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSubmit(message, author);
      setMessage('');
      setAuthor('');
      onClose();
    }
  };

  return (
    <div
      className="modal-drop-note story-stage-overlay fixed inset-0 flex items-center justify-center px-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="drop-note-title"
      aria-describedby="drop-note-description"
    >
      {/* Backdrop */}
      <div 
        className="modal-backdrop absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="modal-content story-glass relative w-full max-w-md rounded-lg border border-border bg-card p-6 shadow-2xl sm:p-8">
        <h2 id="drop-note-title" className="modal-title text-h2-sans mb-1 text-foreground">{copy.modalTitle}</h2>
        <p id="drop-note-description" className="text-body-sans mb-5 text-muted-foreground">
          {copy.modalSubtitle}
        </p>
        
        <form onSubmit={handleSubmit} className="modal-form space-y-4">
          <div className="form-group">
            <label htmlFor="message" className="form-label block mb-2">
              {copy.fields.messageLabel}
            </label>
            <textarea
              id="message"
              ref={messageRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="form-input-message w-full p-3 rounded-md border border-border bg-input-background resize-none text-body-sans text-black placeholder:text-black/45 caret-black opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 dark:text-black dark:placeholder:text-black/45 dark:caret-black"
              rows={4}
              placeholder={copy.fields.placeholderMessage}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="author" className="form-label block mb-2">
              {copy.fields.authorLabel}
            </label>
            <input
              id="author"
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="form-input-author w-full p-3 rounded-md border border-border bg-input-background text-body-sans text-black placeholder:text-black/45 caret-black opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 dark:text-black dark:placeholder:text-black/45 dark:caret-black"
              placeholder={copy.fields.placeholderAuthor}
            />
          </div>
          
          <div className="form-actions flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="cta-modal-cancel flex-1 px-4 py-2 rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/80"
            >
              <span className="text-body-sans">Cancel</span>
            </button>
            <button
              type="submit"
              className="cta-modal-submit flex-1 px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <span className="text-body-sans">{copy.submit}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
