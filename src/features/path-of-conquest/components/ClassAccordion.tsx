import React, { useState } from 'react'
import { Card, CardContent } from '../../../components/Card'
import Button from '../../../components/Button'
import { CaretDown, LockSimple, FlagPennant } from '@phosphor-icons/react'

export type Topic = {
  id: string
  title: string
  classworkStatus?: 'pending' | 'completed' | 'failed'
  homeworkStatus?: 'pending' | 'completed' | 'failed'
}

export type ClassItem = {
  id: string
  name: string
  locked?: boolean
  progress?: number
  topics: Topic[]
}

interface ClassAccordionProps {
  item: ClassItem
}

const statusBadge = (status?: 'pending' | 'completed' | 'failed') => {
  if (!status || status === 'pending') return <span className="text-white/60">Pending</span>
  if (status === 'completed') return <span className="text-green-400">Done</span>
  return <span className="text-red-400">Try Again</span>
}

const ClassAccordion: React.FC<ClassAccordionProps> = ({ item }) => {
  const [open, setOpen] = useState(false)

  return (
    <Card className="bg-[#0f0f10] border-[#2a2a2d]">
      <button
        onClick={() => setOpen((s) => !s)}
        className="w-full flex items-center justify-between p-4 md:p-5 text-left"
      >
        <div className="flex items-center gap-3">
          <div className="text-white font-semibold">{item.name}</div>
          {item.locked && (
            <div className="text-white/60 flex items-center gap-1">
              <LockSimple size={16} />
            </div>
          )}
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden md:block w-40 h-2 bg-[#161618] rounded-full overflow-hidden border border-[#2a2a2d]">
            <div className="h-full bg-yellow-600" style={{ width: `${item.progress ?? 0}%` }} />
          </div>
          <div className={`transition-transform ${open ? 'rotate-180' : ''}`}>
            <CaretDown size={18} className="text-white/70" />
          </div>
        </div>
      </button>

      {open && (
        <CardContent className="pt-0 p-4 md:p-5">
          <div className="grid grid-cols-1 gap-3">
            {/* header row */}
            <div className="grid grid-cols-2 md:grid-cols-3 text-xs text-white/60 px-2">
              <div>topic</div>
              <div className="text-center">classwork</div>
              <div className="hidden md:block text-center">homework</div>
            </div>
            {/* topics */}
            {item.topics.map((t) => (
              <div key={t.id} className="grid grid-cols-2 md:grid-cols-3 items-center bg-[#0b0b0c] border border-[#2a2a2d] rounded-lg px-3 py-3">
                <div className="flex items-center gap-2 text-white">
                  <FlagPennant size={16} className="text-yellow-600" />
                  <span className="text-sm">{t.title}</span>
                </div>
                <div className="flex items-center justify-center gap-3">
                  <Button size="sm" variant="secondary" className="px-3 py-1 h-8">Attempt</Button>
                  <span className="text-xs">{statusBadge(t.classworkStatus)}</span>
                </div>
                <div className="hidden md:flex items-center justify-center gap-3">
                  <Button size="sm" variant="secondary" className="px-3 py-1 h-8">Attempt</Button>
                  <span className="text-xs">{statusBadge(t.homeworkStatus)}</span>
                </div>
              </div>
            ))}

              {/* no realm tests here; only topics belong inside a class */}
          </div>
        </CardContent>
      )}
    </Card>
  )
}

export default ClassAccordion
