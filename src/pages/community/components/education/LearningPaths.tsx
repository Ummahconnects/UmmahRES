
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { LearningPath } from "./types";

interface LearningPathsProps {
  learningPaths: LearningPath[];
}

const LearningPaths = ({ learningPaths }: LearningPathsProps) => {
  return (
    <div className="grid gap-6">
      {learningPaths.map(path => (
        <Card key={path.id}>
          <CardHeader>
            <CardTitle>{path.title}</CardTitle>
            <CardDescription>{path.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Progress</span>
                <span className="text-sm font-medium">{path.progress}%</span>
              </div>
              <Progress value={path.progress} className="h-2" />
              <p className="text-sm text-gray-500">
                {path.completedModules} of {path.totalModules} modules completed
              </p>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full bg-muslim-teal hover:bg-muslim-teal/90">
              Continue Learning
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default LearningPaths;
