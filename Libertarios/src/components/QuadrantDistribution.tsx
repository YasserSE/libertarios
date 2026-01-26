"use client";

import { useMemo } from "react";
import { mockUsers } from "@/data/mockRegisteredUsers";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";

interface QuadrantData {
  name: string;
  description: string;
  count: number;
  percentage: number;
  color: string;
}

// Define the 4 libertarian quadrants
const quadrantDefinitions = [
  {
    name: "Anarcocapitalismo",
    description: "Abolición total del Estado. Todos los servicios serían provistos por el mercado libre.",
    color: "#0d9488", // teal-600
    condition: (economic: number, social: number) => economic >= 50 && social >= 50,
  },
  {
    name: "Minarquismo",
    description: "Estado mínimo limitado a proteger derechos (policía, tribunales, defensa).",
    color: "#14b8a6", // teal-500
    condition: (economic: number, social: number) => economic >= 30 && economic < 70 && social >= 20 && social < 60,
  },
  {
    name: "Libertarismo de izquierda",
    description: "Combina libertad individual con crítica a las desigualdades. Enfatiza la justicia en la apropiación original.",
    color: "#06b6d4", // cyan-500
    condition: (economic: number, social: number) => economic >= 0 && economic < 50 && social >= 50,
  },
  {
    name: "Paleolibertarismo",
    description: "Fusiona libertarismo económico con valores culturales conservadores y tradiciones occidentales.",
    color: "#0891b2", // cyan-600
    condition: (economic: number, social: number) => economic >= 50 && social >= 0 && social < 50,
  },
];

export function QuadrantDistribution() {
  const quadrantData = useMemo(() => {
    const counts: Record<string, number> = {};
    
    // Initialize counts
    quadrantDefinitions.forEach(q => {
      counts[q.name] = 0;
    });
    
    // Count users in each quadrant
    // Priority order: check most specific first
    mockUsers.forEach(user => {
      let classified = false;
      
      // Check in priority order (most specific to least specific)
      // 1. Anarcocapitalismo: high economic AND high social
      if (user.economic >= 50 && user.social >= 50) {
        counts["Anarcocapitalismo"]++;
        classified = true;
      }
      // 2. Libertarismo de izquierda: lower economic but high social
      else if (user.economic >= 0 && user.economic < 50 && user.social >= 50) {
        counts["Libertarismo de izquierda"]++;
        classified = true;
      }
      // 3. Paleolibertarismo: high economic but lower social
      else if (user.economic >= 50 && user.social >= 0 && user.social < 50) {
        counts["Paleolibertarismo"]++;
        classified = true;
      }
      // 4. Minarquismo: moderate positions (catch-all for libertarian positions)
      else if (user.economic >= 20 && user.social >= 10) {
        counts["Minarquismo"]++;
        classified = true;
      }
      
      // If not classified, assign to closest quadrant
      if (!classified) {
        // Find closest quadrant by distance
        let minDistance = Infinity;
        let closestQuadrant = quadrantDefinitions[0];
        
        for (const quadrant of quadrantDefinitions) {
          // Calculate center of quadrant
          let centerEconomic = 50;
          let centerSocial = 50;
          
          if (quadrant.name === "Anarcocapitalismo") {
            centerEconomic = 75;
            centerSocial = 75;
          } else if (quadrant.name === "Minarquismo") {
            centerEconomic = 50;
            centerSocial = 40;
          } else if (quadrant.name === "Libertarismo de izquierda") {
            centerEconomic = 25;
            centerSocial = 75;
          } else if (quadrant.name === "Paleolibertarismo") {
            centerEconomic = 75;
            centerSocial = 25;
          }
          
          const distance = Math.sqrt(
            Math.pow(user.economic - centerEconomic, 2) + 
            Math.pow(user.social - centerSocial, 2)
          );
          
          if (distance < minDistance) {
            minDistance = distance;
            closestQuadrant = quadrant;
          }
        }
        
        counts[closestQuadrant.name]++;
      }
    });
    
    const total = mockUsers.length;
    
    return quadrantDefinitions.map(q => ({
      name: q.name,
      description: q.description,
      count: counts[q.name],
      percentage: total > 0 ? Math.round((counts[q.name] / total) * 100) : 0,
      color: q.color,
    })) as QuadrantData[];
  }, []);

  const total = quadrantData.reduce((sum, q) => sum + q.count, 0);

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="font-display text-2xl font-bold text-foreground mb-2">
          Distribución por corrientes libertarias
        </h3>
        <p className="text-muted-foreground">
          {total} simpatizantes clasificados según su posición en el cuadrante ideológico
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Distribución porcentual</CardTitle>
            <CardDescription>Porcentaje de simpatizantes por corriente</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={quadrantData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percentage }) => `${name}: ${percentage}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="count"
                >
                  {quadrantData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: number, name: string) => [
                    `${value} simpatizantes (${quadrantData.find(q => q.name === name)?.percentage}%)`,
                    name
                  ]}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Bar Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Número de simpatizantes</CardTitle>
            <CardDescription>Cantidad absoluta por corriente</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={quadrantData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis 
                  dataKey="name" 
                  className="text-xs"
                  angle={-45}
                  textAnchor="end"
                  height={100}
                />
                <YAxis className="text-xs" />
                <Tooltip 
                  formatter={(value: number) => [`${value} simpatizantes`, "Cantidad"]}
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Bar dataKey="count" fill="#0d9488" radius={[8, 8, 0, 0]}>
                  {quadrantData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Detailed cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {quadrantData.map((quadrant, index) => (
          <Card key={index} className="relative overflow-hidden">
            <div 
              className="absolute top-0 left-0 right-0 h-1"
              style={{ backgroundColor: quadrant.color }}
            />
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">{quadrant.name}</CardTitle>
              <CardDescription className="text-xs leading-relaxed">
                {quadrant.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-baseline gap-2">
                  <span className="font-display text-3xl font-bold text-foreground">
                    {quadrant.count}
                  </span>
                  <span className="text-sm text-muted-foreground">simpatizantes</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all duration-500"
                      style={{ 
                        width: `${quadrant.percentage}%`,
                        backgroundColor: quadrant.color,
                      }}
                    />
                  </div>
                  <span className="text-sm font-medium text-foreground min-w-[3rem] text-right">
                    {quadrant.percentage}%
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
