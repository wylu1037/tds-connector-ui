"use client"

import { useState } from "react"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts"
import { SecurityAssessment, SecurityDimension } from "@/types"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Shield, Info } from "lucide-react"
import { cn } from "@/lib/utils"

interface SecurityRatingChartProps {
  assessment: SecurityAssessment
  size?: "sm" | "md" | "lg"
  showModal?: boolean
}

const COLORS = {
  green: "#10b981",
  yellow: "#f59e0b", 
  red: "#ef4444"
}

const getRatingColor = (rating: string) => {
  switch (rating) {
    case "S": return "bg-green-600"
    case "A": return "bg-green-500" 
    case "B": return "bg-yellow-500"
    case "C": return "bg-orange-500"
    case "D": return "bg-red-500"
    default: return "bg-gray-500"
  }
}

const getRatingDescription = (rating: string) => {
  switch (rating) {
    case "S": return "High Trust Production Ready (90-100)"
    case "A": return "Production Ready with Minor Items (80-89)"
    case "B": return "Limited Production/Pilot (65-79)"
    case "C": return "Testing/Sandbox Only (50-64)"
    case "D": return "Not Recommended (<50)"
    default: return "Unknown Rating"
  }
}

export function SecurityRatingChart({ assessment, size = "md", showModal = true }: SecurityRatingChartProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const chartData = assessment.dimensions.map((dim: SecurityDimension) => ({
    name: dim.name,
    value: dim.score * dim.weight,
    weight: dim.weight,
    score: dim.score,
    status: dim.status,
    description: dim.description
  }))

  const sizeClasses = {
    sm: "w-16 h-16",
    md: "w-24 h-24", 
    lg: "w-32 h-32"
  }

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="bg-white p-3 border rounded-lg shadow-lg">
          <p className="font-medium">{data.name}</p>
          <p className="text-sm text-muted-foreground">
            Weight: {(data.weight * 100).toFixed(0)}%
          </p>
          <p className="text-sm text-muted-foreground">
            Score: {(data.score * 100).toFixed(0)}%
          </p>
          <p className="text-sm">
            Status: <span className={cn(
              "px-1 py-0.5 rounded text-xs",
              data.status === "green" && "bg-green-100 text-green-800",
              data.status === "yellow" && "bg-yellow-100 text-yellow-800", 
              data.status === "red" && "bg-red-100 text-red-800"
            )}>
              {data.status === "green" ? "Meets" : data.status === "yellow" ? "Partial" : "Fails"}
            </span>
          </p>
        </div>
      )
    }
    return null
  }

  const ChartComponent = (
    <div className={cn("relative", sizeClasses[size])}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={size === "sm" ? 15 : size === "md" ? 25 : 35}
            outerRadius={size === "sm" ? 30 : size === "md" ? 45 : 60}
            dataKey="value"
            stroke="none"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[entry.status as keyof typeof COLORS]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <div className={cn(
            "font-bold",
            size === "sm" ? "text-xs" : size === "md" ? "text-sm" : "text-base"
          )}>
            {assessment.rating}
          </div>
          <div className={cn(
            "text-muted-foreground",
            size === "sm" ? "text-xs" : "text-xs"
          )}>
            {assessment.overallScore.toFixed(0)}
          </div>
        </div>
      </div>
    </div>
  )

  if (!showModal) {
    return ChartComponent
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="p-0 h-auto cursor-pointer hover:bg-transparent hover:text-foreground">
          {ChartComponent}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Shield className="h-5 w-5" />
            <span>Security Assessment Details</span>
          </DialogTitle>
          <DialogDescription>
            Comprehensive security evaluation across six key dimensions
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Badge className={cn("text-white", getRatingColor(assessment.rating))}>
                Rating {assessment.rating}
              </Badge>
              <span className="text-lg font-semibold">{assessment.overallScore.toFixed(1)}/100</span>
            </div>
            <div className="text-sm text-muted-foreground">
              {getRatingDescription(assessment.rating)}
            </div>
          </div>

          <div className="grid gap-4">
            <h4 className="font-medium">Security Dimensions</h4>
            {assessment.dimensions.map((dimension) => (
              <div key={dimension.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-sm">{dimension.name}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-muted-foreground">
                      Weight: {(dimension.weight * 100).toFixed(0)}%
                    </span>
                    <Badge
                      variant="outline"
                      className={cn(
                        dimension.status === "green" && "border-green-500 text-green-700",
                        dimension.status === "yellow" && "border-yellow-500 text-yellow-700",
                        dimension.status === "red" && "border-red-500 text-red-700"
                      )}
                    >
                      {(dimension.score * 100).toFixed(0)}%
                    </Badge>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={cn(
                      "h-2 rounded-full",
                      dimension.status === "green" && "bg-green-500",
                      dimension.status === "yellow" && "bg-yellow-500",
                      dimension.status === "red" && "bg-red-500"
                    )}
                    style={{ width: `${dimension.score * 100}%` }}
                  />
                </div>
                <p className="text-xs text-muted-foreground">{dimension.description}</p>
              </div>
            ))}
          </div>

          <div className="text-xs text-muted-foreground border-t pt-4">
            <div className="flex justify-between">
              <span>Last Assessed: {new Date(assessment.lastAssessed).toLocaleDateString()}</span>
              <span>Assessor: {assessment.assessor}</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
