interface InfoCardProps {
  title: string;
  items: string[];
  cardId?: string;
}

export function InfoCard({ title, items, cardId }: InfoCardProps) {
  const cardDataId = cardId ? `info-card-${cardId}` : 'info-card';
  
  return (
    <div 
      className="info-card bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-md border border-gray-200"
      data-card-id={cardDataId}
    >
      <h3 className="info-card-title text-h2-sans mb-4">{title}</h3>
      <ul className="info-card-list space-y-2">
        {items.map((item, index) => (
          <li key={index} className="info-card-item text-body-sans text-gray-700">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
