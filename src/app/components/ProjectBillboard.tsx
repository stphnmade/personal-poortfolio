import { useState } from 'react';

interface ProjectBillboardProps {
  title: string;
  description: string;
  imageUrl?: string;
  projectId?: string;
}

export function ProjectBillboard({ title, description, imageUrl, projectId }: ProjectBillboardProps) {
  const [isInspecting, setIsInspecting] = useState(false);
  const billboardId = projectId ? `billboard-project-${projectId}` : 'billboard-project';
  
  return (
    <div 
      className={`
        billboard-project bg-card rounded-lg shadow-lg overflow-hidden w-full max-w-md border border-border
        transition-all duration-300 cursor-pointer
        ${isInspecting ? 'scale-110 z-50 shadow-2xl' : 'hover:scale-105'}
      `}
      data-project-id={billboardId}
      onMouseEnter={() => setIsInspecting(true)}
      onMouseLeave={() => setIsInspecting(false)}
    >
      {imageUrl && (
        <div className="billboard-project-image w-full h-48 bg-muted overflow-hidden">
          <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
        </div>
      )}
      <div className="billboard-project-content p-6 space-y-2">
        <h3 className="billboard-project-title text-h2-sans">{title}</h3>
        <p className="billboard-project-description text-body-sans text-muted-foreground">{description}</p>
      </div>
      
      {/* Inspection overlay backdrop */}
      {isInspecting && (
        <div className="fixed inset-0 bg-black/20 pointer-events-none -z-10" />
      )}
    </div>
  );
}