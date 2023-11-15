import React from 'react'

const Items = [
  {
    label: 'Inicio',
    href: '/',
  },
  {
    label: 'Explorar',
    href: '/explore'
  }
]

const MainNav = () => {
  return (
    <nav
      className='flex flex-row space-x-4'
    >
      {
        Items.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="text-gray-500 hover:text-gray-800"
          >
            {item.label}
          </a>
        ))
      }
    </nav>
  )
}

export default MainNav