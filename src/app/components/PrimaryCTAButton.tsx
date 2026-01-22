interface PrimaryCTAButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  ctaId?: string;
}

export function PrimaryCTAButton({ children, onClick, variant = 'primary', ctaId }: PrimaryCTAButtonProps) {
  const buttonId = ctaId || 'cta-button';
  
  return (
    <button
      onClick={onClick}
      className={`
        cta-button
        px-8 py-4 rounded-full transition-all duration-200 
        hover:scale-105 active:scale-95 shadow-lg
        ${variant === 'primary' 
          ? 'bg-primary text-primary-foreground hover:bg-primary/90' 
          : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
        }
      `}
      data-cta-id={buttonId}
    >
      <span className="text-body-sans">{children}</span>
    </button>
  );
}