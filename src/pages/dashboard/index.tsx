
import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Grid, Columns, Plus, X, Clock, Settings } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Redirect } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

// Widget components
import PrayerTimesWidget from "./widgets/PrayerTimesWidget";
import QuranWidget from "./widgets/QuranWidget";
import CommunityWidget from "./widgets/CommunityWidget";
import WeatherWidget from "./widgets/WeatherWidget";
import EventsWidget from "./widgets/EventsWidget";

// Define widget types
type WidgetType = 
  | "prayer-times"
  | "quran"
  | "community"
  | "weather"
  | "events";

interface WidgetDefinition {
  id: string;
  type: WidgetType;
  title: string;
  description: string;
  component: React.FC<any>;
  defaultSize: "small" | "medium" | "large";
}

const WIDGET_DEFINITIONS: Record<WidgetType, WidgetDefinition> = {
  "prayer-times": {
    id: "prayer-times",
    type: "prayer-times",
    title: "Prayer Times",
    description: "Daily prayer times for your location",
    component: PrayerTimesWidget,
    defaultSize: "medium"
  },
  "quran": {
    id: "quran",
    type: "quran",
    title: "Quran Verse",
    description: "Daily verse from the Quran",
    component: QuranWidget,
    defaultSize: "medium"
  },
  "community": {
    id: "community",
    type: "community",
    title: "Community Updates",
    description: "Latest discussions from the community",
    component: CommunityWidget,
    defaultSize: "medium"
  },
  "weather": {
    id: "weather",
    type: "weather",
    title: "Weather",
    description: "Current weather for your location",
    component: WeatherWidget,
    defaultSize: "small"
  },
  "events": {
    id: "events",
    type: "events", 
    title: "Upcoming Events",
    description: "Muslim events happening near you",
    component: EventsWidget,
    defaultSize: "large"
  }
};

const DEFAULT_WIDGETS = [
  { id: "prayer-times-1", type: "prayer-times", size: "medium" },
  { id: "quran-1", type: "quran", size: "medium" },
  { id: "community-1", type: "community", size: "medium" }
];

const DashboardPage = () => {
  const { user } = useAuth();
  const [widgets, setWidgets] = useState<any[]>([]);
  const [layout, setLayout] = useState<"grid" | "columns">("grid");
  const [isAddingWidget, setIsAddingWidget] = useState(false);
  
  // Require authentication
  if (!user) {
    return <Redirect to="/auth?redirect=/dashboard" />;
  }
  
  // Load saved widgets from localStorage on component mount
  useEffect(() => {
    const savedWidgets = localStorage.getItem('dashboard-widgets');
    const savedLayout = localStorage.getItem('dashboard-layout');
    
    if (savedWidgets) {
      setWidgets(JSON.parse(savedWidgets));
    } else {
      setWidgets(DEFAULT_WIDGETS);
    }
    
    if (savedLayout) {
      setLayout(savedLayout as "grid" | "columns");
    }
  }, []);
  
  // Save widgets to localStorage whenever they change
  useEffect(() => {
    if (widgets.length > 0) {
      localStorage.setItem('dashboard-widgets', JSON.stringify(widgets));
    }
  }, [widgets]);
  
  // Save layout preference
  useEffect(() => {
    localStorage.setItem('dashboard-layout', layout);
  }, [layout]);
  
  const addWidget = (type: WidgetType) => {
    const definition = WIDGET_DEFINITIONS[type];
    const newWidget = {
      id: `${type}-${Date.now()}`,
      type,
      size: definition.defaultSize
    };
    
    setWidgets([...widgets, newWidget]);
    setIsAddingWidget(false);
  };
  
  const removeWidget = (widgetId: string) => {
    setWidgets(widgets.filter(widget => widget.id !== widgetId));
  };
  
  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    
    const items = Array.from(widgets);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    setWidgets(items);
  };
  
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-muslim-dark">Your Dashboard</h1>
          <div className="flex items-center gap-2">
            <Button
              variant={layout === "grid" ? "default" : "outline"}
              size="sm"
              onClick={() => setLayout("grid")}
              className={layout === "grid" ? "bg-muslim-teal hover:bg-muslim-teal/90" : ""}
            >
              <Grid className="h-4 w-4 mr-2" />
              Grid
            </Button>
            <Button
              variant={layout === "columns" ? "default" : "outline"}
              size="sm"
              onClick={() => setLayout("columns")}
              className={layout === "columns" ? "bg-muslim-teal hover:bg-muslim-teal/90" : ""}
            >
              <Columns className="h-4 w-4 mr-2" />
              Columns
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsAddingWidget(true)}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Widget
            </Button>
          </div>
        </div>
        
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="widgets" direction={layout === "columns" ? "vertical" : "horizontal"}>
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className={`
                  ${layout === "grid" 
                    ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" 
                    : "flex flex-col gap-4"
                  }
                `}
              >
                {widgets.map((widget, index) => {
                  const definition = WIDGET_DEFINITIONS[widget.type as WidgetType];
                  const WidgetComponent = definition.component;
                  
                  return (
                    <Draggable key={widget.id} draggableId={widget.id} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`
                            ${widget.size === "small" ? "col-span-1" : ""}
                            ${widget.size === "medium" ? "col-span-1 md:col-span-1" : ""}
                            ${widget.size === "large" ? "col-span-1 md:col-span-2" : ""}
                          `}
                        >
                          <Card className="h-full">
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                              <div>
                                <CardTitle>{definition.title}</CardTitle>
                                <CardDescription>{definition.description}</CardDescription>
                              </div>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => removeWidget(widget.id)}
                                className="h-8 w-8 p-0"
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </CardHeader>
                            <CardContent>
                              <WidgetComponent widget={widget} />
                            </CardContent>
                          </Card>
                        </div>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        
        {isAddingWidget && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <Card className="w-full max-w-md mx-4">
              <CardHeader>
                <CardTitle>Add Widget</CardTitle>
                <CardDescription>Choose a widget to add to your dashboard</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-2">
                {Object.values(WIDGET_DEFINITIONS).map(widget => (
                  <Button 
                    key={widget.id}
                    variant="outline" 
                    className="justify-start h-auto py-3 px-4"
                    onClick={() => addWidget(widget.type)}
                  >
                    <div className="flex flex-col items-start text-left">
                      <span className="font-medium">{widget.title}</span>
                      <span className="text-sm text-gray-500">{widget.description}</span>
                    </div>
                  </Button>
                ))}
              </CardContent>
              <div className="p-4 border-t flex justify-end">
                <Button 
                  variant="outline" 
                  onClick={() => setIsAddingWidget(false)}
                >
                  Cancel
                </Button>
              </div>
            </Card>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default DashboardPage;
