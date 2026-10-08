import { useEffect } from 'react';

interface PageMetaProps {
  title: string;
  description?: string;
}

export const PageMeta: React.FC<PageMetaProps> = ({ title, description }) => {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = `${title} | QuadraBiz Multi-Business Platform`;

    if (description) {
      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.setAttribute('name', 'description');
        document.head.appendChild(metaDesc);
      }
      metaDesc.setAttribute('content', description);
    }

    return () => {
      document.title = previousTitle;
    };
  }, [title, description]);

  return null;
};
