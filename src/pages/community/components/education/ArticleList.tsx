
import { BookOpen } from "lucide-react";
import ContentCard from "./ContentCard";
import { Article } from "./types";

interface ArticleListProps {
  articles: Article[];
  onToggleSave: (id: string) => void;
}

const ArticleList = ({ articles, onToggleSave }: ArticleListProps) => {
  return (
    <>
      {articles.map(article => (
        <ContentCard
          key={article.id}
          id={article.id}
          title={article.title}
          description={article.description}
          author={article.author}
          timeInfo={article.readTime}
          level={article.level}
          tags={article.tags}
          savedOffline={article.savedOffline}
          authorIcon={<BookOpen className="h-4 w-4 mr-1" />}
          onToggleSave={onToggleSave}
          primaryActionText="Read Article"
        />
      ))}
    </>
  );
};

export default ArticleList;
