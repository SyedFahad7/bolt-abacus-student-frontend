import React from 'react'
import { Card, CardContent } from '../../../components/Card'
import Button from '../../../components/Button'
import { Gauge, Wind, Drop, Fire, Mountains, Lightning, Diamond, MaskHappy, Cloud, Cube } from '@phosphor-icons/react'

export type Realm = {
  id: string
  name: string
  progress: number // 0-100
  status?: 'not-started' | 'in-progress' | 'completed'
}

interface RealmCardProps {
  realm: Realm
  onSelect: (realm: Realm) => void
}

const RealmCard: React.FC<RealmCardProps> = ({ realm, onSelect }) => {
  const iconForRealm = (name: string) => {
    const n = name.toLowerCase()
    if (n.includes('wind')) return <Wind size={20} className="text-blue-500" />
    if (n.includes('water')) return <Drop size={20} className="text-blue-300" />
    if (n.includes('fire')) return <Fire size={20} className="text-red-600" />
    if (n.includes('earth')) return <Mountains size={20} className="text-white" />
    if (n.includes('lightning')) return <Lightning size={20} className="text-yellow-200" />
    if (n.includes('crystal')) return <Diamond size={20} className="text-purple-600" />
    if (n.includes('shadow')) return <MaskHappy size={20} className="text-orange-500" />
    if (n.includes('sky')) return <Cloud size={20} className="text-blue-100" />
    if (n.includes('stone')) return <Cube size={20} className="text-gray-600" />
    return <Mountains size={20} className="text-yellow-600" />
  }

  return (
    <Card className="bg-[#0f0f10] border-[#2a2a2d]">
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 text-white font-semibold">
              {iconForRealm(realm.name)}
              {realm.name}
            </div>
            <div className="mt-3 w-full h-2 bg-[#161618] rounded-full overflow-hidden border border-[#2a2a2d]">
              <div className="h-full bg-yellow-600" style={{ width: `${realm.progress}%` }} />
            </div>
            <p className="text-xs text-white/50 mt-2">{realm.progress}% complete</p>
          </div>
          <Gauge size={20} className="text-white/50" />
        </div>
        <div className="mt-4 flex gap-2">
          <Button onClick={() => onSelect(realm)} className="w-full md:w-auto">Resume Learning</Button>
          <Button variant="secondary" className="w-full md:w-auto">Report</Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default RealmCard
