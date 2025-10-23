// path of conquest index
import Sidebar from '../../components/Sidebar'
import MainContent from '../../components/layout/MainContent'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/Card'
import RealmCard, { type Realm } from './components/RealmCard'
import { MapTrifold, Binoculars } from '@phosphor-icons/react'
import { useNavigate } from 'react-router-dom'

const toSlug = (name: string) =>
  name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')

// dummy
const DUMMY_REALMS: Realm[] = Array.from({ length: 9 }, (_, i) => ({
  id: `${i+1}`,
  name: [
    'Wind Realm','Water Realm','Fire Realm','Earth Realm','Lightning Realm','Crystal Realm','Shadow Realm','Sky Realm','Stone Realm'
  ][i] ?? `Realm ${i+1}`,
  progress: Math.round(Math.random()*60)+10,
  status: 'in-progress',
}))

// every realm has own route

export default function PathOfConquestPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex bg-black">
      <Sidebar />
      <MainContent>
        <div className="w-full space-y-6">
          {/* header */}
          <div>
            <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
              <MapTrifold size={36} className="text-yellow-600" />
              Path of Conquest
            </h1>
            <p className="text-white/60">choose a realm to continue your journey</p>
          </div>

          {/* quick actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="bg-[#0f0f10] border-[#2a2a2d]">
              <CardContent className="p-5">
                <div className="text-white font-semibold mb-1">Continue Learning</div>
                <p className="text-white/60 text-sm mb-4">Realm 6, Class 3</p>
                <button className="rounded-lg bg-[#161618] hover:bg-[#2a2a2d] text-white px-4 py-2 border border-[#212124]">Continue</button>
              </CardContent>
            </Card>
            <Card className="bg-[#0f0f10] border-[#2a2a2d]">
              <CardContent className="p-5">
                <div className="text-white font-semibold mb-1">Set Goals</div>
                <p className="text-white/60 text-sm mb-3">Add goals to show on your dashboard</p>
                <div className="flex items-center gap-2">
                  <input className="flex-1 bg-[#161618] text-white px-3 py-2 rounded-lg border border-[#212124] placeholder-white/40" placeholder="e.g., Finish 1 practice session" />
                  <button className="rounded-lg bg-[#161618] hover:bg-[#2a2a2d] text-white px-4 py-2 border border-[#212124]">Add</button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* realms grid */}
          <Card className="bg-[#0f0f10] border-[#2a2a2d]">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Binoculars size={20} className="text-yellow-600" />
                Realms
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {DUMMY_REALMS.map((realm) => (
                  <RealmCard key={realm.id} realm={realm} onSelect={(r) => navigate(`/student/path-of-conquest/${toSlug(r.name)}`)} />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </MainContent>
    </div>
  )
}
