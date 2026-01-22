interface FloatingNoteProps {
  message: string;
  author?: string;
  style?: React.CSSProperties;
  noteId?: string;
}

export function FloatingNote({ message, author, style, noteId }: FloatingNoteProps) {
  const noteDataId = noteId ? `note-${noteId}` : 'note-user-generated';
  
  return (
    <div 
      className="note-user-generated bg-yellow-100 rounded-md shadow-md p-4 max-w-xs border-l-4 border-yellow-400"
      style={style}
      data-note-id={noteDataId}
    >
      <p className="note-message text-annotation-script text-gray-800">"{message}"</p>
      {author && (
        <p className="note-author text-annotation-script text-gray-600 mt-2 text-right">— {author}</p>
      )}
    </div>
  );
}