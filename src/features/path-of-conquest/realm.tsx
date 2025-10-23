import { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import Sidebar from '../../components/Sidebar'
import MainContent from '../../components/layout/MainContent'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/Card'
import ClassAccordion, { type ClassItem } from './components/ClassAccordion'
import TestAccordion from './components/TestAccordion'
import { Target } from '@phosphor-icons/react'

const makeClass = (idx: number): ClassItem => ({
  id: `c-${idx}`,
  name: `Class ${idx}`,
  progress: Math.round(Math.random()*80),
  topics: Array.from({ length: 3 + (idx % 3) }, (_, t) => ({
    id: `t-${idx}-${t+1}`,
    title: `Topic ${t+1}`,
    classworkStatus: ['pending','completed','failed'][Math.floor(Math.random()*3)] as any,
    homeworkStatus: ['pending','completed','failed'][Math.floor(Math.random()*3)] as any,
  })),
})

const toTitle = (slug?: string) => (slug || '')
  .split('-')
  .map(s => s.charAt(0).toUpperCase() + s.slice(1))
  .join(' ')

export default function RealmPage() {
  const { realmSlug } = useParams()

  const classes = useMemo(() => {
    // Only real classes belong here; realm-level tests are appended separately below
    return Array.from({ length: 8 }, (_, i) => makeClass(i + 1))
  }, [])

  const realmName = useMemo(() => {
    const name = toTitle(realmSlug)
    // ensure it ends with 'Realm'
    return /realm$/i.test(name) ? name : `${name} Realm`
  }, [realmSlug])

  return (
    <div className="min-h-screen flex bg-black">
      <Sidebar />
      <MainContent>
        <div className="w-full space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
              <Target size={36} className="text-yellow-600" />
              {realmName}
            </h1>
            <p className="text-white/60">classes and topics for this realm</p>
          </div>

          <Card className="bg-[#0f0f10] border-[#2a2a2d]">
            <CardHeader>
              <CardTitle className="text-white">Classes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4">
                {classes.map((cls) => (
                  <ClassAccordion key={cls.id} item={cls} />
                ))}
                {/* realm-level tests */}
                <TestAccordion title="Realm Practice" />
                <TestAccordion title="Realm Test" />
              </div>
            </CardContent>
          </Card>
        </div>
      </MainContent>
    </div>
  )
}
