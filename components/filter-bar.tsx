'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import qs from 'query-string'

import { Button } from "@/components/ui/button"
import { Category } from "@prisma/client"
import { Separator } from './ui/separator'

interface FilterBarProps {
  categories: Category[]
}

const FilterBar: React.FC<FilterBarProps> = ({ categories }) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const selectedValue = searchParams.get('categoria')
  const onClick = (name: string) => {
    const current = qs.parse(searchParams.toString())

    const query = {
      ...current,
      categoria: name || null
    }

    if (current.categoria === name) {
      query.categoria = null
    }

    const url = qs.stringifyUrl({
      url: window.location.href,
      query
    }, { skipNull: true })

    router.push(url)
  }

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
            categories.map(({ name, id }) => (
              <Button
                key={id}
                variant={selectedValue === name ? 'secondary' : 'ghost'}
                onClick={() => onClick(name)}
              >
                {name}
              </Button>
            ))
          }
        </div>
        {/* <Button
          variant='outline'
          >
          <SlidersHorizontal className="mr-4 w-4 h-4" /> Filtros
        </Button> */}
      </div>
      <Separator className='mt-4' />
      {/* <div
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
      </div> */}
    </div>
  )
}

export default FilterBar