import React, { useState } from 'react'
import { Card, CardContent } from '../../../components/Card'
import Button from '../../../components/Button'
import { CaretDown, ClipboardText } from '@phosphor-icons/react'

interface TestAccordionProps {
  title: string
}

const TestAccordion: React.FC<TestAccordionProps> = ({ title }) => {
  const [open, setOpen] = useState(false)

  return (
    <Card className="bg-[#0f0f10] border-[#2a2a2d]">
      <button
        onClick={() => setOpen((s) => !s)}
        className="w-full flex items-center justify-between p-4 md:p-5 text-left"
      >
        <div className="flex items-center gap-2 text-white font-semibold">
          <ClipboardText size={18} className="text-yellow-600" /> {title}
        </div>
        <div className={`transition-transform ${open ? 'rotate-180' : ''}`}>
          <CaretDown size={18} className="text-white/70" />
        </div>
      </button>
      {open && (
        <CardContent className="pt-0 p-4 md:p-5">
          <div className="flex items-center justify-center">
            <Button className="w-full md:w-auto">Attempt</Button>
          </div>
        </CardContent>
      )}
    </Card>
  )
}

export default TestAccordion
