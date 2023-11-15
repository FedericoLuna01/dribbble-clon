'use client'

import { useState } from "react"
import { SlidersHorizontal } from 'lucide-react'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"

const categories = [
  {
    label: 'Todas',
    value: 'todas'
  },
  {
    label: 'Animaciones',
    value: 'animaciones'
  },
  {
    label: 'Mobile',
    value: 'mobile'
  },
  {
    label: 'Web',
    value: 'web'
  },
  {
    label: 'Videojuegos',
    value: 'videojuegos'
  }
]

const FilterBar = () => {
  const [isSelected, setIsSelected] = useState('todas')
  return (
    <div
      className="mt-20"
    >
      <div
        className="flex flex-row items-center justify-between"
      >
        <div
          className="space-x-4"
        >
          {
            categories.map(({ value, label }) => (
              <Button
                key={value}
                variant={isSelected === value ? 'secondary' : 'ghost'}
                onClick={() => setIsSelected(value)}
              >
                {label}
              </Button>
            ))
          }
        </div>
        <Button
          variant='outline'
        >
          <SlidersHorizontal className="mr-4 w-4 h-4" /> Filtros
        </Button>
      </div>
      <div
        className="mt-4 flex flex-row items-center space-x-4"
      >
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Theme" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Light</SelectItem>
            <SelectItem value="dark">Dark</SelectItem>
            <SelectItem value="system">System</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Theme" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Light</SelectItem>
            <SelectItem value="dark">Dark</SelectItem>
            <SelectItem value="system">System</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

export default FilterBar